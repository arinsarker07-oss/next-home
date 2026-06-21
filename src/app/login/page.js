'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiUser, HiBriefcase } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Tenant"); // Default manually selected role

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Manual Credentials Login Process
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log(`Executing secure sign-in via credentials. Chosen Role Strategy: ${selectedRole}`, formData);

            // Better-Auth Manual Verification Pipeline:
            const { data, error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            });
            console.log(data);
            
            if (error) {
                console.error("Authentication rejected:", error.message);
                setIsLoading(false);
                return;
            }
            

            setTimeout(() => {
                setIsLoading(false);
                if (selectedRole === "Owner") {
                    router.push("/dashboard/owner");
                } else {
                    router.push("/dashboard/tenant");
                }
            });

        } catch (error) {
            console.error("Pipeline login runtime failure:", error);
            setIsLoading(false);
        }
    };

    // Google Social Login - Requirement Enforcement: Implicitly Assigns 'Tenant' Role
    const handleGoogleSocialLogin = async () => {
        console.log("Executing social authentication framework. Constraint Enforcement: Default role mapped to 'Tenant'");

        
        // Better-Auth Social Authentication Hook:
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard/tenant" // Automatically routed to tenant control panel
        });
        
    };

    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-gray-200 px-4 py-12">

            {/* Pure Tailwind CSS Container Card - Eliminates all DOM injection risks */}
            <div className="w-full max-w-md bg-white shadow-xl border border-slate-100 rounded-2xl p-8 space-y-6 overflow-hidden">

                {/* Header Context Branding */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Access your workspace log and manage properties
                    </p>
                </div>

                {/* Credentials Core Form Handler */}
                <form onSubmit={handleLoginSubmit} className="space-y-4">

                    {/* Input Element: Electronic Mail Address */}
                    <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative flex items-center">
                            <HiEnvelope className="absolute left-3.5 text-slate-400 text-lg" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@example.com"
                                className="w-full h-11 pl-11 pr-4 bg-transparent border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Input Element: Password Segment with Interacting Eye Icon */}
                    <div className="space-y-1.5 text-left">
                        <div className="flex justify-between items-center">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                            <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline font-bold">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative flex items-center">
                            <HiLockClosed className="absolute left-3.5 text-slate-400 text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                className="w-full h-11 pl-11 pr-11 bg-transparent border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                            >
                                {!showPassword ? <HiEyeSlash className="text-xl" /> : <HiEye className="text-xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Core Authorization Submission Trigger */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 rounded-xl transition-all transform active:scale-95 mt-2"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>

                {/* Content Separation Matrix Line */}
                <div className="relative flex  items-center text-slate-300">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-xs uppercase tracking-widest font-bold text-slate-400">or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Social Gateway (Google OAuth) - Gracefully Enforces Tenant Authorization Flow */}
                <Button
                    variant="bordered"
                    className="w-full h-11 border-slate-200 text-slate-700 hover:bg-blue-700 hover:text-white font-bold text-sm tracking-wide shadow-sm rounded-xl transition-all transform active:scale-95 "
                    onClick={handleGoogleSocialLogin}
                >
                    <FcGoogle className="text-xl flex-shrink-0" />
                    <span>Continue with Google</span>
                </Button>

                {/* View State Account Route Redirection Switcher */}
                <p className="text-center text-sm font-medium text-slate-500 pt-2">
                    New to the platform?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline font-bold transition-colors">
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
}