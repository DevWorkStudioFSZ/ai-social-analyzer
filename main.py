from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router
from api.routes.trends import router as trends_router
from api.routes.baseline_times import router as baseline_router
from api.routes.competitors import router as competitors_router   # 👈 add this


app = FastAPI(
    title="MarketMate API",
    description="Backend API for MarketMate – AI Social & SEO Assistant",
    version="1.0.0"
)

# Include all API routes under /api
app.include_router(api_router)

app.include_router(baseline_router, prefix="/api")
app.include_router(trends_router, prefix="/api")
app.include_router(competitors_router, prefix="/api/competitors")  # 👈 mount properly

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"message": "✅ MarketMate API is running"}
