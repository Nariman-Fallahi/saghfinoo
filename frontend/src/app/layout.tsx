import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/ProgressBarProvider";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import Menu from "@/components/Menu/HeaderMenu/Menu";
import FooterMenu from "@/components/Menu/FooterMenu/FooterMenu";
import Size from "@/components/Size";
import {NextUIProvider} from "@nextui-org/system";

const Shabnam = localFont({ src: "../../public/fonts/Shabnam.ttf" });

export const metadata: Metadata = {
  title: "Saghfinoo",
  description: "سقفینو، سقفی برای همه",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className={Shabnam.className}>
        <ReactQueryProvider>
          <Size />
          <Menu />
          <NextUIProvider>
          <Providers>{children}</Providers>
          </NextUIProvider>
          <FooterMenu />
        </ReactQueryProvider>
        <ToastContainer rtl />
      </body>
    </html>
  );
}
