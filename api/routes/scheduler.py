# backend/api/routes/scheduler.py
from typing import List
from fastapi import APIRouter, Query
from services.scheduler_service import recommend_post_times

router = APIRouter()

@router.post("/best-post-times")
def best_post_times(
    brand_name: str,
    category: str,
    audience: str,
    platforms: List[str] = Query(..., description="Repeat ?platforms=Instagram&platforms=TikTok"),
    region: str = "PK"
):
    """
    Returns posting hours for each platform.
    - Always includes baseline research.
    - Adds Google Trends activity if available.
    """
    result = recommend_post_times(
        brand_name=brand_name,
        category=category,
        audience=audience,
        platforms=platforms,
        region=region
    )
    return {"best_times": result}
