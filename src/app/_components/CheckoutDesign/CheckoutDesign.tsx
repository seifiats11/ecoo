'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Receipt, ArrowLeft, Home, Info, Building2, MapPin,
    Phone, Wallet, CreditCard, ShieldCheck, Lock, Truck, RotateCcw, CheckCircle2
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { createCheckoutSession } from '@/app/checkout/checkout.actions';

// ================= Schema Validation =================
const checkoutSchema = z.object({
    city: z.string().min(2, "City is required"),
    details: z.string().min(5, "Please enter your full street address"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number (e.g., 010...)"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutDesign({ cartData, cartId }: { cartData: any, cartId: string }) {
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
    const [isLoading, setIsLoading] = useState(false);

    const products = cartData.products || [];
    const totalCartPrice = cartData.totalCartPrice || 0;
    const shippingFee = 50;
    const finalTotal = totalCartPrice + shippingFee;

    // إعداد الـ Form
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema)
    });

    // ================= Submit Form =================
    const onSubmit = async (data: CheckoutFormValues) => {
        setIsLoading(true);

        if (paymentMethod === 'online') {
            const result = await createCheckoutSession(cartId, data);

            if (result.success && result.url) {
                // توجيه اليوزر لصفحة Stripe
                window.location.href = result.url;
            } else {
                toast.error(result.message);
                setIsLoading(false);
            }
        } else {
            // هنا لو هتعمل API للـ Cash on Delivery مستقبلاً
            toast.info("Cash on Delivery will be implemented soon!");
            setIsLoading(false);
        }
    };

    return (
        <div className="py-10 px-4 md:px-8 font-sans max-w-6xl mx-auto">

            {/* ================= Header ================= */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-sm font-medium text-gray-500 mb-3">
                        Home <span className="mx-1">/</span> Cart <span className="mx-1">/</span> <span className="text-slate-900 font-bold">Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#16a34a] p-2 rounded-xl text-white shadow-sm">
                            <Receipt size={28} strokeWidth={2} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Complete Your Order</h1>
                    </div>
                    <p className="text-gray-500 font-medium">Review your items and complete your purchase</p>
                </div>
                <Link href="/cart" className="text-[#16a34a] font-bold text-sm hover:underline flex items-center gap-1.5">
                    <ArrowLeft size={16} /> Back to Cart
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* ================= Left Column (Forms) ================= */}
                <div className="col-span-1 lg:col-span-2 space-y-8">

                    {/* 1. Shipping Address Box */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-[#16a34a] p-5 text-white flex items-center gap-2">
                            <Home size={20} strokeWidth={2.5} />
                            <div>
                                <h2 className="text-lg font-extrabold">Shipping Address</h2>
                                <p className="text-emerald-50 text-xs font-medium">Where should we deliver your order?</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-5">

                            {/* Info Banner */}
                            <div className="bg-[#f0f5ff] border border-[#d6e4ff] rounded-xl p-4 flex gap-3 text-[#2f54eb]">
                                <Info size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm">Delivery Information</h4>
                                    <p className="text-xs font-medium mt-0.5 opacity-90">Please ensure your address is accurate for smooth delivery</p>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-1.5 block">City <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            {...register('city')}
                                            type="text"
                                            placeholder="e.g. Cairo, Alexandria, Giza"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-[#16a34a]'} text-sm font-medium transition-all`}
                                        />
                                    </div>
                                    {errors.city && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.city.message}</p>}
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-slate-700 mb-1.5 block">Street Address <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                                        <textarea
                                            {...register('details')}
                                            rows={3}
                                            placeholder="Street name, building number, floor, apartment..."
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.details ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-[#16a34a]'} text-sm font-medium transition-all resize-none`}
                                        ></textarea>
                                    </div>
                                    {errors.details && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.details.message}</p>}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="text-sm font-bold text-slate-700 block">Phone Number <span className="text-red-500">*</span></label>
                                        <span className="text-xs text-gray-400 font-medium">Egyptian numbers only</span>
                                    </div>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            {...register('phone')}
                                            type="text"
                                            placeholder="01xxxxxxxxx"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 outline-red-500' : 'border-gray-200 outline-[#16a34a]'} text-sm font-medium transition-all tracking-wider`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.phone.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Payment Method Box */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-[#16a34a] p-5 text-white flex items-center gap-2">
                            <Wallet size={20} strokeWidth={2.5} />
                            <div>
                                <h2 className="text-lg font-extrabold">Payment Method</h2>
                                <p className="text-emerald-50 text-xs font-medium">Choose how you'd like to pay</p>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">

                            {/* Online Payment (Stripe) */}
                            

                            {/* Cash on Delivery */}
                            <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${paymentMethod === 'cash' ? 'border-[#16a34a] bg-emerald-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Cash on Delivery</h4>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">Pay when your order arrives at your doorstep</p>
                                    </div>
                                </div>
                                <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="hidden" />
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-[#16a34a] text-white' : 'border-2 border-gray-200'}`}>
                                    {paymentMethod === 'cash' && <CheckCircle2 size={16} strokeWidth={3} />}
                                </div>
                            </label>

                            <label className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${paymentMethod === 'online' ? 'border-[#16a34a] bg-emerald-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${paymentMethod === 'online' ? 'bg-[#16a34a] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">Pay Online</h4>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">Secure payment with Credit/Debit Card via Stripe</p>
                                    </div>
                                </div>
                                <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="hidden" />
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${paymentMethod === 'online' ? 'bg-[#16a34a] text-white' : 'border-2 border-gray-200'}`}>
                                    {paymentMethod === 'online' && <CheckCircle2 size={16} strokeWidth={3} />}
                                </div>
                            </label>

                            {/* Secure Banner */}
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3 text-[#16a34a] mt-2">
                                <ShieldCheck size={24} className="shrink-0" />
                                <div>
                                    <h4 className="font-bold text-sm">Secure & Encrypted</h4>
                                    <p className="text-xs font-medium mt-0.5 opacity-90">Your payment info is protected with 256-bit SSL encryption</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* ================= Right Column (Order Summary) ================= */}
                <div className="col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                        <div className="bg-[#16a34a] p-6 text-white">
                            <div className="flex items-center gap-2 mb-1.5">
                                <Lock size={20} strokeWidth={2.5} />
                                <h2 className="text-lg font-extrabold">Order Summary</h2>
                            </div>
                            <p className="text-emerald-50 text-sm font-medium">{products.length} item(s)</p>
                        </div>

                        <div className="p-6">

                            {/* Products List */}
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {products.map((item: any) => (
                                    <div key={item._id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50">
                                        <div className="w-14 h-14 bg-white rounded-lg p-1 border border-gray-100 shrink-0 flex items-center justify-center">
                                            <img src={item.product.imageCover} alt={item.product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.title}</h4>
                                            <p className="text-xs text-gray-500 font-medium mt-1">{item.count} × {item.price} EGP</p>
                                        </div>
                                        <div className="text-sm font-black text-slate-900 shrink-0">
                                            {item.count * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-4 text-sm font-medium text-slate-600 border-t border-b border-gray-100 py-5 mb-5">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900 font-bold text-base">{totalCartPrice} EGP</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1.5"><Truck size={16} /> Shipping</span>
                                    <span className="text-slate-900 font-bold text-base">{shippingFee} EGP</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-extrabold text-slate-900">Total</span>
                                <span className="text-3xl font-black text-[#16a34a] flex items-baseline gap-1">
                                    {finalTotal} <span className="text-sm text-gray-500 font-bold uppercase">EGP</span>
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#16a34a] text-white font-bold text-lg hover:bg-[#13813b] transition-colors shadow-lg shadow-emerald-200 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Lock size={18} strokeWidth={2.5} /> Place Order
                                    </>
                                )}
                            </button>

                            {/* Trust Badges */}
                            <div className="flex justify-center items-center gap-4 mt-6 text-xs font-bold text-gray-400">
                                <div className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#16a34a]" /> Secure</div>
                                <div className="flex items-center gap-1.5"><Truck size={14} className="text-blue-500" /> Fast Delivery</div>
                                <div className="flex items-center gap-1.5"><RotateCcw size={14} className="text-orange-500" /> Easy Returns</div>
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}