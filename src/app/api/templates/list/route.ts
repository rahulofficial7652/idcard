import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const templates = await prisma.template.findMany({
      where: {
        organizationId: session.user.organizationId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error("[TEMPLATES_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
