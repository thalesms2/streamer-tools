'use client'
import { usePathname } from 'next/navigation'

export default function StreamerPage() {
  const query = usePathname().split('/');
  return (
    <div>
      hello world  {query[2]}
    </div>
  )
}