from fastapi import APIRouter
from services.recommendations import generate_strategy_recommendations

router = APIRouter()

@router.post("/recommend-strategy")
def strategy(category: str, scope: str):
    result = generate_strategy_recommendations(category, scope)
    return {"strategy": result}
