from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
import uuid


class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # Payment details
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    transaction_type = Column(String, nullable=False)  # package_purchase, commission_payout, etc.
    status = Column(String, nullable=False)  # pending, completed, failed, cancelled
    
    # Razorpay integration
    razorpay_order_id = Column(String, nullable=True)
    razorpay_payment_id = Column(String, nullable=True)
    razorpay_signature = Column(String, nullable=True)
    
    # Package information (if applicable)
    package_type = Column(String, nullable=True)
    
    # Additional metadata
    extra_data = Column(JSON, nullable=True)
    description = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="transactions")


class Commission(Base):
    __tablename__ = "commissions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)  # Who earned the commission
    
    # Commission details
    amount = Column(Float, nullable=False)
    commission_type = Column(String, nullable=False)  # direct, indirect
    commission_rate = Column(Float, nullable=False)  # Percentage rate used
    
    # Source transaction
    source_transaction_id = Column(String, ForeignKey("transactions.id"), nullable=True)
    referred_user_id = Column(String, ForeignKey("users.id"), nullable=False)  # Who was referred
    
    # Status
    status = Column(String, default="pending")  # pending, approved, paid, cancelled
    approved_at = Column(DateTime(timezone=True), nullable=True)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="commissions", foreign_keys=[user_id])
    source_transaction = relationship("Transaction", foreign_keys=[source_transaction_id])
    referred_user = relationship("User", foreign_keys=[referred_user_id])