from functools import lru_cache

from pydantic import PostgresDsn, computed_field, model_validator
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import URL
from app.core.constants import Environment


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )

    PROJECT_NAME: str = "Devil Fruit Database"

    DOMAIN: str = "localhost"
    ENVIRONMENT: Environment = Environment.DEV

    IS_ALLOWED_CREDENTIALS: bool = True
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost",
        "http://localhost:5173",
        "http://0.0.0.0:5173",
        "http://127.0.0.1:5173",
        "https://mustafalazzawe.github.io",
    ]
    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]

    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str = ""
    POSTGRES_DB: str = ""

    GCP_SQL_INSTANCE_CONNECTION_NAME: str = (
        "devil-fruit-database-id:us-east1:devil-fruit-database-psql-id"
    )

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        if self.ENVIRONMENT.is_prod:
            return URL.create(
                drivername="postgresql+pg8000",
                username=self.POSTGRES_USER,
                password=self.POSTGRES_PASSWORD,
                database=self.POSTGRES_DB,
                query={
                    "unix_sock": f"/cloudsql/{self.GCP_SQL_INSTANCE_CONNECTION_NAME}/.s.PGSQL.5432"
                },
            )

        return MultiHostUrl.build(
            scheme="postgresql",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )


settings = Settings()
