import { SignUpForm } from "@/components/auth/sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md text-center">
      <div className="text-start">
        <h1 className="text-2xl font-bold text-dark">Cadastre-se</h1>
        <p className="text-muted">
          Cadastre-se utilizando o código de acesso compartilhado pelo
          fornecedor
        </p>
      </div>
      <SignUpForm />
      <p>
        Já tem uma conta?{" "}
        <Link href="/sign-in" className="text-primary">
          Faça seu login aqui!
        </Link>
      </p>
    </section>
  );
}
