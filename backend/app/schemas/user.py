from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None


class UserCreate(UserBase):
    password: str
    referred_by: Optional[str] = None


class UserResponse(UserBase):
    id: str
    is_active: bool
    is_verified: bool
    referral_code: Optional[str]
    package_type: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: Optional[str] = None