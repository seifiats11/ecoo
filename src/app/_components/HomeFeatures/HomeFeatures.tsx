import React from 'react';
import { Truck, Shield, RotateCcw, Headset } from 'lucide-react';

export default function Features() {
    const features = [
        {
            id: 1,
            icon: Truck,
            title: 'Free Shipping',
            subtitle: 'On orders over 500 EGP',
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            id: 2,
            icon: Shield,
            title: 'Secure Payment',
            subtitle: '100% secure transactions',
            iconColor: 'text-emerald-500',
            bgColor: 'bg-emerald-50',
        },
        {
            id: 3,
            icon: RotateCcw,
            title: 'Easy Returns',
            subtitle: '14-day return policy',
            iconColor: 'text-orange-500',
            bgColor: 'bg-orange-50',
        },
        {
            id: 4,
            icon: Headset,
            title: '24/7 Support',
            subtitle: 'Dedicated support team',
            iconColor: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },
    ];

    return (
        <section className="w-full py-8 bg-gray-50/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.id}
                                className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Circular Icon Container */}
                                <div className={`flex items-center justify-center w-14 h-14 rounded-full shrink-0 ${feature.bgColor}`}>
                                    <Icon className={`w-6 h-6 ${feature.iconColor}`} strokeWidth={2.5} />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col">
                                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-tight mb-1.5">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-snug">
                                        {feature.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}