import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
import Link from "next/link"

export default async function UserDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) return <div>Unauthorized</div>

  const myRecordsCount = await prisma.record.count({
    where: { createdBy: session.user.id }
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <Button asChild>
          <Link href="/admin/records/new">
            <Plus className="mr-2 h-4 w-4" />
            Collect New Data
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myRecordsCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add list of recent submissions by this user */}
    </div>
  )
}
