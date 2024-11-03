import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")
  const secret = request.nextUrl.searchParams.get("secret")
  const commands = request.nextUrl.searchParams.get("commands")
  if(id == null || secret == null || commands == null)
    return Response.error

  const streamer = await prisma.streamer.findUnique({
    where: {
      id: Number(id)
    }
  })

  if(streamer == null)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  
  if(streamer.secret == secret){
    let command = commands.replaceAll("!", "").split(", ")
    let commandFormated = command.map((x) => {
      return { streamerId: Number(id), command: x }
    })
    if (commandFormated == undefined)
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    const dbFind = await prisma.commands.findMany({
      where: {
        streamerId: Number(id)
      },
      select: {
        streamerId: true,
        command: true,
      },
    })
    const res = commandFormated.filter((x) => !dbFind.some(y => y.command == x.command))
    const dbReturn = await prisma.commands.createManyAndReturn({
      data: res,
    })
    return NextResponse.json({ 
      res,
      dbFind,
      commandFormated,
      dbReturn
    });
  } else {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
//api/streamer?id=streamerId&secret=umachavealeatoria&commands=todososcomandos