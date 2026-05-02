"use server";
import { RegisterFormValues } from "@/interfaces/auth.interface";

// استخدمنا Omit عشان الـ terms مش بتتبعت للـ API
export async function handleSignUp(userData: Omit<RegisterFormValues, "terms">) {
    try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data };
        } else {
            return { success: false, error: data.message || "Failed to register account" };
        }

    } catch (error: any) {
        console.error("Error during signup:", error);
        return { success: false, error: "Network error, please try again." };
    }
}