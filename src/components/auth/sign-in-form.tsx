"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Lock, Mail, Shield, User } from "lucide-react";
import { signInSchema, signUpSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "../forms/custom-form-field";
import { Button } from "../ui/button";

export function SignInForm() {
  const [mounted, setMounted] = useState(false);

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
    console.log(data);
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
            icon={
              <Lock size={20} className="bg-dark-400 text-zinc-300 h-11 ml-3" />
            }
          />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
