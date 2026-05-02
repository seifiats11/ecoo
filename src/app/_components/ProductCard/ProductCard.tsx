"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Eye, PlusCircle, Plus } from "lucide-react";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { IProduct } from "@/interfaces/products.interface";
import AddProductToCart from "../AddProductToCart/AddProductToCart";

export default function ProductCard({ product }: { product: IProduct }) {
    return (
        // ضفنا group عشان الأيقونات الداخلية، وضفنا hover:-translate-y-2 عشان الكارت يطلع لفوق
        <div className="mt-5 relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl hover:border-emerald-100 hover:-translate-y-2 transition-all duration-500 h-full">

            {/* 1. قسم الصورة والأيقونات العائمة */}
            <div className="relative h-64 overflow-hidden bg-gray-50 p-6">

                {/* رابط الصورة الأساسي */}
                <Link href={`/products/${product._id}`} className="block w-full h-full">
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>

                {/* حاوية الأيقونات العائمة (تظهر عند الـ Hover) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">

                    {/* زرار الـ Wishlist (Heart) */}
                    <button
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 flex items-center justify-center hover:text-red-500 hover:bg-white shadow-sm transition-colors"
                        title="Add to Wishlist"
                    >
                        <Heart size={18} strokeWidth={2.5} />
                    </button>

                    {/* زرار تفاصيل المنتج (Eye) */}
                    <Link
                        href={`/products/${product._id}`}
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 flex items-center justify-center hover:text-[#009564] hover:bg-white shadow-sm transition-colors"
                        title="View Details"
                    >
                        <Eye size={18} strokeWidth={2.5} />
                    </Link>

                </div>
            </div>

            {/* 2. تفاصيل المنتج */}
            <div className="p-5 flex flex-col flex-1">

                {/* اسم القسم باللون الأخضر المميز */}
                <span className="text-[11px] uppercase tracking-widest font-black text-[#009564] mb-1">
                    {product.category?.name}
                </span>

                {/* عنوان المنتج (سطر واحد) */}
                <Link
                    href={`/products/${product._id}`}
                    className="text-base font-bold text-slate-800 line-clamp-1 mb-2 "
                >
                    {product.title}
                </Link>

                {/* النجوم والتقييم */}
                <div className="flex items-center gap-2 mb-4">
                    <Rating
                        style={{ maxWidth: 80 }}
                        value={product.ratingsAverage || 0}
                        readOnly
                    />
                    <span className="text-xs font-bold text-gray-400">
                        {product.ratingsAverage}
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                        ({product.ratingsQuantity})
                    </span>
                </div>

                {/* السعر وزر الإضافة للعربة */}
                <div className="mt-auto flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-[#16A34A]">
                            {product.price} <span className="text-xs font-bold">EGP</span>
                        </span>
                    </div>

                    <AddProductToCart productID={product._id} />
                </div>
            </div>

        </div>
    );
}