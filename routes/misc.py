from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import model, schemas
from deps import get_db

router = APIRouter(prefix="/pricing", tags=["pricing"])

@router.post("/plans", status_code=201)
def create_plan(payload: schemas.PlanCreate, db: Session = Depends(get_db)):
    plan = model.PricingPlan(**payload.dict())
    db.add(plan); db.commit()
    return {"id": str(plan.id)}

@router.post("/user-plans", status_code=201)
def assign_plan(payload: schemas.UserPlanCreate, db: Session = Depends(get_db)):
    up = model.UserPlan(**payload.dict())
    db.add(up); db.commit()
    return {"id": str(up.id)}
