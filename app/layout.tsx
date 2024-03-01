import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Sidebar } from "@/components/ui/Sidebar";

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
        <Sidebar />
        <div className="py-5">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
