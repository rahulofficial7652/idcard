import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminAppSidebar } from "@/components/admin/admin-app-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AdminAppSidebar variant="inset" />
        <SidebarInset>
          <AdminHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}
