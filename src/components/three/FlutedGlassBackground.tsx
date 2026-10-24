"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Site-wide background: two soft lights drifting behind a pane of reeded glass.
// One full-screen fragment shader, so the cost is per pixel, not per object.

const VERTEX = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec2  uRes;      // drawing buffer size, device px
uniform vec2  uPointer;  // 0..1, y up
uniform float uScroll;   // page progress 0..1
uniform float uDpr;

const vec3 BG     = vec3(0.031, 0.063, 0.118); // #08101E
const vec3 CYAN   = vec3(0.220, 0.741, 0.973); // #38BDF8
const vec3 GLOW   = vec3(0.729, 0.902, 0.992); // #BAE6FD
const vec3 VIOLET = vec3(0.486, 0.227, 0.929); // #7C3AED

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// The lights behind the glass, in square-ish screen units
vec3 scene(vec2 p, vec2 m) {
  float t = uTime * 0.16;
  vec2 a = vec2(sin(t * 1.1) * 0.38, cos(t * 0.8) * 0.28 + 0.18);
  vec2 b = vec2(cos(t * 0.9 + 2.0) * 0.42, sin(t * 0.7 + 1.0) * 0.3 - 0.22);
  vec3 c = BG;
  c += CYAN * exp(-dot(p - a, p - a) * 5.5) * 0.38;
  c += VIOLET * exp(-dot(p - b, p - b) * 4.5) * 0.32;
  c += GLOW * exp(-dot(p - m, p - m) * 10.0) * 0.16;
  return c;
}

void main() {
  float s = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / s;
  vec2 m = (uPointer - 0.5) * uRes / s;
  bool portrait = uRes.y > uRes.x;

  float ribPx = (portrait ? 26.0 : 38.0) * uDpr;
  float k = fract(gl_FragCoord.x / ribPx) * 2.0 - 1.0; // -1..1 across one rib

  // Each rib acts like a small cylinder lens: the scene is squeezed and
  // mirrored inside it, with a slight chromatic split
  vec2 shift = vec2(-k * (ribPx / s) * 1.3, uScroll * 0.5);
  vec3 col;
  col.r = scene(uv + shift * 1.06, m).r;
  col.g = scene(uv + shift, m).g;
  col.b = scene(uv + shift * 0.94, m).b;

  // Rib shading: soft highlight on one shoulder, a hairline groove between ribs
  col += GLOW * 0.025 * smoothstep(0.2, -0.8, k);
  col *= 1.0 - 0.35 * smoothstep(0.82, 1.0, abs(k));

  col = mix(BG, col, 0.7 + 0.3 * smoothstep(1.7, 0.3, length(uv)));
  // Dither against banding in the dark gradients
  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.0) - 0.5) * (3.0 / 255.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

const IDLE_MS = 2500;

type Input = {
  pointer: THREE.Vector2; // target, 0..1 with y up
  lastMove: number;
  scroll: number;
  smoothScroll: number;
  reduced: boolean;
};

type Uniforms = {
  uTime: { value: number };
  uRes: { value: THREE.Vector2 };
  uPointer: { value: THREE.Vector2 };
  uScroll: { value: number };
  uDpr: { value: number };
};

const Glass = () => {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo<Uniforms>(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.55) },
      uScroll: { value: 0 },
      uDpr: { value: 1 },
    }),
    [],
  );
  const input = useRef<Input>({
    pointer: new THREE.Vector2(0.5, 0.55),
    lastMove: 0,
    scroll: 0,
    smoothScroll: 0,
    reduced: false,
  });

  useEffect(() => {
    const i = input.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    i.reduced = motion.matches;

    const onMove = (e: PointerEvent) => {
      i.pointer.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      i.lastMove = performance.now();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      i.scroll = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const onMotion = () => {
      i.reduced = motion.matches;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", onMotion);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  useFrame((state, delta) => {
    if (!material.current) return;
    const u = material.current.uniforms as Uniforms;
    const i = input.current;

    u.uTime.value += i.reduced ? 0 : Math.min(delta, 0.05);
    state.gl.getDrawingBufferSize(u.uRes.value);
    u.uDpr.value = state.viewport.dpr;

    // Phones have no hover, so when nobody is touching the soft glow wanders
    // on its own and the glass never looks parked.
    const idle = performance.now() - i.lastMove > IDLE_MS;
    if (idle && !i.reduced) {
      const t = u.uTime.value * 0.18;
      i.pointer.set(0.5 + Math.sin(t * 1.3) * 0.28, 0.55 + Math.sin(t * 0.9 + 1.2) * 0.22);
    }
    u.uPointer.value.lerp(i.pointer, idle ? 0.02 : 0.08);

    i.smoothScroll += (i.scroll - i.smoothScroll) * 0.08;
    u.uScroll.value = i.smoothScroll;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const FlutedGlassBackground = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Soft image, so it doesn't need full retina resolution
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.25);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-bg-primary" aria-hidden>
      <Canvas
        dpr={dpr}
        orthographic
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <Glass />
      </Canvas>
    </div>
  );
};

export default FlutedGlassBackground;
