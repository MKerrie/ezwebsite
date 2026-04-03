import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Plus, Globe } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

/* ── Styles ── */
const InjectStyles = () => (
  <style>{`
    @keyframes border-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .card-glow {
      position: relative;
    }
    .card-glow::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(
        135deg,
        rgba(124,58,237,0) 0%,
        rgba(124,58,237,0) 40%,
        rgba(124,58,237,0.3) 50%,
        rgba(124,58,237,0) 60%,
        rgba(124,58,237,0) 100%
      );
      background-size: 300% 300%;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .card-glow:hover::before {
      opacity: 1;
      animation: border-flow 3s ease infinite;
    }
  `}</style>
);

/* ── Browser chrome frame ── */
const BrowserFrame: React.FC<{ url?: string; children: React.ReactNode; className?: string }> = ({ url, children, className = '' }) => (
  <div className={`rounded-xl overflow-hidden bg-[#111118] border border-white/[0.06] ${className}`}>
    {/* Chrome bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0c0c12] border-b border-white/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      </div>
      {url && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] max-w-[240px]">
            <Globe className="w-3 h-3 text-white/20 shrink-0" />
            <span className="text-[10px] text-white/25 truncate font-mono">{url.replace(/^https?:\/\//, '')}</span>
          </div>
        </div>
      )}
    </div>
    {/* Content */}
    <div className="relative overflow-hidden">
      {children}
    </div>
  </div>
);

/* ── Mobile card ── */
const ProjectCardMobile: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
  const containerRef = useRef(null);
  const { lang, t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const imgScale = useTransform(smoothProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7]);

  const projectIndex = project.id - 1;
  const description = t.projectData[projectIndex]?.description[lang] ?? project.description;

  return (
    <Link to={`/project/${toSlug(project.title)}`} className="block">
      <div ref={containerRef} className="relative w-full py-4 px-1">
        <motion.div style={{ opacity }} className="card-glow rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/[0.06]">
          {/* Browser frame preview */}
          <div className="p-3 pb-0">
            <BrowserFrame url={project.url}>
              <motion.div style={{ scale: imgScale }} className="aspect-[16/10]">
                <img
                  src={project.mockupImage || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </BrowserFrame>
          </div>
          {/* Info */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/15 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                {project.category}
              </span>
              <span className="text-white/15 text-[10px] font-bold">{project.year}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-white/90 mb-0.5">
                  {project.title}
                </h3>
                <p className="text-white/30 text-xs leading-relaxed line-clamp-2">{description}</p>
              </div>
              <div className="shrink-0 w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/50">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

/* ── Desktop project card ── */
const ProjectCard: React.FC<{
  project: (typeof projects)[0];
  index: number;
  size?: 'large' | 'medium' | 'default';
}> = ({ project, index, size = 'default' }) => {
  const { lang, t } = useLanguage();
  const projectIndex = project.id - 1;
  const description = t.projectData[projectIndex]?.description[lang] ?? project.description;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const isLarge = size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/project/${toSlug(project.title)}`} className="block group">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
          className="card-glow rounded-2xl overflow-hidden bg-[#0a0a12] border border-white/[0.06] transition-all duration-500"
        >
          {/* Spotlight glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-700"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(124,58,237,0.04), transparent 40%)`,
            }}
          />

          {/* Browser frame with project preview */}
          <div className={`relative ${isLarge ? 'p-5' : 'p-3 lg:p-4'}`}>
            <BrowserFrame url={project.url}>
              <motion.div
                className={isLarge ? 'aspect-[16/8]' : 'aspect-[16/10]'}
                animate={{
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              >
                <img
                  src={project.mockupImage || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </BrowserFrame>
          </div>

          {/* Card info */}
          <div className={`relative z-10 ${isLarge ? 'px-6 pb-6 pt-1' : 'px-4 lg:px-5 pb-4 lg:pb-5 pt-0'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/15 text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                    {project.category}
                  </span>
                  <span className="text-white/15 text-xs font-bold">{project.year}</span>
                </div>
                <h3 className={`font-display font-bold uppercase tracking-tight transition-colors duration-300 ${
                  isLarge ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'
                } ${isHovered ? 'text-white' : 'text-white/80'}`}>
                  {project.title}
                </h3>
                <p className={`text-white/30 leading-relaxed mt-1 ${
                  isLarge ? 'text-sm max-w-lg' : 'text-sm line-clamp-1'
                }`}>
                  {description}
                </p>
                {isLarge && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] font-medium text-white/25">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <motion.div
                className={`shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isLarge ? 'w-12 h-12 mt-1' : 'w-10 h-10'
                }`}
                style={{
                  backgroundColor: isHovered ? 'rgba(124,58,237,0.9)' : 'transparent',
                  borderColor: isHovered ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.06)',
                  color: isHovered ? '#fff' : 'rgba(255,255,255,0.3)',
                }}
              >
                <ArrowUpRight className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Main section ── */
interface ProjectsProps {
  showAll?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ showAll = false }) => {
  const ref = useRef<HTMLElement>(null);
  const { lang, t } = useLanguage();

  useSEO(ref, t.projects.seoTitle[lang], t.projects.seoDesc[lang]);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-[#060608] text-white transition-colors duration-300 w-full overflow-hidden">
      <InjectStyles />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-[#060608]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-transparent to-[#060608]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-violet-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 block">{t.projects.label[lang]}</span>
            <h2 className="font-display font-bold text-5xl md:text-8xl uppercase leading-[0.85] tracking-tighter text-white">
              {t.projects.headline1[lang]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">{t.projects.headline2[lang]}</span>
            </h2>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-2">
          {displayedProjects.map((project) => (
            <ProjectCardMobile key={project.id} project={project} />
          ))}
        </div>

        {/* Desktop: Bento grid — pairs of 2 with alternating asymmetry */}
        <div className="hidden md:flex flex-col gap-6">
          {Array.from({ length: Math.ceil(displayedProjects.length / 2) }, (_, rowIdx) => {
            const pair = displayedProjects.slice(rowIdx * 2, rowIdx * 2 + 2);
            const isEvenRow = rowIdx % 2 === 0;
            if (pair.length === 1) {
              return (
                <div key={rowIdx} className="grid grid-cols-[1fr_1fr] gap-6">
                  <ProjectCard project={pair[0]} index={rowIdx * 2} size="large" />
                </div>
              );
            }
            return (
              <div key={rowIdx} className={`grid gap-6 ${isEvenRow ? 'grid-cols-[1.4fr_1fr]' : 'grid-cols-[1fr_1.4fr]'}`}>
                <ProjectCard project={pair[0]} index={rowIdx * 2} size={isEvenRow ? 'large' : 'default'} />
                <ProjectCard project={pair[1]} index={rowIdx * 2 + 1} size={isEvenRow ? 'default' : 'large'} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 md:mt-32 text-center">
          {!showAll && projects.length > 4 ? (
            <Link to="/projecten">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-6 mx-auto"
              >
                <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white group-hover:text-violet-400 transition-colors">
                  {t.projects.viewAll[lang]}
                </span>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all">
                  <ArrowRight className="w-6 h-6 md:w-10 md:h-10 text-white" />
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
                <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white group-hover:text-violet-400 transition-colors">
                  {t.nav.startProject[lang]}
                </span>
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all">
                  <Plus className="w-6 h-6 md:w-10 md:h-10 text-white" />
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
