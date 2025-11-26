import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return null
  }

  const orgCount = await prisma.organization.count({
    where: {
      users: {
        some: {
          id: session.user.id
        }
      }
    }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Organizations
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
