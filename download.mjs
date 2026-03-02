import fs from 'fs';
import https from 'https';
import path from 'path';

const CATEGORY_ASSETS = {
    "Smartphones": [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbc3?q=80&w=600&fit=crop"
    ],
    "Laptops & PCs": [
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&fit=crop"
    ],
    "Audio & Headphones": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&fit=crop"
    ],
    "Smartwatches": [
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1557438159-51eecce89612?q=80&w=600&fit=crop"
    ],
    "Cameras": [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1502920901394-b81c62047321?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?q=80&w=600&fit=crop"
    ],
    "Home Appliances": [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1540638349517-3abd5afc5fe3?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=600&fit=crop"
    ],
    "Accessories": [
        "https://images.unsplash.com/photo-1542382156909-92c9f131a29f?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1620054371424-9b2512a87895?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1512295767273-ac10f2249df9?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&fit=crop"
    ]
};

const dl = (url, dest) => new Promise((res, rej) => {
    https.get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
            https.get(response.headers.location, (redirectRes) => {
                const f = fs.createWriteStream(dest);
                redirectRes.pipe(f);
                f.on('finish', () => { f.close(); res(); });
            }).on('error', rej);
        } else {
            const f = fs.createWriteStream(dest);
            response.pipe(f);
            f.on('finish', () => { f.close(); res(); });
        }
    }).on('error', rej);
});

async function main() {
    for (const [cat, urls] of Object.entries(CATEGORY_ASSETS)) {
        for (let idx = 0; idx < urls.length; idx++) {
            const name = `${cat.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${idx}.jpg`;
            const dest = path.join(process.cwd(), 'public', 'products', name);
            try {
                console.log(`Downloading ${name}...`);
                await dl(urls[idx], dest);
            } catch (e) {
                console.error(`Failed ${name}:`, e);
            }
        }
    }
    console.log("Done");
}

main();
