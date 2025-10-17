# Trans Global Logistics UK — DriverHub (Ready for Vercel)

This is a minimal Next.js starter for Trans Global Logistics UK DriverHub.
It's configured for Vercel deployment and uses MongoDB Atlas for storage.

## Quick steps to deploy (summary)
1. Create accounts:
   - Vercel (https://vercel.com)
   - MongoDB Atlas (https://cloud.mongodb.com)
   - Discord Developer App (https://discord.com/developers/applications)
   - Steam Web API Key (https://steamcommunity.com/dev/apikey)
2. Copy `.env.template` -> `.env.local` and fill values.
3. Push this repo to GitHub or upload the zip to Vercel.
4. On Vercel: set environment variables (same as .env.local) and deploy.
5. Configure OAuth redirect URIs in Discord and Steam to:
   - https://transgloballogistics.uk/api/auth/callback/discord
   - Steam requires OpenID setup; see notes below.
6. In TrackSim, configure webhook to POST to:
   - https://transgloballogistics.uk/api/tracksim/webhook

## Notes
- Steam OpenID requires a custom flow; this starter includes NextAuth config with a placeholder and instructions.
- Discord webhook: add your webhook URL to the DISCORD_WEBHOOK_URL env var to enable delivery notifications.
