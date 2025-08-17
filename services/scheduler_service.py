# backend/services/scheduler_service.py
from typing import Dict, List, Any, Optional, Union
from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from services.trends_helper import trending_hours_for_keywords
from services.baseline_times import BASELINE_POST_TIMES, BASELINE_SOURCES

# DB
from db.database import SessionLocal
from db.models import ScheduledPost

# -----------------------------
# Platform -> keywords for trends
# -----------------------------
_PLATFORM_KEYWORDS = {
    "Instagram": lambda category: [
        "instagram", "reels", f"{category} instagram"
    ],
    "TikTok": lambda category: [
        "tiktok", "tiktok trends", f"{category} tiktok"
    ],
    "YouTube": lambda category: [
        "youtube", "youtube shorts", f"{category} youtube"
    ],
    "LinkedIn": lambda category: [
        "linkedin", f"{category} linkedin"
    ],
    "X": lambda category: [
        "twitter", "x app", f"{category} twitter"
    ],
    "Facebook": lambda category: [
        "facebook", f"{category} facebook"
    ],
}

# -----------------------------
# Recommendations (no DB write)
# -----------------------------
def recommend_post_times(
    brand_name: str,
    category: str,
    audience: str,
    platforms: List[str],
    region: str = "PK"
) -> Dict[str, dict]:
    """
    Recommend post times using Google Trends + baseline research.
    - Always includes baseline (with sources).
    - If Trends has data, show both Trends + Baseline.

    NOTE: This function only computes and returns recommendations.
          Use the schedule_* helpers below to persist actual posts.
    """
    results: Dict[str, dict] = {}

    # Normalize platform names (case-insensitive)
    for raw in platforms:
        platform = raw.capitalize()

        kw_fn = _PLATFORM_KEYWORDS.get(platform)
        keywords = kw_fn(category) if kw_fn else [category]

        trend_windows = trending_hours_for_keywords(
            keywords=keywords, region=region
        )

        results[platform] = {
            "trends": trend_windows,
            "baseline": BASELINE_POST_TIMES.get(platform, []),
            "note": (
                "Trends reflect last 7 days of Google search activity. "
                "Baseline reflects industry research."
            ),
            "sources": (
                ["Google Trends (last 7 days)"] if trend_windows else []
            ) + BASELINE_SOURCES.get(platform, [])
        }

    return results


# -----------------------------
# Scheduling helpers (DB writes)
# -----------------------------
def _to_datetime(value: Union[str, datetime, None]) -> datetime:
    """
    Accepts ISO string or datetime (or None) and returns a datetime.
    - If None, returns utcnow().
    - If string, parses with datetime.fromisoformat().
      (Make sure your frontend sends ISO-8601 without timezone or convert before.)
    """
    if value is None:
        return datetime.utcnow()
    if isinstance(value, datetime):
        return value
    # Attempt ISO-8601 parse (e.g., "2025-08-17T14:30:00")
    return datetime.fromisoformat(value)


def schedule_post(
    platform: str,
    caption: Optional[str],
    hashtags: Optional[str],
    scheduled_time: Optional[Union[str, datetime]] = None,
    status: str = "pending",
) -> Dict[str, Any]:
    """
    Persist a single scheduled post into `scheduled_posts` table.

    Args:
        platform: e.g., "Instagram", "X"
        caption: text or None
        hashtags: text (space-separated or any format) or None
        scheduled_time: ISO-8601 string or datetime, defaults to now (UTC)
        status: defaults to "pending" (fits your schema)

    Returns:
        Dict with created row info OR {"error": "..."} on failure.
    """
    session: Session = SessionLocal()
    try:
        st = _to_datetime(scheduled_time)

        row = ScheduledPost(
            platform=platform,
            caption=caption,
            hashtags=hashtags,
            scheduled_time=st,
            status=status,
        )
        session.add(row)
        session.commit()
        session.refresh(row)
        return {
            "id": row.id,
            "platform": row.platform,
            "caption": row.caption,
            "hashtags": row.hashtags,
            "scheduled_time": row.scheduled_time,
            "status": row.status,
        }
    except Exception as e:
        session.rollback()
        return {"error": f"schedule_post failed: {e}"}
    finally:
        session.close()


def bulk_schedule_posts(
    posts: List[Dict[str, Any]],
    default_status: str = "pending",
) -> Dict[str, Any]:
    """
    Persist multiple posts into `scheduled_posts`.

    Each item in `posts` may contain:
      {
        "platform": str,              # required
        "caption": Optional[str],
        "hashtags": Optional[str],
        "scheduled_time": Union[str, datetime, None],  # optional; default now (UTC)
        "status": Optional[str]       # optional; default 'pending'
      }

    Returns:
      {"created": [...], "failed": [...]} with per-item results.
    """
    session: Session = SessionLocal()
    created: List[Dict[str, Any]] = []
    failed: List[Dict[str, Any]] = []

    try:
        for p in posts:
            try:
                platform = (p.get("platform") or "").strip()
                if not platform:
                    raise ValueError("platform is required")

                caption = p.get("caption")
                hashtags = p.get("hashtags")
                status = p.get("status") or default_status
                st = _to_datetime(p.get("scheduled_time"))

                row = ScheduledPost(
                    platform=platform,
                    caption=caption,
                    hashtags=hashtags,
                    scheduled_time=st,
                    status=status,
                )
                session.add(row)
                session.flush()  # get row.id before commit

                created.append({
                    "id": row.id,
                    "platform": row.platform,
                    "caption": row.caption,
                    "hashtags": row.hashtags,
                    "scheduled_time": row.scheduled_time,
                    "status": row.status,
                })
            except Exception as item_err:
                failed.append({"input": p, "error": str(item_err)})

        # Commit only if at least one succeeded; otherwise rollback
        if created:
            session.commit()
        else:
            session.rollback()

        return {"created": created, "failed": failed}

    except Exception as e:
        session.rollback()
        return {"created": created, "failed": failed + [{"error": str(e)}]}
    finally:
        session.close()


def schedule_after_delay(
    platform: str,
    caption: Optional[str],
    hashtags: Optional[str],
    delay_minutes: int = 10,
    status: str = "pending",
) -> Dict[str, Any]:
    """
    Convenience wrapper to schedule a single post at now + delay_minutes (UTC).
    """
    when = datetime.utcnow() + timedelta(minutes=delay_minutes)
    return schedule_post(
        platform=platform,
        caption=caption,
        hashtags=hashtags,
        scheduled_time=when,
        status=status,
    )
