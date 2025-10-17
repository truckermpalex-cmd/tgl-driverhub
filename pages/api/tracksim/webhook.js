// Minimal TrackSim webhook receiver
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()

  const secret = process.env.TRACKSIM_SECRET || ''
  const provided = req.headers['x-tracksim-signature'] || req.body.secret
  if (secret && provided !== secret) {
    return res.status(403).json({ error: 'invalid signature' })
  }

  const payload = req.body
  try{
    const client = await clientPromise
    const db = client.db()
    await db.collection('deliveries').insertOne({ ...payload, receivedAt: new Date() })

    // Optional: send to Discord if webhook set
    const webhook = process.env.DISCORD_WEBHOOK_URL
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `New delivery logged: ${payload.driver_name || payload.steam_id || 'unknown'} — ${payload.distance_m ? (payload.distance_m/1000).toFixed(1)+' km' : ''}`
          })
        })
      } catch (e) {
        console.error('Discord webhook error', e)
      }
    }

    return res.status(200).json({ ok: true })
  }catch(e){
    console.error(e)
    return res.status(500).json({ error: 'server error' })
  }
}
