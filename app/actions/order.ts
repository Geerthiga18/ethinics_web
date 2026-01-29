"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function placeOrder(formData: FormData) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const foodId = formData.get("foodId") as string;
    const price = parseFloat(formData.get("price") as string);

    if (!foodId || !price) {
        throw new Error("Invalid order data");
    }

    // Ensure Buyer exists (MVP Logic cleanup)
    await prisma.user.upsert({
        where: { clerkId: userId },
        update: {},
        create: {
            clerkId: userId,
            email: "buyer@placeholder.com",
            name: "Buyer",
        }
    });

    await prisma.order.create({
        data: {
            foodId,
            buyerId: userId, // Using clerkId as buyerId linkage
            amount: price,
            status: "COMPLETED", // Mock payment success
        }
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
}
