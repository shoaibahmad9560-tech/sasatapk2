import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white p-5 flex flex-col relative z-20 shadow-sm animate-pulse">
            <div className="w-full h-48 md:h-56 bg-gray-200 mb-4 rounded-md"></div>

            <div className="flex-grow flex flex-col pt-2 border-t border-gray-100">
                {/* Title skeleton */}
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>

                {/* Ratings skeleton */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

                {/* Price skeleton */}
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>

                {/* Prime skeleton */}
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 mt-2"></div>

                {/* Button skeleton */}
                <div className="mt-auto w-full h-9 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export const SkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonCard;
