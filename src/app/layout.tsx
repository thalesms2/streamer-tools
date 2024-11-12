import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/components/nav";
import { validateSession,  } from "@/lib/session";
import { logout } from '@/actions/auth';
import { montserrat } from "@/lib/fonts";

import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Streamer Tools",
  description: "Ferramentas para streamers",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <main className="xl:mx-[400px] lg:mx-[200px] md:mx-[100px] sm:mx-[20px]">
          <Nav validateSession={validateSession} logoutAction={logout} />
          {children}
          <SpeedInsights />
          <ToastContainer theme="dark" position="bottom-right" closeOnClick />
        </main>
      </body>
    </html>
  );
}
