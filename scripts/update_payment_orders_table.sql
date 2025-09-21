-- Add columns for Razorpay integration
ALTER TABLE payment_orders 
ADD COLUMN IF NOT EXISTS total_amount INTEGER,
ADD COLUMN IF NOT EXISTS razorpay_order_id TEXT,
ADD COLUMN IF NOT EXISTS referral_code TEXT;

-- Update existing records to have total_amount with GST
UPDATE payment_orders 
SET total_amount = ROUND(amount * 1.18)
WHERE total_amount IS NULL;
