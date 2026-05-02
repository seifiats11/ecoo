import { getTheCart } from '@/services/api.service';
import { redirect } from 'next/navigation';
import CheckoutDesign from '../_components/CheckoutDesign/CheckoutDesign';

export default async function CheckoutPage() {
    const cartResponse = await getTheCart();

    // لو مفيش عربة أو فاضية، نرجعه لصفحة المنتجات
    if (!cartResponse || !cartResponse.data || cartResponse.data.products.length === 0) {
        redirect('/products');
    }

    return (
        <div className="bg-gray-50/50 min-h-screen">
            {/* بنبعت داتا العربة بالكامل للتصميم */}
            <CheckoutDesign cartData={cartResponse.data} cartId={cartResponse.cartId || cartResponse.data._id} />
        </div>
    );
}