import traceback
from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from starlette.middleware.cors import CORSMiddleware

# CORRECTED: Removed 'app.' prefix from all imports
from core.config import settings
from core.db import get_session
# NOTE: The GCS functions are removed as they are not needed for isolated local development
# from core.db import download_db_from_gcs, upload_db_to_gcs 
from api.router import api_router
from models import (
    FruitTypeAssociation,
    FruitTypeEnum,
    FruitTypeRead,
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This part can be simplified as we are not using GCP for local dev
    print("Application startup...")
    yield
    print("Application shutdown...")

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    # This can be simplified for local development
    allow_origins=["*"], 
    allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_expection_handler(request: Request, e: Exception):
    print(f"Error: {str(e)}")
    print(f"Traceback: {traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"message": str(e), "traceback": traceback.format_exc()},
    )


@app.get("/")
def read_root():
    return {"message": "Hello, World"}


@app.get("/info")
def read_info():
    return {"title": settings.PROJECT_NAME}


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
