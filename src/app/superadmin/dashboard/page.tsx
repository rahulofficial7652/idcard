import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserRole } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, ShieldAlert } from "lucide-react"

export default async function SuperAdminDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || session.user.role !== UserRole.SUPER_ADMIN) {
    return <div>Unauthorized</div>
  }

  const [orgCount, userCount, auditCount] = await Promise.all([
    prisma.organization.count(),
    prisma.user.count(),
    prisma.auditLog.count()
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          System Overview
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditCount}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add more super admin controls here, e.g., list of all orgs */}
    </div>
  )
}
