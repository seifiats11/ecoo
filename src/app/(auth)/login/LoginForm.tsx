"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, Heart, Clock, LogIn } from "lucide-react";
import { toast } from "sonner"; // استدعاء Toast من Sonner
import { signIn } from "next-auth/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// استدعاء دالة الـ Server Action اللي لسه عاملينها
import { handleSignIn } from "./LoginActions.actions";
import { sign } from "crypto";

// ======================= Zod Validation Schema =======================
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const router = useRouter();

    // ======================= Form Setup =======================
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // ======================= Submit =======================
    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        setApiError("");

        try {
            // بننادي على NextAuth
            const result = await signIn('credentials', {
                redirect: false, // عشان نتحكم في التحويل بنفسنا
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                // لو في إيرور (زي الباسورد غلط)
                setApiError(result.error);
                toast.error(result.error || "Login failed. Please check your credentials.");
            } else if (result?.ok) {
                // لو تسجيل الدخول نجح
                toast.success("Welcome back! Redirecting...", {
                    style: {
                        color: "#009564",
                        borderRadius: "8px",
                        background: "#F0FFF4",
                        fontWeight: "bold",
                    }
                });

                form.reset();

                // تحويل اليوزر للصفحة الرئيسية بعد ثانية ونص
                setTimeout(() => {
                    router.push("/");
                    router.refresh(); // خطوة مهمة عشان Next.js يقرأ الـ Session الجديدة في الـ Navbar
                }, 1500);
            }
        } catch (error) {
            setApiError("Something went wrong. Please try again.");
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* ======================= الجزء الأيسر: رسالة الترحيب ======================= */}
                <div className="hidden lg:flex flex-col pr-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Welcome Back to <span className="text-[#009564]">FreshCart</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Sign in to access your saved items, track your orders, and enjoy a seamless shopping experience.
                    </p>

                    <div className="space-y-8 mb-12">
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <ShoppingBag className="text-[#009564]" size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Fast Checkout</h3>
                                <p className="text-slate-600">Save your payment details for a faster checkout experience.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Clock className="text-[#009564]" size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Order Tracking</h3>
                                <p className="text-slate-600">Track your orders in real-time from our store to your door.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Heart className="text-[#009564] fill-current" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Saved Wishlist</h3>
                                <p className="text-slate-600">Access your favorite products anytime, anywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ======================= الجزء الأيمن: الفورم ======================= */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md mx-auto lg:max-w-none">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In to Your Account</h2>
                        <p className="text-slate-500 text-sm">Enter your details below to continue</p>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors">
                            <span className="text-red-500 font-bold text-lg">G</span> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors">
                            <span className="text-blue-600 font-bold text-lg">f</span> Facebook
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center mb-6">
                        <div className="border-t border-gray-200 w-full"></div>
                        <span className="bg-white px-4 text-xs text-slate-400 absolute">or</span>
                    </div>

                    {/* عرض الإيرور لو الإيميل أو الباسورد غلط */}
                    {apiError && <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">{apiError}</div>}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-700">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="mohamed@example.com" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="text-slate-700">Password</FormLabel>
                                            <Link href="#" className="text-sm font-medium text-[#009564] hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-[#009564] hover:bg-emerald-700 text-white rounded-xl font-bold text-base transition-all mt-4"
                            >
                                {isLoading ? "Signing in..." : (
                                    <>
                                        <LogIn className="mr-2" size={20} /> Sign In
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-sm text-slate-600 mt-6">
                                Don't have an account? <Link href="/Register" className="text-[#009564] font-bold hover:underline">Create one</Link>
                            </p>

                        </form>
                    </Form>
                </div>

            </div>
        </div>
    );
}