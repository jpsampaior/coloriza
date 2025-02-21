"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  Calendar,
  Droplet,
  Factory,
  Palette,
  RotateCw,
  Type,
} from "lucide-react";
import { paintSchema } from "@/lib/validations/schemas";
import { CustomFormField, FormFieldType } from "./custom-form-field";
import { Button } from "../ui/button";
import { createRecord } from "@/actions/database/createRecord";
import { toast } from "sonner";

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
      name: "",
      color: "",
      manufacturer: "",
      quantity: 0,
      expirationDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof paintSchema>) {
    startTransition(() => {
      toast.promise(createRecord("paint", data), {
        loading: "Criando registro...",
        success: () => {
          return "Tinta criada com sucesso!";
        },
        error: (error) => {
          return `Erro ao criar a tinta: ${error.message}`;
        },
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
            name="name"
            placeholder="Nome"
            label="Nome:"
            control={form.control}
            icon={Type}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="manufacturer"
            placeholder="Fabricante"
            label="Fabricante:"
            control={form.control}
            icon={Factory}
            disabled={isPending}
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="color"
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
            name="quantity"
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
            name="expirationDate"
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
