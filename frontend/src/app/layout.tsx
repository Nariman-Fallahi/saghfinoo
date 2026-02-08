import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

const Shabnam = localFont({ src: "../../public/fonts/Shabnam.ttf" });

export const metadata: Metadata = {
  title: "سقفینو",
  description: "سقفینو، سقفی برای همه",
  icons: {
    icon: "/icons/common/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className={Shabnam.className}>
        <Providers>{children}</Providers>
        <ToastContainer rtl />
        <SpeedInsights />
      </body>
    </html>
  );
}
