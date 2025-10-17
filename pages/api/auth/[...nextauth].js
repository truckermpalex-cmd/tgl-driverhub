import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import clientPromise from '../../../lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

// NOTE: Steam provider is a placeholder. Steam OpenID requires a custom implementation.
export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    // Add Steam/OpenID custom provider in production following README notes.
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }){
      session.user.id = user.id
      // include steamid if present in DB (adapter user object)
      session.user.steamid = user.steamid || null
      return session
    }
  }
})
