from fastapi import APIRouter

router = APIRouter()

@router.get("/notify")
def send_notifications():
    # Placeholder: implement APScheduler/SMTP logic later
    return {"message": "Notification check ran successfully"}
