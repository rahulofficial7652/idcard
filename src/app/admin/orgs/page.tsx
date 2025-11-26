import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { CreateOrgDialog } from "@/components/orgs/create-org-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export default async function OrgsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) return <div>Unauthorized</div>

  const orgs = await prisma.organization.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { users: { some: { id: session.user.id } } }
      ]
    },
    include: {
      _count: {
        select: { users: true, records: true }
      }
    }
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">Manage your organizations and settings.</p>
        </div>
        <CreateOrgDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orgs.map((org) => (
          <Card key={org.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{org.name}</CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/orgs/${org.id}/settings`}>
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mt-2">
                <div className="flex justify-between py-1">
                  <span>Users</span>
                  <span className="font-medium">{org._count.users}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Records</span>
                  <span className="font-medium">{org._count.records}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
