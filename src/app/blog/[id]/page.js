'use client';

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineChevronLeft } from "react-icons/hi2";

export default function FullArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id; 
  const articlesDatabase = {
    "1": {
      title: "5 Ultimate Tips for Finding Your Dream Apartment on NextHome",
      category: "Renting Guide",
      date: "June 20, 2026",
      author: "Alex Rivera",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      content: `Finding the perfect apartment involves balancing budget, location, and property features. First, always make sure to customize your dashboard search parameters effectively. On NextHome, you can narrow down variables by exact square footage, rent cycle types, and infrastructure access.

      Secondly, verified landlord profiles provide peace of mind. By using platforms integrated with automated legal frameworks, you ensure that security deposits and monthly rent cycles are ledger-tracked transparently under local asset regulations. Always request an e-signed copy of the digital lease contract before coordinating physical move-in timelines. Finally, don't hesitate to use our integrated communication matrix to chat directly with owners regarding utility configurations.`
    },
    "2": {
      title: "Understanding Digital Rental Lease Paperwork & Regulations",
      category: "Legal Compliance",
      date: "June 18, 2026",
      author: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      content: `The transformation of real estate analytics into digital spaces requires a solid understanding of e-signatures and smart ledger transactions. Digital lease paperwork holds identical weight to standard physical documents, provided they strictly follow state housing codes.

      When verifying an automated lease setup on NextHome, carefully review clauses detailing maintenance liabilities, unexpected repair response times, and payment delay protocols. Our secure processing networks register structural modifications transparently, making it easier for tenants and corporate owners to resolve compliance conflicts seamlessly without physical legal friction.`
    },
    "3": {
      title: "Maximizing ROI: A Landlord's Framework to Smart Home Devices",
      category: "Property Owner",
      date: "June 14, 2026",
      author: "Marcus Vance",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
      content: `For real estate asset managers, maximizing Return on Investment (ROI) is no longer just about location; it's about technological utility. Modern high-tier tenants prioritize spaces equipped with automated security systems, lightning-fast fiber-optic configurations, and smart energy controls.

      Integrating biometric keyless lock systems decreases vacancy turnaround windows dramatically. Property owners using NextHome's specialized listing automation can showcase these active amenities to filter premium high-budget corporate profiles, raising standard monthly asset yield values by up to 15% easily.`
    }
  };


  const currentArticle = articlesDatabase[articleId];

  if (!currentArticle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-bold text-slate-700">Article Not Found!</h2>
        <Button color="primary" onClick={() => router.push("/blog")}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white text-slate-800 pb-20"
    >
      {/* Back Control Button Navigation */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <Button 
          variant="light" 
          onClick={() => router.back()}
          className="text-slate-600 font-bold text-xs p-0 min-w-0 hover:bg-transparent flex items-center gap-1 group"
        >
          <HiOutlineChevronLeft className="text-base group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Button>
      </div>

      {/* Main Core Content Container */}
      <article className="max-w-3xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Category Badge & Meta Information */}
        <div className="space-y-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wider">
            {currentArticle.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {currentArticle.title}
          </h1>
          
          <div className="flex items-center gap-5 text-slate-400 text-xs font-semibold pt-1 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-1">
              <HiOutlineUser className="text-base text-slate-500" />
              <span>By {currentArticle.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineCalendarDays className="text-base text-slate-500" />
              <span>{currentArticle.date}</span>
            </div>
          </div>
        </div>

        {/* Big Display Cover Image */}
        <div className="rounded-2xl overflow-hidden h-64 md:h-96 bg-slate-100 border border-slate-100 shadow-sm">
          <img 
            src={currentArticle.image} 
            alt={currentArticle.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Extended Text Content Blocks */}
        <div className="text-sm md:text-base text-slate-600 font-medium leading-relaxed whitespace-pre-line space-y-4 pt-2">
          {currentArticle.content}
        </div>

      </article>
    </motion.div>
  );
}