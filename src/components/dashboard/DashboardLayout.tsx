"use client"

import { Sidebar } from "./sidebar"
import { TopBar } from "./TopBar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "SUPER_ADMIN" | "ADMIN" | "USER"
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardLayout({ children, role, user }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <div className="hidden md:block w-64 fixed inset-y-0 z-50">
        <Sidebar role={role} />
      </div>
      <div className="md:pl-64 flex-1 flex flex-col min-h-screen">
        <TopBar user={user} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
