import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';
import DeviceMockup from './DeviceMockup';

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

const ProjectCardDesktop: React.FC<{ project: (typeof projects)[0]; index: number }> = ({ project, index }) => {
  const { lang, t } = useLanguage();
  const projectIndex = project.id - 1;
  const description = t.projectData[projectIndex]?.description[lang] ?? project.description;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const tiltX = isHovered ? ((mousePos.y / (cardRef.current?.offsetHeight ?? 1)) - 0.5) * -8 : 0;
  const tiltY = isHovered ? ((mousePos.x / (cardRef.current?.offsetWidth ?? 1)) - 0.5) * 8 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <Link to={`/project/${toSlug(project.title)}`} className="block w-full">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            rotateX: tiltX,
            rotateY: tiltY,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-800/80 shadow-xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Mouse-tracking spotlight glow */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.12), transparent 40%)`,
            }}
          />
          {/* Border glow that follows mouse */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.25), transparent 40%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />

          {/* Mockup image area */}
          <div className="relative overflow-hidden bg-gradient-to-b from-slate-800/50 to-slate-950 pt-4 px-4 lg:px-6">
            {/* Top ambient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-32 bg-violet-600/10 blur-[80px] rounded-full transition-opacity duration-700"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
            {project.mockupImage ? (
              <motion.img
                src={project.mockupImage}
                alt={`${project.title} multi-device mockup`}
                className="w-full h-auto block relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                animate={{
                  scale: isHovered ? 1.04 : 1,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            ) : (
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl aspect-[16/10]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="relative z-10 p-6 lg:p-8 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  {project.category}
                </span>
                <span className="text-slate-500 text-xs font-bold">{project.year}</span>
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-3xl uppercase text-white tracking-tight mb-1" style={{ transition: 'color 0.3s' }}>
                <span style={{ color: isHovered ? '#a78bfa' : '#ffffff' }}>{project.title}</span>
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-1">{description}</p>
            </div>
            <motion.div
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white border"
              animate={{
                backgroundColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.05)',
                borderColor: isHovered ? 'rgba(124,58,237,1)' : 'rgba(255,255,255,0.1)',
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ showAll = false }) => {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLanguage();

  useSEO(ref, t.projects.seoTitle[lang], t.projects.seoDesc[lang]);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

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

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCardDesktop key={project.id} project={project} index={index} />
          ))}
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
