"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight, BookOpen, Zap } from "lucide-react"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "10 Proven Affiliate Marketing Strategies That Actually Work in 2024",
    excerpt:
      "Discover the latest affiliate marketing strategies that top earners are using to generate consistent income streams.",
    author: "Raju Sharma",
    date: "2024-01-15",
    category: "Affiliate Marketing",
    image: "/affiliate-marketing-strategy.jpg",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How to Build Your First Sales Funnel: A Complete Beginner's Guide",
    excerpt: "Step-by-step guide to creating high-converting sales funnels that turn visitors into customers.",
    author: "Priya Patel",
    date: "2024-01-12",
    category: "Sales Funnels",
    image: "/sales-funnel-diagram.png",
    readTime: "12 min read",
    featured: false,
  },
  {
    id: 3,
    title: "The Psychology of Persuasion in Digital Marketing",
    excerpt:
      "Learn how to use psychological triggers to increase your conversion rates and build trust with your audience.",
    author: "Amit Kumar",
    date: "2024-01-10",
    category: "Psychology",
    image: "/psychology-marketing-brain.jpg",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Email Marketing Automation: Set It and Forget It",
    excerpt: "Master email automation to nurture leads and increase sales while you sleep.",
    author: "Raju Sharma",
    date: "2024-01-08",
    category: "Email Marketing",
    image: "/email-automation-workflow.png",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Marketing for Affiliates: Platform-Specific Strategies",
    excerpt: "Optimize your social media presence across different platforms to maximize your affiliate earnings.",
    author: "Priya Patel",
    date: "2024-01-05",
    category: "Social Media",
    image: "/social-media-marketing-icons.png",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Content Creation That Converts: Writing for Your Audience",
    excerpt: "Learn how to create compelling content that resonates with your audience and drives action.",
    author: "Amit Kumar",
    date: "2024-01-03",
    category: "Content Marketing",
    image: "/content-writing-laptop.jpg",
    readTime: "7 min read",
    featured: false,
  },
]

const categories = [
  "All",
  "Affiliate Marketing",
  "Sales Funnels",
  "Email Marketing",
  "Social Media",
  "Psychology",
  "Content Marketing",
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/courses">Courses</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-card/30 to-muted/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Latest Insights & Strategies
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Learn from the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Experts</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay ahead of the curve with actionable insights, proven strategies, and expert tips from successful
              digital marketers and entrepreneurs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-to-r from-primary to-secondary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary">Featured</Badge>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6 text-pretty">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button asChild className="w-fit bg-gradient-to-r from-primary to-secondary">
                      <Link href={`/blog/${featuredPost.id}`} className="flex items-center gap-2">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {searchTerm
                ? `Search Results (${filteredPosts.length})`
                : selectedCategory === "All"
                  ? "Latest Articles"
                  : `${selectedCategory} Articles`}
            </h2>
          </motion.div>

          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge variant="secondary" className="absolute top-4 left-4">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${post.id}`} className="flex items-center gap-1">
                            Read More
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Never Miss an Update</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the latest strategies, tips, and insights delivered straight to your inbox. Join 5,000+ entrepreneurs
              who read our weekly newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" className="flex-1" />
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No spam, unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
