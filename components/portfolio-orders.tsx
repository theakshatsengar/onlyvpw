"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react"

interface PortfolioOrdersProps {
  onBack: () => void
  initialTab?: "portfolio" | "orders" | "analytics"
}

export function PortfolioOrders({ onBack, initialTab = "portfolio" }: PortfolioOrdersProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "Placed" | "Executed" | "Completed">("all")

  const portfolioHoldings = [
    {
      id: "1",
      name: "HDFC Top 100 Fund",
      category: "Large Cap Equity",
      units: 1250.45,
      nav: 785.2,
      currentValue: 982103,
      investedValue: 850000,
      returns: 132103,
      returnsPercent: 15.54,
      sipAmount: 5000,
      sipDate: "15th",
      status: "Active",
    },
    {
      id: "2",
      name: "ICICI Prudential Bluechip Fund",
      category: "Large Cap Equity",
      units: 890.25,
      nav: 92.45,
      currentValue: 82345,
      investedValue: 75000,
      returns: 7345,
      returnsPercent: 9.79,
      sipAmount: 3000,
      sipDate: "10th",
      status: "Active",
    },
    {
      id: "3",
      name: "Axis Long Term Equity Fund",
      category: "ELSS",
      units: 2150.8,
      nav: 45.6,
      currentValue: 98077,
      investedValue: 90000,
      returns: 8077,
      returnsPercent: 8.97,
      sipAmount: 0,
      sipDate: null,
      status: "Lumpsum",
    },
    {
      id: "4",
      name: "SBI Corporate Bond Fund",
      category: "Debt",
      units: 3250.15,
      nav: 18.75,
      currentValue: 60940,
      investedValue: 65000,
      returns: -4060,
      returnsPercent: -6.25,
      sipAmount: 2000,
      sipDate: "5th",
      status: "Active",
    },
    {
      id: "5",
      name: "HDFC Gold ETF",
      category: "Gold",
      units: 500.0,
      nav: 52.3,
      currentValue: 26150,
      investedValue: 25000,
      returns: 1150,
      returnsPercent: 4.6,
      sipAmount: 1000,
      sipDate: "20th",
      status: "Active",
    },
  ]

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      date: "2024-01-15",
      time: "10:30 AM",
      fund: "HDFC Top 100 Fund",
      type: "SIP",
      action: "Buy",
      amount: 5000,
      units: 6.37,
      nav: 785.2,
      status: "Completed",
      folio: "12345678",
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      time: "11:15 AM",
      fund: "ICICI Prudential Bluechip Fund",
      type: "SIP",
      action: "Buy",
      amount: 3000,
      units: 32.45,
      nav: 92.45,
      status: "Completed",
      folio: "87654321",
    },
    {
      id: "ORD003",
      date: "2024-01-08",
      time: "02:45 PM",
      fund: "Axis Long Term Equity Fund",
      type: "Lumpsum",
      action: "Buy",
      amount: 25000,
      units: 548.25,
      nav: 45.6,
      status: "Completed",
      folio: "11223344",
    },
    {
      id: "ORD004",
      date: "2024-01-16",
      time: "09:00 AM",
      fund: "SBI Corporate Bond Fund",
      type: "SIP",
      action: "Buy",
      amount: 2000,
      units: 106.67,
      nav: 18.75,
      status: "Placed",
      folio: "44332211",
    },
    {
      id: "ORD005",
      date: "2024-01-12",
      time: "03:20 PM",
      fund: "HDFC Gold ETF",
      type: "Redeem",
      action: "Sell",
      amount: 5000,
      units: 95.6,
      nav: 52.3,
      status: "Executed",
      folio: "55667788",
    },
  ] as {
    id: string
    date: string
    time: string
    fund: string
    type: string
    action: "Buy" | "Sell"
    amount: number
    units: number
    nav: number
    status: "Placed" | "Executed" | "Completed"
    folio: string
  }[])

  const totalPortfolioValue = portfolioHoldings.reduce((sum, holding) => sum + holding.currentValue, 0)
  const totalInvestedValue = portfolioHoldings.reduce((sum, holding) => sum + holding.investedValue, 0)
  const totalReturns = totalPortfolioValue - totalInvestedValue
  const totalReturnsPercent = (totalReturns / totalInvestedValue) * 100

  const categoryAllocation = portfolioHoldings.reduce(
    (acc, holding) => {
      const category = holding.category
      if (!acc[category]) {
        acc[category] = { value: 0, percentage: 0 }
      }
      acc[category].value += holding.currentValue
      return acc
    },
    {} as Record<string, { value: number; percentage: number }>,
  )

  Object.keys(categoryAllocation).forEach((category) => {
    categoryAllocation[category].percentage = (categoryAllocation[category].value / totalPortfolioValue) * 100
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Executed":
        return "bg-blue-500"
      case "Placed":
        return "bg-yellow-500"
      case "Failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Executed":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Placed":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const [newAction, setNewAction] = useState<"Buy" | "Sell">("Buy")
  const [newFund, setNewFund] = useState("")
  const [newFolio, setNewFolio] = useState("")
  const [newAmount, setNewAmount] = useState<number | "">("")
  const [newUnits, setNewUnits] = useState<number | "">("")

  const placeOrder = () => {
    if (!newFund || !newFolio || (!newAmount && !newUnits)) return
    const now = new Date()
    const nextId = `ORD${String(orders.length + 1).padStart(3, "0")}`
    const nav = 100
    const units = typeof newUnits === "number" ? newUnits : (Number(newAmount) || 0) / nav

    const newOrder = {
      id: nextId,
      date: now.toISOString().slice(0, 10),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      fund: newFund,
      type: units && units > 0 ? (newAction === "Buy" ? "Lumpsum" : "Redeem") : "Lumpsum",
      action: newAction,
      amount: Number(newAmount) || Math.round(units * nav),
      units: Number(units.toFixed(2)),
      nav,
      status: "Placed" as const,
      folio: newFolio,
    }
    setOrders((prev) => [newOrder, ...prev])
    setActiveTab("orders")
    setNewFund("")
    setNewFolio("")
    setNewAmount("")
    setNewUnits("")
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fund.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    if (!matchesSearch || !matchesStatus) return false

    if (filterPeriod === "all") return true

    const orderDate = new Date(order.date)
    const now = new Date()
    const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))

    switch (filterPeriod) {
      case "7days":
        return daysDiff <= 7
      case "30days":
        return daysDiff <= 30
      case "90days":
        return daysDiff <= 90
      default:
        return true
    }
  })

  const orderHistory = orders // Declare orderHistory variable

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Portfolio & Orders</h2>
          <p className="text-muted-foreground">Manage your investments and track orders</p>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Portfolio Value</CardDescription>
            <CardTitle className="text-xl text-primary">₹{totalPortfolioValue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`flex items-center text-sm ${totalReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
              {totalReturns >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {totalReturns >= 0 ? "+" : ""}₹{totalReturns.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Invested</CardDescription>
            <CardTitle className="text-xl text-primary">₹{totalInvestedValue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Principal amount</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Returns</CardDescription>
            <CardTitle className={`text-xl ${totalReturns >= 0 ? "text-green-500" : "text-red-500"}`}>
              {totalReturnsPercent >= 0 ? "+" : ""}
              {totalReturnsPercent.toFixed(2)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Active SIPs</CardDescription>
            <CardTitle className="text-xl text-primary">
              {portfolioHoldings.filter((h) => h.sipAmount > 0).length}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Monthly investments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Holdings List */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Your Holdings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioHoldings.map((holding) => (
                      <div key={holding.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-medium">{holding.name}</h4>
                            <p className="text-sm text-muted-foreground">{holding.category}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Units: {holding.units.toFixed(2)}</span>
                              <span>NAV: ₹{holding.nav.toFixed(2)}</span>
                            </div>
                          </div>
                          <Badge variant={holding.returns >= 0 ? "default" : "destructive"}>
                            {holding.returns >= 0 ? "+" : ""}
                            {holding.returnsPercent.toFixed(2)}%
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Current Value</p>
                            <p className="font-medium">₹{holding.currentValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-medium">₹{holding.investedValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Returns</p>
                            <p className={`font-medium ${holding.returns >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {holding.returns >= 0 ? "+" : ""}₹{holding.returns.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">SIP</p>
                            <p className="font-medium">
                              {holding.sipAmount > 0 ? `₹${holding.sipAmount.toLocaleString()}` : "Lumpsum"}
                            </p>
                          </div>
                        </div>

                        {holding.sipAmount > 0 && (
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-sm text-muted-foreground">
                              Next SIP: {holding.sipDate} of every month
                            </span>
                            <Button variant="outline" size="sm">
                              Modify SIP
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asset Allocation */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(categoryAllocation).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category}</span>
                        <span className="text-sm">{data.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={data.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">₹{data.value.toLocaleString()}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    New Investment
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Start New SIP
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download Statement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Place Order</CardTitle>
              <CardDescription>Buy or sell units in a folio</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <Select value={newAction} onValueChange={(v: "Buy" | "Sell") => setNewAction(v)}>
                <SelectTrigger className="md:col-span-1">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buy">Buy</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Fund name"
                value={newFund}
                onChange={(e) => setNewFund(e.target.value)}
                className="md:col-span-2"
              />
              <Input placeholder="Folio ID" value={newFolio} onChange={(e) => setNewFolio(e.target.value)} />
              <Input
                placeholder="Amount (₹)"
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value ? Number(e.target.value) : "")}
              />
              <Input
                placeholder="Units (optional)"
                type="number"
                value={newUnits}
                onChange={(e) => setNewUnits(e.target.value ? Number(e.target.value) : "")}
              />
              <div className="md:col-span-5 flex justify-end">
                <Button size="sm" onClick={placeOrder}>
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* existing filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Placed">Placed</SelectItem>
                  <SelectItem value="Executed">Executed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>

          {/* existing list uses filteredOrders */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Track all your investment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(order.status)}
                          <div>
                            <h4 className="font-medium">{order.fund}</h4>
                            <p className="text-sm text-muted-foreground">
                              {order.type} • {order.action} • Order #{order.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {order.date} at {order.time}
                          </span>
                          <span>Folio: {order.folio}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Units</p>
                          <p className="font-medium">{order.units.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">NAV</p>
                          <p className="font-medium">₹{order.nav.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge className={`${getStatusColor(order.status)} text-xs px-2 py-0`}>{order.status}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your portfolio performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Best Performer</p>
                    <p className="font-medium text-green-500">HDFC Top 100 Fund</p>
                    <p className="text-xs text-muted-foreground">+15.54% returns</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Worst Performer</p>
                    <p className="font-medium text-red-500">SBI Corporate Bond Fund</p>
                    <p className="text-xs text-muted-foreground">-6.25% returns</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Average Return</p>
                    <p className="font-medium text-primary">{totalReturnsPercent.toFixed(2)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
                <CardDescription>Your investment breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total SIP Amount</span>
                    <span className="font-medium">
                      ₹{portfolioHoldings.reduce((sum, h) => sum + h.sipAmount, 0).toLocaleString()}/month
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Lumpsum Investments</span>
                    <span className="font-medium">
                      ₹
                      {portfolioHoldings
                        .filter((h) => h.sipAmount === 0)
                        .reduce((sum, h) => sum + h.investedValue, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Number of Funds</span>
                    <span className="font-medium">{portfolioHoldings.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orderHistory.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium text-sm">{order.fund}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">₹{order.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{order.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
