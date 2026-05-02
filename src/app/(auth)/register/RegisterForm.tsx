"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Star,
    Truck,
    ShieldCheck,
    UserPlus,
} from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

// ====== استدعاء الـ useToast من shadcn ======

import { handleSignUp } from "./RegisterActions.actions";
import { RegisterFormValues } from "@/interfaces/auth.interface";
import { toast } from "sonner";

// ======================= Zod Schema =======================
const registerSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters").nonempty("name is required"),
        email: z.string().email("Please enter a valid email address").nonempty("email is required"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters").nonempty("password is required"),
        rePassword: z.string().nonempty("Please confirm your password"),
        phone: z
            .string()
            .regex(
                /^01[0125][0-9]{8}$/,
                "Please enter a valid Egyptian phone number"
            ).nonempty("phone number is required"),
        terms: z.boolean().refine((val) => val === true, {
            message: "You must agree to the Terms and Privacy Policy",
        }),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    
    // شيلنا الـ apiSuccess خالص لأننا هنستخدم الـ Toast مكانه
    const router = useRouter();

    // ======================= Form Setup =======================
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
            terms: false,
        },
    });

    // Watch password
    const watchPassword = form.watch("password");

    // ======================= Password Strength =======================
    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (!pass) return { score: 0, color: "bg-gray-200", label: "" };
        if (pass.length >= 8) score += 25;
        if (pass.match(/[A-Z]/) || pass.match(/[a-z]/)) score += 25;
        if (pass.match(/\d/)) score += 25;
        if (pass.match(/[^a-zA-Z\d]/)) score += 25;

        if (score <= 25) return { score, color: "bg-red-500", label: "Weak" };
        if (score <= 50) return { score, color: "bg-yellow-500", label: "Fair" };
        if (score <= 75) return { score, color: "bg-blue-500", label: "Good" };
        return { score, color: "bg-[#009564]", label: "Strong" };
    };

    const strength = getPasswordStrength(watchPassword);

    // ======================= Submit =======================
    async function onSubmit(data: RegisterFormValues) {
        setIsLoading(true);
        setApiError("");

        const { terms, ...dataToSend } = data;

        const result = await handleSignUp(dataToSend);

        if (result.success) {
            console.log("Success:", result.data);

            // ====== استخدام الـ Toast هنا ======
            toast.success("Account created successfully! Redirecting to login...",{
                style: {
                    color: "#009564",
                    borderRadius: "8px",
                    background: "#F0FFF4",
                    fontWeight: "bold",
                }
            });

            form.reset();

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else {
            setApiError(result.error);
            
            // إضافة Toast للإيرور (اختياري بس بيخلي الـ UX أحسن)
            toast.error("Failed to create account. Please try again.");
        }

        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* ======================= Left Side ======================= */}
                <div className="hidden lg:flex flex-col pr-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Welcome to{" "}
                        <span className="text-[#009564]">
                            FreshCart
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        Join thousands of happy customers who enjoy fresh groceries
                        delivered right to their doorstep.
                    </p>

                    <div className="space-y-8 mb-12">
                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Star className="text-[#009564] fill-current" size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Premium Quality</h3>
                                <p className="text-slate-600">Premium quality products sourced from trusted suppliers.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <Truck className="text-[#009564]" size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Fast Delivery</h3>
                                <p className="text-slate-600">Same-day delivery available in most areas.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <ShieldCheck className="text-[#009564]" size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Secure Shopping</h3>
                                <p className="text-slate-600">Your data and payments are completely secure.</p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl">
                                👩🏻‍💼
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900">Sarah Johnson</h4>
                                <div className="flex text-yellow-400">
                                    <Star size={14} className="fill-current" />
                                    <Star size={14} className="fill-current" />
                                    <Star size={14} className="fill-current" />
                                    <Star size={14} className="fill-current" />
                                    <Star size={14} className="fill-current" />
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm italic leading-relaxed">
                            "FreshCart has transformed my shopping experience.
                            The quality of the products is outstanding,
                            and the delivery is always on time."
                        </p>
                    </div>
                </div>

                {/* ======================= Form Card ======================= */}
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md mx-auto lg:max-w-none">

                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Your Account</h2>
                        <p className="text-slate-500 text-sm">Start your fresh journey with us today</p>
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

                    {/* شلنا رسالة النجاح الثابتة من هنا، وسيبنا بس الـ Error لو حابب يفضل موجود فوق الفورم */}
                    {apiError && (
                        <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
                            {apiError}
                        </div>
                    )}

                    {/* ======================= FORM ======================= */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mohamed Ali" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email*</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="mohamed@example.com" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password*</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Create a strong password" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        {watchPassword && watchPassword.length > 0 && (
                                            <div className="mt-2">
                                                <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-gray-100">
                                                    <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }} />
                                                </div>
                                                <div className="flex justify-between items-center mt-1">
                                                    <span className="text-[10px] text-gray-400">Must be at least 8 characters with numbers and symbols</span>
                                                    <span className={`text-xs font-semibold ${strength.color.replace("bg-", "text-")}`}>{strength.label}</span>
                                                </div>
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password*</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm your password" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="01012345678" {...field} className="h-12 rounded-xl border-gray-200" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Terms */}
                            <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-normal text-slate-600">
                                                I agree to the <Link href="#" className="text-[#009564] hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-[#009564] hover:underline font-medium">Privacy Policy</Link> *
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-[#009564] hover:bg-emerald-700 text-white rounded-xl font-bold text-base">
                                {isLoading ? "Creating Account..." : <><UserPlus className="mr-2" size={20} /> Create My Account</>}
                            </Button>
                            
                            {/* Login Link */}
                            <p className="text-center text-sm text-slate-600 mt-6">
                                Already have an account? <Link href="/login" className="text-[#009564] font-bold hover:underline">Sign In</Link>
                            </p>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}