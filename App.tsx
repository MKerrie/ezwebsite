import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorEffects from './components/CursorEffects';
import ScrollToTop from './components/ScrollToTop';
import ProjectDetail from './pages/ProjectDetail';

const HomePage: React.FC<{ isDarkMode: boolean; toggleTheme: () => void }> = ({ isDarkMode, toggleTheme }) => (
  <div className="antialiased selection:bg-blue-500 selection:text-white font-sans bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
    <CursorEffects />
    <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <BrowserRouter basename="/ezwebsite">
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route
          path="/project/:slug"
          element={
            <div className="antialiased font-sans bg-white dark:bg-[#020202] text-slate-900 dark:text-white">
              <CursorEffects />
              <ProjectDetail />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
