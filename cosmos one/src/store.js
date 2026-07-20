import { create } from 'zustand';

export const SECTIONS = {
  MILKY_WAY: 'Milky Way',
  SOLAR_SYSTEM: 'Solar System',
  MERCURY: 'Mercury',
  VENUS: 'Venus',
  EARTH: 'Earth',
  MARS: 'Mars',
  JUPITER: 'Jupiter',
  SATURN: 'Saturn',
  URANUS: 'Uranus',
  NEPTUNE: 'Neptune',
};

export const useStore = create((set) => ({
  currentSection: SECTIONS.MILKY_WAY,
  setCurrentSection: (section) => set({ currentSection: section }),
}));
