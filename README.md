TGL DriverHub — Complete Developer Package (TrackSim integrated)
================================================================

This package includes TrackSim webhook verification and admin UI.

TrackSim webhook
----------------
- Configure TrackSim to POST to:
  https://transgloballogistics.uk/api/webhooks/tracksim
- Set header: X-TrackSim-Secret with the value of TRACKSIM_SECRET in your environment variables
- Payload should include at minimum a 'jobId'. Other helpful fields:
  steamId, driverEmail, driverName, distance, cargo, income, status

How data is stored
------------------
- Incoming jobs are stored in MongoDB 'jobs' collection with fields:
  jobId, driverId, driverName, steamId, distance, cargo, income, status, raw, createdAt
- Driver association tries steamId -> accounts.providerAccountId, else driverEmail -> users.email

Admin access
------------
- Set ADMIN_EMAILS as comma-separated list of admin emails to allow viewing /admin/jobs

Deploy
------
1. Push project to GitHub, import to Vercel.
2. Set environment variables from .env.example in Vercel.
3. Deploy and test: send a POST request with header X-TrackSim-Secret to /api/webhooks/tracksim

