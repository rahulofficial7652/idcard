"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  Settings,
  FileText,
  Shield,
  LogOut,
  PieChart,
  UserPlus,
  HelpCircle,
  Activity,
  FileJson
} from "lucide-react"

interface SidebarProps {
  role: "SUPER_ADMIN" | "ADMIN" | "USER"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const superAdminLinks = [
    { href: "/superadmin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/superadmin/organizations", label: "Organizations", icon: Building2 },
    { href: "/superadmin/users", label: "All Users", icon: Users },
    { href: "/superadmin/activity", label: "Activity Logs", icon: Activity },
    { href: "/superadmin/schemas", label: "Schemas", icon: FileText },
    { href: "/superadmin/settings", label: "Global Settings", icon: Settings },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/id-cards", label: "ID Cards", icon: CreditCard },
    { href: "/admin/employees", label: "Employees", icon: Users },
    { href: "/admin/templates", label: "Templates", icon: FileText },
    { href: "/admin/schemas", label: "Schemas", icon: FileJson },
    { href: "/admin/settings/organization", label: "Settings", icon: Settings },
    { href: "/admin/help", label: "Help & Docs", icon: HelpCircle },
  ]

  const links = role === "SUPER_ADMIN" ? superAdminLinks : adminLinks

  return (
    <div className="flex flex-col h-full border-r bg-muted/10">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span>ID Card Pro</span>
        </h1>
      </div>
      <div className="flex-1 px-4 space-y-2 overflow-auto">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </div>
      <div className="p-4 border-t">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}
