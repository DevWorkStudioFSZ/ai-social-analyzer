# backend/services/scheduler.py

from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from db.database import SessionLocal
from db import models


def check_stale_reports():
    db: Session = SessionLocal()
    try:
        three_days_ago = datetime.utcnow() - timedelta(days=3)

        # Get all latest reports for each company
        companies = db.query(models.Company).all()

        for company in companies:
            latest_report = (
                db.query(models.Report)
                .filter(models.Report.company_id == company.id)
                .order_by(models.Report.created_at.desc())
                .first()
            )

            if latest_report and latest_report.created_at < three_days_ago:
                print(f"⚠️ Reminder: {company.company_name} hasn't posted in 3+ days!")
                # (Optional: send email or push notification here)

    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_stale_reports, trigger="interval", hours=24)
    scheduler.start()
