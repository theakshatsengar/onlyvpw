"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GoalForms } from "@/components/goal-forms"
import { PortfolioOrders } from "@/components/portfolio-orders"
import { FormsManagement } from "@/components/forms-management"
import { SupportCenter } from "@/components/support-center"
import Link from "next/link"
import {
  LogOut,
  User,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Target,
  PiggyBank,
  GraduationCap,
  Home,
  Heart,
  ChevronRight,
  Phone,
  Plus,
  BarChart3,
  HelpCircle,
  Settings,
  Mail,
  MapPin,
  Triangle,
  Coins,
  Upload,
  Megaphone,
  LineChart,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"
import { useTheme } from "next-themes"

export function Dashboard() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [showGoalForms, setShowGoalForms] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [showFormsManagement, setShowFormsManagement] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [portfolioInitialTab, setPortfolioInitialTab] = useState<"portfolio" | "orders" | "analytics">("portfolio")

  const bannerSlides = [
    {
      title: "New Tax Saving Opportunities",
      description: "Maximize your savings with ELSS funds before March 31st",
      cta: "Explore Now",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      title: "SIP Returns Up to 15%",
      description: "Start your systematic investment plan with top-performing funds",
      cta: "Start SIP",
      gradient: "from-green-600 to-teal-600",
    },
    {
      title: "Free Financial Planning",
      description: "Get personalized advice from certified financial planners",
      cta: "Book Session",
      gradient: "from-orange-600 to-red-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [bannerSlides.length])

  const popularFunds = [
    {
      name: "HDFC Top 100 Fund",
      category: "Equity",
      description: "Large cap equity fund with consistent performance",
      expectedReturn: 12.5,
    },
    {
      name: "ICICI Prudential Debt Fund",
      category: "Debt",
      description: "Low risk debt fund for stable returns",
      expectedReturn: 8.2,
    },
    {
      name: "SBI Gold ETF",
      category: "Gold",
      description: "Gold ETF for portfolio diversification",
      expectedReturn: 10.1,
    },
    {
      name: "Motilal Oswal NASDAQ 100",
      category: "International",
      description: "International equity exposure to US markets",
      expectedReturn: 15.8,
    },
    {
      name: "Axis Bluechip Fund",
      category: "Equity",
      description: "Large cap fund with focus on quality stocks",
      expectedReturn: 13.2,
    },
    {
      name: "Kotak Liquid Fund",
      category: "Liquid",
      description: "Ultra short-term fund for emergency corpus",
      expectedReturn: 6.5,
    },
    {
      name: "Mirae Asset Emerging Bluechip",
      category: "Large & Mid",
      description: "Blend of large and mid-cap for growth",
      expectedReturn: 14.1,
    },
    {
      name: "Nippon India Small Cap",
      category: "Small Cap",
      description: "High growth potential with higher volatility",
      expectedReturn: 18.3,
    },
    {
      name: "Quant Flexi Cap",
      category: "Flexi Cap",
      description: "Dynamic allocation across market caps",
      expectedReturn: 16.2,
    },
    { name: "HDFC Gold Fund", category: "Gold", description: "Pass-through gold ETF exposure", expectedReturn: 9.9 },
  ]

  const investmentData = [
    { name: "Equity Funds", value: 145000, change: 12.5, allocation: 60 },
    { name: "Debt Funds", value: 65000, change: 8.2, allocation: 25 },
    { name: "Gold ETF", value: 25000, change: -2.1, allocation: 10 },
    { name: "International", value: 10000, change: 15.8, allocation: 5 },
  ]

  const goals = [
    {
      name: "Retirement Planning",
      target: 5000000,
      current: 245000,
      timeline: "25 years",
      icon: PiggyBank,
      color: "text-blue-500",
    },
    {
      name: "Child Education",
      target: 2000000,
      current: 180000,
      timeline: "12 years",
      icon: GraduationCap,
      color: "text-green-500",
    },
    {
      name: "Dream Home",
      target: 8000000,
      current: 320000,
      timeline: "8 years",
      icon: Home,
      color: "text-purple-500",
    },
    {
      name: "Emergency Fund",
      target: 600000,
      current: 480000,
      timeline: "Complete",
      icon: Heart,
      color: "text-red-500",
    },
  ]

  const plannerUpdates = [
    {
      title: "Portfolio Rebalancing Recommended",
      description: "Your equity allocation has increased to 65%. Consider rebalancing.",
      time: "2 hours ago",
      priority: "high",
    },
    {
      title: "SIP Due Tomorrow",
      description: "₹5,000 SIP for HDFC Top 100 Fund is due on 15th Jan",
      time: "1 day ago",
      priority: "medium",
    },
    {
      title: "Tax Planning Reminder",
      description: "You have ₹80,000 remaining for 80C deduction this year",
      time: "3 days ago",
      priority: "low",
    },
  ]

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Banner Slides */}
            <div className="mb-8">
              <div className="hidden md:grid md:grid-cols-3 gap-4">
                {bannerSlides.map((slide, index) => (
                  <Card key={index} className={`bg-gradient-to-r ${slide.gradient} border-0 text-white`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{slide.title}</CardTitle>
                      <CardDescription className="text-white/80">{slide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-white bg-white/20 hover:bg-white/30 border-white/30"
                      >
                        {slide.cta}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="md:hidden relative">
                <div className="overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {bannerSlides.map((slide, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <Card className={`bg-gradient-to-r ${slide.gradient} border-0 text-white`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{slide.title}</CardTitle>
                            <CardDescription className="text-white/80">{slide.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="text-white bg-white/20 hover:bg-white/30 border-white/30"
                            >
                              {slide.cta}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel indicators */}
                <div className="flex justify-center mt-4 gap-2">
                  {bannerSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-primary" : "bg-muted"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Total Portfolio</CardDescription>
                  <CardTitle className="text-xl md:text-2xl text-primary">₹2,45,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-green-500 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Active Goals</CardDescription>
                  <CardTitle className="text-xl md:text-2xl text-primary">4</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">On track</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">Monthly SIP</CardDescription>
                  <CardTitle className="text-xl md:text-2xl text-primary">₹15,000</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">4 funds</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs">This Month</CardDescription>
                  <CardTitle className="text-xl md:text-2xl text-primary">+₹18,500</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-green-500 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +7.8%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fund Filters Section */}
            <section className="mb-8">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 items-start justify-items-center">
                {/* Small cap */}
                <Link href="/funds/small-cap" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <LineChart className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    Small cap
                  </span>
                </Link>

                {/* Mid cap */}
                <Link href="/funds/mid-cap" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <TrendingUp className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    Mid cap
                  </span>
                </Link>

                {/* Large cap */}
                <Link href="/funds/large-cap" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <BarChart3 className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    Large cap
                  </span>
                </Link>

                {/* ELSS Tax Saver */}
                <Link href="/funds/elss-tax-saver" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <ShieldCheck className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    ELSS Tax Saver
                  </span>
                </Link>

                {/* High return fund */}
                <Link href="/funds/high-return" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <ArrowUpRight className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    High return fund
                  </span>
                </Link>

                {/* Gold Funds */}
                <Link href="/funds/gold-funds" className="group flex flex-col items-center justify-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
                    <Coins className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground group-hover:text-foreground min-h-8 md:min-h-10">
                    Gold Funds
                  </span>
                </Link>

                {/* Import funds (disabled) */}
                <div
                  aria-disabled="true"
                  className="group flex flex-col items-center justify-start opacity-50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center">
                    <Upload className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground min-h-8 md:min-h-10">
                    Import funds
                  </span>
                </div>

                {/* NFO's (disabled) */}
                <div
                  aria-disabled="true"
                  className="group flex flex-col items-center justify-start opacity-50 cursor-not-allowed"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-muted flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="mt-2 text-center text-xs md:text-sm text-muted-foreground min-h-8 md:min-h-10">
                    NFO’s
                  </span>
                </div>
              </div>
            </section>

            {/* Popular Funds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Popular funds
                </CardTitle>
                <CardDescription>Top 10 funds across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularFunds.map((fund, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{fund.name}</h4>
                        <Badge variant="secondary">{fund.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{fund.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-500">Expected: {fund.expectedReturn}%</span>
                        <Button size="sm" variant="outline">
                          Invest Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "portfolio":
        return (
          <div className="space-y-6">
            {/* Investment Portfolio Section */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your current investment breakdown and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.allocation}% allocation</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">₹{item.value.toLocaleString()}</p>
                        <div
                          className={`flex items-center text-sm ${item.change > 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {item.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {item.change > 0 ? "+" : ""}
                          {item.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Orders Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Portfolio Orders & SIP Management
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setPortfolioInitialTab("orders")
                        setShowPortfolio(true)
                      }}
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                    >
                      View Orders
                    </Button>
                    <Button
                      onClick={() => {
                        setPortfolioInitialTab("portfolio")
                        setShowPortfolio(true)
                      }}
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Start SIP
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>Manage your systematic investment plans and orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Active SIPs */}
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">HDFC Top 100 Fund</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly SIP: ₹5,000</p>
                      <p className="text-xs text-muted-foreground">Next: 15th Jan 2024</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Modify SIP
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">ICICI Debt Fund</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly SIP: ₹3,000</p>
                      <p className="text-xs text-muted-foreground">Next: 20th Jan 2024</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Modify SIP
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">SBI Gold ETF</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Monthly SIP: ₹2,000</p>
                      <p className="text-xs text-muted-foreground">Next: 25th Jan 2024</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Modify SIP
                      </Button>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Orders</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">HDFC Top 100 Fund</p>
                          <p className="text-xs text-muted-foreground">SIP - ₹5,000</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="text-xs">
                            Completed
                          </Badge>
                          <p className="text-xs text-muted-foreground">15 Dec 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">ICICI Debt Fund</p>
                          <p className="text-xs text-muted-foreground">SIP - ₹3,000</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="text-xs">
                            Completed
                          </Badge>
                          <p className="text-xs text-muted-foreground">20 Dec 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "goals":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Your Financial Goals</h3>
                <p className="text-sm text-muted-foreground">Track and manage your financial objectives</p>
              </div>
              <Button onClick={() => setShowGoalForms(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Goal
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100
                const Icon = goal.icon
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${goal.color}`} />
                        {goal.name}
                      </CardTitle>
                      <CardDescription>
                        Target: ₹{goal.target.toLocaleString()} • {goal.timeline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span className="font-medium">₹{goal.current.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account information and preferences</p>
              </div>
            </div>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Mumbai, Maharashtra</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Annual Income</label>
                  <p className="text-sm text-muted-foreground">₹8-12 Lakhs</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">KYC Status</label>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-xs">
                      Verified
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Support Center
                </CardTitle>
                <CardDescription>Get help and contact our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowSupport(true)}
                    className="h-auto p-4 flex flex-col gap-2"
                  >
                    <HelpCircle className="h-6 w-6" />
                    <span className="text-sm">Contact Support</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col gap-2 bg-transparent">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">Call Advisor</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button variant="destructive" onClick={logout} className="w-full max-w-md">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (showGoalForms) {
    return <GoalForms onBack={() => setShowGoalForms(false)} />
  }

  if (showPortfolio) {
    return <PortfolioOrders onBack={() => setShowPortfolio(false)} initialTab={portfolioInitialTab} />
  }

  if (showFormsManagement) {
    return (
      <FormsManagement
        onBack={() => setShowFormsManagement(false)}
        onNewForm={() => {
          setShowFormsManagement(false)
          setShowGoalForms(true)
        }}
      />
    )
  }

  if (showSupport) {
    return <SupportCenter onBack={() => setShowSupport(false)} />
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <Triangle className="h-3 w-3 text-primary-foreground fill-current" />
              </div>
              <h1 className="text-lg font-bold text-foreground">VPW</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            {[
              { id: "home", label: "Home" },
              { id: "portfolio", label: "Portfolio" },
              { id: "goals", label: "Goals" },
              { id: "profile", label: "Profile" },
            ].map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-2 py-1 text-sm font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? "text-white font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl pt-16">
        {/* Welcome Section - only show on home page */}
        {currentPage === "home" && (
          <>
            {/* <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h2>
              <p className="text-muted-foreground">Here's your financial overview for today</p>
            </div> */}
          </>
        )}

        {renderPageContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4 h-14">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "portfolio", label: "Portfolio", icon: BarChart3 },
            { id: "goals", label: "Goals", icon: Target },
            { id: "profile", label: "Profile", icon: User },
          ].map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  currentPage === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
