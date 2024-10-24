import prisma from '@/lib/prisma'

export default async function Home() {
  const streamer = await prisma.streamer.findMany()
  return (
    <div>

    </div>
  );
}
