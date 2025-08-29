from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import model, schemas
from deps import get_db

router = APIRouter(prefix="/sessions", tags=["sessions"])

@router.post("/", status_code=201)
def create_session(payload: schemas.SessionCreate, db: Session = Depends(get_db)):
    if not db.get(model.User, payload.mentor_id) or not db.get(model.User, payload.mentee_id):
        raise HTTPException(400, "Invalid mentor/mentee")
    s = model.Session(**payload.dict())
    db.add(s); db.commit()
    return {"id": str(s.id)}
