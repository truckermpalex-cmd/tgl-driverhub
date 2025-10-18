import { getSession } from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const client = await clientPromise;
    const db = client.db();
    const jobs = db.collection('jobs');
    const userId = session.user.id;
    const latest = await jobs.find({ driverId: userId }).sort({ createdAt: -1 }).limit(1).toArray();
    return res.status(200).json({ job: latest[0] || null });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
