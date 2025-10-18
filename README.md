TGL DriverHub - Trans Global Logistics UK
=========================================

Overview
--------
This project is a ready-to-deploy Next.js app with authentication (Discord, Steam, Email via SendGrid),
a blurred dark login screen, a protected /home dashboard, and a TrackSim webhook endpoint.

Setup
-----
1. Copy the project into your GitHub repository or unzip and run locally.
2. Install dependencies:
   npm install
   (If you hit peer dependency errors, run: npm install --legacy-peer-deps)

3. Environment variables: set these in Vercel or a local .env.local (see .env.example)
   - NEXTAUTH_URL (e.g., https://transgloballogistics.uk)
   - NEXTAUTH_SECRET
   - MONGODB_URI
   - DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
   - STEAM_API_KEY
   - EMAIL_SERVER_... (SendGrid settings)

4. Deploy on Vercel and ensure NEXTAUTH_URL matches your domain.

How Steam login works
---------------------
- The app uses passport-steam to perform OpenID login with Steam.
- After Steam authentication the return route upserts a user and account in the MongoDB 'users' and 'accounts' collections.
- The return route also creates a NextAuth session document and sets the 'next-auth.session-token' cookie so users are signed in and redirected to /home.

TrackSim webhook
----------------
Endpoint: POST /api/webhooks/tracksim
This is a stub — it logs incoming payloads. You should add verification using a shared secret.

Notes & Troubleshooting
-----------------------
- If providers do not appear on the signin page, make sure the corresponding environment variables are present in Vercel and then redeploy.
- For SendGrid, use username 'apikey' and your generated API key as password.
- If you prefer not to use passport for Steam, I can convert to an openid-client based NextAuth custom provider.

