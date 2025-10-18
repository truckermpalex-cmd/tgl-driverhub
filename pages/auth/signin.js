import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Login | Trans Global Logistics UK</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[url('/Banner.png')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-lg"></div>
        <motion.div
          className="z-10 bg-gray-900/60 p-10 rounded-2xl shadow-2xl text-center max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/Logo.png" alt="Logo" className="mx-auto w-28 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to Trans Global Logistics UK
          </h1>
          <p className="text-gray-300 mb-8">
            Sign in to continue to your dashboard
          </p>

          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name} className="mb-3">
                <button
                  onClick={() => signIn(provider.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl w-full transition-all"
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
        </motion.div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return { props: { providers } };
}
