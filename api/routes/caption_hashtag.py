from fastapi import APIRouter
from services.caption_hashtag_generator import generate_caption_and_hashtags

router = APIRouter()

@router.post("/generate-caption-hashtags")
def caption_and_hashtags(brand_name: str, category: str, audience: str, tone: str = "engaging"):
    """
    API endpoint to generate a caption and hashtags for a post.
    """
    try:
        result = generate_caption_and_hashtags(brand_name, category, audience, tone)
        return {"caption_hashtags": result}
    except Exception as e:
        return {"error": str(e)}
