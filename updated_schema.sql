-- Updated Schema for Mentor Profile Pages and Booking Flow

-- Enhanced Users Table
Table users {
  id UUID [pk]
  first_name VARCHAR(100) [not null]
  last_name VARCHAR(100) [not null]
  email VARCHAR(255) [unique, not null]
  phone VARCHAR(255)
  password_hash TEXT [not null]
  role ENUM('mentee', 'mentor', 'admin') [not null]
  profile_image_url VARCHAR(500)
  date_of_birth DATE
  gender VARCHAR(20)
  bio TEXT
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  last_login TIMESTAMPTZ
  is_active BOOLEAN [default: true]
  verified BOOLEAN [default: false]
  goal_id UUID [ref: > goal.id]
  area_of_interest_id UUID [ref: > area_of_interest.id]
  language_id UUID [ref: > language.id]
  current_career_stage_id UUID [ref: > current_career_stage.id]
}

-- Enhanced Mentor Profiles Table
Table mentor_profiles {
  id UUID [pk]
  user_id UUID [unique, ref: > users.id, not null]
  bio TEXT
  role VARCHAR(100)
  headline VARCHAR(255)
  location VARCHAR(100)
  timezone VARCHAR(50)
  rating FLOAT [default: 0.0, check: 'rating >= 0 AND rating <= 5']
  repeat_clients_percent INT [default: 0, check: 'repeat_clients_percent >= 0 AND repeat_clients_percent <= 100']
  total_sessions INT [default: 0, check: 'total_sessions >= 0']
  last_session_at TIMESTAMPTZ
  calendar_sync_enabled BOOLEAN [default: false]
  account_status ENUM('active', 'suspended') [default: 'active']
  company VARCHAR(512)
  years_experience INT [check: 'years_experience >= 0'] -- Changed from VARCHAR to INT
  response_time_minutes INT [check: 'response_time_minutes >= 0'] -- Changed from VARCHAR to INT
  total_mentees INT [default: 0]
  success_rate INT [default: 0, check: 'success_rate >= 0 AND success_rate <= 100']
  payment_profile_id UUID [ref: > payment_profile.id]
  pan_number VARCHAR(20) -- Mark as sensitive
  gst_number VARCHAR(20) -- Mark as sensitive
  linkedin_url VARCHAR(500)
  personal_site VARCHAR(500)
  achievements JSONB -- For achievements section
  education JSONB -- For education section
  search_tsv TSVECTOR -- Full-text search vector
  version INT [default: 1] -- Optimistic locking
  is_deleted BOOLEAN [default: false] -- Soft delete
  deleted_at TIMESTAMPTZ
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (user_id) [unique] -- Already unique
    (is_deleted, account_status) -- For active mentors
    search_tsv [gin] -- Full-text search
  }
}

-- Session Types Table (for Book Session interface)
Table session_types {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  name VARCHAR(255) [not null] -- "Career Strategy Call", "Resume Review", etc.
  description TEXT
  duration_minutes INT [not null] -- 45, 60, etc.
  price INT [not null] -- in paise/cents
  mode ENUM('video', 'chat', 'phone') [not null]
  is_active BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

-- Enhanced Mentor Availability
Table mentor_availability {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  timezone VARCHAR(50)
  buffer_time_minutes INT [default: 15] -- Between sessions
}

-- Recurring weekly availability slots (day-of-week + time ranges)
Table mentor_availability_slots {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  day_of_week INT [not null, check: 'day_of_week >= 0 AND day_of_week <= 6']
  start_time TIME [not null]
  end_time TIME [not null]
  timezone VARCHAR(50)
  is_recurring BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, day_of_week) -- For availability queries
  }
}

-- Availability Exceptions (vacations, ad-hoc busy times)
Table mentor_availability_exceptions {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  start_timestamptz TIMESTAMPTZ [not null]
  end_timestamptz TIMESTAMPTZ [not null]
  reason TEXT -- 'vacation', 'personal', 'conference', etc.
  is_blocking BOOLEAN [default: true] -- true = blocks bookings, false = just informational
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  created_by UUID [ref: > users.id]
  
  indexes {
    (mentor_id, start_timestamptz, end_timestamptz) -- For overlap checks
  }
  
  constraints {
    -- Ensure end is after start
    CHECK (end_timestamptz > start_timestamptz)
  }
}

-- Booking Sessions Table (for booking flow)
Table booking_sessions {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  mentee_id UUID [ref: > users.id]
  session_type_id UUID [ref: > session_types.id]
  scheduled_start TIMESTAMPTZ [not null] -- Timezone-aware start time
  scheduled_end TIMESTAMPTZ [not null] -- Timezone-aware end time
  session_price INT [not null] -- in paise/cents
  currency CHAR(3) [default: 'INR'] -- ISO 4217 currency code
  status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'rescheduled') [default: 'pending']
  platform_fee INT [default: 0]
  discount_amount INT [default: 0]
  total_amount INT [not null] -- in paise/cents
  meeting_link VARCHAR(500)
  notes TEXT -- "About the Call" field
  cancellation_reason TEXT
  cancelled_at TIMESTAMPTZ
  version INT [default: 1] -- Optimistic locking
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, scheduled_start) -- For availability checks
    (mentee_id, status) -- For user bookings
    (status, created_at) -- For admin queries
    (mentor_id, status) -- For mentor booking queries
    (mentee_id, scheduled_start) -- For mentee booking queries
  }
  
  constraints {
    -- Prevent overlapping bookings for same mentor
    EXCLUDE USING GIST (
      mentor_id WITH =,
      tstzrange(scheduled_start, scheduled_end) WITH &&
    )
  }
}

-- Discount Codes System
Table discount_codes {
  id UUID [pk]
  code VARCHAR(50) [unique, not null]
  description TEXT
  discount_type ENUM('percentage', 'fixed_amount') [not null]
  discount_value INT [not null] -- percentage or amount in paise
  minimum_amount INT [default: 0] -- minimum order amount
  maximum_discount INT -- maximum discount amount
  usage_limit INT -- total usage limit
  valid_from TIMESTAMP [not null]
  valid_until TIMESTAMP [not null]
  is_active BOOLEAN [default: true]
  created_by UUID [ref: > users.id]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table discount_code_usage {
  id UUID [pk]
  discount_code_id UUID [ref: > discount_codes.id]
  user_id UUID [ref: > users.id]
  booking_id UUID [ref: > booking_sessions.id]
  discount_amount INT [not null]
  used_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (discount_code_id, user_id) -- For usage tracking
    (booking_id) -- For booking queries
  }
}

-- Payments Ledger (Financial Integrity)
Table payments {
  id UUID [pk]
  booking_id UUID [ref: > booking_sessions.id]
  amount INT [not null] -- in smallest currency unit
  currency CHAR(3) [not null, default: 'INR']
  external_payment_id VARCHAR(255) -- Gateway payment ID
  gateway VARCHAR(100) -- 'razorpay', 'stripe', etc.
  status ENUM('pending', 'paid', 'failed', 'refunded', 'cancelled') [not null]
  payment_method VARCHAR(100) -- 'card', 'upi', 'netbanking', etc.
  gateway_response JSONB -- Store gateway response for debugging
  processed_at TIMESTAMPTZ
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (booking_id) -- For booking queries
    (external_payment_id) -- For gateway reconciliation
    (status, created_at) -- For payment processing
    (gateway, external_payment_id) [unique] -- Prevent duplicate processing
  }
  
  constraints {
    -- Ensure external payment ID is unique per gateway
    UNIQUE (gateway, external_payment_id) WHERE external_payment_id IS NOT NULL
  }
}

-- Refunds Table
Table refunds {
  id UUID [pk]
  payment_id UUID [ref: > payments.id]
  amount INT [not null] -- Refund amount in smallest currency unit
  reason TEXT
  external_refund_id VARCHAR(255) -- Gateway refund ID
  status ENUM('pending', 'processed', 'failed') [default: 'pending']
  processed_at TIMESTAMPTZ
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  created_by UUID [ref: > users.id]
}

-- Audit Log Table (Critical Changes Tracking)
Table audit_log {
  id UUID [pk]
  entity_type VARCHAR(50) [not null] -- 'booking_sessions', 'payments', etc.
  entity_id UUID [not null]
  action VARCHAR(50) [not null] -- 'created', 'updated', 'deleted', 'status_changed'
  changed_by UUID [ref: > users.id]
  changed_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  old_values JSONB -- Previous state
  new_values JSONB -- New state
  diff JSONB -- Computed differences
  
  indexes {
    (entity_type, entity_id) -- For entity history
    (changed_by, changed_at) -- For user activity
    (action, changed_at) -- For action tracking
  }
}

-- Platform Configuration
Table platform_settings {
  id UUID [pk]
  setting_key VARCHAR(100) [unique, not null]
  setting_value TEXT [not null]
  setting_type VARCHAR(50)
  description TEXT
  is_public BOOLEAN [default: false]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

-- Enhanced Reviews for Testimonials
Table reviews {
  id UUID [pk]
  session_id UUID [ref: > booking_sessions.id]
  mentee_id UUID [ref: > users.id]
  rating INT
  comment TEXT
  session_type VARCHAR(100) -- "Career Strategy Call"
  session_date DATE
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

-- Notification System
Table notifications {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  type ENUM('booking_confirmed', 'session_reminder', 'payment_success', 'session_cancelled') [not null]
  title VARCHAR(255) [not null]
  message TEXT [not null]
  is_read BOOLEAN [default: false]
  metadata JSONB -- Additional data like booking_id, session_time, etc.
  action_url VARCHAR(500)
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  read_at TIMESTAMPTZ
  
  indexes {
    (user_id, created_at) -- For user notification queries
    (is_read, created_at) -- For unread notifications
  }
}

-- Email Templates
Table email_templates {
  id UUID [pk]
  template_key VARCHAR(100) [unique, not null]
  subject VARCHAR(255) [not null]
  html_content TEXT [not null]
  text_content TEXT
  variables JSONB -- Available template variables
  is_active BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

-- Additional Tables for Complete Mentor Profile Support
Table mentor_work_experience {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  company_name VARCHAR(255) [not null]
  position VARCHAR(255) [not null]
  start_date DATE [not null]
  end_date DATE [null] -- null for current position
  description TEXT
  company_logo_url VARCHAR(500)
  location VARCHAR(255)
  is_current BOOLEAN [default: false]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table mentor_achievements {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  title VARCHAR(255) [not null]
  value VARCHAR(50) -- "95%", "500+", etc.
  icon VARCHAR(100) -- icon name for UI
  display_order INT [default: 0]
  is_active BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table mentor_education {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  institution VARCHAR(255) [not null]
  degree VARCHAR(255) [not null]
  field_of_study VARCHAR(255)
  start_year INT
  end_year INT
  grade VARCHAR(50)
  description TEXT
  institution_logo_url VARCHAR(500)
  is_current BOOLEAN [default: false]
  display_order INT [default: 0]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table mentee_favorites {
  id UUID [pk]
  mentee_id UUID [ref: > users.id]
  mentor_id UUID [ref: > mentor_profiles.id]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentee_id, mentor_id) [unique] -- prevent duplicate favorites
  }
}

-- Keep existing tables as they are
Table goal {
  id UUID [pk]
  name varchar
}

Table area_of_interest {
  id UUID [pk]
  name varchar
}

Table language {
  id UUID [pk]
  name varchar
}

Table current_career_stage {
  id UUID [pk]
  name varchar
}

Table skill {
  id UUID [pk]
  name varchar
}

Table offering {
  id UUID [pk]
  name varchar
}

Table payment_mode {
  id UUID [pk]
  type varchar
}

Table payment_profile {
  id UUID [pk]
  payment_mode_id UUID [unique, ref: > payment_mode.id]
}

Table hero_mentor {
  id UUID [pk] -- Added missing PK
  mentor_id UUID [unique, ref: > mentor_profiles.id]
  priority VARCHAR(50)
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table mentee_profiles {
  id UUID [pk]
  user_id UUID [unique, ref: > users.id]
  career_goal TEXT
  preferred_language VARCHAR(50)
  career_stage VARCHAR(100)
  location VARCHAR(100)
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  is_active BOOLEAN [default: true]
}

Table mentor_skills {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  skill VARCHAR(100) [not null]
}

Table mentor_industries {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  industry VARCHAR(100) [not null]
}

Table mentor_languages {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  language VARCHAR(50) [not null]
  
  indexes {
    (mentor_id) -- For mentor queries
  }
}

-- Normalized join tables for arrays
Table mentor_offerings {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  offering_id UUID [ref: > offering.id]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, offering_id) [unique] -- Prevent duplicates
    (offering_id) -- For offering queries
  }
}

Table mentor_session_durations {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  duration_minutes INT [not null]
  is_active BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, duration_minutes) [unique] -- Prevent duplicates
  }
}

Table mentor_session_modes {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  mode ENUM('video', 'chat', 'phone', 'in_person') [not null]
  is_active BOOLEAN [default: true]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, mode) [unique] -- Prevent duplicates
  }
}

-- DEPRECATED: Use booking_sessions as canonical table
-- This view provides backward compatibility
-- CREATE MATERIALIZED VIEW sessions AS
-- SELECT id, mentor_id, mentee_id, session_type_id AS session_type, 
--        scheduled_start AS scheduled_time,
--        EXTRACT(EPOCH FROM (scheduled_end - scheduled_start))/60 AS duration_minutes, 
--        status, notes AS feedback, created_at, updated_at
-- FROM booking_sessions;

Table messages {
  id UUID [pk]
  sender_id UUID [ref: > users.id]
  receiver_id UUID [ref: > users.id]
  content TEXT
  is_urgent BOOLEAN [default: false]
  read BOOLEAN [default: false]
  sent_at TIMESTAMPTZ
  delivered TIMESTAMPTZ
}

Table packages {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  title VARCHAR(255)
  description TEXT
  price INT
  duration INT // in minutes
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table earnings {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  period DATE [not null] -- Changed from VARCHAR(7) to DATE for clarity
  mentorship_income INT [default: 0]
  freelance_income INT [default: 0]
  total_income INT [default: 0]
  growth_percent FLOAT [default: 0.0]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (mentor_id, period) [unique] -- One record per mentor per period
  }
}

Table featured_mentors {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  featured_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table pricing_plans {
  id UUID [pk]
  name VARCHAR(100)
  description TEXT
  price INT
  duration ENUM('monthly', 'quarterly', 'yearly')
  features TEXT
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table user_plans {
  id UUID [pk]
  user_id UUID [ref: > users.id]
  plan_id UUID [ref: > pricing_plans.id]
  start_date TIMESTAMPTZ
  end_date TIMESTAMPTZ
  is_active BOOLEAN [default: true]
}

Table resume_reviews {
  id UUID [pk]
  session_id UUID [unique, ref: > booking_sessions.id]
  resume_url TEXT
  review_notes TEXT
}

Table session_feedback {
  id UUID [pk]
  session_id UUID [ref: > booking_sessions.id, unique]
  rating INT [check: 'rating >= 1 AND rating <= 5']
  comment TEXT
  session_type VARCHAR(100)
  session_date DATE
  is_featured BOOLEAN [default: false]
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  completed_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table testimonials {
  id UUID [pk]
  mentee_id UUID [ref: > users.id]
  mentor_id UUID [ref: > mentor_profiles.id]
  quote TEXT
  rating INT
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  is_active BOOLEAN [default: true]
}

Table mentee_preferences {
  id UUID [pk]
  mentee_id UUID [ref: > mentee_profiles.id]
  interests TEXT
  preferred_modes TEXT // chat, video, resume_review, mock
  session_type ENUM('individual', 'group')
  time_slots TEXT
  budget_range ENUM('free', '199-499', '500+')
}

Table mentor_verification {
  id UUID [pk]
  mentor_id UUID [unique, ref: > mentor_profiles.id]
  terms_conditions_accepted BOOLEAN [default: false]
  terms_conditions_accepted_at TIMESTAMP [null]
  community_guidelines_accepted BOOLEAN [default: false]
  community_guidelines_accepted_at TIMESTAMP [null]
  is_verified BOOLEAN [default: false]
  verification_level ENUM('basic', 'verified', 'premium') [default: 'basic']
  id_proof_uploaded BOOLEAN [default: false]
  id_proof_verified BOOLEAN [default: false]
  certification_uploaded BOOLEAN [default: false]
  certification_verified BOOLEAN [default: false]
  verification_score INT [default: 0] // 0-100 based on documents and agreements
  verified_at TIMESTAMP [null]
  verification_expires_at TIMESTAMP [null]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table verification_documents {
  id UUID [pk]
  mentor_id UUID [ref: > mentor_profiles.id]
  document_type ENUM('id_proof', 'certification') [not null]
  document_name VARCHAR(255) [not null]
  file_url TEXT [not null]
  file_size INT
  mime_type VARCHAR(100)
  verification_status ENUM('pending', 'approved', 'rejected') [default: 'pending']
  rejection_reason TEXT [null]
  verified_at TIMESTAMP [null]
  verified_by UUID [ref: > users.id, null]
  created_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  updated_at TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
}

Table referrals {
  id UUID [pk]
  referrer_id UUID [ref: > users.id, not null]
  referred_id UUID [ref: > users.id, null]  // Nullable until referral is claimed
  referral_code VARCHAR(50) [unique, not null]
  status ENUM('pending', 'completed', 'expired') [default: 'pending']
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  expires_at TIMESTAMPTZ
}

Table referral_rewards {
  id UUID [pk]
  referral_id UUID [ref: > referrals.id, not null]
  credits_earned INT [not null, default: 0]
  reward_type ENUM('credits', 'discount', 'free_session') [not null]
  status ENUM('pending', 'credited', 'expired') [default: 'pending']
  created_at TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table user_credits {
  id UUID [pk]
  user_id UUID [ref: > users.id, not null]
  credits_balance INT [not null, default: 0]
  total_earned INT [not null, default: 0]
  total_spent INT [not null, default: 0]
  last_updated TIMESTAMPTZ [default: `CURRENT_TIMESTAMP`]
  
  indexes {
    (user_id) [unique] -- One credit record per user
  }
  
  constraints {
    -- Ensure non-negative credit balance
    CHECK (credits_balance >= 0)
    CHECK (total_earned >= 0)
    CHECK (total_spent >= 0)
  }
}
