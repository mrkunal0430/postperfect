import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import FloatingParticles from './FloatingParticles';

const MorphingSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#7C3AED"
          emissive="#4C1D95"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#A78BFA" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#C084FC" />
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#F59E0B" />
      <MorphingSphere />
      <FloatingParticles count={150} color="#A78BFA" spread={12} />
    </>
  );
};

export default HeroScene;
