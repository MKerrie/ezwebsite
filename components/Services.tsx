import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw, Clock, Smartphone, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const services = [
  {
    id: 1,
    title: "Website Revamp",
    description: "Heb je een verouderde website die niet meer converteert? Wij strippen hem tot de kern en bouwen hem opnieuw op.",
    icon: <RefreshCw />,
    gradient: "from-violet-500 to-purple-600",
    size: "md:col-span-7",
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Wij werken niet van 9 tot 5. App of bel ons wanneer je wilt. Wij zijn er voor je.",
    icon: <Clock />,
    gradient: "from-indigo-500 to-violet-600",
    size: "md:col-span-5",
  },
  {
    id: 3,
    title: "High-End Design",
    description: "Geen standaard templates. Wij maken unieke designs met oog voor detail en animaties.",
    icon: <Zap />,
    gradient: "from-purple-500 to-pink-500",
    size: "md:col-span-5",
  },
  {
    id: 4,
    title: "Mobile First",
    description: "Jouw website wordt gebouwd voor de duim. Razendsnel en intuïtief op elk scherm.",
    icon: <Smartphone />,
    gradient: "from-violet-600 to-indigo-600",
    size: "md:col-span-7",
  },
];

const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useSEO(
    ref,
    "Diensten | Web Design, Branding & Support",
    "Discover how ezwebsite can modernize your online presence with website revamps, support and high-end design."
  );

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Onze Expertise</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              Wat wij <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Fixen.</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`${service.size} group relative bg-white border border-slate-100 rounded-3xl p-8 md:p-10 overflow-hidden hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-500 cursor-pointer`}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full min-h-[200px] md:min-h-[240px] justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-violet-600 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                  </div>
                  <span className="font-display font-bold text-6xl text-slate-100 group-hover:text-white/10 select-none leading-none transition-colors">
                    0{service.id}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="font-display font-bold text-3xl md:text-4xl uppercase mb-3 group-hover:text-white transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-violet-600 group-hover:text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span>Meer info</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
