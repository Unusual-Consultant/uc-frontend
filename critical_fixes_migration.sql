-- CRITICAL FIXES MIGRATION SCRIPT
-- =================================
-- This script addresses the most critical issues identified in the senior architect review

-- 1. ENABLE REQUIRED EXTENSIONS
-- =============================
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. ADD SCHEDULED_START/SCHEDULED_END TO BOOKING_SESSIONS
-- =======================================================
-- First, add the new columns
ALTER TABLE booking_sessions 
ADD COLUMN IF NOT EXISTS scheduled_start TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS scheduled_end TIMESTAMPTZ;

-- Backfill existing data (assuming you have scheduled_date, scheduled_time, timezone)
-- UPDATE booking_sessions 
-- SET scheduled_start = (scheduled_date + scheduled_time) AT TIME ZONE timezone,
--     scheduled_end = (scheduled_date + scheduled_time) AT TIME ZONE timezone + 
--                     (SELECT duration_minutes FROM session_types WHERE id = session_type_id) * INTERVAL '1 minute'
-- WHERE scheduled_start IS NULL;

-- Make columns NOT NULL after backfill
-- ALTER TABLE booking_sessions 
-- ALTER COLUMN scheduled_start SET NOT NULL,
-- ALTER COLUMN scheduled_end SET NOT NULL;

-- 3. ADD EXCLUSION CONSTRAINT FOR OVERLAPPING BOOKINGS
-- ===================================================
-- This prevents double-booking the same mentor
ALTER TABLE booking_sessions
ADD CONSTRAINT booking_no_overlap
EXCLUDE USING GIST (
  mentor_id WITH =,
  tstzrange(scheduled_start, scheduled_end) WITH &&
);

-- 4. ADD SCHEDULED_END COMPUTATION TRIGGER
-- =======================================
-- Ensures scheduled_end is always consistent with session duration
CREATE OR REPLACE FUNCTION booking_set_end() RETURNS trigger AS $$
BEGIN
  IF NEW.scheduled_end IS NULL THEN
    -- Get duration from session_types
    SELECT NEW.scheduled_start + (duration_minutes * INTERVAL '1 minute')
    INTO NEW.scheduled_end
    FROM session_types 
    WHERE id = NEW.session_type_id;
  END IF;
  
  -- Ensure scheduled_end > scheduled_start
  IF NEW.scheduled_end <= NEW.scheduled_start THEN
    RAISE EXCEPTION 'scheduled_end must be after scheduled_start';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_booking_set_end
BEFORE INSERT OR UPDATE ON booking_sessions
FOR EACH ROW EXECUTE FUNCTION booking_set_end();

-- 5. ADD SEARCH TSVECTOR TRIGGER
-- ==============================
-- Maintains full-text search vector for mentor profiles
CREATE OR REPLACE FUNCTION mentor_profiles_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_tsv := to_tsvector('simple', 
    COALESCE(NEW.headline, '') || ' ' || 
    COALESCE(NEW.bio, '') || ' ' || 
    COALESCE(NEW.company, '') || ' ' ||
    COALESCE(NEW.location, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_mentor_profiles_tsv
BEFORE INSERT OR UPDATE ON mentor_profiles
FOR EACH ROW EXECUTE FUNCTION mentor_profiles_tsv_trigger();

-- 6. ADD AUDIT LOG TRIGGER FOR CRITICAL TABLES
-- ============================================
-- Tracks changes to booking_sessions and payments
CREATE OR REPLACE FUNCTION audit_trigger() RETURNS trigger AS $$
DECLARE
  old_data JSONB;
  new_data JSONB;
BEGIN
  IF TG_OP = 'DELETE' THEN
    old_data := to_jsonb(OLD);
    new_data := NULL;
  ELSIF TG_OP = 'UPDATE' THEN
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
  ELSIF TG_OP = 'INSERT' THEN
    old_data := NULL;
    new_data := to_jsonb(NEW);
  END IF;

  INSERT INTO audit_log (
    entity_type, entity_id, action, 
    old_values, new_values, changed_at
  ) VALUES (
    TG_TABLE_NAME, 
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    old_data,
    new_data,
    NOW()
  );

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to critical tables
CREATE TRIGGER trg_audit_booking_sessions
AFTER INSERT OR UPDATE OR DELETE ON booking_sessions
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER trg_audit_payments
AFTER INSERT OR UPDATE OR DELETE ON payments
FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- 7. ADD MISSING INDEXES FOR PERFORMANCE
-- ======================================
-- These indexes are critical for query performance

-- Booking sessions indexes
CREATE INDEX IF NOT EXISTS idx_booking_sessions_mentor_status 
ON booking_sessions (mentor_id, status);

CREATE INDEX IF NOT EXISTS idx_booking_sessions_mentee_scheduled 
ON booking_sessions (mentee_id, scheduled_start);

-- Mentor profiles indexes
CREATE INDEX IF NOT EXISTS idx_mentor_profiles_created_at 
ON mentor_profiles (created_at);

-- Payments indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_gateway_external 
ON payments (gateway, external_payment_id) 
WHERE external_payment_id IS NOT NULL;

-- 8. ADD DATA VALIDATION CONSTRAINTS
-- ==================================
-- Ensure data integrity at the database level

-- Ensure scheduled_end > scheduled_start
ALTER TABLE booking_sessions
ADD CONSTRAINT check_scheduled_end_after_start 
CHECK (scheduled_end > scheduled_start);

-- Ensure non-negative amounts
ALTER TABLE payments
ADD CONSTRAINT check_payment_amount_positive 
CHECK (amount > 0);

ALTER TABLE refunds
ADD CONSTRAINT check_refund_amount_positive 
CHECK (amount > 0);

-- 9. AVAILABILITY CHECK FUNCTION
-- ==============================
-- Function to check if a mentor is available for booking
CREATE OR REPLACE FUNCTION check_mentor_availability(
  p_mentor_id UUID,
  p_desired_start TIMESTAMPTZ,
  p_desired_end TIMESTAMPTZ,
  p_buffer_minutes INT DEFAULT 15
) RETURNS BOOLEAN AS $$
DECLARE
  has_exception BOOLEAN;
  has_conflict BOOLEAN;
BEGIN
  -- Check for blocking exceptions
  SELECT EXISTS(
    SELECT 1 FROM mentor_availability_exceptions
    WHERE mentor_id = p_mentor_id
      AND is_blocking = true
      AND tstzrange(start_timestamptz, end_timestamptz) && 
          tstzrange(p_desired_start, p_desired_end)
  ) INTO has_exception;
  
  IF has_exception THEN
    RETURN FALSE;
  END IF;
  
  -- Check for existing bookings with buffer
  SELECT EXISTS(
    SELECT 1 FROM booking_sessions
    WHERE mentor_id = p_mentor_id
      AND status IN ('pending', 'confirmed')
      AND tstzrange(
        scheduled_start - (p_buffer_minutes || ' minutes')::INTERVAL,
        scheduled_end + (p_buffer_minutes || ' minutes')::INTERVAL
      ) && tstzrange(p_desired_start, p_desired_end)
  ) INTO has_conflict;
  
  RETURN NOT has_conflict;
END;
$$ LANGUAGE plpgsql;

-- 10. BOOKING INSERTION WITH AVAILABILITY CHECK
-- =============================================
-- Safe booking insertion that checks availability
CREATE OR REPLACE FUNCTION safe_insert_booking(
  p_id UUID,
  p_mentor_id UUID,
  p_mentee_id UUID,
  p_session_type_id UUID,
  p_desired_start TIMESTAMPTZ,
  p_session_price INT,
  p_total_amount INT,
  p_currency CHAR(3) DEFAULT 'INR',
  p_notes TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  booking_id UUID;
  is_available BOOLEAN;
BEGIN
  -- Check availability
  SELECT check_mentor_availability(p_mentor_id, p_desired_start, p_desired_start + 
    (SELECT duration_minutes FROM session_types WHERE id = p_session_type_id) * INTERVAL '1 minute')
  INTO is_available;
  
  IF NOT is_available THEN
    RAISE EXCEPTION 'Mentor is not available for the requested time slot';
  END IF;
  
  -- Insert booking (exclusion constraint will also protect against race conditions)
  INSERT INTO booking_sessions (
    id, mentor_id, mentee_id, session_type_id,
    scheduled_start, scheduled_end, session_price, total_amount, currency, notes
  ) VALUES (
    p_id, p_mentor_id, p_mentee_id, p_session_type_id,
    p_desired_start, p_desired_start + 
    (SELECT duration_minutes FROM session_types WHERE id = p_session_type_id) * INTERVAL '1 minute',
    p_session_price, p_total_amount, p_currency, p_notes
  ) RETURNING id INTO booking_id;
  
  RETURN booking_id;
END;
$$ LANGUAGE plpgsql;

-- 11. PAYMENT RECONCILIATION VIEW
-- ===============================
-- View to help with payment reconciliation
CREATE OR REPLACE VIEW payment_reconciliation AS
SELECT 
  p.id as payment_id,
  p.booking_id,
  p.external_payment_id,
  p.gateway,
  p.amount as payment_amount,
  p.currency,
  p.status as payment_status,
  bs.total_amount as booking_total,
  bs.currency as booking_currency,
  CASE 
    WHEN p.amount = bs.total_amount AND p.currency = bs.currency THEN 'MATCH'
    ELSE 'MISMATCH'
  END as reconciliation_status,
  p.created_at
FROM payments p
JOIN booking_sessions bs ON p.booking_id = bs.id;

-- 12. MIGRATION COMPLETION CHECK
-- ==============================
-- Verify all critical fixes are in place
DO $$
BEGIN
  -- Check if exclusion constraint exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'booking_no_overlap'
  ) THEN
    RAISE EXCEPTION 'Exclusion constraint not created';
  END IF;
  
  -- Check if triggers exist
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'trg_booking_set_end'
  ) THEN
    RAISE EXCEPTION 'Booking end trigger not created';
  END IF;
  
  RAISE NOTICE 'All critical fixes applied successfully!';
END $$;
