import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useStore, SECTIONS } from '../store';
import gsap from 'gsap';
import Planet from './Planet';
import * as THREE from 'three';

// Planet Coordinates
const PLANET_POS = {
  [SECTIONS.MILKY_WAY]: [0, 0, 0],
  [SECTIONS.SOLAR_SYSTEM]: [0, 0, 0], // Sun position
  [SECTIONS.MERCURY]: [-10, 0, -20],
  [SECTIONS.VENUS]: [15, 5, -40],
  [SECTIONS.EARTH]: [-20, -5, -60],
  [SECTIONS.MARS]: [30, 10, -80],
  [SECTIONS.JUPITER]: [-40, -15, -120],
  [SECTIONS.SATURN]: [50, 20, -160],
  [SECTIONS.URANUS]: [-60, -10, -200],
  [SECTIONS.NEPTUNE]: [70, 15, -240],
};

const CAMERA_POS = {
  [SECTIONS.MILKY_WAY]: { x: 0, y: 150, z: 600 },
  [SECTIONS.SOLAR_SYSTEM]: { x: 0, y: 30, z: 120 }, // Far back view
  [SECTIONS.MERCURY]: { x: -10, y: 1, z: -15 },
  [SECTIONS.VENUS]: { x: 15, y: 6, z: -34 },
  [SECTIONS.EARTH]: { x: -20, y: -4, z: -53 },
  [SECTIONS.MARS]: { x: 30, y: 11, z: -74 },
  [SECTIONS.JUPITER]: { x: -40, y: -10, z: -100 },
  [SECTIONS.SATURN]: { x: 50, y: 25, z: -140 },
  [SECTIONS.URANUS]: { x: -60, y: -5, z: -185 },
  [SECTIONS.NEPTUNE]: { x: 70, y: 20, z: -225 },
};

export default function Scene({ currentSection }) {
  const { camera, size } = useThree();
  const groupRef = useRef();
  const milkyWayTexture = useTexture('/textures/milky_way.jpg');

  // Mouse Parallax effect
  const mouse = useRef({ x: 0, y: 0 });

  // Adjust FOV based on screen width to make planets look proportional on mobile
  useEffect(() => {
    const isMobile = size.width < 768;
    camera.fov = isMobile ? 75 : 45;
    camera.updateProjectionMatrix();
  }, [size.width, camera]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Camera animation on section change
  useEffect(() => {
    const targetPos = CAMERA_POS[currentSection];
    if (targetPos) {
      gsap.to(camera.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 3,
        ease: 'power3.inOut',
      });
      
      // Look roughly towards the planet center
      gsap.to(camera.rotation, {
        x: currentSection === SECTIONS.MILKY_WAY ? -0.2 : (currentSection === SECTIONS.SOLAR_SYSTEM ? -0.1 : 0),
        y: 0,
        z: 0,
        duration: 3,
        ease: 'power3.inOut',
      });
    }
  }, [currentSection, camera]);

  useFrame(() => {
    // Mouse parallax (increased intensity)
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        x: mouse.current.y * 0.15,
        y: mouse.current.x * 0.15,
        duration: 2
      });
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* Background Milky Way Sphere */}
      <mesh>
        <sphereGeometry args={[900, 64, 64]} />
        <meshBasicMaterial map={milkyWayTexture} side={THREE.BackSide} />
      </mesh>
      
      {/* Sun */}
      <Planet 
        position={PLANET_POS[SECTIONS.SOLAR_SYSTEM]} 
        radius={8} 
        color="#ffffff"
        emissive="#ffaa00"
        emissiveIntensity={1}
        textureUrl="/textures/sun.jpg"
        name="Sun"
      />

      {/* Mercury */}
      <Planet 
        position={PLANET_POS[SECTIONS.MERCURY]} 
        radius={0.8} 
        color="#ffffff"
        textureUrl="/textures/mercury.jpg"
        name="Mercury"
      />

      {/* Venus */}
      <Planet 
        position={PLANET_POS[SECTIONS.VENUS]} 
        radius={1.8} 
        color="#ffffff"
        textureUrl="/textures/venus.jpg"
        name="Venus"
      />

      {/* Earth */}
      <group position={PLANET_POS[SECTIONS.EARTH]}>
        <Planet 
          position={[0,0,0]}
          radius={2} 
          color="#ffffff"
          textureUrl="/textures/earth.jpg"
          name="Earth"
        />
        {/* Moon */}
        <Planet 
          position={[3, 0.5, -1]} 
          radius={0.5} 
          color="#ffffff" 
          rotationSpeed={0.01} 
          textureUrl="/textures/moon.jpg"
          name="Moon" 
        />
      </group>

      {/* Mars */}
      <Planet 
        position={PLANET_POS[SECTIONS.MARS]} 
        radius={1.2} 
        color="#ffffff"
        textureUrl="/textures/mars.jpg"
        name="Mars"
      />

      {/* Jupiter */}
      <Planet 
        position={PLANET_POS[SECTIONS.JUPITER]} 
        radius={5} 
        color="#ffffff"
        textureUrl="/textures/jupiter.jpg"
        name="Jupiter"
      />

      {/* Saturn */}
      <group position={PLANET_POS[SECTIONS.SATURN]}>
        <Planet 
          position={[0,0,0]}
          radius={4.2} 
          color="#ffffff"
          textureUrl="/textures/saturn.jpg"
          name="Saturn"
        />
      </group>

      {/* Uranus */}
      <Planet 
        position={PLANET_POS[SECTIONS.URANUS]} 
        radius={3} 
        color="#ffffff"
        textureUrl="/textures/uranus.jpg"
        name="Uranus"
      />

      {/* Neptune */}
      <Planet 
        position={PLANET_POS[SECTIONS.NEPTUNE]} 
        radius={2.8} 
        color="#ffffff"
        textureUrl="/textures/neptune.jpg"
        name="Neptune"
      />
    </group>
  );
}
