import traceback

from contextlib import asynccontextmanager
from uuid import UUID
from fastapi import Depends, FastAPI, HTTPException, Path, Query, Request
from fastapi.responses import JSONResponse
from sqlalchemy import func
from sqlmodel import Session, col, or_, select
from starlette.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import get_session

from app.models import (
    DevilFruit,
    DevilFruitSimple,
    DevilFruitWithRelationships,
    FruitTypeAssociation,
    FruitTypeEnum,
    FruitTypeRead,
    RomanizedName,
    TranslatedName,
    User,
    UserRead,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # on initializtion, do something
    yield

    # on end, clean up stuff here


app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=settings.ALLOWED_METHODS,
    allow_headers=settings.ALLOWED_HEADERS,
)


@app.exception_handler(Exception)
async def global_expection_handler(request: Request, e: Exception):
    if settings.ENVIRONMENT.is_prod:
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )
    else:
        return JSONResponse(
            status_code=500,
            content={"message": str(e), "traceback": traceback.format_exc()},
        )


@app.get("/")
def read_root():
    return {"message": "Hello, World"}


@app.get("/info")
def read_info():
    return {"title": settings.PROJECT_NAME, "db-server": settings.POSTGRES_SERVER}


@app.get("/info/devil-fruit/types/enum/", tags=["Info"])
def get_info_devil_fruit_type():
    return {"info": list(FruitTypeEnum)}


@app.get("/info/devil-fruit/types/", response_model=list[FruitTypeRead], tags=["Info"])
def get_info_devil_fruit_types(*, session: Session = Depends(get_session)):
    fruit_types = session.exec(
        select(FruitTypeAssociation).distinct(FruitTypeAssociation.type)
    )

    if not fruit_types:
        raise HTTPException(status_code=404, detail="No types found")

    return fruit_types


# devil fruit user routes
@app.get("/devil-fruit/user/", response_model=list[UserRead], tags=["Users"])
def read_devil_fruit_users(
    *,
    session: Session = Depends(get_session),
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, le=100),
):
    df_users = session.exec(select(User).offset(offset).limit(limit)).all()

    if not df_users:
        raise HTTPException(status_code=404, detail="No users found")

    return df_users


@app.post("/devil-fruit/user/", response_model=User, tags=["Users"])
def create_devil_fruit_user(*, session: Session = Depends(get_session), df_user: User):
    db_df_user = User.model_validate(df_user)

    session.add(db_df_user)
    session.commit()

    session.refresh(db_df_user)

    return db_df_user


# devil fruit routes
@app.get(
    "/devil-fruit/",
    response_model=list[DevilFruitWithRelationships],
    tags=["Devil Fruits"],
)
def read_devil_fruits(
    *,
    session: Session = Depends(get_session),
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, le=100),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")

    return devil_fruits


@app.get(
    "/devil-fruit/simple/",
    response_model=list[DevilFruitSimple],
    response_model_exclude_none=True,
    tags=["Devil Fruits"],
)
def read_devil_fruits_simple(
    *,
    session: Session = Depends(get_session),
    include_names: bool = Query(
        default=True, description="Include a romanized and translated name"
    ),
    include_abilities: bool = Query(default=False, description="Include ablitites"),
    include_type: bool = Query(default=False, description="Include fruit type"),
    include_metadata: bool = Query(
        default=False, description="Include metadata (i.e. is canon)"
    ),
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=100, le=100),
):
    devil_fruits = session.exec(select(DevilFruit).offset(offset).limit(limit)).all()

    if not devil_fruits:
        raise HTTPException(status_code=404, detail="No devil fruits found")

    simple_fruits = [
        DevilFruitSimple.from_devil_fruit(
            df,
            include_names=include_names,
            include_abilites=include_abilities,
            include_type=include_type,
            include_metadata=include_metadata,
        )
        for df in devil_fruits
    ]

    return simple_fruits


@app.get(
    "/devil-fruit/{fruit_id}",
    response_model=DevilFruitWithRelationships,
    tags=["Devil Fruits"],
)
def read_devil_fruit_by_id(*, session: Session = Depends(get_session), fruit_id: UUID):
    devil_fruit = session.get(DevilFruit, fruit_id)
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    return devil_fruit


@app.get(
    "/devil-fruit/name/{name}",
    response_model=DevilFruitWithRelationships,
    tags=["Devil Fruits"],
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

    return devil_fruit


@app.get(
    "/devil-fruit/type/{fruit_type}",
    response_model=list[DevilFruitSimple],
    tags=["Devil Fruits"],
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

    simple_fruits = [DevilFruitSimple.from_devil_fruit(df) for df in devil_fruits]

    return simple_fruits


@app.get(
    "/devil-fruit/user/{user}",
    response_model=DevilFruitWithRelationships,
    tags=["Devil Fruits"],
)
def read_devil_fruit_by_user(*, session: Session = Depends(get_session), user: str):
    devil_fruit = session.exec(
        select(DevilFruit).join(User).where(User.user == user)
    ).first()
    if not devil_fruit:
        raise HTTPException(status_code=404, detail="Devil fruit not found")

    return devil_fruit


@app.get(
    "/devil-fruit/search/{search_term}",
    response_model=list[DevilFruitWithRelationships],
    tags=["Devil Fruits"],
)
def search_devils_fruits(
    *,
    session: Session = Depends(get_session),
    search_term: str = Path(..., min_length=3),
    limit: int = Query(default=100, le=100),
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

    return devil_fruits


@app.post("/devil-fruit/", response_model=DevilFruit, tags=["Devil Fruits"])
def create_devil_fruit(
    *, session: Session = Depends(get_session), devil_fruit: DevilFruit
):
    db_devil_fruit = DevilFruit.model_validate(devil_fruit)

    session.add(db_devil_fruit)
    session.commit()

    session.refresh(db_devil_fruit)

    return db_devil_fruit
