// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Exo } from "next/font/google";

import "./globals.css";

// 1. استدعاء الـ Providers
import AuthProvider from "@/providers/AuthProvider"; 
import { Toaster } from "@/components/ui/sonner"; // أو sonner حسب اللي بتستخدمه
import Navbar from "./_components/Navbar/Navbar";
import { getTheCart } from "@/services/api.service";
import Footer from "./_components/Footer/Footer";

const exo = Exo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreshCart",
  description: "Your favorite E-commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const data = await getTheCart();
  return (
    <html lang="en">
      <body className={exo.className}>
        
        <AuthProvider data={data}>
            <Navbar />  
            {children}
            <Footer/>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}