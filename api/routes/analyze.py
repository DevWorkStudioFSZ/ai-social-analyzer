
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db.models import Company, Report
from db.database import SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
import json

from services.social_discovery import discover_social_profiles
from services.post_generator import generate_post_ideas
from services.recommendations import generate_strategy_recommendations

# ✅ Define the router FIRST before any route decorators
router = APIRouter()
class AnalyzeRequest(BaseModel):
    company_name: str
    domain: str
    scope: str
    category: str

@router.post("/analyze")
def analyze_company(payload: AnalyzeRequest):
    db: Session = SessionLocal()
    try:
        brand = payload.company_name.strip() or "Your Brand"
        audience = payload.scope.strip() or "a general audience"
        category = payload.category.strip() or "general"

        # Step 1: Safe social discovery
        try:
            discovery_data = discover_social_profiles(payload.domain)
            found_profiles = discovery_data.get("found", [])
            missing = discovery_data.get("missing", [])
        except Exception as e:
            print("⚠️ SerpAPI discovery failed:", e)
            found_profiles = []
            missing = ["linkedin", "facebook", "instagram", "twitter", "tiktok", "youtube"]

        # Step 2: Save company
        company = Company(
            name=payload.company_name,
            domain=payload.domain,
            scope=payload.scope,
            category=payload.category
        )
        db.add(company)
        db.commit()
        db.refresh(company)

        # Step 3: Safe recommendations
        try:
            recommendation_text = generate_strategy_recommendations(category=category, scope=audience)
            recommendations = [rec.strip() for rec in recommendation_text.split(".") if rec.strip()]
        except Exception as e:
            print("⚠️ Recommendation generation failed:", e)
            recommendations = ["Focus on social media marketing", "Engage with audience regularly"]

        # Step 4: Safe post ideas
        try:
            post_ideas_text = generate_post_ideas(brand_name=brand, category=category, audience=audience, num_ideas=5)
            post_ideas = [line.split(". ", 1)[1] for line in post_ideas_text.strip().split("\n") if ". " in line]
        except Exception as e:
            print("⚠️ Post ideas generation failed:", e)
            post_ideas = ["Post about brand story", "Share customer testimonials"]

        # Step 5: SEO blog
        seo_blog = {
            "title": f"Top Strategies for {category} Brands in 2025",
            "meta": f"Explore top digital strategies for {brand} to grow online.",
            "keywords": [payload.domain.split('.')[0] if payload.domain else "brand", category.lower(), "marketing", "2025 trends"]
        }

        # Step 6: Save report
        report = Report(
            company_id=company.id,
            found_profiles=json.dumps(found_profiles),
            missing_platforms=json.dumps(missing),
            post_ideas=json.dumps(post_ideas),
            seo_blog=json.dumps(seo_blog),
            created_at=datetime.utcnow()
        )
        db.add(report)
        db.commit()

        return {
            "found_profiles": found_profiles,
            "missing_platforms": missing,
            "recommendation": recommendations,
            "post_ideas": post_ideas,
            "seo_blog": seo_blog
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    finally:
        db.close()






# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from db.models import Company, Report
# from db.database import SessionLocal
# from sqlalchemy.orm import Session
# from datetime import datetime
# import json

# from services.social_discovery import discover_social_profiles
# from services.post_generator import generate_post_ideas
# from services.recommendations import generate_strategy_recommendations

# # ✅ Define the router FIRST
# router = APIRouter()

# class AnalyzeRequest(BaseModel):
#     company_name: str
#     domain: str
#     scope: str
#     category: str

# @router.post("/analyze")
# def analyze_company(payload: AnalyzeRequest):
#     db: Session = SessionLocal()
#     try:
#         # Fallbacks in case frontend sends empty strings
#         brand = payload.company_name.strip() or "Your Brand"
#         audience = payload.scope.strip() or "a general audience"
#         category = payload.category.strip() or "general"

#         # Step 1: Discover social profiles with fallback if SerpAPI fails
#         try:
#             discovery_data = discover_social_profiles(payload.domain)
#         except Exception as e:
#             print("⚠️ SerpAPI discovery failed:", e)
#             # fallback mock data
#             discovery_data = {
#                 "found": ["linkedin.com/example", "youtube.com/example"],
#                 "missing": ["facebook", "instagram", "twitter", "tiktok"]
#             }

#         found_profiles = discovery_data.get("found", [])
#         missing = discovery_data.get("missing", [])

#         # Step 2: Save company
#         company = Company(
#             name=payload.company_name,
#             domain=payload.domain,
#             scope=payload.scope,
#             category=payload.category
#         )
#         db.add(company)
#         db.commit()
#         db.refresh(company)

#         # Step 3: Generate AI-powered strategy recommendations using Gemini
#         recommendation_text = generate_strategy_recommendations(
#             category=category,
#             scope=audience
#         )
#         recommendations = [rec.strip() for rec in recommendation_text.split(".") if rec.strip()]

#         # Step 4: Generate AI-powered post ideas using Gemini
#         post_ideas_text = generate_post_ideas(
#             brand_name=brand,
#             category=category,
#             audience=audience,
#             num_ideas=5
#         )
#         post_ideas = [line.split(". ", 1)[1] for line in post_ideas_text.strip().split("\n") if ". " in line]

#         # Step 5: Generate basic SEO blog structure
#         seo_blog = {
#             "title": f"Top Strategies for {category} Brands in 2025",
#             "meta": f"Explore top digital strategies for {brand} to grow online.",
#             "keywords": [payload.domain.split('.')[0], category.lower(), "marketing", "2025 trends"]
#         }

#         # Step 6: Save report
#         report = Report(
#             company_id=company.id,
#             found_profiles=json.dumps(found_profiles),
#             missing_platforms=json.dumps(missing),
#             post_ideas=json.dumps(post_ideas),
#             seo_blog=json.dumps(seo_blog),
#             created_at=datetime.utcnow()
#         )
#         db.add(report)
#         db.commit()

#         # Final API response
#         return {
#             "found_profiles": found_profiles,
#             "missing_platforms": missing,
#             "recommendation": recommendations,
#             "post_ideas": post_ideas,
#             "seo_blog": seo_blog
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

#     finally:
# #         db.close()
# # @router.post("/analyze")
# # def analyze_company(payload: AnalyzeRequest):
# #     db: Session = SessionLocal()
# #     try:
# #         brand = payload.company_name.strip() or "Your Brand"
# #         audience = payload.scope.strip() or "a general audience"
# #         category = payload.category.strip() or "general"

# #         # Safe social discovery
# #         try:
# #             discovery_data = discover_social_profiles(payload.domain)
#         except Exception as e:
#             print("⚠️ SerpAPI discovery failed:", e)
#             discovery_data = {
#                 "found": ["linkedin.com/example", "youtube.com/example"],
#                 "missing": ["facebook", "instagram", "twitter", "tiktok"]
#             }

#         found_profiles = discovery_data.get("found", [])
#         missing = discovery_data.get("missing", [])

#         # Safe recommendations
#         try:
#             recommendation_text = generate_strategy_recommendations(
#                 category=category, scope=audience
#             )
#             recommendations = [rec.strip() for rec in recommendation_text.split(".") if rec.strip()]
#         except Exception as e:
#             print("⚠️ Recommendation generation failed:", e)
#             recommendations = ["Focus on social media marketing", "Engage with audience regularly"]

#         # Safe post ideas
#         try:
#             post_ideas_text = generate_post_ideas(
#                 brand_name=brand,
#                 category=category,
#                 audience=audience,
#                 num_ideas=5
#             )
#             post_ideas = [line.split(". ", 1)[1] for line in post_ideas_text.strip().split("\n") if ". " in line]
#         except Exception as e:
#             print("⚠️ Post ideas generation failed:", e)
#             post_ideas = ["Post about brand story", "Share customer testimonials"]

#         # Safe SEO blog
#         seo_blog = {
#             "title": f"Top Strategies for {category} Brands in 2025",
#             "meta": f"Explore top digital strategies for {brand} to grow online.",
#             "keywords": [payload.domain.split('.')[0], category.lower(), "marketing", "2025 trends"]
#         }

#         # Optional: skip DB save if testing
#         # You can comment out DB operations for now to isolate errors

#         return {
#             "found_profiles": found_profiles,
#             "missing_platforms": missing,
#             "recommendation": recommendations,
#             "post_ideas": post_ideas,
#             "seo_blog": seo_blog
#         }

#     except Exception as e:
#         print("🔥 Analysis failed:", e)
#         raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
#     finally:
#         db.close()
