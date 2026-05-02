import React from 'react'
import Link from 'next/link';
import CategoryHeader from '../_components/CategoryHeader/CategoryHeader';
export default async function page() {
    async function getAllCategories() {

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
        return data;
    }
    const categories = await getAllCategories();
    return (
        <div>
            <CategoryHeader />
            {/* Category List */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.data.map((category: any) => (
                        <Link href={`/category/${category._id}`} key={category._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                            <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
