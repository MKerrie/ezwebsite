import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

const ProjectCardMobile: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  const containerRef = useRef(null);
  const { lang, t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const yParallax = useTransform(smoothProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.8]);

  const projectIndex = project.id - 1;
  const description = t.projectData[projectIndex]?.description[lang] ?? project.description;

  return (
    <div ref={containerRef} className="relative w-full py-8 px-2">
      <motion.div
        style={{ opacity }}
        className="relative w-full h-[65vh] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-100"
      >
        <motion.img
          style={{ scale: imgScale, y: yParallax }}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-[115%] object-cover object-top grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 pb-10">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
              {project.category}
            </span>
            <h3 className="text-5xl font-display font-bold uppercase text-white leading-[0.85] tracking-tighter">
              {project.title}
            </h3>
            <p className="text-white/70 text-xs font-medium leading-relaxed max-w-[95%]">
              {description}
            </p>
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white/30 font-display font-bold text-xl italic">0{project.id}</span>
                <div className="h-[1px] w-8 bg-violet-600" />
              </div>
              <Link to={`/project/${toSlug(project.title)}`}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsProps {
  showAll?: boolean;
}

/* ── Spotlight card with mouse-tracking glow + 3D tilt ── */
const SpotlightCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
  featured?: boolean;
}> = ({ project, index, featured = false }) => {
  const { lang, t } = useLanguage();
  const projectIndex = project.id - 1;
  const description = t.projectData[projectIndex]?.description[lang] ?? project.description;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/project/${toSlug(project.title)}`} className="block w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative overflow-hidden bg-slate-950 border border-slate-800/60 shadow-xl transition-all duration-500 ${
            featured ? 'rounded-[2.5rem]' : 'rounded-[2rem]'
          } ${isHovered ? 'border-violet-500/30 shadow-2xl shadow-violet-500/5' : ''}`}
        >
          {/* Mouse spotlight */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.1), transparent 40%)`,
            }}
          />

          {featured ? (
            /* ── FEATURED: side-by-side layout ── */
            <div className="grid grid-cols-2 min-h-[480px]">
              {/* Left: info */}
              <div className="relative z-10 p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">{project.year}</span>
                  </div>
                  <h3 className={`font-display font-bold text-5xl lg:text-6xl uppercase tracking-tight mb-4 transition-colors duration-300 ${isHovered ? 'text-violet-400' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed max-w-md">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="ml-auto">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white border"
                      animate={{
                        backgroundColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.05)',
                        borderColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.1)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* Right: mockup */}
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/30 to-slate-950 flex items-center justify-center p-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-violet-600/8 blur-[100px] rounded-full" />
                <motion.img
                  src={project.mockupImage}
                  alt={`${project.title} mockup`}
                  className="relative z-10 w-full h-auto max-h-[420px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                  animate={{ scale: isHovered ? 1.05 : 1, y: isHovered ? -6 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>
            </div>
          ) : (
            /* ── REGULAR: stacked layout ── */
            <>
              <div className="relative overflow-hidden bg-gradient-to-b from-slate-800/40 to-slate-950 pt-4 px-4 lg:px-6">
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-violet-600/10 blur-[80px] rounded-full transition-opacity duration-700"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />
                {project.mockupImage ? (
                  <motion.img
                    src={project.mockupImage}
                    alt={`${project.title} mockup`}
                    className="w-full h-auto block relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    animate={{ scale: isHovered ? 1.04 : 1, y: isHovered ? -4 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                ) : (
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl aspect-[16/10]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
                  </div>
                )}
              </div>
              <div className="relative z-10 p-6 lg:p-8 flex items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-xs font-bold">{project.year}</span>
                  </div>
                  <h3 className={`font-display font-bold text-2xl lg:text-3xl uppercase tracking-tight mb-1 transition-colors duration-300 ${isHovered ? 'text-violet-400' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-1">{description}</p>
                </div>
                <motion.div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white border"
                  animate={{
                    backgroundColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.05)',
                    borderColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ showAll = false }) => {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLanguage();

  useSEO(ref, t.projects.seoTitle[lang], t.projects.seoDesc[lang]);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  const [first, ...rest] = displayedProjects;

  return (
    <section id="projects" ref={ref} className="py-24 bg-white text-slate-900 transition-colors duration-300 w-full overflow-x-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t.projects.label[lang]}</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter">
              {t.projects.headline1[lang]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">{t.projects.headline2[lang]}</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col">
          {displayedProjects.map((project) => (
            <ProjectCardMobile key={project.id} project={project} />
          ))}
        </div>

        {/* Desktop: Bento layout */}
        <div className="hidden md:flex flex-col gap-6 lg:gap-8">
          {/* Featured first project — full width */}
          {first && (
            <SpotlightCard project={first} index={0} featured />
          )}
          {/* Rest in 2-col or 3-col grid */}
          <div className={`grid gap-6 lg:gap-8 ${rest.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {rest.map((project, index) => (
              <SpotlightCard key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-40 text-center">
          {!showAll && projects.length > 4 ? (
            <Link to="/projecten">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-6 mx-auto"
              >
                <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter group-hover:text-violet-600 transition-colors">
                  {t.projects.viewAll[lang]}
                </span>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-6 h-6 md:w-10 md:h-10" />
                </div>
              </motion.div>
            </Link>
          ) : (
            <Link to="/#contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-6 mx-auto"
              >
                <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter group-hover:text-violet-600 transition-colors">
                  {t.nav.startProject[lang]}
                </span>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white transition-all">
                  <Plus className="w-6 h-6 md:w-10 md:h-10" />
                </div>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
