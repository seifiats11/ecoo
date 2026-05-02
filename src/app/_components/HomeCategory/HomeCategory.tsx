import React from 'react';
import Link from 'next/link';
import music from '@/assets/Music.webp'
import mensFashion from '@/assets/Fachion.webp'
import womensFashion from '@/assets/WFashion.webp'
import SuperMarket from '@/assets/SuperMarket.webp'
import BabyToys from '@/assets/Baby.webp'
import Home from '@/assets/Home.webp'
import Books from '@/assets/Books.webp'
import Beauty from '@/assets/Beauty.webp'
import Mobiles from '@/assets/Mobiles.webp'
import Electronics from '@/assets/Electronics.webp'

import { ArrowRight } from 'lucide-react';

export default function CategorySection() {
    const categories = [
        { id: 1, name: 'Music', imageSrc: music.src, bgColor: 'bg-transparent' },
        { id: 2, name: "Men's Fashion", imageSrc: mensFashion.src, bgColor: 'bg-gray-100' },
        { id: 3, name: "Women's Fashion", imageSrc: womensFashion.src, bgColor: 'bg-gray-100' },
        { id: 4, name: 'SuperMarket', imageSrc: SuperMarket.src, bgColor: 'bg-green-50' },
        { id: 5, name: 'Baby & Toys', imageSrc: BabyToys.src, bgColor: 'bg-orange-50' },
        { id: 6, name: 'Home', imageSrc: Home.src, bgColor: 'bg-[#D2B48C]' }, // Approximated brown/tan
        { id: 7, name: 'Books', imageSrc: Books.src, bgColor: 'bg-[#A3C184]' }, // Approximated green
        { id: 8, name: 'Beauty & Health', imageSrc: Beauty.src, bgColor: 'bg-[#F2D7B6]' }, // Approximated beige
        { id: 9, name: 'Mobiles', imageSrc: Mobiles.src, bgColor: 'bg-[#1F3D47]' }, // Approximated dark teal
        { id: 10, name: 'Electronics', imageSrc: Electronics.src, bgColor: 'bg-transparent' },
    ];

    return (
        <section className="w-full py-10 bg-white ">
            <div className="container mx-auto px-4 lg:px-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">

                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Shop By <span className="text-green-600">Category</span>
                        </h2>
                    </div>

                    <Link
                        href="/category"
                        className="group flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                    >
                        View All Categories
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                            className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-300 rounded-2xl hover:border-green-100 hover:shadow-md transition-all duration-300"
                        >
                            {/* Circular Image Container */}
                            <div
                                className={`w-[88px] h-[88px] rounded-full flex items-center justify-center mb-4 overflow-hidden ${category.bgColor} transition-transform duration-300 group-hover:scale-105`}
                            >
                                {/* Fallback styling for the placeholder. 
                    Replace src with category.imageSrc when you have the images */}
                                <img
                                    src={category.imageSrc}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Category Name */}
                            <span className="text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-green-600 transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}