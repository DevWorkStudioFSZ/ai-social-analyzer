from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from services.post_generator import generate_post_ideas
from db.database import get_db
from db.models import Company, Report
from datetime import datetime
import json

router = APIRouter()

@router.post("/generate-post-ideas")
def post_ideas(
    brand_name: str = Query(...),
    category: str = Query(...),
    audience: str = Query(...),
    num_ideas: int = Query(3),
    db: Session = Depends(get_db)
):
    try:
        result = generate_post_ideas(brand_name, category, audience, num_ideas)

        # Fetch company
        company = db.query(Company).filter(Company.name == brand_name).first()
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")

        report = Report(
            company_id=company.id,
            found_profiles=json.dumps({}),
            missing_platforms=json.dumps([]),
            post_ideas=json.dumps(result),
            seo_blog="",
            created_at=datetime.utcnow()
        )
        db.add(report)
        db.commit()

        return {"ideas": result}
    except Exception as e:
        return {"error": str(e)}

