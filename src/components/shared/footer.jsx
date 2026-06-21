// Note: No "use client" directive here. This renders completely on the server.
import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri"; // Modern X logo replacing the deprecated bird icon
import { HiOfficeBuilding } from "react-icons/hi";

export default function FooterComponent() {
  // Evaluates the current operational calendar year directly on the server host
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Platform Brand Identity & Logo Segment */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group w-max">
            {/* Consistent branding design matched with your custom server navbar */}
            <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
              <HiOfficeBuilding className="text-xl" />
            </div>
            <p className="font-bold text-xl tracking-tight text-white">
              Next<span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Home</span>
            </p>
          </Link>
          <p className="text-sm text-slate-400 leading-relaxed">
            Discover, book, and manage premium rental properties effortlessly. Making your urban housing experience smart, fast, and entirely secure.
          </p>
        </div>

        {/* Column 2: Core Directory Navigation Mapping */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Home Base
              </Link>
            </li>
            <li>
              <Link href="/properties" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                All Properties
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Latest Blog Posts
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal Policy Framework Reference */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal Framework</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy Statement
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Preferences
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">
                Support Desk
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Official Community Handles (With Rebranded X Icon) */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect With Us</h4>
          <p className="text-sm text-slate-400 mb-4">Follow us across our active network channels to remain updated.</p>
          <div className="flex gap-3 text-lg">
            <a 
              href="#" 
              aria-label="Facebook Profile Page Anchor"
              className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FaFacebook />
            </a>
            <a 
              href="#" 
              aria-label="Rebranded X Corporate Anchor"
              className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <RiTwitterXFill /> {/* Custom requirement: verified X icon implementation */}
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn Business Grid Anchor"
              className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FaLinkedin />
            </a>
            <a 
              href="#" 
              aria-label="Instagram Stream Profile Anchor"
              className="p-2.5 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-400 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal Rights Stripe Wrapper */}
      <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>&copy; {currentYear} NextHome. All rights reserved. Handcrafted via high-performance server structures.</p>
      </div>
    </footer>
  );
}