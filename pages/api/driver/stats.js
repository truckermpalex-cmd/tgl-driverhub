import clientPromise from '../../../lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function handler(req, res){
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ error: 'not authenticated' })

  const client = await clientPromise
  const db = client.db()
  const deliveries = await db.collection('deliveries').find({ steam_id: session.user.steamid }).toArray()
  const totalDistance = deliveries.reduce((s, d) => s + (d.distance_m || 0), 0) / 1000
  return res.json({ deliveries: deliveries.length, totalDistance: Math.round(totalDistance) })
}
