TGL DriverHub — Steam login with automatic session
-------------------------------------------------

Included files:
- pages/auth/signin.js  => dark Tailwind login page (Discord, Steam, Email)
- pages/api/auth/[...nextauth].js => NextAuth (Discord + Email)
- pages/api/auth/steam/index.js => passport-steam start
- pages/api/auth/steam/return.js => steam return, upserts user + creates NextAuth session and sets cookie, then redirects to /home
- lib/mongodb.js => MongoDB helper
- public/Banner.png, public/Logo.png => included if provided
- package.json includes required dependencies

Environment variables required:
- NEXTAUTH_URL = https://transgloballogistics.uk
- NEXTAUTH_SECRET
- DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
- MONGODB_URI
- STEAM_API_KEY
- EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM

Notes:
- The return route creates a session record in the 'sessions' collection and sets the 'next-auth.session-token' cookie.
- Depending on your NextAuth adapter version, 'sessions' collection naming may differ; this implementation matches NextAuth MongoDBAdapter's sessions collection schema.
- If you prefer a shorter session duration change the expiration calculation in return.js.
- Deploy to Vercel; if you get install errors set Install Command to: npm install --legacy-peer-deps

Deploy steps:
1. Upload to GitHub and push to Vercel.
2. Add the env vars in Vercel.
3. Deploy and visit /auth/signin, click Steam to test.

