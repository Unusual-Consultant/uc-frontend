from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas import UserCreate, UserLogin, UserOut
import model
from database import get_db  

router = APIRouter(prefix="/users", tags=["users"])

# Create user
@router.post("/", response_model=UserOut, status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db)):
    if db.query(model.User).filter(model.User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")
    user = model.User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        password_hash=payload.password_hash,  # later: hash it
        role=payload.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Get all users
@router.get("/", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db)):
    return db.query(model.User).all()

# Get user by email
@router.get("/by-email", response_model=UserOut)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Login
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter(model.User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User does not exist")

    if db_user.password_hash != user.password:  # later use hashing
        raise HTTPException(status_code=400, detail="Invalid password")

    return {"message": "Login successful"}
