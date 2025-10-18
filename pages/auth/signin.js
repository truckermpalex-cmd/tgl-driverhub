import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Sign in — Trans Global Logistics UK</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(180deg,#071226,#042033)'}}>
        <img src="/Banner.png" alt="banner" className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-md"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>

        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.9}} className="relative z-20 w-full max-w-lg mx-4 p-8 rounded-2xl card-glass">
          <div className="flex flex-col items-center">
            <img src="/Logo.png" alt="logo" className="w-36 h-36 object-contain mb-4"/>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Trans Global Logistics UK — DriverHub</h1>
            <p className="text-sm text-slate-700 mb-6 text-center">Sign in to access driver stats, leaderboards and VTC tools.</p>

            <div className="w-full space-y-3">
              {providers && Object.values(providers).map((p) => (
                <button key={p.name} onClick={() => signIn(p.id)} className={`w-full py-3 rounded-lg text-white font-semibold ${btnClassFor(p.name)}`}>
                  Sign in with {p.name}
                </button>
              ))}
            </div>

            <div className="w-full my-4 text-center text-slate-600">or sign in with email</div>

            <form className="w-full" onSubmit={(e)=>{e.preventDefault(); const email = e.target.email.value; if(email) signIn('email',{email,callbackUrl:'/home'});}}>
              <input name="email" type="email" placeholder="you@example.com" required className="w-full p-3 rounded-lg mb-3 border border-slate-200"/>
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold">Send magic link</button>
            </form>
          </div>
          <p className="mt-4 text-xs text-slate-600 text-center">By continuing you agree to the VTC rules. Need help? Join our Discord.</p>
        </motion.div>
      </div>
    </>
  );
}

function btnClassFor(name){
  if(!name) return 'bg-slate-700';
  const n = name.toLowerCase();
  if(n.includes('discord')) return 'bg-[#5865F2] hover:bg-[#4752c4]';
  if(n.includes('steam')) return 'bg-[#0b2831] hover:bg-[#08161a]';
  return 'bg-[#2563eb] hover:bg-[#1e4db7]';
}

export async function getServerSideProps(){
  const providers = await getProviders();
  return { props: { providers: providers ?? {} } };
}
