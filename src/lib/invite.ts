import { prisma } from "@/lib/db"
import { InviteStatus, UserRole } from "@prisma/client"
import crypto from "crypto"

export async function createInvite(email: string, role: UserRole, organizationId?: string) {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const invite = await prisma.invite.create({
    data: {
      email,
      role,
      token,
      expiresAt,
      organizationId,
      status: InviteStatus.PENDING
    }
  })

  return invite
}

export async function validateInvite(token: string) {
  const invite = await prisma.invite.findUnique({
    where: { token },
    include: { organization: true }
  })

  if (!invite) return null

  if (invite.status !== InviteStatus.PENDING) return null
  if (new Date() > invite.expiresAt) return null

  return invite
}

export async function acceptInvite(token: string) {
  return await prisma.invite.update({
    where: { token },
    data: { status: InviteStatus.ACCEPTED }
  })
}
