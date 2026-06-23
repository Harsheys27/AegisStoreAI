import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

function AICore() {
  const ref = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25;
    ref.current.rotation.x = t * 0.12;
    const p = 1 + Math.sin(t * 1.5) * 0.06;
    inner.current.scale.setScalar(p);
  });
  return (
    <group>
      <Icosahedron ref={ref} args={[1.1, 1]}>
        <meshBasicMaterial wireframe color="#00E5FF" transparent opacity={0.9} />
      </Icosahedron>
      <Sphere ref={inner} args={[0.6, 32, 32]}>
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.35} />
      </Sphere>
      <pointLight color="#00E5FF" intensity={2} distance={6} />
    </group>
  );
}

function OrbitNode({ angle, radius, color, label }: { angle: number; radius: number; color: string; label: string }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.15 + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.2;
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={0.6}>
        <mesh>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00E5FF" size={0.025} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 hud-grid opacity-30" />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0.6, 5], fov: 55 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <AICore />
          <OrbitNode angle={0} radius={2.4} color="#00E5FF" label="Flywheel" />
          <OrbitNode angle={Math.PI / 2} radius={2.4} color="#2D6BFF" label="Battery" />
          <OrbitNode angle={Math.PI} radius={2.4} color="#7C3AED" label="Hydrogen" />
          <OrbitNode angle={(3 * Math.PI) / 2} radius={2.4} color="#FF7A1A" label="Biomass" />
          <Particles />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-6"
        >
          Reinforcement-Learning Energy Intelligence
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="text-[clamp(3.2rem,10vw,7.5rem)] font-bold leading-[0.95] tracking-tight"
        >
          <span className="text-gradient">AegisStore AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Reinforcement learning powered multi-tier energy storage intelligence. Routing power
          across flywheel, lithium-ion, hydrogen, and biomass — in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#dashboard"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.62_0.22_265)] to-[oklch(0.55_0.25_295)] px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_30px_-5px_oklch(0.85_0.15_200/0.6)] transition-transform hover:scale-[1.03] animate-pulse-glow"
          >
            Enter the Digital Twin
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#problem"
            className="rounded-full border border-[oklch(0.85_0.15_200/0.35)] px-7 py-3.5 text-sm text-foreground/90 backdrop-blur-md transition-colors hover:bg-[oklch(0.85_0.15_200/0.08)]"
          >
            Watch How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-muted-foreground"
        >
          <div className="mx-auto mb-3 h-10 w-px bg-gradient-to-b from-transparent via-cyan to-transparent animate-float" />
          SCROLL
        </motion.div>
      </div>
    </section>
  );
}
