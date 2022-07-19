import type { PrismaClient } from '@prisma/client'
import type { DefaultSession } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

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

declare module 'next/server' {
  interface NextRequest {
    nextauth?: {
      token: JWT
    }
  }
}
