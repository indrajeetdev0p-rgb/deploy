import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, SECTIONS } from '../store';

const Nav = () => {
  const { currentSection, setCurrentSection } = useStore();

  return (
    <nav className="ui-interactive">
      <div className="logo" onClick={() => setCurrentSection(SECTIONS.MILKY_WAY)} style={{ cursor: 'pointer' }}>
        COSMOS ONE
      </div>
    </nav>
  );
};

const SectionWrapper = ({ sectionId, children }) => {
  const { currentSection } = useStore();
  const isActive = currentSection === sectionId;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className={`section ui-interactive active`}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};



const PlanetInfo = ({ title, description, stats }) => (
  <div className="glass-panel glass-glow planet-info-panel">
    <h2 className="planet-title">{title}</h2>
    <p className="planet-desc">{description}</p>
    <div className="stats-grid">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key}>
          <div className="stat-label">{key}</div>
          <div className="numbers stat-value">{value}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function UI() {
  const { currentSection, setCurrentSection } = useStore();
  const isScrolling = useRef(false);
  const sectionsList = Object.values(SECTIONS);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling.current) return;
      
      const currentIndex = sectionsList.indexOf(currentSection);
      let nextIndex = currentIndex;

      if (e.deltaY > 0) {
        nextIndex = (currentIndex + 1) % sectionsList.length;
      } else if (e.deltaY < 0) {
        nextIndex = (currentIndex - 1 + sectionsList.length) % sectionsList.length;
      }

      if (nextIndex !== currentIndex) {
        isScrolling.current = true;
        setCurrentSection(sectionsList[nextIndex]);
        
        setTimeout(() => {
          isScrolling.current = false;
        }, 2000); // 2 second throttle to match camera animation
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, setCurrentSection, sectionsList]);

  return (
    <div className="ui-layer">
      <Nav />
      <div className="sections-container">
        <SectionWrapper sectionId={SECTIONS.MILKY_WAY}>
          <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              MILKY WAY GALAXY
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Scroll to dive into the Solar System
            </motion.p>
          </div>
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.SOLAR_SYSTEM}>
          <PlanetInfo 
            title="The Sun" 
            description="The heart of our solar system is a yellow dwarf star, a hot ball of glowing gases. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles of debris in its orbit."
            stats={{ 'Radius': '696,340 km', 'Mass': '333,000 x Earth', 'Age': '4.6 Billion Yrs', 'Surface Temp': '5,500°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.MERCURY}>
          <PlanetInfo 
            title="Mercury" 
            description="The smallest planet in our solar system and closest to the Sun. Its surface is heavily cratered and similar in appearance to Earth's Moon."
            stats={{ 'Radius': '2,439 km', 'Orbital Period': '88 days', 'Moons': '0', 'Surface Temp': '-173°C to 427°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.VENUS}>
          <PlanetInfo 
            title="Venus" 
            description="A thick, toxic atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system."
            stats={{ 'Radius': '6,051 km', 'Orbital Period': '225 days', 'Moons': '0', 'Surface Temp': '462°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.EARTH}>
          <PlanetInfo 
            title="Earth" 
            description="Our home planet is the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface."
            stats={{ 'Radius': '6,371 km', 'Orbital Period': '365.25 days', 'Moons': '1', 'Surface Temp': '-89°C to 58°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.MARS}>
          <PlanetInfo 
            title="Mars" 
            description="A dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere."
            stats={{ 'Radius': '3,389 km', 'Orbital Period': '687 days', 'Moons': '2', 'Surface Temp': '-153°C to 20°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.JUPITER}>
          <PlanetInfo 
            title="Jupiter" 
            description="Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth."
            stats={{ 'Radius': '69,911 km', 'Orbital Period': '11.8 years', 'Moons': '95', 'Surface Temp': '-110°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.SATURN}>
          <PlanetInfo 
            title="Saturn" 
            description="Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system."
            stats={{ 'Radius': '58,232 km', 'Orbital Period': '29.5 years', 'Moons': '146', 'Surface Temp': '-140°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.URANUS}>
          <PlanetInfo 
            title="Uranus" 
            description="Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side."
            stats={{ 'Radius': '25,362 km', 'Orbital Period': '84 years', 'Moons': '28', 'Surface Temp': '-195°C' }}
          />
        </SectionWrapper>
        <SectionWrapper sectionId={SECTIONS.NEPTUNE}>
          <PlanetInfo 
            title="Neptune" 
            description="Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system."
            stats={{ 'Radius': '24,622 km', 'Orbital Period': '165 years', 'Moons': '16', 'Surface Temp': '-200°C' }}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
