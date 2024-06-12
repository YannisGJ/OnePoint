import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/page";
import Store from "@/app/store/store";

export const metadata: Metadata = {
    title: "One .",
    description: "YannisGJ project",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Store>
            <html lang="en">
                <body className="max-h-screen max-w-screen bg-stone-900 relative flex flex-col">
                    <div className="z-10">
                        <Header />
                    </div>
                    {children}
                </body>
            </html>
        </Store>
    );
}
