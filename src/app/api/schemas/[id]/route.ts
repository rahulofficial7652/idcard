import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const schemaUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  jsonSchema: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().optional()
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

  const schema = await prisma.fieldSchema.findUnique({
    where: { id }
  })

  if (!schema || schema.organizationId !== session.user.organizationId) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.json(schema)
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
    const body = schemaUpdateSchema.parse(json)

    const existingSchema = await prisma.fieldSchema.findUnique({
      where: { id }
    })

    if (!existingSchema || existingSchema.organizationId !== session.user.organizationId) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const updatedSchema = await prisma.fieldSchema.update({
      where: { id },
      data: {
        name: body.name,
        jsonSchema: body.jsonSchema as any,
        isActive: body.isActive,
        version: { increment: 1 }
      }
    })

    return NextResponse.json(updatedSchema)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
