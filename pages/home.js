import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url)=>fetch(url).then(r=>r.json());

export default function Home() {
  const { data: session } = useSession();
  const { data } = useSWR(session ? '/api/jobs/mine' : null, fetcher);
  const job = data?.job;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#071226] to-[#042033] text-white">
      <Head><title>Home — Trans Global Logistics UK</title></Head>
      <div className="max-w-2xl w-full p-8 rounded-2xl card-glass">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name || 'Driver'}</h1>
        <p className="text-gray-300 mb-4">Account details:</p>
        <ul className="text-gray-200 space-y-2 mb-6">
          <li><strong>Discord name:</strong> {session?.user?.name || '—'}</li>
          <li><strong>Steam ID:</strong> {session?.user?.steamid || '—'}</li>
          <li><strong>Email:</strong> {session?.user?.email || '—'}</li>
        </ul>

        <div>
          <h2 className="text-xl font-semibold mb-2">Latest TrackSim job</h2>
          {job ? (
            <div className="p-4 bg-gray-900/60 rounded-lg card-glass">
              <div className="font-semibold">Job {job.jobId}</div>
              <div className="text-sm">{job.cargo} — {job.distance} km — £{job.income}</div>
              <div className="text-xs text-gray-300 mt-2">Status: {job.status}</div>
            </div>
          ) : (
            <div className="text-gray-400">No recent jobs</div>
          )}
        </div>
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
