import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

const templateSchema = z.object({
  name: z.string().min(2),
  settingsJson: z.record(z.string(), z.any()),
  assets: z.record(z.string(), z.any()).optional()
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.organizationId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const body = templateSchema.parse(json)

    const template = await prisma.template.create({
      data: {
        name: body.name,
        settingsJson: body.settingsJson as any,
        assets: (body.assets || {}) as any,
        organizationId: session.user.organizationId
      }
    })

    return NextResponse.json(template)
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

  const templates = await prisma.template.findMany({
    where: {
      organizationId: session.user.organizationId
    },
    orderBy: { updatedAt: 'desc' }
  })

  return NextResponse.json(templates)
}
