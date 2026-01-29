import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ShoppingBag, Utensils } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const { userId } = auth();

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <Utensils className="h-6 w-6" />
                    <span>Ethinics</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/sell" className="text-sm font-medium transition-colors hover:text-primary">
                        Sell Food
                    </Link>
                    <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                        Dashboard
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {userId ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" size="icon">
                                    <ShoppingBag className="h-5 w-5" />
                                </Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/sign-in">
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button size="sm">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
