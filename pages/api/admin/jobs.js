import { getSession } from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  const userEmail = (session.user && session.user.email || '').toLowerCase();
  if (!admins.includes(userEmail)) return res.status(403).json({ error: 'Forbidden' });

  try {
    const client = await clientPromise;
    const db = client.db();
    const jobs = await db.collection('jobs').find().sort({ createdAt: -1 }).limit(200).toArray();
    return res.status(200).json({ jobs });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
