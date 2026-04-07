import React from 'react';
import { motion } from 'framer-motion';
import Marquee from './Marquee';
import { useLanguage } from '../i18n/LanguageContext';

const LogoCloud: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-y border-slate-100 overflow-hidden">
      {/* Skills marquee */}
      <div className="overflow-hidden">
        <Marquee
          items={["Web Design", "UI/UX", "React", "Next.js", "SEO", "Mobile First", "Hosting", "Support", "Full-Stack", "Firebase"]}
          speed={35}
          separator="✦"
          className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight text-slate-200"
        />
      </div>

      {/* What we stand for */}
      <div className="container mx-auto px-4 md:px-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {[
            { value: "24/7", label: t.logoCloud.stats.availability[lang] },
            { value: "100%", label: t.logoCloud.stats.custom[lang] },
            { value: "<7d", label: t.logoCloud.stats.delivery[lang] },
            { value: "€0", label: t.logoCloud.stats.freeConsult[lang] },
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
