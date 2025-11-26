"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { UserNav } from "./user-nav"
import { sidebarItems } from "./sidebar"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b h-16 flex items-center px-6 justify-between bg-card">
      <div className="flex items-center gap-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="border-b p-6">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setOpen(false)}>
                ID Card App
              </Link>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="font-bold md:hidden">ID Card App</div>
      </div>
      
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </header>
  )
}
