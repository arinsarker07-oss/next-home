'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMapPin, HiHomeModern, HiCurrencyDollar } from "react-icons/hi2";
import { LuSearch } from "react-icons/lu";
import FilterSection from "../fillter";

export default function HeroBanner() {
  // Collection of premium real estate background assets for the carousel layer
  const carouselImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);



  // Custom Requirement: Automated background rotation mapping triggering every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // 5000ms mapping frequency sequence

    return () => clearInterval(slideInterval);
  }, [carouselImages.length]);



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
        <FilterSection></FilterSection>

      </div>
    </div>
  );
}