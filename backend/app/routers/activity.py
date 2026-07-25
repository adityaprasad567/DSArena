from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.activity import FavoriteOut, FavoriteRequest, HistoryOut, HistoryRequest
from app.services import activity_service

router = APIRouter(tags=["activity"])


@router.post("/favorite", response_model=FavoriteOut | None)
def toggle_favorite(
    data: FavoriteRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return activity_service.toggle_favorite(db, current_user.id, data.algorithm_slug)


@router.get("/favorites", response_model=list[FavoriteOut])
def get_favorites(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return activity_service.list_favorites(db, current_user.id)


@router.post("/history", response_model=HistoryOut)
def add_history(
    data: HistoryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return activity_service.record_history(db, current_user.id, data.algorithm_slug)


@router.get("/history", response_model=list[HistoryOut])
def get_history(
    limit: int = Query(default=10, le=50),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return activity_service.list_history(db, current_user.id, limit)
