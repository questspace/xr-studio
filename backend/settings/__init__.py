import os
from pydantic_settings import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "QuestSpace XR Studio"
    DEBUG_MODE: bool = True


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))
MONGO_USER = os.getenv("MONGO_USER", "mike")
MONGO_PASS = os.getenv("MONGO_PASSWORD", "questspace123")
MONGO_DB = os.getenv("MONGO_DB", "questspace_xrstudio")


class DatabaseSettings(BaseSettings):
    DB_URL: str = f"mongodb://{MONGO_USER}:{MONGO_PASS}@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}"
    DB_NAME: str = MONGO_DB


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()