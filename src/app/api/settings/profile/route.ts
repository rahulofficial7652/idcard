import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcryptjs"

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  image: z.string().url().optional().or(z.literal("")),
})

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = updateProfileSchema.parse(json)

    const data: any = {}
    if (body.name) data.name = body.name
    if (body.image !== undefined) data.image = body.image
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      data.passwordHash = hashedPassword
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data
    })

    return NextResponse.json({
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("[PROFILE_UPDATE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
