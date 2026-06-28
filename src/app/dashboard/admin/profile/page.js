'use client'; 

import React from "react";
import { Chip, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlineShieldCheck, 
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from "react-icons/hi2";
import { useSession } from "@/lib/auth-client"; 

export default function ProfilePageAdmin() {
  const router = useRouter();
  

  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" color="primary" />
        <p className="text-xs font-bold text-slate-400 animate-pulse">Loading active session context...</p>
      </div>
    );
  }

  if (error || !session?.user) {
    router.push("/login");
    return null;
  }

  const { name, email, image, role, createdAt, emailVerified } = session.user;


  const joinedDate = createdAt 
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "June 22, 2026"; 

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen p-4 md:p-8 space-y-8 overflow-x-hidden">
      <div className="w-full bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
        <div className="w-full h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
        <div className="px-6 pb-8 flex flex-col items-center -mt-16 text-center space-y-3">
          <div className="relative group">
            <img 
              src={image || `https://api.dicebear.com/7.x/initials/svg?seed=${name || 'User'}`} 
              alt={name || "User Avatar"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105 bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${name || 'User'}`;
              }}
            />
            <div className="absolute bottom-1 right-1 p-1.5 bg-white rounded-full shadow-md border border-slate-100 z-10">
              {emailVerified ? (
                <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <HiOutlineXCircle className="w-5 h-5 text-amber-500" />
              )}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {name || "User Name"}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Chip 
                size="sm" 
                variant="flat" 
                className="font-bold uppercase tracking-wider text-[10px] px-2.5 h-6 bg-purple-50 text-purple-700 border border-purple-200/50"
              >
                {role || "tenant"}
              </Chip>
              <Chip 
                size="sm" 
                variant="flat" 
                className={`font-bold tracking-wide text-[10px] px-2.5 h-6 border ${
                  emailVerified 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" 
                    : "bg-amber-50 text-amber-700 border-amber-200/50"
                }`}
              >
                {emailVerified ? "Verified Account" : "Verification Pending"}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-600 flex-shrink-0">
            <HiOutlineUser className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Full Name
            </span>
            <p className="text-base font-bold text-slate-800 tracking-tight">
              {name || "User Name"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 flex-shrink-0">
            <HiOutlineEnvelope className="w-6 h-6" />
          </div>
          <div className="space-y-1 w-full overflow-hidden">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Email Address
            </span>
            <p className="text-base font-bold text-slate-800 tracking-tight truncate">
              {email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-purple-600 flex-shrink-0">
            <HiOutlineShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              System Authority Role
            </span>
            <p className="text-base font-bold text-slate-800 tracking-tight capitalize">
              {role || "tenant"} 
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 flex-shrink-0">
            <HiOutlineCalendar className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Member Since
            </span>
            <p className="text-base font-bold text-slate-800 tracking-tight">
              {joinedDate}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}