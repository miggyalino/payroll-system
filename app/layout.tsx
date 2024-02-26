import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NAVBAR_ITEMS } from "@/constants";
import Image from "next/image";
import { BookUser, Building2, HandCoins, LayoutGrid, CalendarDays } from "lucide-react";
import { Toaster } from "@/components/ui/sonner"

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
          <nav className="flex flex-col  text-white">
            <div className="flex items-center gap-2 p-8">
              <HandCoins size={32} color="#281cce" strokeWidth={2.25} />
              <h1 className="text-lg font-bold">Payroll Management</h1>
            </div>
            <div className="flex flex-col justify-center gap-5 px-10 py-10">
              {NAVBAR_ITEMS.map((item) => (
              <div className="flex flex-row justify-between items-center">
                {item.icon === 'dashboard-icon' ? <LayoutGrid size={20}/> : 
                 item.icon === 'company-icon' ? <Building2 size={20}/> : 
                 item.icon === 'employee-icon' ? <BookUser size={20}/> : 
                 item.icon === 'payroll-icon' ? <HandCoins size={20}/> :
                 item.icon === 'leave-icon' ? <CalendarDays size={20}/> : null}
                <Link href={item.href} className="text-base">
                  {item.title}
                </Link>
              </div>
              ))}
            </div>
 
          </nav>
        </div>
        <div className="py-5">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
