"use server";

import { LoginFormValues } from "@/interfaces/auth.interface";
import { cookies } from "next/headers";

// تقدر تستخدم الـ interface لو عامله، أو تستخدم any/Type مخصص
export async function handleSignIn(userData: LoginFormValues) {
    const cookie = await cookies(); 
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        // لو السيرفر رد بنجاح (200 OK)
        if (response.ok) {
            cookie.set("token", data.token,  {
                httpOnly: true,
                
            })
            return { success: true, data: data };
            
        } else {
            // لو الإيميل أو الباسورد غلط
            return { success: false, error: data.message || "Invalid email or password" };
        }

    } catch (error: any) {
        console.error("Error during signin:", error);
        return { success: false, error: "Network error, please try again." };
    }
}