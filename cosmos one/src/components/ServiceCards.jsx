import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const services = [
  { title: 'AI', color: '#4E8BFF' },
  { title: 'Robotics', color: '#9D5BFF' },
  { title: 'Cloud', color: '#00E7FF' },
  { title: 'Automation', color: '#FF4E8B' },
  { title: 'Cybersecurity', color: '#4EFF8B' },
  { title: 'XR', color: '#FFD700' }
];

export default function ServiceCards({ position }) {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={position} ref={group}>
      {services.map((service, i) => {
        const angle = (i / services.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <ServiceCard 
            key={i} 
            position={[x, 0, z]} 
            rotation={[0, angle, 0]}
            title={service.title} 
            color={service.color}
          />
        );
      })}
    </group>
  );
}

function ServiceCard({ position, rotation, title, color }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={meshRef}>
      <RoundedBox 
        args={[2, 3, 0.2]} 
        radius={0.1} 
        smoothness={4}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <meshPhysicalMaterial 
          color="#04060D"
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
          transparent
          opacity={0.8}
          roughness={0.2}
          transmission={0.9} // Glass-like
          thickness={0.5}
        />
      </RoundedBox>
      <Text 
        position={[0, 0, 0.15]} 
        fontSize={0.4} 
        color="#ffffff" 
        font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8pnHXFAA7sjZ19.woff2"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}
