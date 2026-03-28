import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Clock, Heart, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useSEO(
    ref,
    "Over Ons | ezwebsite - Creative Web Design Trio",
    "Meet the creative minds behind ezwebsite. Ahmad, Kerim and Nawdar are passionate about pixels, providing 24/7 availability and 100% satisfaction."
  );

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Over Ons</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              Drie vrienden. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Één missie.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* Main image - large card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 relative rounded-3xl overflow-hidden group"
          >
            <div className="aspect-[4/3] md:aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="ezwebsite team working"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Team ezwebsite</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <p className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 mb-6">
                Wij zijn Ahmad, Kerim & Nawdar.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Het internet verandert snel. Wat 5 jaar geleden werkte, kost je nu klanten. Wij zijn drie vrienden die webdesign anders aanpakken: geen logge bureaucratie, maar directe lijnen en pure creativiteit.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-violet-600 text-white rounded-full w-fit">
              <span className="font-display font-bold text-sm uppercase tracking-wider">Since 2024</span>
            </div>
          </motion.div>

          {/* Stat cards row */}
          {[
            { icon: <Clock className="w-5 h-5" />, value: "24/7", label: "Beschikbaarheid", desc: "Altijd bereikbaar" },
            { icon: <Heart className="w-5 h-5" />, value: "100%", label: "Tevredenheid", desc: "Garantie op resultaat" },
            { icon: <Users className="w-5 h-5" />, value: "3", label: "Creatievelingen", desc: "Klein & persoonlijk" },
            { icon: <Zap className="w-5 h-5" />, value: "<7d", label: "Levertijd", desc: "Snel opgeleverd" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="md:col-span-3 bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 group hover:bg-violet-600 hover:border-violet-600 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <div className="font-display font-bold text-3xl md:text-4xl text-slate-900 group-hover:text-white transition-colors mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/70 transition-colors mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-slate-500 group-hover:text-white/60 transition-colors">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
