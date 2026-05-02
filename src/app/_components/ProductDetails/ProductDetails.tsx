"use client";

import React, { useState, useContext } from "react";
import {
    ShoppingCart, Heart, Share2, Zap, Truck, RotateCcw,
    ShieldCheck, Check, ChevronRight, Home, Loader2
} from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MySwiper from "../MySwiper/MySwiper";
import { IProductDetails } from "@/interfaces/ProductDeatils.interface";

// ================= 1. استدعاءات الإضافة للعربة =================
import { addToCart } from "@/app/cart/cart.actions";
import { CartContext } from "@/app/_context/CartContext/CartContext";
import { toast } from "sonner";

export default function ProductDetailsView({ product }: { product: IProductDetails }) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");

    // ================= 2. حالات الإضافة للـ Cart =================
    const [isAdding, setIsAdding] = useState(false);
    const { setNumOfItems } = useContext(CartContext);

    if (!product) return null;

    const totalPrice = (product.price * quantity).toFixed(2);

    // ================= 3. دالة الإضافة للعربة =================
    const handleAddToCart = async () => {
        setIsAdding(true);

        // استدعاء الأكشن وإرسال الـ ID بتاع المنتج
        const result = await addToCart(product.id || product._id);

        if (result?.success) {
            // تحديث الرقم اللي في الـ Navbar
            if (result.data?.numOfCartItems) {
                setNumOfItems(result.data.numOfCartItems);
            }
            // إظهار رسالة النجاح
            toast.success("Product added to cart successfully!", {
                style: { color: "#009564" }
            });
        } else {
            // إظهار الإيرور لو حصل مشكلة
            toast.error(result?.message || "Failed to add product");
        }

        setIsAdding(false);
    };

    return (
        <div className="container mx-auto px-4 py-4 bg-gray-50/30 min-h-screen">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 overflow-x-auto whitespace-nowrap pb-2">
                <Home size={14} />
                <span className="cursor-pointer hover:text-[#009564]">Home</span>
                <ChevronRight size={14} />
                <span className="cursor-pointer hover:text-[#009564]">{product.category?.name || "Category"}</span>
                <ChevronRight size={14} />
                <span className="text-gray-900 font-medium truncate">{product.title}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 ">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* الجزء الأيسر: الصور */}
                    <div className="w-full lg:col-span-5 xl:col-span-4">
                        <MySwiper images={product.images?.length > 0 ? product.images : [product.imageCover]} />
                    </div>

                    {/* الجزء الأيمن: التفاصيل */}
                    <div className="flex flex-col lg:col-span-7 xl:col-span-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-emerald-50 text-[#009564] text-xs font-bold rounded-full">
                                {product.category?.name || "Category"}
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                                {product.brand?.name || "Brand"}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2 mb-6">
                            <Rating style={{ maxWidth: 100 }} value={product.ratingsAverage || 0} readOnly />
                            <span className="text-sm font-medium text-gray-700">{product.ratingsAverage}</span>
                            <span className="text-sm text-gray-500">({product.ratingsQuantity || 0} reviews)</span>
                        </div>

                        <div className="mb-4">
                            <span className="text-3xl font-black text-slate-900">{product.price} EGP</span>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#009564] text-xs font-bold rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#009564]"></span>
                                In Stock
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 pb-6 border-b border-gray-100">
                            {product.description || "Sole Material Rubber Colour Name RED Department Men"}
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-lg p-1 w-32 bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="flex-1 text-center font-semibold text-slate-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">173 available</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl mb-6">
                            <span className="text-gray-600 font-medium">Total Price:</span>
                            <span className="text-2xl font-extrabold text-[#009564]">{totalPrice} EGP</span>
                        </div>

                        <div className="flex flex-col gap-4 mb-8">
                            <div className="grid grid-cols-2 gap-4">

                                {/* ================= 4. زرار Add to Cart الجديد ================= */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className="flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-emerald-700 text-white h-12 md:h-14 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isAdding ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                                    {isAdding ? "Adding..." : "Add to Cart"}
                                </button>

                                <button className="flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white h-12 md:h-14 rounded-xl font-bold transition-all">
                                    <Zap size={20} />
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-[#009564] hover:text-[#009564] text-gray-700 h-12 rounded-xl font-medium transition-all bg-white">
                                    <Heart size={20} />
                                    Add to Wishlist
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-[#009564] hover:text-[#009564] text-gray-700 rounded-xl transition-all bg-white shrink-0">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-gray-100">
                            {/* شارات الثقة */}
                            <div className="flex gap-3 items-start">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#009564] shrink-0">
                                    <Truck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">Free Delivery</h4>
                                    <p className="text-xs text-gray-500">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#009564] shrink-0">
                                    <RotateCcw size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">30 Days Return</h4>
                                    <p className="text-xs text-gray-500">Money back</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#009564] shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900">Secure Payment</h4>
                                    <p className="text-xs text-gray-500">100% Protected</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* التبويبات زي ما هي بدون تعديل */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* أزرار التبويبات */}
                <div className="flex border-b border-gray-100 bg-gray-50/50 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "details" ? "border-[#009564] text-[#009564] bg-white" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <div className="w-4 h-4 rounded-sm bg-current opacity-20"></div> {/* أيقونة تعبيرية */}
                        Product Details
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "reviews" ? "border-[#009564] text-[#009564] bg-white" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Heart size={16} />
                        Reviews ({product.ratingsQuantity || 0})
                    </button>
                    <button
                        onClick={() => setActiveTab("shipping")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === "shipping" ? "border-[#009564] text-[#009564] bg-white" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Truck size={16} />
                        Shipping & Returns
                    </button>
                </div>

                {/* محتوى التبويبات */}
                <div className="p-6 md:p-8">

                    {/* محتوى التبويبات */}
                    <div className="p-6 md:p-8">

                        {/* ================= التاب الأول: التفاصيل ================= */}
                        {/* ================= التاب الأول: التفاصيل (Product Details) ================= */}
                        {activeTab === "details" && (
                            <div className="animate-in fade-in duration-500">
                                <h3 className="text-lg font-bold text-[#0f172a] mb-3">About this Product</h3>
                                <p className="text-slate-600 text-sm mb-6">
                                    {product.description || "Sole Material Rubber Colour Name RED Department Men"}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* كارت معلومات المنتج (Product Information) */}
                                    <div className="bg-[#f8f9fa] rounded-xl p-6">
                                        <h4 className="text-base font-bold text-[#0f172a] mb-5">Product Information</h4>
                                        <div className="space-y-4 text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Category</span>
                                                <span className="font-medium text-[#0f172a]">{product.category?.name || "Men's Fashion"}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Subcategory</span>
                                                {/* لو الـ API بيرجع Subcategory حطها هنا، غير كده سيبها ثابتة للتجربة */}
                                                <span className="font-medium text-[#0f172a]">Men's Clothing</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Brand</span>
                                                <span className="font-medium text-[#0f172a]">{product.brand?.name || "Puma"}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-500">Items Sold</span>
                                                <span className="font-medium text-[#0f172a]">{product.sold || "218+"} sold</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* كارت المميزات الرئيسية (Key Features) */}
                                    <div className="bg-[#f8f9fa] rounded-xl p-6">
                                        <h4 className="text-base font-bold text-[#0f172a] mb-5">Key Features</h4>
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Check size={18} className="text-[#009564]" strokeWidth={2.5} /> Premium Quality Product
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Check size={18} className="text-[#009564]" strokeWidth={2.5} /> 100% Authentic Guarantee
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Check size={18} className="text-[#009564]" strokeWidth={2.5} /> Fast & Secure Packaging
                                            </li>
                                            <li className="flex items-center gap-3 text-slate-600">
                                                <Check size={18} className="text-[#009564]" strokeWidth={2.5} /> Quality Tested
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* ================= التاب الثاني: التقييمات (Reviews) ================= */}
                        {activeTab === "reviews" && (
                            <div className="animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl">

                                    {/* الجزء الأيسر: رقم التقييم والنجوم */}
                                    <div className="md:col-span-4 flex flex-col items-center justify-center text-center md:border-r border-gray-200 md:pr-8">
                                        <span className="text-7xl font-extrabold text-[#0f172a] mb-2 leading-none">
                                            {product.ratingsAverage || "0.0"}
                                        </span>
                                        <div className="mb-2">
                                            <Rating style={{ maxWidth: 140 }} value={product.ratingsAverage || 0} readOnly />
                                        </div>
                                        <span className="text-sm text-gray-500 font-medium">
                                            Based on {product.ratingsQuantity || 0} reviews
                                        </span>
                                    </div>

                                    {/* الجزء الأيمن: خطوط النسب المئوية (Progress Bars) */}
                                    <div className="md:col-span-8 flex flex-col gap-3">
                                        {/* داتا النسب المئوية زي الصورة بالظبط */}
                                        {[
                                            { star: 5, pct: 25 },
                                            { star: 4, pct: 60 },
                                            { star: 3, pct: 25 },
                                            { star: 2, pct: 5 },
                                            { star: 1, pct: 5 }
                                        ].map((item) => (
                                            <div key={item.star} className="flex items-center gap-4">
                                                <span className="w-14 text-sm text-[#0f172a] font-medium text-right">
                                                    {item.star} star
                                                </span>
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    {/* الشريط الأصفر */}
                                                    <div
                                                        className="h-full bg-[#facc15] rounded-full"
                                                        style={{ width: `${item.pct}%` }}
                                                    ></div>
                                                </div>
                                                <span className="w-10 text-sm text-gray-500 text-right">
                                                    {item.pct}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ================= التاب الثالث: الشحن (Shipping & Returns) ================= */}
                        {activeTab === "shipping" && (
                            <div className="animate-in fade-in duration-500 space-y-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* كارت Shipping Information */}
                                    <div className="bg-[#eafaf1] rounded-2xl p-6 lg:p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-[#009564] text-white rounded-full flex items-center justify-center shrink-0">
                                                <Truck size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">Shipping Information</h3>
                                        </div>
                                        <ul className="space-y-4 text-sm text-slate-700 font-medium">
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Free shipping on orders over $50
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Standard delivery: 3-5 business days
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Express delivery available (1-2 business days)
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Track your order in real-time
                                            </li>
                                        </ul>
                                    </div>

                                    {/* كارت Returns & Refunds */}
                                    <div className="bg-[#eafaf1] rounded-2xl p-6 lg:p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-[#009564] text-white rounded-full flex items-center justify-center shrink-0">
                                                <RotateCcw size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">Returns & Refunds</h3>
                                        </div>
                                        <ul className="space-y-4 text-sm text-slate-700 font-medium">
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> 30-day hassle-free returns
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Full refund or exchange available
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Free return shipping on defective items
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Check size={18} className="text-[#009564]" strokeWidth={3} /> Easy online return process
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* بانر حماية المشتري (Buyer Protection Guarantee) */}
                                <div className="bg-[#f8f9fa] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-gray-100">
                                    <div className="w-14 h-14 bg-gray-200 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">Buyer Protection Guarantee</h3>
                                        <p className="text-sm text-gray-600">
                                            Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    );
}