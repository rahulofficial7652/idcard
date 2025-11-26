import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { SchemaBuilder } from "@/components/schemas/schema-builder"
import { notFound } from "next/navigation"

export default async function SchemaEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const { id } = await params

  const schema = await prisma.fieldSchema.findUnique({
    where: { id }
  })

  if (!schema || schema.organizationId !== session.user.organizationId) {
    notFound()
  }

  return (
    <div className="p-8">
      <SchemaBuilder schema={schema} />
    </div>
  )
}
