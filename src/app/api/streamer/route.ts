import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const secret = request.headers.get("secret");
  const commands = request.headers.get("commands");
  if (id == null || secret == null || commands == null)
    return new Response("Bad Request", { status: 400 });
  const streamer = await prisma.streamer.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (streamer == null) return new Response("Bad Request", { status: 400 });

  if (streamer.secret == secret) {
    let command = commands.replaceAll("!", "").split(", ");
    let commandFormated = command.map((x) => {
      return { streamerId: Number(id), command: x };
    });
    if (commandFormated == undefined)
      return new Response("Bad Request", { status: 400 });
    const dbFind = await prisma.commands.findMany({
      where: {
        streamerId: Number(id),
      },
      select: {
        streamerId: true,
        command: true,
      },
    });
    const dbDel = await prisma.commands.deleteMany({
      where: {
        streamerId: Number(id),
      }
    })
    const dbReturn = await prisma.commands.createManyAndReturn({
      data: commandFormated,
    });
    revalidatePath(`/streamer/${streamer.username}/commands`);
    return new Response("Comandos inseridos com sucesso!");
  } else {
    return new Response("Bad Request", { status: 400 });
  }
}
//api/streamer?id=streamerId&secret=umachavealeatoria&commands=todososcomandos
