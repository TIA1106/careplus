"use client";

import React, { useState } from 'react';
import Footer from '@/components/home/Footer';
import { LandingNavbar } from '@/components/home/LandingNavbar';
import { HeroSection } from '@/components/home/HeroSection';
import { LogoCloud } from '@/components/home/LogoCloud';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import AuthModal from '@/components/AuthModal';
import { useAuthAction } from '@/hooks/useAuthAction';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { handleAuthAction } = useAuthAction(() => setIsAuthModalOpen(true));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      <LandingNavbar onAuthAction={() => handleAuthAction()} />
      <main>
        <HeroSection onAuthAction={() => handleAuthAction()} />
        <LogoCloud />
        <FeaturesSection onAuthAction={() => handleAuthAction()} />
      </main>
      <Footer />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}