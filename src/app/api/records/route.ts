import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import { RecordStatus } from "@prisma/client"

const recordSchema = z.object({
  schemaId: z.string(),
  templateId: z.string().optional(),
  dataJson: z.record(z.string(), z.any()),
  status: z.nativeEnum(RecordStatus).optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  // Allow public submission if we implement public tokens later.
  // For now, require auth or at least check logic.
  // If public, we need a way to validate org/schema access.
  
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = recordSchema.parse(json)

    // Verify schema belongs to user's org
    const schema = await prisma.fieldSchema.findUnique({
      where: { id: body.schemaId }
    })

    if (!schema || schema.organizationId !== session.user.organizationId) {
      return new NextResponse("Invalid Schema", { status: 400 })
    }

    const record = await prisma.record.create({
      data: {
        schemaId: body.schemaId,
        templateId: body.templateId,
        dataJson: body.dataJson as any,
        organizationId: session.user.organizationId,
        createdBy: session.user.id,
        status: body.status || RecordStatus.SUBMITTED
      }
    })

    return NextResponse.json(record)
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

  const { searchParams } = new URL(req.url)
  const schemaId = searchParams.get('schemaId')

  const whereClause: any = {
    organizationId: session.user.organizationId
  }

  if (schemaId) {
    whereClause.schemaId = schemaId
  }

  const records = await prisma.record.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      schema: { select: { name: true } },
      creator: { select: { name: true, email: true } }
    }
  })

  return NextResponse.json(records)
}
