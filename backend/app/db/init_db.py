from app.db.base import Base, engine
from app.models import User, Course, CourseEnrollment, Transaction, Commission


def init_db() -> None:
    """
    Initialize the database by creating all tables
    """
    Base.metadata.create_all(bind=engine)