"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { dbModelSchemas } from "@/lib/validations/schemas";
import { Paint } from "@prisma/client";

const allowedModels = Object.keys(dbModelSchemas);

export async function fetchRecords(model: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!allowedModels.includes(model)) {
    throw new Error("Invalid model name");
  }

  try {
    const records = await (db as any)[model].findMany();

    const recordsWithDisplayId = records.map(
      (record: Paint, index: number) => ({
        ...record,
        displayId: index + 1,
      })
    );

    return { success: true, data: recordsWithDisplayId };
  } catch (error: any) {
    throw new Error("Failed to fetch records");
  }
}
