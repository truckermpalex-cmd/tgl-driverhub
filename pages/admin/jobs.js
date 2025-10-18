import { getSession } from 'next-auth/react';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url)=>fetch(url).then(r=>r.json());

export default function AdminJobs({session}) {
  const { data } = useSWR('/api/admin/jobs', fetcher);
  const jobs = data?.jobs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071226] to-[#042033] text-white p-8">
      <Head><title>Admin — Jobs</title></Head>
      <h1 className="text-2xl font-bold mb-4">Recent TrackSim Jobs</h1>
      <div className="space-y-4">
        {jobs.map(j => (
          <div key={j.jobId} className="p-4 bg-gray-900/60 rounded-lg card-glass">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Job {j.jobId}</div>
                <div className="text-sm text-gray-300">{j.driverName || 'Unknown driver'}</div>
                <div className="text-sm">{j.cargo} — {j.distance} km — £{j.income}</div>
              </div>
              <div className="text-sm">{new Date(j.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <div className="text-gray-400">No jobs found</div>}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  const userEmail = (session.user && session.user.email || '').toLowerCase();
  if (!admins.includes(userEmail)) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }
  return { props: { session } };
}
