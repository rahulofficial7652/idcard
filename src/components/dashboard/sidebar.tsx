"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building2, FileText, CreditCard, Database, Settings } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organizations",
    href: "/admin/orgs",
    icon: Building2,
  },
  {
    title: "Schemas",
    href: "/admin/schemas",
    icon: FileText,
  },
  {
    title: "Templates",
    href: "/admin/templates",
    icon: CreditCard,
  },
  {
    title: "Records",
    href: "/admin/records",
    icon: Database,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-card min-h-screen p-4 space-y-4 hidden md:block">
      <div className="font-bold text-xl px-4 mb-6">ID Card App</div>
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
