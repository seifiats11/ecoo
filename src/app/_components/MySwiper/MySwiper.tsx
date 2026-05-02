'use client'
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function MySwiper({ images }: { images: string[] | undefined }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    if (!images || images.length === 0) return null;
    return (
        <div className="w-full">
            <Swiper
                style={{ '--swiper-navigation-color': '#475569', '--swiper-pagination-color': '#475569' } as React.CSSProperties}
                spaceBetween={10} navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mb-4 h-[400px] md:h-[500px] w-full border border-gray-200 overflow-hidden"
            >
                {images?.map((img, i) =>
                    <SwiperSlide key={img + i} className="flex items-center justify-center bg-white">
                        <img src={img} alt={`Product ${i}`} className="h-full w-full object-contain" />
                    </SwiperSlide>
                )}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper} spaceBetween={12} slidesPerView={4} freeMode={true} watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]} className="h-24 w-full"
            >
                {images?.map((img, i) =>
                    <SwiperSlide key={img + i} className="cursor-pointer overflow-hidden border border-gray-200 bg-white opacity-50 transition-opacity duration-300 hover:opacity-100 [&.swiper-slide-thumb-active]:opacity-100">
                        <img src={img} alt={`Thumbnail ${i}`} className="h-full w-full object-contain" />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}