'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react'; // Hero UI v3.1 Component
import { HiShieldCheck, HiArrowLeft, HiHome } from 'react-icons/hi2';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* 🛡️ অ্যানিমেটেড আইকন সেকশন */}
        <div className="relative flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.1 
            }}
            className="p-5 bg-rose-50 rounded-full border border-rose-100 shadow-sm relative z-10"
          >
            <HiShieldCheck className="w-16 h-16 text-rose-500" />
          </motion.div>
          
          {/* ব্যাকগ্রাউন্ড পালস ইফেক্ট */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 m-auto w-24 h-24 bg-rose-100/50 rounded-full blur-xl"
          />
        </div>

        {/* 📝 টেক্সট ও মেসেজ সেকশন */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3"
        >
          <span className="text-[11px] font-extrabold tracking-widest text-rose-500 uppercase bg-rose-50 border border-rose-100 px-3 py-1 rounded-full">
            403 Access Denied
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mt-3">
            Unauthorized Access
          </h1>
          <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto leading-relaxed">
            Oops! You don&apos;t have permission to view this page. This area is restricted based on user roles and permissions.
          </p>
        </motion.div>

        {/* 🔘 অ্যাকশন বাটন গ্রুপ (Hero UI Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          {/* পূর্ববর্তী পেজে ফিরে যাওয়ার বাটন */}
          <Button
            onPress={() => router.back()}
            variant="bordered"
            radius="xl"
            className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider h-11 px-6 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 min-w-[140px]"
            startContent={<HiArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>

          {/* হোম পেজে যাওয়ার বাটন */}
          <Button
            onPress={() => router.push('/')}
            color="default"
            radius="xl"
            className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider h-11 px-6 bg-slate-950 text-white hover:bg-blue-600 transition-all min-w-[140px] shadow-sm"
            startContent={<HiHome className="w-4 h-4" />}
          >
            Home Page
          </Button>
        </motion.div>
        
      </div>
    </div>
  );
}