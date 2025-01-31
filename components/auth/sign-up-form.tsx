"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Lock, Mail, Shield, User } from "lucide-react";
import { signUpSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "../forms/custom-form-field";
import { Button } from "../ui/button";
import { register } from "@/actions/register";

export function SignUpForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

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
    setSuccess(undefined);

    startTransition(() => {
      register(data).then(({ error, success }) => {
        setError(error);
        setSuccess(success);
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
            icon={
              <User size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="email"
            type="email"
            placeholder="E-mail"
            control={form.control}
            icon={
              <Mail size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="accessCode"
            placeholder="Código de Acesso"
            control={form.control}
            icon={
              <Shield
                size={20}
                className="bg-dark-400 text-zinc-300 h-11 ml-3"
              />
            }
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            type="password"
            placeholder="Senha"
            control={form.control}
            icon={
              <Lock size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
            disabled={isPending}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            control={form.control}
            icon={
              <Lock size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
            disabled={isPending}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}
