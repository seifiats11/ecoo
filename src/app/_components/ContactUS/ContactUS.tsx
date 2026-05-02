import React from 'react';
import {
    Mail,
    Leaf,
    Truck,
    Tag,
    ArrowRight,
    Sparkles,
    Smartphone,
    Star
} from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function ContactUS() {
    return (
        <section className="w-full py-12 bg-white">
            <div className="container mx-auto px-4 lg:px-8">

                {/* Main Banner Container */}
                <div className="bg-[#f2fdf5] rounded-[2rem] p-8 lg:p-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">

                    {/* LEFT SIDE: Newsletter Form */}
                    <div className="flex-1 w-full max-w-2xl">

                        {/* Header Badge */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#00b27b] rounded-2xl flex items-center justify-center shadow-sm">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#00b27b] font-bold text-sm tracking-wider uppercase">
                                    Newsletter
                                </span>
                                <span className="text-gray-500 text-sm">
                                    50,000+ subscribers
                                </span>
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
                            Get the Freshest Updates <br className="hidden sm:block" />
                            <span className="text-[#00b27b]">Delivered Free</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Weekly recipes, seasonal offers & exclusive member perks.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <div className="bg-white border border-green-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                                <div className="bg-green-100 rounded-full p-1">
                                    <Leaf className="h-3.5 w-3.5 text-[#00b27b]" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Fresh Picks Weekly</span>
                            </div>
                            <div className="bg-white border border-green-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                                <div className="bg-green-100 rounded-full p-1">
                                    <Truck className="h-3.5 w-3.5 text-[#00b27b]" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Free Delivery Codes</span>
                            </div>
                            <div className="bg-white border border-green-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm">
                                <div className="bg-green-100 rounded-full p-1">
                                    <Tag className="h-3.5 w-3.5 text-[#00b27b]" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Members-Only Deals</span>
                            </div>
                        </div>

                        {/* Input Form */}
                        <form className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mb-3">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="flex-1 rounded-xl border border-gray-200 px-5 py-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00b27b] focus:border-transparent bg-white shadow-sm"
                            />
                            <button
                                type="submit"
                                className="bg-[#00b27b] hover:bg-[#009b6a] text-white rounded-xl px-8 py-4 font-semibold flex items-center justify-center gap-2 transition-colors shadow-md sm:w-auto w-full shrink-0"
                            >
                                Subscribe
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>

                        {/* Disclaimer Text */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-2">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                            <span>Unsubscribe anytime. No spam, ever.</span>
                        </div>

                    </div>

                    {/* RIGHT SIDE: Mobile App Promo Card */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <div className="bg-[#1e2433] rounded-[2rem] p-8 shadow-xl relative overflow-hidden">

                            {/* Subtle background glow effect (optional, mimics the design's depth) */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b27b] opacity-10 blur-3xl rounded-full"></div>

                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 bg-[#143d32] border border-[#1e5c4a] rounded-full px-3 py-1 mb-6">
                                <Smartphone className="h-3.5 w-3.5 text-[#00b27b]" />
                                <span className="text-xs font-bold text-[#00b27b] tracking-wide uppercase">
                                    Mobile App
                                </span>
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Shop Faster on Our App
                            </h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                Get app-exclusive deals & 15% off your first order.
                            </p>

                            {/* App Store Buttons */}
                            <div className="flex flex-col gap-3 mb-8">
                                <button className="bg-[#2d3546] hover:bg-[#384256] border border-[#384256] rounded-xl p-3 flex items-center gap-4 transition-colors">
                                    <FaApple className="h-8 w-8 text-white ml-2" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Download on</span>
                                        <span className="text-lg text-white font-semibold leading-tight">App Store</span>
                                    </div>
                                </button>

                                <button className="bg-[#2d3546] hover:bg-[#384256] border border-[#384256] rounded-xl p-3 flex items-center gap-4 transition-colors">
                                    <FaGooglePlay className="h-7 w-7 text-white ml-2" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Get it on</span>
                                        <span className="text-lg text-white font-semibold leading-tight">Google Play</span>
                                    </div>
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3 border-t border-slate-700/50 pt-6">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    ))}
                                </div>
                                <span className="text-xs font-medium text-slate-300">
                                    <span className="text-white">4.9</span> • 100K+ downloads
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}