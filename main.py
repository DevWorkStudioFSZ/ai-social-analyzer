# backend/main.py
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as api_router
from services.scheduler import start_scheduler

app = FastAPI(
    title="MarketMate API",
    description="Backend API for MarketMate – AI Social & SEO Assistant",
    version="1.0.0"
)

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if deployed elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routes
app.include_router(api_router)

# Health check
@app.get("/")
def read_root():
    return {"message": "✅ MarketMate API is running"}

# Start background job scheduler
start_scheduler()
