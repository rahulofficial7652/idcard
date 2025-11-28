import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const createTemplateSchema = z.object({
  name: z.string().min(1),
  elements: z.array(z.any()), // Storing the designer elements as JSON
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.organizationId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = createTemplateSchema.parse(json)

    const template = await prisma.template.create({
      data: {
        name: body.name,
        settingsJson: body.elements,
        organizationId: session.user.organizationId,
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 400 })
    }
    console.error("[TEMPLATE_CREATE]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
