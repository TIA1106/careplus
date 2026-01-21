"use client";
import React from 'react';

export const LogoCloud = () => (
    <section className="py-12 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-8">
                Powering next-gen teams
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-center group cursor-pointer">
                        {/* Logo Placeholder - in a real app these would be SVGs */}
                        <div className="h-8 w-32 bg-neutral-800 rounded group-hover:bg-neutral-700 transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);
