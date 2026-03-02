import React, { useState } from 'react';
import { Star, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const AdvancedFilters = ({
    selectedBrands, setSelectedBrands,
    setMinPrice, setMaxPrice,
    setMinRating,
    deliveryTomorrow, setDeliveryTomorrow,
    setSelectedCategory
}) => {
    const [expandedBrands, setExpandedBrands] = useState(false);

    // Local state for custom price inputs before applying
    const [localMinPrice, setLocalMinPrice] = useState("");
    const [localMaxPrice, setLocalMaxPrice] = useState("");

    const [openSections, setOpenSections] = useState({
        delivery: true, category: true, review: true, brands: true, price: true, condition: true
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleBrandToggle = (brand) => {
        setSelectedBrands(prev => {
            if (prev.includes(brand)) return prev.filter(b => b !== brand);
            return [...prev, brand];
        });
    };

    const handlePriceRangeClick = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        setLocalMinPrice(min || "");
        setLocalMaxPrice(max || "");
    };

    const handleCustomPriceApply = () => {
        setMinPrice(localMinPrice);
        setMaxPrice(localMaxPrice);
    };

    const BRANDS = [
        'Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'HP', 'Dell', 'Sony', 'JBL', 'Logitech'
    ];

    const visibleBrands = expandedBrands ? BRANDS : BRANDS.slice(0, 5);

    return (
        <div className="w-full h-full pb-10 bg-white font-sans">

            {/* Header */}
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-4 border-b border-gray-200">
                <Filter size={20} className="text-orange-500" />
                <h2 className="font-bold text-lg text-gray-900 tracking-tight">Filters</h2>
            </div>

            <div className="px-4">
                {/* Delivery */}
                <div className="mb-6 border-b border-gray-100 pb-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('delivery')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Delivery Speed</h3>
                        {openSections.delivery ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.delivery && (
                        <label className="flex items-start space-x-3 cursor-pointer group mt-2 p-2 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-200">
                            <div className="relative flex items-center pt-0.5">
                                <input
                                    type="checkbox"
                                    checked={deliveryTomorrow}
                                    onChange={(e) => setDeliveryTomorrow(e.target.checked)}
                                    className="w-[18px] h-[18px] text-orange-500 rounded-sm border-gray-300 focus:ring-orange-500 cursor-pointer"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-gray-800">Get It by Tomorrow</span>
                                <span className="text-[12px] text-gray-500">Orders placed before 5 PM</span>
                            </div>
                        </label>
                    )}
                </div>

                {/* Category */}
                <div className="mb-6 border-b border-gray-100 pb-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('category')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Department</h3>
                        {openSections.category ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.category && (
                        <ul className="text-[14px] space-y-2 mt-2 text-gray-700 font-medium tracking-tight">
                            <li
                                className="font-bold text-gray-900 border-l-2 border-orange-500 pl-2 -ml-2 cursor-pointer hover:text-orange-500"
                                onClick={() => setSelectedCategory("All")}
                            >Electronics</li>
                            <li className="ml-3 hover:text-orange-500 cursor-pointer transition-colors active:font-bold">Mobiles & Accessories</li>
                            <li
                                className="ml-5 hover:text-orange-500 cursor-pointer transition-colors text-gray-500"
                                onClick={() => setSelectedCategory("Smartphones")}
                            >Smartphones</li>
                            <li className="ml-3 hover:text-orange-500 cursor-pointer transition-colors active:font-bold" onClick={() => setSelectedCategory("Laptops & PCs")}>Computers & Laptops</li>
                            <li className="ml-3 hover:text-orange-500 cursor-pointer transition-colors active:font-bold" onClick={() => setSelectedCategory("Smartwatches")}>Wearables & Gadgets</li>
                        </ul>
                    )}
                </div>

                {/* Customer Review */}
                <div className="mb-6 border-b border-gray-100 pb-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('review')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Customer Reviews</h3>
                        {openSections.review ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.review && (
                        <div className="space-y-1 mt-2">
                            {[4, 3, 2, 1].map((rating) => (
                                <div
                                    key={rating}
                                    onClick={() => setMinRating(rating)}
                                    className="flex items-center cursor-pointer group hover:bg-gray-50 p-1.5 rounded-md -ml-1.5 transition-colors"
                                >
                                    <div className="flex text-yellow-500 drop-shadow-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={18}
                                                fill={star <= rating ? "currentColor" : "none"}
                                                className={star <= rating ? "text-yellow-500" : "text-gray-300 drop-shadow-none"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[14px] ml-2 text-gray-700 group-hover:text-orange-500 group-hover:font-medium">& Up</span>
                                </div>
                            ))}
                            {/* Clear rating filter */}
                            <div
                                onClick={() => setMinRating(0)}
                                className="text-sm text-blue-600 hover:text-orange-500 cursor-pointer ml-1 mt-2 hover:underline"
                            >
                                Clear Rating Filter
                            </div>
                        </div>
                    )}
                </div>

                {/* Brands */}
                <div className="mb-6 border-b border-gray-100 pb-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('brands')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Premium Brands</h3>
                        {openSections.brands ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.brands && (
                        <div className="space-y-2 mt-2">
                            {visibleBrands.map(brand => (
                                <label key={brand} className="flex items-start space-x-3 cursor-pointer group">
                                    <div className="relative flex items-center pt-[2px]">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandToggle(brand)}
                                            className="w-[16px] h-[16px] text-orange-500 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-[14px] text-gray-700 group-hover:text-orange-500 transition-colors font-medium">{brand}</span>
                                </label>
                            ))}
                            {!expandedBrands && (
                                <button
                                    onClick={() => setExpandedBrands(true)}
                                    className="text-blue-600 hover:text-orange-500 text-[13px] hover:underline flex items-center font-bold mt-3 ml-1"
                                >
                                    <ChevronDown size={14} className="mr-1 mt-0.5" /> See more
                                </button>
                            )}
                            {expandedBrands && (
                                <button
                                    onClick={() => setExpandedBrands(false)}
                                    className="text-blue-600 hover:text-orange-500 text-[13px] hover:underline flex items-center font-bold mt-3 ml-1"
                                >
                                    <ChevronUp size={14} className="mr-1 mt-0.5" /> See less
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="mb-6 border-b border-gray-100 pb-5">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('price')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Price Range</h3>
                        {openSections.price ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.price && (
                        <>
                            <ul className="text-[14px] space-y-2 text-gray-700 mt-2 font-medium tracking-tight">
                                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => handlePriceRangeClick("", 5000)}>Under PKR 5,000</li>
                                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => handlePriceRangeClick(5000, 20000)}>PKR 5,000 - PKR 20,000</li>
                                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => handlePriceRangeClick(20000, 50000)}>PKR 20,000 - PKR 50,000</li>
                                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => handlePriceRangeClick(50000, 100000)}>PKR 50,000 - PKR 100,000</li>
                                <li className="hover:text-orange-500 cursor-pointer transition-colors" onClick={() => handlePriceRangeClick(100000, "")}>Over PKR 100,000</li>
                                <li className="text-blue-600 hover:text-orange-500 cursor-pointer hover:underline text-[13px] mt-1" onClick={() => handlePriceRangeClick("", "")}>Clear Price Filter</li>
                            </ul>

                            {/* Custom Price Range UI */}
                            <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <p className="text-[11px] text-gray-500 mb-2 font-bold uppercase tracking-wider">Custom Range (PKR)</p>
                                <div className="flex items-center gap-2">
                                    <div className="relative w-full">
                                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rs</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={localMinPrice}
                                            onChange={(e) => setLocalMinPrice(e.target.value)}
                                            className="w-full pl-7 pr-2 py-1.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-inner"
                                        />
                                    </div>
                                    <span className="text-gray-400 font-bold">-</span>
                                    <div className="relative w-full">
                                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rs</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={localMaxPrice}
                                            onChange={(e) => setLocalMaxPrice(e.target.value)}
                                            className="w-full pl-7 pr-2 py-1.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleCustomPriceApply}
                                    className="w-full mt-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-1.5 rounded text-sm shadow-sm hover:bg-gray-100 hover:shadow transition-all focus:ring-2 focus:ring-orange-500 outline-none"
                                >
                                    Apply Price
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Item Condition */}
                <div className="mb-4">
                    <div
                        className="flex justify-between items-center cursor-pointer group mb-3"
                        onClick={() => toggleSection('condition')}
                    >
                        <h3 className="font-bold text-[14px] text-gray-800 tracking-wide uppercase">Condition</h3>
                        {openSections.condition ? <ChevronUp size={16} className="text-gray-400 group-hover:text-gray-800" /> : <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-800" />}
                    </div>
                    {openSections.condition && (
                        <ul className="text-[14px] space-y-2 text-gray-700 font-medium mt-2">
                            <li className="hover:text-orange-500 cursor-pointer transition-colors active:font-bold">New</li>
                            <li className="hover:text-orange-500 cursor-pointer transition-colors active:font-bold">Renewed / Refurbished</li>
                            <li className="hover:text-orange-500 cursor-pointer transition-colors active:font-bold">Used - Like New</li>
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdvancedFilters;
