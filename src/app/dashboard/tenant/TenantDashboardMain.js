'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import ProfilePage from "../owner/profile/page";
import { Chip, Spinner } from "@heroui/react";
import {
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowUpRight,
    HiOutlineCalendarDays,
    HiOutlineCreditCard,
    HiOutlineDocumentText,
    HiOutlineHeart,
    HiOutlineHomeModern,
    HiOutlinePlusCircle,
    HiOutlineSquares2X2,
    HiOutlineUserCircle,
    HiOutlineTrash
} from "react-icons/hi2";
import Image from "next/image";
import { data } from "framer-motion/client";
import { UnfavoriteProperty } from "@/lib/action/favouriteProperty";

export default function TenantDashboardMain({ UserBooking ,FavoriteProperty }) {
    const [activeTab, setActiveTab] = useState("overview");
    const router = useRouter();
    const { data: session, isPending, error } = useSession();
    const user = session?.user
    // console.log(user);
    // console.log(UserBooking);
    

    const totalAmount = UserBooking?.reduce((sum, item) => sum + (item.price || 0), 0);
    if (isPending) {
        return (
            <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-3">
                <Spinner size="lg" color="primary" />
                <p className="text-xs font-bold text-slate-400 animate-pulse">Loading overview insights...</p>
            </div>
        );
    }

    if (error || !session?.user) {
        router.push("/login");
        return null;
    }

    const stats = {
        totalBookings: UserBooking.length,
        savedProperties: 8,
        totalSpent: `৳ ${totalAmount}`
    };


    const recentBookings = UserBooking?.map((item) => ({
        id: item._id,
        propertyId: item.propertyId,
        property: item.propertyName,
        location: item.propertyLocation,
        image: item.propertyImage,
        rent: item.price,
        date: item.moveInDate,
        paymentStatus: item.paymentStatus,
        status: "pending",

    })) || [];
   console.log(recentBookings,"recent booking");
   
    const favoriteItems = FavoriteProperty?.map((item) => ({
        id: item._id,
        propertyId: item.propertyId,
        property: item.propertyName,
        location: item.propertyLocation,
        image: item.propertyImage,
        rent: item.price,
        date: item.moveInDate,
        paymentStatus: "Paid",
        status: "Pending",

    })) || [];

const handledelete = async (propertyId) => { // 🌟 parameter নাম propertyId করো
    const tenantId = user?._id || user?.id;
    console.log("Property ID:", propertyId, "Tenant ID:", tenantId);
    
    if (!propertyId || !tenantId) return;

    try {
        // ১. ডাটাবেজ থেকে রিমুভ হবে
        await UnfavoriteProperty(propertyId, tenantId);

        // ২. লোকাল স্টোরেজ ক্লিন
        const localStorageKey = `favorite_${tenantId}_${propertyId}`;
        localStorage.removeItem(localStorageKey);

        alert("Removed from Favorites successfully!");
        router.refresh(); 
        
    } catch (error) {
        console.error("Error deleting favorite item:", error);
    }
};

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 flex overflow-x-hidden">

            {/* 🧭 Left-Side Navigation */}
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
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 block mb-2">Main Menu</span>

                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "overview"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineSquares2X2 className="w-4 h-4" />
                            <span>Overview</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("add")}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "add"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlinePlusCircle className="w-4 h-4" />
                            <span>My Bookings</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("properties")}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "properties"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineDocumentText className="w-4 h-4" />
                            <span>Favorites</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === "profile"
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <HiOutlineUserCircle className="w-4 h-4" />
                            <span>Profile </span>
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

            {/* 🚀 Dynamic Right Content Viewport Panel */}
            {activeTab === "overview" && (
                <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-8 space-y-8 overflow-x-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-200/60 gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                                Welcome Back, {session.user.name || "Tenant"} 👋
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">
                                Here's a quick look at your rental activities, active bookings, and saved listings.
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/properties")}
                            className="flex cursor-pointer items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                        >
                            Explore Properties <HiOutlineArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
                                <p className="text-3xl font-black text-slate-900">{stats.totalBookings}</p>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600">
                                <HiOutlineCalendarDays className="w-7 h-7" />
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Favorites</span>
                                <p className="text-3xl font-black text-slate-900">{FavoriteProperty.length}</p>
                            </div>
                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-500">
                                <HiOutlineHeart className="w-7 h-7" />
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Expenses</span>
                                <p className="text-3xl font-black text-slate-900">{stats.totalSpent}</p>
                            </div>
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600">
                                <HiOutlineCreditCard className="w-7 h-7" />
                            </div>
                        </div>
                    </div>

                    {/* Table Block */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-black text-slate-900 tracking-tight">Recent Booking Activity</h2>
                            <button onClick={() => setActiveTab("add")} className="text-xs cursor-pointer font-bold text-blue-600 hover:underline">
                                View All
                            </button>
                        </div>

                        <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200/60">
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Property</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Booking Date</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Rent Rate</th>
                                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Image width={50} height={50} src={item.image} alt={item.property} className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-800 tracking-tight">{item.property}</span>
                                                        <span className="text-xs text-slate-400 font-medium">{item.location}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm font-semibold text-slate-600">{item.date}</td>
                                            <td className="p-4 text-sm font-bold text-slate-800">{item.rent}</td>
                                            <td className="p-4">
                                                <Chip className="capitalize font-bold text-[10px] px-2" color={item.status === "Approved" ? "success" : "warning"} size="sm" variant="flat">
                                                    {item.status}
                                                </Chip>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 📄 activeTab === "add" -> My Bookings */}
            {activeTab === "add" && (
                <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Bookings</h1>
                        <p className="text-xs text-slate-500 font-medium">Track your property reservation cycles and checkout pipelines.</p>
                    </div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/60">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Property Name</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Booking Date</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Amount Paid</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Payment Status</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Booking Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((item) => (  
                                    <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Image width={50} height={50} src={item.image} alt={item.property} className="w-10 h-10 rounded-xl object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{item.property}</p>
                                                    <p className="text-[11px] text-slate-400 font-medium">{item.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-semibold text-slate-600">{item.date}</td>
                                        <td className="p-4 text-sm font-bold text-slate-800">{item.rent}</td>
                                        <td className="p-4">
                                            <Chip className="font-bold text-[10px]" color={item.paymentStatus === "paid" ? "success" : "danger"}  variant="dot">
                                                {item.paymentStatus}
                                            </Chip>
                                        </td>
                                        <td className="p-4">
                                            <Chip className="font-bold text-[10px]" color={item.status === "Approved" ? "success" : "warning"} variant="flat">
                                                {item.status}
                                            </Chip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 📄 activeTab === "properties" -> Favorites */}
            {activeTab === "properties" && (
                <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-8 space-y-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Saved Favorites</h1>
                        <p className="text-xs text-slate-500 font-medium">Manage the real-estate listings you saved for later.</p>
                    </div>
                    <div className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/60">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Property Details</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Rental Value</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favoriteItems.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-all">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Image height={50} width={50} src={item.image} alt={item.property} className="w-12 h-12 rounded-xl object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{item.property}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{item.location}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-bold text-slate-700">{item.rent}</td>
                                        <td className="p-4 text-right">
                                            <button onClick={() => handledelete(item.propertyId)} className="p-2 cursor-pointer text-rose-500 hover:bg-rose-50 rounded-xl transition-all" aria-label="Remove item">
                                                <HiOutlineTrash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "requests" && (
                <div className="p-8">
                    <h2 className="text-lg font-black text-slate-900">Welcome to Dashboard Overview</h2>
                </div>
            )}

            {activeTab === "profile" && (
                <ProfilePage />
            )}

        </div>
    );
}