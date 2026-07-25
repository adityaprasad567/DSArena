import uuid

from sqlalchemy.orm import Session

from app.models.favorite import Favorite
from app.models.history import History


def toggle_favorite(db: Session, user_id: uuid.UUID, slug: str) -> Favorite | None:
    """Adds the favorite if absent, removes it if present. Returns the row if added, None if removed."""
    existing = (
        db.query(Favorite)
        .filter(Favorite.user_id == user_id, Favorite.algorithm_slug == slug)
        .first()
    )
    if existing:
        db.delete(existing)
        db.commit()
        return None
    favorite = Favorite(user_id=user_id, algorithm_slug=slug)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return favorite


def list_favorites(db: Session, user_id: uuid.UUID) -> list[Favorite]:
    return db.query(Favorite).filter(Favorite.user_id == user_id).order_by(Favorite.created_at.desc()).all()


def record_history(db: Session, user_id: uuid.UUID, slug: str) -> History:
    entry = History(user_id=user_id, algorithm_slug=slug)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def list_history(db: Session, user_id: uuid.UUID, limit: int = 10) -> list[History]:
    return (
        db.query(History)
        .filter(History.user_id == user_id)
        .order_by(History.viewed_at.desc())
        .limit(limit)
        .all()
    )
