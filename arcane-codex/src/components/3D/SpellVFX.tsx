import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store'
import { soundFx } from '../../utils/audio'

export default function SpellVFX() {
  const { activeSpell, audioEnabled } = useStore()

  const fireLightRef = useRef<THREE.PointLight>(null)
  const iceLightRef = useRef<THREE.PointLight>(null)
  const lightningLightRef = useRef<THREE.PointLight>(null)
  const natureLightRef = useRef<THREE.PointLight>(null)

  const lightningRingRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (activeSpell !== 'none' && audioEnabled) {
      soundFx.playSpellSound(activeSpell)
    }
  }, [activeSpell, audioEnabled])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Pulse Light Intensities
    if (fireLightRef.current && activeSpell === 'fire') {
      fireLightRef.current.intensity = 8 + Math.sin(t * 15) * 4
    }
    if (iceLightRef.current && activeSpell === 'ice') {
      iceLightRef.current.intensity = 6 + Math.cos(t * 8) * 2
    }
    if (lightningLightRef.current && activeSpell === 'lightning') {
      lightningLightRef.current.intensity = (Math.random() > 0.3 ? 12 : 1)
      if (lightningRingRef.current) {
        lightningRingRef.current.rotation.z = t * 10
      }
    }
    if (natureLightRef.current && activeSpell === 'nature') {
      natureLightRef.current.intensity = 7 + Math.sin(t * 4) * 2
    }
  })

  if (activeSpell === 'none') return null

  return (
    <group position={[0, 0.5, 0]}>
      {/* 🔥 FIRE SPELL */}
      {activeSpell === 'fire' && (
        <>
          <pointLight ref={fireLightRef} color="#ff4500" intensity={10} distance={12} />
          <Sparkles count={500} scale={[4, 8, 4]} size={8} speed={1.5} color="#ff4500" />
          <Sparkles count={300} scale={[2, 6, 2]} size={5} speed={2.0} color="#fbbf24" />
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshBasicMaterial color="#ff4500" transparent opacity={0.25} />
          </mesh>
        </>
      )}

      {/* ❄️ ICE SPELL */}
      {activeSpell === 'ice' && (
        <>
          <pointLight ref={iceLightRef} color="#38bdf8" intensity={8} distance={12} />
          <Sparkles count={600} scale={[6, 6, 6]} size={4} speed={0.3} color="#e0f2fe" noise={2} />
          <Sparkles count={300} scale={[4, 4, 4]} size={6} speed={0.5} color="#38bdf8" />
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.2, 0.08, 16, 64]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
          </mesh>
        </>
      )}

      {/* ⚡ LIGHTNING SPELL */}
      {activeSpell === 'lightning' && (
        <>
          <pointLight ref={lightningLightRef} color="#facc15" intensity={12} distance={14} />
          <Sparkles count={400} scale={[3, 9, 3]} size={7} speed={3.0} color="#facc15" noise={4} />
          <mesh ref={lightningRingRef}>
            <ringGeometry args={[1.5, 2.5, 8]} />
            <meshBasicMaterial color="#fef08a" wireframe transparent opacity={0.8} />
          </mesh>
        </>
      )}

      {/* 🌿 NATURE SPELL */}
      {activeSpell === 'nature' && (
        <>
          <pointLight ref={natureLightRef} color="#4ade80" intensity={8} distance={12} />
          <Sparkles count={450} scale={[5, 7, 5]} size={5} speed={0.4} color="#4ade80" />
          <Sparkles count={250} scale={[3, 5, 3]} size={6} speed={0.6} color="#fef08a" />
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <torusGeometry args={[2.0, 0.05, 16, 64]} />
            <meshBasicMaterial color="#22c55e" transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  )
}
