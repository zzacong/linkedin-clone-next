import type { PrismaClient } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

declare global {
  var prisma: PrismaClient | undefined
}

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      uid?: string | null
    }
  }
}

export {}
