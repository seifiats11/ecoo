
import img1 from '@/assets/home-slider.png';
import img2 from '@/assets/home-slider.png';
import img3 from '@/assets/home-slider.png';
import Slider from './_components/Slider/Slider';
import HomeFeatures from './_components/HomeFeatures/HomeFeatures';
import HomeCategory from './_components/HomeCategory/HomeCategory';
import PromoBanners from './_components/PromoBaners/Promo';
import ProductCard from './_components/ProductCard/ProductCard';
import { handleAllProducts } from '@/services/api.service';
import ContactUS from './_components/ContactUS/ContactUS';



export default async function Home() {
  const products = await handleAllProducts();

  return (
    <main className="w-full pb-10">

      <div className="w-full mb-8 sm:mb-12">
        <Slider imgs={[img1.src, img2.src, img3.src]} />
      </div>

      <HomeFeatures />
      {/* <HomeCategory /> */}
      <PromoBanners />

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">

        {/* Optional: A nice heading for the products section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-green-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Featured  <span className="text-green-600">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products?.data?.map((product: any) => {
            return (
              <ProductCard
                key={product._id}
                product={product} 
                />
            );
          })}

          {(!products?.data || products.data.length === 0) && (
            <div className="col-span-full py-10 text-center text-gray-500">
              No products found right now. Check back later!
            </div>
          )}
        </div>
      </div>

      <ContactUS />

    </main>
  );
}