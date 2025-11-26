"use server"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function createOrganization(formData: FormData) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const name = formData.get("name") as string
  
  if (!name) {
    return { error: "Name is required" }
  }

  try {
    await prisma.organization.create({
      data: {
        name,
        ownerId: session.user.id,
        users: {
          connect: {
            id: session.user.id
          }
        }
      }
    })

    revalidatePath("/organizations")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to create organization" }
  }
}
