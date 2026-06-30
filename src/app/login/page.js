'use client';

import React, { Suspense } from "react";
import LoginContent from "./LoginContent";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-200 text-slate-700 font-medium">
                Loading Authentication Gateway...
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}