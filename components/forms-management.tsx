"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  PiggyBank,
  GraduationCap,
  Home,
  Heart,
  Plus,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface FormSubmission {
  id: string
  userId: string
  goalType: string
  data: any
  createdAt: string
  updatedAt?: string
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected"
}

interface FormsManagementProps {
  onBack: () => void
  onNewForm: () => void
}

export function FormsManagement({ onBack, onNewForm }: FormsManagementProps) {
  const { user } = useAuth()
  const [forms, setForms] = useState<FormSubmission[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGoal, setFilterGoal] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedForm, setSelectedForm] = useState<FormSubmission | null>(null)

  useEffect(() => {
    // Load forms from localStorage
    const savedForms = JSON.parse(localStorage.getItem("finplan_forms") || "[]")
    const userForms = savedForms.filter((form: FormSubmission) => form.userId === user?.id)
    setForms(userForms)
  }, [user?.id])

  const goalTypeConfig = {
    retirement: {
      title: "Retirement Planning",
      icon: PiggyBank,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    education: {
      title: "Education/Marriage",
      icon: GraduationCap,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    lifestyle: {
      title: "Lifestyle/Property Goals",
      icon: Home,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    emergency: {
      title: "Emergency Fund",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
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
      case "Draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleDeleteForm = (formId: string) => {
    const updatedForms = forms.filter((form) => form.id !== formId)
    setForms(updatedForms)

    // Update localStorage
    const allForms = JSON.parse(localStorage.getItem("finplan_forms") || "[]")
    const filteredForms = allForms.filter((form: FormSubmission) => form.id !== formId)
    localStorage.setItem("finplan_forms", JSON.stringify(filteredForms))
  }

  const filteredForms = forms.filter((form) => {
    const matchesSearch =
      form.data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goalTypeConfig[form.goalType as keyof typeof goalTypeConfig]?.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesGoal = filterGoal === "all" || form.goalType === filterGoal
    const matchesStatus = filterStatus === "all" || form.status === filterStatus

    return matchesSearch && matchesGoal && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: string | number) => {
    if (!amount) return "Not specified"
    return `₹${Number(amount).toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Forms Management</h2>
          <p className="text-muted-foreground">View and manage your submitted financial planning forms</p>
        </div>
        <Button onClick={onNewForm}>
          <Plus className="h-4 w-4 mr-2" />
          New Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Total Forms</CardDescription>
            <CardTitle className="text-xl text-primary">{forms.length}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Submitted</CardDescription>
            <CardTitle className="text-xl text-blue-500">
              {forms.filter((f) => f.status === "Submitted").length}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Approved</CardDescription>
            <CardTitle className="text-xl text-green-500">
              {forms.filter((f) => f.status === "Approved").length}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Ready to proceed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Active Goals</CardDescription>
            <CardTitle className="text-xl text-primary">{new Set(forms.map((f) => f.goalType)).size}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Goal types</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Select value={filterGoal} onValueChange={setFilterGoal}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="retirement">Retirement</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Forms List */}
      {filteredForms.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No forms found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {forms.length === 0
                ? "You haven't submitted any financial planning forms yet."
                : "No forms match your current filters."}
            </p>
            <Button onClick={onNewForm}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Form
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredForms.map((form) => {
            const goalConfig = goalTypeConfig[form.goalType as keyof typeof goalTypeConfig]
            const Icon = goalConfig?.icon || FileText

            return (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${goalConfig?.bgColor}`}>
                        <Icon className={`h-6 w-6 ${goalConfig?.color}`} />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{goalConfig?.title}</h3>
                          <Badge className={getStatusColor(form.status)}>{form.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{form.data.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {formatDate(form.createdAt)}</span>
                          </div>
                          {form.goalType === "retirement" && form.data.retirementAge && (
                            <div>
                              <span>Retirement Age: {form.data.retirementAge}</span>
                            </div>
                          )}
                          {form.goalType === "lifestyle" && form.data.desiredAmount && (
                            <div>
                              <span>Target: {formatCurrency(form.data.desiredAmount)}</span>
                            </div>
                          )}
                          {form.goalType === "education" && form.data.educationCost && (
                            <div>
                              <span>Education Cost: {formatCurrency(form.data.educationCost)}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-sm">
                          <span className="text-muted-foreground">Annual Income: </span>
                          <span className="font-medium">{formatCurrency(form.data.currentAnnualIncome)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedForm(form)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon className={`h-5 w-5 ${goalConfig?.color}`} />
                              {goalConfig?.title} - Form Details
                            </DialogTitle>
                            <DialogDescription>Submitted on {formatDate(form.createdAt)}</DialogDescription>
                          </DialogHeader>

                          {selectedForm && (
                            <div className="space-y-6">
                              {/* Personal Information */}
                              <div>
                                <h4 className="font-semibold mb-3">Personal Information</h4>
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
                                    <span className="text-muted-foreground">Gender:</span>
                                    <p className="font-medium capitalize">{selectedForm.data.gender}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Marital Status:</span>
                                    <p className="font-medium capitalize">{selectedForm.data.maritalStatus}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Occupation:</span>
                                    <p className="font-medium">{selectedForm.data.occupation}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Income Type:</span>
                                    <p className="font-medium capitalize">{selectedForm.data.incomeType}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Financial Information */}
                              <div>
                                <h4 className="font-semibold mb-3">Financial Information</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Annual Income:</span>
                                    <p className="font-medium">
                                      {formatCurrency(selectedForm.data.currentAnnualIncome)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Current Savings:</span>
                                    <p className="font-medium">{formatCurrency(selectedForm.data.currentSavings)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Monthly Expenses:</span>
                                    <p className="font-medium">{formatCurrency(selectedForm.data.monthlyExpenses)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Liabilities:</span>
                                    <p className="font-medium">{formatCurrency(selectedForm.data.liabilities)}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Goal Specific Information */}
                              <div>
                                <h4 className="font-semibold mb-3">Goal Specific Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  {selectedForm.goalType === "retirement" && (
                                    <>
                                      <div>
                                        <span className="text-muted-foreground">Retirement Age:</span>
                                        <p className="font-medium">{selectedForm.data.retirementAge}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Lifestyle Goals:</span>
                                        <p className="font-medium capitalize">{selectedForm.data.lifestyleGoals}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Location:</span>
                                        <p className="font-medium capitalize">{selectedForm.data.location}</p>
                                      </div>
                                    </>
                                  )}

                                  {selectedForm.goalType === "lifestyle" && (
                                    <>
                                      <div>
                                        <span className="text-muted-foreground">Desired Amount:</span>
                                        <p className="font-medium">{formatCurrency(selectedForm.data.desiredAmount)}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Purpose:</span>
                                        <p className="font-medium">{selectedForm.data.purpose}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Timeline:</span>
                                        <p className="font-medium">{selectedForm.data.timeline} years</p>
                                      </div>
                                    </>
                                  )}

                                  {selectedForm.goalType === "education" && (
                                    <>
                                      <div>
                                        <span className="text-muted-foreground">Education Level:</span>
                                        <p className="font-medium capitalize">{selectedForm.data.educationLevel}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Education Year:</span>
                                        <p className="font-medium">{selectedForm.data.educationYear}</p>
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Education Cost:</span>
                                        <p className="font-medium">{formatCurrency(selectedForm.data.educationCost)}</p>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Form</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this {goalConfig?.title.toLowerCase()} form? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteForm(form.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
