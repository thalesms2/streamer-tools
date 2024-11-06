import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const dbReturn = await prisma.commands.deleteMany();

  return NextResponse.json({
    dbReturn,
  });
}
//api/streamer?id=streamerId&secret=umachavealeatoria&commands=todososcomandos
