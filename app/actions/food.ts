"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { join } from "path";

const prisma = new PrismaClient();

export async function createFoodItem(formData: FormData) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("You must be signed in to list a food item.");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    // Handle File Upload
    const file = formData.get("image") as File;
    if (!file || file.size === 0) {
        throw new Error("No image uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    const path = join(uploadDir, filename);

    try {
        const { mkdir } = require("fs/promises");
        await mkdir(uploadDir, { recursive: true });
        await writeFile(path, buffer);
    } catch (error) {
        console.error("Upload error:", error);
    }

    const imageUrl = `/uploads/${filename}`;

    // Ensure User exists (MVP Logic)
    await prisma.user.upsert({
        where: { clerkId: userId },
        update: {},
        create: {
            clerkId: userId,
            email: "placeholder@email.com",
            name: "Seller",
        }
    });


    await prisma.foodItem.create({
        data: {
            title,
            description,
            price,
            imageUrl,
            chef: {
                connect: { clerkId: userId }
            }
        },
    });

    revalidatePath("/");
    redirect("/");
}
