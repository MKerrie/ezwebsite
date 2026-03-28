import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [hidden, setHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Home', href: '#' },
    { name: 'Over Ons', href: '#about' },
    { name: 'Diensten', href: '#services' },
    { name: 'Projecten', href: '#projects' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-full pl-6 pr-2 py-2 flex items-center justify-between w-full max-w-5xl shadow-xl shadow-slate-200/50 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-300">
          {/* Logo Section */}
          <div className="flex-1">
            <Logo className="scale-75 origin-left" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-none">
             <div className="flex items-center bg-slate-100 dark:bg-black/40 rounded-full p-1 border border-slate-200 dark:border-white/5 transition-colors duration-300">
                {links.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative px-5 py-2 text-sm font-bold font-display uppercase tracking-wider text-slate-600 dark:text-gray-300 transition-colors z-10 hover:text-black dark:hover:text-white"
                  >
                    <span className="relative z-10">{link.name}</span>
                    {hoveredIndex === index && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-white dark:bg-white/15 rounded-full shadow-md dark:shadow-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </a>
                ))}
             </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center justify-end flex-1 gap-3">
             <button 
                onClick={toggleTheme}
                className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all hover:scale-110 border border-slate-200 dark:border-transparent"
                aria-label="Toggle Theme"
             >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="group flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-display font-bold text-sm uppercase tracking-wider hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg shadow-violet-900/20 dark:shadow-none"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex-1 flex justify-end gap-4 items-center">
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-transparent"
             >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             <button
                className="text-black dark:text-white p-2"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X /> : <Menu />}
              </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white dark:bg-black pt-32 px-6 md:hidden flex flex-col items-center transition-colors duration-300"
        >
          <div className="flex flex-col items-center space-y-8 w-full">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-4xl font-display font-bold text-slate-900 dark:text-white uppercase hover:text-violet-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="w-full h-px bg-slate-200 dark:bg-white/10 my-4" />
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-black text-center py-4 rounded-full font-display font-bold text-xl uppercase hover:bg-violet-600 hover:text-white transition-colors"
            >
              Start Project
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;