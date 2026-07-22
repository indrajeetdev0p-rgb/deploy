import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import { useStore } from '../../store'

export default function CameraController() {
  const { camera } = useThree()
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { isOpen } = useStore()
  
  const prevIsOpen = useRef(isOpen)

  useEffect(() => {
    if (!controlsRef.current) return

    // Only run the animation if the state actually changed
    if (isOpen !== prevIsOpen.current) {
      const duration = 1.2
      const ease = "power2.inOut"

      if (isOpen) {
        // Zoom close to open pages
        gsap.to(camera.position, { x: 0, y: 1.8, z: 4.8, duration, ease })
        gsap.to(controlsRef.current.target, { x: 0, y: 0, z: 0, duration, ease })
      } else {
        // Default view
        gsap.to(camera.position, { x: 0, y: 2.2, z: 7.5, duration, ease })
        gsap.to(controlsRef.current.target, { x: 0, y: 0, z: 0, duration, ease })
      }
      
      prevIsOpen.current = isOpen
    }
  }, [isOpen, camera])

  return (
    <OrbitControls 
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={12}
      maxPolarAngle={Math.PI / 2 + 0.1}
      minPolarAngle={Math.PI / 6}
    />
  )
}
