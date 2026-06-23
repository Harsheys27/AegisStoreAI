import { motion } from "framer-motion";
import { Sun, Cpu, Disc3, BatteryCharging, Flame, Atom, Zap } from "lucide-react";
import { useState } from "react";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  facts: string[];
};

const NODES: Node[] = [
  { id: "solar", label: "Solar PV", x: 10, y: 50, color: "#FFB020", icon: Sun, facts: ["Primary renewable input", "Smart MPPT tracking", "Direct DC coupling"] },
  { id: "ai",    label: "AI Core",  x: 50, y: 50, color: "#7C3AED", icon: Cpu, facts: ["DDPG + Q-Learning hybrid", "Sub-second decision loop", "Edge + cloud co-inference"] },
  { id: "fly",   label: "Flywheel", x: 85, y: 15, color: "#00E5FF", icon: Disc3, facts: ["Sub-second response", "Handles transient spikes", "Zero degradation cycling"] },
  { id: "bat",   label: "Battery",  x: 90, y: 42, color: "#2D6BFF", icon: BatteryCharging, facts: ["Li-ion primary buffer", "Smart SOC management", "30% life extension"] },
  { id: "hyd",   label: "Hydrogen", x: 90, y: 68, color: "#00B5D8", icon: Atom, facts: ["PEM fuel cell", "Multi-hour discharge", "~55% RTE"] },
  { id: "bio",   label: "Biomass",  x: 85, y: 90, color: "#FF7A1A", icon: Flame, facts: ["Local feedstock", "Dispatchable baseload", "Carbon-neutral"] },
];

const LINKS: [string, string][] = [
  ["solar", "ai"],
  ["ai", "fly"],
  ["ai", "bat"],
  ["ai", "hyd"],
  ["ai", "bio"],
];

export default function Architecture() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="eyebrow mb-4">System Architecture</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            One intelligent layer.{" "}
            <span className="text-gradient">Four storage tiers.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            AegisStore AI doesn't just store energy — it decides, in real time, which medium
            should deliver it.
          </p>
        </motion.div>

        <div className="glass-card glow-border relative aspect-[16/10] overflow-hidden p-6">
          <div className="absolute inset-0 hud-grid opacity-20" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {LINKS.map(([a, b], i) => {
              const na = NODES.find((n) => n.id === a)!;
              const nb = NODES.find((n) => n.id === b)!;
              const id = `flow-${i}`;
              return (
                <g key={id}>
                  <path d={`M${na.x} ${na.y} Q ${(na.x + nb.x) / 2} ${(na.y + nb.y) / 2 - 5} ${nb.x} ${nb.y}`} fill="none" stroke="oklch(0.85 0.15 200 / 0.25)" strokeWidth="0.3" />
                  <path
                    id={id}
                    d={`M${na.x} ${na.y} Q ${(na.x + nb.x) / 2} ${(na.y + nb.y) / 2 - 5} ${nb.x} ${nb.y}`}
                    fill="none"
                    stroke={nb.color}
                    strokeWidth="0.4"
                    strokeDasharray="0.6 3"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-30" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                  </path>
                </g>
              );
            })}
          </svg>

          {NODES.map((n) => {
            const Icon = n.icon;
            const isAI = n.id === "ai";
            return (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative flex cursor-pointer flex-col items-center"
                >
                  <div
                    className={`relative flex items-center justify-center rounded-full backdrop-blur-md ${isAI ? "h-24 w-24" : "h-16 w-16"}`}
                    style={{
                      background: `radial-gradient(circle, ${n.color}33, ${n.color}08)`,
                      border: `1px solid ${n.color}88`,
                      boxShadow: `0 0 ${isAI ? 60 : 30}px ${n.color}66`,
                    }}
                  >
                    <Icon className={`${isAI ? "h-10 w-10" : "h-6 w-6"} text-white`} />
                    {isAI && (
                      <div className="absolute inset-0 animate-ping rounded-full" style={{ border: `1px solid ${n.color}`, animationDuration: "2.5s" }} />
                    )}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/80">
                    {n.label}
                  </div>

                  {hover === n.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-full top-1/2 z-20 ml-4 w-56 -translate-y-1/2 glass-card p-4"
                      style={{ borderColor: `${n.color}66` }}
                    >
                      <div className="mb-2 font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: n.color }}>
                        {n.label}
                      </div>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {n.facts.map((f) => (
                          <li key={f} className="flex gap-2">
                            <Zap className="mt-0.5 h-3 w-3 shrink-0" style={{ color: n.color }} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
