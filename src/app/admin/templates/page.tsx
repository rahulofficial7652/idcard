import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { CreateTemplateDialog } from "@/components/templates/create-template-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, CreditCard } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const templates = await prisma.template.findMany({
    where: {
      organizationId: session.user.organizationId
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: {
        select: { records: true }
      }
    }
  })

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Design your ID cards.</p>
        </div>
        <CreateTemplateDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {template.name}
              </CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/templates/${template.id}`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Records using this</span>
                  <span className="font-medium">{template._count.records}</span>
                </div>
                <div className="flex justify-between">
                  <span>Updated</span>
                  <span className="font-medium">{formatDistanceToNow(template.updatedAt)} ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
