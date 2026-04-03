import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw, Clock, Smartphone, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [<RefreshCw />, <Clock />, <Zap />, <Smartphone />];
const gradients = [
  "from-violet-500 to-purple-600",
  "from-indigo-500 to-violet-600",
  "from-purple-500 to-pink-500",
  "from-violet-600 to-indigo-600",
];
const sizes = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

const Services: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLanguage();

  useSEO(ref, t.services.seoTitle[lang], t.services.seoDesc[lang]);

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
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t.services.label[lang]}</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              {t.services.headline1[lang]} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">{t.services.headline2[lang]}</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {t.services.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`${sizes[index]} group relative bg-white border border-slate-100 rounded-3xl p-8 md:p-10 overflow-hidden hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-500 cursor-pointer`}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full min-h-[200px] md:min-h-[240px] justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-violet-600 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                    {React.cloneElement(icons[index] as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                  </div>
                  <span className="font-display font-bold text-6xl text-slate-100 group-hover:text-white/10 select-none leading-none transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="font-display font-bold text-3xl md:text-4xl uppercase mb-3 group-hover:text-white transition-colors tracking-tight">
                    {service.title[lang]}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base group-hover:text-white/80 transition-colors">
                    {service.description[lang]}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-violet-600 group-hover:text-white font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span>{t.services.moreInfo[lang]}</span>
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
