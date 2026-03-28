import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useSEO(
    ref,
    "Over Ons | ezwebsite - Creative Web Design Duo",
    "Meet the creative minds behind ezwebsite. Ahmad, Kerim and Nawdar are passionate about pixels, providing 24/7 availability and 100% satisfaction."
  );

  return (
    <section id="about" ref={ref} className="py-20 md:py-24 bg-slate-100 dark:bg-neutral-900 text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative w-full"
          >
            {/* Creative Image Composition */}
            <div className="relative group">
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-full h-full border-2 border-slate-300 dark:border-white/10 rounded-2xl z-0 transition-colors"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="ezwebsite team working" 
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3] filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Floating Badge Mobile & Desktop */}
              <div className="absolute -bottom-4 right-4 md:-bottom-8 md:-right-8 bg-blue-600 text-white p-4 md:p-8 rounded-2xl md:rounded-full flex items-center justify-center z-20 shadow-xl shadow-blue-900/20">
                 <span className="font-display font-bold text-sm md:text-xl leading-none text-center">
                   SINCE<br/>2024
                 </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full mt-4 md:mt-0"
          >
            <span className="text-blue-600 font-bold tracking-widest uppercase mb-3 block text-xs md:text-base">Over Ons</span>
            <h2 className="font-display font-bold text-5xl md:text-7xl uppercase leading-[0.9] mb-6 md:mb-8 break-words">
              WIJ MAKEN HET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-black dark:to-white">Eenvoudig.</span>
            </h2>
            
            <p className="text-lg md:text-3xl font-bold mb-6 md:mb-8 leading-tight text-slate-900 dark:text-white">
              WIJ ZIJN AHMAD, KERIM & NAWDAR. DRIE CREATIEVELINGEN MET EEN PASSIE VOOR PIXELS.
            </p>
            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-lg mb-6 leading-relaxed">
              Het internet verandert snel. Wat 5 jaar geleden werkte, kost je nu klanten. Wij zijn drie vrienden die webdesign anders aanpakken: geen logge bureaucratie, maar directe lijnen en pure creativiteit.
            </p>
            
            {/* Mobile Stats Bar */}
            <div className="grid grid-cols-2 gap-4 mt-8 bg-white dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
              <div className="text-center p-2">
                <h4 className="font-display font-bold text-3xl md:text-4xl mb-1 text-blue-600">24/7</h4>
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Beschikbaarheid</p>
              </div>
              <div className="text-center p-2 border-l border-slate-100 dark:border-white/10">
                <h4 className="font-display font-bold text-3xl md:text-4xl mb-1 text-blue-600">100%</h4>
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-500">Tevredenheid</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;