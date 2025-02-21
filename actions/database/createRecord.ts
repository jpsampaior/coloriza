"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { dbModelSchemas } from "@/lib/validations/schemas";

const allowedModels = Object.keys(dbModelSchemas);

import { ZodError } from "zod";

export async function createRecord(model: string, data: Record<string, any>) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!allowedModels.includes(model)) {
    throw new Error("Invalid model name");
  }

  const schema = dbModelSchemas[model as keyof typeof dbModelSchemas];

  const validatedFields = schema.safeParse(data);
  if (!validatedFields.success) {
    throw new ZodError(validatedFields.error.errors); // Lança um erro de validação com a mensagem do Zod
  }

  try {
    const newRecord = await (db as any)[model].create({
      data: validatedFields.data,
    });

    return { success: true, data: newRecord };
  } catch (error: any) {
    if (error instanceof Error) {
      if (error.stack?.includes("Unique constraint failed")) {
        if (error.stack?.includes("color")) {
          throw new Error("Já existe uma tinta com essa cor.");
        }
      }
    }

    throw new Error("Failed to create record");
  }
}
