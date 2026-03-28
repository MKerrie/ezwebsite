import React from 'react';
import { motion } from 'framer-motion';
import Marquee from './Marquee';

const LogoCloud: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
            Vertrouwd door bedrijven in heel Nederland
          </p>
        </motion.div>
      </div>

      {/* Logo marquee - using text-based logos for clean look */}
      <div className="overflow-hidden">
        <Marquee
          items={["YTech", "King Airco", "Piccobello Snacks", "Vanguard", "Studio Noord", "Digital Wave", "BrandCraft", "PixelPerfect"]}
          speed={35}
          separator="·"
          className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight text-slate-200"
        />
      </div>

      {/* Stats bar */}
      <div className="container mx-auto px-4 md:px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {[
            { value: "15+", label: "Projecten afgerond" },
            { value: "100%", label: "Tevreden klanten" },
            { value: "<7", label: "Dagen levertijd" },
            { value: "24/7", label: "Support & beschikbaarheid" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl md:text-5xl text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoCloud;
