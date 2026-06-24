import React from 'react';
import { getAllProperty } from '@/lib/api/allProperty';
import FilterSection from '@/components/fillter';
import PropertyCard from '@/components/propertiesCard';

const Page = async ({ searchParams }) => {
    // 🔍 URL থেকে কুয়েরি প্যারামিটারগুলো নেওয়া হচ্ছে
    const params = await searchParams;
    const search = params?.search || '';
    const type = params?.type || '';
    const sort = params?.sort || '';

    // 🚀 ব্যাকএন্ড থেকে ডাটা ফেচ করা হচ্ছে
    const properties = await getAllProperty({ search, type, sort });

    // শুধুমাত্র "Approved" স্ট্যাটাসের প্রোপার্টি ফিল্টার করা
    const approvedProperties = properties?.filter(item => item.status === "Approved") || [];

    return (
        <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* 📝 হেডার সেকশন */}
                <div className="text-center md:text-left space-y-2">
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                        Verified Properties
                    </h1>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Browse, filter, and discover your next perfect space seamlessly.
                    </p>
                </div>

                {/* 🎛️ ফিল্টার, সার্চ ও সর্টিং বার কম্পোনেন্ট */}
                <FilterSection currentFilters={{ search, type, sort }} />

                {/* 🎯 ৩-কলাম গ্রিড লেআউট */}
                {approvedProperties.length === 0 ? (
                    <div className="w-full text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-400">No approved properties match your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {approvedProperties.map((singleProperty) => (
                            <PropertyCard key={singleProperty._id} item={singleProperty} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Page;