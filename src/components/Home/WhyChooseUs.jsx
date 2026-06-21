'use client';

import React from "react";
import { motion } from "framer-motion";
import { HiShieldCheck, HiOutlineSparkles, HiOutlineClock, HiOutlineHandThumbUp } from "react-icons/hi2";

export default function WhyChooseUs() {
  // Collection of core corporate value propositions
  const benefits = [
    {
      icon: <HiShieldCheck className="text-3xl text-blue-600" />,
      title: "Verified Properties Only",
      desc: "Every single listing undergoes a rigorous manual verification check to guarantee authentic ownership parameters."
    },
    {
      icon: <HiOutlineSparkles className="text-3xl text-blue-600" />,
      title: "Zero Hidden Premiums",
      desc: "Enjoy direct interactions with owners with absolute cost transparency. No unverified middleman broker fees."
    },
    {
      icon: <HiOutlineClock className="text-3xl text-blue-600" />,
      title: "Instant Digital Booking",
      desc: "Secure leases, manage processing logs, and complete validation protocols directly from your personal dashboard."
    },
    {
      icon: <HiOutlineHandThumbUp className="text-3xl text-blue-600" />,
      title: "Premium Living Standards",
      desc: "Access verified community ratings and ambient facility descriptions prior to finalizing structural lease choices."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Content Wrapper */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">NextHome</span> Platform?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            We streamline the entire rental ecosystem, prioritizing security, absolute speed, and transparent operations.
          </p>
        </div>

        {/* Benefits Display Grid Layout Layer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left space-y-4"
            >
              <div className="p-3 bg-blue-50 rounded-xl w-max">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}