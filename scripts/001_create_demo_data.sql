-- Create demo data for testing the referral system and earnings
-- Insert demo profiles with referral relationships
INSERT INTO profiles (id, full_name, email, referral_code, package_type, total_earnings, available_balance, kyc_status, referred_by) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Demo User 1', 'demo1@example.com', 'DEMO001', 'premium', 25000, 5000, 'verified', NULL),
  ('22222222-2222-2222-2222-222222222222', 'Demo User 2', 'demo2@example.com', 'DEMO002', 'basic', 15000, 3000, 'verified', '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333333', 'Demo User 3', 'demo3@example.com', 'DEMO003', 'premium', 35000, 7000, 'verified', NULL),
  ('44444444-4444-4444-4444-444444444444', 'Demo User 4', 'demo4@example.com', 'DEMO004', 'basic', 8000, 1500, 'pending', '11111111-1111-1111-1111-111111111111'),
  ('55555555-5555-5555-5555-555555555555', 'Demo User 5', 'demo5@example.com', 'DEMO005', 'premium', 42000, 8500, 'verified', '33333333-3333-3333-3333-333333333333')
ON CONFLICT (id) DO NOTHING;

-- Insert demo commissions
INSERT INTO commissions (id, to_user_id, from_user_id, amount, commission_type, status, package_type) VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 2500, 'direct_referral', 'completed', 'basic'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 1500, 'direct_referral', 'pending', 'basic'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 5000, 'direct_referral', 'completed', 'premium'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 1000, 'course_completion', 'completed', 'basic'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 2000, 'course_completion', 'completed', 'premium')
ON CONFLICT (id) DO NOTHING;

-- Insert demo transactions
INSERT INTO transactions (id, user_id, amount, type, description, status) VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 2500, 'commission', 'Direct referral commission', 'completed'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 1000, 'commission', 'Course completion bonus', 'completed'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 5000, 'commission', 'Direct referral commission', 'completed'),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', 2000, 'withdrawal', 'Bank transfer withdrawal', 'completed'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', 1500, 'commission', 'Pending referral commission', 'pending')
ON CONFLICT (id) DO NOTHING;

-- Insert demo courses
INSERT INTO courses (id, title, description, duration, thumbnail_url, video_url, package_access, is_active, order_index) VALUES
  (gen_random_uuid(), 'Affiliate Marketing Fundamentals', 'Learn the basics of affiliate marketing and how to get started', 45, '/placeholder.svg?height=200&width=300', 'https://example.com/video1', ARRAY['basic', 'premium'], true, 1),
  (gen_random_uuid(), 'Advanced Commission Strategies', 'Master advanced techniques to maximize your earnings', 60, '/placeholder.svg?height=200&width=300', 'https://example.com/video2', ARRAY['premium'], true, 2),
  (gen_random_uuid(), 'Building Your Network', 'How to build and maintain a strong referral network', 30, '/placeholder.svg?height=200&width=300', 'https://example.com/video3', ARRAY['basic', 'premium'], true, 3)
ON CONFLICT (id) DO NOTHING;

-- Insert demo course enrollments
INSERT INTO course_enrollments (id, user_id, course_id, progress) VALUES
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', (SELECT id FROM courses WHERE title = 'Affiliate Marketing Fundamentals' LIMIT 1), 100),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', (SELECT id FROM courses WHERE title = 'Building Your Network' LIMIT 1), 75),
  (gen_random_uuid(), '33333333-3333-3333-3333-333333333333', (SELECT id FROM courses WHERE title = 'Advanced Commission Strategies' LIMIT 1), 90)
ON CONFLICT (id) DO NOTHING;
