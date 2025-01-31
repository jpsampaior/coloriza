"use client";

import { Box, Clock, Cog, FileText, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";

const perks = [
  {
    name: "Gerenciamento de Estoque",
    link: "painel/estoque",
    Icon: Box,
  },
  {
    name: "Relatórios Detalhados",
    link: "painel/relatorios",
    Icon: FileText,
  },
  {
    name: "Histórico de Projetos",
    link: "painel/projetos",
    Icon: Clock,
  },
  {
    name: "Configurações",
    link: "painel/configuracoes",
    Icon: Cog,
  },
];

export function Sidebar() {
  const user = useCurrentUser();

  function onClick() {
    signOut();
  }

  return (
    <aside className="h-screen sticky top-0 flex flex-col justify-between border-r border-gray-200 bg-white pt-8 sm:p-4 xl:p-6 2xl:w-[355px] max-lg:hidden">
      <div className="space-y-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-coloriza.png"
            alt="Coloriza"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-primary">Colorize</span>
        </Link>
        <nav className="flex flex-col gap-4">
          <ul>
            {perks.map((perk) => (
              <li key={perk.name}>
                <Link
                  href={perk.link}
                  className="text-slate-800 flex gap-3 items-center py-1 md:py-3 2xl:py-4 rounded-lg justify-start w-fit"
                >
                  <perk.Icon className="w-6 h-6" strokeWidth={1} />
                  <span className="font-semibold">{perk.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div className="flex flex-col">
          <span className="font-semibold">{user?.name}</span>
          <p className="text-sm text-slate-600">{user?.email}</p>
        </div>

        <LogOut
          className="w-6 h-6 hover:cursor-pointer"
          strokeWidth={1.25}
          onClick={onClick}
        />
      </div>
    </aside>
  );
}
