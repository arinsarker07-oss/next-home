'use client';

import React from "react";
import { Card, CardHeader, Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineArrowLongRight } from "react-icons/hi2";
import Image from "next/image";

export default function BlogPage() {

  const blogPosts = [
    {
      id: 1,
      title: "5 Ultimate Tips for Finding Your Dream Apartment on NextHome",
      description: "Navigating the real estate ecosystem can be overwhelming. Learn how to optimize your dashboard filters, verify landlord credentials, and secure structural assets safely.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      date: "June 20, 2026",
      author: "Alex Rivera",
      category: "Renting Guide"
    },
    {
      id: 2,
      title: "Understanding Digital Rental Lease Paperwork & Regulations",
      description: "E-signatures and automated rent ledgers are transforming rental laws. Discover what legal clauses you must check before signing your next automated dynamic contract.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      date: "June 18, 2026",
      author: "Sarah Jenkins",
      category: "Legal Compliance"
    },
    {
      id: 3,
      title: "Maximizing ROI: A Landlord's Framework to Smart Home Devices",
      description: "How high-speed WiFi setups, biometric locks, and integrated maintenance infrastructure help property owners scale monthly yield rates efficiently.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
      date: "June 14, 2026",
      author: "Marcus Vance",
      category: "Property Owner"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white py-16 text-center px-4"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold rounded-full uppercase tracking-widest">
            Articles & Insights
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">The NextHome Journal</h1>
          <p className="text-xs md:text-sm text-slate-300 font-medium">
            Stay updated with expert perspectives regarding property automation, legal rental protocols, and market yields.
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Card className="h-full border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden flex flex-col cursor-pointer group">
                <CardHeader className="p-0 relative overflow-hidden h-48 bg-slate-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {post.category}
                  </span>
                </CardHeader>

                <section className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-slate-400 text-[11px] font-semibold">
                      <div className="flex items-center gap-1">
                        <HiOutlineCalendarDays className="text-base" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiOutlineUser className="text-base" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link href={`/blog/${post.id}`} className="inline-block">
                      <Button
                        variant="light"
                        color="primary"
                        className="p-0 h-auto font-bold text-xs text-blue-600 hover:bg-transparent flex items-center gap-1.5"
                      >
                        Read Full Article
                        <HiOutlineArrowLongRight className="text-base group-hover:translate-x-1.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </section>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}