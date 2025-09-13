"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export function WhatsAppWidget() {
  const { user } = useAuth()
  const [isVisible, setIsVisible] = useState(true)

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm ${user?.name || "a user"} and I need help with my Only VPW account.`
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 w-6 h-6 bg-background border rounded-full shadow-sm"
        >
          <X className="h-3 w-3" />
        </Button>

        <div className="absolute bottom-16 right-0 bg-background border rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-sm font-medium mb-1">Need help?</p>
          <p className="text-xs text-muted-foreground">Chat with us on WhatsApp for instant support!</p>
        </div>
      </div>
    </div>
  )
}
