# backend/services/competitors_service.py

import os
import re
import requests
from typing import Dict, List, Optional
from urllib.parse import urlparse

from db.database import SessionLocal   # ✅ add this
from db import models                   # ✅ add this

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")
SERP_ENDPOINT = "https://serpapi.com/search.json"

PLATFORMS = ["facebook", "instagram", "twitter", "tiktok", "youtube", "linkedin"]

STOPWORDS = {
    "top", "best", "alternatives", "competitors", "similar", "companies",
    "and", "or", "vs", "comparison", "analysis", "inc", "corp", "corporation",
    "company", "co", "ltd", "ag", "sa", "group", "brand", "brands"
}

# ----------------- Helpers -----------------

def _require_key():
    if not SERPAPI_API_KEY:
        raise ValueError("SerpAPI key missing. Set SERPAPI_API_KEY in your .env")


def _serpapi_search(params: Dict) -> Dict:
    _require_key()
    merged = {"engine": "google", "api_key": SERPAPI_API_KEY, **params}
    r = requests.get(SERP_ENDPOINT, params=merged, timeout=30)
    r.raise_for_status()
    return r.json()


def _clean_token(token: str) -> Optional[str]:
    t = token.strip().strip("·,;:()[]{}|").strip()
    if not t:
        return None
    if t.lower() in STOPWORDS:
        return None
    if not re.match(r"^[A-Za-z][A-Za-z&\-\s]{1,}$", t):
        return None
    return t


def _extract_from_text(text: str, company_lower: str) -> List[str]:
    candidates = set()
    parts = re.split(r"[•·\u2022,]|(?:\b\d+\.\s*)| and ", text, flags=re.IGNORECASE)
    for p in parts:
        matches = re.findall(r"\b([A-Z][A-Za-z&\-]+(?:\s[A-Z][A-Za-z&\-]+){0,2})\b", p)
        for m in matches:
            cleaned = _clean_token(m)
            if cleaned and cleaned.lower() != company_lower:
                candidates.add(cleaned)
    return list(candidates)


def _extract_competitors(company_name: str, serp_json: Dict) -> List[str]:
    company_lower = company_name.lower()
    names = []

    # 1) Try knowledge graph
    kg = serp_json.get("knowledge_graph")
    if kg:
        comps = kg.get("competitors") or kg.get("top_competitors") or []
        for c in comps:
            nm = c.get("name")
            if nm and nm.lower() != company_lower:
                names.append(nm)

    # 2) Organic results parsing
    seen = set(n.lower() for n in names)
    for res in serp_json.get("organic_results", []):
        for text in (res.get("title", ""), res.get("snippet", "")):
            for e in _extract_from_text(text, company_lower):
                if e.lower() not in seen:
                    names.append(e)
                    seen.add(e.lower())

    # 3) Related searches
    for rel in serp_json.get("related_searches", []):
        for e in _extract_from_text(rel.get("query", ""), company_lower):
            if e.lower() not in seen:
                names.append(e)
                seen.add(e.lower())

    return names[:10]


def _find_official_website(brand: str) -> Optional[str]:
    res = _serpapi_search({"q": f"{brand} official site", "num": 5})
    aggregators = {"wikipedia.org", "linkedin.com", "facebook.com", "instagram.com", "twitter.com",
                   "tiktok.com", "youtube.com", "crunchbase.com", "glassdoor.com", "indeed.com"}
    for item in res.get("organic_results", []):
        link = item.get("link")
        if link:
            host = urlparse(link).hostname or ""
            if not any(host.endswith(a) for a in aggregators):
                return link
    if res.get("organic_results"):
        return res["organic_results"][0].get("link")
    return None


def _find_social_links(brand: str) -> Dict[str, Optional[str]]:
    links = {p: None for p in PLATFORMS}
    for p in PLATFORMS:
        res = _serpapi_search({"q": f"{brand} site:{p}.com", "num": 5})
        for item in res.get("organic_results", []):
            link = item.get("link")
            if link and f"{p}.com" in link:
                links[p] = link
                break
    return links


def _mentions_last_30_days(brand: str, platform: str) -> int:
    q = f"site:{platform}.com {brand}"
    res = _serpapi_search({"q": q, "num": 1, "tbs": "qdr:m"})
    info = res.get("search_information", {})
    total = info.get("total_results") or 0
    if isinstance(total, str):
        total = int(re.sub(r"[^\d]", "", total) or 0)
    return total


def _compute_metrics(brand: str) -> Dict:
    mentions = {p: _mentions_last_30_days(brand, p) for p in PLATFORMS}
    presence_score = sum(1 for v in mentions.values() if v > 0)

    # Activity index normalized to 0–10
    total_mentions = sum(mentions.values())
    activity_index = min(10.0, round(total_mentions / 20000.0, 2)) if total_mentions else 0.0

    # Posting frequency = mentions / 4 weeks
    posting_freq = {p: v // 4 for p, v in mentions.items()}

    # Followers proxy = mentions * scale factor (fake but consistent)
    followers = {p: v * 20 for p, v in mentions.items()}

    # Engagement rate proxy (weighted by platform influence)
    weighted = (
        mentions["instagram"] * 1.5 +
        mentions["tiktok"] * 1.5 +
        mentions["twitter"] * 1.0 +
        mentions["youtube"] * 1.0 +
        mentions["facebook"] * 0.8 +
        mentions["linkedin"] * 0.7
    )
    engagement_rate = min(10.0, round(weighted / 20000.0, 2)) if weighted else 0.0

    return {
        "followers": followers,
        "posting_frequency_per_week": posting_freq,
        "engagement_rate": {"overall": engagement_rate},
        "mentions_last_30_days": mentions,
        "presence_score": presence_score,
        "activity_index": activity_index
    }

# ----------------- Main Public Function -----------------

def analyze_competitors(company_name: str, limit: int = 6) -> Dict:
    serp_json = _serpapi_search({"q": f"{company_name} competitors", "num": 10})
    names = _extract_competitors(company_name, serp_json)[:limit]

    competitors = []

    db = SessionLocal()
    try:
        for name in names:
            website = _find_official_website(name)
            social = _find_social_links(name)
            metrics = _compute_metrics(name)

            competitors.append({
                "name": name,
                "website": website,
                "social": social,
                "metrics": metrics
            })

            # ---------------- SAVE TO DB ----------------
            comp = (
                db.query(models.Competitor)
                .filter_by(competitor_name=name)   # ✅ FIXED (was .name)
                .first()
            )
            if not comp:
                comp = models.Competitor(
                    competitor_name=name,
                    platform=None,
                    followers_count=sum(metrics["followers"].values()),   # example aggregate
                    engagement_rate=metrics["engagement_rate"]["overall"],
                )
                db.add(comp)
                db.flush()  # to get comp.id

            # Save/update social links
            for platform, url in social.items():
                if url:
                    db.add(models.CompetitorSocialLink(
                        competitor_id=comp.id,
                        platform=platform,
                        url=url
                    ))

            # Save metrics per platform
            for platform, count in metrics["followers"].items():
                db.add(models.CompetitorMetric(
                    competitor_id=comp.id,
                    platform=platform,
                    followers_count=count,
                    engagement_rate=metrics["engagement_rate"]["overall"],
                    sentiment_score=None  # placeholder
                ))

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
    # -----------------------------------------------------

    chart_data = [
        {
            "competitor": c["name"],
            "presence_score": c["metrics"]["presence_score"],
            "activity_index": c["metrics"]["activity_index"],
            **{f"{plat}_mentions_month": c["metrics"]["mentions_last_30_days"][plat] for plat in PLATFORMS}
        }
        for c in competitors
    ]

    return {
        "company": company_name,
        "competitors": competitors,
        "chart_data": chart_data
    }
