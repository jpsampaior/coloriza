"use server";

import * as z from "zod";
import { signUpSchema } from "@/lib/validations/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }

  const { email, password, fullName, accessCode } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email já está em uso!" };
  }

  let role;

  switch (accessCode) {
    case process.env.ADMIN_ACCESS_CODE:
      role = UserRole.ADMIN;
      break;
    case process.env.USER_ACCESS_CODE:
      role = UserRole.USER;
      break;
    default:
      return { error: "Código de acesso inválido!" };
  }

  await db.user.create({
    data: {
      name: fullName,
      email,
      password: hashedPassword,
      role,
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
