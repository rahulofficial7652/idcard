import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    let whereClause = {}

    // If not super admin, restrict to own organization
    if (session.user.role !== "SUPER_ADMIN") {
      if (!session.user.organizationId) {
        return new NextResponse("Organization required", { status: 400 })
      }
      whereClause = {
        organizationId: session.user.organizationId
      }
    }

    const schemas = await prisma.fieldSchema.findMany({
      where: whereClause,
      include: {
        organization: {
          select: {
            name: true
          }
        },
        creator: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(schemas)
  } catch (error) {
    console.error("[SCHEMAS_LIST]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
