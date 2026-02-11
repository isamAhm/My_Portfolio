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
import { ThemeProvider, useTheme } from './context/ThemeContext';
import lightThemeBg from './assets/light-theme-bg.jpg';

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

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const getBackgroundStyle = () => {
    if (theme === 'dark') {
      return {
        background: 'linear-gradient(to bottom right, black, rgb(3, 7, 18), black)'
      };
    } else {
      return {
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${lightThemeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      };
    }
  };

  return (
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={getBackgroundStyle()}
    >
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
            <div className="hidden lg:block">
              <ThreeJSSkillsSection />
            </div>
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
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
