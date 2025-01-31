"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Lock, Mail, RotateCw, Shield, User } from "lucide-react";
import { signUpSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "../forms/custom-form-field";
import { Button } from "../ui/button";
import { register } from "@/actions/register";

export function SignUpForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      accessCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setError(undefined);

    startTransition(() => {
      register(data).then((response) => {
        if (response && "error" in response) {
          setError(response.error);
        }
      });
    });
  }

  if (!mounted) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-start"
      >
        <div className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="fullName"
            placeholder="Nome Completo"
            control={form.control}
            icon={User}
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="email"
            type="email"
            placeholder="E-mail"
            control={form.control}
            icon={Mail}
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="accessCode"
            placeholder="Código de Acesso"
            control={form.control}
            icon={Shield}
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            type="password"
            placeholder="Senha"
            control={form.control}
            icon={Lock}
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            control={form.control}
            icon={Lock}
            disabled={isPending}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
}
