import { SignInForm } from "@/components/forms/auth/sign-in-form";
import Link from "next/link";

export default function SignIpPage() {
  return (
    <section className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md text-center">
      <div className="text-start">
        <h1 className="text-2xl font-bold text-dark">Bem vindo</h1>
        <p className="text-muted">
          Entre utilizando seu email e senha previamente cadastrados
        </p>
      </div>
      <SignInForm />
      <p>
        Não tem uma conta?{" "}
        <Link href="/sign-up" className="text-primary">
          Cadastre-se aqui!
        </Link>
      </p>
    </section>
  );
}
