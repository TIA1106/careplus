"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

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
        {/* Left Side */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-20 bg-white">
          <div className="mx-auto w-full max-w-sm">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="relative h-12 w-[160px]">
                <Image
                  src="/logo.png"
                  alt="CarePlus Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10"
            >
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to CarePlus
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Sign in securely using your Google account.
              </p>
            </motion.div>

            {/* GOOGLE LOGIN ONLY */}
            <motion.button
              onClick={() => signIn("google")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="button"
              className="w-full h-11 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold text-sm shadow-sm hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.7 1.23 9.2 3.26l6.9-6.9C35.7 1.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8.1 6.3C12.6 13 17.9 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.6-.14-2.8-.44-4.1H24v7.8h12.7c-.5 3-2.1 5.5-4.6 7.3l7.1 5.5c4.1-3.8 6.9-9.4 6.9-16.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.7 28.6c-1-3-1-6.2 0-9.2l-8.1-6.3C-.4 17.1-.4 30.9 2.6 34.9l8.1-6.3z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.1-5.5c-2 1.4-4.5 2.2-8.1 2.2-6.1 0-11.4-3.9-13.3-9.4l-8.1 6.3C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
              Continue with Google
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-xs text-gray-400"
            >
              By continuing, you agree to CarePlus terms & privacy policy.
            </motion.div>
          </div>
        </div>

        {/* Right Side Visual */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
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
                  &ldquo;CarePlus helps doctors manage clinics and patients
                  effortlessly.&rdquo;
                </p>
                <footer className="pt-4 border-t border-teal-100/50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      DR
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        Verified Doctor
                      </div>
                      <div className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">
                        CarePlus Platform
                      </div>
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
