from fastapi import APIRouter

from .analyze import router as analyze_router
# from .notify import router as notify_router
from .reports import router as reports_router
from .seo import router as seo_router
# from .discovery import router as discovery_router
from .post_ideas import router as post_ideas_router
from .recommend_strategy import router as recommend_strategy_router
from .competitors import router as competitors_router
from .caption_hashtag import router as caption_hashtag_router
from .scheduler import router as scheduler_router

router = APIRouter()

router.include_router(analyze_router, prefix="/analyze", tags=["analyze"])
# router.include_router(notify_router, prefix="/notify", tags=["notify"])
router.include_router(reports_router, prefix="/reports", tags=["reports"])
router.include_router(seo_router, prefix="/seo", tags=["seo"])
router.include_router(post_ideas_router, prefix="/post-ideas", tags=["post_ideas"])
router.include_router(recommend_strategy_router, prefix="/recommend", tags=["recommendations"])
router.include_router(competitors_router, tags=["competitors"])
router.include_router(caption_hashtag_router, prefix="/caption-hashtag", tags=["caption_hashtag"])
router.include_router(scheduler_router, prefix="/scheduler", tags=["scheduler"])
