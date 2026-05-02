'use client'

import Link from 'next/link'
import { ShoppingCart, Search, Heart, Menu, User, Package, MapPin, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

// استدعاء مكونات القائمة المنسدلة من Shadcn
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext } from 'react'
import { CartContext } from '@/app/_context/CartContext/CartContext'
const Navbar = () => {
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
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
            <nav className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* 1. شعار FreshCart */}
                <Link href="/" className="flex items-center gap-x-2 no-underline">
                    <div className="relative text-[#009564]">
                        <ShoppingCart size={28} className='stroke-current' />
                    </div>
                    <span className="text-2xl font-extrabold text-gray-900 tracking-tight">FreshCart</span>
                </Link>

                {/* 2. روابط التنقل */}
                <div className="hidden lg:flex items-center gap-x-10">
                    <Link href="/" className="font-bold text-gray-700 hover:text-[#009564] transition-colors">Home</Link>
                    <Link href="/products" className="font-bold text-gray-700 hover:text-[#009564] transition-colors">Shop</Link>
                    <Link href="/categories" className="font-bold text-gray-700 hover:text-[#009564] transition-colors">Categories</Link>
                    <Link href="/brands" className="font-bold text-gray-700 hover:text-[#009564] transition-colors">Brands</Link>
                </div>

                {/* 3. الجانب الأيمن: أيقونات العمليات والأزرار */}
                <div className="flex items-center gap-x-6">
                    <Button variant="ghost" size="icon" className="lg:hidden text-gray-700 hover:text-[#009564]">
                        <Menu size={24} />
                    </Button>

                    <Link href="#" className="text-gray-700 hover:text-[#009564] transition-colors">
                        <Search size={24} strokeWidth={1.5} />
                    </Link>

                    {/* إظهار أيقونة المفضلة فقط لو اليوزر مسجل دخول أو ممكن تسيبها للكل حسب رغبتك */}
                    <Link href="/wishlist" className="text-gray-700 hover:text-[#009564] transition-colors">
                        <Heart size={24} strokeWidth={1.5} />
                    </Link>

                    <Link href="/cart" className="relative text-gray-700 hover:text-[#009564] transition-colors">
                        <ShoppingCart size={24} strokeWidth={1.5} />
                        
                        {/* نظهر الدايرة دي بس لو في منتجات في العربة */}
                        {numOfItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                {numOfItems}
                            </span>
                        )}
                    </Link>

                    {/* الشرط الخاص بتسجيل الدخول */}
                    {isLoggedIn ? (
                        /* القائمة المنسدلة للمستخدم المسجل */
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-[#009564] transition-colors">
                                    <User size={22} strokeWidth={2} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2">
                                <DropdownMenuLabel className="font-bold text-slate-800">
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild className="cursor-pointer hover:text-[#009564] focus:text-[#009564] focus:bg-emerald-50 rounded-lg">
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" /> Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild className="cursor-pointer hover:text-[#009564] focus:text-[#009564] focus:bg-emerald-50 rounded-lg">
                                    <Link href="/orders">
                                        <Package className="mr-2 h-4 w-4" /> Orders
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild className="cursor-pointer hover:text-[#009564] focus:text-[#009564] focus:bg-emerald-50 rounded-lg">
                                    <Link href="/wishlist">
                                        <Heart className="mr-2 h-4 w-4" /> Wishlist
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild className="cursor-pointer hover:text-[#009564] focus:text-[#009564] focus:bg-emerald-50 rounded-lg">
                                    <Link href="/address">
                                        <MapPin className="mr-2 h-4 w-4" /> Address
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild className="cursor-pointer hover:text-[#009564] focus:text-[#009564] focus:bg-emerald-50 rounded-lg">
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" /> Settings
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />


                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg font-semibold"
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        /* أزرار التسجيل للمستخدم غير المسجل */
                        <div className="hidden md:flex items-center gap-x-3">
                            <Button variant="outline" asChild className="border-gray-900 text-gray-900 hover:bg-gray-100/50 hover:text-gray-900 font-semibold">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="bg-[#009564] hover:bg-emerald-700 text-white font-semibold">
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>

            </nav>
        </header>
    )
}

export default Navbar