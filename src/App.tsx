import React, { useEffect, useState, Suspense } from 'react';
import LoadingScreen from './components/loading/loading-screen';
import { Navbar } from './components/navbar/navbar';
import { SmoothScrollHero } from './components/SmoothScroll';
import HorizontalText from './components/HorizontalText';
import { ProjectDetails } from './components/projects-section';
import TechnicalSkillSection from './components/technical-skills-section';
import LanguageSection from './components/languages-section';
import Experience from './components/Experience';
import Certificates from './components/certificates';
import { ThreeJSSkillsSection } from './components/threejs-skills-section';
import { ThemeProvider } from './context/ThemeContext';

const HeroSection = React.lazy(() =>
  import('./components/hero-section/home').then((mod) => ({ default: mod.HeroSection }))
);
const AboutSection = React.lazy(() =>
  import('./components/about-section').then((mod) => ({ default: mod.AboutSection }))
);
const SkillsSection = React.lazy(() =>
  import('./components/skills-section').then((mod) => ({ default: mod.SkillsSection }))
);
const ProjectsSection = React.lazy(() =>
  import('./components/projects-section').then((mod) => ({ default: mod.ProjectsSection }))
);
const ContactSection = React.lazy(() =>
  import('./components/contact-section').then((mod) => ({ default: mod.ContactSection }))
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen transition-colors duration-300 dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black bg-white">
        {isLoading ? (
          <div
            className={`fixed inset-0 bg-gradient-to-br from-black via-gray-950 to-black flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'
              }`}
          >
            <LoadingScreen />
          </div>
        ) : (
          <>
            <Navbar />
            <Suspense fallback={<></>}>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ThreeJSSkillsSection />
              <TechnicalSkillSection />
              <Certificates />
              <Experience />
              <LanguageSection />
              <SmoothScrollHero />
              <ProjectDetails />
              <ProjectsSection />
              <HorizontalText />
              <ContactSection />
            </Suspense>
          </>
        )}
      </main>
    </ThemeProvider>
  );
}

export default App;
