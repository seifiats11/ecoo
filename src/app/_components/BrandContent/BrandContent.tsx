"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function BrandCard({ brand }: { brand: any }) {
    return (
        <Link
            href={`/brands/${brand._id}`}
            // 1. غيرنا هنا لـ group/card
            className="group/card flex flex-col bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] hover:border-[#8b5cf6]/30 hover:-translate-y-1 transition-all duration-300 h-full"
        >
            {/* المربع الرمادي الداخلي */}
            <div className="w-full aspect-square bg-[#f8f9fa] rounded-xl flex items-center justify-center p-6 mb-4 overflow-hidden">
                <img
                    src={brand.image}
                    alt={brand.name}
                    // 2. غيرنا هنا لـ group-hover/card
                    className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-110 transition-transform duration-500"
                />
            </div>

            {/* منطقة النصوص */}
            <div className="flex flex-col items-center justify-center flex-1">

                {/* اسم البراند */}
                <h3 className="text-sm font-bold text-slate-800 group-hover/card:text-[#8b5cf6] transition-colors duration-300">
                    {brand.name}
                </h3>

                {/* جملة View Products */}
                <div className="flex items-center gap-1 text-[13px] font-semibold text-[#8b5cf6] overflow-hidden opacity-0 max-h-0 group-hover/card:max-h-8 group-hover/card:opacity-100 group-hover/card:mt-2 transition-all duration-300">
                    View Products <ArrowRight size={14} className="group-hover/card:translate-x-1 transition-transform duration-300" />
                </div>

            </div>
        </Link>
    );
}