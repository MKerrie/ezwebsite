import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", light = false }) => {
  return (
    <a href="#" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Icon Container with 3D perspective */}
      <div style={{ perspective: '1000px' }} className="relative w-10 h-10">
        <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ 
                rotateX: 10, 
                rotateY: 15,
                scale: 1.1,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
        >
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg border border-white/10 overflow-hidden">
                {/* Shimmer Effect */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    initial={{ x: "-150%" }}
                    whileHover={{ x: "150%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {/* SVG Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white drop-shadow-md">
                        <path d="M4 7H20M4 7L16 17H4L16 17V17" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                        <path d="M20 7L8 17" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
                    </svg>
                </div>
            </div>
            
            {/* Glow behind */}
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 transform translate-z-[-10px]"></div>
        </motion.div>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span className={`font-display font-bold text-2xl tracking-tighter uppercase leading-none transition-colors duration-300 ${light ? 'text-black' : 'text-neutral-900 dark:text-white'}`}>
          ez<span className="text-blue-500 group-hover:text-blue-400 transition-colors">website</span>
        </span>
      </div>
    </a>
  );
};

export default Logo;