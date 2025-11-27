"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ShieldCheck, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">ID Card Pro</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <div className="flex gap-2 ml-4 items-center">
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
        <div className="ml-auto md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            {/* wrap sheet content in container */}
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mx-4 mt-12">
                <Link className="text-base font-medium hover:text-primary border-2 rounded-[5px] px-2 py-1" href="#" onClick={() => setIsOpen(false)}>
                  Features
                </Link>
                <Link className="text-base font-medium hover:text-primary border-2 rounded-[5px] px-2 py-1" href="#" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link className="text-base font-medium hover:text-primary border-2 rounded-[5px] px-2 py-1" href="#" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-12">
                  <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
