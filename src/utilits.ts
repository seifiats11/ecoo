import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getToken() {
    const cookieStore = await cookies();
    
    const token = 
        cookieStore.get('next-auth.session-token')?.value || 
        cookieStore.get('__Secure-next-auth.session-token')?.value;

    // لو مفيش توكن (اليوزر مش مسجل دخول)، بنرجع null فوراً عشان السيرفر ميضربش
    if (!token) return null;

    try {
        // فك تشفير التوكن باستخدام الـ Secret بتاعك
        const decodedToken = await decode({
            token: token,
            secret: process.env.NEXTAUTH_SECRET as string,
        });
        
        // بنرجع الـ userToken اللي إنت حافظه جوه الـ payload
        return decodedToken?.userToken || null; 
        
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}