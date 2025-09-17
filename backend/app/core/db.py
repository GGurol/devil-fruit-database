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
    """Ensure the database directory exists."""
    db_path = Path(settings.SQLITE_DB_PATH)
    db_dir = db_path.parent
    if not db_dir.exists():
        print(f"Creating database directory at {db_dir}")
        db_dir.mkdir(parents=True, exist_ok=True)

def init_db():
    print("Ensuring database directory exists...")
    # This function now only ensures the directory is ready.
    # Table creation is now handled by the management script.
    try:
        ensure_db_directory_exists()
        print("Database directory is ready.")
    except Exception as e:
        print(f"Failed to ensure database directory exists: {e}")
        raise

def drop_db():
    """Deletes the SQLite database file."""
    db_path = Path(settings.SQLITE_DB_PATH)
    if db_path.exists():
        try:
            db_path.unlink()
            print("Local database file dropped successfully.")
        except Exception as e:
            print(f"Failed to drop database file: {e}")
            raise

def get_session():
    with Session(engine) as session:
        yield session

def load_json_data(json_file_path: str):
    with open(json_file_path, "r") as file:
        data = json.load(file)
        return data["devil_fruits"]
        
def populate_db(json_file_path: str, upload: bool = False):
    # The initial init_db() call is removed from here
    # as table creation is now handled before this function is called.
    print("Populating database with data from JSON...")
    devil_fruits_data = load_json_data(json_file_path)

    with Session(engine) as session:
        existing_fruit = session.exec(select(DevilFruit)).first()
        if existing_fruit:
            print("Database already contains data. Skipping population.")
            return

        for fruit_data in devil_fruits_data:
            devil_fruit = DevilFruit(
                fruit_id=UUID(fruit_data["fruit_id"]),
                ability=fruit_data["abilities"]["ability"],
                awakened_ability=fruit_data["abilities"]["awakened_ability"],
                is_canon=fruit_data["is_canon"],
            )
            session.add(devil_fruit)

            for rname in fruit_data["names"]["romanized_names"]:
                romanized_name = RomanizedName(
                    name=rname["name"],
                    is_spoiler=rname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(romanized_name)

            for tname in fruit_data["names"]["translated_names"]:
                translated_name = TranslatedName(
                    name=tname["name"],
                    is_spoiler=tname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(translated_name)

            for type_data in fruit_data["types"]:
                fruit_type = FruitTypeAssociation(
                    type=type_data["type"],
                    is_spoiler=type_data["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(fruit_type)

            if fruit_data["users"]["current_users"]:
                for user_data in fruit_data["users"]["current_users"]:
                    user = User(
                        user=user_data["user"],
                        is_artificial=user_data["is_artificial"],
                        is_current=True,
                        is_spoiler=user_data["is_spoiler"],
                        fruit_id=devil_fruit.fruit_id,
                    )
                    session.add(user)
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

            if fruit_data["users"]["previous_users"]:
                for user_data in fruit_data["users"]["previous_users"]:
                    user = User(
                        user=user_data["user"],
                        is_current=False,
                        is_spoiler=user_data["is_spoiler"],
                        fruit_id=devil_fruit.fruit_id,
                    )
                    session.add(user)
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

        session.commit()
        print("Database populated successfully.")