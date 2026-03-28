import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);
  const [activeImg, setActiveImg] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020202] text-slate-900 dark:text-white">
        <p className="text-xl font-display uppercase mb-6">Project niet gevonden</p>
        <Link to="/" className="text-fuchsia-600 underline">Terug naar home</Link>
      </div>
    );
  }

  const images = project.images?.length ? project.images : [project.image];
  const prevProject = projects[(project.id - 2 + projects.length) % projects.length];
  const nextProject = projects[project.id % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-[#020202] text-slate-900 dark:text-white"
    >
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Terug</span>
        </button>
      </div>

      {/* Hero image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden bg-black">
        {/* Blurred background */}
        <img
          src={images[activeImg]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={images[activeImg]}
            alt={project.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#020202] via-transparent to-transparent" />

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveImg(i => (i + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-1.5 rounded-full transition-all ${i === activeImg ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 px-6 md:px-16 pt-6 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`shrink-0 w-20 h-14 md:w-28 md:h-18 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-fuchsia-500' : 'border-transparent opacity-50 hover:opacity-80'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 md:gap-20">

          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-fuchsia-600/10 border border-fuchsia-600/30 text-[9px] font-bold uppercase tracking-[0.3em] text-fuchsia-500">
                {project.category}
              </span>
              <span className="text-slate-400 dark:text-white/30 text-xs font-bold tracking-widest">{project.year}</span>
            </div>

            <h1 className="font-display font-bold text-[15vw] md:text-[8vw] uppercase tracking-tighter leading-[0.8] mb-8 text-slate-900 dark:text-white">
              {project.title}
            </h1>

            <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {project.longDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-fuchsia-600/10 border border-fuchsia-600/30 text-fuchsia-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — highlights + CTA */}
          <div className="md:pt-32">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-fuchsia-600 block">
                  Hoogtepunten
                </span>
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-2 h-[2px] w-6 shrink-0 bg-fuchsia-600" />
                    <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-white/10 pt-8 space-y-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full group"
                  >
                    <span className="font-display font-bold text-2xl uppercase tracking-tighter group-hover:text-fuchsia-600 transition-colors">
                      Bekijk site
                    </span>
                    <div className="w-10 h-10 rounded-full bg-fuchsia-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </a>
                )}
                <Link
                  to="/#contact"
                  className="flex items-center justify-between w-full group"
                >
                  <span className="font-display font-bold text-2xl uppercase tracking-tighter group-hover:text-fuchsia-600 transition-colors">
                    Neem contact op
                  </span>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 dark:border-white flex items-center justify-center group-hover:bg-fuchsia-600 group-hover:border-fuchsia-600 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Live Site Preview — full width */}
        {project.url && (
          <div className="mt-16 md:mt-24">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-fuchsia-600">Live Site</span>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 transition-colors"
              >
                Openen in nieuw tabblad <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 bg-white dark:bg-white/10 rounded-md px-3 py-1.5 text-[11px] font-mono text-slate-500 dark:text-white/40 truncate">
                  {project.url.replace('https://', '')}
                </div>
              </div>
              {/* iframe */}
              <div
                className="live-preview-wrap relative w-full overflow-auto"
                style={{
                  height: '80vh',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#2563eb #0f172a',
                }}
              >
                <style>{`
                  .live-preview-wrap::-webkit-scrollbar { width: 6px; height: 6px; }
                  .live-preview-wrap::-webkit-scrollbar-track { background: #0f172a; }
                  .live-preview-wrap::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 999px; }
                  .live-preview-wrap::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
                `}</style>
                {project.canEmbed === false ? (
                  <div className="relative w-full h-full overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2563eb #0f172a' }}>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
                      <img
                        src={project.screenshot ?? `https://api.microlink.io/?url=${project.url}&screenshot=true&meta=false&embed=screenshot.url`}
                        alt={`${project.title} screenshot`}
                        className="w-full"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 px-6 py-3 rounded-full bg-fuchsia-600 text-white text-sm font-bold uppercase tracking-widest">
                          Bezoek site <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={project.url}
                    title={`${project.title} live preview`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    scrolling="yes"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next/Prev project navigation */}
        <div className="border-t border-slate-200 dark:border-white/10 mt-16 pt-12 grid grid-cols-2 gap-6">
          <Link
            to={`/project/${prevProject.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex flex-col gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">Vorig project</span>
            <div className="relative overflow-hidden rounded-xl aspect-video bg-neutral-800">
              <img src={prevProject.image} alt={prevProject.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tighter group-hover:text-fuchsia-600 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {prevProject.title}
            </h3>
          </Link>

          <Link
            to={`/project/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex flex-col gap-2 items-end text-right"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">Volgend project</span>
            <div className="relative overflow-hidden rounded-xl aspect-video w-full bg-neutral-800">
              <img src={nextProject.image} alt={nextProject.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tighter group-hover:text-fuchsia-600 transition-colors flex items-center gap-2">
              {nextProject.title} <ArrowUpRight className="w-4 h-4" />
            </h3>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
