"use server";

import { prisma } from "@/lib/prisma";

export async function submitWish(formData: FormData) {
  try {
    const rawName = formData.get("name");
    const rawMessage = formData.get("message");
    const rawRelationship = formData.get("relationship");

    if (typeof rawName !== "string" || typeof rawMessage !== "string") {
      return { error: "Invalid form data." };
    }

    const name = rawName.trim();
    const message = rawMessage.trim();
    const relationship = typeof rawRelationship === "string" ? rawRelationship.trim() : null;

    if (name.length === 0) {
      return { error: "Name is required." };
    }

    if (message.length === 0) {
      return { error: "Message is required." };
    }

    if (name.length > 100) {
      return { error: "Name is too long." };
    }

    if (message.length > 1000) {
      return { error: "Message is too long." };
    }

    if (relationship && relationship.length > 100) {
      return { error: "Relationship is too long." };
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        message,
        relationship: relationship || null,
        status: "PENDING", // Always PENDING for new submissions
      },
    });

    // Send email notification safely
    try {
      const { sendAdminNotification, buildWishEmailHtml } = await import("@/lib/email");
      const html = buildWishEmailHtml(wish.name, wish.relationship, wish.message, wish.createdAt);
      await sendAdminNotification("New Wish Awaiting Approval — The Essumans", html);
    } catch (emailError) {
      console.error("Failed to send wish notification email:", emailError);
    }

    return { success: true };
  } catch (error) {
    console.error("Error submitting wish:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function getApprovedWishes(skip: number, take: number) {
  return prisma.wish.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    skip,
    take,
    select: {
      id: true,
      name: true,
      message: true,
      relationship: true,
    }
  });
}
