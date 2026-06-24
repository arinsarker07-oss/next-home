'use client';

import React from "react";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";

export default function TopLocations() {
  // High traffic metropolitan locations dataset
  const locations = [
    { name: "Gulshan", count: "140+ Properties", img: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80" },
    { name: "Banani", count: "95+ Properties", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80" },
    { name: "Dhanmondi", count: "110+ Properties", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80" },
    { name: "Uttara", count: "75+ Properties", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <section className="py-20 bg-slate-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore <span className="text-blue-600">Top Locations</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Browse through the most sought-after residential hubs and active premium neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-72 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md"
            >
              <Image
                width={100}
                height={100}
                src={loc.img} 
                alt={loc.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold tracking-tight">{loc.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{loc.count}</p>
                </div>
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white group-hover:bg-blue-600 transition-colors">
                  <HiArrowUpRight className="text-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}