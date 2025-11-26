import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createInvite } from "@/lib/invite"
import { NextResponse } from "next/server"
import { UserRole } from "@prisma/client"
import { z } from "zod"

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  organizationId: z.string().optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  // RBAC: Only Admin or SuperAdmin can invite
  if (session.user.role === UserRole.USER) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  try {
    const json = await req.json()
    const body = inviteSchema.parse(json)

    // If Admin, can only invite to their own org
    if (session.user.role === UserRole.ADMIN) {
      if (body.role === UserRole.SUPER_ADMIN) {
        return new NextResponse("Forbidden: Admins cannot invite Super Admins", { status: 403 })
      }
      if (body.organizationId && body.organizationId !== session.user.organizationId) {
        return new NextResponse("Forbidden: Cannot invite to another organization", { status: 403 })
      }
      // Force org id to match inviter
      body.organizationId = session.user.organizationId || undefined
    }

    const invite = await createInvite(body.email, body.role, body.organizationId)

    // TODO: Send email with invite link
    // await sendInviteEmail(invite.email, invite.token)

    return NextResponse.json(invite)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
