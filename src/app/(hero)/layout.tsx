import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { HeroHeader } from "@/components/hero-header/hero-header";  

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
        className={`relative h-full font-sans antialiased ${inter.className}`}
      >
        <main className="relative flex flex-col min-h-screen">
          <HeroHeader />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
