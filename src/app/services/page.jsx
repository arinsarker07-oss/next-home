'use client';

import React from "react";
import { Button, Card, CardHeader } from "@heroui/react";
import { motion } from "framer-motion"; 
import { 
  HiOutlineHome, 
  HiOutlineShieldCheck, 
  HiOutlineKey, 
  HiOutlineScale, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineWrenchScrewdriver,
  HiOutlineArrowRight
} from "react-icons/hi2"; // Reverted back to react-icons/hi2 as per requirement

export default function ServicesPage() {
  
  // Array matrix containing data for 6 premium real estate ecosystem services
  const servicesList = [
    {
      id: 1,
      title: "Property Listing Management",
      description: "Effortlessly list and manage your real estate assets. Add high-quality images, detailed descriptions, and manage availability in real-time.",
      icon: <HiOutlineHome className="w-6 h-6 text-blue-600" />,
      badge: "For Owners",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      id: 2,
      title: "Verified Tenant Screening",
      description: "Safety first. We handle rigorous background checks, legal credential verifications, and financial profiling to bring you reliable tenants.",
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-indigo-600" />,
      badge: "Security",
      gradient: "from-indigo-500/10 to-purple-500/10"
    },
    {
      id: 3,
      title: "Automated Booking & Payments",
      description: "Secure automated rent transactions via Stripe. Integrated rental contracts and automatic rent-cycle ledger updates at your fingertips.",
      icon: <HiOutlineKey className="w-6 h-6 text-purple-600" />,
      badge: "Automation",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      id: 4,
      title: "Legal & Lease Paperwork",
      description: "Get smart, custom digital lease agreements compiled under local asset regulations ready for instantaneous electronic signatures.",
      icon: <HiOutlineScale className="w-6 h-6 text-amber-600" />,
      badge: "Compliance",
      gradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      id: 5,
      title: "Maintenance & Repairs",
      description: "Tenants can log maintenance issue requests instantly. Our backend assigns professional service crews to handle property logistics immediately.",
      icon: <HiOutlineWrenchScrewdriver className="w-6 h-6 text-emerald-600" />,
      badge: "24/7 Support",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      id: 6,
      title: "Direct Owner-Tenant Chat",
      description: "An encrypted, integrated chat system that connects house owners directly with tenants to share real-time updates and build trust.",
      icon: <HiOutlineChatBubbleLeftRight className="w-6 h-6 text-rose-600" />,
      badge: "Messaging",
      gradient: "from-rose-500/10 to-red-500/10"
    }
  ];

  // Container Variant for Staggered Fade-In-Up Look
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 行staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Modern Fade-In-Up + Scale Variant for Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden pb-20">
      
      {/* 🌌 Hero Section: Deep Premium UI Mesh Gradient */}
      <div className="w-full bg-slate-900 relative overflow-hidden py-24 px-4 text-center text-white border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute -inset-[10px] bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Our Ecosystem
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight"
          >
            Comprehensive Real Estate Solutions
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Whether you are looking to rent a premium studio apartment or trying to deploy property automation analytics for your real estate assets, NextHome has you covered.
          </motion.p>
        </div>
      </div>

      {/* 📦 Services Grid with Enhanced Fixed Padding Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
              className="h-full flex"
            >
              <Card className="w-full border border-slate-200/60 shadow-sm rounded-2xl bg-white flex flex-col justify-between hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/[0.03] transition-all duration-300 group">
                
                {/* Fixed Top Section with Uniform Inner Padding */}
                <CardHeader className="flex flex-row justify-between items-center p-6 pb-4">
                  <div className={`p-3 bg-gradient-to-br ${service.gradient} rounded-xl border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                    {service.badge}
                  </span>
                </CardHeader>
                
                {/* Card Body: Optimized Text Wrapping & Spacing */}
                <section  className="p-6 pt-0 pb-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Micro Interaction Link */}
                  <div className="pt-2 flex items-center text-xs font-bold text-blue-600 gap-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    Learn more <HiOutlineArrowRight className="w-3 h-3" />
                  </div>
                </section>
                
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 🤝 Bottom Call To Action Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 mt-20 text-center"
      >
        <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-sm space-y-6">
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">Ready to maximize your rental yields?</h3>
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto font-normal leading-relaxed">
            Join thousands of real estate ecosystem owners and corporate tenants safely managing rentals using NextHome's unified dashboard stack.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button 
              color="primary" 
              className="bg-blue-600 font-bold text-xs md:text-sm h-11 rounded-xl shadow-md px-6 hover:bg-blue-700 transition-colors"
            >
              Get Started Now
            </Button>
            <Button 
              variant="bordered" 
              className="border-slate-200 text-slate-700 bg-white font-bold text-xs md:text-sm h-11 rounded-xl px-6 hover:bg-slate-50 transition-colors"
            >
              Read Customer Reviews
            </Button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}