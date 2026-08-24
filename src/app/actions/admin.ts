"use server";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

// WISH ACTIONS

export async function restoreWish(id: string) {
  await requireAdmin();
  await prisma.wish.update({
    where: { id },
    data: { status: "APPROVED", approvedAt: new Date() },
  });
  revalidatePath("/admin/wishes");
  revalidatePath("/wishes");
  revalidatePath("/");
}

export async function softDeleteWish(id: string) {
  await requireAdmin();
  await prisma.wish.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/wishes");
  revalidatePath("/wishes");
  revalidatePath("/");
}

export async function hardDeleteWish(id: string) {
  await requireAdmin();
  await prisma.wish.delete({
    where: { id },
  });
  revalidatePath("/admin/wishes");
  revalidatePath("/wishes");
  revalidatePath("/");
}


// MEMORY ACTIONS

export async function restoreMemory(id: string) {
  await requireAdmin();
  await prisma.memory.update({
    where: { id },
    data: { status: "APPROVED", approvedAt: new Date() },
  });
  revalidatePath("/admin/memories");
  revalidatePath("/memories");
  revalidatePath("/");
}

export async function softDeleteMemory(id: string) {
  await requireAdmin();
  await prisma.memory.update({
    where: { id },
    data: { status: "REJECTED" },
  });
  revalidatePath("/admin/memories");
  revalidatePath("/memories");
  revalidatePath("/");
}

export async function hardDeleteMemory(id: string) {
  await requireAdmin();
  
  // Fetch memory first to see if it has a photo
  const memory = await prisma.memory.findUnique({
    where: { id },
    select: { photoUrl: true }
  });

  if (memory?.photoUrl) {
    // Extract filename from URL (assuming standard Supabase storage URL format)
    const urlParts = memory.photoUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    if (filename) {
      const { error } = await supabase.storage.from("memories").remove([filename]);
      if (error) {
        console.error("Failed to delete image from Supabase:", error);
        // Continue to delete DB record even if image deletion fails, 
        // to avoid being stuck in a broken state, or throw if strictness is required.
      }
    }
  }

  await prisma.memory.delete({
    where: { id },
  });
  
  revalidatePath("/admin/memories");
  revalidatePath("/memories");
  revalidatePath("/");
}

// QUOTE ACTIONS

export async function createQuote(data: { quote: string; submittedBy: string; context?: string }) {
  await requireAdmin();
  await prisma.kwabenaQuote.create({
    data: {
      quote: data.quote,
      submittedBy: data.submittedBy,
      context: data.context || null,
      status: "APPROVED",
      approvedAt: new Date(),
    }
  });
  revalidatePath("/admin/quotes");
  revalidatePath("/");
}

export async function updateQuote(id: string, data: { quote: string; submittedBy: string; context?: string }) {
  await requireAdmin();
  await prisma.kwabenaQuote.update({
    where: { id },
    data: {
      quote: data.quote,
      submittedBy: data.submittedBy,
      context: data.context || null,
    }
  });
  revalidatePath("/admin/quotes");
  revalidatePath("/");
}

export async function deleteQuote(id: string) {
  await requireAdmin();
  await prisma.kwabenaQuote.delete({ where: { id } });
  revalidatePath("/admin/quotes");
  revalidatePath("/");
}
