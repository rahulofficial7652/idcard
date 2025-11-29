"use client"

import * as React from "react"
import {
  IconBuilding,
  IconDashboard,
  IconDatabase, 
  IconFolder,
  IconHelp,
  IconId,
  IconLock,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconUserCog,
  IconFileDescription,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // These URLs are rendered by the NavMain component which uses Next.js Link for client-side navigation
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Employees",
      url: "/admin/employees",
      icon: IconUsers,
    },
    {
      title: "Fields",
      url: "/admin/fields",
      icon: IconDatabase,
    },
    {
      title: "ID Cards",
      url: "/admin/id-cards",
      icon: IconId,
    },
    {
      title: "Permissions",
      url: "/admin/permissions",
      icon: IconLock,
    },
  ],
   data: [
    {
      name: "Generated IDs",
      url: "/admin/generatedid",
      icon: IconId,
    },
    {
      name: "Photo Library",
      url: "/admin/photo-library",
      icon: IconFolder,
    },
    {
      name: "Reports",
      url: "/admin/reports",
      icon: IconReport,
    },
  ],
  management: [
    {
      name: "User Management",
      url: "/admin/user-management",
      icon: IconUsers,
    },
    {
      name: "Organization Management",
      url: "/admin/organization-management",
      icon: IconBuilding,
    },
    {
      name: "Roles Management",
      url: "/admin/roles-management",
      icon: IconUserCog,
    },
  ],
  navSecondary: [
    {
      title: "Audit Logs",
      url: "/admin/audit-logs",
      icon: IconFileDescription,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "/admin/search",
      icon: IconSearch,
    },
    {
      title: "Help",
      url: "/admin/help",
      icon: IconHelp,
    },
  ],
 
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            > 
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.data} />
        <NavDocuments items={data.management} />
     
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
