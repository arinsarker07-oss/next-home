'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiOutlineFunnel, HiArrowsUpDown } from "react-icons/hi2";

export default function FilterSection() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ইনপুটগুলোর লোকাল স্টেট
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [type, setType] = useState(searchParams.get('type') || '');
    const [sort, setSort] = useState(searchParams.get('sort') || '');

    // ইউআরএল চেঞ্জ হলে স্টেট সিঙ্ক রাখার জন্য
    useEffect(() => {
        setSearch(searchParams.get('search') || '');
        setType(searchParams.get('type') || '');
        setSort(searchParams.get('sort') || '');
    }, [searchParams]);

    // 🔄 ইনস্ট্যান্ট ইউআরএল আপডেট ফাংশন (শুধুমাত্র /properties পেজের জন্য)
    const updateUrlParams = (key, value) => {
        if (pathname === '/properties') {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    // ⏱️ লোকেশন সার্চের জন্য Debounce ইফেক্ট (টাইপ করা থামানোর ৫০০ms পর ফিল্টার হবে)
    useEffect(() => {
        // শুধুমাত্র প্রোপার্টিজ পেজে এবং ইউআরএল-এর বর্তমান ভ্যালুর সাথে অমিল থাকলে আপডেট হবে
        if (pathname === '/properties' && search !== (searchParams.get('search') || '')) {
            const delayDebounceFn = setTimeout(() => {
                updateUrlParams('search', search);
            }, 500); // ৫০০ মিলিসেকেন্ড ডিলে

            return () => clearTimeout(delayDebounceFn);
        }
    }, [search, pathname]);

    // 🚀 মেইন ফর্ম সাবমিট (হোমপেজ থেকে একবারে সব ফিল্টার নিয়ে রিডাইরেক্ট করার জন্য)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (type) params.set('type', type);
        if (sort) params.set('sort', sort);

        const targetPath = pathname === '/' ? '/properties' : pathname;
        router.push(`${targetPath}?${params.toString()}`);
    };

    return (
        <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSearchSubmit} 
            className="w-full bg-white border border-slate-200/80 p-5 rounded-3xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
            {/* Search Location */}
            <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Search Location</label>
                <div className="relative">
                    <HiMagnifyingGlass className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Enter city or location..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            // হোমপেজে থাকলে শুধু স্টেট চেঞ্জ হবে, অল প্রোপার্টিজ পেজে থাকলে উপরের useEffect (Debounce) দিয়ে অটো ফিল্টার হবে
                        }}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Property Type</label>
                <div className="relative">
                    <HiOutlineFunnel className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            updateUrlParams('type', e.target.value);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none"
                    >
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Studio">Studio</option>
                        <option value="House">House</option>
                        <option value="Cabin">Cabin</option>
                    </select>
                </div>
            </div>

            {/* Sort By Price */}
            <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Sort By Price</label>
                <div className="relative">
                    <HiArrowsUpDown className="absolute left-4 top-3.5 text-slate-400 w-4 h-4" />
                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            updateUrlParams('sort', e.target.value);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none"
                    >
                        <option value="">Default Sorting</option>
                        <option value="low-to-high">Price Low to High</option>
                        <option value="high-to-low">Price High to Low</option>
                    </select>
                </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm h-12 rounded-2xl shadow-md transition-all uppercase tracking-wider">
                Apply Filters
            </button>
        </motion.form>
    );
}