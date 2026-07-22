export interface PageContentData {
  pageIndex: number;
  chapterTitle: string;
  leftTitle: string;
  leftSubtitle: string;
  leftFullText: string[];
  leftIncantation?: string;
  leftRuneSymbol: string;
  leftSpellType?: 'fire' | 'ice' | 'lightning' | 'nature';
  leftRecipe?: string[];
  
  rightTitle: string;
  rightSubtitle: string;
  rightFullText: string[];
  rightIncantation?: string;
  rightRuneSymbol: string;
  rightSpellType?: 'fire' | 'ice' | 'lightning' | 'nature';
  rightRecipe?: string[];
  
  isSecret?: boolean;
}

export const BOOK_PAGES: PageContentData[] = [
  {
    pageIndex: 0,
    chapterTitle: "Volume I — Introduction",
    leftTitle: "ARCANE CODEX",
    leftSubtitle: "The Enchiridion of Astral Spells",
    leftFullText: [
      "In the first epoch of the celestial alignment, the Arch-Magi of Oakhaven gathered beneath the Astral Spire to scribe the primordial laws of magic.",
      "This grimoire is bound in preserved dragon hide, infused with shimmering stardust, and locked by an immortal sapphire seal. Within these pages lie the secrets of elemental manipulation, alchemical transmutation, and forbidden void rites.",
      "To whosoever holds this codex: know that magic is not merely a tool, but a living dialogue with the cosmic forces of creation and entropy."
    ],
    leftRuneSymbol: "ᚦ ᚫ ᚱ ᚲ",
    
    rightTitle: "THE LAWS OF CASTING",
    rightSubtitle: "Prologue & Sacred Warnings",
    rightFullText: [
      "Before invoking any spell scribed herein, the caster must align their mind with the element in question. A divided focus will shatter the ethereal conduit, resulting in catastrophic mana feedback.",
      "1. Fire requires unyielding passion and focused intent.",
      "2. Frost demands absolute silence and calm stillness.",
      "3. Lightning calls for instant decision and decisive action.",
      "4. Nature requires harmony with all organic life.",
      "Heed these words, for the astral forces show no mercy to the careless apprentice."
    ],
    rightRuneSymbol: "ᛗ ᚨ ᚷ ᛁ"
  },
  {
    pageIndex: 1,
    chapterTitle: "Volume II — Elemental Destruction",
    leftTitle: "CHAPTER I: IGNIS PYROS",
    leftSubtitle: "The Art of Abyssal Pyromancy",
    leftFullText: [
      "Pyromancy is the oldest and most destructive art in the Arcane Codex. By channeling mana into rapid molecular vibration, the caster ignites the surrounding atmosphere into white-hot plasma.",
      "When invoking Ignis Pyros, visualize the burning heart of an active volcano. As the incantation is spoken, a raging sphere of primordial fire forms at the fingertips, seeking out hostile targets with terrifying thermal precision.",
      "Do not cast within enclosed stone vaults unless protected by a Ward of Shielding."
    ],
    leftIncantation: "\"Flame of the abyssal core, burst forth and consume!\"",
    leftRuneSymbol: "🔥 ᚠ ᛁ ᚱ",
    leftSpellType: "fire",
    
    rightTitle: "CHAPTER II: GLACIES CRYO",
    rightSubtitle: "Absolute Zero Frost Nova",
    rightFullText: [
      "Where pyromancy accelerates motion, cryomancy strips heat entirely from the realm, slowing atomic vibration until matter freezes into crystalline silence.",
      "Glacies Cryo releases a zero-kelvin shockwave in a thirty-foot radius around the caster. Enemies caught in its wave are instantly encased in unbreakable glacial ice, their vitality suspended while frost runes glow upon their frozen armor.",
      "Useful for controlling overwhelming hordes or subduing rogue magical beasts."
    ],
    rightIncantation: "\"Freeze the blood of the stars, stand frozen in eternity.\"",
    rightRuneSymbol: "❄️ ᛁ ᚳ ᛖ",
    rightSpellType: "ice"
  },
  {
    pageIndex: 2,
    chapterTitle: "Volume III — Alchemical Science",
    leftTitle: "THE ETERNAL ELIXIR",
    leftSubtitle: "Potion of Transcendent Vigor",
    leftFullText: [
      "The Elixir of Eternal Vigor is the crowning achievement of imperial alchemy. Consuming even a single vial purges all physical toxins, restores consumed mana reserves, and grants resistance to dark curses.",
      "Preparation requires precise temperature control over a three-day lunar cycle. The liquid must glow with a pale luminescent blue before bottling."
    ],
    leftRecipe: [
      "3x Starlight Lotus Petals (Harvested at midnight)",
      "1x Powdered Astral Dragon Scale",
      "500ml Abyssal Spring Water",
      "2 Drops of Concentrated Moon Essence"
    ],
    leftRuneSymbol: "🧪 ᚠ ᛁ ᛚ",
    
    rightTitle: "DRAGON'S BREATH EXTRACT",
    rightSubtitle: "Volatile Combustion Catalyst",
    rightFullText: [
      "Distilled from volcanic vents and fire drake glands, this ruby-red brew is used by battle-mages to coat their blades in permanent magma flames.",
      "When applied to steel or mithril, the weapon burns with a harmless 2000°C aura that melts enemy shields on impact."
    ],
    rightRecipe: [
      "2x Phoenix Ashes",
      "1x Heart Fragment of Ignis Wyrm",
      "1x Crystallized Sulfur Core",
      "Boil over elemental magma for 12 hours"
    ],
    rightRuneSymbol: "⚗️ ᛒ ᚱ ᛖ"
  },
  {
    pageIndex: 3,
    chapterTitle: "Volume IV — Bestiary of the Void",
    leftTitle: "THE ASTRAL DRAGON",
    leftSubtitle: "Mythic Creatures of the Cosmos",
    leftFullText: [
      "Astral Dragons are primordial leviathans that drift through nebula clouds in the deep void. Measuring over two hundred meters in length, their scales shimmer like crushed diamonds.",
      "Rather than breathing fire, an Astral Dragon exhales concentrated spatial gravity. A single blast can warp the fabric of reality, creating localized black holes that pull in surrounding asteroids.",
      "To commune with an Astral Dragon, one must carry an uncorrupted Star Core."
    ],
    leftIncantation: "Classification: Mythic God • Habitat: Celestial Void",
    leftRuneSymbol: "🐉 ᛞ ᚱ ᚨ",
    
    rightTitle: "THE VOID STALKER",
    rightSubtitle: "Predators of the Nether Realm",
    rightFullText: [
      "Void Stalkers are incorporeal shadow entities that inhabit the space between dimensions. They are invisible to ordinary sight, revealing themselves only through the chilling cold that accompanies their presence.",
      "They feed upon the mana aura of unwary sorcerers, draining spell slots until the victim is left completely powerless in the dark.",
      "The only effective defense is a glowing Holy Light rune or Sunstone."
    ],
    rightIncantation: "Classification: Legendary Fiend • Weakness: Solar Radiance",
    rightRuneSymbol: "👁️ ᚢ ᛟ ᛁ"
  },
  {
    pageIndex: 4,
    chapterTitle: "Volume V — Advanced Arts & Geography",
    leftTitle: "FULGUR ELECTRA",
    leftSubtitle: "High Tempest Lightning Strike",
    leftFullText: [
      "Fulgur Electra draws electrical potential straight from storm clouds above, channeling millions of volts through the caster's staff.",
      "The bolt leaps between up to seven targets in rapid succession, shocking armor and stunning entire platoons instantly."
    ],
    leftIncantation: "\"Thunder strike, rend the sky asunder!\"",
    leftRuneSymbol: "⚡ ᚩ ᚱ ᛗ",
    leftSpellType: "lightning",
    
    rightTitle: "SYLVA VITA",
    rightSubtitle: "Rejuvenating Nature Bloom",
    rightFullText: [
      "Sylva Vita speaks to the sleeping spirits of the soil. Vines rapidly grow from solid stone, weaving together to form protective barrier walls while blooming glowing flowers that emit healing spores.",
      "This spell can turn a barren wasteland into a lush sanctuary in moments."
    ],
    rightIncantation: "\"Mother earth, bloom and heal our wounds.\"",
    rightRuneSymbol: "🌿 ᛚ ᛁ ᚠ",
    rightSpellType: "nature"
  },
  {
    pageIndex: 5,
    chapterTitle: "Volume VI — Forbidden Forbidden Scroll",
    leftTitle: "THE CURSED PROPHECY",
    leftSubtitle: "Secret Chapter of the Shattered Moon",
    leftFullText: [
      "You have broken the ancient seal and unlocked the forbidden chapter of the Arcane Codex!",
      "Scribed in blood during the Eclipse of the Three Moons: 'When the golden seal crumbles, the Shattered Veil shall collapse. The Void Monarch will awake from ten thousand years of slumber, reclaiming the nine realms in eternal twilight.'",
      "Only the wielder of the Arcane Codex can seal the rift before the moon falls."
    ],
    leftIncantation: "\"Mori Primus, Astra Secundus, Chaos Tertiarium.\"",
    leftRuneSymbol: "💀 ᚴ ᚢ ᚱ",
    isSecret: true,
    
    rightTitle: "MAP OF SKY TEMPLE",
    rightSubtitle: "Coordinates to the Lost Sanctuary",
    rightFullText: [
      "Floating twelve thousand meters above the World Peak lies the Lost Sky Temple of the Ancients.",
      "Protected by perpetual lightning storms, the sanctuary holds the Orb of Infinity. Use these astral coordinates to bypass the temporal warding barrier."
    ],
    rightIncantation: "Coordinates: 45°N 128°E • Altitude: 12,000m • Barrier Key: Arcane Seal",
    rightRuneSymbol: "🗺️ ᛋ ᚳ ᚣ"
  }
];
