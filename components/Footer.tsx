import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Dribbble, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    const element = document.querySelector(href);
    if(element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-200 text-slate-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Top Section - Big CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-slate-200 pb-16">
          <div className="max-w-3xl">
            <h2 className="font-display font-bold text-5xl md:text-8xl lg:text-9xl uppercase leading-none mb-8">
              Heb je een <br/>
              <span className="text-fuchsia-600">Idee?</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-0 w-full md:w-auto flex justify-center md:block">
             <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, '#contact')}
                className="group flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-900 text-white font-bold text-lg md:text-xl uppercase tracking-widest hover:scale-110 hover:bg-fuchsia-600 hover:text-white transition-all duration-300 shadow-xl"
            >
               <span className="group-hover:-translate-y-1 transition-transform">Let's Talk</span>
             </a>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1">
             <div className="mb-6">
                <Logo />
             </div>
             <p className="text-slate-500 leading-relaxed">
               Wij creëren digitale ervaringen die merken definiëren. 
               Gevestigd in Nederland, wereldwijd actief.
             </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Sitemap</h4>
            <ul className="space-y-4 font-display text-lg md:text-xl uppercase font-bold">
              <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-fuchsia-500 transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleScroll(e, '#about')} className="hover:text-fuchsia-500 transition-colors">Over Ons</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-fuchsia-500 transition-colors">Diensten</a></li>
              <li><a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-fuchsia-500 transition-colors">Projecten</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Socials</h4>
            <ul className="space-y-4 font-display text-lg md:text-xl uppercase font-bold">
              <li><a href="#" className="flex items-center hover:text-fuchsia-500 transition-colors group">Instagram <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#" className="flex items-center hover:text-fuchsia-500 transition-colors group">LinkedIn <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#" className="flex items-center hover:text-fuchsia-500 transition-colors group">Dribbble <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#" className="flex items-center hover:text-fuchsia-500 transition-colors group">Twitter <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            </ul>
          </div>

          <div className="col-span-1">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Contact</h4>
             <a href="mailto:hello@ezwebsite.nl" className="block font-display text-lg md:text-xl uppercase font-bold mb-2 hover:text-fuchsia-500 transition-colors">hello@ezwebsite.nl</a>
             <a href="tel:+31612345678" className="block font-display text-lg md:text-xl uppercase font-bold text-slate-400 hover:text-fuchsia-500 transition-colors">+31 6 1234 5678</a>
             <p className="text-slate-500 mt-4">Amsterdam, Nederland</p>
          </div>
        </div>

        {/* Bottom Section - Copyright & Big Text */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200">
          <div className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ezwebsite. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-500 hover:text-black text-sm uppercase font-bold tracking-wider">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-black text-sm uppercase font-bold tracking-wider">Terms of Service</a>
          </div>
        </div>
        
        {/* Massive Background Text - Fixed for Mobile */}
        <div className="w-full overflow-hidden mt-12 opacity-5 pointer-events-none select-none">
          <h1 className="text-[13vw] md:text-[20rem] font-display font-bold leading-none text-center whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-black to-transparent">
            EZWEBSITE
          </h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;