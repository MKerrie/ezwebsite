import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CtaBanner: React.FC = () => {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-white text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)]" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80">
                Beschikbaar voor nieuwe projecten
              </span>
            </motion.div>

            <h2 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tighter mb-6 md:mb-8">
              Laten we iets <br />
              moois maken.
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Geen verplichtingen, geen verborgen kosten. Gewoon een goed gesprek over jouw idee.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-violet-700 rounded-full font-display font-bold uppercase tracking-wider text-sm md:text-base hover:bg-white/90 hover:scale-105 transition-all shadow-2xl shadow-black/20"
            >
              Neem contact op
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
