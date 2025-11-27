import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { DynamicForm } from "@/components/records/dynamic-form"
import { notFound } from "next/navigation"

export default async function CollectDataPage({ params }: { params: Promise<{ schemaId: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const { schemaId } = await params

  const schema = await prisma.fieldSchema.findUnique({
    where: { id: schemaId }
  })

  if (!schema || schema.organizationId !== session.user.organizationId) {
    notFound()
  }

  const templates = await prisma.template.findMany({
    where: { organizationId: session.user.organizationId }
  })

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New {schema.name} Record</h1>
        <p className="text-muted-foreground">Fill out the form details below.</p>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <DynamicForm schema={schema} templates={templates} />
      </div>
    </div>
  )
}
