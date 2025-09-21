-- Insert sample courses
INSERT INTO public.courses (title, description, thumbnail_url, video_url, duration, package_access, order_index) VALUES
('Introduction to Digital Marketing', 'Learn the basics of digital marketing and online business strategies', '/placeholder.svg?height=200&width=300', 'https://example.com/video1.mp4', 45, ARRAY['silver', 'gold', 'platinum'], 1),
('Advanced SEO Techniques', 'Master search engine optimization for better online visibility', '/placeholder.svg?height=200&width=300', 'https://example.com/video2.mp4', 60, ARRAY['gold', 'platinum'], 2),
('Social Media Marketing Mastery', 'Build your brand and engage audiences across social platforms', '/placeholder.svg?height=200&width=300', 'https://example.com/video3.mp4', 50, ARRAY['silver', 'gold', 'platinum'], 3),
('Email Marketing Automation', 'Create automated email campaigns that convert', '/placeholder.svg?height=200&width=300', 'https://example.com/video4.mp4', 40, ARRAY['gold', 'platinum'], 4),
('Content Creation Strategies', 'Develop compelling content that drives engagement', '/placeholder.svg?height=200&width=300', 'https://example.com/video5.mp4', 55, ARRAY['platinum'], 5),
('Affiliate Marketing Blueprint', 'Build a successful affiliate marketing business', '/placeholder.svg?height=200&width=300', 'https://example.com/video6.mp4', 70, ARRAY['platinum'], 6);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, content, excerpt, featured_image, slug, is_published) VALUES
('How to Start Your Digital Marketing Journey', 'Digital marketing has become essential for businesses of all sizes. In this comprehensive guide, we''ll walk you through the fundamental steps to begin your digital marketing journey...', 'A complete beginner''s guide to starting your digital marketing career', '/placeholder.svg?height=400&width=600', 'how-to-start-digital-marketing-journey', true),
('The Power of Affiliate Marketing in 2024', 'Affiliate marketing continues to be one of the most lucrative online business models. With the right strategies and dedication, you can build a sustainable income stream...', 'Discover why affiliate marketing is thriving and how you can get started', '/placeholder.svg?height=400&width=600', 'power-of-affiliate-marketing-2024', true),
('Building Your Personal Brand Online', 'Your personal brand is your most valuable asset in the digital age. Learn how to create an authentic online presence that attracts opportunities...', 'Essential tips for creating a strong personal brand that stands out', '/placeholder.svg?height=400&width=600', 'building-personal-brand-online', true);
