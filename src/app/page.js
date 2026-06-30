import React, { Suspense } from "react";
import HeroBanner from "@/components/Home/banner";
import CustomerReviews from "@/components/Home/CustomerReviews";
import TopLocations from "@/components/Home/TopLocations";
import TrustedOwners from "@/components/Home/TrustedOwners";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { Button } from "@heroui/react";

// ১. মূল হোম কন্টেন্ট আলাদা ফাংশনে রাখলাম
function HomeContent() {
    return (
        <div>
            <HeroBanner />
            <WhyChooseUs />
            <CustomerReviews />
            <TopLocations />
            <TrustedOwners />
        </div>
    );
}

// ২. মেইন এক্সপোর্টকে Suspense দিয়ে মুড়িয়ে দিলাম
export default function Home() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white text-slate-700 font-medium">
                Loading Home Page Context...
            </div>
        }>
            <HomeContent />
        </Suspense>
    );
}