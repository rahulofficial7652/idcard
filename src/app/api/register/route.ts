import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { UserRole } from "@prisma/client"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  orgName: z.string().min(2)
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = registerSchema.parse(json)

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Create user and organization in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: body.name,
          email: body.email,
          passwordHash: hashedPassword,
          role: UserRole.ADMIN, // Default to ADMIN for new signups
        }
      })

      const org = await tx.organization.create({
        data: {
          name: body.orgName,
          ownerId: user.id,
          users: {
            connect: { id: user.id }
          }
        }
      })

      // Update user with orgId
      await tx.user.update({
        where: { id: user.id },
        data: { organizationId: org.id }
      })

      return user
    })

    return NextResponse.json({ id: result.id, email: result.email })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("Registration error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
