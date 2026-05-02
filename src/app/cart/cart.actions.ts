'use server'

import { getToken } from "@/utilits"; 
import { revalidatePath } from "next/cache";

export async function addToCart(productID: string) {
    const token = await getToken();

    if (!token) {
        console.error("No token found. User is not logged in.");
        return { success: false, message: "Please login first to add products" };
    }

    try {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'POST',
            body: JSON.stringify({ productId: productID }),
            headers: {
                token: token as string,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (res.ok) {
            console.log("Product added successfully: ", data);
            revalidatePath('/cart'); 
            return { success: true, data };
        }

        console.log("Server rejected the request:", data);
        return { success: false, message: data.message || "Failed to add product" };

    } catch (error) {
        // لو ضرب هنا، هيطبعلك السبب الحقيقي في الـ Terminal
        console.error('🔥 CRITICAL Error adding product to cart:', error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}


// دالة تحديث كمية المنتج في العربة
// دالة تحديث كمية المنتج في العربة
export async function updateCartQuantity(productId: string, count: number) {
    const token = await getToken();

    if (!token) {
        return { success: false, message: "Please login first" };
    }

    try {
        // التعديل هنا: استخدمنا الرابط المباشر للـ API بدل المتغير
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ count }),
            headers: {
                token: token as string,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (res.ok) {
            // بنعمل ريفريش للصفحة عشان الداتا الجديدة تسمع والأسعار تتحدث
            revalidatePath('/cart'); 
            return { success: true, data };
        }

        // لو السيرفر رفض العملية
        console.log("Server rejected update:", data);
        return { success: false, message: data.message || "Failed to update quantity" };

    } catch (error) {
        // لو ضرب إيرور، هيطبعهولك في الشاشة السوداء عشان نعرف السبب
        console.error('🔥 CRITICAL Error updating quantity:', error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
} 


export async function removeCartItem(productId: string) {
    const token = await getToken();

    if (!token) {
        return { success: false, message: "Please login first" };
    }

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                token: token as string,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (res.ok) {
            // ريفريش للداتا بعد الحذف
            revalidatePath('/cart'); 
            return { success: true, data };
        }

        return { success: false, message: data.message || "Failed to remove item" };

    } catch (error) {
        console.error('🔥 CRITICAL Error removing item:', error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}


