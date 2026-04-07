import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { Play, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const yText = useTransform(smoothProgress, [0, 1], [0, 200]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);

  useSEO(ref, t.hero.seoTitle[lang], t.hero.seoDesc[lang]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] md:min-h-[110vh] w-full overflow-hidden bg-white flex flex-col items-center pt-32 md:pt-48 pb-0"
    >
      {/* Static gradient background — no JS, no mouse tracking */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-violet-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-400/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30vw] h-[30vw] bg-indigo-400/10 blur-[80px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,#00000008_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />
      </div>

      {/* HERO CONTENT */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <motion.div style={{ y: yText, opacity, scale }} className="w-full flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 bg-violet-50/80 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-violet-700">
              {t.hero.badge[lang]}
            </span>
          </motion.div>

          {/* HEADLINE — single block animation instead of per-letter */}
          <div className="relative mb-6 md:mb-8 flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] md:text-[9vw] font-display font-bold leading-[0.8] md:leading-[0.85] tracking-tighter text-slate-900 uppercase"
            >
              {t.hero.headline1[lang]}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-[15vw] md:text-[9vw] font-display font-bold leading-[0.8] md:leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-violet-700 uppercase pb-2 md:pb-4"
            >
              {t.hero.headline2[lang]}
            </motion.div>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-xl text-slate-500 max-w-xl leading-relaxed font-light mb-8 md:mb-10 px-4"
          >
            {t.hero.subtext[lang]} <span className="text-slate-900 font-medium">{t.hero.subtextBold[lang]}</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0"
          >
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, '#projects')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-xl hover:shadow-violet-500/20 transition-all text-center text-sm md:text-base"
            >
              {t.hero.viewWork[lang]}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-transparent border border-slate-200 text-slate-900 rounded-full font-bold uppercase tracking-wider hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group text-center text-sm md:text-base"
            >
              <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play className="w-2.5 h-2.5 fill-current" />
              </div>
              {t.nav.startProject[lang]}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-8 md:gap-16 mt-12 md:mt-16"
          >
            {[
              { value: "24/7", label: t.hero.stats.available[lang] },
              { value: "100%", label: t.hero.stats.custom[lang] },
              { value: "3", label: t.hero.stats.creatives[lang] },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-display font-bold text-slate-900">{stat.value}</div>
                <div className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Browser mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-24 w-full max-w-5xl relative px-2 md:px-0"
          >
            <div className="relative bg-white/60 border border-slate-200/80 rounded-t-2xl md:rounded-t-[2rem] p-3 md:p-5 shadow-[0_20px_80px_-20px_rgba(124,58,237,0.15)] overflow-hidden">
              {/* Window controls */}
              <div className="flex items-center justify-between mb-3 md:mb-4 px-1 md:px-2">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" />
                </div>
                <div className="h-5 md:h-7 px-4 md:px-6 rounded-full bg-slate-100 flex items-center">
                  <span className="text-[8px] md:text-[10px] font-mono text-slate-400">ezwebsite.nl</span>
                </div>
                <div className="w-12" />
              </div>

              {/* Content */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg md:rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
                  alt="Digital workspace"
                  className="w-full h-full object-cover opacity-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Static glass card — no infinite animation */}
                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-5 rounded-xl md:rounded-2xl">
                  <div className="h-1.5 md:h-2 w-10 md:w-14 bg-violet-500 rounded-full mb-2 md:mb-3" />
                  <div className="h-1.5 md:h-2 w-full bg-white/20 rounded-full mb-1.5 md:mb-2" />
                  <div className="h-1.5 md:h-2 w-2/3 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>

            {/* Glow under card */}
            <div className="absolute -bottom-8 left-[10%] w-[80%] h-8 bg-violet-500/15 blur-[40px] rounded-[100%]" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
