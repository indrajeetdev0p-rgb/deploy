import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store'

const getRuneColorHex = (theme: string): string => {
  switch (theme) {
    case 'red': return '#ef4444';
    case 'green': return '#22c55e';
    case 'gold': return '#eab308';
    case 'purple': return '#a855f7';
    case 'blue':
    default: return '#38bdf8';
  }
}

export default function RuneParticles() {
  const { runeTheme, isOpen } = useStore()
  
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)

  const runeColor = useMemo(() => getRuneColorHex(runeTheme), [runeTheme])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6
      ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.8
      const s = 1 + Math.sin(t * 3) * 0.08
      ring3Ref.current.scale.set(s, s, s)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Floating Sparkles */}
      <Sparkles 
        count={isOpen ? 350 : 150} 
        scale={isOpen ? [12, 10, 12] : [8, 8, 8]} 
        size={isOpen ? 4 : 2} 
        speed={0.6} 
        opacity={0.8} 
        color={runeColor} 
      />

      {/* Orbiting Magical Rune Rings */}
      {!isOpen && (
        <>
          <group ref={ring1Ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[3.2, 3.28, 64]} />
              <meshBasicMaterial color={runeColor} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>

          <group ref={ring2Ref}>
            <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
              <ringGeometry args={[4.0, 4.06, 64]} />
              <meshBasicMaterial color={runeColor} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>

          <group ref={ring3Ref}>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <ringGeometry args={[4.8, 4.88, 64]} />
              <meshBasicMaterial color={runeColor} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </>
      )}
    </group>
  )
}
