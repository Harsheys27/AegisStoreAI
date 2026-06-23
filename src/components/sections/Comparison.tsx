import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const METRICS = [
  { label: "Autonomy Duration",  trad: "4–6 hrs",      ours: "18–24 hrs",   tradPct: 25, oursPct: 95 },
  { label: "Reliability",         trad: "~85%",        ours: ">99%",        tradPct: 60, oursPct: 99 },
  { label: "Battery Life",        trad: "Baseline",    ours: "+30%",        tradPct: 50, oursPct: 90 },
  { label: "Unmet Load",          trad: "High",        ours: "<3%",         tradPct: 70, oursPct: 12 },
  { label: "LCOE",                trad: "₹12+/kWh",    ours: "₹6–8/kWh",    tradPct: 80, oursPct: 38 },
  { label: "Carbon Emissions",    trad: "High",        ours: "−40%+",       tradPct: 85, oursPct: 25 },
];

function Bar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="h-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
      />
    </div>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="eyebrow mb-4">Head to Head</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Battery-only systems vs. <span className="text-gradient">AegisStore AI.</span>
          </h2>
        </motion.div>

        <div className="relative grid gap-6 md:grid-cols-2">
          {/* Traditional */}
          <div className="glass-card p-8 opacity-80">
            <div className="eyebrow mb-2 text-muted-foreground">Traditional</div>
            <h3 className="font-display text-2xl text-muted-foreground">Battery-Only Backup</h3>
            <div className="mt-6 space-y-4">
              {METRICS.map((m, i) => (
                <div key={m.label}>
                  <div className="mb-1 flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="text-foreground/70">{m.trad}</span>
                  </div>
                  <Bar pct={m.tradPct} color="oklch(0.55 0.04 265)" delay={i * 0.08} />
                </div>
              ))}
            </div>
          </div>

          {/* Divider VS */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              className="flex h-16 w-16 items-center justify-center rounded-full glass font-display text-xl font-bold text-cyan shadow-[0_0_40px] shadow-cyan/40"
            >
              VS
            </motion.div>
          </div>

          {/* AegisStore */}
          <div className="glass-card glow-border p-8">
            <div className="eyebrow mb-2 text-cyan">AegisStore AI</div>
            <h3 className="font-display text-2xl text-gradient">Multi-Tier Intelligence</h3>
            <div className="mt-6 space-y-4">
              {METRICS.map((m, i) => (
                <div key={m.label}>
                  <div className="mb-1 flex justify-between font-mono text-xs">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="text-cyan">{m.ours}</span>
                  </div>
                  <Bar pct={m.oursPct} color="oklch(0.85 0.15 200)" delay={0.5 + i * 0.08} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
