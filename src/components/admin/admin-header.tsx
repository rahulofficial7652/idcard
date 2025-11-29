"use client";

import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themetoggler";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeader() {
  return (
    <header className="flex h-[var(--header-height)] items-center justify-between border-b rounded-tl-lg rounded-tr-lg px-4 md:px-6 w-full sticky top-0 z-50 bg-background/50 backdrop-blur py-2.5">
      {/* LEFT : LOGO + NAME */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          ID
        </div>
        <h1 className="text-lg font-semibold tracking-tight">
          Admin Dashboard
        </h1>
      </div>

      {/* CENTER : SEARCH */}
      <div className="hidden md:flex items-center relative w-[350px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees, fields, IDs..."
          className="pl-9"
        />
      </div>

      {/* RIGHT : MODE | NOTIFY | AVATAR */}
      <div className="flex items-center gap-3">
        <ModeToggle />

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/admin/profile" className="cursor-pointer flex items-center gap-2">
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer flex items-center gap-2">
                <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
