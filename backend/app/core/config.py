import os
from typing import Optional
from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict

# CORRECTED: Removed 'app.' prefix
from core.constants import Environment

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
    ]
    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]

    SQLITE_DB_PATH: str = "data/db/devil_fruits.db"
    
    # The following GCP settings are not needed for isolated local development
    # GC_PROJECT_ID: str = "devil-fruit-database-id"
    # ...

    @computed_field
    @property
    def USE_GCP(self) -> bool:
        """Determine if GCP services should be used."""
        return self.ENVIRONMENT.is_prod or (self.ENVIRONMENT.is_dev and os.getenv('USE_GCP', 'false').lower() == 'true')

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        if self.ENVIRONMENT.is_prod:
            return f"sqlite:///{self.SQLITE_DB_PATH}?mode=ro"
        return f"sqlite:///{self.SQLITE_DB_PATH}"


settings = Settings()
