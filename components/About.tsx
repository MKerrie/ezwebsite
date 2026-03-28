import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  useSEO(
    ref,
    "Over Ons | ezwebsite - Drie Vrienden, Één Missie",
    "Ahmad, Kerim en Nawdar. Drie vrienden die samen websites bouwen waar je blij van wordt."
  );

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
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Over Ons</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter max-w-4xl">
              Geen bureau. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Gewoon drie vrienden.</span>
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
            <div className="aspect-[4/3] md:aspect-[16/10]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="ezwebsite team working"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 md:right-10">
                <div className="flex items-center gap-3 mb-4">
                  {["Ahmad", "Kerim", "Nawdar"].map((name) => (
                    <div key={name} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                      <span className="text-white text-xs md:text-sm font-bold">{name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-sm md:text-base max-w-md">
                  Vrienden sinds dag één. Nu bouwen we samen websites.
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
                Ons verhaal
              </h3>
              <p className="text-white/50 leading-relaxed text-sm md:text-base mb-4">
                Drie studenten uit dezelfde klas met één gedeelde obsessie: het internet. Terwijl anderen huiswerk maken, bouwen wij websites.
              </p>
              <p className="text-white/50 leading-relaxed text-sm md:text-base mb-4">
                Het begon met kleine projectjes voor vrienden en familie. "Kun je even een site maken?" werd al snel "Jullie zijn echt goed hierin." Toen wisten we: dit is wat we willen doen.
              </p>
              <p className="text-white/50 leading-relaxed text-sm md:text-base">
                Jong, hongerig en met meer ambitie dan de meeste bureaus. Wij bewijzen dat leeftijd niks zegt — alleen het resultaat telt. Geen standaard templates, geen saaie oplossingen. Elk project krijgt onze volle aandacht alsof het ons eigen bedrijf is.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-display font-bold text-sm uppercase tracking-widest text-violet-400">Since 2024</span>
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
              <h4 className="font-bold text-lg mb-2">Altijd bereikbaar</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Stuur een berichtje om 3 uur 's nachts? Wij antwoorden. Geen wachttijden, geen ticketsystemen.
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
              <h4 className="font-bold text-lg mb-2 text-slate-900">Eerlijk & persoonlijk</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Geen verkooppraatjes. We zeggen eerlijk wat we ervan vinden en denken met je mee alsof het ons eigen project is.
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
              <h4 className="font-bold text-lg mb-2">Passie zonder limiet</h4>
              <p className="text-slate-500 group-hover:text-white/60 text-sm leading-relaxed transition-colors">
                We doen dit niet voor het geld. We doen dit omdat we het vet vinden. En dat zie je terug in elk pixel.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
