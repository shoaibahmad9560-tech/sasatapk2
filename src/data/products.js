const UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", // Phone
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop", // PC
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop", // Headphones
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&auto=format&fit=crop", // Tech generic
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop", // Smartwatch
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop", // Camera
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop", // Setup
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop", // Headset
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop", // Laptop
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop", // Laptop dark
    "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=600&auto=format&fit=crop", // PC build
    "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&auto=format&fit=crop", // Watch dark
    "https://images.unsplash.com/photo-1502920901394-b81c62047321?q=80&w=600&auto=format&fit=crop", // Camera lens
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop", // Phone hands
    "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop", // Accessories
    "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=600&auto=format&fit=crop"  // Accessories cords
];

const BRANDS = ["Samsung", "Apple", "Sony", "Logitech", "HP", "Dell", "OnePlus", "Xiaomi", "JBL", "Asus"];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomRating = () => (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

const generateCategoryProducts = (categoryName, startId, count, titlePrefix) => {
    return Array.from({ length: count }).map((_, i) => {
        const pPrice = getRandomPrice(5000, 300000);
        const originalPrice = pPrice + getRandomPrice(1000, 20000);
        const randBrand = getRandomItem(BRANDS);
        return {
            id: startId + i,
            title: `${randBrand} ${titlePrefix} ${Math.floor(Math.random() * 1000)}X Pro`,
            description: `Premium high-performance ${categoryName.toLowerCase()} with state-of-the-art features and durable build quality.`,
            category: categoryName,
            brand: randBrand,
            image: getRandomItem(UNSPLASH_IMAGES),
            price: pPrice,
            originalPrice: originalPrice,
            rating: Number(getRandomRating()),
            reviews: getRandomPrice(50, 50000),
            deliveryTomorrow: Math.random() > 0.3
        };
    });
};

export const DUMMY_PRODUCTS = [
    ...generateCategoryProducts("Smartphones", 1, 100, "Smartphone"),
    ...generateCategoryProducts("Laptops & PCs", 101, 100, "Laptop"),
    ...generateCategoryProducts("Audio & Headphones", 201, 100, "Headphones"),
    ...generateCategoryProducts("Smartwatches", 301, 100, "Smartwatch"),
    ...generateCategoryProducts("Cameras", 401, 100, "Camera System"),
    ...generateCategoryProducts("Accessories", 501, 500, "Premium Accessory")
];
