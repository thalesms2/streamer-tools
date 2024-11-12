import prisma from "@/lib/prisma";
import Link from "next/link";
import { IStreamer } from "@/types/streamer";
import { ISocial } from "@/types/social";
import { style } from "@/lib/streamer-theme";

export default async function StreamerPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const streamer: IStreamer = await prisma.streamer.findUnique({
    where: {
      username: username,
    },
  });
  const sociais: ISocial[] = await prisma.social.findMany({
    where: {
      streamerId: streamer.id,
    },
  });
  return (
    <section>
      <div className="flex flex-col gap-4 justify-center items-center">
        @{streamer.username}
        {sociais.map((social) => {
          return (
            <Link
              href={social.link}
              target="_blank"
              key={social.id}
              className="w-[95vw] md:w-[60vw] rounded lg:w-[500px] py-5 text-center shadow-md shadow-slate-800 transition ease-in-out delay bg-slate-500 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:scale-105 hover:bg-slate-600 duration-100"
            >
              {social.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
