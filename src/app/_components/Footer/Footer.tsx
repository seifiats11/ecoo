import Link from "next/link";
// UI icons from Lucide
import {
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  CreditCard
} from "lucide-react";
// Social media icons from React Icons (FontAwesome)
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/shop" },
        { name: "Categories", href: "/categories" },
        { name: "Brands", href: "/brands" },
        { name: "Electronics", href: "/category/electronics" },
        { name: "Men's Fashion", href: "/category/mens-fashion" },
        { name: "Women's Fashion", href: "/category/womens-fashion" },
      ],
    },
    {
      title: "Account",
      links: [
        { name: "My Account", href: "/profile" },
        { name: "Order History", href: "/orders" },
        { name: "Wishlist", href: "/wishlist" },
        { name: "Shopping Cart", href: "/cart" },
        { name: "Sign In", href: "/signin" },
        { name: "Create Account", href: "/signup" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Help Center", href: "/help" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns & Refunds", href: "/returns" },
        { name: "Track Order", href: "/track-order" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      subtitle: "On orders over 500 EGP",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "14-day return policy",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      subtitle: "100% secure checkout",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      subtitle: "Contact us anytime",
    },
  ];


  return (
    <footer >
      <div className="w-full bg-gradient-to-r from-[#f0fdf4] to-[#f4fdf8] py-8 border-y border-green-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-2">
                  {/* Icon Container */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e6f8ef]">
                    <Icon className="h-6 w-6 text-[#00b27b]" strokeWidth={2.5} />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col">
                    <h4 className="text-base font-semibold text-slate-900 leading-tight mb-0.5">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
      <div className="bg-[#0f172a] text-slate-300 w-full pt-16 pb-8">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">

            {/* Brand & Contact Info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Logo Badge */}
              <div className="bg-white inline-flex items-center gap-2 px-4 py-2.5 rounded-md self-start">
                <ShoppingCart className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  FreshCart
                </span>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
              </p>

              {/* Contact List */}
              <ul className="flex flex-col gap-4 mt-2">
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-sm">+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-sm">support@freshcart.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-tight max-w-[250px]">
                    123 Commerce Street, New York, NY 10001
                  </span>
                </li>
              </ul>

              {/* Social Icons using react-icons */}
              <div className="flex items-center gap-3 mt-4">
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-green-600 hover:text-white transition-colors">
                  <FaFacebookF className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-green-600 hover:text-white transition-colors">
                  <FaTwitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-green-600 hover:text-white transition-colors">
                  <FaInstagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 hover:bg-green-600 hover:text-white transition-colors">
                  <FaYoutube className="h-4 w-4" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-6">
                <h3 className="text-white font-semibold tracking-wide">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 hover:text-green-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">
              &copy; 2026 FreshCart. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4 text-slate-500">
              <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-default">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs font-medium">Visa</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-default">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs font-medium">Mastercard</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors cursor-default">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs font-medium">PayPal</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
