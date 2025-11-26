import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { TemplateDesigner } from "@/components/templates/template-designer"
import { notFound } from "next/navigation"

export default async function TemplateEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) return <div>Unauthorized</div>

  const { id } = await params

  const template = await prisma.template.findUnique({
    where: { id }
  })

  if (!template || template.organizationId !== session.user.organizationId) {
    notFound()
  }

  return (
    <div className="p-8">
      <TemplateDesigner template={template} />
    </div>
  )
}
