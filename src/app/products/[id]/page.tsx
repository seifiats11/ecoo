import ProductDetails from '@/app/_components/ProductDetails/ProductDetails';
import { handleSingleproducts } from '@/services/api.service';

export default async function ProductDetailsPage({ params }: any) {
    // 1. بنستنى الـ params عشان Next.js 15
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // 2. بننادي على دالة الـ fetch
    const details = await handleSingleproducts(id);
    
    // 3. بنفك التغليفة بتاعت الـ API
    const productData = details?.data || details;

    if (!productData) {
        return (
            <div className="container mx-auto px-4 pt-32 text-center text-red-500 font-bold text-2xl">
                Product not found!
            </div>
        );
    }

    return (
        <ProductDetails product={productData} />
    );
}