import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const soc = useTransform(scrollYProgress, [0.1, 0.7], [0.8, 0]);
  const dash = useTransform(soc, (v) => `${v * 283} 283`);
  const stroke = useTransform(soc, (v) =>
    v > 0.5 ? "oklch(0.85 0.15 200)" : v > 0.2 ? "oklch(0.72 0.20 50)" : "oklch(0.65 0.25 25)"
  );
  const alertOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const pct = useTransform(soc, (v) => `${Math.round(v * 100)}%`);

  return (
    <section id="problem" ref={ref} className="relative min-h-[180vh] py-32">
      <div className="sticky top-0 flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="eyebrow mb-4">The Problem</div>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
              Conventional battery backup runs out exactly{" "}
              <span className="text-gradient">when you need it most.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              Battery-only systems collapse under prolonged outages — degrading 30% faster under
              deep cycling, leaving critical loads unmet during the events that matter.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                ["4–6 hrs", "Typical autonomy"],
                ["+30%", "Degradation under deep cycling"],
                ["High", "Unmet load risk"],
              ].map(([k, v]) => (
                <div key={k} className="glass-card p-4">
                  <div className="font-mono text-xl font-semibold text-cyan">{k}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div
              style={{ opacity: alertOpacity }}
              className="pointer-events-none absolute inset-0 rounded-3xl border border-destructive/40 shadow-[0_0_120px_-20px_oklch(0.65_0.25_25/0.6)]"
            />
            <div className="relative">
              <svg width="280" height="280" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="oklch(0.30 0.05 265 / 0.5)" strokeWidth="6" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength="283"
                  style={{ stroke, strokeDasharray: dash }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="eyebrow mb-2">State of Charge</div>
                <motion.div className="font-mono text-5xl font-semibold">{pct}</motion.div>
              </div>
              <motion.div
                style={{ opacity: alertOpacity }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-destructive/50 bg-destructive/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-destructive"
              >
                ⚠ SYSTEM FAILURE — UNMET LOAD DETECTED
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
