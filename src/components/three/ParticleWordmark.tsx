"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { scatter, wordmarkCloud } from "../lab/shapes";

// Footer version of the lab hero's particle wordmark: assembles when scrolled
// into view and scatters away from the cursor. It sits behind other content, so
// the pointer is tracked on the parent element rather than the canvas.

type Pointer = { x: number; y: number; inside: boolean };

const vertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * 0.85);
  }
`;

const WORD_W = 18.4; // wordmark width in world units at scale 1
const WORD_H = 3; // glyph height, roughly
const REF_PX_PER_UNIT = 80; // the hero's pixel density the point sizes were tuned for

class WordmarkSim {
  readonly geometry = new THREE.BufferGeometry();
  readonly material: THREE.ShaderMaterial;
  private readonly count: number;
  private readonly velocity: Float32Array;
  private readonly reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  private readonly dpr = Math.min(window.devicePixelRatio, 1.75);

  constructor(private readonly target: Float32Array) {
    const count = target.length / 3;
    this.count = count;

    const start = this.reduced ? target.slice() : scatter(count, 14);
    this.geometry.setAttribute("position", new THREE.BufferAttribute(start, 3));

    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const cyan = new THREE.Color("#22D3EE");
    const blue = new THREE.Color("#3B82F6");
    const white = new THREE.Color("#F0FDFF");
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const sparkle = Math.random() < 0.03;
      sizes[i] = sparkle ? 2.6 + Math.random() * 1.6 : 0.6 + Math.random() * 1.1;
      const r = Math.random();
      c.copy(r < 0.6 ? cyan : r < 0.78 ? blue : white).lerp(white, Math.random() * 0.25);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    this.velocity = new Float32Array(count * 3);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uScale: { value: 34 * this.dpr } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  step(state: RootState, pointer: Pointer) {
    const { target, count, velocity, reduced } = this;
    const { width: vw, height: vh } = state.viewport;
    const sc = Math.min((vw * 0.9) / WORD_W, (vh * 0.85) / WORD_H);

    // Keep particles the same size relative to the letters at any canvas size.
    const pxPerUnit = state.size.height / vh;
    this.material.uniforms.uScale.value = 34 * this.dpr * ((pxPerUnit * sc) / REF_PX_PER_UNIT);

    const mx = (pointer.x * vw) / 2;
    const my = (pointer.y * vh) / 2;
    const useMouse = pointer.inside && !reduced;
    const R = 1.25 * sc;

    const pos = this.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tx = target[i3] * sc;
      const ty = target[i3 + 1] * sc;
      const tz = target[i3 + 2] * sc;

      let vx = velocity[i3] + (tx - pos[i3]) * 0.05;
      let vy = velocity[i3 + 1] + (ty - pos[i3 + 1]) * 0.05;
      const vz = velocity[i3 + 2] + (tz - pos[i3 + 2]) * 0.05;

      if (useMouse) {
        const dx = pos[i3] - mx;
        const dy = pos[i3 + 1] - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 1e-4) {
          const d = Math.sqrt(d2);
          const force = (1 - d / R) * 0.12 * sc;
          vx += (dx / d) * force;
          vy += (dy / d) * force;
        }
      }

      velocity[i3] = vx * 0.84;
      velocity[i3 + 1] = vy * 0.84;
      velocity[i3 + 2] = vz * 0.84;
      pos[i3] += velocity[i3];
      pos[i3 + 1] += velocity[i3 + 1];
      pos[i3 + 2] += velocity[i3 + 2];
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

const Particles = ({ target, pointerRef }: { target: Float32Array; pointerRef: RefObject<Pointer> }) => {
  const [sim] = useState(() => new WordmarkSim(target));

  useEffect(() => () => sim.dispose(), [sim]);

  useFrame((state) => sim.step(state, pointerRef.current));

  return <points geometry={sim.geometry} material={sim.material} frustumCulled={false} />;
};

const ParticleWordmark = ({ className = "" }: { className?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, inside: false });
  const [target, setTarget] = useState<Float32Array | null>(null);
  const [onScreen, setOnScreen] = useState(false);

  // Build the point cloud the first time the footer nears the viewport, so the
  // fly-in plays when it's actually seen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: "0px 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hovering anything in the parent (links, buttons) still moves the particles.
  useEffect(() => {
    const el = wrapRef.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const p = pointerRef.current;
      p.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      p.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      p.inside = true;
    };
    const leave = () => (pointerRef.current.inside = false);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    if (!onScreen || target) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const family =
        getComputedStyle(document.documentElement).getPropertyValue("--font-space-grotesk").trim() ||
        "Arial, sans-serif";
      const count = window.matchMedia("(max-width: 768px)").matches ? 6000 : 18000;
      setTarget(wordmarkCloud(count, family));
    });
    return () => {
      cancelled = true;
    };
  }, [onScreen, target]);

  return (
    <div ref={wrapRef} aria-hidden className={`pointer-events-none ${className}`}>
      {target && (
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          dpr={[1, 1.75]}
          frameloop={onScreen ? "always" : "never"}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <Particles target={target} pointerRef={pointerRef} />
        </Canvas>
      )}
    </div>
  );
};

export default ParticleWordmark;
