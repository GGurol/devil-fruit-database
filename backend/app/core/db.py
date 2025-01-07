import json
import os
import time

from uuid import UUID
from sqlalchemy import Engine
from sqlmodel import create_engine, SQLModel, Session, select
from google.cloud.sql.connector import Connector

from app.core.config import settings
from app.models import (
    DevilFruit,
    FruitTypeAssociation,
    RomanizedName,
    TranslatedName,
    User,
    UserAwakening,
)


# helper function to return SQLAlchemy connection pool
def init_connection_pool(connector: Connector) -> Engine:
    # Python Connector database connection function
    def getconn():
        conn = connector.connect(
            settings.GCP_SQL_INSTANCE_CONNECTION_NAME,
            "pg8000",
            user=settings.POSTGRES_USER,
            password=settings.POSTGRES_PASSWORD,
            db=settings.POSTGRES_DB,
            ip_type="public",
        )
        return conn

    SQLALCHEMY_DATABASE_URI = f"postgresql+pg8000://"

    engine = create_engine(SQLALCHEMY_DATABASE_URI, creator=getconn)
    return engine


def get_engine_config():
    return {
        "echo": settings.ENVIRONMENT.is_dev,
    }


def set_engine():
    if settings.ENVIRONMENT.is_prod:
        # Initialize the Cloud SQL Python Connector when using prod environment
        connector = Connector()

        return init_connection_pool(connector)

    return create_engine(str(settings.SQLALCHEMY_DATABASE_URI), **get_engine_config())


engine = set_engine()


def init_db():
    SQLModel.metadata.create_all(engine)


def drop_db():
    SQLModel.metadata.drop_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


def load_json_data(json_file_path: str):
    with open(json_file_path, "r") as file:
        data = json.load(file)

        return data["devil_fruits"]


def verify_db_population() -> bool:
    with Session(engine) as session:
        try:
            # Check tables exist and have data
            devil_fruits = session.exec(select(DevilFruit)).all()

            print(f"\nVerification Results:")
            print(f"Devil Fruits: {len(devil_fruits)}")

            if len(devil_fruits) == 0:
                print("ERROR: Data population failed - empty tables")
                return False

            # Sample check
            sample = session.exec(select(DevilFruit).limit(1)).first()
            print(f"\nSample Devil Fruit:")
            print(f"ID: {sample.fruit_id}")

            return True
        except Exception as e:
            print(f"ERROR: Database verification failed - {str(e)}")
            return False


def populate_db(json_file_path: str):
    # Wait for database to be ready
    retries = 5
    while retries > 0:
        try:
            init_db()
            break
        except Exception as e:
            print(f"Database not ready, retrying... {e}")
            retries -= 1
            time.sleep(2)

    print("Database ready, populating...")

    devil_fruits_data = load_json_data(json_file_path)

    with Session(engine) as session:
        for fruit_data in devil_fruits_data:
            # Create devil fruit table
            devil_fruit = DevilFruit(
                fruit_id=UUID(fruit_data["fruit_id"]),
                ability=fruit_data["abilities"]["ability"],
                awakened_ability=fruit_data["abilities"]["awakened_ability"],
                is_canon=fruit_data["is_canon"],
            )
            session.add(devil_fruit)

            # Add romanized names
            for rname in fruit_data["names"]["romanized_names"]:
                romanized_name = RomanizedName(
                    name=rname["name"],
                    is_spoiler=rname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(romanized_name)

            # Add translated names
            for tname in fruit_data["names"]["translated_names"]:
                translated_name = TranslatedName(
                    name=tname["name"],
                    is_spoiler=tname["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(translated_name)

            # Add types
            for type_data in fruit_data["types"]:
                fruit_type = FruitTypeAssociation(
                    type=type_data["type"],
                    is_spoiler=type_data["is_spoiler"],
                    fruit_id=devil_fruit.fruit_id,
                )
                session.add(fruit_type)

            # Add current users
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

                    # Add user awakening
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

            # Add previous users
            if fruit_data["users"]["previous_users"]:
                for user_data in fruit_data["users"]["previous_users"]:
                    user = User(
                        user=user_data["user"],
                        is_current=False,
                        is_spoiler=user_data["is_spoiler"],
                        fruit_id=devil_fruit.fruit_id,
                    )
                    session.add(user)

                    # Add user awakening
                    awakening = UserAwakening(
                        is_awakened=user_data["awakening"]["is_awakened"],
                        is_spoiler=user_data["awakening"]["is_spoiler"],
                        user=user,
                    )
                    session.add(awakening)

        session.commit()

        verify_db_population()
