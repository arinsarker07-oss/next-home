'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineMapPin,  HiHeart,
    HiOutlinePhone, HiOutlineEnvelope, HiOutlineUser, HiOutlineCalendar
} from 'react-icons/hi2';
import { FaStar, FaRegStar, FaCheckSquare } from 'react-icons/fa';
import Image from 'next/image';

// 💡 ধরে নিচ্ছি আপনার একটি AuthContext আছে যা থেকে কারেন্ট লগইন ইউজারের তথ্য পাওয়া যায়
// import { useAuth } from '@/context/AuthContext'; 

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    // মক ইউজার সেশন (আপনার AuthContext/JWT সেশন থেকে এই ডেটা আসবে)
    // const { user } = useAuth();
    const user = {
        _id: "user_67890",
        name: "Ashraful Islam",
        email: "ashraful@example.com",
        role: "Tenant"
    };

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // বুকিং ফর্ম স্টেট (নাম এবং ইমেল ইউজারের সেশন থেকে ডাইনামিক্যালি রিড-অনলি থাকবে)
    const [moveInDate, setMoveInDate] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    // রিভিউ স্টেট
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);

    // 🔄 ১. এপিআই থেকে নির্দিষ্ট প্রোপার্টির ডেটা ও ফেভরিট স্ট্যাটাস লোড করা
    useEffect(() => {
        if (id) {
            // আপনার backend API কল এখানে হবে:
            // axiosSecure.get(`/properties/${id}`).then(...)

            const mockData = {
                _id: id,
                title: "Luxury Penthouse with Skyline View",
                description: "Stunning top-floor penthouse featuring panoramic city views, floor-to-ceiling windows, and unparalleled luxury in the heart of the city.",
                location: "New York, New York",
                propertyType: "Apartment",
                price: 8500,
                rentType: "Monthly",
                bedrooms: 3,
                bathrooms: 3.5,
                size: 2800,
                amenities: ["Private Elevator", "24/7 Doorman", "Infinity Pool", "Gym"],
                images: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                extraFeatures: "Smart home automation, Wine cellar, Marble countertops",
                owner: {
                    name: "Zahid Hasan",
                    email: "zahid@owner.com",
                    phone: "+1 (212) 555-0199"
                }
            };

            setProperty(mockData);
            setReviews([
                { name: "Sabbir Rahman", email: "sabbir@test.com", date: "June 20, 2026", rating: 5, comment: "Absolutely breathtaking views! Highly recommended." }
            ]);
            setLoading(false);
        }
    }, [id]);

    // ❤️ ২. ডাটাবেজে ফেভরিট অ্যাড/রিমুভ করার হ্যান্ডলার
    const handleToggleFavorite = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        try {
            // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
            // await axiosSecure.post('/favorites', { userId: user._id, propertyId: id });
            setIsFavorite(!isFavorite);
            alert(isFavorite ? "Removed from Favorites!" : "Added to Favorites successfully!");
        } catch (error) {
            console.error("Error updating favorite status", error);
        }
    };

    // 📅 ৩. বুকিং কনফার্ম করে স্ট্রাইপ পেমেন্টে রিডাইরেক্ট করা
    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        // বুকিং ডেটা অবজেক্ট তৈরি (ইউজার ইনফো ব্যাকএন্ড বা পেমেন্ট গেটওয়েতে পাঠানোর জন্য)
        const bookingPayload = {
            propertyId: id,
            tenantId: user._id,
            tenantName: user.name,
            tenantEmail: user.email,
            moveInDate,
            contactNumber,
            additionalNotes,
            price: property.price
        };

        console.log("Proceeding to payment with details:", bookingPayload);

        // স্ট্রাইপ পেমেন্ট চেকআউট পেজে পাঠানো হচ্ছে কুয়েরি প্যারামস সহ
        router.push(`/payment/checkout?propertyId=${id}&date=${moveInDate}&phone=${contactNumber}`);
    };

    // 💬 ৪. রিভিউ সাবমিট হ্যান্ডলার
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newReview = {
            name: user.name,
            email: user.email,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            rating,
            comment
        };
        setReviews([newReview, ...reviews]);
        setComment('');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">Loading Details...</div>;
    if (!property) return <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold">Property Not Found!</div>;

    return (
        <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ─── বাম দিক: মূল কন্টেন্ট ─── */}
                <div className="lg:col-span-2 space-y-8">
                    {/* ইমেজ সেকশন */}
                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-sm group border border-slate-100">
                        <Image
                            src={property.images}
                            alt={property.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* প্রোপার্টি মেটা ও টাইটেল */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">{property.propertyType}</span>
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">{property.rentType} Rent</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{property.title}</h1>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                            <HiOutlineMapPin className="w-5 h-5 text-slate-400" />
                            <span>{property.location}</span>
                        </div>
                    </div>

                    {/* স্পেসিফিকেশন গ্রিড */}
                    <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm text-center">
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bedrooms</p>
                            <p className="text-slate-800 font-black text-base mt-0.5">{property.bedrooms} Beds</p>
                        </div>
                        <div className="border-x border-slate-100">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Bathrooms</p>
                            <p className="text-slate-800 font-black text-base mt-0.5">{property.bathrooms} Baths</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Size Space</p>
                            <p className="text-slate-800 font-black text-base mt-0.5">{property.size} sqft</p>
                        </div>
                    </div>

                    {/* ডেসক্রিপশন */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-3">
                        <h2 className="text-base font-black text-slate-800 uppercase tracking-tight">About This Property</h2>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">{property.description}</p>
                    </div>

                    {/* এ্যামেনিটিজ */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
                        <h2 className="text-base font-black text-slate-800 uppercase tracking-tight">Amenities Included</h2>
                        <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity, i) => (
                                <span key={i} className="bg-slate-50 border border-slate-200/60 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">{amenity}</span>
                            ))}
                        </div>
                    </div>

                    {/* রিভিউ মডিউল */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
                        <h2 className="text-base font-black text-slate-800 uppercase tracking-tight">Ratings & Reviews ({reviews.length})</h2>

                        <form onSubmit={handleReviewSubmit} className="space-y-4 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">Your Rating:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button type="button" key={star} onClick={() => setRating(star)}>
                                            {star <= rating ? <FaStar className="text-amber-400 w-4 h-4" /> : <FaRegStar className="text-slate-300 w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience about this property..."
                                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 font-medium transition-colors"
                                required
                            />
                            <button type="submit" className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-blue-600 transition-all">Submit Review</button>
                        </form>

                        <div className="space-y-4 divide-y divide-slate-100">
                            {reviews.map((rev, index) => (
                                <div key={index} className="pt-4 first:pt-0 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-800">{rev.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-semibold">{rev.email} • {rev.date}</p>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(rev.rating)].map((_, i) => <FaStar key={i} className="text-amber-400 w-3 h-3" />)}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── ডান দিক: স্টিকি প্রাইসিং ও বুকিং অ্যাকশন ─── */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm sticky top-6 space-y-4">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">Price Rate</span>
                            <p className="text-3xl font-black text-slate-900 mt-1">
                                ৳{property.price.toLocaleString()}
                                <span className="text-xs font-medium text-slate-400">/{property.rentType === 'Weekly' ? 'wk' : 'mo'}</span>
                            </p>
                        </div>

                        {/* বুকিং ট্রিগার বাটন */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full cursor-pointer bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs h-12 rounded-2xl shadow-sm transition-all uppercase tracking-wider"
                        >
                            Book Property Now
                        </button>

                        {/* 🎯 রিকোয়ারমেন্ট অনুযায়ী: Book Now এর ঠিক নিচে এড টু ফেভরিট বাটন */}
                        <button
                            onClick={handleToggleFavorite}
                            className='w-full cursor-pointer flex items-center justify-center gap-2 font-bold text-xs h-12 rounded-2xl border transition-all uppercase tracking-wider bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'>
                            <HiHeart className="w-4 h-4 text-rose-500 scale-110" />
                            {!isFavorite ?
                                <span >Save to Favorites</span>
                                :
                                <span>Remove to Favorites</span>}
                        </button>

                        <div className="border-t border-slate-100 pt-5 space-y-3">
                            <div className="space-y-2 text-xs font-semibold text-slate-600">
                                <div className="flex items-center gap-2"><FaCheckSquare className="text-slate-400 w-4 h-4" /> <span>Verified Property</span></div>
                                <div className="flex items-center gap-2"><FaCheckSquare className="text-slate-400 w-4 h-4" /> <span>Secure Payment</span></div>
                                <div className="flex items-center gap-2"><FaCheckSquare className="text-slate-400 w-4 h-4" /> <span>Instant Booking</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ─── ডাইনামিক বুকিং মডাল (ইউজার ডাটা অটো-ফিলড) ─── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 relative border border-slate-100"
                        >
                            <h2 className="text-lg font-black text-slate-800 tracking-tight mb-5">Confirm Rental Booking</h2>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                {/* নাম (অটো-ফিল্ড এবং রিড-অনলি) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Full Name</label>
                                    <div className="relative flex items-center">
                                        <HiOutlineUser className="absolute left-3 text-slate-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            value={user.name}
                                            readOnly
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed outline-none"
                                        />
                                    </div>
                                </div>

                                {/* ইমেল (অটো-ফিল্ড এবং রিড-অনলি) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Email Address</label>
                                    <div className="relative flex items-center">
                                        <HiOutlineEnvelope className="absolute left-3 text-slate-400 w-4 h-4" />
                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed outline-none"
                                        />
                                    </div>
                                </div>

                                {/* মুভ-ইন ডেট (ইউজার ইনপুট দেবে) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Target Move-In Date</label>
                                    <div className="relative flex items-center">
                                        <HiOutlineCalendar className="absolute left-3 text-slate-400 w-4 h-4" />
                                        <input
                                            type="date"
                                            required
                                            value={moveInDate}
                                            onChange={(e) => setMoveInDate(e.target.value)}
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* কন্টাক্ট নাম্বার (ইউজার ইনপুট দেবে) */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Active Contact Number</label>
                                    <div className="relative flex items-center">
                                        <HiOutlinePhone className="absolute left-3 text-slate-400 w-4 h-4" />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="e.g. +88017XXXXXXXX"
                                            value={contactNumber}
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* অতিরিক্ত নোট */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block pl-1">Additional Notes (Optional)</label>
                                    <textarea
                                        rows="2"
                                        placeholder="Any specific instructions..."
                                        value={additionalNotes}
                                        onChange={(e) => setAdditionalNotes(e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-700 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* বাটন একশন */}
                                <div className="flex gap-3 pt-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-1/2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs h-11 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-1/2 cursor-pointer bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs h-11 rounded-xl transition-colors shadow-sm"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}