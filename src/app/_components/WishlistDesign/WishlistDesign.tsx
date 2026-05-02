'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// استدعاء الأكشنز والكونتيكست
import { addToCart } from '@/app/cart/cart.actions'; // أكشن العربة اللي عملناه قبل كده
import { CartContext } from '@/app/_context/CartContext/CartContext';
import { removeFromWishlist } from '@/app/wishlist/WishList.action';

export default function WishlistDesign({ initialItems }: { initialItems: any[] }) {
    const [loadingIds, setLoadingIds] = useState<{ [key: string]: 'cart' | 'remove' | null }>({});
    const { setNumOfItems } = useContext(CartContext);

    // ================= دالة الإضافة للعربة =================
    const handleAddToCart = async (productId: string) => {
        setLoadingIds({ ...loadingIds, [productId]: 'cart' });
        
        const result = await addToCart(productId);
        
        if (result?.success) {
            if (result.data?.numOfCartItems) {
                setNumOfItems(result.data.numOfCartItems);
            }
            toast.success("Added to cart successfully!", { style: { color: "#009564" } });
        } else {
            toast.error(result?.message || "Failed to add to cart");
        }
        
        setLoadingIds({ ...loadingIds, [productId]: null });
    };

    // ================= دالة الحذف من المفضلة =================
    const handleRemove = async (productId: string) => {
        setLoadingIds({ ...loadingIds, [productId]: 'remove' });
        
        const result = await removeFromWishlist(productId);
        
        if (result.success) {
            toast.success("Removed from wishlist");
        } else {
            toast.error(result.message || "Failed to remove");
        }
        
        setLoadingIds({ ...loadingIds, [productId]: null });
    };

    // لو المفضلة فاضية
    if (initialItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#fafafa]">
                <Heart className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-6">Save items you love to review them later.</p>
                <Link href="/products" className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#15803d] transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] py-10">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">

                {/* --- 1. BREADCRUMBS --- */}
                <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
                    <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Wishlist</span>
                </nav>

                {/* --- 2. PAGE HEADER --- */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight">My Wishlist</h1>
                        <span className="text-sm text-gray-500">{initialItems.length} items saved</span>
                    </div>
                </div>

                {/* --- 3. THE TABLE --- */}
                <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[13px] text-gray-500">
                                    <th className="p-5 font-medium whitespace-nowrap">Product</th>
                                    <th className="p-5 font-medium whitespace-nowrap">Price</th>
                                    <th className="p-5 font-medium whitespace-nowrap">Status</th>
                                    <th className="p-5 font-medium whitespace-nowrap text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {initialItems.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                        
                                        {/* Product Column */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-[72px] h-[72px] shrink-0 bg-[#f8f9fa] rounded-lg flex items-center justify-center p-2 border border-gray-100">
                                                    <img src={item.imageCover} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h4 className="text-[15px] font-semibold text-[#1e293b] leading-snug max-w-[480px] line-clamp-1">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-[13px] text-gray-400 mt-1">
                                                        {item.category?.name || "Category"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Price Column */}
                                        <td className="p-5 align-middle">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#1e293b]">
                                                    {item.price.toLocaleString()} EGP
                                                </span>
                                            </div>
                                        </td>

                                        {/* Status Column */}
                                        <td className="p-5 align-middle">
                                            {item.quantity > 0 ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#16a34a] text-xs font-bold tracking-wide">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold tracking-wide">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions Column */}
                                        <td className="p-5 align-middle text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => handleAddToCart(item._id)}
                                                    disabled={loadingIds[item._id] === 'cart' || item.quantity <= 0}
                                                    className="bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-[13px] font-semibold transition-colors shadow-sm"
                                                >
                                                    {loadingIds[item._id] === 'cart' ? <Loader2 className="w-[16px] h-[16px] animate-spin" /> : <ShoppingCart className="w-[16px] h-[16px]" />}
                                                    Add to Cart
                                                </button>

                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    disabled={loadingIds[item._id] === 'remove'}
                                                    className="bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 w-10 h-10 rounded-lg flex items-center justify-center transition-colors shadow-sm disabled:opacity-50"
                                                >
                                                    {loadingIds[item._id] === 'remove' ? <Loader2 className="w-[16px] h-[16px] animate-spin text-red-500" /> : <Trash2 className="w-[16px] h-[16px]" />}
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- 4. BOTTOM ACTION --- */}
                <div className="flex justify-start">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    );
}