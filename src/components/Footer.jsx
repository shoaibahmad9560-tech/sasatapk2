import React from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full mt-10 z-20 relative">
            {/* Back to top */}
            <div
                onClick={scrollToTop}
                className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-center py-4 cursor-pointer text-[13px] font-[500] tracking-wider transition-colors"
            >
                Back to top
            </div>

            {/* Main Footer Content */}
            <div className="bg-amazon-light_blue w-full flex justify-center py-10">
                <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 text-gray-200 text-sm">
                    <div>
                        <h3 className="text-white font-bold mb-3 text-[16px]">Get to Know Us</h3>
                        <ul className="flex flex-col space-y-2">
                            <li className="hover:underline cursor-pointer">About Sasta Bazar PK</li>
                            <li className="hover:underline cursor-pointer">Careers</li>
                            <li className="hover:underline cursor-pointer">Press Releases</li>
                            <li className="hover:underline cursor-pointer">Sasta Bazar PK Science</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-3 text-[16px]">Connect with Us</h3>
                        <ul className="flex flex-col space-y-2 text-xs xl:text-sm">
                            <li className="hover:underline cursor-pointer flex gap-1">Facebook</li>
                            <li className="hover:underline cursor-pointer flex gap-1">Twitter</li>
                            <li className="hover:underline cursor-pointer flex gap-1">Instagram</li>
                            <li className="mt-4 text-white font-bold">Contact Us:</li>
                            <li>+923012475707</li>
                            <li className="break-words">muhammadshoaib0013@gmail.com</li>
                            <li className="mt-2 text-white font-bold">Address:</li>
                            <li>Multan, Punjab, Pakistan</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-3 text-[16px]">Make Money with Us</h3>
                        <ul className="flex flex-col space-y-2">
                            <li className="hover:underline cursor-pointer">Sell on Sasta Bazar PK</li>
                            <li className="hover:underline cursor-pointer">Sell under Accelerator</li>
                            <li className="hover:underline cursor-pointer">Protect and Build Your Brand</li>
                            <li className="hover:underline cursor-pointer">Global Selling</li>
                            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                            <li className="hover:underline cursor-pointer">Fulfilment by Sasta Bazar PK</li>
                            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
                            <li className="hover:underline cursor-pointer">Pay on Merchants</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-3 text-[16px]">Let Us Help You</h3>
                        <ul className="flex flex-col space-y-2">
                            <li className="hover:underline cursor-pointer">COVID-19 and Sasta Bazar PK</li>
                            <li className="hover:underline cursor-pointer">Your Account</li>
                            <li className="hover:underline cursor-pointer">Returns Centre</li>
                            <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
                            <li className="hover:underline cursor-pointer">App Download</li>
                            <li className="hover:underline cursor-pointer">Help</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-amazon-blue w-full flex flex-col items-center pt-8 pb-10 border-t border-[#3a4553]">
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center text-white cursor-pointer hover:border-white border border-transparent p-1 px-2 rounded">
                        <span className="text-2xl font-bold tracking-tighter">Sasta Bazar PK</span>
                    </div>
                    <div className="border border-gray-400 rounded-sm px-4 py-2 text-gray-300 text-sm cursor-pointer hover:border-white">
                        🌐 English
                    </div>
                </div>
                <div className="text-xs text-center text-gray-300 flex space-x-4">
                    <span className="hover:underline cursor-pointer">Conditions of Use & Sale</span>
                    <span className="hover:underline cursor-pointer">Privacy Notice</span>
                    <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
                </div>
                <div className="text-xs text-center text-gray-300 mt-2">
                    © 1996-2024, Sasta Bazar PK, Inc. or its affiliates
                </div>
            </div>
        </footer>
    );
};

export default Footer;
