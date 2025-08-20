# from fastapi import APIRouter
# # D:\marketmate\backend\api\routes\notify.py
# router = APIRouter()

# @router.get("/notify")
# def send_notifications():
#     # Placeholder: implement APScheduler/SMTP logic later
#     return {"message": "Notification check ran successfully"}



# backend/api/routes/notify.py
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
