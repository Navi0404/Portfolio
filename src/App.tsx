import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackToTop from './components/UI/BackToTop';
import Preloader from './components/UI/Preloader';
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import EducationSection from './components/Sections/EducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import ContactSection from './components/Sections/ContactSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set dark mode as default
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    // Update document title
    document.title = 'G Navinash | Portfolio';

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <TopBar />
          <Header />
          <main className="flex-grow">
            <HeroSection />
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  );
}

export default App;