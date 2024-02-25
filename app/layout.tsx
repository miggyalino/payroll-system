"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NAVBAR_ITEMS } from "@/constants";
import { HandCoins } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Navpill } from "@/components/ui/navpill";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedNavbar, setSelectedNavbar] = useState(NAVBAR_ITEMS[0].title);
  return (
    <html lang="en">
      <body className={`${inter.className} flex gap-5`}>
        <div className="min-h-screen bg-slate-800 w-1/7">
          <nav className="flex flex-col  text-white">
            <div className="flex items-center gap-2 p-8">
              <HandCoins size={32} color="#281cce" strokeWidth={2.25} />
              <h1 className="text-lg font-bold">Payroll Management</h1>
            </div>
            <Navpill
              NAVBAR_ITEMS={NAVBAR_ITEMS}
              selectedNavbar={selectedNavbar}
              onSelect={setSelectedNavbar}
            />
          </nav>
        </div>
        <div className="py-5">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
