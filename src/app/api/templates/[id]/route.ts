import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const templateUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  settingsJson: z.record(z.string(), z.any()).optional(),
  assets: z.record(z.string(), z.any()).optional()
})

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params

  const template = await prisma.template.findUnique({
    where: { id }
  })

  if (!template || template.organizationId !== session.user.organizationId) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.json(template)
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params

  try {
    const json = await req.json()
    const body = templateUpdateSchema.parse(json)

    const existingTemplate = await prisma.template.findUnique({
      where: { id }
    })

    if (!existingTemplate || existingTemplate.organizationId !== session.user.organizationId) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const updatedTemplate = await prisma.template.update({
      where: { id },
      data: {
        name: body.name,
        settingsJson: body.settingsJson as any,
        assets: (body.assets || {}) as any
      }
    })

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
