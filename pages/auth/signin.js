import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { motion } from "framer-motion";

export default function SignIn({ providers }) {
  return (
    <>
      <Head>
        <title>Sign In | Trans Global Logistics UK</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <img
              src="/Logo.png"
              alt="Trans Global Logistics UK Logo"
              className="w-28 h-28 mb-4"
            />
            <h1 className="text-3xl font-bold mb-2 text-center">
              Welcome to Trans Global Logistics UK
            </h1>
            <p className="text-gray-400 mb-6 text-center">
              Sign in to continue to your dashboard
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <motion.button
                  key={provider.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => signIn(provider.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    provider.name === "Discord"
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : provider.name === "Steam"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Sign in with {provider.name}
                </motion.button>
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
