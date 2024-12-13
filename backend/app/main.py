import traceback

from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, Request
from fastapi.responses import JSONResponse
from sqlmodel import Session
from starlette.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import drop_db, get_session, init_db

from app.models import DevilFruit, FruitTypeEnum, RomanizedName, User


@asynccontextmanager
async def lifespan(app: FastAPI):
    # on initializtion, do something
    yield

    # on end, clean up stuff here
    drop_db()


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


@app.get("/info/devil-fruit-types/", tags=["Info"])
def get_info_df_type():
    return {"info": list(FruitTypeEnum)}


@app.post("/devil-fruit-user/", response_model=User, tags=["Users"])
def create_df_user(*, session: Session = Depends(get_session), df_user: User):
    db_df_user = User.model_validate(df_user)

    session.add(db_df_user)
    session.commit()

    session.refresh(db_df_user)

    return db_df_user


@app.post("/devil-fruit/", response_model=DevilFruit, tags=["Devil Fruits"])
def create_devil_fruit(
    *, session: Session = Depends(get_session), devil_fruit: DevilFruit
):
    db_devil_fruit = DevilFruit.model_validate(devil_fruit)

    session.add(db_devil_fruit)
    session.commit()

    session.refresh(db_devil_fruit)

    return db_devil_fruit
