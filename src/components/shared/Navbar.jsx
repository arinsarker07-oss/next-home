'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOfficeBuilding } from "react-icons/hi";
import { LuLayoutDashboard, LuLogOut, LuMenu, LuX } from "react-icons/lu";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Fetches real-time authentic session state directly from Better-Auth client library wrapper
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;
  
  const userRole = session?.user.role
  console.log(userRole);
  
  
  // Utility function confirming exact route matches
  const isActive = (path) => pathname === path;

  // Core navigation items configuration array
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Properties", path: "/properties" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
  ];

  // Triggers secure sign-out chain and gracefully pushes the user to the landing interface
  const handlesignout = async () => {
    try {
      await authClient.signOut();
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-out stream failure occurred:", error);
    }
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-200 w-full shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Left Block: Corporate Branding Identity */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
                <HiOfficeBuilding className="text-xl" />
              </div>
              <p className="font-bold text-xl tracking-tight text-slate-900">
                Next<span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Home</span>
              </p>
            </Link>
          </div>

          {/* Center Block: Desktop Layout Navigation Links */}
          <div className="hidden sm:flex items-center gap-6 h-full">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors duration-200 relative py-2 flex items-center px-1 ${
                    active ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
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

          {/* Right Block: User Authentication Middleware Control Panel */}
          <div className="hidden sm:flex items-center gap-4 h-full">
            {isPending ? (
              // Loading fallback structural skeleton blocking UI flashing errors during validation
              <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href={`/dashboard/${userRole}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold text-sm hover:bg-blue-100 transition-all duration-200"
                >
                  <LuLayoutDashboard className="text-lg" />
                  Dashboard
                </Link>
                <button
                  onClick={handlesignout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-sm font-medium transition-all duration-200"
                >
                  <LuLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 h-full relative">
                {/* Desktop Login Gateway Route Anchor */}
                <Link
                  href="/login"
                  className={`text-sm  hover:bg-blue-600 hover:text-white  font-semibold px-4 py-2 rounded-xl transition-all relative duration-200 ${
                    isActive("/login") ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">Login</span>
                  {isActive("/login") && (
                    <motion.div
                      layoutId="auth-active-bg"
                      className="absolute inset-0 bg-blue-600 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Desktop Registration Gateway Route Anchor */}
                <Link
                  href="/register"
                  className={`text-sm hover:text-white hover:bg-blue-600 font-semibold px-4 py-2 rounded-xl transition-all relative duration-200 ${
                    isActive("/register") ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">Register</span>
                  {isActive("/register") && (
                    <motion.div
                      layoutId="auth-active-bg"
                      className="absolute inset-0 bg-blue-600 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </div>
            )}
          </div>

          {/* Extreme Right Block: Mobile Navigation Open/Close Interface Buttons */}
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

      {/* Mobile Layout Dropdown Sheet Overlay */}
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
          
          {isPending ? (
            <div className="h-9 w-full bg-slate-100 animate-pulse rounded-lg" />
          ) : isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
              >
                <LuLayoutDashboard /> Dashboard
              </Link>
              <button
                onClick={handlesignout}
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
                className={`text-center font-medium py-2 rounded-lg transition-all ${
                  isActive("/login") ? "bg-blue-600 text-white font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`text-center font-medium py-2 rounded-lg transition-all ${
                  isActive("/register") ? "bg-blue-600 text-white font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
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