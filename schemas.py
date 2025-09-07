from pydantic import BaseModel, EmailStr, validator
from typing import Literal, Optional
import uuid
from datetime import datetime, time
import dns.resolver


# Users
class UserCreate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr
    password_hash: str
    role: Literal["mentee","mentor","admin"]

    @validator("email")
    def validate_email_domain(cls, v):
        domain = v.split("@")[-1]
        try:
            dns.resolver.resolve(domain, "MX")
        except Exception:
            raise ValueError("Invalid email domain")
        return v

class UserLogin(BaseModel): 
    email: EmailStr
    password: str  

class UserOut(BaseModel): 
    id: uuid.UUID
    email: EmailStr
    role: str

    class Config:
      from_attributes = True

# Mentor/Mentee profiles
class MentorProfileCreate(BaseModel):
    user_id: uuid.UUID
    bio: str | None = None
    headline: str | None = None
    location: str | None = None
    timezone: str | None = None
    hourly_rate: int | None = None

class MenteeProfileCreate(BaseModel):
    user_id: uuid.UUID
    career_goal: str | None = None
    preferred_language: str | None = None
    career_stage: str | None = None
    location: str | None = None

# Availability & skills
class AvailabilityCreate(BaseModel):
    mentor_id: uuid.UUID
    day: str
    start_time: str
    end_time: str

class SkillCreate(BaseModel):
    mentor_id: uuid.UUID
    skill: str

# Sessions
class SessionCreate(BaseModel):
    mentor_id: uuid.UUID
    mentee_id: uuid.UUID
    topic: str | None = None
    session_type: Literal["chat","video","resume_review","mock"]
    scheduled_time: datetime
    status: Literal["pending","confirmed","completed","cancelled"] = "pending"
    feedback: str | None = None

# Pricing
class PlanCreate(BaseModel):
    name: str
    description: str | None = None
    price: int
    duration: Literal["monthly","quarterly","yearly"]
    features: str | None = None

class UserPlanCreate(BaseModel):
    user_id: uuid.UUID
    plan_id: uuid.UUID
    start_date: datetime
    end_date: datetime
