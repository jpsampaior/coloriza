import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Palette } from "lucide-react";
import { buttonVariants } from "../ui/button";

export function HeroHeader() {
  return (
    <header className="bg-white w-full border-b border-slate-200">
      <MaxWidthWrapper className="max-w-8/12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Palette className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary">Colorize</span>
          </Link>
          <div>
            <Link href="/auth" className={buttonVariants({ variant: "ghost" })}>
              Entrar
            </Link>
            <Link href="/auth" className={buttonVariants({ variant: "ghost" })}>
              Cadastre-se
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
