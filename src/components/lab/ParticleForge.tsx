"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useEffect, useState, type RefObject } from "react";
import * as THREE from "three";
import { SPHERE_INDEX, scatter } from "./shapes";

type Props = {
  shapes: Float32Array[];
  progressRef: RefObject<number>;
};

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

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Where each stage sits on screen and how big it is, in world units.
function layout(stage: number, vw: number, vh: number) {
  const wide = vw / vh > 1.1;
  if (stage === 0) return { x: 0, y: wide ? 0.4 : 0.8, s: Math.min(1, (vw * 0.9) / 18.5) };
  if (stage === SPHERE_INDEX) return { x: 0, y: wide ? 0.6 : 1.2, s: Math.min(1, (vh * 0.5) / 6.8, (vw * 0.8) / 6.8) };
  return wide
    ? { x: vw * 0.2, y: 0, s: Math.min(1, (vh * 0.6) / 7.5, (vw * 0.45) / 9) }
    : { x: 0, y: vh * 0.17, s: Math.min(1, (vw * 0.85) / 9.2, (vh * 0.42) / 7.5) };
}

// Owns the particle buffers and advances them each frame. Kept outside React
// so the per-frame mutation doesn't fight the compiler's immutability rules.
class ParticleSim {
  readonly geometry = new THREE.BufferGeometry();
  readonly material: THREE.ShaderMaterial;
  private readonly count: number;
  private readonly velocity: Float32Array;
  private readonly burstDir: Float32Array;
  private readonly phase: Float32Array;
  private readonly reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  private smooth = 0;
  pointerActive = false;

  constructor(private readonly shapes: Float32Array[]) {
    const count = shapes[0].length / 3;
    this.count = count;

    // Start scattered far out so the intro is a fly-in to the wordmark.
    const start = this.reduced ? shapes[0].slice() : scatter(count, 18);
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
    this.burstDir = scatter(count, 1);
    this.phase = new Float32Array(count);
    for (let i = 0; i < count; i++) this.phase[i] = Math.random() * Math.PI * 2;

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uScale: { value: 34 * Math.min(window.devicePixelRatio, 1.75) } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  step(state: RootState, progress: number) {
    const { shapes, count, velocity, burstDir, phase, reduced } = this;
    this.smooth += (progress - this.smooth) * 0.08;
    const last = shapes.length - 1;
    const sf = this.smooth * last;
    const a = Math.min(Math.floor(sf), last - 1);
    const f = sf - a;
    const e = reduced ? Math.round(f) : smoothstep(0.2, 0.8, f);
    const burst = reduced ? 0 : Math.sin(e * Math.PI) * 2.4;

    const { width: vw, height: vh } = state.viewport;
    const la = layout(a, vw, vh);
    const lb = layout(a + 1, vw, vh);
    const ox = la.x + (lb.x - la.x) * e;
    const oy = la.y + (lb.y - la.y) * e;
    const sc = la.s + (lb.s - la.s) * e;

    const t = state.clock.elapsedTime;
    const cr = Math.cos(t * 0.25);
    const sr = Math.sin(t * 0.25);
    const A = shapes[a];
    const B = shapes[a + 1];
    const rotA = a === SPHERE_INDEX;
    const rotB = a + 1 === SPHERE_INDEX;

    const mx = (state.pointer.x * vw) / 2;
    const my = (state.pointer.y * vh) / 2;
    const useMouse = this.pointerActive && !reduced;
    const R = 1.3;

    const pos = this.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let ax = A[i3], az = A[i3 + 2];
      let bx = B[i3], bz = B[i3 + 2];
      if (rotA) [ax, az] = [ax * cr - az * sr, ax * sr + az * cr];
      if (rotB) [bx, bz] = [bx * cr - bz * sr, bx * sr + bz * cr];
      const ay = A[i3 + 1];
      const by = B[i3 + 1];

      const tx = (ax + (bx - ax) * e) * sc + ox + burstDir[i3] * burst;
      const ty = (ay + (by - ay) * e) * sc + oy + burstDir[i3 + 1] * burst;
      const tz = (az + (bz - az) * e) * sc + burstDir[i3 + 2] * burst + Math.sin(t * 0.8 + phase[i]) * 0.06;

      let vx = velocity[i3] + (tx - pos[i3]) * 0.05;
      let vy = velocity[i3 + 1] + (ty - pos[i3 + 1]) * 0.05;
      const vz = velocity[i3 + 2] + (tz - pos[i3 + 2]) * 0.05;

      if (useMouse) {
        const dx = pos[i3] - mx;
        const dy = pos[i3 + 1] - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R && d2 > 1e-4) {
          const d = Math.sqrt(d2);
          const force = (1 - d / R) * 0.12;
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

    const cam = state.camera;
    cam.position.x += (state.pointer.x * 0.8 - cam.position.x) * 0.03;
    cam.position.y += (state.pointer.y * 0.5 - cam.position.y) * 0.03;
    cam.lookAt(0, 0, 0);
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

const Particles = ({ shapes, progressRef }: Props) => {
  const [sim] = useState(() => new ParticleSim(shapes));

  useEffect(() => {
    const on = () => sim.pointerActive = true;
    const off = () => sim.pointerActive = false;
    window.addEventListener("pointermove", on);
    document.addEventListener("pointerleave", off);
    return () => {
      window.removeEventListener("pointermove", on);
      document.removeEventListener("pointerleave", off);
      sim.dispose();
    };
  }, [sim]);

  useFrame((state) => sim.step(state, progressRef.current ?? 0));

  return <points geometry={sim.geometry} material={sim.material} frustumCulled={false} />;
};

const ParticleForge = ({ active = true, ...props }: Props & { active?: boolean }) => (
  <Canvas
    camera={{ position: [0, 0, 12], fov: 50 }}
    dpr={[1, 1.75]}
    frameloop={active ? "always" : "never"}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
  >
    <Particles {...props} />
  </Canvas>
);

export default ParticleForge;
