import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import EmailProvider from 'next-auth/providers/email'
import clientPromise from '../../../lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || 'smtp.sendgrid.net',
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async session({ session, user }){
      session.user.id = user.id
      session.user.steamid = user.steamid || null
      session.user.isAdmin = (process.env.ADMIN_EMAILS || '').split(',').includes(user.email);
      return session
    }
  }
})
