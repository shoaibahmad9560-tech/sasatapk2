import React from 'react';
import { Star } from 'lucide-react';

const formatPKR = (amount) => {
    return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0
    }).format(amount);
};

const ProductCard = ({ product, onAddToCart }) => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full font-sans group relative">

            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded inline-block z-10 shadow-sm">
                    {discount}% OFF
                </div>
            )}

            {/* Product Image */}
            <div className="w-full h-48 sm:h-56 relative mb-4 p-4 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                <img
                    src={product.image}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://dummyimage.com/400x400/cccccc/000000&text=Sasta+Bazar+PK"; }}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mx-auto mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="flex flex-col flex-grow">
                {/* Brand & Category */}
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{product.brand}</span>
                    <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-sm">{product.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-blue-600 hover:text-orange-500 hover:underline cursor-pointer line-clamp-2 mb-1 min-h-[40px] leading-snug">
                    {product.title}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                        {product.description}
                    </p>
                )}

                {/* Ratings */}
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-500 drop-shadow-sm">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300 drop-shadow-none"}
                            />
                        ))}
                    </div>
                    <span className="text-blue-500 text-xs ml-1 font-bold hover:underline cursor-pointer">{product.reviews.toLocaleString()}</span>
                </div>

                {/* Delivery */}
                {product.deliveryTomorrow && (
                    <div className="text-xs font-bold text-gray-800 mb-2 flex items-center">
                        <span className="bg-orange-500 text-white text-[10px] px-1 py-0.5 rounded shadow-sm mr-1 tracking-wider uppercase">Prime</span>
                        <span>Get it by Tomorrow</span>
                    </div>
                )}

                <div className="mt-auto">
                    {/* Price */}
                    <div className="flex items-baseline mb-3">
                        <span className="text-xl font-bold text-gray-900 tracking-tight">{formatPKR(product.price)}</span>
                        {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through ml-2 font-medium">M.R.P: {formatPKR(product.originalPrice)}</span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={onAddToCart}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 font-bold py-2 px-4 rounded-full text-sm shadow-sm transition-colors focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
