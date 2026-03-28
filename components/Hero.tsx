import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Play, Sparkles } from 'lucide-react';

// --- Particle System Logic ---
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const particleCount = window.innerWidth < 768 ? 0 : 40; // Disabled on mobile, reduced on desktop
    
    // Mouse state
    let mouseX = -1000;
    let mouseY = -1000;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Basic movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (Repulsion)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * 2; // Strength
          const directionY = forceDirectionY * force * 2;

          p.x -= directionX;
          p.y -= directionY;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${p.alpha})`; // Blueish tint
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />;
};

// --- Staggered Text Component ---
const StaggeredText = ({ text, className, delayStart = 0 }: { text: string, className?: string, delayStart?: number }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <span className="inline-block">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: delayStart + index * 0.05,
              ease: [0.33, 1, 0.68, 1], // Cubic bezier for "snap" feel
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalized coordinates -1 to 1
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Parallax transforms based on mouse
  const backgroundX = useTransform(mouseX, [-0.5, 0.5], [50, -50]);
  const backgroundY = useTransform(mouseY, [-0.5, 0.5], [50, -50]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25
  });

  // Scroll Parallax effects
  const yText = useTransform(smoothProgress, [0, 1], [0, 200]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const rotateHero = useTransform(smoothProgress, [0, 1], [0, -5]);

  useSEO(
    ref, 
    "ezwebsite | Next Level Web Design", 
    "Wij transformeren jouw visie naar een digitale ervaring die de concurrentie doet verbleken."
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] md:min-h-[110vh] w-full overflow-hidden bg-white flex flex-col items-center pt-32 md:pt-48 pb-10 md:pb-20"
    >
      
      {/* 
        ATMOSPHERIC BACKGROUND LAYER (The "Verse" Feel)
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* Particle Canvas Layer */}
        <ParticleCanvas />

        {/* Main Glow Orb - Animated + Mouse Parallax */}
        <motion.div 
          style={{ x: backgroundX, y: backgroundY }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 0 }, // Handled by mouse
            y: { duration: 0 }  // Handled by mouse
          }}
          className="absolute top-[-10%] md:top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] bg-violet-600/15 blur-[80px] md:blur-[120px] rounded-full mix-blend-multiply transition-transform duration-100 ease-out" 
        />
        
        {/* Secondary Glow - Purple */}
        <motion.div 
          style={{ x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]), y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]) }}
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 blur-[100px] rounded-full" 
        />

        {/* Grid Floor Effect (Perspective) */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black)] opacity-50 perspective-1000 transform rotate-x-60 origin-bottom" />
      </div>

      {/* HERO CONTENT */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        
        <motion.div 
          style={{ y: yText, opacity, scale }}
          className="w-full flex flex-col items-center text-center"
        >
          {/* Top Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-violet-500/20 bg-violet-500/5 backdrop-blur-md mb-6 md:mb-8"
          >
            <Sparkles className="w-3 h-3 text-violet-500" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-violet-600">
              High-End Digital Agency
            </span>
          </motion.div>

          {/* MASSIVE HEADLINE (Staggered) */}
          <div className="relative mb-6 md:mb-8 flex flex-col items-center w-full">
             <div className="text-[15vw] md:text-[9vw] font-display font-bold leading-[0.8] md:leading-[0.85] tracking-tighter text-slate-900 uppercase overflow-hidden">
               <StaggeredText text="DIGITALE" delayStart={0} />
             </div>
             <div className="text-[15vw] md:text-[9vw] font-display font-bold leading-[0.8] md:leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 uppercase pb-2 md:pb-4 overflow-hidden">
                <StaggeredText text="IMPACT." delayStart={0.3} />
             </div>
             
             {/* Decorative Elements (Desktop Only) */}
             <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute top-0 right-[-5%] md:right-[-10%] w-12 h-12 md:w-24 md:h-24 hidden md:flex items-center justify-center"
             >
                <div className="w-full h-full border border-dashed border-slate-300 rounded-full animate-spin-slow" />
             </motion.div>
          </div>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-base md:text-2xl text-slate-600 max-w-2xl leading-relaxed font-light mb-8 md:mb-10 px-4"
          >
            Je website is je digitale visitekaartje. Wij transformeren jouw visie naar een ervaring die <span className="text-slate-900 font-semibold">blijft hangen</span>.
          </motion.p>

          {/* Buttons - Mobile: Full Width Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <a 
              href="#projects"
              onClick={(e) => handleScroll(e, '#projects')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-violet-500/20 text-center text-sm md:text-base"
            >
              Bekijk Werk
            </a>
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-transparent border border-slate-200 text-slate-900 rounded-full font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group text-center text-sm md:text-base"
            >
              <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 fill-current" />
              </div>
              Start Project
            </a>
          </motion.div>

          {/* "Nexty" Style Floating Card - 3D Effect */}
          <motion.div
            style={{ rotateX: rotateHero }}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 1.2, duration: 1, type: "spring" }}
            className="mt-12 md:mt-32 w-full max-w-5xl relative perspective-1000 px-2 md:px-0"
          >
            {/* The Glass Card */}
            <div className="relative bg-white/40 backdrop-blur-2xl border border-white/50 rounded-t-2xl md:rounded-t-[3rem] p-3 md:p-6 shadow-2xl overflow-hidden group">
                
                {/* Header of the mock window */}
                <div className="flex items-center justify-between mb-3 md:mb-4 px-1 md:px-2">
                    <div className="flex gap-1.5 md:gap-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="h-5 md:h-6 px-3 md:px-4 rounded-full bg-black/5 flex items-center">
                        <span className="text-[8px] md:text-[10px] font-mono opacity-50">ezwebsite.nl/future</span>
                    </div>
                </div>

                {/* Content inside the card */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg md:rounded-[2rem] overflow-hidden bg-neutral-900">
                    <img 
                        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop" 
                        alt="Futuristic 3D Abstract Digital Art"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    
                    {/* Floating UI Element inside the card */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-4 left-4 md:bottom-12 md:left-12 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-6 rounded-xl md:rounded-2xl max-w-[140px] md:max-w-xs"
                    >
                        <div className="h-1.5 md:h-2 w-8 md:w-12 bg-violet-500 rounded-full mb-2 md:mb-3" />
                        <div className="h-1.5 md:h-2 w-full bg-white/20 rounded-full mb-1.5 md:mb-2" />
                        <div className="h-1.5 md:h-2 w-2/3 bg-white/20 rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Reflection / Shadow */}
            <div className="absolute -bottom-10 left-[5%] w-[90%] h-10 bg-violet-500/20 blur-[50px] rounded-[100%]" />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;