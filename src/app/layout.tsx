import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: "Streamer Tools",
  description: "Ferramentas para streamers",
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
