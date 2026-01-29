import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ethinics - Multi-Cultural Food Marketplace",
    description: "Authentic homemade and traditional foods for you.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Navbar />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
