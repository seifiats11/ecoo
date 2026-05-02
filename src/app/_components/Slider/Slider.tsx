'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider({ imgs }: { imgs: string[] }) {
    return (
        <div className="relative w-full h-[400px] md:h-[500px]">
            {/* Custom styles to override Swiper's default navigation and pagination to match your image */}
            <style>{`
                .swiper-button-next, .swiper-button-prev {
                    background-color: white;
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 50%;
                    color: #41CF60 !important; /* Green arrow */
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                     padding: 10px;
                    z-index: 10;
                }
                .swiper-button-next::after, .swiper-button-prev::after {
                    font-size: 28px !important;
                    font-weight: 900 !important;
                }
                .swiper-pagination-bullet {
                    background-color: white !important;
                    opacity: 1 !important;
                }
                .swiper-pagination-bullet-active {
                    background-color: white !important;
                    width: 24px !important;
                    border-radius: 12px !important;
                    opacity: 1 !important;
                    transition: width 0.3s ease;
                }
            `}</style>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full h-full"
            >
                {imgs.map((image, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">

                        {/* Background Image */}
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="absolute inset-0 w-full h-full "
                        />

                        {/* Green Translucent Overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 "></div>

                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="container mx-auto px-12 md:px-24">
                                <div className="max-w-xl">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                                        Premium Quality <br /> Guaranteed
                                    </h2>
                                    <p className="text-lg text-white/90 mb-8 font-medium">
                                        Fresh from farm to your table
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4">
                                        <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
                                            Shop Now
                                        </button>
                                        <button className="bg-transparent border border-white text-white font-bold px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}