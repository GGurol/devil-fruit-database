from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

# CORRECTED: Imports are now absolute from the /app directory
from core.db import get_session
from models import User, UserRead


router = APIRouter(tags=["Users"])


@router.get("/user/", response_model=list[UserRead])
def read_devil_fruit_users(
    *,
    session: Session = Depends(get_session),
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, le=100),
):
    """Get all devil fruit users"""
    df_users = session.exec(select(User).offset(offset).limit(limit)).all()
    if not df_users:
        raise HTTPException(status_code=404, detail="No users found")
    return df_users


@router.post("/user/", response_model=User)
def create_devil_fruit_user(*, session: Session = Depends(get_session), df_user: User):
    db_df_user = User.model_validate(df_user)
    session.add(db_df_user)
    session.commit()
    session.refresh(db_df_user)
    return db_df_user