

# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from db.models import Company, Report
# from db.database import SessionLocal
# from sqlalchemy.orm import Session
# from datetime import datetime
# import json

# from services.social_discovery import discover_social_profiles

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
#         # Step 1: Discover social profiles
#         discovery_data = discover_social_profiles(payload.domain)
#         found_profiles = discovery_data["found"]
#         missing = discovery_data["missing"]

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

#         # Step 3: Generate dynamic recommendations
#         recommendation = {}
#         for platform in missing:
#             if platform == "linkedin":
#                 recommendation[platform] = "Create a professional LinkedIn page to build B2B trust."
#             elif platform == "twitter":
#                 recommendation[platform] = "Use Twitter for real-time updates and customer interaction."
#             elif platform == "tiktok":
#                 recommendation[platform] = "Start posting short-form videos to engage a younger audience."
#             elif platform == "youtube":
#                 recommendation[platform] = "Launch a YouTube channel to publish tutorials or case studies."
#             elif platform == "facebook":
#                 recommendation[platform] = "Build a Facebook page for community building and ads."
#             elif platform == "instagram":
#                 recommendation[platform] = "Leverage Instagram for visual branding and reels."

#         for platform in found_profiles:
#             recommendation[platform] = f"Maintain regular and engaging content on {platform.capitalize()}."

#         # Step 4: Sample post ideas
#         post_ideas = [
#             "Share a behind-the-scenes video of your team.",
#             "Post a client testimonial or review.",
#             "Showcase a new product or feature demo.",
#             "Share industry tips related to your business.",
#             "Celebrate your team's milestones or company anniversaries."
#         ]

#         # Step 5: Sample SEO blog generation
#         seo_blog = {
#             "title": f"Top Strategies for {payload.category} Brands in 2025",
#             "meta": f"Explore top digital strategies for {payload.company_name} to grow online.",
#             "keywords": [payload.domain.split('.')[0], payload.category.lower(), "marketing", "2025 trends"]
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

#         return {
#             "found_profiles": found_profiles,
#             "missing_platforms": missing,
#             "recommendation": recommendation,
#             "post_ideas": post_ideas,
#             "seo_blog": seo_blog
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

#     finally:
#         db.close()


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
        # Fallbacks in case frontend sends empty strings
        brand = payload.company_name.strip() or "Your Brand"
        audience = payload.scope.strip() or "a general audience"
        category = payload.category.strip() or "general"

        # Step 1: Discover social profiles
        discovery_data = discover_social_profiles(payload.domain)
        found_profiles = discovery_data["found"]
        missing = discovery_data["missing"]

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

        # Step 3: Generate AI-powered strategy recommendations using Gemini
        recommendation_text = generate_strategy_recommendations(
        category=category,
        scope=audience
        )

# 🛠️ Convert to list
        recommendations = [rec.strip() for rec in recommendation_text.split(".") if rec.strip()]


        # Step 4: Generate AI-powered post ideas using Gemini
        post_ideas_text = generate_post_ideas(
            brand_name=brand,
            category=category,
            audience=audience,
            num_ideas=5
        )

        # Parse post ideas into list format (from numbered list)
        post_ideas = [line.split(". ", 1)[1] for line in post_ideas_text.strip().split("\n") if ". " in line]

        # Step 5: Generate basic SEO blog structure
        seo_blog = {
            "title": f"Top Strategies for {category} Brands in 2025",
            "meta": f"Explore top digital strategies for {brand} to grow online.",
            "keywords": [payload.domain.split('.')[0], category.lower(), "marketing", "2025 trends"]
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

        # Final API response
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
