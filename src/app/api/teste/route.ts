import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const dbCommandsReturn = await prisma.commands.deleteMany();
  const dbSociaisReturn = await prisma.social.deleteMany();
  return NextResponse.json({
    dbCommandsReturn,
    dbSociaisReturn
  });
}
//api/streamer?id=streamerId&secret=umachavealeatoria&commands=todososcomandos
