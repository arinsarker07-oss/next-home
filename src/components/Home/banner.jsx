'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMapPin, HiHomeModern, HiCurrencyDollar } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";

export default function HeroBanner() {
  // Collection of premium real estate background assets for the carousel layer
  const carouselImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Search filter core execution state registers
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: ""
  });

  // Custom Requirement: Automated background rotation mapping triggering every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // 5000ms mapping frequency sequence

    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);

  // Handle filter changes safely
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Process search parameters pipeline
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Captured search parameters pipeline initialization data:", filters);
    // Dynamic router redirect payload hook will be appended here during routing phase
  };

  return (
    <div className="relative w-full h-[620px] md:h-[680px] flex items-center justify-center overflow-hidden bg-slate-900">
      
      {/* Background Carousel Wrapper with AnimatePresence Fade Animations */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={carouselImages[currentSlide]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }} // Keeps background dim to maintain text legibility
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            alt="Premium Estate Background Presentation View"
          />
        </AnimatePresence>
        {/* Soft linear bottom transition shade layer matching the platform specifications */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
      </div>

      {/* Hero Central Text and Interactive Query Content Section */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 mt-12">
        
{/* Compelling Titles and Descriptive Framework Segment */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none"
          >
            Find Your Perfect <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Next Home</span>
          </motion.h1> {/* Fixed: Changed from </title> to </motion.h1> */}
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-200 font-medium leading-relaxed"
          >
            Explore luxury apartments, single-family houses, and residential spaces tailored exclusively to your lifestyle parameters. Easy processing guaranteed.
          </motion.p>
        </div>

        {/* Modular High-Precision 4-Filter Search Bar Wrapper */}
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={handleSearchSubmit}
          className="w-full bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl sm:rounded-full shadow-2xl shadow-slate-950/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center border border-white/20"
        >
          {/* Filter 1: Geographic Target Location Input */}
          <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <HiMapPin className="text-blue-600 text-xl flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider">Location</label>
              <input 
                type="text" 
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                placeholder="Where to live?" 
                className="w-full bg-transparent font-semibold text-slate-800 placeholder-slate-400 outline-none mt-0.5"
              />
            </div>
          </div>

          {/* Filter 2: Structural Property Architectural Type Dropdown */}
          <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 lg:border-r border-slate-200">
            <HiHomeModern className="text-blue-600 text-xl flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block text-xs font-extrabold  uppercase tracking-wider">Property Type</label>
              <select 
                name="propertyType"
                value={filters.propertyType}
                onChange={handleInputChange}
                className="w-full bg-transparent  font-semibold  text-slate-800 outline-none mt-0.5 cursor-pointer appearance-none"
              >
                <option  value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Duplex">Duplex Villa</option>
                <option value="Studio">Studio Room</option>
                <option value="Penthouse">Penthouse Suite</option>
              </select>
            </div>
          </div>

          {/* Filter 3: Minimum Budget Allocation Range */}
          <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
            <HiCurrencyDollar className="text-blue-600 text-xl flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block  font-extrabold text-black uppercase tracking-wider">Min Price</label>
              <input 
                type="number" 
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="$ Min" 
                className="w-full bg-transparent font-semibold text-slate-800 placeholder-slate-400 outline-none mt-0.5"
              />
            </div>
          </div>

          {/* Filter 4: Maximum Budget Cap Allocation */}
          <div className="flex items-center gap-3 px-3 py-2 border-b sm:border-b-0">
            <HiCurrencyDollar className="text-blue-600 text-xl flex-shrink-0" />
            <div className="w-full text-left">
              <label className="block  font-extrabold text-black uppercase tracking-wider">Max Price</label>
              <input 
                type="number" 
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="$ Max" 
                className="w-full bg-transparent  font-semibold text-slate-800 placeholder-slate-400 outline-none mt-0.5"
              />
            </div>
          </div>

          {/* Submission Gate: Execute Data Optimization Flow */}
          <div className="w-full lg:col-span-1 pt-2 sm:pt-0">
            <button 
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
            >
              <LuSearch className="text-lg" />
              <span>Search</span>
            </button>
          </div>

        </motion.form>

      </div>
    </div>
  );
}