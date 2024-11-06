import prisma from "@/lib/prisma";
import Link from "next/link";
import { IStreamer } from "@/types/streamer";
import { ISocial } from "@/types/social";

export default async function StreamerPage({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  const { userName } = await params;
  const streamer: IStreamer = await prisma.streamer.findUnique({
    where: {
      userName: userName,
    },
  });
  const sociais: ISocial[] = await prisma.social.findMany({
    where: {
      streamerId: streamer.id,
    },
  });
  return (
    <section>
      @{streamer.userName}
      <div className="flex flex-col gap-2">
        {sociais.map((social) => {
          return (
            <Link href={social.link} target="_blank" key={social.id}>
              {social.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
