"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Calendar, Droplet, Factory, Lock, Mail, Palette, RotateCw, Shield, Type, User } from "lucide-react";
import { paintSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "./custom-form-field";
import { Button } from "../ui/button";

export function PaintForm() {
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof paintSchema>>({
    resolver: zodResolver(paintSchema),
    defaultValues: {
      nome: "",
      fabricante: "",
      cor: "",
      quantidade: 0,
      validade: "",
    },
  });

  async function onSubmit(data: z.infer<typeof paintSchema>) {
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
            name="nome"
            placeholder="Nome"
            label="Nome:"
            control={form.control}
            icon={Type}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="fabricante"
            placeholder="Fabricante"
            label="Fabricante:"
            control={form.control}
            icon={Factory}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="cor"
            placeholder="Cor"
            label="Cor:"
            type="colorHex"
            mask="#******"
            control={form.control}
            icon={Palette}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            label="Quantidade:"
            control={form.control}
            icon={Droplet}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="validade"
            type="date"
            placeholder="Validade"
            label="Validade:"
            control={form.control}
            icon={Calendar}
            disabled={isPending}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Adicionando..." : "Adicionar"}
        </Button>
      </form>
    </Form>
  );
}
