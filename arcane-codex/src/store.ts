import { create } from 'zustand'
import { BOOK_PAGES } from './data/spells'
import type { PageContentData } from './data/spells'

export type RuneTheme = 'blue' | 'red' | 'green' | 'gold' | 'purple'
export type SpellType = 'none' | 'fire' | 'ice' | 'lightning' | 'nature'
export type CoverMaterial = 'leather' | 'dragonskin' | 'obsidian' | 'gold' | 'wood'
export type MetalType = 'iron' | 'silver' | 'gold' | 'bronze'
export type GemstoneType = 'ruby' | 'sapphire' | 'emerald' | 'amethyst'
export type EnvironmentPreset = 'library' | 'tower' | 'dungeon' | 'forest' | 'sky_temple'
export type LightingPreset = 'candlelight' | 'moonlight' | 'mystic' | 'inferno' | 'emerald'

export interface ArcaneState {
  // Active Book State
  activeBookId: string;
  activeBookTitle: string;
  activeBookPages: PageContentData[];
  setActiveBook: (id: string, title: string, pages: PageContentData[]) => void;
  
  // Book controls
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  
  // Magical Customization
  runeTheme: RuneTheme;
  setRuneTheme: (theme: RuneTheme) => void;
  activeSpell: SpellType;
  castSpell: (spell: SpellType) => void;
  
  // Book Visuals
  coverMaterial: CoverMaterial;
  setCoverMaterial: (mat: CoverMaterial) => void;
  metalType: MetalType;
  setMetalType: (metal: MetalType) => void;
  gemstone: GemstoneType;
  setGemstone: (gem: GemstoneType) => void;
  
  // Atmosphere & World
  environment: EnvironmentPreset;
  setEnvironment: (env: EnvironmentPreset) => void;
  lighting: LightingPreset;
  setLighting: (light: LightingPreset) => void;
  
  // Audio & Modals
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
  isAutoDemo: boolean;
  setIsAutoDemo: (val: boolean) => void;
  isHoveringBook: boolean;
  setIsHoveringBook: (val: boolean) => void;
  
  isImportModalOpen: boolean;
  setIsImportModalOpen: (val: boolean) => void;
}

export const useStore = create<ArcaneState>((set, get) => ({
  activeBookId: 'arcane',
  activeBookTitle: 'Arcane Codex',
  activeBookPages: BOOK_PAGES,
  setActiveBook: (id, title, pages) => set({ 
    activeBookId: id, 
    activeBookTitle: title, 
    activeBookPages: pages,
    currentPage: 0,
    isOpen: true
  }),

  isOpen: false,
  setIsOpen: (val) => set({ isOpen: val }),
  currentPage: 0,
  setCurrentPage: (page) => {
    const pagesCount = get().activeBookPages.length;
    const clamped = Math.max(0, Math.min(page, pagesCount - 1));
    set({ currentPage: clamped, isOpen: clamped > 0 });
  },
  nextPage: () => {
    const { currentPage, activeBookPages } = get();
    if (currentPage < activeBookPages.length - 1) {
      set({ currentPage: currentPage + 1, isOpen: true });
    }
  },
  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 0) {
      const nextP = currentPage - 1;
      set({ currentPage: nextP, isOpen: nextP > 0 });
    }
  },

  runeTheme: 'blue',
  setRuneTheme: (theme) => set({ runeTheme: theme }),
  
  activeSpell: 'none',
  castSpell: (spell) => {
    set({ activeSpell: spell });
    setTimeout(() => {
      if (get().activeSpell === spell) {
        set({ activeSpell: 'none' });
      }
    }, 4500);
  },

  coverMaterial: 'leather',
  setCoverMaterial: (mat) => set({ coverMaterial: mat }),
  metalType: 'gold',
  setMetalType: (metal) => set({ metalType: metal }),
  gemstone: 'sapphire',
  setGemstone: (gem) => set({ gemstone: gem }),

  environment: 'library',
  setEnvironment: (env) => set({ environment: env }),
  lighting: 'mystic',
  setLighting: (light) => set({ lighting: light }),

  audioEnabled: true,
  setAudioEnabled: (val) => set({ audioEnabled: val }),
  isAutoDemo: false,
  setIsAutoDemo: (val) => set({ isAutoDemo: val }),
  isHoveringBook: false,
  setIsHoveringBook: (val) => set({ isHoveringBook: val }),

  isImportModalOpen: false,
  setIsImportModalOpen: (val) => set({ isImportModalOpen: val }),
}));
