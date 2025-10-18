\
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <>
      <Head><title>Sign in — Trans Global Logistics UK</title></Head>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#071226] to-[#042033]">
        <Image src="/Banner.png" alt="banner" fill className="object-cover opacity-30 blur-lg" style={{zIndex:0}}/>
        <div className="absolute inset-0 bg-black/40" />
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7}} className="relative z-10 w-full max-w-lg mx-4 p-8 rounded-2xl card-glass text-white">
          <div className="flex flex-col items-center">
            <Image src="/Logo.png" alt="logo" width={120} height={120} className="mb-4" />
            <h1 className="text-2xl font-bold mb-1">Trans Global Logistics UK — DriverHub</h1>
            <p className="text-sm text-gray-200 mb-6 text-center">Sign in to access driver stats, leaderboards and VTC tools.</p>

            <div className="w-full space-y-3">
              {providers && Object.values(providers).map((p) => (
                <button key={p.name} onClick={() => signIn(p.id)} className={`w-full py-3 rounded-lg text-white font-semibold ${btnClass(p.name)}`}>
                  Sign in with {p.name}
                </button>
              ))}
            </div>

            <div className="w-full my-4 text-center text-gray-300">or sign in with email</div>

            <form className="w-full" onSubmit={(e)=>{e.preventDefault(); const email = e.target.email.value; if(email) signIn('email',{email,callbackUrl:'/home'});}}>
              <input name="email" type="email" placeholder="you@example.com" required className="w-full p-3 rounded-lg mb-3 border border-gray-700 bg-black/20" />
              <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-black py-3 rounded-lg font-semibold">Send magic link</button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function btnClass(name){
  const n = (name||'').toLowerCase();
  if(n.includes('discord')) return 'bg-[#5865F2] hover:bg-[#4752c4]';
  if(n.includes('steam')) return 'bg-[#0b2831] hover:bg-[#08161a]';
  return 'bg-[#2563eb] hover:bg-[#1e4db7]';
}

export async function getServerSideProps(){
  const providers = await getProviders();
  return { props: { providers: providers ?? {} } };
}
