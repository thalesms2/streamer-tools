"use server";

import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "../lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/settings"];
const publicRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const hasSession = await validateSession();

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    hasSession
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
