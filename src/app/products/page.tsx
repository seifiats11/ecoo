import { handleAllProducts } from '@/services/api.service';
import React from 'react';
import ProductCard from '../_components/ProductCard/ProductCard';
import Link from 'next/link';
import { Package } from 'lucide-react'; // ضفنا أيقونة الصندوق

export default async function Products() {
    // 1. جلب كل المنتجات
    const details = await handleAllProducts();
    const productsArray = details?.data || [];

    // لو مفيش منتجات أو حصل مشكلة
    if (!productsArray || productsArray.length === 0) {
        return (
            <div className="container mx-auto px-4 pt-32 text-center text-red-500 font-bold text-2xl">
                No products found!
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20">

            {/* ==================== البانر الأخضر الجديد (Header Banner) ==================== */}
            <div className="w-full bg-gradient-to-r from-[#16A34A] to-[#22c55e] py-10 md:py-16 mb-10">
                <div className="container mx-auto px-4">

                    {/* مسار الصفحة (Breadcrumbs) */}
                    <div className="text-white/80 text-sm mb-6 font-medium">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-bold">All Products</span>
                    </div>

                    {/* الأيقونة والعنوان */}
                    <div className="flex items-center gap-5">
                        {/* مربع الأيقونة (نص شفاف) */}
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-sm backdrop-blur-sm">
                            <Package className="text-white w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
                        </div>

                        {/* النصوص */}
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                All Products
                            </h1>
                            <p className="text-white/90 text-sm md:text-base font-medium">
                                Explore our complete product collection
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ==================== شبكة المنتجات (Products Grid) ==================== */}
            <div className="container mx-auto px-4">
                <span className="text-lg font-light text-gray-700 mb-4">
                    Showing  {productsArray.length} Products
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {productsArray.map((productItem: any) => (
                        <ProductCard key={productItem._id} product={productItem} />
                    ))}
                </div>
            </div>

        </div>
    );
}