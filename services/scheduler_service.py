from typing import List, Dict, Any, Optional, Union
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from services.trends_helper import trending_hours_for_keywords
from services.baseline_times import BASELINE_POST_TIMES, BASELINE_SOURCES

from db.database import SessionLocal
from db.models import ScheduledPost

_PLATFORM_KEYWORDS = {
    "Instagram": lambda category: ["instagram", "reels", f"{category} instagram"],
    "TikTok": lambda category: ["tiktok", "tiktok trends", f"{category} tiktok"],
    "YouTube": lambda category: ["youtube", "youtube shorts", f"{category} youtube"],
    "LinkedIn": lambda category: ["linkedin", f"{category} linkedin"],
    "X": lambda category: ["twitter", "x app", f"{category} twitter"],
    "Facebook": lambda category: ["facebook", f"{category} facebook"]
}

def recommend_post_times(
    brand_name: str,
    category: str,
    audience: str,
    platforms: List[str],
    region: str = "PK"
) -> Dict[str, dict]:
    results: Dict[str, dict] = {}
    for raw in platforms:
        platform = raw.capitalize()
        kw_fn = _PLATFORM_KEYWORDS.get(platform)
        keywords = kw_fn(category) if kw_fn else [category]
        trend_windows = trending_hours_for_keywords(keywords)
        results[platform] = {
            "trends": trend_windows,
            "baseline": BASELINE_POST_TIMES.get(platform, []),
            "note": "Trends reflect last 7 days of Google search activity. Baseline reflects industry research.",
            "sources": (["Google Trends (last 7 days)"] if trend_windows else []) + BASELINE_SOURCES.get(platform, [])
        }
    return results

def _to_datetime(value: Union[str, datetime, None]) -> datetime:
    if value is None:
        return datetime.utcnow()
    if isinstance(value, datetime):
        return value
    return datetime.fromisoformat(value)