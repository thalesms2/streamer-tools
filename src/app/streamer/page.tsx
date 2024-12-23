import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Streamers() {
  const streamers = await prisma.streamer.findMany();
  return (
    <div>
      {streamers.map((streamer) => {
        return (
          <div key={streamer.id}>
            <Link href={`/streamer/${streamer.username}`}>
              {streamer.id} - {streamer.username}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
