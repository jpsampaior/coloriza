import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Bell, Box, Calculator, Clock, FileText, Palette } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Gerenciamento de Estoque",
    description:
      "Monitore e controle o estoque de tintas em tempo real, evitando desperdícios e falta de material.",
    Icon: Box,
  },
  {
    name: "Cálculo Preciso",
    description:
      "Realize cálculos precisos de quantidade de tinta necessária para qualquer superfície.",
    Icon: Calculator,
  },
  {
    name: "Relatórios Detalhados",
    description:
      "Gera relatórios completos de consumo e uso para análise e planejamento eficaz.",
    Icon: FileText,
  },
  {
    name: "Alertas Inteligentes",
    description:
      "Receba notificações sobre níveis baixos de tinta e datas de validade próximas.",
    Icon: Bell,
  },
  {
    name: "Histórico de Projetos",
    description:
      "Acompanhe o histórico de projetos com dados de consumo e informações personalizadas.",
    Icon: Clock,
  },
  {
    name: "Personalização de Cores",
    description:
      "Crie e salve paletas de cores personalizadas para reutilização em futuros projetos.",
    Icon: Palette,
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tight text-slate-800">
            Precisão na medida,{" "}
            <span className="text-primary">economia na pintura.</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-slate-600">
            Bem-vindo à Coloriza! Transformamos a gestão de tintas com precisão
            e economia, ajudando você a alcançar resultados incríveis em cada
            projeto.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <Link href="/sobre" className={buttonVariants()}>
              Quero fazer parte!
            </Link>
            <Button variant="ghost">Saiba mais &rarr;</Button>
          </div>
        </div>
        {/* TODO: List functionalities*/}
      </MaxWidthWrapper>
      <section className="border-t border-slate-200 bg-slate-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-5">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-lext lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-sky-100 text-primary">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-slate-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
