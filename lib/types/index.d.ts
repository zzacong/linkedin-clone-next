import type {
  PrismaClient,
  Post as PrismaPost,
  User as PrismsUser,
} from '@prisma/client'
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

export interface Article {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export interface Post extends PrismaPost {
  author: PrismsUser
  createdAt: string
}
