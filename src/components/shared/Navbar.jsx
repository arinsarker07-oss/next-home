'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOfficeBuilding } from "react-icons/hi";
import { LuLayoutDashboard, LuLogOut, LuMenu, LuX } from "react-icons/lu";
// Framer Motion ইমপোর্ট করা হলো
import { motion } from "framer-motion"; 

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock authentication session state
  const [user, setUser] = useState({ isLoggedIn: true, role: "Tenant" });

  // সঠিক রুট ম্যাচিং করার ফাংশন
  const isActive = (path) => pathname === path;

  // Navigation configuration list
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/properties" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="bg-gray-400 sticky top-0 z-50 border-b border-slate-200 w-full shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Side: Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              {/* টেস্ট করার জন্য এখানে bg-blue-600 দেওয়া হয়েছে */}
              <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
                <HiOfficeBuilding className="text-xl" />
              </div>
              <p className="font-bold text-xl tracking-tight text-slate-900">
                Next<span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Home</span>
              </p>
            </Link>
          </div>

          {/* Middle Links with Working Framer Motion Slider */}
          <div className="hidden sm:flex items-center gap-6 h-full">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors duration-200 relative py-2 flex items-center px-1 ${
                    active
                      ? "text-white/80 font-bold"
                      : "text-slate-600 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* ১০০% কাজ করবে এমন স্লাইডার এলিমেন্ট */}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Authentication Control */}
          <div className="hidden sm:flex items-center gap-4">
            {user.isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-all duration-200"
                >
                  <LuLayoutDashboard className="text-lg" />
                  Dashboard
                </Link>
                <button
                  onClick={() => setUser({ isLoggedIn: false, role: "" })}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium transition-all duration-200"
                >
                  <LuLogOut className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-700 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-md transition-all transform active:scale-95"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className=" hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow-md transition-all transform active:scale-95"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Layout Controller */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-blue-600 p-2 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <LuX className="text-2xl" /> : <LuMenu className="text-2xl" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 absolute top-16 left-0 w-full px-4 pt-2 pb-6 flex flex-col gap-3 shadow-lg transition-all duration-200">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-base font-medium py-2 px-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-[1px] bg-slate-100 my-1" />
          {user.isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
              >
                <LuLayoutDashboard /> Dashboard
              </Link>
              <button
                onClick={() => {
                  setUser({ isLoggedIn: false, role: "" });
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-base text-left font-medium py-2 px-3 rounded-lg text-rose-600 hover:bg-rose-50 transition-all"
              >
                <LuLogOut /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-center font-medium text-slate-700 hover:bg-slate-50 py-2 rounded-lg transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="text-center font-medium bg-blue-600 text-white py-2 rounded-lg shadow-md transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}