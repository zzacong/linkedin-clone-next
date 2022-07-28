import type { NextAuthOptions } from 'next-auth'

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '$lib/config/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
  },

  debug: process.env.NODE_ENV === 'production',

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      return { ...token, uid: token.sub }
    },
    async session({ session, user, token }) {
      if (token.sub) {
        return { ...session, user: { ...session.user, uid: token.sub } }
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
