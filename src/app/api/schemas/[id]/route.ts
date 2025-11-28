import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const schema = await prisma.fieldSchema.findUnique({
      where: {
        id: params.id
      }
    })

    if (!schema) {
      return new NextResponse("Schema not found", { status: 404 })
    }

    // Only allow deletion if it belongs to the user's organization (or if super admin, logic could be added)
    if (schema.organizationId !== session.user.organizationId && session.user.role !== "SUPER_ADMIN") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await prisma.fieldSchema.delete({
      where: {
        id: params.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[SCHEMA_DELETE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, jsonSchema } = body

    if (!name && !jsonSchema) {
      return new NextResponse("Missing data", { status: 400 })
    }

    const schema = await prisma.fieldSchema.findUnique({
      where: {
        id: params.id
      }
    })

    if (!schema) {
      return new NextResponse("Schema not found", { status: 404 })
    }

    if (schema.organizationId !== session.user.organizationId) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    let parsedJson
    if (jsonSchema) {
        try {
            parsedJson = typeof jsonSchema === 'string' ? JSON.parse(jsonSchema) : jsonSchema
        } catch (e) {
            return new NextResponse("Invalid JSON", { status: 400 })
        }
    }

    const updatedSchema = await prisma.fieldSchema.update({
      where: {
        id: params.id
      },
      data: {
        name: name || undefined,
        jsonSchema: parsedJson || undefined
      }
    })

    return NextResponse.json(updatedSchema)
  } catch (error) {
    console.error("[SCHEMA_UPDATE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
