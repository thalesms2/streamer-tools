import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Nav from "@/app/nav";
import { validateSession,  } from "@/lib/session";
import { logout } from '@/hooks/auth';
import { montserrat } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"

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
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="xl:mx-[400px] lg:mx-[200px] md:mx-[100px] sm:mx-[20px]">
            <Nav validateSession={validateSession} logoutAction={logout} />
            {children}
            <SpeedInsights />
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
