import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateOrgDialog } from "@/components/dashboard/create-org-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function OrganizationsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return null
  }

  const organizations = await prisma.organization.findMany({
    where: {
      users: {
        some: {
          id: session.user.id
        }
      }
    },
    include: {
      _count: {
        select: { users: true }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <CreateOrgDialog />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>{org._count.users}</TableCell>
                <TableCell>{org.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            {organizations.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No organizations found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
