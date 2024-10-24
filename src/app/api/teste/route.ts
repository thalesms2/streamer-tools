import { NextRequest } from "next/server";
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const dbReturn = await prisma.commands.deleteMany()

  return Response.json({ 
    dbReturn
  });
}
//api/streamer?id=streamerId&secret=umachavealeatoria&commands=todososcomandos