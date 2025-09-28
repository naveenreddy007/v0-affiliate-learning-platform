from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Database engine configuration
connect_args = {}
if settings.is_sqlite:
    # SQLite specific configuration
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL, 
    connect_args=connect_args,
    # PostgreSQL optimizations
    pool_pre_ping=True if settings.is_postgresql else False,
    pool_recycle=300 if settings.is_postgresql else -1,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()