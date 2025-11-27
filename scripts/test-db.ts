import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Checking UserRole export...')
    console.log('UserRole:', UserRole)
    
    console.log('Connecting to database...')
    const users = await prisma.user.findMany()
    console.log('Connection successful. User count:', users.length)
  } catch (e: any) {
    console.error('Connection failed message:', e.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()
