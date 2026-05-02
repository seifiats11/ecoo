'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import {
    ShoppingCart, Check, Minus, Plus, Trash2, ArrowLeft, Lock, Truck, Tag, ShieldCheck, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

// استدعاء الأكشنز والكونتيكست
import { updateCartQuantity, removeCartItem } from '@/app/cart/cart.actions';
import { CartContext } from '@/app/_context/CartContext/CartContext';

export default function CartPageDesign({ CartData }: { CartData: any }) {
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // ================= State الخاصة بالمودال =================
    const [itemToDelete, setItemToDelete] = useState<{ id: string, title: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { setNumOfItems } = useContext(CartContext);

    const numOfCartItems = CartData?.numOfCartItems || 0;
    const totalCartPrice = CartData?.data?.totalCartPrice || 0;
    const products = CartData?.data?.products || [];

    const FREE_SHIPPING_THRESHOLD = 500;
    const shippingFee = totalCartPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
    const finalTotal = totalCartPrice + shippingFee;
    const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalCartPrice);
    const progressPercentage = Math.min(100, (totalCartPrice / FREE_SHIPPING_THRESHOLD) * 100);

    // دالة تحديث الكمية (زي ما هي)
    const handleUpdateQuantity = async (productId: string, newCount: number) => {
        if (newCount < 1) return;
        setUpdatingId(productId);
        const result = await updateCartQuantity(productId, newCount);
        if (result.success && result.data?.numOfCartItems) {
            setNumOfItems(result.data.numOfCartItems);
        } else if (!result.success) {
            toast.error(result.message);
        }
        setUpdatingId(null);
    };

    // ================= دالة تأكيد الحذف =================
    const confirmDelete = async () => {
        if (!itemToDelete) return;
        setIsDeleting(true);

        const result = await removeCartItem(itemToDelete.id);

        if (result.success) {
            toast.success("Item removed successfully", { style: { color: "#009564" } });
            // تحديث رقم العربة بعد الحذف
            if (result.data?.numOfCartItems !== undefined) {
                setNumOfItems(result.data.numOfCartItems);
            }
        } else {
            toast.error(result.message);
        }

        setIsDeleting(false);
        setItemToDelete(null); // نقفل المودال
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-8 font-sans relative">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="text-sm font-medium text-gray-500 mb-3">
                        Home <span className="mx-1">/</span> <span className="text-slate-900">Shopping Cart</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#16a34a] p-2 rounded-xl text-white shadow-sm">
                            <ShoppingCart size={28} strokeWidth={2} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
                    </div>
                    <p className="text-gray-500 font-medium">
                        You have <span className="text-[#16a34a] font-bold">{numOfCartItems}</span> item(s) in your cart
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column (Cart Items) */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">

                        {products.map((item: any) => {
                            const isUpdatingThisItem = updatingId === item.product._id;

                            return (
                                <div key={item._id} className="relative flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md overflow-hidden">

                                    {isUpdatingThisItem && (
                                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                                            <Loader2 className="animate-spin text-[#16a34a]" size={36} strokeWidth={2.5} />
                                        </div>
                                    )}

                                    {/* Product Image & Badge */}
                                    <div className="flex flex-col items-center gap-3 shrink-0">
                                        <div className="w-32 h-32 bg-[#f8f9fa] rounded-xl flex items-center justify-center p-2 border border-gray-50">
                                            <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <span className="bg-[#16a34a] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                            <Check size={12} strokeWidth={3} /> In Stock
                                        </span>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex flex-col justify-between flex-1 py-1">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{item.product.title}</h3>
                                            <div className="flex items-center flex-wrap gap-2 mt-2 mb-3">
                                                <span className="bg-emerald-50 text-[#16a34a] text-xs font-bold px-2.5 py-1 rounded-md">{item.product.category?.name || "Category"}</span>
                                                <span className="text-gray-400 text-xs font-medium">• Brand: {item.product.brand?.name || "N/A"}</span>
                                            </div>
                                            <div className="text-[#16a34a] font-extrabold text-xl flex items-baseline gap-1">
                                                {item.price} EGP <span className="text-gray-400 font-medium text-xs">per unit</span>
                                            </div>
                                        </div>

                                        {/* Bottom Controls */}
                                        <div className="flex items-end justify-between mt-4">
                                            <div className="flex items-center justify-between border border-gray-200 rounded-lg h-9 w-24 p-1 bg-white shadow-sm">
                                                <button onClick={() => handleUpdateQuantity(item.product._id, item.count - 1)} disabled={item.count <= 1 || isUpdatingThisItem} className="w-7 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-md transition-colors"><Minus size={14} strokeWidth={2.5} /></button>
                                                <span className="font-bold text-sm text-slate-800">{item.count}</span>
                                                <button onClick={() => handleUpdateQuantity(item.product._id, item.count + 1)} disabled={isUpdatingThisItem} className="w-7 h-full flex items-center justify-center bg-[#16a34a] text-white rounded-md transition-colors hover:bg-[#13813b] disabled:opacity-50"><Plus size={14} strokeWidth={2.5} /></button>
                                            </div>

                                            <div className="flex items-center gap-5">
                                                <div className="text-right flex flex-col">
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Total</span>
                                                    <span className="text-xl font-extrabold text-slate-900 flex items-baseline gap-1">
                                                        {item.price * item.count} <span className="text-xs text-gray-500 font-semibold uppercase">EGP</span>
                                                    </span>
                                                </div>

                                                {/* ================= زرار الحذف ================= */}
                                                <button
                                                    onClick={() => setItemToDelete({ id: item.product._id, title: item.product.title })}
                                                    className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors group"
                                                >
                                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between mt-8 px-2">
                            <Link href="/products" className="flex items-center gap-2 text-[#16a34a] font-semibold text-sm hover:underline">
                                <ArrowLeft size={16} /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Right Column (Order Summary) */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                            <div className="bg-[#16a34a] p-6 text-white">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Lock size={20} strokeWidth={2.5} />
                                    <h2 className="text-lg font-extrabold">Order Summary</h2>
                                </div>
                                <p className="text-emerald-50 text-sm font-medium">{numOfCartItems} item(s) in your cart</p>
                            </div>

                            <div className="p-6">
                                <div className="bg-orange-50/80 border border-orange-100 rounded-xl p-4 mb-6">
                                    {amountToFreeShipping > 0 ? (
                                        <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-3">
                                            <Truck size={18} strokeWidth={2.5} /> Add {amountToFreeShipping} EGP for free shipping
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-[#16a34a] font-bold text-sm mb-3">
                                            <Check size={18} strokeWidth={2.5} /> You got free shipping!
                                        </div>
                                    )}
                                    <div className="w-full bg-orange-200/60 rounded-full h-2">
                                        <div className={`h-2 rounded-full ${amountToFreeShipping > 0 ? 'bg-orange-500' : 'bg-[#16a34a]'}`} style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                </div>

                                <div className="space-y-4 text-sm font-medium text-slate-600 border-b border-gray-100 pb-5 mb-5">
                                    <div className="flex justify-between items-center">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900 font-bold text-base">{totalCartPrice} EGP</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Shipping</span>
                                        <span className="text-slate-900 font-bold text-base">{shippingFee} EGP</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-extrabold text-slate-900">Total</span>
                                    <span className="text-3xl font-black text-slate-900 flex items-baseline gap-1">
                                        {finalTotal} <span className="text-sm text-gray-500 font-bold uppercase">EGP</span>
                                    </span>
                                </div>

                                <Link href="/checkout" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#16a34a] text-white font-bold text-lg hover:bg-[#13813b] transition-colors shadow-lg shadow-emerald-200">
                                    <Lock size={18} strokeWidth={2.5} /> Secure Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ======================= Delete Confirmation Modal ======================= */}
            {itemToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in duration-200">

                        {/* أيقونة السلة الحمراء */}
                        <div className="w-16 h-16 bg-[#ffeaeb] text-[#ff3333] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={28} strokeWidth={2} />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Remove Item?</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            Remove <span className="font-bold text-slate-700">{itemToDelete.title}</span> from your cart?
                        </p>

                        {/* زراير الإلغاء والحذف */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setItemToDelete(null)}
                                disabled={isDeleting}
                                className="flex-1 py-3 rounded-xl bg-gray-100 text-slate-700 font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="flex-1 py-3 rounded-xl bg-[#ff3333] text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : "Remove"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}