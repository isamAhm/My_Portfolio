import React, { useEffect, useState, Suspense } from 'react';
import LoadingScreen from './components/loading/loading-screen';
import Navbar from './components/navbar/navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Lazy load all major components for better code splitting
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
const SmoothScrollHero = React.lazy(() =>
  import('./components/SmoothScroll').then((mod) => ({ default: mod.SmoothScrollHero }))
);
const HorizontalText = React.lazy(() =>
  import('./components/HorizontalText')
);
const ProjectDetails = React.lazy(() =>
  import('./components/projects-section').then((mod) => ({ default: mod.ProjectDetails }))
);
const TechnicalSkillSection = React.lazy(() =>
  import('./components/technical-skills-section')
);
const LanguageSection = React.lazy(() =>
  import('./components/languages-section')
);
const Experience = React.lazy(() =>
  import('./components/Experience')
);
const Certificates = React.lazy(() =>
  import('./components/certificates')
);
const ThreeJSSkillsSection = React.lazy(() =>
  import('./components/threejs-skills-section').then((mod) => ({ default: mod.ThreeJSSkillsSection }))
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
        background: 'linear-gradient(to bottom right, #e8f5e9, #c8e6c9, #e8f5e9)'
      };
    }
  };

  // Simple loading fallback component
  const SectionLoader = () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-pulse text-lg opacity-50">Loading...</div>
    </div>
  );

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
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <div className="hidden lg:block">
              <ThreeJSSkillsSection />
            </div>
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <TechnicalSkillSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Certificates />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <LanguageSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <SmoothScrollHero />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ProjectDetails />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <HorizontalText />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
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
