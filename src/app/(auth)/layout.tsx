import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { HeroHeader } from "@/components/hero-header/hero-header";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloriza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`relative h-full font-sans antialiased bg-sky-100 ${inter.className}`}
      >
        <Image
          src="/logo-coloriza.png"
          alt="Coloriza"
          width={64}
          height={64}
          className="absolute top-4 left-4 z-50"
        />
        <main className="flex items-center h-full">{children}</main>
      </body>
    </html>
  );
}
