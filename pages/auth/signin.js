import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Trans Global Logistics UK — Sign In</title>
      </Head>
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-6 rounded-2xl bg-gray-900/70 p-10 shadow-2xl backdrop-blur-md"
        >
          <Image
            src="/Logo.png"
            alt="Trans Global Logistics Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold tracking-wide">
            Welcome to Trans Global Logistics UK
          </h1>
          <p className="text-gray-400">Sign in to continue to your dashboard</p>

          <div className="mt-6 flex flex-col gap-3 w-full">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 transition-all"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
