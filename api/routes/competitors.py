# backend/api/routes/competitors.py

from fastapi import APIRouter, HTTPException, Query
from services.competitors_service import analyze_competitors

router = APIRouter()

@router.get("/analyze")
def competitor_analyze(
    company_name: str = Query(..., description="Brand/company to analyze (e.g., 'Nike')"),
    limit: int = Query(6, ge=1, le=10, description="Max competitors to return")
):
    try:
        data = analyze_competitors(company_name, limit)
        return data
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Competitor analysis failed: {e}")
