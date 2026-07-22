import { useStore } from '../../store'
import { Environment, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function EnvironmentController() {
  const { environment, lighting } = useStore()

  // Map Environment Presets
  const getEnvPreset = () => {
    switch (environment) {
      case 'tower': return 'dawn';
      case 'dungeon': return 'night';
      case 'forest': return 'forest';
      case 'sky_temple': return 'city';
      case 'library':
      default: return 'apartment';
    }
  }

  return (
    <>
      <Environment preset={getEnvPreset()} background={true} blur={0.15} />

      {/* Atmospheric Star Field */}
      <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

      {/* --- LIGHTING RIG PRESETS --- */}
      {lighting === 'candlelight' && (
        <>
          <ambientLight intensity={0.4} color="#ffedd5" />
          <pointLight position={[3, 4, 3]} intensity={2.5} color="#f59e0b" castShadow />
          <pointLight position={[-3, 2, -2]} intensity={1.2} color="#d97706" />
        </>
      )}

      {lighting === 'moonlight' && (
        <>
          <ambientLight intensity={0.3} color="#bae6fd" />
          <directionalLight position={[5, 8, 5]} intensity={1.8} color="#38bdf8" castShadow />
          <pointLight position={[-4, -2, -3]} intensity={1.0} color="#818cf8" />
        </>
      )}

      {lighting === 'mystic' && (
        <>
          <ambientLight intensity={0.35} color="#e9d5ff" />
          <directionalLight position={[4, 6, 4]} intensity={1.5} color="#a855f7" castShadow />
          <pointLight position={[-4, 3, -3]} intensity={2.0} color="#38bdf8" />
        </>
      )}

      {lighting === 'inferno' && (
        <>
          <ambientLight intensity={0.35} color="#fecdd3" />
          <pointLight position={[2, 5, 2]} intensity={3.0} color="#ef4444" castShadow />
          <pointLight position={[-3, 1, -2]} intensity={2.0} color="#f97316" />
        </>
      )}

      {lighting === 'emerald' && (
        <>
          <ambientLight intensity={0.35} color="#dcfce7" />
          <directionalLight position={[3, 6, 3]} intensity={1.8} color="#22c55e" castShadow />
          <pointLight position={[-3, 2, -2]} intensity={1.5} color="#10b981" />
        </>
      )}

      {/* --- POST-PROCESSING PIPELINE --- */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.9} 
          luminanceSmoothing={0.3} 
          intensity={1.5} 
        />
        <Vignette eskil={false} offset={0.2} opacity={0.65} />
      </EffectComposer>
    </>
  )
}
