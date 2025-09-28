"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  TrendingUp,
  Shield,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Award,
} from "lucide-react"

const packages = [
  {
    name: "Silver",
    price: 2950,
    features: [
      "Access to 15+ courses",
      "Basic video content",
      "Community support",
      "Mobile app access",
      "Certificate of completion",
    ],
    popular: false,
    color: "from-slate-400 to-slate-600",
  },
  {
    name: "Gold",
    price: 5310,
    features: [
      "Access to 25+ courses",
      "HD video content",
      "Priority support",
      "Live Q&A sessions",
      "Advanced certificates",
      "Bonus materials",
    ],
    popular: true,
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Platinum",
    price: 8850,
    features: [
      "Access to all 35+ courses",
      "4K video content",
      "1-on-1 mentoring",
      "Exclusive masterclasses",
      "Premium certificates",
      "Lifetime updates",
      "VIP community access",
    ],
    popular: false,
    color: "from-purple-400 to-purple-600",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Digital Marketer",
    content: "Raju transformed my career! I went from zero to earning ₹50,000 monthly through affiliate marketing.",
    rating: 5,
    earnings: "₹50,000/month",
  },
  {
    name: "Rajesh Kumar",
    role: "Online Entrepreneur",
    content: "The courses are incredibly detailed and practical. I built my entire business using these strategies.",
    rating: 5,
    earnings: "₹75,000/month",
  },
  {
    name: "Anita Patel",
    role: "Content Creator",
    content: "Best investment I ever made! The community support and mentoring are exceptional.",
    rating: 5,
    earnings: "₹40,000/month",
  },
]

const stats = [
  { label: "Active Students", value: "10,000+", icon: Users },
  { label: "Courses Available", value: "35+", icon: BookOpen },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Total Earnings Paid", value: "₹2.5Cr+", icon: Award },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Raju
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-card/30 to-muted/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              India's #1 Affiliate Learning Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Learn, Earn, and{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Future
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join thousands of successful entrepreneurs who are building sustainable income streams through our
              comprehensive affiliate marketing and digital skills courses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/signup" className="flex items-center gap-2">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the package that best fits your goals and start earning while you learn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full ${pkg.popular ? "ring-2 ring-primary/20 shadow-xl" : "shadow-lg"} hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader className="text-center pb-8">
                    <div
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center`}
                    >
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{pkg.name} Package</CardTitle>
                    <div className="text-4xl font-bold text-primary">₹{pkg.price.toLocaleString()}</div>
                    <CardDescription>One-time payment, lifetime access</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className={`w-full h-12 ${
                        pkg.popular
                          ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                          : "bg-primary hover:bg-primary/90"
                      } transition-all duration-300`}
                    >
                      <Link href={`/auth/signup?package=${pkg.name.toLowerCase()}`}>Choose {pkg.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Raju?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in the digital economy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert-Led Courses",
                description:
                  "Learn from industry experts with proven track records in digital marketing and affiliate business.",
              },
              {
                icon: Users,
                title: "Supportive Community",
                description: "Join a thriving community of learners and entrepreneurs who support each other's growth.",
              },
              {
                icon: Shield,
                title: "KYC Verified Platform",
                description: "Secure and transparent platform with proper KYC verification for all users.",
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "94% of our students see positive results within their first 3 months of learning.",
              },
              {
                icon: Award,
                title: "Certification",
                description: "Earn industry-recognized certificates that boost your credibility and career prospects.",
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "Get immediate access to all course materials and start learning right away.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our students are transforming their lives and building successful businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                    <Badge variant="secondary" className="w-fit mt-2">
                      Earning: {testimonial.earnings}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students who are already building their dream businesses. Your transformation
              starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/signup" className="flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Raju
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering individuals to build successful online businesses through education and community.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/courses" className="hover:text-primary transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-primary transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/success-stories" className="hover:text-primary transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-primary transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Raju Learning Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
