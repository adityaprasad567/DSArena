from fastapi import APIRouter

from app.utils.algorithm_catalog import ALGORITHM_CATALOG

router = APIRouter(tags=["algorithms"])


@router.get("/algorithms")
def list_algorithms():
    return ALGORITHM_CATALOG
