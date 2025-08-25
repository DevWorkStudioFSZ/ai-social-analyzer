from fastapi import APIRouter
from services.baseline_times import BASELINE_POST_TIMES, BASELINE_SOURCES

router = APIRouter()

@router.get("/baseline-times")
def get_baseline_times():
    return {
        "times": BASELINE_POST_TIMES,
        "sources": BASELINE_SOURCES
    }
    