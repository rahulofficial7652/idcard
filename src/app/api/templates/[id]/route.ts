import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const template = await prisma.template.findUnique({
      where: {
        id: params.id
      }
    })

    if (!template) {
      return new NextResponse("Template not found", { status: 404 })
    }

    if (template.organizationId !== session.user.organizationId) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await prisma.template.delete({
      where: {
        id: params.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[TEMPLATE_DELETE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
