import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet({ 
  position = [0, 0, 0], 
  radius = 1, 
  textureUrl, 
  color = '#ffffff', 
  emissive = '#000000',
  emissiveIntensity = 0,
  rotationSpeed = 0.005,
  onClick,
  isHoverable = false,
  name
}) {
  const meshRef = useRef();
  
  // Conditionally load texture if provided, otherwise it will just use color
  const texture = textureUrl ? useTexture(textureUrl) : null;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[radius, 64, 64]}
        onClick={onClick}
        onPointerOver={(e) => {
          if (isHoverable) {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            if (meshRef.current.material) {
               // Simple hover glow effect (could be enhanced)
               meshRef.current.material.emissiveIntensity = emissiveIntensity + 0.5;
            }
          }
        }}
        onPointerOut={(e) => {
          if (isHoverable) {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
            if (meshRef.current.material) {
               meshRef.current.material.emissiveIntensity = emissiveIntensity;
            }
          }
        }}
      >
        <meshStandardMaterial
          map={texture}
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.6}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Optional atmosphere glow for larger planets, excluding the Sun */}
      {radius > 2 && name !== 'Sun' && (
        <Sphere args={[radius * 1.05, 32, 32]}>
          <meshBasicMaterial 
            color={color !== '#ffffff' ? color : '#4E8BFF'} 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      )}
    </group>
  );
}
