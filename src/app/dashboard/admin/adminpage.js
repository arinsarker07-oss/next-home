'use client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import {
    HiOutlineArrowLeftOnRectangle,
    HiOutlineHomeModern,
    HiOutlineSquares2X2,
    HiUsers,
    HiBuildingOffice,
    HiCalendarDays,
    HiCreditCard,
} from "react-icons/hi2";
import AllUsersPage from './all-users/page';
import AllPropertiesPage from './all-properties/page';
import AllBookingsPage from './all-bookings/page';
import TransactionsPage from './transactions/page';
import ProfilePageAdmin from './profile/page';

export default function AdminOverviewPage({ allusers = [], allproperty = [], allBookingData = [] }) {
    const [stats] = useState({
        totalUsers: allusers.length,
        totalOwners: allusers.filter(user => user.role === 'owner').length,
        totalProperties: allproperty.length,
        totalBookings: allBookingData.length
    });
    
    const [activeTab, setActiveTab] = useState("overview");

    // 📈 বুকিং ডাটা প্রসেস এবং রেঞ্জ এডজাস্টমেন্ট
    const processedEarningsData = useMemo(() => {
        const monthsStructure = [
            { month: 'Jan', amount: 0 }, { month: 'Feb', amount: 0 },
            { month: 'Mar', amount: 0 }, { month: 'Apr', amount: 0 },
            { month: 'May', amount: 0 }, { month: 'Jun', amount: 0 },
            { month: 'Jul', amount: 0 }, { month: 'Aug', amount: 0 },
            { month: 'Sep', amount: 0 }, { month: 'Oct', amount: 0 },
            { month: 'Nov', amount: 0 }, { month: 'Dec', amount: 0 },
        ];

        allBookingData.forEach(booking => {
            if (booking.paymentStatus === 'paid' && booking.createdAt) {
                const date = new Date(booking.createdAt);
                const monthIndex = date.getMonth(); 
                
                if (monthIndex >= 0 && monthIndex <= 11) {
                    const cleanPrice = Number(booking.price || 0);
                    if (!isNaN(cleanPrice)) {
                        monthsStructure[monthIndex].amount += cleanPrice;
                    }
                }
            }
        });

        const maxAmount = Math.max(...monthsStructure.map(m => m.amount), 1);

        // পার্সেন্টেজ হাইট অ্যাসাইন করা
        return monthsStructure.map(m => {
            let calculatedHeight = 0;
            
            if (m.amount > 0) {
                // ট্রিক: যদি ডাটা থাকে, তবে লিনিয়ার ক্যালকুলেশন করার পর সর্বনিম্ন ৪% হাইট দেওয়া হলো 
                // যাতে কোটি টাকার পাশে হাজার টাকা থাকলেও বারটি একদম নিচে মিশে না যায়।
                calculatedHeight = Math.round((m.amount / maxAmount) * 100);
                if (calculatedHeight < 4) calculatedHeight = 4; 
            }

            return {
                ...m,
                height: `${calculatedHeight}%`
            };
        });
    }, [allBookingData]);

    // বাম পাশের স্কেলের জন্য টপ ম্যাক্সিমাম ভ্যালু
    const totalMax = useMemo(() => {
        const actualMax = Math.max(...processedEarningsData.map(m => m.amount), 0);
        return actualMax > 0 ? actualMax : 10000;
    }, [processedEarningsData]);

    // বড় সংখ্যাকে সহজে পড়ার জন্য কারেন্সি ফরম্যাটার
    const formatCurrency = (value) => {
        if (value >= 10000000) return `৳${(value / 10000000).toFixed(1)}Cr`;
        if (value >= 100000) return `৳${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `৳${(value / 1000).toFixed(1)}k`;
        return `৳${value}`;
    };

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-hidden">

            {/* 🧭 Left-Side Navigation Panel */}
            <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 flex-shrink-0 border-r border-slate-900 hidden md:flex">
                <div className="space-y-8">
                    <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-900">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <HiOutlineHomeModern className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-tight text-white leading-none">NextHome</h2>
                            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Portal v3.1</span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block mb-2">Admin Panel</span>

                        <button onClick={() => setActiveTab("overview")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "overview" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiOutlineSquares2X2 className="w-4 h-4" />
                            <span>Overview</span>
                        </button>

                        <button onClick={() => setActiveTab("users")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "users" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiUsers className="w-4 h-4" />
                            <span>Users</span>
                        </button>

                        <button onClick={() => setActiveTab("properties")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "properties" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiBuildingOffice className="w-4 h-4" />
                            <span>Properties</span>
                        </button>

                        <button onClick={() => setActiveTab("bookings")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "bookings" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCalendarDays className="w-4 h-4" />
                            <span>Bookings</span>
                        </button>

                        <button onClick={() => setActiveTab("transactions")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "transactions" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCreditCard className="w-4 h-4" />
                            <span>Transactions</span>
                        </button>
                        
                        <button onClick={() => setActiveTab("profile")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "profile" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCreditCard className="w-4 h-4" />
                            <span>Profile</span>
                        </button>
                    </nav>
                </div>

                <div className="space-y-1.5 border-t border-slate-900 pt-4">
                    <Link href={"/"}>
                        <button className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-all">
                            <HiOutlineArrowLeftOnRectangle className="w-4 h-4" />
                            <span>Exit Dashboard</span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* ─── 🚀 MAIN WORKSPACE CONTENT AREA ─── */}
            <main className="flex-1 min-h-screen overflow-y-auto p-6 md:p-8 space-y-8">

                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight capitalize">
                        {activeTab === 'overview' ? 'Dashboard Overview' : `Manage ${activeTab}`}
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        System administration control logs and analytical modules.
                    </p>
                </div>

                {activeTab === "overview" && (
                    <>
                        {/* 📊 Top Stats Cards Block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Total Users</p><h3 className="text-3xl font-black text-slate-800">{stats.totalUsers}</h3></div>
                                <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl"><HiUsers className="w-6 h-6" /></div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Total Owners</p><h3 className="text-3xl font-black text-slate-800">{stats.totalOwners}</h3></div>
                                <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><HiBuildingOffice className="w-6 h-6" /></div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Total Properties</p><h3 className="text-3xl font-black text-slate-800">{stats.totalProperties}</h3></div>
                                <div className="p-3.5 bg-orange-50 text-orange-500 rounded-xl"><HiBuildingOffice className="w-6 h-6" /></div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                                <div><p className="text-[11px] font-bold text-slate-400 uppercase">Total Bookings</p><h3 className="text-3xl font-black text-slate-800">{stats.totalBookings}</h3></div>
                                <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl"><HiCalendarDays className="w-6 h-6" /></div>
                            </div>
                        </div>

                        {/* 📈 Bar Graph Render */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                            <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase">Monthly Earnings (Paid)</h2>
                            <div className="flex items-end h-80 w-full pt-4 border-b border-slate-200">
                                
                                {/* ডাইনামিক স্কেল ভ্যালু */}
                                <div className="flex flex-col justify-between h-full text-[11px] font-bold text-slate-400 pr-4 pb-6 select-none w-16 text-right">
                                    <span>{formatCurrency(totalMax)}</span>
                                    <span>{formatCurrency(totalMax * 0.75)}</span>
                                    <span>{formatCurrency(totalMax * 0.5)}</span>
                                    <span>{formatCurrency(totalMax * 0.25)}</span>
                                    <span>৳0</span>
                                </div>
                                
                                {/* ১২ মাসের গ্রিড */}
                                <div className="flex-1 grid grid-cols-12 items-end h-full gap-2 sm:gap-4 px-2">
                                    {processedEarningsData.map((data, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 group h-full justify-end relative cursor-pointer">
                                            {/* হভার পপ-আপ টুলটিপ */}
                                            <div className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md absolute bottom-full mb-2 shadow-md z-10 transition-all duration-200 whitespace-nowrap pointer-events-none">
                                                ৳{data.amount.toLocaleString('en-IN')}
                                            </div>
                                            {/* ডাইনামিক বার (সর্বনিম্ন ১২ পিক্সেল হাইট প্রটেকশন সহ) */}
                                            <div 
                                                style={{ height: data.height }} 
                                                className={`w-full rounded-t-lg transition-all min-h-[12px] ${
                                                    data.amount > 0 
                                                        ? 'bg-slate-950 group-hover:bg-blue-600' 
                                                        : 'bg-slate-100'
                                                }`} 
                                            />
                                            {/* মাসের নাম */}
                                            <span className="text-[10px] font-bold text-slate-500 pt-1 select-none">{data.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "users" && <AllUsersPage allusers={allusers} />}
                {activeTab === "properties" && <AllPropertiesPage allproperty={allproperty} />}
                {activeTab === "bookings" && <AllBookingsPage allBookingData={allBookingData} />}
                {activeTab === "transactions" && <TransactionsPage />}
                {activeTab === "profile" && <ProfilePageAdmin />}

            </main>
        </div>
    );
}