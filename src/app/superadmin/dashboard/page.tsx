import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { UserRole } from "@prisma/client"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { OverviewLineChart, OverviewBarChart } from "@/components/dashboard/Charts"
import { Users, Building2, ShieldAlert, CreditCard } from "lucide-react"

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

  // Mock data for charts - in a real app this would come from the DB
  const growthData = [
    { name: "Jan", total: 12 },
    { name: "Feb", total: 18 },
    { name: "Mar", total: 25 },
    { name: "Apr", total: 35 },
    { name: "May", total: 45 },
    { name: "Jun", total: 58 },
  ]

  const activityData = [
    { name: "Mon", total: 145 },
    { name: "Tue", total: 230 },
    { name: "Wed", total: 180 },
    { name: "Thu", total: 210 },
    { name: "Fri", total: 290 },
    { name: "Sat", total: 120 },
    { name: "Sun", total: 90 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">System-wide analytics and overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Organizations"
          value={orgCount.toString()}
          icon={Building2}
          description="Active organizations"
          trend={{ value: 12, label: "from last month", positive: true }}
        />
        <StatsCard
          title="Total Users"
          value={userCount.toString()}
          icon={Users}
          description="Registered users"
          trend={{ value: 8, label: "from last month", positive: true }}
        />
        <StatsCard
          title="Audit Logs"
          value={auditCount.toString()}
          icon={ShieldAlert}
          description="System activities"
        />
        <StatsCard
          title="Total ID Cards"
          value="1,234"
          icon={CreditCard}
          description="Generated across system"
          trend={{ value: 24, label: "from last month", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewLineChart 
          title="User Growth" 
          data={growthData} 
          className="col-span-4" 
        />
        <OverviewBarChart 
          title="Weekly Activity" 
          data={activityData} 
          className="col-span-3" 
        />
      </div>
    </div>
  )
}
