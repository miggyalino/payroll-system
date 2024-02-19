import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { NAVBAR_ITEMS } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex gap-5`}>
        <div className="h-screen bg-slate-500 w-1/6">
          <nav className="flex flex-col">
            <div className="flex flex-col justify-center gap-5 px-10 py-16">
              {NAVBAR_ITEMS.map((item) => (
                <Link href={item.href} className="text-lg">
                  {item.title}
                </Link>
              ))}
            </div>
            
          </nav>
        </div>
        <div className="py-5">
          {children}
        </div>
      </body>
    </html>
  );
}
