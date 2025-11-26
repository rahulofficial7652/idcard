import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const schemaSchema = z.object({
  name: z.string().min(2),
  jsonSchema: z.record(z.string(), z.any()), // The actual field definitions
  organizationId: z.string().optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = schemaSchema.parse(json)

    // Ensure orgId matches session (unless SuperAdmin, but let's restrict for now)
    const orgId = session.user.organizationId

    const schema = await prisma.fieldSchema.create({
      data: {
        name: body.name,
        jsonSchema: body.jsonSchema as any,
        organizationId: orgId,
        createdBy: session.user.id
      }
    })

    return NextResponse.json(schema)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const schemas = await prisma.fieldSchema.findMany({
    where: {
      organizationId: session.user.organizationId,
      isActive: true
    },
    orderBy: { updatedAt: 'desc' }
  })

  return NextResponse.json(schemas)
}
