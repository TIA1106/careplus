"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    return (
        <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-50 p-4 md:p-8">
            {/* Floating Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-teal-900/10 ring-1 ring-black/5 lg:flex-row flex-col min-h-[600px]"
            >
                {/* Left Side - Form Section */}
                <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-20 bg-white">
                    <div className="mx-auto w-full max-w-sm">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-8 flex items-center gap-3"
                        >
                            <div className="relative h-12 w-[160px]"> {/* Slightly smaller logo for card */}
                                <Image
                                    src="/careplus.png"
                                    alt="CarePlus Logo"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mb-8"
                        >
                            <h1 className="text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                One solution for all your healthcare needs.
                            </p>
                        </motion.div>

                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <LabelInputContainer>
                                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                                    <Input
                                        id="email"
                                        placeholder="user@careplus.com"
                                        type="email"
                                        className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-teal-500 placeholder:text-gray-400"
                                    />
                                </LabelInputContainer>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <LabelInputContainer>
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password" className="text-gray-700">Password</Label>
                                        <Link href="/forgot-password" className="text-xs text-red-500 hover:text-red-600 transition-colors font-medium">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        placeholder="••••••••"
                                        type="password"
                                        className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-teal-500 placeholder:text-gray-400"
                                    />
                                </LabelInputContainer>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gradient-to-br from-teal-500 to-emerald-600 w-full text-white rounded-lg h-11 font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 text-sm"
                                type="submit"
                            >
                                Sign In &rarr;
                            </motion.button>
                        </form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-6 text-center text-sm text-gray-500"
                        >
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="font-medium text-red-500 hover:text-red-600 hover:underline transition-colors">
                                Sign Up
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Visual Section (Inside Card) */}
                <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
                    {/* Medical Illustration Background */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/medical_illustration.png"
                            alt="Medical Healthcare Illustration"
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 mix-blend-multiply" />
                    </div>

                    <div className="relative z-10 max-w-md">
                        <div className="rounded-2xl border border-white bg-white/70 p-8 backdrop-blur-md shadow-xl shadow-teal-900/5">
                            <blockquote className="space-y-4">
                                <p className="text-lg font-medium leading-relaxed text-gray-800 italic">
                                    &ldquo;CarePlus connects me with the best doctors instantly. It&apos;s healthcare simplified for everyone.&rdquo;
                                </p>
                                <footer className="pt-4 border-t border-teal-100/50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                            EJ
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">Emily Johnson</div>
                                            <div className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Verified Patient</div>
                                        </div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
