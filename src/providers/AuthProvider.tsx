// src/providers/AuthProvider.tsx
"use client"; // لازم يكون Client Component عشان الـ Context

import CartContextProvider from "@/app/_context/CartContext/CartContext";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({ children , data }: { children: React.ReactNode; data: any }) {
    return (
        <SessionProvider>
            <CartContextProvider data={data}>
                {children}
            </CartContextProvider>
        </SessionProvider>
    );
}