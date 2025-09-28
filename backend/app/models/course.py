from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
import uuid


class Course(Base):
    __tablename__ = "courses"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    short_description = Column(String, nullable=True)
    thumbnail_url = Column(String, nullable=True)
    video_url = Column(String, nullable=True)
    
    # Course content
    content = Column(JSON, nullable=True)  # Store course modules, lessons etc.
    duration_minutes = Column(Integer, nullable=True)
    difficulty_level = Column(String, nullable=True)  # beginner, intermediate, advanced
    
    # Pricing and access
    price = Column(Float, default=0.0)
    required_package = Column(String, nullable=True)  # silver, gold, platinum
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    
    # SEO and metadata
    slug = Column(String, unique=True, index=True, nullable=True)
    tags = Column(JSON, nullable=True)  # Array of tags
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    enrollments = relationship("CourseEnrollment", back_populates="course")


class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    
    # Progress tracking
    progress_percentage = Column(Float, default=0.0)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    last_accessed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    enrolled_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")