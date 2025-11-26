import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const schemaId = searchParams.get('schemaId')

  if (!schemaId) {
    return new NextResponse("Schema ID required", { status: 400 })
  }

  const records = await prisma.record.findMany({
    where: {
      organizationId: session.user.organizationId,
      schemaId: schemaId
    },
    orderBy: { createdAt: 'desc' }
  })

  // Basic CSV generation
  // In a real app, use a library like 'fast-csv' or 'papaparse'
  // For now, manual string construction for simplicity
  
  if (records.length === 0) {
    return new NextResponse("No records found", { status: 404 })
  }

  // Flatten JSON data
  const headers = ["ID", "Status", "Created At", ...Object.keys(records[0].dataJson as object)]
  const csvRows = [headers.join(",")]

  for (const record of records) {
    const data = record.dataJson as any
    const row = [
      record.id,
      record.status,
      record.createdAt.toISOString(),
      ...Object.values(data).map(v => `"${v}"`) // Basic escaping
    ]
    csvRows.push(row.join(","))
  }

  const csvContent = csvRows.join("\n")

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="export-${schemaId}.csv"`
    }
  })
}
