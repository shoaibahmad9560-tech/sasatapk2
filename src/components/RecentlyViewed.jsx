import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { DUMMY_PRODUCTS } from '../data/products';

// Randomly select 15 items for the recently viewed carousel
const RECENT_ITEMS = [...DUMMY_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 15);

const RecentlyViewed = () => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -800, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 800, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white p-5 relative group mt-1">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Related to items you've viewed</h2>
                <a href="#" className="text-sm text-[#007185] hover:text-amazon-orange hover:underline">See more</a>
            </div>

            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.15)] border border-gray-200 w-10 h-16 flex items-center justify-center rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#007185]"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
                >
                    {RECENT_ITEMS.map((item) => (
                        <div key={item.id} className="min-w-[160px] h-[160px] md:min-w-[200px] md:h-[200px] flex-shrink-0 cursor-pointer object-cover flex justify-center items-center hover:bg-gray-50 transition-colors p-2 rounded border border-transparent hover:border-gray-200">
                            <img src={item.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://dummyimage.com/400x400/cccccc/000000&text=Sasta+Bazar+PK"; }} alt="Recent item" className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.15)] border border-gray-200 w-10 h-16 flex items-center justify-center rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#007185]"
                >
                    <ChevronRight size={24} className="text-gray-800" />
                </button>
            </div>
        </div>
    );
};

export default RecentlyViewed;
