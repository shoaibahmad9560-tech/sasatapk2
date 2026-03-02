import React from 'react';
import { Search, MapPin, ShoppingCart, Menu } from 'lucide-react';

const Header = ({ onMenuClick, cartCount = 0 }) => {
    return (
        <header className="flex flex-col relative z-30 font-sans shadow-md">
            {/* Top Nav: Dark Tech Gradient */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col sm:flex-row items-center justify-between px-4 py-2 sm:space-x-4 h-auto sm:h-[65px] space-y-2 sm:space-y-0 text-sm border-b border-gray-700">

                {/* Tech Logo */}
                <div className="flex items-center border border-transparent hover:border-gray-500 p-1 pr-2 rounded cursor-pointer shrink-0 transition-colors">
                    <span className="text-xl sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 uppercase">
                        SASTA <span className="font-light text-white">BAZAR PK</span>
                    </span>
                </div>

                {/* Location selector */}
                <div className="hidden lg:flex items-center border border-transparent hover:border-gray-500 p-1 rounded cursor-pointer h-12 w-auto shrink-0 transition-colors">
                    <MapPin size={20} className="mt-2 text-gray-400" />
                    <div className="flex flex-col leading-tight ml-2">
                        <span className="text-[11px] text-gray-400 tracking-wide uppercase">Deliver to</span>
                        <span className="text-sm font-bold text-gray-100 truncate max-w-[120px]">Multan, Pakistan</span>
                    </div>
                </div>

                {/* Premium Tech Search Bar */}
                <div className="flex-grow flex items-center rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-orange-500 h-10 w-full sm:w-auto shadow-inner">
                    <select className="bg-gray-100 text-gray-800 text-xs px-3 font-medium outline-none h-full border-r border-gray-300 cursor-pointer hidden md:block w-[140px] shrink-0 hover:bg-gray-200 transition-colors">
                        <option>All Categories</option>
                        <option>Smartphones</option>
                        <option>Tablets</option>
                        <option>Laptops</option>
                        <option>Desktops</option>
                        <option>Audio Gear</option>
                        <option>Wearables</option>
                        <option>Gaming Consoles</option>
                        <option>Photography</option>
                        <option>Power Banks</option>
                        <option>Cables</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search Premium Tech..."
                        className="w-full text-gray-900 px-4 h-full outline-none text-sm placeholder-gray-500 min-w-0"
                    />
                    <button className="bg-orange-500 py-2 px-5 hover:bg-orange-600 transition-colors flex items-center justify-center text-white border-none cursor-pointer h-full shrink-0">
                        <Search size={20} />
                    </button>
                </div>

                {/* Right side group */}
                <div className="flex items-center space-x-4 shrink-0 self-end sm:self-auto w-full sm:w-auto justify-end pl-2">
                    {/* Returns & Orders */}
                    <div className="hidden sm:flex flex-col justify-center leading-tight border border-transparent hover:border-gray-500 p-1.5 rounded cursor-pointer h-11 transition-colors">
                        <span className="text-[11px] font-normal text-gray-400 tracking-wide">Returns</span>
                        <span className="text-sm font-bold text-gray-100">& Orders</span>
                    </div>

                    {/* Cart */}
                    <div className="flex items-center border border-transparent hover:border-gray-500 p-1 rounded cursor-pointer h-11 relative transition-colors">
                        <div className="relative flex items-center">
                            <span className="absolute -top-1.5 left-4 text-orange-500 font-black text-[15px] w-5 text-center drop-shadow-md">{cartCount}</span>
                            <ShoppingCart size={32} strokeWidth={1.5} className="text-gray-100 mr-2" />
                            <span className="text-sm font-bold mt-1 hidden lg:block text-gray-100">Cart</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav: Secondary Dark Bar */}
            <div className="bg-gray-800 text-gray-200 text-sm flex items-center px-4 py-2 space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar whitespace-nowrap h-[45px] shadow-sm">
                <div
                    onClick={onMenuClick}
                    className="flex items-center gap-1.5 border border-transparent hover:border-gray-500 hover:text-white p-1 rounded cursor-pointer font-bold shrink-0 transition-colors"
                >
                    <Menu size={22} className="text-orange-500" /> All
                </div>
                {['Best Sellers', 'Today\'s Deals', 'Smartphones', 'Laptops & PCs', 'Audio & Headphones', 'Smartwatches', 'Cameras', 'Accessories', 'New Releases'].map(item => (
                    <div
                        key={item}
                        onClick={() => onCategorySelect && onCategorySelect(item)}
                        className="border border-transparent hover:border-gray-500 hover:text-white p-1 px-2 rounded cursor-pointer shrink-0 text-[13px] sm:text-[14px] font-medium transition-colors"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Header;
