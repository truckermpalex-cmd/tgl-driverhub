import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071226] to-[#042033] text-white">
      <Head><title>Home — Trans Global Logistics UK</title></Head>
      <div className="max-w-2xl w-full p-8 rounded-2xl card-glass">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name || 'Driver'}</h1>
        <p className="text-gray-300 mb-4">Account details:</p>
        <ul className="text-gray-200 space-y-2">
          <li><strong>Discord name:</strong> {session?.user?.name || '—'}</li>
          <li><strong>Steam ID:</strong> {session?.user?.steamid || '—'}</li>
          <li><strong>Email:</strong> {session?.user?.email || '—'}</li>
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false
      }
    }
  }
  return { props: { session } };
}
