"use client";

import React, { useContext } from "react";
import Link from "next/link";
import {
    Truck, Gift, Phone, Mail, User, UserPlus, ShoppingCart, Search,
    ChevronDown, Heart, Menu, ShoppingBagIcon, Package, MapPin, Settings, LogOut
} from "lucide-react";
import { FaHeadset } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ================= استدعاءات اللوجيك =================
import { useSession, signOut } from "next-auth/react";
import { CartContext } from "@/app/_context/CartContext/CartContext";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    // ================= اللوجيك =================
    const session = useSession();
    const isLoggedIn = session.status === 'authenticated';
    const { numOfItems } = useContext(CartContext);

    async function handleLogout() {
        await signOut({
            redirect: true,
            callbackUrl: '/login'
        });
    }

    return (
        // التعديل هنا: استخدمنا sticky و z-50 في الأب الرئيسي وشيلنا fixed والـ margin
        <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm flex flex-col">
            
            {/* Top Header Bar - Visible on Tablet and Desktop */}
            <div className="hidden md:flex w-full border-b border-gray-100 bg-gray-50/50">
                <div className="w-full mx-4 px-4 h-10 flex items-center justify-between text-xs text-muted-foreground">
                    {/* Top Left */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-green-600" />
                            <span className="hidden lg:inline">Free Shipping on Orders 500 EGP</span>
                            <span className="lg:hidden">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Gift className="h-4 w-4 text-green-600" />
                            <span>New Arrivals Daily</span>
                        </div>
                    </div>

                    {/* Top Right */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>+1 (800) 123-4567</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>support@freshcart.com</span>
                        </div>
                        <div className="h-4 w-[1px] bg-gray-300 mx-1 lg:mx-2 hidden md:block"></div>
                        
                        {/* لوجيك الشريط العلوي: لو مسجل دخول نظهر اسم حسابه، لو لأ نظهر تسجيل الدخول */}
                        {isLoggedIn ? (
                            <Link href="/profile" className="flex items-center gap-2 hover:text-green-600 transition-colors text-green-700 font-semibold">
                                <User className="h-4 w-4" />
                                <span>My Account</span>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                                    <User className="h-4 w-4" />
                                    <span>Sign In</span>
                                </Link>
                                <Link href="/register" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                                    <UserPlus className="h-4 w-4" />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            {/* التعديل هنا: شيلنا الـ sticky من الـ div الداخلي عشان ميتعارضش مع الأب */}
            <div className="w-full px-4 py-4 flex items-center justify-between gap-4 xl:gap-8 bg-white">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0 text-green-600">
                    <ShoppingBagIcon className="w-8 h-8" />
                    <span className="text-2xl font-extrabold text-gray-900 tracking-tight hidden sm:block">FreshCart</span>
                </Link>

                {/* Search Bar - Visible on Tablet & Desktop */}
                <div className="relative flex-1 max-w-xl hidden md:block">
                    <Input
                        type="text"
                        placeholder="Search for products, brands and more..."
                        className="w-full pl-5 pr-14 py-6 rounded-full border-gray-200 bg-gray-50/50 focus-visible:ring-1 focus-visible:ring-green-600"
                    />
                    <Button
                        size="icon"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-green-600 hover:bg-green-700 text-white"
                    >
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                </div>

                {/* Navigation Links - Desktop Only */}
                <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700 shrink-0">
                    <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-green-600 transition-colors">Shop</Link>
                    <Link href="/categories" className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        Categories <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Link>
                    <Link href="/brands" className="hover:text-green-600 transition-colors">Brands</Link>
                </nav>

                {/* Right Section: Support, Actions, and Auth */}
                <div className="flex items-center gap-4 shrink-0">

                    {/* Support Widget - Visible on Tablet & Desktop */}
                    <Link href="/support" className="hidden xl:flex items-center gap-3 border-r pr-4 lg:pr-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                            <FaHeadset className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-400">Support</span>
                            <span className="text-sm font-bold text-gray-700 leading-tight">24/7 Help</span>
                        </div>
                    </Link>

                    {/* Action Icons */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Link href="/wishlist" className="text-gray-500 hover:text-green-600 transition-colors">
                            <Heart className="h-6 w-6" />
                        </Link>
                        
                        {/* ================= أيقونة العربة مع الدايرة الحمراء ================= */}
                        <Link href="/cart" className="text-gray-500 hover:text-green-600 transition-colors relative">
                            <ShoppingCart className="h-6 w-6" />
                            {numOfItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                    {numOfItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* ================= أزرار تسجيل الدخول / القائمة المنسدلة ================= */}
                    {isLoggedIn ? (
                        <div className="hidden md:block ml-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2 rounded-full border-gray-200 hover:border-green-600 hover:text-green-600 transition-colors px-4">
                                        <User className="h-4 w-4" />
                                        <span className="hidden lg:inline">Account</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2">
                                    <DropdownMenuLabel className="font-bold text-slate-800">
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem asChild className="cursor-pointer hover:text-green-600 focus:text-green-600 focus:bg-green-50 rounded-lg">
                                        <Link href="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:text-green-600 focus:text-green-600 focus:bg-green-50 rounded-lg">
                                        <Link href="/orders"><Package className="mr-2 h-4 w-4" /> Orders</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:text-green-600 focus:text-green-600 focus:bg-green-50 rounded-lg">
                                        <Link href="/wishlist"><Heart className="mr-2 h-4 w-4" /> Wishlist</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:text-green-600 focus:text-green-600 focus:bg-green-50 rounded-lg">
                                        <Link href="/address"><MapPin className="mr-2 h-4 w-4" /> Address</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:text-green-600 focus:text-green-600 focus:bg-green-50 rounded-lg">
                                        <Link href="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg font-semibold">
                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2 ml-2">
                            <Button asChild variant="ghost" className="hover:bg-green-50 hover:text-green-600 font-semibold">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 font-semibold shadow-sm shadow-green-200">
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Hamburger Menu - Visible ONLY on Mobile */}
                    <Button
                        size="icon"
                        className="md:hidden h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center ml-1"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                </div>
            </div>
        </header>
    );
}