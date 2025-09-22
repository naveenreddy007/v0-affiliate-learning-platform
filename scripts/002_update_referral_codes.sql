-- Generate referral codes for existing users who don't have them
UPDATE profiles 
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::text), 1, 8))
WHERE referral_code IS NULL OR referral_code = '';

-- Ensure referral codes are unique
UPDATE profiles 
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::text || id::text), 1, 8))
WHERE id IN (
  SELECT id FROM profiles 
  WHERE referral_code IN (
    SELECT referral_code 
    FROM profiles 
    GROUP BY referral_code 
    HAVING COUNT(*) > 1
  )
);
