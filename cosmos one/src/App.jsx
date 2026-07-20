import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Loader, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useStore } from './store';

import UI from './components/UI';
import Scene from './components/Scene';

function App() {
  const { currentSection } = useStore();

  return (
    <div className="app-container">
      {/* 3D Canvas Layer */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#04060D']} />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4E8BFF" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <Scene currentSection={currentSection} />
        </Suspense>

        {/* Post Processing for Neon glow and premium feel */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      {/* HTML Overlay Layer */}
      <UI />
      
      {/* Drei Loader */}
      <Loader 
        containerStyles={{ background: '#04060D' }} 
        innerStyles={{ width: '300px' }}
        barStyles={{ background: '#4E8BFF' }}
        dataStyles={{ color: '#FFFFFF', fontFamily: 'Space Grotesk' }}
      />
    </div>
  );
}

export default App;
