import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import Marquee from './Marquee';
import { useLanguage } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { name: t.nav.home[lang], href: '#' },
    { name: t.nav.about[lang], href: '#about' },
    { name: t.nav.services[lang], href: '#services' },
    { name: t.nav.projects[lang], href: '#projects' },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-0 pb-8 overflow-hidden">

      {/* Giant marquee CTA */}
      <div className="border-b border-white/10 py-10 md:py-16">
        <Marquee
          items={[...t.footer.marquee[lang]]}
          speed={20}
          separator="✦"
          className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight text-white/10"
        />
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-16 md:pt-24">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16 md:mb-24">

          {/* Left - CTA */}
          <div className="lg:max-w-xl">
            <h2 className="font-display font-bold text-4xl md:text-6xl uppercase leading-none mb-6">
              {t.footer.headline1[lang]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">{t.footer.headline2[lang]}</span>
            </h2>
            <p className="text-white/40 text-base md:text-lg leading-relaxed mb-8">
              {t.footer.subtext[lang]}
            </p>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-violet-600 text-white rounded-full font-display font-bold uppercase tracking-wider hover:bg-violet-500 transition-all"
            >
              {t.nav.startProject[lang]}
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right - Links */}
          <div className="grid grid-cols-2 gap-10 md:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">{t.footer.sitemap[lang]}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => handleScroll(e, link.href)} className="text-white/60 hover:text-violet-400 transition-colors font-medium">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-6">{t.footer.contactLabel[lang]}</h4>
              <a href="mailto:info@ezwebsite.nl" className="block text-white/60 hover:text-violet-400 transition-colors font-medium mb-4">info@ezwebsite.nl</a>
              <p className="text-white/30 text-sm">{t.footer.country[lang]}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="mb-4 md:mb-0">
            <Logo light />
          </div>
          <div className="text-white/30 text-sm">
            {t.footer.madeBy[lang]}{' '}
            <a href="https://ahmadarab.nl" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-violet-400 transition-colors">Ahmad</a>,{' '}
            <a href="https://mkerrie.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-violet-400 transition-colors">Kerim</a> &{' '}
            <a href="https://nawdar.nl" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-violet-400 transition-colors">Nawdar</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
