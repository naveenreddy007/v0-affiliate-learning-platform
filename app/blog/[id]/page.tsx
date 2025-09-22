"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, ThumbsUp, MessageCircle, ArrowRight } from "lucide-react"
import { use } from "react"

// Mock blog post data - in a real app, this would come from a database
const getBlogPost = (id: string) => {
  const posts = {
    "1": {
      id: 1,
      title: "10 Proven Affiliate Marketing Strategies That Actually Work in 2024",
      content: `
        <p>Affiliate marketing continues to be one of the most lucrative ways to earn money online, but the landscape has evolved significantly in 2024. What worked five years ago might not be as effective today. In this comprehensive guide, we'll explore the strategies that are currently driving the highest returns for affiliate marketers.</p>

        <h2>1. Content-First Approach</h2>
        <p>The days of aggressive sales tactics are over. Today's successful affiliate marketers focus on providing genuine value through high-quality content. This means creating in-depth reviews, tutorials, and educational content that helps your audience make informed decisions.</p>

        <h2>2. Video Marketing Dominance</h2>
        <p>Video content continues to outperform other formats across all platforms. Whether it's YouTube reviews, Instagram Reels, or TikTok demonstrations, video content generates higher engagement and conversion rates.</p>

        <h2>3. Email List Building</h2>
        <p>Building an email list remains one of the most effective long-term strategies. Focus on creating lead magnets that provide immediate value to your audience in exchange for their email address.</p>

        <h2>4. Social Proof and Authenticity</h2>
        <p>Modern consumers are skeptical of traditional advertising. They want to see real results, genuine testimonials, and authentic experiences. Share your personal journey and results transparently.</p>

        <h2>5. Micro-Niche Targeting</h2>
        <p>Instead of trying to appeal to everyone, successful affiliates are focusing on very specific niches. This allows for deeper audience connection and higher conversion rates.</p>

        <p>Remember, success in affiliate marketing doesn't happen overnight. It requires consistent effort, continuous learning, and adaptation to changing market conditions. Focus on building trust with your audience, and the sales will follow naturally.</p>
      `,
      author: "Raju Sharma",
      date: "2024-01-15",
      category: "Affiliate Marketing",
      image: "/affiliate-marketing-strategy.jpg",
      readTime: "8 min read",
      likes: 234,
      comments: 45,
    },
  }

  return posts[id as keyof typeof posts] || null
}

const relatedPosts = [
  {
    id: 2,
    title: "How to Build Your First Sales Funnel",
    category: "Sales Funnels",
    image: "/sales-funnel.png",
  },
  {
    id: 3,
    title: "The Psychology of Persuasion in Digital Marketing",
    category: "Psychology",
    image: "/psychology-marketing.jpg",
  },
  {
    id: 4,
    title: "Email Marketing Automation Guide",
    category: "Email Marketing",
    image: "/email-automation-concept.png",
  },
]

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const post = getBlogPost(id)

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Raju
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ThumbsUp className="w-4 h-4" />
              {post.likes}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-12" />

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/professional-author-avatar.jpg"
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-xl">{post.author}</CardTitle>
                  <CardDescription>
                    Founder & CEO of Raju Learning Platform. 10+ years of experience in digital marketing with over
                    ₹50Cr in affiliate earnings.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                    {relatedPost.category}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm line-clamp-2">{relatedPost.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <Link href={`/blog/${relatedPost.id}`} className="flex items-center gap-1 text-primary">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg mb-12"
        >
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who are building their dream businesses with our comprehensive
            courses.
          </p>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary">
            <Link href="/auth/signup">Get Started Today</Link>
          </Button>
        </motion.div>
      </article>
    </div>
  )
}
