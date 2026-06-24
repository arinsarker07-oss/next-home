'use client';

import React from "react";
import { motion } from "framer-motion";
import { HiCheckBadge } from "react-icons/hi2";
import Image from "next/image";

export default function TrustedOwners() {
  // Certified premium estate partners listing
  const owners = [
    { id: 1, name: "Assetline Properties", listings: "42 Listings", verified: true, logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 2, name: "Dr. Rafiqul Islam", listings: "12 Listings", verified: true, logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 3, name: "Concord Real Estate", listings: "65 Listings", verified: true, logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80" },
    { id: 4, name: "Begum Rokeya", listings: "8 Listings", verified: true, logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80" }
  ];

  return (
    <section className="py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-blue-600">Trusted Owners</span> & Partners
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            We collaborate explicitly with verified corporate builders and genuine homeowners to ensure risk-free hosting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {owners.map((owner, index) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-3 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  width={50}
                  height={50}
                  src={owner.logo} 
                  alt={owner.name} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-100 p-0.5"
                />
                {owner.verified && (
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow">
                    <HiCheckBadge className="text-blue-600 text-xl" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-base tracking-tight">{owner.name}</h3>
                <p className="text-xs text-blue-600 font-semibold px-2.5 py-1 bg-blue-50 rounded-full w-max mx-auto">
                  {owner.listings}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}