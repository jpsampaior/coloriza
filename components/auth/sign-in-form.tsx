"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Lock, Mail, Shield, User } from "lucide-react";
import { signInSchema, signUpSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "../forms/custom-form-field";
import { Button } from "../ui/button";
import { login } from "@/actions/login";

export function SignInForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setError(undefined);

    startTransition(() => {
      login(data).then((response) => {
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
            name="email"
            type="email"
            placeholder="E-mail"
            control={form.control}
            disabled={isPending}
            icon={
              <Mail size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            type="password"
            placeholder="Senha"
            control={form.control}
            disabled={isPending}
            icon={
              <Lock size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          Entrar
        </Button>
      </form>
    </Form>
  );
}
