import React from 'react';

const HeroSlider = () => {
    return (
        <div className="relative w-full max-w-[1500px] mx-auto bg-gray-900 border-b border-gray-800">
            <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] relative overflow-hidden bg-gray-900 flex items-center shadow-2xl">

                {/* Premium abstract tech background */}
                <div
                    className="absolute inset-x-0 inset-y-0 opacity-40 bg-cover bg-center mix-blend-screen"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop")' }}
                ></div>

                {/* Neon aesthetic glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-blue-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-orange-600 opacity-20 blur-[130px] rounded-full pointer-events-none"></div>

                {/* Overlay text */}
                <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32 flex flex-col justify-center items-start h-full">

                    <span className="text-orange-500 font-bold tracking-widest uppercase text-xs sm:text-sm md:text-md mb-2 sm:mb-4 bg-orange-500/10 px-3 py-1 rounded border border-orange-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                        Premium Store
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 mb-4 sm:mb-6 tracking-tight max-w-4xl leading-[1.1] drop-shadow-xl">
                        Top Quality <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                            Electronics
                        </span> & <br className="block sm:hidden" />
                        Tech Gadgets
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md border-l-4 border-orange-500 pl-4">
                        Discover incredible deals on premium tech accessories and the latest smartphones at Sasta Bazar PK.
                    </p>

                    <button className="group relative bg-orange-500 text-gray-900 font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg cursor-pointer transition-all hover:bg-orange-400 text-lg sm:text-xl shadow-[0_0_30px_rgba(249,115,22,0.4)] border-none overflow-hidden">
                        <span className="relative z-10 flex items-center">
                            Shop Deals Now
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </span>
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                    </button>
                </div>

                {/* Fade into bottom content block */}
                <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-[#e3e6e6] to-transparent z-20 pointer-events-none"></div>
            </div>
        </div>
    );
};

export default HeroSlider;
