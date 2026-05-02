
import SubcategoryCard from '@/app/_components/SubCategoryCard/SubCategoryCard';
import { log } from 'console';
import { ArrowLeft, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function CategoryPage(props) {

    const { id } = await props.params;
    async function getCategoryDetails() {

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        const data = await res.json();
        return data.data;

    }
    async function subCategories() {

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`);
        const data = await res.json();
        return data.data;
    }

    const categoryDetails = await getCategoryDetails()
    const subCategoriesData = await subCategories()

    console.log(subCategoriesData);

    return (
        <>
            {/* --- DYNAMIC HEADER SECTION --- */}
            <div className="w-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-8">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="text-white/60">/</span>
                        <Link href="/category" className="hover:text-white transition-colors">Categories</Link>
                        <span className="text-white/60">/</span>
                        <span className="text-white font-medium">{categoryDetails.name}</span>
                    </nav>

                    {/* Header Content */}
                    <div className="flex items-center gap-5">
                        {/* Dynamic Image Box */}
                        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl shrink-0 shadow-sm overflow-hidden p-2">
                            {categoryDetails.image ? (
                                <img
                                    src={categoryDetails.image}
                                    alt={categoryDetails.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-white" />
                            )}
                        </div>

                        {/* Dynamic Title */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1 sm:mb-2">
                                {categoryDetails.name}
                            </h1>
                            <p className="text-white/90 text-sm sm:text-base font-medium">
                                Choose a subcategory to browse products
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SUBCATEGORIES GRID --- */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/category" className="text-lg font-medium text-gray-600 mb-2 hover:text-green-500 transition-colors flex items-center gap-1">
                    <ArrowLeft></ArrowLeft>   Back to Categories
                </Link>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">40 Subcategories in {categoryDetails.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {
                        subCategoriesData.map((subcat: any) => {
                            return (
                                <Link href={`/subcategory/${subcat._id}`} key={subcat._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    <SubcategoryCard title={subcat.name} />
                                </Link>
                            );

                        }
                        )

                    }

                </div>
            </div>
        </>
    )
}
