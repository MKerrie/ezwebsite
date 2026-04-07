import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../i18n/LanguageContext';

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const { lang, t } = useLanguage();

  useSEO(ref, t.about.seoTitle[lang], t.about.seoDesc[lang]);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Top: big statement */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t.about.label[lang]}</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter max-w-4xl">
              {t.about.headline1[lang]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">{t.about.headline2[lang]}</span>
            </h2>
          </motion.div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 relative rounded-3xl overflow-hidden group"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="ezwebsite team working"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10">
                <p className="text-white/60 text-sm md:text-base max-w-md">
                  {t.about.tagline[lang]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-slate-950 text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center mb-6">
                <span className="font-display font-bold text-lg">ez</span>
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-4 leading-tight">
                {t.about.storyTitle[lang]}
              </h3>
              <p className="text-white/50 leading-relaxed text-sm md:text-base mb-4">
                {t.about.story1[lang]}
              </p>
              <div className={`${storyExpanded ? 'block' : 'hidden'} md:block`}>
                <p className="text-white/50 leading-relaxed text-sm md:text-base mb-4">
                  {t.about.story2[lang]}
                </p>
                <p className="text-white/50 leading-relaxed text-sm md:text-base">
                  {t.about.story3[lang]}
                </p>
              </div>
              <button
                onClick={() => setStoryExpanded(!storyExpanded)}
                className="md:hidden mt-3 text-violet-400 text-sm font-bold uppercase tracking-widest hover:text-violet-300 transition-colors"
              >
                {storyExpanded ? t.about.readLess[lang] : t.about.readMore[lang]}
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-display font-bold text-sm uppercase tracking-widest text-violet-400">{t.about.since[lang]}</span>
            </div>
          </motion.div>

          {/* Values row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 bg-violet-600 text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="text-5xl md:text-6xl font-display font-bold leading-none mb-4">24/7</div>
            <div>
              <h4 className="font-bold text-lg mb-2">{t.about.value1Title[lang]}</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.about.value1Desc[lang]}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="text-5xl md:text-6xl font-display font-bold leading-none mb-4 text-slate-900">100%</div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-slate-900">{t.about.value2Title[lang]}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.about.value2Desc[lang]}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="md:col-span-4 bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-500"
          >
            <div className="text-5xl md:text-6xl font-display font-bold leading-none mb-4">
              <span className="group-hover:text-violet-400 transition-colors">∞</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2">{t.about.value3Title[lang]}</h4>
              <p className="text-slate-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                {t.about.value3Desc[lang]}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
