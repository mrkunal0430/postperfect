"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { scatter } from "../lab/shapes";
import { LOGO_WIDTH, type LogoCloud } from "./logoCloud";

export type FlyTarget = Element | DOMRect;

type Props = {
  logo: LogoCloud;
  /** The navbar logo to fly into (or a fixed rect if it isn't on the page); null while loading. */
  flyTo: FlyTarget | null;
  /** 0 → 1: how much of the logo (left to right) the particles have rebuilt. */
  onReveal: (amount: number) => void;
  onLanded: () => void;
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
    // Solid dot with a thin soft edge, so it shows the full logo colour.
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.3, d));
  }
`;

// Arrival: each particle glides in over ARRIVE seconds after a random delay.
const ARRIVE = 1.6;
const ARRIVE_SPREAD = 0.5;

// Flight timing (seconds). Particles leave left → right across SPREAD, each
// with a little JITTER, and take TRAVEL to arrive; FADE after landing.
const SHATTER = 0.45;
const SPREAD = 0.9;
const JITTER = 0.35;
const TRAVEL = 1.05;
const FADE = 0.2;
// Point size on landing: about a 1px dot, so landed particles are no thicker
// than the logo's own strokes (bigger dots made the letters look bolder).
const LANDED_SIZE = 0.4;
const TOTAL = SHATTER + SPREAD + JITTER + TRAVEL + FADE;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (x: number) => 1 - Math.pow(1 - x, 4);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

// Owns the buffers and advances them each frame, outside React's tracking.
class IntroSim {
  readonly geometry = new THREE.BufferGeometry();
  readonly material: THREE.ShaderMaterial;
  private readonly home: Float32Array;
  private readonly start: Float32Array;
  private readonly arriveDelay: Float32Array;
  private readonly burstDir: Float32Array;
  private readonly baseSize: Float32Array;
  private readonly delay: Float32Array;
  private readonly from: Float32Array;
  private flyTo: FlyTarget | null = null;
  private flyStart: number | null = null;
  reveal = 0;
  landed = false;

  constructor(logo: LogoCloud) {
    const count = logo.pos.length / 3;
    this.home = logo.pos;
    this.start = scatter(count, 22);
    this.arriveDelay = new Float32Array(count);
    for (let i = 0; i < count; i++) this.arriveDelay[i] = Math.random() * ARRIVE_SPREAD;
    this.from = new Float32Array(count * 3);
    this.burstDir = scatter(count, 1);
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.start.slice(), 3));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(logo.col, 3));

    this.baseSize = new Float32Array(count);
    this.delay = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      this.baseSize[i] = Math.random() < 0.03 ? 2.4 : 0.6 + Math.random();
      // Leave in reading order so the logo rebuilds left → right.
      const u = clamp01(logo.pos[i * 3] / LOGO_WIDTH + 0.5);
      this.delay[i] = SHATTER + u * SPREAD + Math.random() * JITTER;
    }
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(this.baseSize.slice(), 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uScale: { value: 30 * Math.min(window.devicePixelRatio, 1.75) } },
      transparent: true,
      depthWrite: false,
      // Normal blending: overlapping particles keep the logo colour instead of washing out to white.
      blending: THREE.NormalBlending,
    });
  }

  setFlyTo(target: FlyTarget | null) {
    this.flyTo = target;
  }

  step(state: RootState) {
    const t = state.clock.elapsedTime;
    const { width: vw, height: vh } = state.viewport;
    const pos = this.geometry.attributes.position.array as Float32Array;

    // Resting place while loading: centred, as wide as the screen allows.
    const hx = 0;
    const hy = vh * 0.04;
    const hs = Math.min(1, (vw * 0.78) / LOGO_WIDTH);

    if (this.flyTo) {
      if (this.flyStart === null) {
        this.flyStart = t;
        this.from.set(pos);
      }
      this.fly(state, t - this.flyStart, pos);
    } else {
      this.arrive(t, pos, hx, hy, hs);
    }
    this.geometry.attributes.position.needsUpdate = true;
  }

  // Glide each particle once from its start point into the centred logo, then hold still.
  private arrive(t: number, pos: Float32Array, x: number, y: number, s: number) {
    const { home, start, arriveDelay } = this;
    for (let i = 0, i3 = 0; i < arriveDelay.length; i++, i3 += 3) {
      const k = easeOut(clamp01((t - arriveDelay[i]) / ARRIVE));
      pos[i3] = start[i3] + (home[i3] * s + x - start[i3]) * k;
      pos[i3 + 1] = start[i3 + 1] + (home[i3 + 1] * s + y - start[i3 + 1]) * k;
      pos[i3 + 2] = start[i3 + 2] + (home[i3 + 2] * s - start[i3 + 2]) * k;
    }
  }

  // Shatter into a cloud, then stream each particle along an arc into the
  // navbar logo; landed particles fade out as the real logo takes their place.
  private fly(state: RootState, e: number, pos: Float32Array) {
    // Re-measure every frame so the particles land exactly where the logo is now,
    // relative to the canvas's own position on screen.
    const target = this.flyTo as FlyTarget;
    const r = target instanceof Element ? target.getBoundingClientRect() : target;
    const { size } = state;
    const pxToWorld = state.viewport.height / size.height;
    const dx = (r.left + r.width / 2 - (size.left + size.width / 2)) * pxToWorld;
    const dy = -(r.top + r.height / 2 - (size.top + size.height / 2)) * pxToWorld;
    const ds = (r.width * pxToWorld) / LOGO_WIDTH;

    const shatter = easeInOut(clamp01(e / SHATTER)) * 1.1;
    const sizes = this.geometry.attributes.aSize.array as Float32Array;
    const { home, from, burstDir, delay, baseSize } = this;

    for (let i = 0, i3 = 0; i < delay.length; i++, i3 += 3) {
      const p = clamp01((e - delay[i]) / TRAVEL);
      const k = easeInOut(p);
      const swirl = Math.sin(p * Math.PI) * 2.4;
      const cloud = shatter * (1 - k);
      pos[i3] = from[i3] + (home[i3] * ds + dx - from[i3]) * k + burstDir[i3] * (cloud + swirl);
      pos[i3 + 1] = from[i3 + 1] + (home[i3 + 1] * ds + dy - from[i3 + 1]) * k + burstDir[i3 + 1] * (cloud + swirl);
      pos[i3 + 2] = from[i3 + 2] * (1 - k) + burstDir[i3 + 2] * (cloud + swirl);

      const fade = 1 - clamp01((e - delay[i] - TRAVEL) / FADE);
      sizes[i] = (baseSize[i] + (LANDED_SIZE - baseSize[i]) * k) * fade;
    }
    this.geometry.attributes.aSize.needsUpdate = true;

    // The leading edge of landed particles, as a fraction of the logo width.
    this.reveal = clamp01((e - SHATTER - TRAVEL - JITTER * 0.5) / SPREAD);
    if (e >= TOTAL) this.landed = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

const Particles = ({ logo, flyTo, onReveal, onLanded }: Props) => {
  const [sim] = useState(() => new IntroSim(logo));
  const notified = useRef(false);

  useEffect(() => {
    sim.setFlyTo(flyTo);
  }, [sim, flyTo]);

  useEffect(() => () => sim.dispose(), [sim]);

  useFrame((state) => {
    sim.step(state);
    if (flyTo) onReveal(sim.reveal);
    if (sim.landed && !notified.current) {
      notified.current = true;
      onLanded();
    }
  });

  return <points geometry={sim.geometry} material={sim.material} frustumCulled={false} />;
};

const IntroParticles = (props: Props) => (
  <Canvas
    camera={{ position: [0, 0, 12], fov: 50 }}
    dpr={[1, 1.75]}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
  >
    <Particles {...props} />
  </Canvas>
);

export default IntroParticles;
