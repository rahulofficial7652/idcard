import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const schemaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jsonSchema: z.string().min(1, "JSON Schema is required"), // Receiving as string, will parse
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.role === "USER") {
       return new NextResponse("Forbidden", { status: 403 })
    }

    const body = await req.json()
    const { name, jsonSchema } = schemaSchema.parse(body)

    let parsedJson
    try {
      parsedJson = JSON.parse(jsonSchema)
    } catch (e) {
      return new NextResponse("Invalid JSON format", { status: 400 })
    }

    const schema = await prisma.fieldSchema.create({
      data: {
        name,
        jsonSchema: parsedJson,
        organizationId: session.user.organizationId,
        createdBy: session.user.id,
      }
    })

    return NextResponse.json(schema)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }
    console.error("[SCHEMA_CREATE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
