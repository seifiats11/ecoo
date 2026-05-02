import { handleAllBrands } from '@/services/api.service';
import React from 'react'
import BrandContent from '../_components/BrandContent/BrandContent';
import { Tag } from 'lucide-react';
import Link from 'next/link';
export default async function Brands({ params }: any) {

  const details = await handleAllBrands();
  const brandsArray = details?.data || [];

  if (!brandsArray || brandsArray.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-32 text-center text-red-500 font-bold text-2xl">
        No brands found!
      </div>
    );
  }

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] py-10 md:py-16 mb-10">
        <div className="container mx-auto px-4">

          <div className="text-white/80 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-bold">Brands</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-sm backdrop-blur-sm">
              <Tag
                className="text-white w-8 h-8 md:w-10 md:h-10"
                fill="currentColor"
                strokeWidth={2}
              />
            </div>

            {/* النصوص */}
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/90 text-sm md:text-base font-medium">
                Shop from your favorite brands
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {brandsArray.map((brandItem: any) => (
            <BrandContent key={brandItem._id} brand={brandItem} />
          ))}
        </div>
      </div>

    </div>
  )
}
