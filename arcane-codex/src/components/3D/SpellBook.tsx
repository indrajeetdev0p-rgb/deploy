import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useStore } from '../../store'
import { createPageTexture } from './CanvasTextureGenerator'
import { soundFx } from '../../utils/audio'

// Material Helper Functions
const getCoverColor = (material: string): string => {
  switch (material) {
    case 'dragonskin': return '#6b21a8'; // Deep Dragon Purple
    case 'obsidian': return '#18181b'; // Dark Glass Obsidian
    case 'gold': return '#d97706'; // Imperial Gold Cover
    case 'wood': return '#451a03'; // Ancient Oak
    case 'leather':
    default: return '#3b1c10'; // Rich Aged Leather
  }
}

const getMetalColor = (metal: string): { color: string; metalness: number; roughness: number } => {
  switch (metal) {
    case 'silver': return { color: '#e2e8f0', metalness: 0.9, roughness: 0.2 };
    case 'bronze': return { color: '#b45309', metalness: 0.8, roughness: 0.4 };
    case 'iron': return { color: '#475569', metalness: 0.7, roughness: 0.5 };
    case 'gold':
    default: return { color: '#fbbf24', metalness: 0.95, roughness: 0.15 };
  }
}

const getGemColor = (gem: string): string => {
  switch (gem) {
    case 'ruby': return '#ef4444';
    case 'emerald': return '#10b981';
    case 'amethyst': return '#a855f7';
    case 'sapphire':
    default: return '#3b82f6';
  }
}

const getRuneHex = (theme: string): string => {
  switch (theme) {
    case 'red': return '#ef4444';
    case 'green': return '#22c55e';
    case 'gold': return '#eab308';
    case 'purple': return '#a855f7';
    case 'blue':
    default: return '#38bdf8';
  }
}

export default function SpellBook() {
  const {
    isOpen,
    setIsOpen,
    currentPage,
    runeTheme,
    coverMaterial,
    metalType,
    gemstone,
    setIsHoveringBook,
    audioEnabled,
    activeBookPages
  } = useStore()

  const bookGroupRef = useRef<THREE.Group>(null)
  const leftCoverRef = useRef<THREE.Group>(null)
  const rightCoverRef = useRef<THREE.Group>(null)
  const leftPageMeshRef = useRef<THREE.Mesh>(null)
  const rightPageMeshRef = useRef<THREE.Mesh>(null)
  const gemMeshRef = useRef<THREE.Mesh>(null)

  const flippingGroupRef = useRef<THREE.Group>(null)
  
  const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null)
  const prevPageRef = useRef(currentPage)

  const runeHex = useMemo(() => getRuneHex(runeTheme), [runeTheme])
  const metalProps = useMemo(() => getMetalColor(metalType), [metalType])

  // Generate Textures for Current Page Pair
  const pageData = useMemo(() => {
    const pIndex = Math.min(currentPage, activeBookPages.length - 1);
    return activeBookPages[pIndex] || activeBookPages[0];
  }, [currentPage, activeBookPages]);

  const leftTexture = useMemo(() => createPageTexture(pageData, 'left', runeHex), [pageData, runeHex]);
  const rightTexture = useMemo(() => createPageTexture(pageData, 'right', runeHex), [pageData, runeHex]);

  // Handle Cover Opening & Closing Animations
  useEffect(() => {
    if (!leftCoverRef.current || !rightCoverRef.current) return

    const duration = 1.2
    const ease = "power3.inOut"

    if (isOpen) {
      // Open Grimoire
      gsap.to(leftCoverRef.current.rotation, { y: 0, duration, ease })
      gsap.to(rightCoverRef.current.rotation, { y: 0, duration, ease })
    } else {
      // Close Grimoire perfectly flat to avoid intersecting pages
      gsap.to(leftCoverRef.current.rotation, { y: Math.PI, duration, ease })
      gsap.to(rightCoverRef.current.rotation, { y: 0, duration, ease })
    }
  }, [isOpen])

  // Handle Page Turn Animation Effect
  useEffect(() => {
    if (!isOpen) return

    if (currentPage !== prevPageRef.current) {
      const direction = currentPage > prevPageRef.current ? 'next' : 'prev'
      setIsFlipping(direction)
      prevPageRef.current = currentPage

      if (audioEnabled) {
        soundFx.playPageFlip()
      }

      if (flippingGroupRef.current) {
        const duration = 0.6;
        const ease = "power2.inOut";
        
        if (direction === 'next') {
          // Swing from right to left
          gsap.fromTo(flippingGroupRef.current.rotation, 
            { y: 0 }, 
            { y: -Math.PI, duration, ease, onComplete: () => setIsFlipping(null) }
          )
        } else {
          // Swing from left to right
          gsap.fromTo(flippingGroupRef.current.rotation, 
            { y: -Math.PI }, 
            { y: 0, duration, ease, onComplete: () => setIsFlipping(null) }
          )
        }
      } else {
        setTimeout(() => setIsFlipping(null), 600)
      }
    }
  }, [currentPage, isOpen, audioEnabled])

  // Floating Idle Motion
  useFrame((state) => {
    if (!bookGroupRef.current) return
    const t = state.clock.elapsedTime
    
    // Gentle bobbing and subtle tilt
    bookGroupRef.current.position.y = Math.sin(t * 1.5) * 0.15
    bookGroupRef.current.rotation.z = Math.sin(t * 1.2) * 0.03

    // Gemstone Pulsating Glow Animation
    if (gemMeshRef.current) {
      const mat = gemMeshRef.current.material as THREE.MeshStandardMaterial
      if (mat) {
        mat.emissiveIntensity = 0.5 + Math.sin(t * 4) * 0.3
      }
    }
  })

  // Handle Gemstone Click
  const handleGemClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
  }

  return (
    <group 
      ref={bookGroupRef} 
      position={[0, 0, 0]}
      onPointerOver={() => setIsHoveringBook(true)}
      onPointerOut={() => setIsHoveringBook(false)}
      onClick={() => {
        if (!isOpen) setIsOpen(true)
      }}
    >
      {/* --- SPINE --- */}
      <mesh position={[0, 0, -0.05]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 3.8, 16, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial 
          color={getCoverColor(coverMaterial)} 
          roughness={0.4}
          metalness={coverMaterial === 'obsidian' ? 0.8 : 0.1} 
        />
      </mesh>

      {/* --- FLIPPING PAGE ANIMATION --- */}
      <group ref={flippingGroupRef} position={[0, 0, 0.62]} visible={isFlipping !== null}>
        <mesh position={[1.35, 0, 0]} receiveShadow castShadow>
          <planeGeometry args={[2.5, 3.6]} />
          <meshStandardMaterial map={rightTexture} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* --- RIGHT COVER (BACK COVER) --- */}
      <group ref={rightCoverRef} position={[0, 0, 0]}>
        {/* Cover Board */}
        <mesh position={[1.4, 0, -0.08]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 3.8, 0.14]} />
          <meshStandardMaterial 
            color={getCoverColor(coverMaterial)} 
            roughness={0.4} 
            metalness={coverMaterial === 'gold' ? 0.9 : 0.1} 
          />
        </mesh>

        {/* Metal Corner Reinforcements */}
        {[ [2.65, 1.8], [2.65, -1.8] ].map(([x, y], idx) => (
          <mesh key={idx} position={[x, y, -0.01]} castShadow>
            <boxGeometry args={[0.3, 0.3, 0.18]} />
            <meshStandardMaterial 
              color={metalProps.color} 
              metalness={metalProps.metalness} 
              roughness={metalProps.roughness} 
            />
          </mesh>
        ))}

        {/* Paper Block (Stack of Pages) */}
        <mesh position={[1.35, 0, 0.3]} castShadow receiveShadow>
          <boxGeometry args={[2.55, 3.65, 0.6]} />
          <meshStandardMaterial color="#e5d0a6" roughness={0.8} />
        </mesh>

        {/* Right Open Page Surface */}
        <mesh ref={rightPageMeshRef} position={[1.35, 0, 0.61]} receiveShadow>
          <planeGeometry args={[2.5, 3.6]} />
          <meshStandardMaterial map={rightTexture} roughness={0.6} />
        </mesh>
      </group>

      {/* --- LEFT COVER (FRONT COVER) --- */}
      <group position={[0, 0, 0.3]}>
        <group ref={leftCoverRef} position={[0, 0, 0]}>
          <group position={[0, 0, -0.3]}>
          {/* Cover Board */}
          <mesh position={[-1.4, 0, -0.08]} castShadow receiveShadow>
            <boxGeometry args={[2.7, 3.8, 0.14]} />
            <meshStandardMaterial 
              color={getCoverColor(coverMaterial)} 
              roughness={0.4} 
              metalness={coverMaterial === 'gold' ? 0.9 : 0.1} 
            />
          </mesh>

          {/* Left Paper Block (Stack of Pages) */}
          <mesh position={[-1.35, 0, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[2.54, 3.64, 0.58]} />
            <meshStandardMaterial color="#e5d0a6" roughness={0.8} />
          </mesh>

          {/* Left Open Page Surface */}
          <mesh ref={leftPageMeshRef} position={[-1.35, 0, 0.61]} receiveShadow>
            <planeGeometry args={[2.5, 3.6]} />
            <meshStandardMaterial map={leftTexture} roughness={0.6} />
          </mesh>

        {/* Front Cover Emblem & Metal Filigree */}
        <group position={[-1.4, 0, -0.16]} rotation={[0, Math.PI, 0]}>
          {/* Metal Ring Filigree */}
          <mesh castShadow>
            <torusGeometry args={[0.8, 0.06, 16, 64]} />
            <meshStandardMaterial 
              color={metalProps.color} 
              metalness={metalProps.metalness} 
              roughness={metalProps.roughness} 
            />
          </mesh>

          {/* Central Gemstone (Clickable Secret Trigger) */}
          <mesh 
            ref={gemMeshRef} 
            position={[0, 0, 0]} 
            onClick={handleGemClick}
            castShadow
          >
            <octahedronGeometry args={[0.32]} />
            <meshStandardMaterial 
              color={getGemColor(gemstone)} 
              emissive={getGemColor(gemstone)} 
              emissiveIntensity={0.6} 
              roughness={0.1} 
              metalness={0.9} 
            />
          </mesh>

          {/* Glowing Rune Ring around Gem */}
          <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.9, 1.05, 32]} />
            <meshBasicMaterial color={runeHex} transparent opacity={0.7} />
          </mesh>
        </group>

        {/* Metal Corner Guards Left */}
        {[ [-2.65, 1.8], [-2.65, -1.8] ].map(([x, y], idx) => (
          <mesh key={idx} position={[x, y, -0.01]} castShadow>
            <boxGeometry args={[0.3, 0.3, 0.18]} />
            <meshStandardMaterial 
              color={metalProps.color} 
              metalness={metalProps.metalness} 
              roughness={metalProps.roughness} 
            />
          </mesh>
        ))}

          {/* Crimson Ribbon Bookmark */}
          <mesh position={[-0.4, -1.9, 0.2]} rotation={[0, 0, -0.1]} castShadow>
            <boxGeometry args={[0.15, 1.2, 0.02]} />
            <meshStandardMaterial color="#dc2626" roughness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
    </group>
  )
}
