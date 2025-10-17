import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home(){
  const { data: session } = useSession()
  return (
    <div style={{maxWidth:900, margin:'2rem auto', fontFamily:'Arial,Helvetica,sans-serif'}}>
      <h1>Trans Global Logistics UK — DriverHub</h1>
      {!session ? (
        <>
          <p>Sign in with Discord or Steam to link your TruckersMP profile.</p>
          <button onClick={() => signIn('discord')}>Sign in with Discord</button>
          <button style={{marginLeft:10}} onClick={() => signIn('steam')}>Sign in with Steam</button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <div style={{marginTop:10}}>
            <Link href="/dashboard">Go to Dashboard</Link>
          </div>
        </>
      )}
    </div>
  )
}
