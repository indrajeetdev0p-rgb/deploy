import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  { id: 1, title: 'Project Alpha', position: [4, 2, 0] },
  { id: 2, title: 'Nebula Core', position: [-4, 3, -2] },
  { id: 3, title: 'Void Engine', position: [2, -3, 3] },
  { id: 4, title: 'Starlink V2', position: [-3, -2, -4] },
];

export default function ProjectCubes({ position }) {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group position={position} ref={group}>
      {projects.map((proj) => (
        <ProjectCube key={proj.id} {...proj} />
      ))}
    </group>
  );
}

function ProjectCube({ position, title }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      if (hovered) {
         meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
         meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <Box 
        ref={meshRef}
        args={[2, 2, 2]} 
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <meshPhysicalMaterial 
          color="#4E8BFF"
          emissive="#4E8BFF"
          emissiveIntensity={hovered ? 0.8 : 0.2}
          transparent
          opacity={0.5}
          roughness={0}
          transmission={1} 
          thickness={0.5}
          wireframe={hovered}
        />
      </Box>
      {hovered && (
        <Html center position={[0, 0, 0]} className="ui-interactive">
          <div className="glass-panel" style={{ padding: '15px', textAlign: 'center', width: '200px', pointerEvents: 'auto' }}>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>{title}</h4>
            <button className="btn" style={{ padding: '5px 10px', fontSize: '12px' }}>View Detail</button>
          </div>
        </Html>
      )}
    </group>
  );
}
