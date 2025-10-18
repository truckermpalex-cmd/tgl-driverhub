import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(){ 
  return (
    <nav className="w-full bg-transparent p-4 flex items-center justify-between">
      <Link href="/"><a className="flex items-center"><Image src="/Logo.png" alt="Logo" width={48} height={48}/><span className="ml-3 text-white font-bold">TransGlobal</span></a></Link>
      <div>
        <Link href="/auth/signin"><a className="text-sm text-white">Sign in</a></Link>
      </div>
    </nav>
  )
}
