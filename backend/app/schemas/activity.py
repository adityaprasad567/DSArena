import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class FavoriteRequest(BaseModel):
    algorithm_slug: str = Field(max_length=50)


class FavoriteOut(BaseModel):
    id: uuid.UUID
    algorithm_slug: str
    created_at: datetime

    class Config:
        from_attributes = True


class HistoryRequest(BaseModel):
    algorithm_slug: str = Field(max_length=50)


class HistoryOut(BaseModel):
    id: uuid.UUID
    algorithm_slug: str
    viewed_at: datetime

    class Config:
        from_attributes = True
