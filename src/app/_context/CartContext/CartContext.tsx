"use client"; // لازم تتكتب هنا

import { ReactNode, createContext, useState } from "react"; // ✔️ الاستدعاء الصح من ريأكت

export const CartContext = createContext({
    numOfItems: 0,
    setNumOfItems: (num: number) => {} // دالة افتراضية لتجنب الأخطاء، هتتغير    في الـ Provider
});

export default function CartContextProvider({ children , data }: { children: ReactNode; data: any }) {

    const [numOfItems, setNumOfItems] = useState(data.numOfItems || 0);
    return (
        <CartContext.Provider value={{ numOfItems, setNumOfItems    }}>
            {children}
        </CartContext.Provider>
    );
}