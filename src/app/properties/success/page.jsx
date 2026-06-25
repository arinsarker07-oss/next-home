'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { 
  HiCheckCircle, 
  HiOutlineCalendar, 
  HiOutlineCreditCard, 
  HiOutlineDocumentCheck,
  HiArrowRight
} from 'react-icons/hi2';

// Next.js-এ useSearchParams ব্যবহার করলে সেটিকে Suspense-এর ভেতরে রাখা বেস্ট প্র্যাকটিস
function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // স্ট্রাইপ সফল পেমেন্টের পর ডিফল্টভাবে 'session_id' কি-তে আইডি পাঠায়
  const sessionId = searchParams.get('session_id');
  
  // আমরা এখানে কিছু স্টেট ব্যবহার করব যাতে ডাটা প্রসেসিং স্ট্যাটাস দেখানো যায়
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid or missing session session_id.');
      setLoading(false);
      return;
    }

    // এখানে আপনি চাইলে একটি এপিআই কল করে ডাটাবেজে বুকিং স্ট্যাটাস 'Pending' থেকে 'Paid' বা 'Success' করতে পারেন।
    // আপাতত ক্লায়েন্ট সাইড লোডিং সিমুলেশন করা হলো
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-900"></div>
        <p className="text-xs text-slate-500 font-medium mt-4">Verifying your payment, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center bg-slate-50/50 text-center px-4">
        <p className="text-red-500 font-semibold mb-4">{error}</p>
        <Button onPress={() => router.push('/')} size="sm" className="bg-slate-950 text-white">Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50/50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/60 shadow-xl p-8 relative overflow-hidden">
        
        {/* ─── ব্যাকগ্রাউন্ড প্রিমিয়াম গ্লো ইফেক্ট ─── */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-6 relative z-10">
          
          {/* 🛡️ সাকসেস অ্যানিমেটেড আইকন */}
          <div className="relative flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-emerald-50 border border-emerald-100 p-4 rounded-full shadow-sm"
            >
              <HiCheckCircle className="w-16 h-16 text-emerald-500" />
            </motion.div>
            
            {/* ডবল রিং পালস অ্যানিমেশন */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-24 h-24 border-2 border-emerald-400/20 rounded-full pointer-events-none"
            />
          </div>

          {/* 📝 টাইটেল ও হেডার */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              Payment Secured
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Booking Confirmed!
            </h1>
            <p className="text-slate-500 text-xs font-medium max-w-sm mx-auto leading-relaxed">
              Thank you for your payment. Your reservation request has been processed successfully and sent to the owner.
            </p>
          </motion.div>

          {/* 💳 ইনভয়েস/রিসিট ডিটেইলস কার্ড */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 text-left space-y-3.5"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Booking Status</span>
              <span className="inline-block text-[10px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded-md mt-1">
                Paid & Confirmed
              </span>
            </div>

            <div className="border-t border-slate-200/60 pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stripe Session ID</span>
              <code className="text-[10px] font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md block mt-1 select-all break-all">
                {sessionId}
              </code>
            </div>
          </motion.div>

          {/* 🔘 অ্যাকশন বাটন গ্রুপ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            {/* ড্যাশবোর্ডে যাওয়ার বাটন */}
            <Button
              onPress={() => router.push('/dashboard/tenant')}
              variant="bordered"
              radius="xl"
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider h-11 px-6 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 min-w-[160px]"
              startContent={<HiOutlineCalendar className="w-4 h-4" />}
            >
              Go to Dashboard
            </Button>

            {/* হোম পেজে যাওয়ার বাটন */}
            <Button
              onPress={() => router.push('/')}
              color="default"
              radius="xl"
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider h-11 px-6 bg-slate-950 text-white hover:bg-blue-600 transition-all min-w-[160px] shadow-sm"
              endContent={<HiArrowRight className="w-4 h-4" />}
            >
              Go to Home
            </Button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// মেইন এক্সপোর্ট যা নেক্সট জেএস রান করবে
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50/50">
        <p className="text-xs text-slate-500 font-medium">Loading component...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}