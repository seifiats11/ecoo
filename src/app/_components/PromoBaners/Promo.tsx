import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function PromoBanners() {
    return (
        <section className="w-full py-8 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* LEFT CARD: Green - Deal of the Day */}
                    <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-gradient-to-br from-[#0aba76] to-[#048855]">

                        {/* Abstract Background Circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>

                        <div className="relative z-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                                <span className="text-sm">🔥</span>
                                <span className="text-sm font-medium text-white tracking-wide">Deal of the Day</span>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                                Fresh Organic Fruits
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-md">
                                Get up to 40% off on selected organic fruits
                            </p>

                            {/* Discount & Promo Code */}
                            <div className="flex flex-wrap items-baseline gap-3 mb-8">
                                <span className="text-4xl font-bold text-white tracking-tight">
                                    40% OFF
                                </span>
                                <span className="text-white/90 text-sm">
                                    Use code: <span className="font-bold text-white">ORGANIC40</span>
                                </span>
                            </div>

                            {/* Button */}
                            <button className="bg-white text-[#048855] hover:bg-gray-50 transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 w-fit">
                                Shop Now
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CARD: Orange/Red - New Arrivals */}
                    <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-10 bg-gradient-to-br from-[#ff872b] to-[#f73562]">

                        {/* Abstract Background Circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                        <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>

                        <div className="relative z-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                                <span className="text-sm">✨</span>
                                <span className="text-sm font-medium text-white tracking-wide">New Arrivals</span>
                            </div>

                            {/* Text Content */}
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                                Exotic Vegetables
                            </h3>
                            <p className="text-white/90 text-sm sm:text-base mb-8 max-w-md">
                                Discover our latest collection of premium vegetables
                            </p>

                            {/* Discount & Promo Code */}
                            <div className="flex flex-wrap items-baseline gap-3 mb-8">
                                <span className="text-4xl font-bold text-white tracking-tight">
                                    25% OFF
                                </span>
                                <span className="text-white/90 text-sm">
                                    Use code: <span className="font-bold text-white">FRESH25</span>
                                </span>
                            </div>

                            {/* Button */}
                            <button className="bg-white text-[#f73562] hover:bg-gray-50 transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 w-fit">
                                Explore Now
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}