from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import model, schemas
from deps import get_db

router = APIRouter(prefix="/mentees", tags=["mentees"])

@router.post("/profiles", status_code=201)
def create_mentee_profile(payload: schemas.MenteeProfileCreate, db: Session = Depends(get_db)):
    user = db.get(model.User, payload.user_id)
    if not user or str(user.role) != "UserRole.mentee":
        raise HTTPException(400, "Invalid mentee user_id")
    if db.query(model.MenteeProfile).filter_by(user_id=payload.user_id).first():
        raise HTTPException(400, "Mentee profile already exists")
    mp = model.MenteeProfile(**payload.dict())
    db.add(mp); db.commit()
    return {"ok": True}
