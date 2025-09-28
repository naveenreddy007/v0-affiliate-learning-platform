from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
import uuid


class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_superuser = Column(Boolean, default=False)
    
    # Profile fields
    avatar_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    referral_code = Column(String, unique=True, index=True, nullable=True)
    referred_by = Column(String, ForeignKey("users.id"), nullable=True)
    
    # Package information
    package_type = Column(String, nullable=True)  # silver, gold, platinum
    package_purchased_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    referrer = relationship("User", remote_side=[id])
    enrollments = relationship("CourseEnrollment", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    commissions = relationship("Commission", back_populates="user", foreign_keys="Commission.user_id")