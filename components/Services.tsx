
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, RefreshCw, Clock, Smartphone, ChevronDown } from 'lucide-react';
import { Service } from '../types';
import { useSEO } from '../hooks/useSEO';

const services: Service[] = [
  {
    id: 1,
    title: "Website Revamp",
    description: "Heb je een verouderde website die niet meer converteert? Wij strippen hem tot de kern en bouwen hem opnieuw op.",
    icon: <RefreshCw />
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Wij werken niet van 9 tot 5. App of bel ons wanneer je wilt. Wij zijn er voor je.",
    icon: <Clock />
  },
  {
    id: 3,
    title: "High-End Design",
    description: "Geen standaard templates. Wij maken unieke designs met oog voor detail en animaties.",
    icon: <Zap />
  },
  {
    id: 4,
    title: "Mobile First",
    description: "Jouw website wordt gebouwd voor de duim. Razendsnel en intuïtief op elk scherm.",
    icon: <Smartphone />
  }
];

// Fixed: Correctly typed ServiceCardMobile using React.FC to avoid 'key' prop error
const ServiceCardMobile: React.FC<{ service: Service, index: number }> = ({ service, index }) => {
    return (
        <div className="sticky top-24 w-full mb-[15vh]">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-2xl"
            >
                <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-fuchsia-600 text-white flex items-center justify-center shadow-lg shadow-fuchsia-600/20">
                         {/* Fix: Explicitly cast to React.ReactElement with className prop to resolve TS overload error */}
                         {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                    </div>
                    <span className="font-display font-bold text-6xl text-slate-100 dark:text-white/5 leading-none">0{service.id}</span>
                </div>
                <h3 className="font-display font-bold text-4xl uppercase mb-6 text-slate-900 dark:text-white leading-tight">
                    {service.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                    {service.description}
                </p>
            </motion.div>
        </div>
    );
};

const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useSEO(
    ref,
    "Diensten | Web Design, Branding & Support",
    "Discover how ezwebsite can modernize your online presence with website revamps, support and high-end design."
  );

  return (
    <section id="services" ref={ref} className="py-20 md:py-24 bg-slate-100 dark:bg-[#080808] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-20">
          <span className="text-fuchsia-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Onze Expertise</span>
          <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
            Wat wij <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600 dark:from-fuchsia-400 dark:to-purple-400">Fixen.</span>
          </h2>
        </div>

        {/* MOBILE: STICKY STACK LAYOUT */}
        <div className="md:hidden flex flex-col relative">
            {services.map((service, index) => (
                <ServiceCardMobile key={service.id} service={service} index={index} />
            ))}
            {/* Final spacing to ensure the last card can be fully viewed */}
            <div className="h-[10vh]" />
        </div>

        {/* DESKTOP: ORIGINAL GRID LAYOUT (Untouched) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-8 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 min-h-[280px]"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-fuchsia-600 shadow-sm group-hover:bg-fuchsia-600 group-hover:text-white transition-all duration-300">
                         {/* Fix: Explicitly cast to React.ReactElement with className prop to resolve TS overload error */}
                         {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                    </div>
                    <span className="font-display font-bold text-5xl text-slate-100 dark:text-white/5 select-none leading-none">0{service.id}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-3xl uppercase mb-4 group-hover:text-fuchsia-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm lg:text-base">{service.description}</p>
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
