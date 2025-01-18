from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy import func
from sqlmodel import Session, or_, select

from app.models import (
    DevilFruit,
    DevilFruitSimple,
    DevilFruitRead,
    FieldSelection,
    FruitTypeAssociation,
    RomanizedName,
    TranslatedName,
    User,
)
from app.core.db import get_session


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

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


@router.get(
    "/simple/",
    response_model=list[DevilFruitSimple],
    response_model_exclude_none=True,
)
def read_devil_fruits_simple(
    *,
    session: Session = Depends(get_session),
    include_metadata: bool = Query(
        default=True, description="Include metadata (i.e. fruit_id, is canon)"
    ),
    include_names: bool = Query(
        default=True, description="Include a romanized and translated name"
    ),
    include_abilities: bool = Query(
        default=True, description="Include fruits ablitites"
    ),
    include_type: bool = Query(default=True, description="Include the fruit type"),
    include_user: bool = Query(
        default=True, description="Include current user of fruit"
    ),
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

    simple_fruits = [
        DevilFruitSimple.from_devil_fruit(devil_fruit, fields=fields)
        for devil_fruit in devil_fruits
    ]

    return simple_fruits


@router.get(
    "/fruit-id/{fruit_id}",
    response_model=DevilFruitRead,
    tags=["Devil Fruits"],
)
def read_devil_fruit_by_id(*, session: Session = Depends(get_session), fruit_id: UUID):
    devil_fruit = session.get(DevilFruit, fruit_id)
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


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

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


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

    orm_devil_fruit = DevilFruitRead.from_orm(devil_fruit)

    return orm_devil_fruit


@router.get(
    "/type/{fruit_type}",
    response_model=list[DevilFruitRead],
)
def read_devil_fruits_by_type(
    *, session: Session = Depends(get_session), fruit_type: str
):
    # TODO: once all known fruit types are added to the enum, will use that instead as the type
    devil_fruits = session.exec(
        select(DevilFruit)
        .join(FruitTypeAssociation)
        .where(FruitTypeAssociation.type == fruit_type)
    ).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="Devil fruits with type not found")

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


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
    """
    Search devil fruits by name using fuzzy matching.
    Returns fruits where either romanized or translated names contain the search term.
    Requires at least 3 characters for search.
    """
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

    orm_devil_fruits = [DevilFruitRead.from_orm(df) for df in devil_fruits]

    return orm_devil_fruits


# TODO: Improve devil fruit create model to include relationships
@router.post("/create/", response_model=DevilFruit, tags=["Devil Fruits"])
def create_devil_fruit(
    *, session: Session = Depends(get_session), devil_fruit: DevilFruit
):
    db_devil_fruit = DevilFruit.model_validate(devil_fruit)

    session.add(db_devil_fruit)
    session.commit()

    session.refresh(db_devil_fruit)

    return db_devil_fruit
