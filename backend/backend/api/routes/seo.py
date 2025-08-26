from fastapi import APIRouter, Depends, HTTPException
from services.seo_generator import generate_seo_content
from db.database import get_db
from db.models import Company, Report
from sqlalchemy.orm import Session
from datetime import datetime
import json

router = APIRouter()

@router.post("/generate-seo")
def seo(company_name: str, industry: str, db: Session = Depends(get_db)):
    try:
        result = generate_seo_content(company_name, industry)

        # Find company
        company = db.query(Company).filter(Company.name == company_name).first()
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")

        # Create or update Report (only seo_blog)
        report = Report(
            company_id=company.id,
            found_profiles=json.dumps({}),
            missing_platforms=json.dumps([]),
            post_ideas=json.dumps([]),
            seo_blog=result,
            created_at=datetime.utcnow()
        )
        db.add(report)
        db.commit()

        return {"seo": result}
    except Exception as e:
        return {"error": str(e)}
