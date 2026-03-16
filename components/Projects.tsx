import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, X } from 'lucide-react';
import { Project } from '../types';
import { useSEO } from '../hooks/useSEO';

const projects: Project[] = [
  {
    id: 1,
    title: "YTech",
    category: "Webdesign",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    description: "Professionele website voor een toonaangevend elektrotechnisch installatiebedrijf.",
    year: "2024",
    tags: ["Webdesign", "Branding", "WordPress", "SEO"],
    longDescription: "YTech Elektrotechniek is een innovatief installatiebedrijf uit Vlaardingen dat woningbouw, utiliteit en renovatieprojecten door heel Nederland bedient. Wij ontwierpen en bouwden een professionele website die hun expertise, projecten en diensten helder en overtuigend presenteert aan aannemers, projectontwikkelaars en opdrachtgevers.",
    highlights: [
      "Heldere dienstenpagina's per sector (woningbouw, utiliteit, renovatie)",
      "SEO-geoptimaliseerd voor lokale en nationale vindbaarheid",
      "Mobielvriendelijk ontwerp afgestemd op het gele merkidentiteit van YTech"
    ],
    url: "https://ytech.nl"
  },
  {
    id: 2,
    title: "Apex Systems",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    description: "High-performance dashboard design voor complexe data visualisatie.",
    year: "2024",
    tags: ["React", "D3.js", "TypeScript", "WebSockets"],
    longDescription: "Voor Apex Systems ontwikkelden we een geavanceerd analytics dashboard dat real-time financiële data verwerkt van duizenden bronnen tegelijkertijd. Het dark-first ontwerp minimaliseert cognitieve belasting tijdens lange werksessies, terwijl de interactieve grafieken complexe patronen direct inzichtelijk maken.",
    highlights: [
      "Real-time updates via WebSocket verbindingen",
      "Dark-first design voor minimale oogvermoeidheid",
      "Exporteer rapporten in PDF, CSV en Excel"
    ]
  },
  {
    id: 3,
    title: "Lumina",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    description: "Een levendig en futuristisch digitaal platform voor creatieve talenten.",
    year: "2023",
    tags: ["Next.js", "Framer Motion", "Headless CMS", "Stripe"],
    longDescription: "Lumina biedt creatieve professionals een elegante plek om hun werk te presenteren en opdrachten te boeken. Het platform combineert een motion-rijke portfolioweergave met een naadloze boekingsflow en geïntegreerde betalingsverwerking. De headless CMS-architectuur laat talenten hun pagina zelfstandig beheren.",
    highlights: [
      "Portfoliowidgets met vloeiende overgangsanimaties",
      "Geïntegreerde boekings- en betalingsflow via Stripe",
      "SEO-geoptimaliseerde statische pagina's via Next.js SSG"
    ]
  },
  {
    id: 4,
    title: "Vanguard",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    description: "Minimalistisch fashion platform met focus op high-end visuals.",
    year: "2023",
    tags: ["Shopify", "GSAP", "Editorial Design", "Liquid"],
    longDescription: "Vanguard is een exclusief fashion platform waar het merk centraal staat boven het product. We ontwierpen een lookbook-gedreven winkelervaring waarbij editorial fotografie op volledig scherm de toon zet. De GSAP-gedreven paginaovergangen creëren een gevoel van een high-end modemagazine dat tot leven komt.",
    highlights: [
      "Full-screen editorial lookbook met smooth scroll",
      "Custom Shopify Liquid theme van nul opgebouwd",
      "Conversie 38% hoger dan het vorige platform"
    ]
  }
];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Panel */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => { if (info.offset.y > 80) onClose(); }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:w-[780px] max-h-[92vh] md:max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0a0a0a] rounded-t-[2.5rem] md:rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Drag handle (mobile only) */}
        <div className="md:hidden flex justify-center pt-4 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-5 md:right-5 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative w-full h-48 md:h-72 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[2rem]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category + year badge */}
          <div className="absolute bottom-4 left-5 flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
              {project.category}
            </span>
            <span className="text-white/50 text-xs font-bold tracking-widest">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 md:px-10 py-6 space-y-6 pb-10">
          {/* Title */}
          <h2 className="font-display font-bold text-4xl md:text-6xl uppercase tracking-tighter leading-[0.85] text-slate-900 dark:text-white">
            {project.title}
          </h2>

          {/* Long description */}
          <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
            {project.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-600/10 border border-blue-600/30 text-blue-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-600 block">
              Hoogtepunten
            </span>
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-2 h-[2px] w-6 shrink-0 bg-blue-600" />
                <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">{h}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="font-display font-bold text-xl md:text-3xl uppercase tracking-tighter group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white">
                  Bekijk site
                </span>
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-600 border-2 border-blue-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </a>
            )}
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-3 group"
            >
              <span className="font-display font-bold text-xl md:text-3xl uppercase tracking-tighter group-hover:text-blue-600 transition-colors text-slate-900 dark:text-white">
                Neem contact op
              </span>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-slate-900 dark:border-white flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCardMobile: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const yParallax = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={containerRef} className="relative w-full py-8 px-2">
      <motion.div
        style={{ opacity }}
        className="relative w-full h-[65vh] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900"
      >
        <motion.img
          style={{ scale: imgScale, y: yParallax }}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-[115%] object-cover grayscale-[0.3] dark:grayscale-[0.5]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 pb-10">
          <div className="space-y-4">
            <motion.span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
              {project.category}
            </motion.span>

            <h3 className="text-5xl font-display font-bold uppercase text-white leading-[0.85] tracking-tighter">
              {project.title}
            </h3>

            <p className="text-white/70 text-xs font-medium leading-relaxed max-w-[95%]">
              {project.description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white/30 font-display font-bold text-xl italic">0{project.id}</span>
                <div className="h-[1px] w-8 bg-blue-600" />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onOpen}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black"
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useSEO(
    ref,
    "Projecten | Selected Works",
    "Onze meest recente meesterwerken in webdesign en branding."
  );

  return (
    <section id="projects" ref={ref} className="py-24 bg-white dark:bg-[#020202] text-slate-900 dark:text-white transition-colors duration-300 w-full overflow-x-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-12 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-blue-600 font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block">Selected Works</span>
            <h2 className="text-[14vw] md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.75] mb-2">
              Premium
            </h2>
            <h2 className="text-[14vw] md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.75] text-stroke dark:text-stroke-white opacity-30">
              Portefeuille.
            </h2>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col">
          {projects.map((project) => (
            <ProjectCardMobile
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className={`group block w-full cursor-pointer ${index % 2 === 1 ? 'md:pt-24' : ''}`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
              </div>
              <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-6 flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-4xl uppercase mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-500 dark:text-gray-400 uppercase tracking-widest text-xs font-bold">{project.category}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-40 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center gap-6 mx-auto"
          >
            <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
              Start Project
            </span>
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-slate-900 dark:border-white flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all">
              <Plus className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
