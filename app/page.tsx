"use client"

import { useAuth } from "@/components/auth-provider"
import { AuthForm } from "@/components/auth-form"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return (
    <>
      <Dashboard />
    </>
  )
}
