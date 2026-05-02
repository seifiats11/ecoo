import React from 'react';
import Link from 'next/link';
import { Filter, Tag, X } from 'lucide-react';
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { getBrandDetails, getProductsByBrand } from '@/services/api.service';
import Image from 'next/image';

export default async function BrandProductsPage({ params }: any) {
    const resolvedParams = await Promise.resolve(params);

    const brandId = resolvedParams.id;
    const brand = await getBrandDetails(brandId);         
    const productsArray = await getProductsByBrand(brandId); 
    return (
        <div className="min-h-screen bg-gray-50/30 pb-20">

            <div className="w-full bg-[#22c55e] py-10 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-white/90 text-sm mb-6 font-medium">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white font-bold">{brand.name}</span>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-md p-3">
                            <Image
                                width={80}
                                height={80}
                                src={brand.image}
                                alt={brand.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                                {brand.name}
                            </h1>
                            <p className="text-white/90 text-sm md:text-base font-medium">
                                Shop {brand.name} products
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Filter size={18} />
                        <span>Active Filters:</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#f3e8ff] text-[#8b5cf6] px-3 py-1.5 rounded-lg font-semibold border border-[#e9d5ff]">
                            <Tag size={14} className="fill-current" />
                            <span>{brand.name}</span>
                            <Link href="/products" title="Remove filter" className="hover:text-red-500 transition-colors ml-1">
                                <X size={16} />
                            </Link>
                        </div>
                        <Link href="/products" className="text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors font-medium">
                            Clear all
                        </Link>
                    </div>
                </div>
                <div className="mt-6 text-slate-500 font-medium">
                    Showing {productsArray.length} products
                </div>
            </div>

            <div className="container mx-auto px-4">
                {productsArray.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {productsArray.map((productItem: any) => (
                            <ProductCard key={productItem._id} product={productItem} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mt-4">
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
                        <p className="text-slate-500">There are currently no products available for this brand.</p>
                    </div>
                )}
            </div>

        </div>
    );
}