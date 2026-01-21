"use client";
import React, { useState } from 'react';
import { Menu, X, Stethoscope } from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const variants: any = {
    primary: "bg-white text-black hover:bg-neutral-200 focus:ring-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]",
    secondary: "bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 focus:ring-neutral-700",
    outline: "bg-transparent text-white border border-neutral-600 hover:border-white focus:ring-white",
    ghost: "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const LandingNavbar = ({ onAuthAction }: { onAuthAction: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute w-full z-50 top-0 start-0 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 relative">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer z-50">
            <span className="text-white font-black text-xl tracking-tighter">
              Care<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Plus</span>
            </span>
          </div>

          {/* Desktop Button */}
          <Button
            variant="primary"
            className="py-2 px-5 text-sm shadow-none hidden sm:flex"
            onClick={onAuthAction}
          >
            Get Started
          </Button>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden text-white z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          {isOpen && (
            <div className="absolute top-14 right-0 w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 sm:hidden z-40">
              <a href="#features" className="text-neutral-300 p-2 hover:text-white" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#about" className="text-neutral-300 p-2 hover:text-white" onClick={() => setIsOpen(false)}>About</a>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  onAuthAction();
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
