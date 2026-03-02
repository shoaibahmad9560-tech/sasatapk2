import React, { useEffect } from 'react';
import { UserCircle, X, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay Background */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ease-in-out"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Content */}
            <div
                className={`fixed inset-y-0 left-0 w-[365px] sm:w-[380px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto flex flex-col shadow-2xl`}
            >
                {/* Header section with User */}
                <div className="bg-amazon-light_blue text-white p-4 flex items-center gap-3 sticky top-0 z-10 shrink-0">
                    <UserCircle size={30} className="text-white" />
                    <span className="text-lg font-bold">Hello, sign in</span>

                    {/* Close Button positioned outside */}
                    <button
                        onClick={onClose}
                        className={`fixed left-[375px] sm:left-[390px] top-4 text-white hover:text-gray-300 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <X size={32} />
                    </button>
                </div>

                {/* Scrollable Categories List */}
                <div className="py-2 text-amazon-default text-sm flex-grow bg-white">
                    <div className="border-b border-gray-300 py-3">
                        <h3 className="font-bold text-[18px] px-8 py-2">Trending</h3>
                        <ul className="flex flex-col">
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer antialiased font-[500] text-gray-700">Best Sellers</li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer antialiased font-[500] text-gray-700">New Releases</li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer antialiased font-[500] text-gray-700">Movers and Shakers</li>
                        </ul>
                    </div>

                    <div className="border-b border-gray-300 py-3">
                        <h3 className="font-bold text-[18px] px-8 py-2">Digital Content And Devices</h3>
                        <ul className="flex flex-col">
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Amazon miniTV - FREE entertainment
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Echo & Alexa
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Fire TV
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                        </ul>
                    </div>

                    <div className="py-3">
                        <h3 className="font-bold text-[18px] px-8 py-2">Shop By Category</h3>
                        <ul className="flex flex-col">
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Mobiles, Computers
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                TV, Appliances, Electronics
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Men's Fashion
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                            <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group font-[500] text-gray-700">
                                Women's Fashion
                                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-800" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
