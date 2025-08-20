# from fastapi import APIRouter
# from services.caption_hashtag_generator import generate_caption_and_hashtags
# # D:\marketmate\backend\api\routes\caption_hashtag.py
# router = APIRouter()

# @router.post("/generate-caption-hashtags")
# def caption_and_hashtags(brand_name: str, category: str, audience: str, tone: str = "engaging"):
#     """
#     API endpoint to generate a caption and hashtags for a post.
#     """
#     try:
#         result = generate_caption_and_hashtags(brand_name, category, audience, tone)
#         return {"caption_hashtags": result}
#     except Exception as e:
#         return {"error": str(e)}





from fastapi import APIRouter
from pydantic import BaseModel
from services.caption_hashtag_generator import generate_caption_and_hashtags

router = APIRouter()

class CaptionRequest(BaseModel):
    brand_name: str
    category: str
    audience: str
    tone: str = "engaging"

@router.post("/generate-caption-hashtags")
def caption_and_hashtags(payload: CaptionRequest):
    """
    Generate social media caption + hashtags.
    """
    try:
        result = generate_caption_and_hashtags(
            payload.brand_name, payload.category, payload.audience, payload.tone
        )
        return {"caption_hashtags": result}
    except Exception as e:
        return {"error": str(e)}
