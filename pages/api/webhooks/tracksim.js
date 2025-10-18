/**
 * TrackSim webhook handler
 * Expects header: X-TrackSim-Secret: <secret>
 * Expects JSON payload describing a job. Example payload fields:
 *  - jobId, steamId, driverEmail, distance, cargo, income, status
 *
 * This handler will try to associate incoming jobs to a user:
 * 1) If steamId provided, find accounts collection where provider='steam' and providerAccountId = steamId
 * 2) If driverEmail provided, try to find user by email
 * 3) Otherwise leave driverId null
 *
 * Inserts into 'jobs' collection.
 */

import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = req.headers['x-tracksim-secret'] || req.headers['x-tracksim-token'];
  if (!secret || secret !== process.env.TRACKSIM_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = req.body;
  if (!payload || !payload.jobId) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    let driverId = null;
    let driverName = payload.driverName || null;

    if (payload.steamId) {
      const accounts = db.collection('accounts');
      const acc = await accounts.findOne({ provider: 'steam', providerAccountId: String(payload.steamId) });
      if (acc) {
        driverId = acc.userId;
      }
    }

    if (!driverId && payload.driverEmail) {
      const users = db.collection('users');
      const u = await users.findOne({ email: payload.driverEmail });
      if (u) driverId = u._id;
    }

    const jobs = db.collection('jobs');
    const jobDoc = {
      jobId: payload.jobId,
      driverId: driverId,
      driverName: driverName,
      steamId: payload.steamId || null,
      distance: payload.distance || null,
      cargo: payload.cargo || null,
      income: payload.income || null,
      status: payload.status || null,
      raw: payload,
      createdAt: new Date()
    };
    await jobs.insertOne(jobDoc);

    return res.status(200).json({ ok: true, jobId: payload.jobId });
  } catch (e) {
    console.error('Webhook error', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
