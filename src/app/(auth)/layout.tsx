import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

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
        <Link href="/">
          <Image
            src="/logo-coloriza.png"
            alt="Coloriza"
            width={64}
            height={64}
            className="absolute top-4 left-4 z-50"
          />
        </Link>
        <main className="flex items-center h-full">{children}</main>
      </body>
    </html>
  );
}
