import json
import os
import shutil
import time

from uuid import UUID
from pathlib import Path
from datetime import datetime
from sqlmodel import create_engine, SQLModel, Session, select

from core.config import settings
from models import (
    DevilFruit,
    FruitTypeAssociation,
    FruitTypeEnum,
    RomanizedName,
    TranslatedName,
    User,
    UserAwakening,
)

def get_engine_config():
    return {
        "connect_args": { "check_same_thread": False },
        "echo": settings.ENVIRONMENT.is_dev,
    }

def set_engine():
    return create_engine(str(settings.SQLALCHEMY_DATABASE_URI), **get_engine_config())

engine = set_engine()

def ensure_db_directory_exists():
    db_path = Path(settings.SQLITE_DB_PATH)
    db_dir = db_path.parent
    if not db_dir.exists():
        print(f"Creating database directory at {db_dir}")
        db_dir.mkdir(parents=True, exist_ok=True)

def init_db():
    print("Initializing local database...")
    try:
        ensure_db_directory_exists()
        SQLModel.metadata.create_all(engine)
        print("Database initialized successfully.")
    except Exception as e:
        print(f"Failed to initialize database: {e}")
        raise

def drop_db():
    db_path = Path(settings.SQLITE_DB_PATH)
    if db_path.exists():
        try:
            db_path.unlink()
            SQLModel.metadata.drop_all(engine)
            print("Local database dropped successfully.")
        except Exception as e:
            print(f"Failed to drop database: {e}")
            raise

def get_session():
    with Session(engine) as session:
        yield session

def load_json_data(json_file_path: str):
    with open(json_file_path, "r") as file:
        data = json.load(file)
        return data["devil_fruits"]
        
# --- CORRECTED FUNCTION SIGNATURE ---
def populate_db(json_file_path: str, upload: bool = False):
    retries = 5
    while retries > 0:
        try:
            init_db()
            break
        except Exception as e:
            print(f"Database not ready, retrying... {e}")
            retries -= 1
            time.sleep(2)

    print("Populating database with data from JSON...")
    devil_fruits_data = load_json_data(json_file_path)

    with Session(engine) as session:
        existing_fruit = session.exec(select(DevilFruit)).first()
        if existing_fruit:
            print("Database already populated. Skipping.")
            return

        for fruit_data in devil_fruits_data:
            devil_fruit = DevilFruit(
                fruit_id=UUID(fruit_data["fruit_id"]),
                ability=fruit_data["abilities"]["ability"],
                awakened_ability=fruit_data["abilities"]["awakened_ability"],
                is_canon=fruit_data["is_canon"],
            )
            session.add(devil_fruit)
            # ... (rest of population logic)

        session.commit()
        print("Database populated successfully.")