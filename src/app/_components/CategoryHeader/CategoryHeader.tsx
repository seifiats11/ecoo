import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function CategoryHeader() {
    return (
        <div className="w-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] py-12 md:py-16">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <span className="text-white/60">/</span>
                    <span className="text-white font-medium">Categories</span>
                </nav>

                {/* Main Header Content */}
                <div className="flex items-center gap-5">

                    {/* Icon Box */}
                    <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl shrink-0 shadow-sm">
                        <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1 sm:mb-2">
                            All Categories
                        </h1>
                        <p className="text-white/90 text-sm sm:text-base font-medium">
                            Browse our wide range of product categories
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}