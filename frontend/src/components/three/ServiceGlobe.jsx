import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingParticles from './FloatingParticles';

const WireframeGlobe = () => {
  const globeRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!globeRef.current) return;
    const time = state.clock.getElapsedTime();
    globeRef.current.rotation.y = time * 0.15;
    globeRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;

    if (glowRef.current) {
      glowRef.current.rotation.y = -time * 0.1;
    }
  });

  return (
    <>
      {/* Main wireframe globe */}
      <mesh ref={globeRef} scale={2.5}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={glowRef} scale={2.3}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.8}>
        <torusGeometry args={[1, 0.005, 8, 64]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} />
      </mesh>

      {/* Second ring at angle */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} scale={3}>
        <torusGeometry args={[1, 0.003, 8, 64]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.15} />
      </mesh>
    </>
  );
};

const ServiceGlobe = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#7C3AED" />
      <WireframeGlobe />
      <FloatingParticles count={100} color="#C084FC" spread={10} />
    </>
  );
};

export default ServiceGlobe;
