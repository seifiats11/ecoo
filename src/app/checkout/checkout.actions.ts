'use server'

import { getToken } from "@/utilits";

export async function createCheckoutSession(cartId: string, shippingAddress: any) {
    const token = await getToken();

    if (!token) {
        return { success: false, message: "Please login first" };
    }

    try {
        // بنباصي الـ cartId في الرابط، وبنحدد الرابط اللي هيرجعله بعد الدفع
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`;

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token as string,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (res.ok && data.status === 'success') {
            // بيرجع رابط Stripe جوه data.session.url
            return { success: true, url: data.session.url };
        }

        return { success: false, message: data.message || "Failed to create checkout session" };

    } catch (error) {
        console.error('Error creating checkout session:', error);
        return { success: false, message: "Something went wrong." };
    }
}   