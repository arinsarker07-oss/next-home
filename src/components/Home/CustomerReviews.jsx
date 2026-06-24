'use client';

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

export default function CustomerReviews() {
  // Required data set configuration containing exactly 4 premium verified tenant reviews
  const reviews = [
    {
      id: 1,
      name: "Ahsan Habib",
      role: "Software Engineer (Tenant)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      comment: "Finding verified apartments in Dhaka used to be an absolute nightmare. With NextHome, the dashboard verified tag gave me full peace of mind. Highly recommended!"
    },
    {
      id: 2,
      name: "Anika Rahman",
      role: "Corporate Executive (Tenant)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      comment: "The digital booking system is incredibly smooth. I completed my apartment verification and rent payment securely right from my workspace without any brokerage issues."
    },
    {
      id: 3,
      name: "Sajid Mahmud",
      role: "University Student (Tenant)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      comment: "The price range filters helped me locate an affordable studio apartment near my campus within 10 minutes. The direct communication line with owners is a lifesaver."
    },
    {
      id: 4,
      name: "Tasnim Sultana",
      role: "Freelance Designer (Tenant)",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80",
      rating: 5,
      comment: "Outstanding user experience interface! The interactive maps and clear price caps allowed me to manage my residential move completely tension-free."
    }
  ];

  return (
    <section className="py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Section */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our <span className="text-blue-600">Tenants</span> Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Read real feedback logs from users who discovered their residential sanctuary through NextHome.
          </p>
        </div>

        {/* Dynamic Review Rendering Matrix Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between relative group hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-slate-200 group-hover:text-blue-100 transition-colors">
                <FaQuoteLeft className="text-3xl" />
              </div>

              <div className="space-y-4">
                {/* Visual Rating Row Elements */}
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* User Bio Identity Section */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                <Image
                  width={50}
                  height={50}
                  src={review.avatar} 
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-blue-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{review.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}