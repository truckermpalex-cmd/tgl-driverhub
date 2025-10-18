TGL DriverHub — Final Package
=============================

This final package is ready for deployment on Vercel with NextAuth (Discord, Email via SendGrid, Steam OpenID),
MongoDB integration, TrackSim webhook verification, and admin UI.

Deployment checklist:
1. Push the project to GitHub.
2. In Vercel set environment variables from .env.example.
3. Set Install Command to: npm install --legacy-peer-deps (if you see dependency errors).
4. Deploy and test:
   - /auth/signin shows Discord, Email, and Steam buttons
   - /home is protected and shows latest TrackSim job for logged-in driver
   - POST to /api/webhooks/tracksim with header X-TrackSim-Secret and JSON body to create jobs
