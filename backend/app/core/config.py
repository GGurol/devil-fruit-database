from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

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
        "http://mustafalazzawe.github.io",
        "https://mustafalazzawe.github.io",
    ]
    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]

    SQLITE_DB_PATH: str = "data/db/devil_fruits.db"

    GCS_BUCKET_NAME: str = "devil-fruit-database-bucket"
    GCS_DB_PATH: str = "db/devil_fruits.db"

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        if self.ENVIRONMENT.is_prod:
            return f"sqlite:///{self.SQLITE_DB_PATH}?mode=ro"
        return f"sqlite:///{self.SQLITE_DB_PATH}"


settings = Settings()
