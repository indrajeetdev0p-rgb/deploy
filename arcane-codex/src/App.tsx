import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import SpellBook from './components/3D/SpellBook'
import RuneParticles from './components/3D/RuneParticles'
import SpellVFX from './components/3D/SpellVFX'
import EnvironmentController from './components/3D/EnvironmentController'
import CameraController from './components/3D/CameraController'
import Header from './components/UI/Header'
import PageNavigation from './components/UI/PageNavigation'
import ControlDock from './components/UI/ControlDock'
import BookImportModal from './components/UI/BookImportModal'
import SpellCasterUI from './components/UI/SpellCasterUI'
import { Analytics } from '@vercel/analytics/react'

function CanvasLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 glass-panel-gold rounded-3xl">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-cinzel text-amber-200 text-sm tracking-widest uppercase animate-pulse">
          Awakening Grimoire {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}

export default function App() {
  return (
    <div className="w-screen h-screen relative bg-[#07060b] overflow-hidden select-none">
      {/* 3D Canvas Scene */}
      <Canvas 
        camera={{ position: [0, 2.2, 7.5], fov: 45 }} 
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={<CanvasLoader />}>
          <EnvironmentController />
          <SpellBook />
          <RuneParticles />
          <SpellVFX />
          <CameraController />
        </Suspense>
      </Canvas>

      {/* Glassmorphism UI Overlays */}
      <Header />
      <PageNavigation />
      <SpellCasterUI />
      <ControlDock />
      <BookImportModal />
      <Analytics />
    </div>
  )
}
