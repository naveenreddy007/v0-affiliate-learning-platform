#!/usr/bin/env python3
"""
Seed data for Raju Affiliate Learning Platform
Creates sample courses and users for development
"""

from app.db.base import SessionLocal
from app.models.user import User
from app.models.course import Course
from app.core.security import get_password_hash
import uuid

def create_sample_data():
    db = SessionLocal()
    
    try:
        print("🌱 Seeding database with sample data...")
        
        # Create sample courses based on your pricing packages
        courses_data = [
            # Silver Package Courses (15+ courses)
            {
                "title": "Digital Marketing Fundamentals",
                "description": "Master the basics of digital marketing including SEO, social media, and content marketing.",
                "short_description": "Learn digital marketing basics",
                "required_package": "silver",
                "price": 0.0,
                "difficulty_level": "beginner",
                "duration_minutes": 120,
                "is_featured": True,
                "tags": ["digital marketing", "seo", "social media"]
            },
            {
                "title": "Affiliate Marketing 101",
                "description": "Complete guide to starting your affiliate marketing journey and earning your first commission.",
                "short_description": "Start your affiliate marketing journey",
                "required_package": "silver",
                "price": 0.0,
                "difficulty_level": "beginner",
                "duration_minutes": 90,
                "tags": ["affiliate marketing", "commissions", "beginner"]
            },
            {
                "title": "Content Creation Mastery",
                "description": "Learn to create engaging content that converts visitors into customers.",
                "short_description": "Master content creation",
                "required_package": "silver",
                "price": 0.0,
                "difficulty_level": "intermediate",
                "duration_minutes": 150,
                "tags": ["content creation", "copywriting", "conversion"]
            },
            
            # Gold Package Courses (25+ courses)
            {
                "title": "Advanced SEO Strategies",
                "description": "Advanced SEO techniques to rank #1 on Google and drive organic traffic.",
                "short_description": "Advanced SEO techniques",
                "required_package": "gold",
                "price": 0.0,
                "difficulty_level": "advanced",
                "duration_minutes": 180,
                "is_featured": True,
                "tags": ["seo", "advanced", "google ranking"]
            },
            {
                "title": "Facebook & Instagram Marketing",
                "description": "Complete social media marketing course for Facebook and Instagram advertising.",
                "short_description": "Social media marketing mastery",
                "required_package": "gold",
                "price": 0.0,
                "difficulty_level": "intermediate",
                "duration_minutes": 200,
                "tags": ["facebook", "instagram", "social media"]
            },
            {
                "title": "Email Marketing Automation",
                "description": "Build automated email sequences that sell while you sleep.",
                "short_description": "Automated email marketing",
                "required_package": "gold",
                "price": 0.0,
                "difficulty_level": "intermediate",
                "duration_minutes": 130,
                "tags": ["email marketing", "automation", "sales"]
            },
            
            # Platinum Package Courses (35+ courses)
            {
                "title": "YouTube Channel Monetization",
                "description": "Complete guide to building and monetizing a successful YouTube channel.",
                "short_description": "YouTube monetization mastery",
                "required_package": "platinum",
                "price": 0.0,
                "difficulty_level": "advanced",
                "duration_minutes": 250,
                "is_featured": True,
                "tags": ["youtube", "monetization", "video marketing"]
            },
            {
                "title": "Dropshipping Business Blueprint",
                "description": "Step-by-step guide to building a profitable dropshipping business.",
                "short_description": "Dropshipping business guide",
                "required_package": "platinum",
                "price": 0.0,
                "difficulty_level": "advanced",
                "duration_minutes": 300,
                "tags": ["dropshipping", "ecommerce", "business"]
            },
            {
                "title": "Personal Branding Masterclass",
                "description": "Build a powerful personal brand that attracts customers and opportunities.",
                "short_description": "Personal branding masterclass",
                "required_package": "platinum",
                "price": 0.0,
                "difficulty_level": "intermediate",
                "duration_minutes": 180,
                "tags": ["personal branding", "influence", "authority"]
            }
        ]
        
        # Create courses
        created_courses = []
        for course_data in courses_data:
            course = Course(
                id=str(uuid.uuid4()),
                **course_data,
                slug=course_data["title"].lower().replace(" ", "-").replace("&", "and"),
                content={
                    "modules": [
                        {
                            "title": "Introduction",
                            "lessons": [
                                {"title": "Welcome", "duration": 10},
                                {"title": "Course Overview", "duration": 15}
                            ]
                        },
                        {
                            "title": "Core Concepts", 
                            "lessons": [
                                {"title": "Fundamentals", "duration": 30},
                                {"title": "Best Practices", "duration": 25}
                            ]
                        }
                    ]
                }
            )
            db.add(course)
            created_courses.append(course)
        
        # Create sample users
        sample_users = [
            {
                "email": "admin@raju.com",
                "full_name": "Raju Admin",
                "phone": "+91-9876543210",
                "is_superuser": True,
                "package_type": "platinum"
            },
            {
                "email": "priya@example.com", 
                "full_name": "Priya Sharma",
                "phone": "+91-9876543211",
                "package_type": "gold"
            },
            {
                "email": "rajesh@example.com",
                "full_name": "Rajesh Kumar", 
                "phone": "+91-9876543212",
                "package_type": "silver"
            }
        ]
        
        created_users = []
        for user_data in sample_users:
            referral_code = str(uuid.uuid4())[:8].upper()
            # Use shorter password for bcrypt compatibility
            password = "pass123"  
            user = User(
                id=str(uuid.uuid4()),
                hashed_password=get_password_hash(password),
                referral_code=referral_code,
                is_active=True,
                is_verified=True,
                **user_data
            )
            db.add(user)
            created_users.append(user)
        
        db.commit()
        
        print(f"✅ Created {len(created_courses)} courses")
        print(f"✅ Created {len(created_users)} users")
        print("\n📚 Sample Courses:")
        for course in created_courses:
            print(f"  • {course.title} ({course.required_package} package)")
        
        print("\n👥 Sample Users:")
        for user in created_users:
            print(f"  • {user.email} (password: pass123) - {user.package_type} package")
        
        print("\n🎉 Database seeded successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()