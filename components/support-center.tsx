"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, MessageCircle, HelpCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface SupportCenterProps {
  onBack: () => void
}

export function SupportCenter({ onBack }: SupportCenterProps) {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create my first financial goal?",
          answer:
            "To create your first financial goal, navigate to the 'Goals' section from your dashboard and click 'New Goal'. Choose from Retirement Planning, Education/Marriage, Lifestyle/Property Goals, or Emergency Fund. Fill out the 3-step form with your personal information, financial details, and goal-specific requirements.",
        },
        {
          question: "What documents do I need to get started?",
          answer:
            "You'll need basic documents like PAN card, Aadhaar card, bank statements, salary slips (if salaried), and any existing investment statements. These help us provide personalized financial advice.",
        },
        {
          question: "How secure is my financial data?",
          answer:
            "We use bank-grade security with 256-bit SSL encryption. Your data is stored securely and never shared with third parties without your consent. We comply with all financial data protection regulations.",
        },
      ],
    },
    {
      category: "Investments & SIPs",
      questions: [
        {
          question: "What is a SIP and how does it work?",
          answer:
            "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. It helps in rupee cost averaging and building wealth over time. You can start with as little as ₹500 per month.",
        },
        {
          question: "Can I modify or stop my SIP anytime?",
          answer:
            "Yes, you have complete flexibility to modify, pause, or stop your SIP anytime without any penalties. You can change the amount, frequency, or switch to different funds as per your needs.",
        },
      ],
    },
    {
      category: "Support & Help",
      questions: [
        {
          question: "How can I contact customer support?",
          answer:
            "You can reach us through WhatsApp for instant support. Our support team is available Monday to Saturday, 9 AM to 7 PM. For urgent queries, use WhatsApp for fastest response.",
        },
        {
          question: "What if I face technical issues?",
          answer:
            "For technical issues, try refreshing the page or clearing your browser cache first. If the problem persists, contact our support team with details about the issue and your device/browser information.",
        },
      ],
    },
  ]

  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const handleWhatsAppSupport = () => {
    const message = `Hi! I'm ${user?.name} and I need help with my VPW account.`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Support Center</h2>
            <p className="text-sm text-muted-foreground hidden md:block">Get help and find answers to your questions</p>
          </div>
        </div>

        <Card className="mb-4 md:mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-4 w-4 text-green-500" />
              WhatsApp Support
            </CardTitle>
            <CardDescription className="text-sm">Get instant help via WhatsApp chat</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button onClick={handleWhatsAppSupport} className="w-full bg-green-500 hover:bg-green-600 h-9">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Support
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Available 24/7 for instant support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9"
              />
            </div>

            <div className="space-y-3">
              {filteredFAQs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <HelpCircle className="h-10 w-10 text-muted-foreground mb-3" />
                  <h3 className="text-base font-semibold mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground text-center mb-3 px-4">
                    Try different keywords or contact our support team for help.
                  </p>
                  <Button onClick={handleWhatsAppSupport} size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Support
                  </Button>
                </div>
              ) : (
                filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide px-1">
                      {category.category}
                    </h4>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border-b border-border/50"
                        >
                          <AccordionTrigger className="text-left text-sm py-3 hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pb-3">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
