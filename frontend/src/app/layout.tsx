import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/ProgressBarProvider";

const Shabnam = localFont({ src: "../../public/fonts/Shabnam.ttf" });

export const metadata: Metadata = {
  title: "Saghfinoo",
  description: "سقفینو، سقفی برای همه",
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
      </body>
    </html>
  );
}
