import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"
import { RecordStatus } from "@prisma/client"

// Basic schema for import request
const importSchema = z.object({
  schemaId: z.string(),
  csvData: z.string(), // Raw CSV string
  // In real app, we might upload a file and process it, but for API simplicity:
  // Or we accept a JSON array of objects mapped from CSV on client.
  // Let's accept JSON array for simplicity and better validation.
  records: z.array(z.record(z.string(), z.any()))
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = importSchema.parse(json)

    // Verify schema
    const schema = await prisma.fieldSchema.findUnique({
      where: { id: body.schemaId }
    })

    if (!schema || schema.organizationId !== session.user.organizationId) {
      return new NextResponse("Invalid Schema", { status: 400 })
    }

    // Bulk create
    // Note: Prisma createMany doesn't support nested relations or some features,
    // but for simple data it works. However, 'dataJson' is Json type.
    
    const createdRecords = await prisma.record.createMany({
      data: body.records.map(recordData => ({
        schemaId: body.schemaId,
        dataJson: recordData as any,
        organizationId: session.user.organizationId!,
        createdBy: session.user.id,
        status: RecordStatus.DRAFT // Import as draft by default
      }))
    })

    return NextResponse.json({ count: createdRecords.count })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
