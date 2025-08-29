from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import model, schemas
from deps import get_db

router = APIRouter(prefix="/mentors", tags=["mentors"])

@router.post("/profiles", status_code=201)
def create_mentor_profile(payload: schemas.MentorProfileCreate, db: Session = Depends(get_db)):
    user = db.get(model.User, payload.user_id)
    if not user or str(user.role) != "UserRole.mentor":
        raise HTTPException(400, "Invalid mentor user_id")
    if db.query(model.MentorProfile).filter_by(user_id=payload.user_id).first():
        raise HTTPException(400, "Mentor profile already exists")
    mp = model.MentorProfile(user_id=payload.user_id,
                              bio=payload.bio, headline=payload.headline,
                              location=payload.location, timezone=payload.timezone,
                              hourly_rate=payload.hourly_rate)
    db.add(mp); db.commit()
    return {"ok": True}

@router.post("/availability", status_code=201)
def add_availability(payload: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    if not db.get(model.User, payload.mentor_id):
        raise HTTPException(404, "Mentor not found")
    slot = model.MentorAvailability(
        mentor_id=payload.mentor_id, day=payload.day,
        start_time=payload.start_time, end_time=payload.end_time
    )
    db.add(slot); db.commit()
    return {"ok": True}

@router.post("/skills", status_code=201)
def add_skill(payload: schemas.SkillCreate, db: Session = Depends(get_db)):
    if not db.get(model.User, payload.mentor_id):
        raise HTTPException(404, "Mentor not found")
    s = model.MentorSkill(mentor_id=payload.mentor_id, skill=payload.skill)
    db.add(s); db.commit()
    return {"ok": True}
