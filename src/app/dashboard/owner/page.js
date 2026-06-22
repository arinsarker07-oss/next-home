'use client';
import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { HiOutlineArrowLeftOnRectangle, HiOutlineBanknotes, HiOutlineCalendarDays, HiOutlineDocumentText, HiOutlineHomeModern, HiOutlineInboxArrowDown, HiOutlinePlusCircle, HiOutlineSquares2X2, HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineTrendingUp } from "react-icons/hi";
import Link from "next/link";
import AddPropertyPage from "./add-property/page";

export default function OwnerDashboardMain() {
    // Navigation active tab controller logic for future router bindings
    const [activeTab, setActiveTab] = useState("overview");

    // Summary Metrics data mimicking successful transactional entries
    const summaryCards = [
        {
            id: 1,
            title: "Total Earnings",
            value: "৳125,000",
            icon: <HiOutlineBanknotes className="w-6 h-6 text-emerald-600" />,
            bg: "bg-emerald-50/40 border-emerald-100",
            description: "Sum of all successful payments"
        },
        {
            id: 2,
            title: "Total Properties",
            value: "12",
            icon: <HiOutlineHomeModern className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50/40 border-blue-100",
            description: "Properties created by you"
        },
        {
            id: 3,
            title: "Total Bookings",
            value: "58",
            icon: <HiOutlineCalendarDays className="w-6 h-6 text-purple-600" />,
            bg: "bg-purple-50/40 border-purple-100",
            description: "Confirmed rental slots"
        }
    ];

    // Recharts 12 Months aggregated statistical simulation matrix
    const monthlyEarningsData = [
        { month: "Jan", earnings: 15000 },
        { month: "Feb", earnings: 18000 },
        { month: "Mar", earnings: 22000 },
        { month: "Apr", earnings: 25000 },
        { month: "May", earnings: 21000 },
        { month: "Jun", earnings: 30000 },
        { month: "Jul", earnings: 34000 },
        { month: "Aug", earnings: 28000 },
        { month: "Sep", earnings: 40000 },
        { month: "Oct", earnings: 37000 },
        { month: "Nov", earnings: 45000 },
        { month: "Dec", earnings: 125000 }
    ];

    return (
        // Outer Shell Layout: Flex matrix grouping Aside Navigation and Content Wrapper
        <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-x-hidden">

            {/* 🧭 Left-Side Navigation Guard Module (<aside> implementation matching image_74a79e.png) */}
            <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 flex-shrink-0 border-r border-slate-900 hidden md:flex">
                <div className="space-y-8">
                    {/* Top Brand Block */}
                    <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-900">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <HiOutlineHomeModern className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black tracking-tight text-white leading-none">NextHome</h2>
                            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Portal v3.1</span>
                        </div>
                    </div>

                    {/* Navigation Action Links Routing Matrix */}
                    <nav className="space-y-1">
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block mb-2">Main Menu</span>

                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "overview"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineSquares2X2 className="w-4 h-4" />
                            <span>Dashboard Home</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("add")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "add"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlinePlusCircle className="w-4 h-4" />
                            <span>Add Property</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("properties")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "properties"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineDocumentText className="w-4 h-4" />
                            <span>My Properties</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("requests")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "requests"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineInboxArrowDown className="w-4 h-4" />
                            <span>Booking Requests</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "profile"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineUserCircle className="w-4 h-4" />
                            <span>Profile Context</span>
                        </button>
                    </nav>
                </div>

                {/* Aside Sticky Footer Utilities */}
                <div className="space-y-1.5 border-t border-slate-900 pt-4">
                    <Link href={"/"}>
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-all">
                            <HiOutlineArrowLeftOnRectangle className="w-4 h-4" />
                            <span >Exit Dashboard</span>
                        </button>
                    </Link>
                </div>
            </aside>

            {/* 🚀 Dynamic Right Content Viewport Panel */}
            {activeTab === "overview" && (
                <main className="flex-grow p-4 md:p-8 space-y-8 overflow-y-auto max-h-screen">

                    {/* Header Dynamic Summary Block */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200/60">
                        <div className="space-y-1">
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                Owner Dashboard
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">
                                Overview of your current real estate portfolio performance.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm text-xs font-bold text-slate-700">
                            <HiOutlineTrendingUp className="text-emerald-500 w-4 h-4 animate-pulse" />
                            <span>Live Aggregates Active</span>
                        </div>
                    </div>

                    {/* Summary Metric Component Matrix Grid */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {summaryCards.map((card) => (
                            <motion.div
                                key={card.id}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                                }}
                            >
                                <Card className={`border shadow-sm rounded-2xl bg-white ${card.bg} transition-all duration-300 hover:shadow-md`}>
                                    <section className="p-6 flex flex-row items-center justify-between gap-4">
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                                                {card.title}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                                {card.value}
                                            </h2>
                                            <p className="text-[11px] text-slate-400 font-medium leading-none">
                                                {card.description}
                                            </p>
                                        </div>
                                        <div className="p-3.5 bg-white border border-slate-100 rounded-xl shadow-sm flex-shrink-0">
                                            {card.icon}
                                        </div>
                                    </section>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Recharts Analytics Visualization Component Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-full"
                    >
                        <Card className="border border-slate-200/60 shadow-sm rounded-2xl bg-white p-6">
                            <section className="p-0 space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                                        Monthly Earnings
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium">
                                        Detailed timeline mapping out historical metrics of confirmed property returns.
                                    </p>
                                </div>

                                {/* Graphical Canvas Render Wrapper */}
                                <div className="w-full h-80 pt-2 text-xs">
                                    <ResponsiveContainer width="100%" h="100%">
                                        <AreaChart
                                            data={monthlyEarningsData}
                                            margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="ownerDashboardColor" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="month"
                                                axisLine={false}
                                                tickLine={false}
                                                stroke="#94a3b8"
                                                fontWeight={600}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                stroke="#94a3b8"
                                                fontWeight={600}
                                                tickFormatter={(val) => `৳${val}`}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '12px',
                                                    borderColor: '#e2e8f0',
                                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
                                                }}
                                                formatter={(val) => [`৳${val.toLocaleString()}`, 'Earnings']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="earnings"
                                                stroke="#2563eb"
                                                strokeWidth={2.5}
                                                fillOpacity={1}
                                                fill="url(#ownerDashboardColor)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>
                        </Card>
                    </motion.div>

                </main>
            )}
            {activeTab === "add" && (
                <AddPropertyPage></AddPropertyPage>
            )}
            {activeTab === "properties" && (
                <div> gg</div>
            )}
            {activeTab === "requests" && (
                <div>
                    <h2>Welcome to Dashboard Overview</h2>
                    {/* এখানে ড্যাশবোর্ডের মেইন গ্রাফ বা ডেটা থাকবে */}
                </div>
            )}
            {activeTab === "profile" && (
                <div>
                    <h2>Welcome to Dashboard Overview</h2>
                    {/* এখানে ড্যাশবোর্ডের মেইন গ্রাফ বা ডেটা থাকবে */}
                </div>
            )}

        </div>
    );
}