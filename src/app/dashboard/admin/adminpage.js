'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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

// ─── ১. SUB-COMPONENTS IMPORT/DECLARATION ───


// ─── ২. MAIN WRAPPER CORE DASHBOARD ───

export default function AdminOverviewPage({ allusers, allproperty , allBookingData}) {
    const [stats] = useState(
        {
            totalUsers: allusers.length,
            totalOwners: allusers.filter(users => users.role === 'owner').length,
            totalProperties: allproperty.length,
            totalBookings: allBookingData.length
        });
    const [activeTab, setActiveTab] = useState("overview");

    const earningsData = [
        { month: 'Jan', amount: 1200, height: 'h-[40%]' },
        { month: 'Feb', amount: 1800, height: 'h-[60%]' },
        { month: 'Mar', amount: 1500, height: 'h-[50%]' },
        { month: 'Apr', amount: 2400, height: 'h-[80%]' },
        { month: 'May', amount: 3000, height: 'h-[100%]' },
        { month: 'Jun', amount: 2800, height: 'h-[93%]' },
    ];

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

                        {/* Overview */}
                        <button onClick={() => setActiveTab("overview")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "overview" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiOutlineSquares2X2 className="w-4 h-4" />
                            <span>Overview</span>
                        </button>

                        {/* All Users */}
                        <button onClick={() => setActiveTab("users")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "users" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiUsers className="w-4 h-4" />
                            <span>Users</span>
                        </button>

                        {/* All Properties */}
                        <button onClick={() => setActiveTab("properties")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "properties" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiBuildingOffice className="w-4 h-4" />
                            <span>Properties</span>
                        </button>

                        {/* All Bookings */}
                        <button onClick={() => setActiveTab("bookings")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "bookings" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCalendarDays className="w-4 h-4" />
                            <span>Bookings</span>
                        </button>

                        {/* Transactions */}
                        <button onClick={() => setActiveTab("transactions")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "transactions" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCreditCard className="w-4 h-4" />
                            <span>Transactions</span>
                        </button>
                        {/* profile */}
                        <button onClick={() => setActiveTab("profile")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "profile" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}>
                            <HiCreditCard className="w-4 h-4" />
                            <span>profile</span>
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

                {/* Dynamic Header Titles */}
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight capitalize">
                        {activeTab === 'overview' ? 'Dashboard Overview' : `Manage ${activeTab}`}
                    </h1>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                        System administration control logs and analytical modules.
                    </p>
                </div>

                {/* ─── ৩. CONDITIONAL ROUTING MECHANISM (As requested) ─── */}
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
                            <h2 className="text-sm font-black text-slate-800 tracking-tight uppercase">Monthly Earnings</h2>
                            <div className="flex items-end h-80 w-full pt-4 border-b border-slate-200">
                                <div className="flex flex-col justify-between h-full text-[11px] font-bold text-slate-400 pr-4 pb-6">
                                    <span>3000</span><span>2250</span><span>1500</span><span>750</span><span>0</span>
                                </div>
                                <div className="flex-1 grid grid-cols-6 items-end h-full gap-3 sm:gap-6 px-2">
                                    {earningsData.map((data, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 group h-full justify-end relative">
                                            <div className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md absolute bottom-full mb-2 shadow-md z-10">৳{data.amount}</div>
                                            <div className={`${data.height} w-full bg-slate-950 rounded-t-xl transition-all hover:bg-slate-800 cursor-pointer`} />
                                            <span className="text-[11px] font-bold text-slate-500 pt-1">{data.month}</span>
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