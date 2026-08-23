"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Invalid email or password." };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { error: "Invalid email or password." };
    }

    const isValid = await verifyPassword(password, admin.passwordHash);

    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    await createSession(admin.id);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred." };
  }

  // Redirect outside try-catch to avoid swallowing NEXT_REDIRECT error
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
