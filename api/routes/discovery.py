from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from services.social_discovery import discover_social_profiles

#from services.social_discovery import search_google
from db.database import get_db
from db.models import Company, Discovery
from typing import List
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Inline schema for response
class DiscoveryResponse(BaseModel):
    company_id: int
    domain: str
    results: str
    created_at: datetime

    class Config:
        orm_mode = True

@router.post("/discover/{company_id}", response_model=DiscoveryResponse)
def discover_profiles(company_id: int, db: Session = Depends(get_db)):
    try:
        # Step 1: Get the company by ID
        company = db.query(Company).filter(Company.id == company_id).first()
        if not company:
            raise HTTPException(status_code=404, detail="Company not found")

        # Step 2: Use the domain to search
        #discovery_results = search_google(company.domain)
        discovery_results = discover_social_profiles(company.domain)


        # Step 3: Save discovery in DB
        discovery = Discovery(
            company_id=company.id,
            results=discovery_results
        )
        db.add(discovery)
        db.commit()
        db.refresh(discovery)

        # Step 4: Return response
        return {
            "company_id": company.id,
            "domain": company.domain,
            "results": discovery.results,
            "created_at": discovery.created_at
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during discovery: {str(e)}")
