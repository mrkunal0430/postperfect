import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// ─── Desktop Wave Grid (high detail) ─────────────────────────────────────────
const WaveGrid = ({ scrollRef }) => {
  const meshRef = useRef();

  const { geometry, originalXZ } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 110, 52, 64);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const xz = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      xz[i * 2] = pos.getX(i);
      xz[i * 2 + 1] = pos.getZ(i);
    }
    return { geometry: geo, originalXZ: xz };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = originalXZ[i * 2];
      const z = originalXZ[i * 2 + 1];
      positions.setY(
        i,
        Math.sin(x * 0.22 + t * 0.5) * 1.6 +
          Math.sin(z * 0.18 - t * 0.38) * 1.3 +
          Math.sin((x + z) * 0.14 + t * 0.28) * 0.9,
      );
    }
    positions.needsUpdate = true;
    if (meshRef.current) meshRef.current.position.z = scrollRef.current * 32;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#38BDF8"
        wireframe
        transparent
        opacity={0.1}
        depthWrite={false}
      />
    </mesh>
  );
};

// ─── Mobile Wave Grid — tuned for portrait, more dramatic ────────────────────
const MobileWaveGrid = ({ scrollRef }) => {
  const meshRef = useRef();

  const { geometry, originalXZ } = useMemo(() => {
    // Wider than tall to fill portrait horizontal extent; 30×38 is still mobile-safe
    const geo = new THREE.PlaneGeometry(80, 100, 30, 38);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const xz = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      xz[i * 2] = pos.getX(i);
      xz[i * 2 + 1] = pos.getZ(i);
    }
    return { geometry: geo, originalXZ: xz };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = originalXZ[i * 2];
      const z = originalXZ[i * 2 + 1];
      // Slightly bigger amplitude + two waves for better visual on small screens
      positions.setY(
        i,
        Math.sin(x * 0.2 + t * 0.48) * 1.9 +
          Math.sin(z * 0.16 - t * 0.36) * 1.4,
      );
    }
    positions.needsUpdate = true;
    if (meshRef.current) meshRef.current.position.z = scrollRef.current * 28;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      {/* Higher opacity on mobile — screens are smaller and brighter */}
      <meshBasicMaterial
        color="#38BDF8"
        wireframe
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </mesh>
  );
};

// ─── Mobile violet depth plane — cheap (10×14 segments) ─────────────────────
const MobileBackPlane = ({ scrollRef }) => {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 110, 10, 14);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -1.2, -20);
    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) meshRef.current.position.z = scrollRef.current * 28;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#7C3AED"
        wireframe
        transparent
        opacity={0.06}
        depthWrite={false}
      />
    </mesh>
  );
};

// ─── Secondary dim grid (desktop only) ───────────────────────────────────────
const BackGrid = ({ scrollRef }) => {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(110, 140, 30, 36);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, -1.5, -30);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.z = scrollRef.current * 32;
      meshRef.current.rotation.y = clock.elapsedTime * 0.008;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        color="#7C3AED"
        wireframe
        transparent
        opacity={0.04}
        depthWrite={false}
      />
    </mesh>
  );
};

// ─── Star field — shared, count + spread differ per mode ─────────────────────
const StarField = ({ scrollRef, count = 220, spread = [90, 22, 110] }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread[0];
      arr[i * 3 + 1] = Math.random() * spread[1] + 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
    }
    return arr;
  }, [count, spread]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.012;
      pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.6;
      pointsRef.current.position.z =
        scrollRef.current * (spread[2] > 80 ? 32 : 28);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#BAE6FD"
        size={0.09}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// ─── Accent orbs (desktop only) ───────────────────────────────────────────────
const AccentOrbs = () => {
  const groupRef = useRef();

  const orbs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        x: (Math.random() - 0.5) * 50,
        y: Math.random() * 8 + 2,
        z: (Math.random() - 0.5) * 60,
        scale: Math.random() * 0.18 + 0.08,
        color: i % 2 === 0 ? "#38BDF8" : "#A78BFA",
        speed: Math.random() * 0.5 + 0.3,
        offset: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((orb, i) => {
      orb.position.y =
        orbs[i].y +
        Math.sin(clock.elapsedTime * orbs[i].speed + orbs[i].offset) * 0.8;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, o.z]} scale={o.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={o.color} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
};

// ─── Desktop camera path ──────────────────────────────────────────────────────
const ScrollCamera = ({ scrollRef }) => {
  useFrame(({ camera }) => {
    const s = scrollRef.current;
    camera.position.y += (11 - s * 5.5 - camera.position.y) * 0.04;
    camera.position.z += (13 - s * 22 - camera.position.z) * 0.04;
    camera.position.x += (s * 2 - camera.position.x) * 0.02;
    camera.lookAt(0, 0, -22 - s * 12);
  });
  return null;
};

// ─── Mobile camera path — starts low & close, fills portrait beautifully ─────
const MobileScrollCamera = ({ scrollRef }) => {
  useFrame(({ camera }) => {
    const s = scrollRef.current;
    // Start closer to wave surface (y=7 vs desktop y=11), less Z travel
    camera.position.y += (7 - s * 3.5 - camera.position.y) * 0.045;
    camera.position.z += (10 - s * 16 - camera.position.z) * 0.045;
    // No horizontal sway on mobile — portrait is narrow, sway feels nauseating
    camera.position.x += (0 - camera.position.x) * 0.03;
    camera.lookAt(0, 0, -14 - s * 10);
  });
  return null;
};

// ─── Main export ──────────────────────────────────────────────────────────────
const BackgroundScene = () => {
  const scrollRef = useRef(0);
  const bannerRef = useRef();
  const lineRef = useRef();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const s = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      scrollRef.current = s;

      // Sync reveal with camera journey end — start at 65%, full by 93%
      const op = Math.max(0, Math.min(1, (s - 0.65) / 0.28));
      // Scale from 0.62 → 1.0: logo physically "flies toward" the viewer
      const scale = 0.62 + op * 0.38;
      // Slight upward drift as it arrives
      const ty = (1 - op) * 22;

      if (bannerRef.current) {
        bannerRef.current.style.opacity = op;
        bannerRef.current.style.transform = `translate(-50%, calc(-50% + ${ty}px)) scale(${scale})`;
      }
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${op})`;
      }
    };

    const onResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      {/* ── 3D Canvas ──────────────────────────────────────────────────────── */}
      <Canvas
        camera={{
          position: isMobile ? [0, 7, 10] : [0, 11, 13],
          fov: isMobile ? 70 : 55,
        }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          precision: isMobile ? "lowp" : "highp",
        }}
        style={{ background: "transparent" }}
      >
        <fog
          attach="fog"
          args={["#08101E", isMobile ? 15 : 25, isMobile ? 65 : 100]}
        />

        {isMobile ? (
          // ── Mobile: portrait-tuned, layered scene ────────────────────────
          <>
            <MobileBackPlane scrollRef={scrollRef} />
            <MobileWaveGrid scrollRef={scrollRef} />
            <StarField
              scrollRef={scrollRef}
              count={120}
              spread={[55, 14, 70]} // tighter spread — more visible stars on small screen
            />
            <MobileScrollCamera scrollRef={scrollRef} />
          </>
        ) : (
          // ── Desktop: full scene ───────────────────────────────────────────
          <>
            <WaveGrid scrollRef={scrollRef} />
            <BackGrid scrollRef={scrollRef} />
            <StarField
              scrollRef={scrollRef}
              count={220}
              spread={[90, 22, 110]}
            />
            <AccentOrbs />
            <ScrollCamera scrollRef={scrollRef} />
          </>
        )}
      </Canvas>

      {/* ── Brand seal — appears at end of scroll ──────────────────────────── */}
      <div
        ref={bannerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          // Initial state: shifted down 22px, scaled to 0.62 — matches script start values
          transform: "translate(-50%, calc(-50% + 22px)) scale(0.62)",
          transformOrigin: "center center",
          opacity: 0,
          textAlign: "center",
          userSelect: "none",
          willChange: "opacity, transform",
          padding: "0 16px",
          width: "100%",
          maxWidth: isMobile ? "280px" : "340px",
        }}
      >
        <img
          src="/Postperfect_Logo.png"
          alt=""
          style={{
            height: isMobile ? "48px" : "68px",
            width: "auto",
            display: "block",
            margin: "0 auto",
            filter:
              "drop-shadow(0 0 28px rgba(56,189,248,0.65))" +
              " drop-shadow(0 0 6px rgba(56,189,248,0.9))" +
              " brightness(1.15)",
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundScene;
