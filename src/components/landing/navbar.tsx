"use client";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/themetoggler";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const [toggle, setToggler] = useState(true);
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-background/50 backdrop-blur">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🛡️</span>
          <span className="font-semibold text-lg">ID Card Pro</span>
        </Link>

        {/* Center Menu — Desktop Only */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/features" className="hover:text-primary transition">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-primary transition">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </nav>

        {/* Right side for Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <ModeToggle />

          <Link
            href="/login"
            className="text-sm hover:text-primary bg-secondary px-4 py-2 rounded-lg transition"
          >
            Sign In
          </Link>

          <Button asChild className="rounded-lg px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* MOBILE — Hamburger + Theme */}
        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            {/* Mobile Drawer */}
            <SheetContent side="left" className="w-64 p-6">
              <div className="flex flex-col gap-6">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🛡️</span>
                  <span className="font-semibold text-lg">ID Card Pro</span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4 text-base">
                  <SheetClose asChild>
                    <Link
                      href="/features"
                      className="hover:text-primary transition"
                    >
                      Features
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/pricing"
                      className="hover:text-primary transition"
                    >
                      Pricing
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="hover:text-primary transition"
                    >
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="hover:text-primary transition"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    href="/login"
                    className="text-center bg-secondary py-2 rounded-lg hover:bg-secondary/80"
                  >
                    Sign In
                  </Link>
                  <Button asChild className="rounded-lg w-full">
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
