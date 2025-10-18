import Layout from '../components/Layout'
import Image from 'next/image'

export default function HomePage(){
  return (
    <Layout>
      <div className="relative h-screen w-full">
        <Image src="/Banner.png" alt="Banner" fill className="object-cover brightness-75"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl font-bold mb-4">Trans Global Logistics UK</h1>
            <p className="text-lg max-w-2xl mx-auto">Global trucking all around the world — DriverHub and community tools for ETS2 TruckersMP.</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
