'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { HiUser, HiEnvelope, HiLockClosed, HiPhoto, HiEye, HiEyeSlash, HiBriefcase } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { Jolly_Lodger } from "next/font/google";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Consolidated single state object with fallback initial account role set to lowercase "Tenant"
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photo: "",
        password: "",
        role: "Tenant"
    });

    // Generic change handler tracking keyboard inputs dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submission controller utilizing Better-Auth API ecosystem
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Logs current synced data payload cleanly on console runtime
            console.log("Submitting registration payload live object:", formData);

            // Core integration calling Better-Auth client layer with parameters explicitly mapped
            const { data, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                image: formData.photo,
                role: formData.role
            });

            if (error) {
                console.error("Better-Auth core registration failed:", error.message);
                alert(error.message)
                setIsLoading(false);
                return;
            }

            console.log("Better-Auth Response Successful:", data);

            // Smooth user redirection block upon absolute profile completion
            setTimeout(() => {
                setIsLoading(false);
                router.push("/");
            });

        } catch (error) {
            console.error("Pipeline registration runtime failure:", error);
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
            <div className="w-full max-w-md bg-white shadow-xl border border-slate-100 rounded-2xl p-8 space-y-6 overflow-hidden">

                {/* Header Context Branding */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Create Your Account
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Join NextHome marketplace to find or list rental properties
                    </p>
                </div>

                {/* Core Credentials Form Handler */}
                <form onSubmit={handleRegisterSubmit} className="space-y-4">

                    {/* Input 1: Full Name */}
                    <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                        <div className="relative flex items-center">
                            <HiUser className="absolute left-3.5 text-slate-400 text-lg" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full h-11 pl-11 pr-4 bg-transparent border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Input 2: Email Address */}
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

                    {/* Input 3: Photo URL */}
                    <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Photo URL</label>
                        <div className="relative flex items-center">
                            <HiPhoto className="absolute left-3.5 text-slate-400 text-lg" />
                            <input
                                type="url"
                                name="photo"
                                required
                                value={formData.photo}
                                onChange={handleInputChange}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full h-11 pl-11 pr-4 bg-transparent border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Input 4: Password */}
                    <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
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

                    {/* Unified Option Selection: Directly modifying the root state schema */}
                    <div className="space-y-2 text-left">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Select Account Role</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                // Updates state payload cleanly using inline wrapper callback
                                onClick={() => setFormData(prev => ({ ...prev, role: "Tenant" }))}
                                className={`h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${formData.role === "Tenant"
                                    ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
                                    : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <HiUser className="text-lg" />
                                <span>Tenant</span>
                            </button>
                            <button
                                type="button"
                                // Updates state payload cleanly using inline wrapper callback
                                onClick={() => setFormData(prev => ({ ...prev, role: "Owner" }))}
                                className={`h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${formData.role === "Owner"
                                    ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm"
                                    : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <HiBriefcase className="text-lg" />
                                <span>Owner</span>
                            </button>
                        </div>
                    </div>

                    {/* Terms Validation */}
                    <div className="flex items-center gap-2 pt-1 text-left">
                        <input
                            type="checkbox"
                            required
                            id="terms"
                            defaultChecked
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                        <label htmlFor="terms" className="text-xs text-slate-500 font-semibold cursor-pointer select-none">
                            I agree to the platform Terms of Service
                        </label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/20 rounded-xl transition-all transform active:scale-95 mt-2"
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </form>

                {/* Content Separation Line */}
                <div className="relative flex items-center text-slate-300">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-xs uppercase tracking-widest font-bold text-slate-400">or</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Social Gateway */}
                <Button
                    variant="bordered"
                    className="w-full h-11 border-slate-200 text-slate-700 hover:bg-blue-700 hover:text-white font-bold text-sm tracking-wide shadow-sm rounded-xl transition-all transform active:scale-95 "
                    onClick={handleGoogleSocialLogin}
                >
                    <FcGoogle className="text-xl flex-shrink-0" />
                    <span>Continue with Google</span>
                </Button>

                {/* Navigation Link */}
                <p className="text-center text-sm font-medium text-slate-500 ">
                    Already registered?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-bold transition-colors">
                        Sign In here
                    </Link>
                </p>
            </div>
        </div>
    );
}