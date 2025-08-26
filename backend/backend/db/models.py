from sqlalchemy import Column, Integer, String, Text, ForeignKey, DECIMAL, TIMESTAMP,Float, JSON, DateTime,BigInteger, func
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
from sqlalchemy.sql import func

class Competitor(Base):
    __tablename__ = "competitors"

    id = Column(Integer, primary_key=True, index=True)
    competitor_name = Column(String(255), index=True)   # ✅ matches schema
    platform = Column(String(50))                       # ✅ matches schema
    followers_count = Column(Integer)
    engagement_rate = Column(DECIMAL(5, 2))
    last_checked = Column(DateTime, server_default=func.now())

    social_links = relationship("CompetitorSocialLink", back_populates="competitor", cascade="all, delete-orphan")
    metrics = relationship("CompetitorMetric", back_populates="competitor", cascade="all, delete-orphan")


class CompetitorSocialLink(Base):
    __tablename__ = "competitor_social_links"

    id = Column(Integer, primary_key=True, index=True)
    competitor_id = Column(Integer, ForeignKey("competitors.id"))
    platform = Column(String(50), index=True)
    url = Column(Text)
    last_checked = Column(DateTime, server_default=func.now())

    competitor = relationship("Competitor", back_populates="social_links")


class CompetitorMetric(Base):
    __tablename__ = "competitor_metrics"

    id = Column(Integer, primary_key=True, index=True)
    competitor_id = Column(Integer, ForeignKey("competitors.id"))
    platform = Column(String(50), index=True)
    followers_count = Column(BigInteger)          # ✅ bigint in schema
    engagement_rate = Column(Float)               # ✅ double precision
    sentiment_score = Column(Float)
    collected_at = Column(DateTime, server_default=func.now())

    competitor = relationship("Competitor", back_populates="metrics")
    
class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    domain = Column(String)
    scope = Column(String)
    category = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    reports = relationship("Report", back_populates="company")
    discoveries = relationship("Discovery", back_populates="company")  # ✅ existing


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

    company = relationship("Company", back_populates="discoveries")  # ✅ existing

class GeneratedContent(Base):
    __tablename__ = "generated_content"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50))  # Instagram, Twitter, etc.
    caption = Column(Text)
    hashtags = Column(Text)
    sentiment_score = Column(DECIMAL(5, 2))
    generated_at = Column(DateTime, server_default=func.now())


class ScheduledPost(Base):
    __tablename__ = "scheduled_posts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50))
    caption = Column(Text)
    hashtags = Column(Text)
    scheduled_time = Column(DateTime)  # when post should go live
    status = Column(String(20), default="pending")  # pending, posted, failed
