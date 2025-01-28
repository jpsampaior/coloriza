import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coloriza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "John", lastName: "Doe" };

  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`relative h-full font-sans antialiased ${inter.className}`}
      >
        <main className="flex w-full">
          <Sidebar user={loggedIn} />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
