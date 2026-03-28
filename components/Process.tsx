import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <MessageSquare />,
    title: "Gesprek",
    description: "We leren je kennen. Wat is je doel? Wie is je doelgroep? Samen bepalen we de richting.",
    color: "bg-violet-600",
  },
  {
    icon: <Palette />,
    title: "Design",
    description: "We ontwerpen een uniek design dat past bij jouw merk. Geen templates, puur maatwerk.",
    color: "bg-purple-600",
  },
  {
    icon: <Code2 />,
    title: "Development",
    description: "Je website wordt gebouwd met de nieuwste technologieën. Snel, responsive en geoptimaliseerd.",
    color: "bg-indigo-600",
  },
  {
    icon: <Rocket />,
    title: "Lancering",
    description: "We lanceren je site en zorgen dat alles perfect werkt. Daarna staan we 24/7 klaar voor support.",
    color: "bg-violet-700",
  },
];

const Process: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Werkwijze</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              Van idee naar <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Lancering.</span>
            </h2>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative text-center md:text-left group"
              >
                {/* Step number + icon */}
                <div className="flex flex-col items-center md:items-start mb-8">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-violet-600">{index + 1}</span>
                    </div>
                  </div>

                  {/* Arrow connector - mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-slate-200 mt-4" />
                  )}
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base max-w-xs mx-auto md:mx-0">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
