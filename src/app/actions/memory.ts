"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function submitMemory(formData: FormData) {
  let uploadedFilename: string | null = null;

  try {
    const rawName = formData.get("name");
    const rawMemory = formData.get("memory");
    const rawRelationship = formData.get("relationship");
    const photo = formData.get("photo") as File | null;

    if (typeof rawName !== "string" || typeof rawMemory !== "string") {
      return { error: "Invalid form data." };
    }

    const name = rawName.trim();
    const memory = rawMemory.trim();
    const relationship = typeof rawRelationship === "string" ? rawRelationship.trim() : null;

    if (name.length === 0) {
      return { error: "Name is required." };
    }

    if (memory.length === 0) {
      return { error: "Memory is required." };
    }

    if (name.length > 100) {
      return { error: "Name is too long." };
    }

    if (memory.length > 2000) {
      return { error: "Memory is too long." };
    }

    const wordCount = memory.split(/\s+/).filter(Boolean).length;
    if (wordCount > 80) {
      return { error: "Please keep your memory within 80 words." };
    }

    if (relationship && relationship.length > 100) {
      return { error: "Relationship is too long." };
    }

    // Photo validation and upload
    let photoUrl: string | null = null;

    if (photo && photo.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(photo.type)) {
        return { error: "Invalid file type. Please upload a JPG, PNG, or WEBP." };
      }

      if (photo.size > 5 * 1024 * 1024) {
        return { error: "Please choose an image smaller than 5 MB." };
      }

      const ext = photo.name.split('.').pop();
      const filename = `${crypto.randomUUID()}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from("memories")
        .upload(filename, await photo.arrayBuffer(), {
          contentType: photo.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return { error: "Failed to upload photo. Please try again." };
      }

      uploadedFilename = filename; // Save for cleanup in case Prisma fails

      const { data: publicUrlData } = supabase.storage
        .from("memories")
        .getPublicUrl(filename);
        
      photoUrl = publicUrlData.publicUrl;
    }

    // Create DB record
    const newMemory = await prisma.memory.create({
      data: {
        name,
        memory,
        photoUrl,
        relationship: relationship || null,
        status: "PENDING", // Always PENDING for new submissions
      },
    });

    // Send email notification safely
    try {
      const { sendAdminNotification, buildMemoryEmailHtml } = await import("@/lib/email");
      const html = buildMemoryEmailHtml(newMemory.name, newMemory.relationship, newMemory.memory, !!newMemory.photoUrl, newMemory.createdAt);
      await sendAdminNotification("New Memory Awaiting Approval — The Essumans", html);
    } catch (emailError) {
      console.error("Failed to send memory notification email:", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting memory:", error);
    
    // Cleanup orphaned photo if DB creation failed
    if (uploadedFilename) {
      try {
        await supabase.storage.from("memories").remove([uploadedFilename]);
      } catch (cleanupError) {
        console.error("Failed to clean up orphaned image:", cleanupError);
      }
    }
    
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function getApprovedMemories(skip: number, take: number) {
  return prisma.memory.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    skip,
    take,
    select: {
      id: true,
      name: true,
      memory: true,
      relationship: true,
      photoUrl: true,
    }
  });
}
