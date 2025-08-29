import uuid, datetime
from enum import Enum as PyEnum
from sqlalchemy import (
    Column, String, Text, Integer, Boolean, Float, Enum, Time, TIMESTAMP,
    ForeignKey, UniqueConstraint
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from database import Base

# ---- Enums ----
class UserRole(PyEnum): mentee="mentee"; mentor="mentor"; admin="admin"
class AccountStatus(PyEnum): active="active"; suspended="suspended"
class SessType(PyEnum): chat="chat"; video="video"; resume_review="resume_review"; mock="mock"
class SessStatus(PyEnum): pending="pending"; confirmed="confirmed"; completed="completed"; cancelled="cancelled"
class PlanDuration(PyEnum): monthly="monthly"; quarterly="quarterly"; yearly="yearly"
class PrefSessType(PyEnum): individual="individual"; group="group"
class BudgetRange(PyEnum): free="free"; br1="199-499"; br2="500+"

utcnow = datetime.datetime.utcnow

# ---- Users ----
class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)
    last_login = Column(TIMESTAMP, nullable=True)
    is_active = Column(Boolean, default=True)
    verified = Column(Boolean, default=False)

    mentor_profile = relationship("MentorProfile", back_populates="user", uselist=False)
    mentee_profile = relationship("MenteeProfile", back_populates="user", uselist=False)

# ---- Profiles ----
class MentorProfile(Base):
    __tablename__ = "mentor_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    bio = Column(Text)
    headline = Column(String(255))
    location = Column(String(100))
    timezone = Column(String(50))
    rating = Column(Float, default=0.0)
    repeat_clients_percent = Column(Integer, default=0)
    total_sessions = Column(Integer, default=0)
    last_session_at = Column(TIMESTAMP, nullable=True)
    calendar_sync_enabled = Column(Boolean, default=False)
    account_status = Column(Enum(AccountStatus), default=AccountStatus.active)
    hourly_rate = Column(Integer)
    featured = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)

    user = relationship("User", back_populates="mentor_profile")

class MenteeProfile(Base):
    __tablename__ = "mentee_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    career_goal = Column(Text)
    preferred_language = Column(String(50))
    career_stage = Column(String(100))
    location = Column(String(100))
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="mentee_profile")

# ---- Mentor facets ----
class MentorAvailability(Base):
    __tablename__ = "mentor_availability"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    day = Column(String(20))         # e.g. "Monday"
    start_time = Column(Time)
    end_time = Column(Time)

class MentorSkill(Base):
    __tablename__ = "mentor_skills"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    skill = Column(String(100))

class MentorIndustry(Base):
    __tablename__ = "mentor_industries"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    industry = Column(String(100))

class MentorLanguage(Base):
    __tablename__ = "mentor_languages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    language = Column(String(50))

# ---- Sessions & reviews ----
class Session(Base):
    __tablename__ = "sessions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"))
    mentee_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"))
    topic = Column(String(255))
    session_type = Column(Enum(SessType))
    scheduled_time = Column(TIMESTAMP)
    status = Column(Enum(SessStatus))
    feedback = Column(Text)
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)

class Review(Base):
    __tablename__ = "reviews"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id", ondelete="CASCADE"))
    mentee_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    rating = Column(Integer)
    comment = Column(Text)
    created_at = Column(TIMESTAMP, default=utcnow)

# ---- Messaging ----
class Message(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sender_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    receiver_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    content = Column(Text)
    is_urgent = Column(Boolean, default=False)
    read = Column(Boolean, default=False)
    sent_at = Column(TIMESTAMP)
    delivered = Column(TIMESTAMP)

# ---- Packages & earnings & featured ----
class Package(Base):
    __tablename__ = "packages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(255))
    description = Column(Text)
    price = Column(Integer)
    duration = Column(Integer)  # minutes
    created_at = Column(TIMESTAMP, default=utcnow)

class Earning(Base):
    __tablename__ = "earnings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    month = Column(String(7))  # 'YYYY-MM'
    mentorship_income = Column(Integer)
    freelance_income = Column(Integer)
    total_income = Column(Integer)
    growth_percent = Column(Float)
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)
    __table_args__ = (UniqueConstraint("mentor_id","month", name="uq_mentor_month"),)

class FeaturedMentor(Base):
    __tablename__ = "featured_mentors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    headline = Column(String(255))
    skills = Column(Text)
    hourly_rate = Column(Integer)
    featured_since = Column(TIMESTAMP)

# ---- Pricing plans & subscriptions ----
class PricingPlan(Base):
    __tablename__ = "pricing_plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100))
    description = Column(Text)
    price = Column(Integer)
    duration = Column(Enum(PlanDuration))
    features = Column(Text)
    created_at = Column(TIMESTAMP, default=utcnow)

class UserPlan(Base):
    __tablename__ = "user_plans"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    plan_id = Column(UUID(as_uuid=True), ForeignKey("pricing_plans.id", ondelete="CASCADE"))
    start_date = Column(TIMESTAMP)
    end_date = Column(TIMESTAMP)
    is_active = Column(Boolean, default=True)

# ---- Resume reviews, testimonials, mentee preferences ----
class ResumeReview(Base):
    __tablename__ = "resume_reviews"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("sessions.id", ondelete="CASCADE"), unique=True)
    resume_url = Column(Text)
    review_notes = Column(Text)

class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentee_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    mentor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    quote = Column(Text)
    rating = Column(Integer)
    created_at = Column(TIMESTAMP, default=utcnow)
    updated_at = Column(TIMESTAMP, default=utcnow, onupdate=utcnow)
    is_active = Column(Boolean, default=True)

class MenteePreference(Base):
    __tablename__ = "mentee_preferences"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mentee_id = Column(UUID(as_uuid=True), ForeignKey("mentee_profiles.id", ondelete="CASCADE"))
    interests = Column(Text)
    preferred_modes = Column(Text)  # "chat,video,resume_review,mock"
    session_type = Column(Enum(PrefSessType))
    time_slots = Column(Text)
    budget_range = Column(Enum(BudgetRange))
