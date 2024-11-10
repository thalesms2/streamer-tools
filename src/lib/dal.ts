import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/session";
import prisma from "@/lib/prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  try {
    const user = await prisma.streamer.findMany({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
