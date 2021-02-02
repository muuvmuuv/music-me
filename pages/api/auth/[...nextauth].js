import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

import { isDevelopment } from '../../../lib/environment'

const prisma = new PrismaClient()

const options = {
  debug: isDevelopment,
  secret: process.env.APP_SECRET,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  providers: [
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
  ],
  pages: {
    newUser: '/',
  },
}

export default (request, response) => NextAuth(request, response, options)
