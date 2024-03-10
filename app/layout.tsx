import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NAVBAR_ITEMS_ADMIN } from "@/constants";
import Image from "next/image";
import { BookUser, Building2, HandCoins, LayoutGrid } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Payroll Management",
  description: "Manage your payroll with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex gap-5`}>
        <div className="min-h-screen bg-slate-800 w-1/7">
          <Sidebar />
        </div>
        <div className="py-5">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
