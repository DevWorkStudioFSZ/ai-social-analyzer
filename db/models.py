from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    domain = Column(String)
    scope = Column(String)
    category = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    reports = relationship("Report", back_populates="company")
    discoveries = relationship("Discovery", back_populates="company")  # ✅ new

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    found_profiles = Column(Text)
    missing_platforms = Column(Text)
    post_ideas = Column(Text)
    seo_blog = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="reports")

class Discovery(Base):
    __tablename__ = "discoveries"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    results = Column(Text)  # store JSON string of discovery results
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="discoveries")  # ✅ new
