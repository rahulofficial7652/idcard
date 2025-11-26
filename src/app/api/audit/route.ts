import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { UserRole } from "@prisma/client"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // Only Admin/SuperAdmin can view audit logs
  if (session.user.role === UserRole.USER) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const logs = await prisma.auditLog.findMany({
    where: {
      // If Admin, maybe only show logs for their org?
      // For now, let's assume AuditLog needs an organizationId to filter properly.
      // The current schema links AuditLog to Actor (User), so we can filter by Actor's Org.
      actor: {
        organizationId: session.user.organizationId
      }
    },
    include: {
      actor: { select: { name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 100 // Limit to last 100
  })

  return NextResponse.json(logs)
}
