"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { dbModelSchemas } from "@/lib/validations/schemas";

const allowedModels = Object.keys(dbModelSchemas);

export async function deleteRecord(model: string, id: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!allowedModels.includes(model)) {
    throw new Error("Invalid model name");
  }

  try {
    const deletedRecord = await (db as any)[model].delete({
      where: { id },
    });

    return { success: true, data: deletedRecord };
  } catch (error: any) {
    console.error("Erro ao deletar registro:", error);
    throw new Error("Failed to delete record");
  }
}
