"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Eye, Download, FileText, PiggyBank, GraduationCap, Home, Heart } from "lucide-react"

// Sample data for different form types
const sampleGoalForms = [
  {
    id: "GF001",
    userId: "U001",
    userName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    goalType: "retirement",
    status: "Submitted",
    createdAt: "2024-01-15",
    data: {
      name: "Rajesh Kumar",
      age: "35",
      occupation: "Software Engineer",
      currentAnnualIncome: "1500000",
      currentSavings: "300000",
      retirementAge: "60",
      lifestyleGoals: "comfortable",
      location: "metro",
    },
  },
  {
    id: "GF002",
    userId: "U002",
    userName: "Priya Sharma",
    email: "priya.sharma@email.com",
    goalType: "education",
    status: "Under Review",
    createdAt: "2024-01-20",
    data: {
      name: "Priya Sharma",
      age: "32",
      occupation: "Doctor",
      currentAnnualIncome: "2000000",
      currentSavings: "500000",
      educationLevel: "postgraduate",
      educationYear: "2030",
      educationCost: "2500000",
    },
  },
  {
    id: "GF003",
    userId: "U003",
    userName: "Amit Patel",
    email: "amit.patel@email.com",
    goalType: "lifestyle",
    status: "Approved",
    createdAt: "2024-01-25",
    data: {
      name: "Amit Patel",
      age: "28",
      occupation: "Business Owner",
      currentAnnualIncome: "1800000",
      currentSavings: "400000",
      desiredAmount: "5000000",
      purpose: "Dream Home",
      timeline: "5",
    },
  },
  {
    id: "GF004",
    userId: "U004",
    userName: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    goalType: "emergency",
    status: "Submitted",
    createdAt: "2024-02-01",
    data: {
      name: "Sneha Reddy",
      age: "30",
      occupation: "Marketing Manager",
      currentAnnualIncome: "1200000",
      currentSavings: "200000",
      monthlyExpenses: "50000",
      investmentTerms: "sip",
    },
  },
  {
    id: "GF005",
    userId: "U005",
    userName: "Vikram Singh",
    email: "vikram.singh@email.com",
    goalType: "retirement",
    status: "Rejected",
    createdAt: "2024-02-05",
    data: {
      name: "Vikram Singh",
      age: "45",
      occupation: "Teacher",
      currentAnnualIncome: "800000",
      currentSavings: "150000",
      retirementAge: "58",
      lifestyleGoals: "modest",
      location: "urban",
    },
  },
]

const sampleSupportTickets = [
  {
    id: "ST001",
    userId: "U001",
    userName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    subject: "Unable to start SIP",
    category: "investment",
    priority: "high",
    status: "Open",
    createdAt: "2024-02-10",
    message: "I'm trying to start a SIP but getting an error during payment. Please help.",
  },
  {
    id: "ST002",
    userId: "U003",
    userName: "Amit Patel",
    email: "amit.patel@email.com",
    subject: "Portfolio not updating",
    category: "technical",
    priority: "medium",
    status: "In Progress",
    createdAt: "2024-02-08",
    message: "My portfolio value hasn't updated since last week. Is there an issue?",
  },
  {
    id: "ST003",
    userId: "U006",
    userName: "Kavya Nair",
    email: "kavya.nair@email.com",
    subject: "Account verification pending",
    category: "account",
    priority: "urgent",
    status: "Resolved",
    createdAt: "2024-02-05",
    message: "My account verification has been pending for 3 days. When will it be completed?",
  },
]

const sampleUsers = [
  {
    id: "U001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 9876543210",
    joinedAt: "2024-01-10",
    status: "Active",
    totalForms: 1,
    totalInvestment: "300000",
  },
  {
    id: "U002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543211",
    joinedAt: "2024-01-15",
    status: "Active",
    totalForms: 1,
    totalInvestment: "500000",
  },
  {
    id: "U003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 9876543212",
    joinedAt: "2024-01-20",
    status: "Active",
    totalForms: 1,
    totalInvestment: "400000",
  },
  {
    id: "U004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 9876543213",
    joinedAt: "2024-01-25",
    status: "Active",
    totalForms: 1,
    totalInvestment: "200000",
  },
  {
    id: "U005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9876543214",
    joinedAt: "2024-02-01",
    status: "Inactive",
    totalForms: 1,
    totalInvestment: "150000",
  },
]

const ordersData = [
  {
    id: "ORD001",
    userId: "U001",
    userName: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    fund: "HDFC Top 100 Fund",
    type: "SIP",
    action: "Buy",
    amount: 5000,
    units: 6.37,
    nav: 785.2,
    status: "Completed",
    folio: "12345678",
    date: "2024-01-15",
    time: "10:30 AM",
  },
  {
    id: "ORD004",
    userId: "U004",
    userName: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    fund: "SBI Corporate Bond Fund",
    type: "SIP",
    action: "Buy",
    amount: 2000,
    units: 106.67,
    nav: 18.75,
    status: "Placed",
    folio: "44332211",
    date: "2024-01-16",
    time: "09:00 AM",
  },
  {
    id: "ORD005",
    userId: "U005",
    userName: "Vikram Singh",
    email: "vikram.singh@email.com",
    fund: "HDFC Gold ETF",
    type: "Redeem",
    action: "Sell",
    amount: 5000,
    units: 95.6,
    nav: 52.3,
    status: "Executed",
    folio: "55667788",
    date: "2024-01-12",
    time: "03:20 PM",
  },
]

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGoalType, setFilterGoalType] = useState("all")
  const [selectedForm, setSelectedForm] = useState<any>(null)
  const [orders, setOrders] = useState(ordersData)

  const goalTypeConfig = {
    retirement: { title: "Retirement Planning", icon: PiggyBank, color: "text-blue-500" },
    education: { title: "Education/Marriage", icon: GraduationCap, color: "text-green-500" },
    lifestyle: { title: "Lifestyle/Property", icon: Home, color: "text-purple-500" },
    emergency: { title: "Emergency Fund", icon: Heart, color: "text-red-500" },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-500"
      case "Under Review":
        return "bg-yellow-500"
      case "Approved":
        return "bg-green-500"
      case "Rejected":
        return "bg-red-500"
      case "Open":
        return "bg-orange-500"
      case "In Progress":
        return "bg-blue-500"
      case "Resolved":
        return "bg-green-500"
      case "Active":
        return "bg-green-500"
      case "Inactive":
        return "bg-gray-500"
      case "Placed":
        return "bg-yellow-500"
      case "Executed":
        return "bg-green-500"
      case "Completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatCurrency = (amount: string | number) => {
    if (!amount) return "₹0"
    return `₹${Number(amount).toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter functions
  const filteredGoalForms = sampleGoalForms.filter((form) => {
    const matchesSearch =
      form.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || form.status === filterStatus
    const matchesGoalType = filterGoalType === "all" || form.goalType === filterGoalType
    return matchesSearch && matchesStatus && matchesGoalType
  })

  const filteredSupportTickets = sampleSupportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase()
    const matches =
      o.id.toLowerCase().includes(term) ||
      o.userName.toLowerCase().includes(term) ||
      o.email.toLowerCase().includes(term) ||
      o.fund.toLowerCase().includes(term) ||
      o.folio.toLowerCase().includes(term)
    const statusOk = filterStatus === "all" || o.status === filterStatus
    return matches && statusOk
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">VPW Admin</h1>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 container mx-auto px-4 pb-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36 h-9">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Placed">Placed</SelectItem>
              <SelectItem value="Executed">Executed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="goal-forms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-9">
            <TabsTrigger value="goal-forms" className="text-sm">
              Goal Forms ({sampleGoalForms.length})
            </TabsTrigger>
            <TabsTrigger value="support-tickets" className="text-sm">
              Support Tickets ({sampleSupportTickets.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="text-sm">
              Users ({sampleUsers.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm">
              Orders ({orders.length})
            </TabsTrigger>
          </TabsList>

          {/* Goal Forms Tab */}
          <TabsContent value="goal-forms">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Financial Goal Forms</CardTitle>
                    <CardDescription className="text-sm">Manage all submitted financial planning forms</CardDescription>
                  </div>
                  <Select value={filterGoalType} onValueChange={setFilterGoalType}>
                    <SelectTrigger className="w-44 h-9">
                      <SelectValue placeholder="Filter by goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Goal Types</SelectItem>
                      <SelectItem value="retirement">Retirement Planning</SelectItem>
                      <SelectItem value="education">Education/Marriage</SelectItem>
                      <SelectItem value="lifestyle">Lifestyle/Property</SelectItem>
                      <SelectItem value="emergency">Emergency Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="h-10">
                      <TableHead className="text-xs font-medium">Form ID</TableHead>
                      <TableHead className="text-xs font-medium">User</TableHead>
                      <TableHead className="text-xs font-medium">Goal Type</TableHead>
                      <TableHead className="text-xs font-medium">Annual Income</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                      <TableHead className="text-xs font-medium">Submitted</TableHead>
                      <TableHead className="text-xs font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGoalForms.map((form) => {
                      const goalConfig = goalTypeConfig[form.goalType as keyof typeof goalTypeConfig]
                      const Icon = goalConfig?.icon || FileText

                      return (
                        <TableRow key={form.id} className="h-12">
                          <TableCell className="font-medium text-sm py-2">{form.id}</TableCell>
                          <TableCell className="py-2">
                            <div>
                              <p className="font-medium text-sm">{form.userName}</p>
                              <p className="text-xs text-muted-foreground">{form.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="py-2">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-3 w-3 ${goalConfig?.color}`} />
                              <span className="text-xs">{goalConfig?.title}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm py-2">
                            {formatCurrency(form.data.currentAnnualIncome)}
                          </TableCell>
                          <TableCell className="py-2">
                            <Badge className={`${getStatusColor(form.status)} text-xs px-2 py-0`}>{form.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm py-2">{formatDate(form.createdAt)}</TableCell>
                          <TableCell className="py-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs bg-transparent"
                                  onClick={() => setSelectedForm(form)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Form Details - {form.id}</DialogTitle>
                                  <DialogDescription>
                                    {goalConfig?.title} submitted by {form.userName}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedForm && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Name:</span>
                                        <p className="font-medium">{selectedForm.data.name}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Age:</span>
                                        <p className="font-medium">{selectedForm.data.age}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Occupation:</span>
                                        <p className="font-medium">{selectedForm.data.occupation}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Annual Income:</span>
                                        <p className="font-medium">
                                          {formatCurrency(selectedForm.data.currentAnnualIncome)}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Current Savings:</span>
                                        <p className="font-medium">
                                          {formatCurrency(selectedForm.data.currentSavings)}
                                        </p>
                                      </div>
                                      {selectedForm.goalType === "retirement" && selectedForm.data.retirementAge && (
                                        <div>
                                          <span className="text-muted-foreground">Retirement Age:</span>
                                          <p className="font-medium">{selectedForm.data.retirementAge}</p>
                                        </div>
                                      )}
                                      {selectedForm.goalType === "lifestyle" && selectedForm.data.desiredAmount && (
                                        <div>
                                          <span className="text-muted-foreground">Target Amount:</span>
                                          <p className="font-medium">
                                            {formatCurrency(selectedForm.data.desiredAmount)}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="support-tickets">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Support Tickets</CardTitle>
                <CardDescription className="text-sm">Manage customer support requests and queries</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="h-10">
                      <TableHead className="text-xs font-medium">Ticket ID</TableHead>
                      <TableHead className="text-xs font-medium">User</TableHead>
                      <TableHead className="text-xs font-medium">Subject</TableHead>
                      <TableHead className="text-xs font-medium">Category</TableHead>
                      <TableHead className="text-xs font-medium">Priority</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                      <TableHead className="text-xs font-medium">Created</TableHead>
                      <TableHead className="text-xs font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSupportTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="h-12">
                        <TableCell className="font-medium text-sm py-2">{ticket.id}</TableCell>
                        <TableCell className="py-2">
                          <div>
                            <p className="font-medium text-sm">{ticket.userName}</p>
                            <p className="text-xs text-muted-foreground">{ticket.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm py-2">{ticket.subject}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className="capitalize text-xs px-2 py-0">
                            {ticket.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge
                            variant={
                              ticket.priority === "urgent"
                                ? "destructive"
                                : ticket.priority === "high"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs px-2 py-0"
                          >
                            {ticket.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          <Badge className={`${getStatusColor(ticket.status)} text-xs px-2 py-0`}>
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm py-2">{formatDate(ticket.createdAt)}</TableCell>
                        <TableCell className="py-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">User Management</CardTitle>
                <CardDescription className="text-sm">
                  Manage registered users and their account information
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="h-10">
                      <TableHead className="text-xs font-medium">User ID</TableHead>
                      <TableHead className="text-xs font-medium">Name</TableHead>
                      <TableHead className="text-xs font-medium">Email</TableHead>
                      <TableHead className="text-xs font-medium">Phone</TableHead>
                      <TableHead className="text-xs font-medium">Total Investment</TableHead>
                      <TableHead className="text-xs font-medium">Forms</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                      <TableHead className="text-xs font-medium">Joined</TableHead>
                      <TableHead className="text-xs font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="h-12">
                        <TableCell className="font-medium text-sm py-2">{user.id}</TableCell>
                        <TableCell className="font-medium text-sm py-2">{user.name}</TableCell>
                        <TableCell className="text-sm py-2">{user.email}</TableCell>
                        <TableCell className="text-sm py-2">{user.phone}</TableCell>
                        <TableCell className="text-sm py-2">{formatCurrency(user.totalInvestment)}</TableCell>
                        <TableCell className="text-sm py-2">{user.totalForms}</TableCell>
                        <TableCell className="py-2">
                          <Badge className={`${getStatusColor(user.status)} text-xs px-2 py-0`}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm py-2">{formatDate(user.joinedAt)}</TableCell>
                        <TableCell className="py-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Orders Management</CardTitle>
                <CardDescription className="text-sm">Review and update order statuses</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="h-10">
                      <TableHead className="text-xs font-medium">Order ID</TableHead>
                      <TableHead className="text-xs font-medium">User</TableHead>
                      <TableHead className="text-xs font-medium">Fund</TableHead>
                      <TableHead className="text-xs font-medium">Action</TableHead>
                      <TableHead className="text-xs font-medium">Amount</TableHead>
                      <TableHead className="text-xs font-medium">Units</TableHead>
                      <TableHead className="text-xs font-medium">NAV</TableHead>
                      <TableHead className="text-xs font-medium">Folio</TableHead>
                      <TableHead className="text-xs font-medium">Date</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((o) => (
                      <TableRow key={o.id} className="h-12">
                        <TableCell className="font-medium text-sm py-2">{o.id}</TableCell>
                        <TableCell className="py-2">
                          <div>
                            <p className="font-medium text-sm">{o.userName}</p>
                            <p className="text-xs text-muted-foreground">{o.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm py-2">{o.fund}</TableCell>
                        <TableCell className="text-sm py-2">{o.action}</TableCell>
                        <TableCell className="text-sm py-2">₹{o.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm py-2">{o.units.toFixed(2)}</TableCell>
                        <TableCell className="text-sm py-2">₹{o.nav.toFixed(2)}</TableCell>
                        <TableCell className="text-sm py-2">{o.folio}</TableCell>
                        <TableCell className="text-sm py-2">{formatDate(o.date)}</TableCell>
                        <TableCell className="py-2">
                          <Select
                            value={o.status}
                            onValueChange={(value: "Placed" | "Executed" | "Completed") =>
                              setOrders((prev) =>
                                prev.map((ord) => (ord.id === o.id ? { ...ord, status: value } : ord)),
                              )
                            }
                          >
                            <SelectTrigger className="h-8 w-36">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Placed">Placed</SelectItem>
                              <SelectItem value="Executed">Executed</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
