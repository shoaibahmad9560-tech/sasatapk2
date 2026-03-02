import React from 'react';
import { Package, Truck, CheckCircle2, Box } from 'lucide-react';

const OrderTracker = ({ currentStep = 3 }) => {
    const steps = [
        { id: 1, label: 'Ordered', date: 'Oct 24', time: '10:30 AM', icon: <Package size={20} /> },
        { id: 2, label: 'Shipped', date: 'Oct 25', time: '02:15 PM', icon: <Box size={20} /> },
        { id: 3, label: 'Out for delivery', date: 'Oct 26', time: '08:45 AM', icon: <Truck size={20} /> },
        { id: 4, label: 'Arriving', date: 'by 9 PM', time: 'Today', icon: <CheckCircle2 size={20} /> }
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md mb-6 w-full overflow-hidden font-sans">
            {/* Header top bar */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200">
                            On Schedule
                        </span>
                        <h2 className="text-lg font-black text-gray-900 tracking-tight">Arriving tomorrow by 9 PM</h2>
                    </div>
                </div>
                <div className="text-left sm:text-right text-sm">
                    <p className="text-gray-500 mb-0.5 font-medium">Order <span className="text-gray-900">#404-1234567</span></p>
                    <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-bold transition-colors">Order Details & Invoice</a>
                </div>
            </div>

            {/* Tracker Body */}
            <div className="px-6 py-8">
                <div className="relative max-w-3xl mx-auto">
                    {/* Background Progress Line */}
                    <div className="absolute top-[20px] left-[12%] right-[12%] h-1.5 bg-gray-100 -z-10 rounded-full"></div>

                    {/* Active Progress Line */}
                    <div
                        className="absolute top-[20px] left-[12%] h-1.5 bg-gradient-to-r from-orange-400 to-orange-500 -z-10 rounded-full transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                        style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 76}%` }}
                    ></div>

                    {/* Steps Container */}
                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep - 1;
                            const isPending = index > currentStep - 1;

                            return (
                                <div key={step.id} className="flex flex-col items-center w-1/4 group">
                                    <div
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 shadow-sm
                                            ${isCompleted
                                                ? 'bg-orange-500 text-white shadow-orange-500/30'
                                                : isCurrent
                                                    ? 'bg-white text-orange-600 border-2 border-orange-500 ring-4 ring-orange-500/20'
                                                    : 'bg-white text-gray-400 border-2 border-gray-200'}`}
                                    >
                                        {isCompleted && !isCurrent ? <CheckCircle2 size={24} strokeWidth={2.5} className="animate-in zoom-in duration-300" /> : step.icon}
                                    </div>

                                    <div className="text-center">
                                        <p className={`font-extrabold text-[13px] sm:text-[14px] leading-tight mb-1
                                            ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                        <div className={`flex flex-col items-center ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                                            <span className={`text-[12px] font-medium ${isCurrent ? 'text-orange-600' : 'text-gray-500'}`}>
                                                {step.date}
                                            </span>
                                            <span className="text-[11px] text-gray-400">
                                                {step.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-wrap gap-3">
                <button className="bg-white border border-gray-300 rounded-lg px-5 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-sm transition-all focus:ring-2 focus:ring-orange-500 outline-none flex-1 sm:flex-none text-center">
                    Track Package Location
                </button>
                <button className="bg-white border border-gray-300 rounded-lg px-5 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:border-red-200 shadow-sm transition-all focus:ring-2 focus:ring-red-500 outline-none flex-1 sm:flex-none text-center">
                    Cancel Order
                </button>
                <button className="bg-white border border-transparent rounded-lg px-5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-500 outline-none flex-1 sm:flex-none text-center sm:ml-auto">
                    Get delivery help
                </button>
            </div>
        </div>
    );
};

export default OrderTracker;
