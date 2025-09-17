from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy import func
from sqlmodel import Session, or_, select

# CORRECTED: Imports are now absolute from the /app directory
from models import (
    DevilFruit,
    DevilFruitSimple,
    DevilFruitRead,
    FieldSelection,
    FruitTypeAssociation,
    RomanizedName,
    TranslatedName,
    User,
)
from core.db import get_session


router = APIRouter(tags=["Devil Fruits"])


# devil fruit routes
@router.get(
    "/",
    response_model=list[DevilFruitRead],
    response_model_exclude_none=True,
)
def read_devil_fruits(
    *,
    session: Session = Depends(get_session),
    offset: int = Query(default=0, ge=0),
    limit: int | None = Query(default=None, ge=1),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()
    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")
    return [DevilFruitRead.from_orm(df) for df in devil_fruits]


@router.get(
    "/simple/",
    response_model=list[DevilFruitSimple],
    response_model_exclude_none=True,
)
def read_devil_fruits_simple(
    *,
    session: Session = Depends(get_session),
    include_metadata: bool = Query(default=True),
    include_names: bool = Query(default=True),
    include_abilities: bool = Query(default=True),
    include_type: bool = Query(default=True),
    include_user: bool = Query(default=True),
    offset: int = Query(default=0, ge=0),
    limit: int | None = Query(default=None, ge=1),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()
    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")
    fields = FieldSelection(
        include_metadata=include_metadata,
        include_names=include_names,
        include_types=include_type,
        include_abilities=include_abilities,
        include_users=include_user,
    )
    return [
        DevilFruitSimple.from_devil_fruit(df, fields=fields) for df in devil_fruits
    ]


@router.get(
    "/fruit-id/{fruit_id}",
    response_model=DevilFruitRead,
)
def read_devil_fruit_by_id(*, session: Session = Depends(get_session), fruit_id: UUID):
    devil_fruit = session.get(DevilFruit, fruit_id)
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")
    return DevilFruitRead.from_orm(devil_fruit)


@router.get(
    "/name/{name}",
    response_model=DevilFruitRead,
)
def read_devil_fruit_by_name(*, session: Session = Depends(get_session), name: str):
    devil_fruit = session.exec(
        select(DevilFruit)
        .join(RomanizedName)
        .join(TranslatedName)
        .where(or_(RomanizedName.name == name, TranslatedName.name == name))
    ).first()
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")
    return DevilFruitRead.from_orm(devil_fruit)


@router.get(
    "/user/{user}",
    response_model=DevilFruitRead,
)
def read_devil_fruit_by_user(*, session: Session = Depends(get_session), user: str):
    devil_fruit = session.exec(
        select(DevilFruit).join(User).where(User.user == user)
    ).first()
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")
    return DevilFruitRead.from_orm(devil_fruit)


@router.get(
    "/type/{fruit_type}",
    response_model=list[DevilFruitRead],
)
def read_devil_fruits_by_type(
    *, session: Session = Depends(get_session), fruit_type: str
):
    devil_fruits = session.exec(
        select(DevilFruit)
        .join(FruitTypeAssociation)
        .where(FruitTypeAssociation.type == fruit_type)
    ).all()
    if not devil_fruits:
        raise HTTPException(status_code=404, detail="Devil fruits with type not found")
    return [DevilFruitRead.from_orm(df) for df in devil_fruits]


@router.get(
    "/search/{search_term}",
    response_model=list[DevilFruitRead],
)
def search_devils_fruits(
    *,
    session: Session = Depends(get_session),
    search_term: str = Path(..., min_length=3),
    limit: int | None = Query(default=None, ge=1),
):
    devil_fruits = session.exec(
        select(DevilFruit)
        .distinct()
        .join(RomanizedName)
        .join(TranslatedName)
        .join(User)
        .where(
            or_(
                func.lower(RomanizedName.name).contains(search_term.lower()),
                func.lower(TranslatedName.name).contains(search_term.lower()),
                func.lower(User.user).contains(search_term.lower()),
            )
        )
        .limit(limit)
    ).all()
    if not devil_fruits:
        raise HTTPException(
            status_code=404, detail=f"No devil fruits found matching '{search_term}'"
        )
    return [DevilFruitRead.from_orm(df) for df in devil_fruits]


@router.post("/create/", response_model=DevilFruit)
def create_devil_fruit(
    *, session: Session = Depends(get_session), devil_fruit: DevilFruit
):
    db_devil_fruit = DevilFruit.model_validate(devil_fruit)
    session.add(db_devil_fruit)
    session.commit()
    session.refresh(db_devil_fruit)
    return db_devil_fruit