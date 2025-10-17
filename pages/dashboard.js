import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Dashboard(){
  const { data: session } = useSession()
  const { data, error } = useSWR(session ? '/api/driver/stats' : null, fetcher)

  if (!session) return <p style={{padding:20}}>Please sign in</p>
  if (error) return <p style={{padding:20}}>Error loading</p>
  if (!data) return <p style={{padding:20}}>Loading...</p>

  return (
    <div style={{maxWidth:900, margin:'2rem auto', fontFamily:'Arial,Helvetica,sans-serif'}}>
      <h2>Driver Dashboard</h2>
      <p>Driver: {session.user.name}</p>
      <p>Total distance: {data.totalDistance} km</p>
      <p>Deliveries: {data.deliveries}</p>
    </div>
  )
}
