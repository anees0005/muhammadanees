import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Floating geometric shapes */}
      <mesh position={[2, 1, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>
      
      <mesh position={[-2, -1, 1]}>
        <octahedronGeometry args={[0.3]} />
        <meshBasicMaterial color="#00ff88" wireframe />
      </mesh>
      
      <mesh position={[0, 2, -1]}>
        <tetrahedronGeometry args={[0.4]} />
        <meshBasicMaterial color="#ff0080" wireframe />
      </mesh>
      
      <mesh position={[-1, -2, 0]}>
        <dodecahedronGeometry args={[0.3]} />
        <meshBasicMaterial color="#00ffff" wireframe />
      </mesh>
    </group>
  );
}
