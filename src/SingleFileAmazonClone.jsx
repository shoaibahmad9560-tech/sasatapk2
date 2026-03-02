import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, ShoppingCart, Menu, Star, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

// ==========================================
// 1. PERFECT PRODUCT DATA MATCHING & HD ASSETS
// ==========================================

// Precise mapping function so a Laptop NEVER gets a Mobile image/title.
// Added specific HD banner and distinct HTML5 video placeholders per category.
const CATEGORY_ASSETS = {
    "Smartphones": {
        brands: ["Samsung", "Apple", "Xiaomi", "OnePlus", "Google"],
        titles: ["Galaxy S Series", "iPhone Pro Max", "Redmi Note", "Pixel Pro", "Xperia"],
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1601784551446-20c9e07cd20a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bb3?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        bannerText: "The Next Generation of Smartphones is Here"
    },
    "Laptops & PCs": {
        brands: ["HP", "Dell", "Apple", "Lenovo", "Asus"],
        titles: ["ProBook", "XPS Ultra", "MacBook Pro", "ThinkPad X1", "ROG Zephyrus"],
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531297172815-d3d66eff2e43?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        bannerText: "Ultimate Performance for Creators & Gamers"
    },
    "Audio & Headphones": {
        brands: ["Sony", "JBL", "Apple", "Bose", "Sennheiser"],
        titles: ["WH-1000XM Edition", "AirPods Max", "Charge Portable", "QuietComfort", "Momentum"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590658268037-6f16144e5f8e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        bannerText: "Immersive Sound Like Never Before"
    },
    "Smartwatches": {
        brands: ["Apple", "Samsung", "Garmin", "Fitbit"],
        titles: ["Watch Series Ultra", "Galaxy Watch Classic", "Fenix Pro", "Venu Plus", "Sense Advance"],
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f085180eb84?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        bannerText: "Track Your Fitness in Style"
    },
    "Cameras": {
        brands: ["Canon", "Nikon", "Sony", "Fujifilm"],
        titles: ["EOS R Mirrorless", "Alpha Full-Frame", "Z-Series Pro", "Lumix GH", "X-T System"],
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1527732292671-872baec6338b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        bannerText: "Capture Life's Best Moments"
    },
    "Home Appliances": {
        brands: ["Dawlance", "Haier", "LG", "Samsung", "Kenwood"],
        titles: ["Smart Refrigerator Node", "Inverter AC Heat/Cool", "Washing Machine Auto", "Microwave Eco", "Air Purifier Ion"],
        images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1588854337205-09c3d441113b?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585834952026-666324fa10b9?q=80&w=800&auto=format&fit=crop"
        ],
        bannerImg: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        bannerText: "Upgrade Your Home Effortlessly"
    },
    "Accessories": {
        brands: ["Samsung", "Apple", "Sony", "HP", "Dell", "Xiaomi", "Logitech", "Anker"],
        titles: ["Wireless Precision Mouse", "Mechanical Keyboard", "High-Cap Power Bank", "Braided Fast Cable", "USB-C Multiport Hub", "MagSafe Charger"],
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop", // Mouse
            "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop", // Keyboard
            "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop", // Power Bank
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop", // Cable / Tech
            "https://images.unsplash.com/photo-1544228428-21d3f23a9687?q=80&w=800&auto=format&fit=crop", // Hub
            "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=800&auto=format&fit=crop"  // Charger
        ],
        bannerImg: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1920&q=80",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        bannerText: "Essential Add-ons & Peripherals"
    }
};

// RENAMED 'All' to 'Home' globally
const MAIN_CATEGORIES = ['Home', ...Object.keys(CATEGORY_ASSETS)];
const ALL_BRANDS = Array.from(new Set(Object.values(CATEGORY_ASSETS).flatMap(asset => asset.brands))).sort();

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomRating = () => parseFloat((Math.random() * (5.0 - 1.0) + 1.0).toFixed(1));

// The Strict Mapping Algorithm - 100% decoupling categories and fixing mismatches
const generateStrictCategoryProducts = (categoryName, startId, count) => {
    const assets = CATEGORY_ASSETS[categoryName];
    return Array.from({ length: count }).map((_, i) => {
        const pPrice = getRandomPrice(800, 350000);
        const mrp = pPrice + getRandomPrice(1000, 40000);
        const randBrand = getRandomItem(assets.brands);

        // STRICT BINDING: Ensure the title perfectly matches the image visually
        const itemIndex = i % assets.titles.length; // Modified: Deterministic modulo based on count `i` or index
        const exactTitlePrefix = assets.titles[itemIndex];
        const mappedImage = assets.images[i % assets.images.length]; // Modulo logic for image assignment

        const randSuffix = ['Pro', 'Max', 'Ultra', 'Series', 'X', 'Lite'][i % 6]; // Deterministic suffix too

        return {
            id: startId + i,
            title: `${randBrand} ${exactTitlePrefix} ${10 + (i % 90)} ${randSuffix}`,
            description: `High-quality ${categoryName.toLowerCase()} with premium features by ${randBrand}.`,
            category: categoryName,
            brand: randBrand,
            image: mappedImage, // STRICT mapped image to prevent title/photo conflicts
            price: pPrice,
            mrp: mrp,
            rating: getRandomRating(),
            reviews: getRandomPrice(5, 50000)
        };
    });
};

const MAIN_PRODUCTS = [
    ...generateStrictCategoryProducts("Smartphones", 1, 100),
    ...generateStrictCategoryProducts("Laptops & PCs", 101, 100),
    ...generateStrictCategoryProducts("Audio & Headphones", 201, 100),
    ...generateStrictCategoryProducts("Smartwatches", 301, 100),
    ...generateStrictCategoryProducts("Cameras", 401, 100),
    ...generateStrictCategoryProducts("Home Appliances", 501, 200),
    ...generateStrictCategoryProducts("Accessories", 701, 500)
];

const RECENT_ITEMS = [...MAIN_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 15);

// ==========================================
// 2. HERO SLIDER IMAGES (Home Page)
// ==========================================
const HERO_SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80",
        heading: "Power Your Productivity",
        subheading: "Up to 30% off on Next-Gen Gaming & Work Laptops."
    },
    {
        isCustom: true, // Specific Amazon Haul St. Patrick's Day banner
    },
    {
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80",
        heading: "Upgrade Your Home",
        subheading: "Smart Appliances for a Smarter Lifestyle. Shop the Sale."
    },
    {
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80",
        heading: "Stay Connected in Style",
        subheading: "The Latest Flagship Smartphones are Here."
    },
    {
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
        heading: "Essential Tech Accessories",
        subheading: "Must-Have Add-ons and Peripherals Available Now."
    }
];

// ==========================================
// 3. SHARED COMPONENTS (Header, Footer, Sidebar, Cards)
// ==========================================

const Header = ({ activeCategory, onNavigate, cartCount, searchQuery, setSearchQuery }) => (
    <header className="flex flex-col sticky top-0 z-50 font-sans shadow-md w-full">
        {/* Top Dark Navy Bar */}
        <div className="bg-[#131921] text-white flex flex-col sm:flex-row items-center justify-between px-4 py-2 sm:space-x-4 h-auto sm:h-[65px] space-y-2 sm:space-y-0 text-sm">
            <div onClick={() => onNavigate('Home')} className="flex flex-col relative items-center justify-center border border-transparent hover:border-white p-1 pb-1.5 rounded cursor-pointer shrink-0 mt-1">
                <span className="text-[22px] sm:text-[26px] font-black tracking-tighter text-white leading-none">
                    Sasta Bazar<span className="text-[#febd69] font-bold"> PK</span>
                </span>
                <svg className="absolute bottom-0 left-0 w-full h-3 translate-y-[2px]" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5,5 Q50,25 95,2" fill="none" stroke="#febd69" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="90,-2 98,2 92,8" fill="#febd69" />
                </svg>
            </div>
            <div className="hidden lg:flex items-center border border-transparent hover:border-gray-500 p-1 rounded cursor-pointer h-12 w-auto shrink-0">
                <MapPin size={20} className="mt-2 text-gray-400" />
                <div className="flex flex-col leading-tight ml-2">
                    <span className="text-[11px] text-gray-400 uppercase">Deliver to</span>
                    <span className="text-sm font-bold text-gray-100">Multan, Pakistan</span>
                </div>
            </div>
            <div className="flex-grow flex items-center rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#febd69] h-10 w-full shadow-inner">
                <select
                    className="bg-gray-100 text-gray-800 text-xs px-3 font-medium outline-none h-full border-r border-gray-300 cursor-pointer hidden md:block w-[140px] shrink-0 hover:bg-gray-200"
                    value={activeCategory}
                    onChange={(e) => onNavigate(e.target.value)}
                >
                    {MAIN_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat === 'Home' ? 'All Categories' : cat}</option>)}
                </select>
                <input type="text" placeholder="Search Sasta Bazar PK" className="w-full text-gray-900 px-4 h-full outline-none text-sm placeholder-gray-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="bg-[#febd69] py-2 px-5 hover:bg-[#f3a847] flex items-center justify-center text-[#131921] border-none cursor-pointer h-full shrink-0">
                    <Search size={20} />
                </button>
            </div>
            <div className="flex items-center space-x-4 shrink-0 pl-2">
                {/* Account & Lists Dropdown */}
                <div className="hidden sm:flex flex-col justify-center leading-tight border border-transparent hover:border-white p-1.5 pt-2 rounded cursor-pointer h-12 relative group">
                    <span className="text-xs font-normal text-white">Hello, sign in</span>
                    <span className="text-sm font-bold text-white flex items-center">
                        Account & Lists
                        <svg className="w-4 h-4 text-gray-400 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </span>

                    {/* The Dropdown Menu */}
                    <div className="absolute top-[48px] -right-[60px] bg-white text-[#0F1111] shadow-2xl rounded-sm w-[450px] p-4 hidden group-hover:flex flex-col z-[100] border border-gray-200 cursor-default">
                        {/* Triangle arrow on top */}
                        <div className="absolute -top-1.5 right-[85px] w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-200"></div>
                        <div className="flex flex-col items-center border-b border-gray-200 pb-3 mb-3">
                            <button className="bg-gradient-to-b from-[#f8e3ad] to-[#eeba37] border border-[#a88734] hover:bg-gradient-to-b hover:from-[#f5d78e] hover:to-[#eeb933] text-[13px] font-bold w-[220px] py-1.5 rounded-sm shadow-sm cursor-pointer text-[#111]">Sign in</button>
                            <span className="text-[11px] mt-1.5">New customer? <span className="text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">Start here.</span></span>
                        </div>
                        <div className="flex w-full">
                            <div className="w-1/2 pr-4 border-r border-gray-200">
                                <h3 className="font-bold text-base mb-2">Your Lists</h3>
                                <ul className="text-[13px] text-gray-700 space-y-2">
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Create a Wish List</li>
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Wish from any website</li>
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Baby Wish List</li>
                                </ul>
                            </div>
                            <div className="w-1/2 pl-4">
                                <h3 className="font-bold text-base mb-2">Your Account</h3>
                                <ul className="text-[13px] text-gray-700 space-y-2">
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Your Account</li>
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Your Orders</li>
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Your Recommendations</li>
                                    <li className="hover:text-[#c45500] hover:underline cursor-pointer">Prime Membership</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:flex flex-col justify-center leading-tight border border-transparent hover:border-white p-1.5 pt-2 rounded cursor-pointer h-12">
                    <span className="text-xs font-normal text-white">Returns</span>
                    <span className="text-sm font-bold text-white">& Orders</span>
                </div>
                <div className="flex items-center border border-transparent hover:border-gray-500 p-1 rounded cursor-pointer h-11 relative">
                    <div className="relative flex items-center">
                        <span className="absolute -top-1.5 left-4 text-[#febd69] font-black text-[15px] w-5 text-center">{cartCount}</span>
                        <ShoppingCart size={32} strokeWidth={1.5} className="text-gray-100 mr-2" />
                        <span className="text-sm font-bold mt-1 hidden lg:block text-gray-100">Cart</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Sub-Nav Slate Bar */}
        <div className="bg-[#232f3e] text-gray-200 text-sm flex items-center px-4 py-2 space-x-2 sm:space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] whitespace-nowrap h-[45px]">
            <div onClick={() => onNavigate('Home')} className={`flex items-center gap-1.5 border border-transparent hover:border-gray-500 hover:text-white p-1 rounded cursor-pointer font-bold shrink-0 ${activeCategory === 'Home' ? 'border-white text-white' : ''}`}>
                <Menu size={22} className="text-white" /> Home
            </div>
            {MAIN_CATEGORIES.filter(cat => cat !== 'Home').map(item => (
                <div key={item} onClick={() => onNavigate(item)} className={`border border-transparent hover:border-gray-500 hover:text-white p-1 px-2 rounded cursor-pointer shrink-0 text-[13px] sm:text-[14px] font-medium ${activeCategory === item ? 'border-white font-bold text-white' : ''}`}>
                    {item}
                </div>
            ))}
        </div>
    </header>
);

const TrueHeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 3000); // 3 seconds sliding
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);

    return (
        <div className="w-full h-[400px] md:h-[650px] relative overflow-hidden bg-[#E3E6E6] group">
            <div
                className="flex transition-transform duration-700 ease-in-out h-full w-[700%]"
                style={{ transform: `translateX(-${currentIndex * (100 / HERO_SLIDES.length)}%)` }}
            >
                {HERO_SLIDES.map((slide, index) => (
                    <div key={index} className="w-full h-full relative overflow-hidden" style={{ flex: `0 0 ${100 / HERO_SLIDES.length}%` }}>
                        {slide.isCustom ? (
                            <div className="w-full h-full bg-gradient-to-r from-green-600 to-green-500 relative flex items-center overflow-hidden">
                                {/* Visual Elements: clover emojis & pot of gold overlay */}
                                <div className="absolute inset-0 pointer-events-none z-0">
                                    <span className="absolute top-[10%] left-[5%] text-6xl opacity-30 transform -rotate-12">☘️</span>
                                    <span className="absolute bottom-[20%] left-[15%] text-8xl opacity-40 transform rotate-12">☘️</span>
                                    <span className="absolute top-[30%] left-[40%] text-5xl opacity-20 transform rotate-45">☘️</span>
                                    <span className="absolute bottom-[10%] right-[30%] text-7xl opacity-30 transform -rotate-12">☘️</span>
                                    <span className="absolute top-[15%] right-[10%] text-6xl opacity-20 transform -rotate-45">☘️</span>
                                    <span className="absolute top-[60%] right-[15%] text-9xl opacity-40 transform rotate-12">☘️</span>
                                    <span className="absolute bottom-[30%] left-[50%] text-8xl opacity-10 transform -rotate-6">☘️</span>
                                </div>

                                {/* Pot of Gold / Coins visually on the right */}
                                <div className="absolute right-[5%] md:right-[15%] bottom-[5%] h-[60%] md:h-[80%] z-10 text-right md:w-1/2 flex justify-end">
                                    <img
                                        src="https://images.unsplash.com/photo-1612012891334-03a07af1d5f3?auto=format&fit=crop&w=600&q=80"
                                        alt="St. Patrick's Day Gold Coins"
                                        className="h-[120%] object-contain mix-blend-color-burn opacity-80 lg:mr-[-100px] mt-10 md:mt-24 pointer-events-none drop-shadow-2xl"
                                    />
                                </div>

                                <div className="relative z-20 px-6 md:px-20 lg:px-28 flex flex-col items-start w-[100%] md:w-[65%] pointer-events-none h-full justify-center pb-20 md:pb-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center items-start space-y-3 sm:space-y-0 sm:space-x-3 mb-6 relative">
                                        <span className="text-white text-3xl md:text-4xl font-bold tracking-tight drop-shadow-md">
                                            All green everything!
                                        </span>
                                        <span className="bg-[#FFD814] text-[#0F1111] font-bold px-5 py-1.5 rounded-full text-base border border-[#FCD200] shadow-sm pointer-events-auto cursor-pointer flex items-center hover:bg-[#F7CA00] hover:-translate-y-0.5 transition-transform duration-300">
                                            Shop now
                                        </span>
                                    </div>
                                    <h2 className="text-white text-[50px] sm:text-[60px] md:text-[85px] lg:text-[100px] leading-[1.0] font-black drop-shadow-xl tracking-tighter w-full block">
                                        Under Rs.1500<br />St. Patrick's Day<br />finds
                                    </h2>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#F2F4F8] via-black/40 to-black/30 z-10 h-full pointer-events-none"></div>
                                <img src={slide.image} className="w-full h-full object-cover absolute inset-0 z-0" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={slide.heading} />

                                {/* Overlay Content */}
                                <div className="absolute top-1/4 left-[5%] md:left-[10%] z-20 flex flex-col items-start w-[80%] md:w-[50%] pointer-events-none">
                                    <span className="bg-[#febd69] text-[#131921] px-3 py-1 font-bold rounded-sm text-xs md:text-sm uppercase tracking-wide mb-3 shadow-md border border-[#f3a847]">Limited Time Offer</span>
                                    <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-black drop-shadow-xl tracking-tight leading-tight animate-sparkle">
                                        {slide.heading}
                                    </h2>
                                    <p className="text-gray-100 text-lg md:text-2xl mt-4 font-medium drop-shadow-md">
                                        {slide.subheading}
                                    </p>
                                    <button className="pointer-events-auto mt-8 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] text-[#0F1111] px-8 py-3.5 md:py-4 rounded-full font-bold text-lg cursor-pointer shadow-[0_4px_14px_rgba(255,216,20,0.4)] transition-all transform hover:-translate-y-1 relative overflow-hidden animate-btn-shine group">
                                        Shop Everything Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={prevSlide} className="absolute top-[20%] md:top-[30%] left-0 md:left-4 z-20 border-2 border-transparent hover:border-white p-4 lg:p-6 text-white cursor-pointer focus:outline-none h-48 sm:h-auto flex items-center justify-center rounded-md hover:ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={48} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </button>
            <button onClick={nextSlide} className="absolute top-[20%] md:top-[30%] right-0 md:right-4 z-20 border-2 border-transparent hover:border-white p-4 lg:p-6 text-white cursor-pointer focus:outline-none h-48 sm:h-auto flex items-center justify-center rounded-md hover:ring-2 ring-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={48} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
            </button>
        </div>
    );
};

const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white border text-left border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer z-0 h-full group">
        <div className="w-full h-56 relative overflow-hidden rounded-t-xl mb-4">
            <img src={product.image} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={product.title} className="w-full h-56 object-cover bg-white rounded-t-xl group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="flex-1 flex flex-col">
            <h3 className="font-medium text-[15px] mb-1 text-[#0F1111] line-clamp-2 hover:text-[#c45500] cursor-pointer leading-snug" title={product.title}>{product.title}</h3>
            <div className="flex items-center mb-1">
                <div className="flex text-[#febd69]">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= Math.floor(product.rating) ? "currentColor" : "none"} className={s <= Math.floor(product.rating) ? "text-[#febd69]" : "text-gray-300"} />)}
                </div>
                <span className="text-[13px] text-[#007185] ml-2 hover:underline cursor-pointer hover:text-[#c45500]">{product.reviews.toLocaleString()}</span>
            </div>
            <div className="flex flex-col mt-auto pt-2">
                <div className="flex items-end text-[#0F1111]">
                    <span className="text-xs align-top mt-1 font-medium text-gray-600">Rs.</span>
                    <span className="text-2xl font-medium tracking-tight ml-0.5">{product.price.toLocaleString()}</span>
                </div>
                {product.mrp > product.price && (
                    <span className="text-[12px] text-gray-500 line-through">M.R.P: Rs.{product.mrp.toLocaleString()}</span>
                )}
            </div>
        </div>
        <button onClick={onAddToCart} className="mt-4 w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] rounded-full py-1.5 text-sm cursor-pointer shadow-sm transition-colors text-[#0F1111] font-sans focus:ring-2 focus:ring-[#e47911] focus:outline-none">
            Add to cart
        </button>
    </div>
);

const SidebarFilters = ({ activeCategory, onNavigate, selectedBrands, setSelectedBrands, minRating, setMinRating, priceRange, setPriceRange }) => {
    const [localMin, setLocalMin] = useState("");
    const [localMax, setLocalMax] = useState("");

    const availableBrands = activeCategory === "Home" ? ALL_BRANDS : CATEGORY_ASSETS[activeCategory]?.brands || [];

    const handleBrandToggle = (brand) => {
        setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    };

    const handlePriceLink = (min, max) => {
        setPriceRange({ min, max });
        setLocalMin(""); setLocalMax("");
    };

    const handleCustomPrice = () => {
        setPriceRange({ min: localMin ? Number(localMin) : 0, max: localMax ? Number(localMax) : 99999999 });
    };

    return (
        <div className="w-full h-full pr-4 pb-20 font-sans">
            <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2 cursor-pointer hover:text-[#c45500] transition-colors" onClick={() => onNavigate('Home')}>
                <ChevronLeft size={16} className="inline mr-1" /> Home Categories
            </h3>
            <h4 className="font-bold text-sm text-gray-800 mb-2">{activeCategory === 'Home' ? 'Categories' : activeCategory}</h4>

            {/* Customer Reviews */}
            <div className="mb-6 mt-4">
                <h4 className="font-bold text-sm text-gray-800 mb-2">Customer Reviews</h4>
                {[4, 3, 2, 1].map(rating => (
                    <div key={rating} onClick={() => setMinRating(rating)} className="flex items-center cursor-pointer mb-1 hover:text-[#e47911]">
                        <div className="flex text-[#febd69]">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= rating ? "currentColor" : "none"} className={s <= rating ? "text-[#febd69]" : "text-gray-300"} />)}
                        </div>
                        <span className={`text-sm ml-1 ${minRating === rating ? 'text-[#e47911] font-bold' : 'text-gray-700'}`}>& Up</span>
                    </div>
                ))}
            </div>

            {/* Dynamic Brands */}
            <div className="mb-6">
                <h4 className="font-bold text-sm text-gray-800 mb-2">Featured Brands</h4>
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {availableBrands.map((brand, idx) => (
                        <label key={`${brand}-${idx}`} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => handleBrandToggle(brand)} className="w-4 h-4 text-[#e47911] border-gray-300 focus:ring-[#e47911] rounded-sm" />
                            <span className="text-sm text-gray-700 font-medium">{brand}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="mb-5">
                <h4 className="font-bold text-sm text-gray-800 mb-2">Price Range</h4>
                <ul className="text-sm text-gray-700 mb-3 space-y-1">
                    <li className="cursor-pointer hover:text-[#e47911]" onClick={() => handlePriceLink(0, 5000)}>Under Rs.5,000</li>
                    <li className="cursor-pointer hover:text-[#e47911]" onClick={() => handlePriceLink(5000, 20000)}>Rs.5,000 - Rs.20,000</li>
                    <li className="cursor-pointer hover:text-[#e47911]" onClick={() => handlePriceLink(20000, 50000)}>Rs.20,000 - Rs.50,000</li>
                    <li className="cursor-pointer hover:text-[#e47911]" onClick={() => handlePriceLink(50000, 99999999)}>Over Rs.50,000</li>
                </ul>
                <div className="flex items-center gap-1 mt-2">
                    <input type="number" placeholder="Min" value={localMin} onChange={e => setLocalMin(e.target.value)} className="w-16 p-1.5 border border-gray-400 text-sm rounded shadow-inner" />
                    <span className="text-gray-500 font-bold">-</span>
                    <input type="number" placeholder="Max" value={localMax} onChange={e => setLocalMax(e.target.value)} className="w-16 p-1.5 border border-gray-400 text-sm rounded shadow-inner" />
                    <button onClick={handleCustomPrice} className="bg-white border border-gray-400 px-3 py-1.5 text-sm rounded-md shadow-sm hover:bg-gray-50 font-bold text-gray-800 transition-colors">Go</button>
                </div>
            </div>

            <button className="w-full mt-2 text-sm text-blue-600 hover:text-[#c45500] hover:underline text-left font-bold" onClick={() => {
                setSelectedBrands([]); setMinRating(0); setPriceRange({ min: 0, max: 99999999 }); setLocalMin(""); setLocalMax("");
            }}>
                Clear Filters
            </button>
        </div>
    );
};

// ==========================================
// 4. HOME PAGE CAROUSEL COMPONENT
// ==========================================

const ScrollableSection = ({ title, products, onNavigate }) => {
    if (!products || products.length === 0) return null;
    return (
        <div className="bg-white p-5 mt-8 border border-gray-200 rounded-md shadow-sm relative group overflow-hidden w-full">
            <h2 className="font-bold text-xl mb-4 text-left text-[#0F1111]">{title}</h2>
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                {products.map((item) => (
                    <div key={item.id} onClick={() => onNavigate(item.category)} className="min-w-[160px] md:min-w-[200px] flex-shrink-0 flex flex-col items-center p-3 rounded-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 bg-white snap-start group/card">
                        <div className="w-full h-56 relative overflow-hidden rounded-t-xl mb-3">
                            {/* Fallback mechanism for images */}
                            <img src={item.image || "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={item.title} className="w-full h-56 object-cover bg-white rounded-t-xl group-hover/card:scale-110 transition-transform duration-300 z-10 relative" />
                        </div>
                        <span className="text-sm font-medium w-full line-clamp-2 text-[#007185] group-hover/card:underline cursor-pointer leading-tight mb-1">{item.title}</span>
                        <div className="w-full flex items-center justify-between mt-auto">
                            <span className="text-lg font-bold text-[#b12704]">Rs.{item.price.toLocaleString()}</span>
                            {item.mrp && <span className="text-[11px] text-gray-500 line-through">Rs.{item.mrp.toLocaleString()}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 5. DISTINCT PAGE COMPONENTS (Routing System)
// ==========================================

const HomePage = ({ onNavigate, handleAddToCart }) => {
    const cards = [
        { title: "Smartphones & Mobile Devices", img: CATEGORY_ASSETS["Smartphones"].images[0], cat: "Smartphones" },
        { title: "Laptops, PCs & Accessories", img: CATEGORY_ASSETS["Laptops & PCs"].images[0], cat: "Laptops & PCs" },
        { title: "Home Appliances Mega Sale", img: CATEGORY_ASSETS["Home Appliances"].images[0], cat: "Home Appliances" },
        { title: "Audio & Headphones Center", img: CATEGORY_ASSETS["Audio & Headphones"].images[0], cat: "Audio & Headphones" }
    ];

    return (
        <div className="w-full pb-8">
            <TrueHeroSlider />

            {/* Overlapping Cards */}
            <div className="relative z-20 max-w-[1500px] mx-auto w-full px-4 -mt-32 md:-mt-64 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((c) => (
                    <div key={c.cat} className="bg-white p-5 pt-4 pb-6 shadow-[0_2px_5px_rgba(0,0,0,0.1)] h-[400px] flex flex-col justify-between cursor-pointer group rounded-sm overflow-hidden" onClick={() => onNavigate(c.cat)}>
                        <h2 className="font-bold text-[21px] text-[#0F1111] mb-2">{c.title}</h2>
                        <div className="h-64 mt-2 overflow-hidden w-full flex justify-center items-center bg-gray-50 p-2">
                            <img src={c.img} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                        </div>
                        <span className="text-[#007185] hover:text-[#c45500] hover:underline text-[13px] font-medium mt-2">Shop now</span>
                    </div>
                ))}
            </div>

            <div className="w-full bg-transparent py-4 text-center mb-4 relative z-20">
                <h2 className="text-2xl md:text-[28px] font-bold text-[#0F1111] mb-1 tracking-tight">Top Quality Electronics & Medical Tools</h2>
                <p className="text-base text-[#565959]">Discover incredible deals on professional medical accessories and the latest tech.</p>
            </div>

            <div className="max-w-[1500px] mx-auto w-full px-4 relative z-20">
                {/* The Infinite Trust Ticker (Marquee) */}
                <div className="w-full bg-[#131921] text-white text-[13px] py-3 overflow-hidden flex items-center border border-gray-700 rounded-md font-bold whitespace-nowrap shadow-inner mb-6">
                    <div className="flex animate-marquee items-center min-w-full tracking-wide">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <span key={i} className="mx-2">
                                🎁 Save 10% on Rs.20000 <span className="text-gray-500 mx-2">|</span> 😊 Free shipping on Rs.5000 <span className="text-gray-500 mx-2">|</span> 🎁 Save 5% on Rs.10000 <span className="text-gray-500 mx-2">|</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* --- 10 to 15 EXPANDED SCROLLABLE SECTIONS --- */}

                {/* 1. Today's Top Trending (Fixed Images logic inside ScrollableSection) */}
                <ScrollableSection
                    title="Today's Top Trending Items"
                    products={RECENT_ITEMS}
                    onNavigate={onNavigate}
                />

                {/* 2. Trending in Smartphones */}
                <ScrollableSection
                    title="Trending in Smartphones"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Smartphones").slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 3. Top Rated Laptops */}
                <ScrollableSection
                    title="Top Rated Laptops & PCs"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Laptops & PCs" && p.rating >= 4.0).slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 4. Smart Home Upgrades */}
                <ScrollableSection
                    title="Smart Home Upgrades"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Home Appliances").slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 5. Clearance Sale */}
                <ScrollableSection
                    title="Clearance Sale (Up to 70% Off)"
                    products={[...MAIN_PRODUCTS].sort((a, b) => a.price - b.price).slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 6. Best Budget Cameras */}
                <ScrollableSection
                    title="Best Budget Cameras"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Cameras" && p.price < 100000).slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 7. Premium Audio Gear */}
                <ScrollableSection
                    title="Premium Audio Gear"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Audio & Headphones").slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 8. New Arrivals in Tech */}
                <ScrollableSection
                    title="New Arrivals in Tech"
                    products={[...MAIN_PRODUCTS].reverse().slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 9. Bestselling Accessories */}
                <ScrollableSection
                    title="Bestselling Accessories"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Accessories").slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 10. Ultimate Fitness Trackers */}
                <ScrollableSection
                    title="Ultimate Fitness Trackers"
                    products={MAIN_PRODUCTS.filter(p => p.category === "Smartwatches").slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 11. Most Reviewed Products */}
                <ScrollableSection
                    title="Most Reviewed by Customers"
                    products={[...MAIN_PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* 12. Editor's Choice Picks */}
                <ScrollableSection
                    title="Editor's Choice Picks"
                    products={[...MAIN_PRODUCTS].filter(p => p.rating >= 4.5).slice(0, 15)}
                    onNavigate={onNavigate}
                />

                {/* High-Converting 3-Column Promotional Block wrapped in Premium Dark Wrapper */}
                <div className="w-full bg-[#131921] py-16 px-4 mt-16 mb-0 border-t border-[#232f3e] shadow-inner">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch max-w-[1400px] mx-auto">

                        {/* Left Column: Features */}
                        <div className="col-span-1 h-full flex flex-col bg-white rounded-2xl shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div className="w-full h-40 bg-gradient-to-br from-[#131921] to-[#37475a] flex items-center justify-center rounded-t-2xl p-4 text-center border-b border-[#febd69]">
                                <h3 className="text-white text-2xl font-black uppercase tracking-widest drop-shadow-md">Premium<br /><span className="text-[#febd69]">Quality</span></h3>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between items-center text-center">
                                <h3 className="text-[19px] font-black mb-4 text-[#0F1111] uppercase tracking-wide">Why Choose Us?</h3>
                                <ul className="text-[14px] font-bold text-gray-700 space-y-3 text-left w-full">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> Secure Online Payments</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> 100% Authentic Products</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> 7-Day Easy Returns</li>
                                </ul>
                            </div>
                        </div>

                        {/* Center Column: The Video */}
                        <div className="col-span-1 lg:col-span-2 flex justify-center items-center">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="col-span-1 lg:col-span-2 w-full h-[400px] object-cover rounded-2xl shadow-2xl border-2 border-transparent hover:border-[#febd69] transition-all"
                                src="https://media.w3.org/2010/05/sintel/trailer.mp4"
                            >
                                Your browser does not support HTML video.
                            </video>
                        </div>

                        {/* Right Column: Promotion */}
                        <div className="col-span-1 h-full flex flex-col bg-white rounded-2xl shadow-2xl transform hover:-translate-y-2 transition duration-300">
                            <div className="w-full h-40 bg-gradient-to-bl from-[#131921] to-[#37475a] flex items-center justify-center rounded-t-2xl p-4 text-center border-b border-[#febd69]">
                                <h3 className="text-white text-2xl font-black uppercase tracking-widest drop-shadow-md">Express<br /><span className="text-[#febd69]">Delivery</span></h3>
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between items-center text-center">
                                <h3 className="text-[19px] font-black mb-4 text-[#0F1111] uppercase tracking-wide">Nationwide Reach</h3>
                                <ul className="text-[14px] font-bold text-gray-700 space-y-3 text-left w-full mb-6">
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> Fast Delivery from Multan</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> Cash on Delivery Nationwide</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#007185] shrink-0" /> 24/7 Dedicated Support</li>
                                </ul>
                                <div className="w-full bg-gradient-to-r from-[#131921] to-[#232f3e] text-white py-2.5 rounded-xl text-sm font-bold flex flex-col items-center shadow-md border border-[#3a4553]">
                                    <span className="text-[#febd69] text-xs uppercase tracking-widest mb-0.5">Contact Us</span>
                                    <span className="text-lg tracking-wide">+923012475707</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

// Represents tailored category pages (Strict Page Isolation implemented via parent filters)
const CategoryPage = ({ activeCategory, onNavigate, handleAddToCart, filteredProducts, filterProps }) => {

    // Custom HD Banner and Video Logic strictly matched to Category Prop
    const tailoredAssets = CATEGORY_ASSETS[activeCategory];
    const topProducts = filteredProducts.slice(0, 16);
    const relatedProducts = [...MAIN_PRODUCTS.filter(p => p.category === activeCategory)].sort(() => 0.5 - Math.random()).slice(0, 10);

    return (
        <div className="max-w-[1500px] mx-auto w-full px-4 py-6">

            {/* 3. Category-Specific HD Hero Banner */}
            <div className="w-full h-[250px] md:h-[350px] relative rounded-lg overflow-hidden mb-8 shadow-md group">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-black drop-shadow-2xl text-center px-4 tracking-tight">
                        {tailoredAssets.bannerText}
                    </h1>
                </div>
                {/* Dynamically utilizing strict category HD unspash URLs */}
                <img src={tailoredAssets.bannerImg} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={`${activeCategory} Hero Banner`} className="w-full h-full object-cover z-0" />
            </div>

            {/* Tracker */}
            <div className="w-full bg-white px-5 py-4 border border-gray-200 rounded-md mb-6 flex justify-between items-center shadow-sm relative z-20">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={24} className="text-green-600" />
                    <h2 className="font-bold text-lg text-[#0F1111]">Arriving tomorrow by 9 PM</h2>
                </div>
                <div className="text-sm font-medium text-gray-500 hidden sm:block">Department Code: {activeCategory.replace(/\s+/g, '-').toUpperCase()}</div>
            </div>

            {/* Layout: Sidebar + Strict Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full relative h-auto">
                <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                    <div className="sticky top-[115px] h-[calc(100vh-115px)] overflow-y-auto pb-4 custom-scrollbar">
                        <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-md h-full">
                            <SidebarFilters activeCategory={activeCategory} onNavigate={onNavigate} {...filterProps} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-9 xl:col-span-10">
                    <div className="mb-4 bg-white p-3 border border-gray-200 shadow-sm font-medium text-[#0F1111] rounded-md text-sm md:text-base flex items-center justify-between">
                        <div><span className="font-bold">Showing {topProducts.length} Premium Results</span> for "{activeCategory}"</div>
                    </div>

                    {/* STRICT PAGE ISOLATION: The map only processes items strictly checked by activeCategory === p.category logic in parent */}
                    {topProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {topProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />)}
                        </div>
                    ) : (
                        <div className="bg-white py-16 px-4 text-center rounded-md border border-gray-200 mt-2">
                            <h3 className="text-xl font-bold mb-2 text-[#0F1111]">No related products found in {activeCategory}.</h3>
                            <p className="text-gray-600">Try adjusting your advanced filter metrics.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="my-10 border-t border-gray-300 pt-8">
                <h2 className="font-bold text-2xl text-[#0F1111] mb-6">Top Rated {activeCategory} Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tailoredAssets.images.slice(0, 3).map((img, i) => (
                        <div key={`${activeCategory}-promo-${i}`} className="relative h-[250px] md:h-[300px] rounded-lg overflow-hidden group cursor-pointer shadow-sm">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                            <img src={img} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={`${activeCategory} promotion`} className="w-full h-[160px] object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 z-20 text-white font-bold text-lg drop-shadow-md tracking-wide">Featured {activeCategory} Edition</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Category-Specific HD Advertisement Videos */}
            <div className="my-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <PlayCircle size={28} className="text-[#007185]" />
                    <h2 className="font-bold text-2xl text-[#0F1111] tracking-tight">Watch The HD {activeCategory} Showcase</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-7xl mx-auto my-6">
                    {/* Left Column: HD Video */}
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden relative bg-black shadow-2xl">
                        {/* Unique Category dummy mp4 links strictly matched */}
                        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity" src={tailoredAssets.video}>
                            Your browser does not support HTML video capabilities.
                        </video>
                    </div>

                    {/* Right Column: Promotional Image */}
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl relative group/ad">
                        <img
                            src={tailoredAssets.bannerImg}
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }}
                            className="w-full h-[160px] object-cover group-hover/ad:scale-105 transition-transform duration-700"
                            alt={`${activeCategory} Feature Ad`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10"></div>

                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="text-[#febd69] text-base font-bold drop-shadow-md uppercase tracking-wider">Exclusive {activeCategory}</span>
                            <h3 className="text-white text-3xl font-black drop-shadow-xl mt-1 tracking-tight">Discover Top Tier Quality</h3>
                            <button className="mt-4 bg-[#febd69] text-[#131921] px-6 py-2 font-bold rounded-md shadow-md hover:bg-[#f3a847] transition-all">
                                View Selection
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 mt-10 rounded-lg shadow-sm border border-gray-200 relative group overflow-hidden">
                <h2 className="font-bold text-xl mb-4 text-[#0F1111]">More Authentic {activeCategory} items to explore</h2>
                <div className="flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {relatedProducts.map((item, i) => (
                        <div key={item.id} className="min-w-[150px] md:min-w-[200px] flex-shrink-0 flex flex-col items-center p-3 rounded-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 bg-white group snap-start">
                            <div className="w-full h-56 relative overflow-hidden rounded-t-xl mb-3">
                                <img src={item.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/600x400/131921/febd69?text=Sasta+Bazar+PK"; }} alt={item.title} className="w-full h-56 object-cover bg-white rounded-t-xl group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="text-sm font-medium text-left w-full line-clamp-1 text-[#007185] hover:underline cursor-pointer">{item.title}</span>
                            <span className="text-lg font-bold w-full text-left text-[#0F1111] mt-1">Rs.{item.price.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

const Footer = () => (
    <footer className="w-full mt-10 text-left font-sans">
        <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-center py-4 cursor-pointer text-[13px] font-medium tracking-wide transition-colors">
            Back to top
        </div>
        <div className="bg-[#232f3e] w-full flex justify-center py-10">
            <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 text-gray-200 text-sm">
                <div>
                    <h3 className="text-white font-bold mb-3 text-[16px]">Get to Know Us</h3>
                    <ul className="flex flex-col space-y-2">
                        <li className="hover:underline cursor-pointer">About Sasta Bazar PK</li>
                        <li className="hover:underline cursor-pointer">Careers Opportunities</li>
                        <li className="hover:underline cursor-pointer">Press Releases</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-3 text-[16px]">Connect with Us</h3>
                    <ul className="flex flex-col space-y-2 text-sm leading-relaxed">
                        <li className="hover:underline cursor-pointer flex gap-1 items-center">Facebook Platform</li>
                        <li className="hover:underline cursor-pointer flex gap-1 items-center">Twitter Announcements</li>
                        <li className="mt-4 text-white font-bold tracking-wide text-[#febd69]">Direct Operations Support:</li>
                        <li>+92 301 2475707</li>
                        <li className="break-words">muhammadshoaib0013@gmail.com</li>
                        <li className="mt-2 text-white font-bold tracking-wide text-[#febd69]">Corporate Headquarters:</li>
                        <li>Multan, Punjab, Pakistan</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-3 text-[16px]">Make Money with Us</h3>
                    <ul className="flex flex-col space-y-2">
                        <li className="hover:underline cursor-pointer">Start Selling on Sasta Bazar PK</li>
                        <li className="hover:underline cursor-pointer">Secure Brand Protection Services</li>
                        <li className="hover:underline cursor-pointer">Join Global Affiliate Program</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-bold mb-3 text-[16px]">Let Us Help You</h3>
                    <ul className="flex flex-col space-y-2">
                        <li className="hover:underline cursor-pointer">Manage Your Account Details</li>
                        <li className="hover:underline cursor-pointer">Returns and Exchange Centre</li>
                        <li className="hover:underline cursor-pointer">100% Secure Purchase Protection</li>
                        <li className="hover:underline cursor-pointer">Customer Service and Help Desk</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="bg-[#131921] w-full flex flex-col items-center pt-8 pb-10 border-t border-[#3a4553]">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col relative items-center justify-center p-1 pb-1.5 cursor-pointer mt-1">
                    <span className="text-[22px] sm:text-[26px] font-black tracking-tighter text-white leading-none">
                        Sasta Bazar<span className="text-[#febd69] font-bold"> PK</span>
                    </span>
                    <svg className="absolute bottom-0 left-0 w-full h-3 translate-y-[2px]" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5,5 Q50,25 95,2" fill="none" stroke="#febd69" strokeWidth="3" strokeLinecap="round" />
                        <polygon points="90,-2 98,2 92,8" fill="#febd69" />
                    </svg>
                </div>
                <div className="border border-gray-400 rounded-sm px-4 py-2 text-gray-300 text-sm cursor-pointer hover:border-white transition-colors">
                    🌐 English - United States
                </div>
            </div>
            <div className="text-xs text-center text-gray-300 flex space-x-4">
                <span className="hover:underline cursor-pointer">Standard Conditions of Use & Sale</span>
                <span className="hover:underline cursor-pointer">Global Privacy Policy Notice</span>
            </div>
            <div className="text-xs text-center text-gray-300 mt-2">© 1996-2024, Sasta Bazar PK, Inc. or its certified web affiliates. All associated rights securely reserved.</div>
        </div>
    </footer>
);

// ==========================================
// 5. MAIN APP ENTRY
// ==========================================

export default function SingleFileAmazonClone() {
    // Advanced True Routing State (1: Home renamed and set as default)
    const [currentRoute, setCurrentRoute] = useState('home');
    const [activeCategory, setActiveCategory] = useState("Home");
    const [cartCount, setCartCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 99999999 });
    const [minRating, setMinRating] = useState(0);

    const handleAddToCart = () => setCartCount(prev => prev + 1);

    const navigateTo = (cat) => {
        setActiveCategory(cat);
        setCurrentRoute(cat === 'Home' ? 'home' : 'category');
        setSearchQuery(""); // Clear search when navigating
        // Reset filters when physically navigating to a new isolated page route
        setSelectedBrands([]);
        setPriceRange({ min: 0, max: 99999999 });
        setMinRating(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 6. STRICT PAGE ISOLATION - using explicit `===` checking against `activeCategory`
    const filteredProducts = useMemo(() => {
        return MAIN_PRODUCTS.filter(p =>
            // Ensures strict checking - If on Laptops, will ONLY ever process Laptops.
            (activeCategory === 'Home' ? true : p.category === activeCategory) &&
            (selectedBrands.length === 0 ? true : selectedBrands.includes(p.brand)) &&
            (p.price >= priceRange.min && p.price <= priceRange.max) &&
            (minRating === 0 ? true : p.rating >= minRating)
        );
    }, [activeCategory, selectedBrands, priceRange, minRating]);

    const routeComponents = {
        'home': <HomePage onNavigate={navigateTo} handleAddToCart={handleAddToCart} />,
        'category': <CategoryPage
            activeCategory={activeCategory}
            onNavigate={navigateTo}
            handleAddToCart={handleAddToCart}
            filteredProducts={filteredProducts}
            filterProps={{ selectedBrands, setSelectedBrands, minRating, setMinRating, priceRange, setPriceRange }}
        />
    };

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans text-[#0f1111]">
            <Header activeCategory={activeCategory} onNavigate={navigateTo} cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* RENDER THE CORRECT ROUTE COMPONENT ENSURING 100% ISOLATION */}
            {searchQuery.trim().length > 0 ? (
                <div className="max-w-[1500px] mx-auto w-full px-4 py-8">
                    <h2 className="text-2xl font-bold mb-6 text-[#0F1111]">Search Results for "{searchQuery}"</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {MAIN_PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                        {MAIN_PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="col-span-full py-20 text-center text-gray-500 font-medium">
                                No products found matching your search. Try different keywords.
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                routeComponents[currentRoute]
            )}

            <Footer />
        </div>
    );
}
