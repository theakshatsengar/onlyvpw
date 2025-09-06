"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Save, PiggyBank, GraduationCap, Home, Heart } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface FormData {
  // Personal Info
  name: string
  age: string
  gender: string
  maritalStatus: string
  occupation: string
  incomeType: string
  incomeSource: string
  dependents: string
  dependentAges: string

  // Financial Info
  currentAnnualIncome: string
  currentSavings: string
  emergencyFund: string
  liabilities: string
  monthlyExpenses: string
  netWorth: string

  // Goal Specific
  goalType: string
  retirementAge: string
  lifestyleGoals: string
  location: string
  bucketList: string
  educationLevel: string
  educationYear: string
  educationCost: string
  marriageWhen: string
  marriageCost: string
  desiredAmount: string
  purpose: string
  timeline: string
  investmentTerms: string
}

const initialFormData: FormData = {
  name: "",
  age: "",
  gender: "",
  maritalStatus: "",
  occupation: "",
  incomeType: "",
  incomeSource: "",
  dependents: "",
  dependentAges: "",
  currentAnnualIncome: "",
  currentSavings: "",
  emergencyFund: "",
  liabilities: "",
  monthlyExpenses: "",
  netWorth: "",
  goalType: "",
  retirementAge: "",
  lifestyleGoals: "",
  location: "",
  bucketList: "",
  educationLevel: "",
  educationYear: "",
  educationCost: "",
  marriageWhen: "",
  marriageCost: "",
  desiredAmount: "",
  purpose: "",
  timeline: "",
  investmentTerms: "",
}

interface GoalFormsProps {
  onBack: () => void
}

export function GoalForms({ onBack }: GoalFormsProps) {
  const { user } = useAuth()
  const [selectedGoal, setSelectedGoal] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    name: user?.name || "",
  })

  const goalTypes = [
    {
      id: "retirement",
      title: "Retirement Planning",
      description: "Plan for your golden years with systematic savings",
      icon: PiggyBank,
      color: "text-blue-500",
    },
    {
      id: "education",
      title: "Education/Marriage",
      description: "Secure your child's future or plan your wedding",
      icon: GraduationCap,
      color: "text-green-500",
    },
    {
      id: "lifestyle",
      title: "Lifestyle/Property Goals",
      description: "Achieve your dreams - home, car, travel, and more",
      icon: Home,
      color: "text-purple-500",
    },
    {
      id: "emergency",
      title: "Emergency Fund",
      description: "Build a safety net for unexpected expenses",
      icon: Heart,
      color: "text-red-500",
    },
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // Save form data to localStorage for now
    const existingForms = JSON.parse(localStorage.getItem("finplan_forms") || "[]")
    const newForm = {
      id: Date.now().toString(),
      userId: user?.id,
      goalType: selectedGoal,
      data: formData,
      createdAt: new Date().toISOString(),
    }
    existingForms.push(newForm)
    localStorage.setItem("finplan_forms", JSON.stringify(existingForms))

    // Reset form and go back
    setFormData({ ...initialFormData, name: user?.name || "" })
    setSelectedGoal("")
    setCurrentStep(1)
    onBack()
  }

  if (!selectedGoal) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Choose Your Financial Goal</h2>
            <p className="text-muted-foreground">Select the goal you want to plan for</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goalTypes.map((goal) => {
            const Icon = goal.icon
            return (
              <Card
                key={goal.id}
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary"
                onClick={() => {
                  setSelectedGoal(goal.id)
                  setFormData((prev) => ({ ...prev, goalType: goal.id }))
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${goal.color}`} />
                    {goal.title}
                  </CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const selectedGoalData = goalTypes.find((g) => g.id === selectedGoal)!
  const Icon = selectedGoalData.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setSelectedGoal("")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${selectedGoalData.color}`} />
          <div>
            <h2 className="text-2xl font-bold">{selectedGoalData.title}</h2>
            <p className="text-muted-foreground">Step {currentStep} of 3</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Personal Info</TabsTrigger>
              <TabsTrigger value="2">Financial Info</TabsTrigger>
              <TabsTrigger value="3">Goal Details</TabsTrigger>
            </TabsList>

            {/* Step 1: Personal Information */}
            <TabsContent value="1" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="e.g., Teacher, Doctor, Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Income Type</Label>
                  <RadioGroup
                    value={formData.incomeType}
                    onValueChange={(value) => handleInputChange("incomeType", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="salaried" id="salaried" />
                      <Label htmlFor="salaried">Salaried Income</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business">Business/Profession Income</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incomeSource">Income Source</Label>
                  <Input
                    id="incomeSource"
                    value={formData.incomeSource}
                    onChange={(e) => handleInputChange("incomeSource", e.target.value)}
                    placeholder="Employer/Business name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={formData.dependents}
                    onChange={(e) => handleInputChange("dependents", e.target.value)}
                    placeholder="0"
                  />
                </div>

                {formData.dependents && Number.parseInt(formData.dependents) > 0 && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dependentAges">Ages of Dependents</Label>
                    <Input
                      id="dependentAges"
                      value={formData.dependentAges}
                      onChange={(e) => handleInputChange("dependentAges", e.target.value)}
                      placeholder="e.g., 5, 8, 12"
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 2: Financial Information */}
            <TabsContent value="2" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAnnualIncome">Current Annual Income (₹)</Label>
                  <Input
                    id="currentAnnualIncome"
                    type="number"
                    value={formData.currentAnnualIncome}
                    onChange={(e) => handleInputChange("currentAnnualIncome", e.target.value)}
                    placeholder="e.g., 1200000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Annual Savings & Investments (₹)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => handleInputChange("currentSavings", e.target.value)}
                    placeholder="e.g., 200000"
                  />
                </div>

                {selectedGoal !== "emergency" && (
                  <div className="space-y-2">
                    <Label htmlFor="emergencyFund">Emergency Fund (₹)</Label>
                    <Input
                      id="emergencyFund"
                      type="number"
                      value={formData.emergencyFund}
                      onChange={(e) => handleInputChange("emergencyFund", e.target.value)}
                      placeholder="e.g., 300000"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="liabilities">Total Current Annual Liabilities (₹)</Label>
                  <Input
                    id="liabilities"
                    type="number"
                    value={formData.liabilities}
                    onChange={(e) => handleInputChange("liabilities", e.target.value)}
                    placeholder="Loans, EMIs etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                    placeholder="Excluding liabilities"
                  />
                </div>

                {(selectedGoal === "education" || selectedGoal === "lifestyle") && (
                  <div className="space-y-2">
                    <Label htmlFor="netWorth">Net Worth (₹)</Label>
                    <Input
                      id="netWorth"
                      type="number"
                      value={formData.netWorth}
                      onChange={(e) => handleInputChange("netWorth", e.target.value)}
                      placeholder="Auto-calculated based on assets"
                      disabled
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 3: Goal Specific Details */}
            <TabsContent value="3" className="space-y-6 mt-6">
              {selectedGoal === "retirement" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retirementAge">Expected Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={formData.retirementAge}
                      onChange={(e) => handleInputChange("retirementAge", e.target.value)}
                      placeholder="e.g., 60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Lifestyle Goals</Label>
                    <Select
                      value={formData.lifestyleGoals}
                      onValueChange={(value) => handleInputChange("lifestyleGoals", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lifestyle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modest">Modest</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="rich">Rich</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro">Metro</SelectItem>
                        <SelectItem value="urban">Urban</SelectItem>
                        <SelectItem value="semi-urban">Semi Urban</SelectItem>
                        <SelectItem value="village">Village</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bucketList">Bucket List</Label>
                    <Textarea
                      id="bucketList"
                      value={formData.bucketList}
                      onChange={(e) => handleInputChange("bucketList", e.target.value)}
                      placeholder="Travel, Hobby, Charity etc."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {selectedGoal === "education" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Education Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Education Level</Label>
                        <Select
                          value={formData.educationLevel}
                          onValueChange={(value) => handleInputChange("educationLevel", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            <SelectItem value="professional">Professional Course</SelectItem>
                            <SelectItem value="international">International Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="educationYear">Which Year</Label>
                        <Input
                          id="educationYear"
                          type="number"
                          value={formData.educationYear}
                          onChange={(e) => handleInputChange("educationYear", e.target.value)}
                          placeholder="e.g., 2030"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="educationCost">Current Cost of Education (₹)</Label>
                        <Input
                          id="educationCost"
                          type="number"
                          value={formData.educationCost}
                          onChange={(e) => handleInputChange("educationCost", e.target.value)}
                          placeholder="e.g., 2000000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Marriage Details (Optional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="marriageWhen">When</Label>
                        <Input
                          id="marriageWhen"
                          value={formData.marriageWhen}
                          onChange={(e) => handleInputChange("marriageWhen", e.target.value)}
                          placeholder="e.g., 2028"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marriageCost">Current Cost of Marriage (₹)</Label>
                        <Input
                          id="marriageCost"
                          type="number"
                          value={formData.marriageCost}
                          onChange={(e) => handleInputChange("marriageCost", e.target.value)}
                          placeholder="e.g., 1500000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedGoal === "lifestyle" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="desiredAmount">Desired Amount (₹)</Label>
                    <Input
                      id="desiredAmount"
                      type="number"
                      value={formData.desiredAmount}
                      onChange={(e) => handleInputChange("desiredAmount", e.target.value)}
                      placeholder="e.g., 5000000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      placeholder="e.g., Dream Home, Car, Travel"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">When do you want this (Years)</Label>
                    <Input
                      id="timeline"
                      type="number"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      placeholder="Minimum 1 year"
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Investment Terms</Label>
                    <RadioGroup
                      value={formData.investmentTerms}
                      onValueChange={(value) => handleInputChange("investmentTerms", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sip" id="sip" />
                        <Label htmlFor="sip">SIP (Systematic Investment Plan)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lumpsum" id="lumpsum" />
                        <Label htmlFor="lumpsum">Lumpsum</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {selectedGoal === "emergency" && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Emergency Fund Calculation</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your monthly expenses, we recommend an emergency fund of{" "}
                      <span className="font-medium text-foreground">
                        ₹
                        {formData.monthlyExpenses
                          ? (Number.parseInt(formData.monthlyExpenses) * 6).toLocaleString()
                          : "0"}
                      </span>{" "}
                      (6 months of expenses)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Investment Terms</Label>
                      <RadioGroup
                        value={formData.investmentTerms}
                        onValueChange={(value) => handleInputChange("investmentTerms", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sip" id="emergency-sip" />
                          <Label htmlFor="emergency-sip">Monthly SIP</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lumpsum" id="emergency-lumpsum" />
                          <Label htmlFor="emergency-lumpsum">Lumpsum</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Save Goal
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
