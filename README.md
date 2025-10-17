TGL DriverHub Login (Tailwind + NextAuth)
-----------------------------------------

Files:
- pages/auth/signin.js   => Animated, Tailwind-based login page using Banner.png & Logo.png
- pages/api/auth/[...nextauth].js => NextAuth config (Discord + Email providers)
- lib/mongodb.js => MongoDB client helper (expects MONGODB_URI)
- public/Banner.png and public/Logo.png included

Install & Run:
1. Copy this folder into your Next.js project root (or use as a new project).
2. Add environment variables on Vercel or .env.local:
   - DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
   - NEXTAUTH_SECRET
   - MONGODB_URI
   - EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM
3. Install deps: npm install
4. Run locally: npm run dev
5. Deploy to Vercel and ensure NEXTAUTH_URL is set to your domain.
