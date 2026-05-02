import React from 'react';
import { Folder } from 'lucide-react';

interface SubcategoryCardProps {
    title?: string;
}

export default function SubcategoryCard({ title }: SubcategoryCardProps) {
    return (
        <div className="group bg-white border border-gray-100 rounded-[1.25rem] p-6 w-full max-w-[220px] cursor-pointer  transition-all duration-300">

            {/* Icon Container */}
            <div className="w-14 h-14 bg-[#f0fdf4] rounded-2xl flex items-center justify-center mb-5">
                <Folder
                    className="w-7 h-7 text-[#16a34a] group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor" // This makes the Lucide icon solid
                    strokeWidth={1.5}
                />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#16a34a] transition-colors leading-snug whitespace-pre-line">
                {title}
            </h3>

        </div>
    );
}