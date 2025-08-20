# from fastapi import APIRouter, HTTPException, Depends
# from sqlalchemy.orm import Session
# from services.social_discovery import discover_social_profiles

# #from services.social_discovery import search_google
# from db.database import get_db
# from db.models import Company, Discovery
# from typing import List
# from pydantic import BaseModel
# from datetime import datetime

# router = APIRouter()

# # Inline schema for response
# class DiscoveryResponse(BaseModel):
#     company_id: int
#     domain: str
#     results: str
#     created_at: datetime

#     class Config:
#         orm_mode = True

# @router.post("/discover/{company_id}", response_model=DiscoveryResponse)
# def discover_profiles(company_id: int, db: Session = Depends(get_db)):
#     try:
#         # Step 1: Get the company by ID
#         company = db.query(Company).filter(Company.id == company_id).first()
#         if not company:
#             raise HTTPException(status_code=404, detail="Company not found")

#         # Step 2: Use the domain to search
#         #discovery_results = search_google(company.domain)
#         discovery_results = discover_social_profiles(company.domain)


#         # Step 3: Save discovery in DB
#         discovery = Discovery(
#             company_id=company.id,
#             results=discovery_results
#         )
#         db.add(discovery)
#         db.commit()
#         db.refresh(discovery)

#         # Step 4: Return response
#         return {
#             "company_id": company.id,
#             "domain": company.domain,
#             "results": discovery.results,
#             "created_at": discovery.created_at
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during discovery: {str(e)}")



import requests
import os

SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

SOCIAL_PLATFORMS = ["linkedin", "facebook", "instagram", "twitter", "tiktok", "youtube"]

def discover_social_profiles(domain: str):
    """
    Discover social profiles using SerpAPI if available.
    If SerpAPI fails (quota, key missing, etc.), return safe fallback.
    """
    if not SERPAPI_API_KEY:
        print("⚠️ SerpAPI key missing, using fallback.")
        return {
            "found": [],
            "missing": SOCIAL_PLATFORMS
        }

    try:
        query = f"{domain} site:" + " OR site:".join([f"{p}.com" for p in SOCIAL_PLATFORMS])
        url = "https://serpapi.com/search"
        params = {"q": query, "api_key": SERPAPI_API_KEY, "engine": "google"}
        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            raise Exception(f"SerpAPI request failed with status {response.status_code}: {response.text}")

        data = response.json()
        found = []
        missing = SOCIAL_PLATFORMS.copy()

        # ✅ Parse only if results exist
        for res in data.get("organic_results", []):
            link = res.get("link", "")
            for platform in SOCIAL_PLATFORMS:
                if platform in link and link not in found:
                    found.append(link)
                    if platform in missing:
                        missing.remove(platform)

        # ✅ If nothing was found, still return consistent structure
        return {
            "found": found,
            "missing": missing
        }

    except Exception as e:
        print(f"⚠️ SerpAPI discovery failed: {e}")
        # ✅ Always return fallback instead of breaking
        return {
            "found": [],
            "missing": SOCIAL_PLATFORMS
        }
