from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

# Example placeholder notifications
NOTIFICATIONS = [
    "New report available",
    "Caption generation completed",
    "System maintenance at 5 PM"
]

@router.get("/notify")
def send_notifications():
    # Later, you can add APScheduler to add notifications dynamically
    return {"notifications": NOTIFICATIONS, "timestamp": datetime.utcnow()}
