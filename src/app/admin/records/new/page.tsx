import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

export default async function NewRecordPage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const schemas = await prisma.fieldSchema.findMany({
    where: {
      organizationId: session.user.organizationId,
      isActive: true
    }
  })

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Record</h1>
        <p className="text-muted-foreground">Select a schema to start collecting data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schemas.map((schema) => (
          <Card key={schema.id} className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {schema.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/admin/records/new/${schema.id}`}>
                  Start Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
