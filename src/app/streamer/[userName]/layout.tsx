'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function StreamerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const query = usePathname().split('/');
  return(
    <main className='xl:mx-[400px] lg:mx-[200px] md:mx-[100px] sm:mx-[20px]'>
      <nav className='min-h-12 flex items-center gap-x-4'>
        @{query[2]}
        <Link href={`/streamer/${query[2]}`}>Links</Link>
        <Link href={`/streamer/${query[2]}/commands`}>Comandos</Link>
      </nav>
      {children}
    </main>
  )
}