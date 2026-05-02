'use server';

import { getToken } from "@/utilits";
import { revalidatePath } from "next/cache";

// 1. جلب بيانات المفضلة
export async function getWishlist() {
    const token = await getToken();
    
    if (!token) return { success: false, data: [] };

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'GET',
            headers: {
                'token': token as string
            },
            cache: 'no-store' // عشان دايماً يجيب أحدث داتا
        });
        
        const data = await response.json();
        return { success: true, data: data.data || [] };
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return { success: false, data: [] };
    }
}

// 2. الحذف من المفضلة
export async function removeFromWishlist(productId: string) {
    const token = await getToken();
    
    if (!token) return { success: false, message: "Please login first" };

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token as string
            },
        });

        const data = await response.json();

        if (response.ok) {
            // تحديث الصفحة عشان المنتج يختفي فوراً
            revalidatePath('/wishlist');
            return { success: true, message: "Product removed from wishlist" };
        }

        return { success: false, message: data.message || "Failed to remove product" };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}


// دالة الإضافة للمفضلة
export async function addToWishlist(productId: string) {
    const token = await getToken();
    
    if (!token) return { success: false, message: "Please login first" };

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
                'Content-Type': 'application/json',
                'token': token as string
            },
        });

        const data = await response.json();

        if (response.ok) {
            // ريفريش عشان لو فتح صفحة المفضلة يلاقيها اتحدثت
            revalidatePath('/wishlist');
            return { success: true, message: data.message || "Product added successfully to your wishlist" };
        }

        return { success: false, message: data.message || "Failed to add product" };
    } catch (error) {
        return { success: false, message: "Something went wrong" };
    }
}