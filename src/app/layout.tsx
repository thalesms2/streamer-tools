import type { Metadata } from "next";
import "./globals.css";
import { Inter, Ubuntu, Roboto, Open_Sans, Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Streamer Tools",
  description: "Ferramentas para streamers",
};

const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
  display: "swap",
});

const ubuntu = Ubuntu({
  variable: "--font-family",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-family",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-family",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {children}
        <SpeedInsights />
        <ToastContainer theme="dark" position="bottom-right" closeOnClick />
      </body>
    </html>
  );
}
