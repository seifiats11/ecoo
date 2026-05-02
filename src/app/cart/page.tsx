import { getTheCart } from '@/services/api.service'
import React from 'react'
import CartPageDesign from '../_components/CartDesign/CartDesign' // تأكد من اسم ومسار الملف

export default async function CartPage() {
  const cartResponse = await getTheCart();
  
  // لو مفيش داتا، نعرض رسالة إن العربة فاضية
  if (!cartResponse || !cartResponse.data || !cartResponse.data.products || cartResponse.data.products.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Your Cart is Empty!</h2>
        <p className="text-slate-500">Looks like you haven't added anything to your cart yet.</p>
      </div>
    )
  }

  return (
    <div>
      {/* بنبعت العربة كلها كـ Prop مرة واحدة */}
      <CartPageDesign CartData={cartResponse} />
    </div>
  )
}