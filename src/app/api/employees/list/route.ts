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

    const employees = await prisma.user.findMany({
      where: {
        organizationId: session.user.organizationId
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(employees)
  } catch (error) {
    console.error("[EMPLOYEES_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
