import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Palette } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

export function HeroHeader() {
  return (
    <header className="bg-white w-full border-b border-slate-200">
      <MaxWidthWrapper className="max-w-8/12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-coloriza.png"
              alt="Coloriza"
              width={42}
              height={42}
            />
            <span className="text-xl font-bold text-primary">Coloriza</span>
          </Link>
          <div>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Entrar
            </Link>
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "ghost" })}
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
