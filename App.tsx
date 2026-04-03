import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoCloud from './components/LogoCloud';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorEffects from './components/CursorEffects';
import ScrollToTop from './components/ScrollToTop';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsPage from './pages/ProjectsPage';

const HomePage: React.FC = () => (
  <div className="antialiased selection:bg-violet-500 selection:text-white font-sans bg-white text-slate-900">
    <CursorEffects />
    <Navbar />
    <main>
      <Hero />
      <LogoCloud />
      <About />
      <Services />
      <Process />
      <Projects />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/ezwebsite">
      <ScrollToTopOnNavigate />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projecten" element={<ProjectsPage />} />
        <Route
          path="/project/:slug"
          element={
            <div className="antialiased font-sans bg-white text-slate-900">
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
