# backend/api/routes/trends.py
from fastapi import APIRouter, Query
from services.trends_helper import trending_hours_for_keywords

router = APIRouter()

@router.get("/trends")
def get_trends(keywords: str = Query(..., description="Comma-separated keywords")):
    """
    Example: /api/trends?keywords=instagram,tiktok,linkedin
    """
    kw_list = [kw.strip() for kw in keywords.split(",") if kw.strip()]
    top_hours = trending_hours_for_keywords(kw_list)
    return {"top_hours": top_hours}
