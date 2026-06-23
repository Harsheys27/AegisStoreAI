import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STAGES = [
  { n: "01", title: "Prototype",         desc: "Bench-scale hybrid stack with simulated RL agent.", icon: "⚙" },
  { n: "02", title: "Simulation",        desc: "Million-episode training across outage profiles.",  icon: "◇" },
  { n: "03", title: "Optimization",      desc: "Policy distillation for embedded deployment.",      icon: "⌬" },
  { n: "04", title: "Deployment",        desc: "Pilot rollouts at telecom & PHC sites.",            icon: "▲" },
  { n: "05", title: "Smart Grid",        desc: "Federated coordination across microgrids.",         icon: "⌭" },
  { n: "06", title: "Digital Twin",      desc: "Cloud-synced predictive twin for every install.",   icon: "◉" },
  { n: "07", title: "V2G",               desc: "Vehicle-to-grid integration as mobile storage.",    icon: "↯" },
];

export default function Roadmap() {
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
          <div className="eyebrow mb-4">Roadmap</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            From bench prototype to <span className="text-gradient">grid-scale intelligence.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan via-purple-ai to-orange-pulse opacity-40" />
          <div className="space-y-8">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-20"
              >
                <div className="absolute left-0 top-3 flex h-12 w-12 items-center justify-center rounded-full glass text-xl text-cyan shadow-[0_0_30px_-5px_oklch(0.85_0.15_200/0.6)]">
                  {s.icon}
                </div>
                <div className="glass-card glass-card-hover p-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
