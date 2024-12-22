"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import type { IFormData } from "@/types/login";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

export async function login(data: IFormData) {
  const { username, password } = data;
  try {
    const user = await prisma.streamer.findUnique({
      where: {
        username: username,
      },
    });
    if (user.password === password) {
      await createSession(user.id);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

// export async function signup(data: IFormData) {
//   const { username, password } = data;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await prisma.streamer.create({
//     data: {
//       username: username,
//       password: hashedPassword,
//     },
//   });
//   await createSession(user.id);
//   redirect("/teste");
// }
