import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TopBar from './components/Layout/TopBar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import BackToTop from './components/UI/BackToTop';
import ChatBot from './components/Chat/ChatBot';
import NeuralBackground from './components/UI/NeuralBackground';
import Preloader from './components/UI/Preloader';
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import EducationSection from './components/Sections/EducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ExperienceSection from './components/Sections/ExperienceSection';
import ContactSection from './components/Sections/ContactSection';

// Dark mode is the default. This runs before the first render so the intro picks the right colours.
const ensureDefaultTheme = () => {
  try {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  } catch {
    document.documentElement.classList.add('dark');
  }
};

function App() {
  // The Forward Pass intro plays on every page load, including refreshes.
  const [isLoading, setIsLoading] = useState(() => {
    ensureDefaultTheme();
    return true;
  });

  const finishIntro = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    document.title = 'G Navinash | Portfolio';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" onDone={finishIntro} />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <NeuralBackground />
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
          <ChatBot />
        </>
      )}
    </div>
  );
}

export default App;