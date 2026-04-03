import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const project = projects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900">
        <p className="text-xl font-display uppercase mb-6">{t.projectDetail.notFound[lang]}</p>
        <Link to="/" className="text-violet-600 underline">{t.projectDetail.backHome[lang]}</Link>
      </div>
    );
  }

  const projectIndex = project.id - 1;
  const localizedDesc = t.projectData[projectIndex]?.longDescription[lang] ?? project.longDescription;
  const localizedHighlights = t.projectData[projectIndex]?.highlights[lang] ?? project.highlights;

  const images = project.images?.length ? project.images : [project.image];
  const prevProject = projects[(project.id - 2 + projects.length) % projects.length];
  const nextProject = projects[project.id % projects.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-slate-900"
    >
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 text-sm font-bold uppercase tracking-widest hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t.projectDetail.back[lang]}</span>
        </button>
      </div>

      {/* Spacer for back button */}
      <div className="h-24" />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 md:gap-20">

          {/* Left column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-violet-600/10 border border-violet-600/30 text-[9px] font-bold uppercase tracking-[0.3em] text-violet-500">
                {project.category}
              </span>
              <span className="text-slate-400 text-xs font-bold tracking-widest">{project.year}</span>
            </div>

            <h1 className="font-display font-bold text-[15vw] md:text-[8vw] uppercase tracking-tighter leading-[0.8] mb-8 text-slate-900">
              {project.title}
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {localizedDesc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-600/10 border border-violet-600/30 text-violet-500"
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
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-600 block">
                  {t.projectDetail.highlights[lang]}
                </span>
                {localizedHighlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-2 h-[2px] w-6 shrink-0 bg-violet-600" />
                    <p className="text-slate-700 text-sm leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-8 space-y-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full group"
                  >
                    <span className="font-display font-bold text-2xl uppercase tracking-tighter group-hover:text-violet-600 transition-colors">
                      {t.projectDetail.viewSite[lang]}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </a>
                )}
                <Link
                  to="/#contact"
                  className="flex items-center justify-between w-full group"
                >
                  <span className="font-display font-bold text-2xl uppercase tracking-tighter group-hover:text-violet-600 transition-colors">
                    {t.projectDetail.contactUs[lang]}
                  </span>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Next/Prev project navigation */}
        <div className="border-t border-slate-200 mt-16 pt-12 grid grid-cols-2 gap-6">
          <Link
            to={`/project/${prevProject.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex flex-col gap-2"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{t.projectDetail.prevProject[lang]}</span>
            <div className="relative overflow-hidden rounded-xl aspect-video bg-neutral-800">
              <img src={prevProject.image} alt={prevProject.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tighter group-hover:text-violet-600 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {prevProject.title}
            </h3>
          </Link>

          <Link
            to={`/project/${nextProject.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex flex-col gap-2 items-end text-right"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{t.projectDetail.nextProject[lang]}</span>
            <div className="relative overflow-hidden rounded-xl aspect-video w-full bg-neutral-800">
              <img src={nextProject.image} alt={nextProject.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
            </div>
            <h3 className="font-display font-bold text-xl uppercase tracking-tighter group-hover:text-violet-600 transition-colors flex items-center gap-2">
              {nextProject.title} <ArrowUpRight className="w-4 h-4" />
            </h3>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
