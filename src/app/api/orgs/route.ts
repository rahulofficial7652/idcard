import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import { z } from "zod"

const orgSchema = z.object({
  name: z.string().min(2),
  settings: z.record(z.string(), z.any()).optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // Only Admin/SuperAdmin can create orgs
  // Actually, usually SuperAdmin creates orgs, or a user registers and creates one.
  // For this flow: Admin creates org? Or SuperAdmin?
  // Prompt says: "Admin: Create one or more Projects / Organizations"
  
  if (session.user.role === UserRole.USER) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    const json = await req.json()
    const body = orgSchema.parse(json)

    const org = await prisma.organization.create({
      data: {
        name: body.name,
        settings: (body.settings || {}) as any,
        ownerId: session.user.id,
        users: {
          connect: { id: session.user.id }
        }
      }
    })

    // Update user's orgId if not set
    if (!session.user.organizationId) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { organizationId: org.id }
      })
    }

    return NextResponse.json(org)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // SuperAdmin sees all, Admin sees their own (or owned ones)
  if (session.user.role === UserRole.SUPER_ADMIN) {
    const orgs = await prisma.organization.findMany({
      include: { owner: { select: { name: true, email: true } } }
    })
    return NextResponse.json(orgs)
  }

  const orgs = await prisma.organization.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        { users: { some: { id: session.user.id } } }
      ]
    }
  })

  return NextResponse.json(orgs)
}
