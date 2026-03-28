import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { projects } from '../data/projects';

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

const ProjectCardMobile: React.FC<{ project: (typeof projects)[0] }> = ({ project }) => {
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
              {project.description}
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

const Projects: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useSEO(
    ref,
    "Projecten | Selected Works",
    "Onze meest recente meesterwerken in webdesign en branding."
  );

  return (
    <section id="projects" ref={ref} className="py-24 bg-white text-slate-900 transition-colors duration-300 w-full overflow-x-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-12 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-violet-600 font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block">Selected Works</span>
            <h2 className="text-[14vw] md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.75] mb-2">
              Premium
            </h2>
            <h2 className="text-[14vw] md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.75] text-slate-200">
              Portfolio.
            </h2>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col">
          {projects.map((project) => (
            <ProjectCardMobile key={project.id} project={project} />
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
              className={`${index % 2 === 1 ? 'md:pt-24' : ''}`}
            >
              <Link to={`/project/${toSlug(project.title)}`} className="group block w-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                </div>
                <div className="mt-8 border-t border-slate-200 pt-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-4xl uppercase mb-2 group-hover:text-violet-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">{project.category}</p>
                  </div>
                  <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
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
            <span className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter group-hover:text-violet-600 transition-colors">
              Start Project
            </span>
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white transition-all">
              <Plus className="w-6 h-6 md:w-10 md:h-10" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
