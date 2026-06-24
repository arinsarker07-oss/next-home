'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowsRightLeft, HiOutlineMapPin } from 'react-icons/hi2';
import { MdOutlineBed } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ item }) {
    if (!item) return null;
    const propertyId = item._id || item.id;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
        >
            {/* 📸 ইমেজ সেকশন */}
            <div className="relative w-full h-52 bg-slate-100 overflow-hidden flex-shrink-0">
                <Image
                    src={item.images || "https://i.ibb.co/Q3VnNyBh/Gemini-Generated-Image-hxva0khxva0khxva.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 z-10">
                    <span className="bg-emerald-50 backdrop-blur-md text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200/50">
                        {item.status || "Approved"}
                    </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl">
                        {item.rentType}
                    </span>
                </div>
            </div>

            {/* 📝 কন্টেন্ট */}
            <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                        {item.propertyType}
                    </span>
                    <h3 className="text-base font-black text-slate-800 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-400">
                        <HiOutlineMapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-semibold text-slate-500 truncate">
                            {item.location}
                        </span>
                    </div>
                </div>

                {/* 🛏️ ইনফো গ্রিড */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-slate-600">
                    <div className="flex items-center gap-1.5 justify-center">
                        <MdOutlineBed className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700">{item.bedrooms} Bed</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center border-x border-slate-100">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0a3 3 0 116 0v12m-6 0a3 3 0 006 0M4 18h16" />
                        </svg>
                        <span className="text-xs font-bold text-slate-700">{item.bathrooms} Bath</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center">
                        <HiOutlineArrowsRightLeft className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs font-bold text-slate-700">{item.size} sqft</span>
                    </div>
                </div>

                {/* 💰 প্রাইস */}
                <div className="flex items-center justify-between pt-1">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Price</span>
                        <p className="text-lg font-black text-slate-900 mt-1">
                            ৳{Number(item.price).toLocaleString()}
                            <span className="text-xs font-medium text-slate-400">/{item.rentType === 'Weekly' ? 'wk' : 'mo'}</span>
                        </p>
                    </div>
                    <Link
                        href={`/properties/${propertyId}`}
                        className="px-4 py-2 bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}