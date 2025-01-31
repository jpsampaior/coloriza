import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloriza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="pt-BR" className="h-full">
        <body
          className={`relative h-full font-sans antialiased ${inter.className}`}
        >
          <main className="flex w-full">
            <Sidebar />
            <div className="flex-grow flex-1">{children}</div>
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
