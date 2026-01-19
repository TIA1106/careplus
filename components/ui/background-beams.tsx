"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-white overflow-hidden",
        className
      )}
    >
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>

      {/* Animated Beams */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Beam 1 - Teal Gradient */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl"
          style={{ top: "10%", right: "10%" }}
        />

        {/* Beam 2 - Red Gradient (Subtle) */}
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
            x: [-50, 50, -50],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[400px] h-[400px] bg-red-200/20 rounded-full blur-3xl"
          style={{ bottom: "20%", left: "20%" }}
        />

        {/* Beam 3 - Moving Ray */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal-100/30 to-transparent skew-y-12 transform"
        />

        {/* Beam 4 - Active Floating Particles/Orbs (Hydration Safe) */}
        {mounted && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-teal-400 rounded-full blur-sm"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${50 + Math.random() * 40}%`,
            }}
          />
        ))}
      </div>

      <div className="absolute h-[100%] w-full inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
    </div>
  );
};
