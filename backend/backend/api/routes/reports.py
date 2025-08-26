from fastapi import APIRouter, HTTPException
from db.models import Company, Report
from db.database import SessionLocal
from sqlalchemy.orm import Session
# D:\marketmate\backend\api\routes\reports.py
router = APIRouter()

@router.get("/reports/{company_name}")
def get_reports(company_name: str):
    db: Session = SessionLocal()
    company = db.query(Company).filter(Company.name == company_name).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    reports = db.query(Report).filter(Report.company_id == company.id).all()
    return {"company": company.name, "reports": [r.id for r in reports]}
