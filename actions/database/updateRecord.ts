"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function updateRecord(
  model: string,
  id: string,
  data: Record<string, any>
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!(model in db)) {
    throw new Error("Invalid model name");
  }

  try {
    const updatedRecord = await (db as any)[model].update({
      where: { id },
      data,
    });

    return { success: true, data: updatedRecord };
  } catch (error: any) {
    throw new Error(`Failed to update record in ${model}`);
  }
}
