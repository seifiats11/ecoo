'use client'

import { addToCart } from '@/app/cart/cart.actions'
import { Plus } from 'lucide-react'
import React, { useState, useContext } from 'react'
import { toast } from 'sonner'
import { CartContext } from '@/app/_context/CartContext/CartContext'

export default function AddProductToCart({ productID }: { productID: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const { setNumOfItems } = useContext(CartContext);

    const handleAddToCart = async () => {
        setIsLoading(true);

        const result = await addToCart(productID);

        if (result?.success) {

            if (result.data?.numOfCartItems) {
                setNumOfItems(result.data.numOfCartItems);
            }

            toast.success("Product added to cart successfully!", {
                style: { color: "#009564" }
            });
        } else {
            toast.error(result?.message || "Failed to add product to cart");
        }

        setIsLoading(false);
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`w-11 h-11 cursor-pointer rounded-full bg-[#16A34A] text-white flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-50' : 'hover:bg-[#13813b]'}`}
            title="Add to Cart"
        >
            <Plus size={20} strokeWidth={2.5} className={isLoading ? 'animate-spin' : ''} />
        </button>
    )
}