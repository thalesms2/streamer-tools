import prisma from "@/lib/prisma";
import Link from "next/link";
import { IStreamer } from "@/types/streamer";
import { ISocial } from "@/types/social";
import { link, title } from "@/components/style/links";

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
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
              className={link[streamer.theme]}
            >
              <span className={title[streamer.theme]}>{capitalize(social.title)}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
