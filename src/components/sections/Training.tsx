import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOG_LINES = [
  "State: SOC 42%, Duration 6h → Action: Hydrogen (Q=0.91)",
  "State: SOC 78%, Duration 1h → Action: Battery (Q=0.88)",
  "State: SOC 12%, Duration 9h → Action: Biomass (Q=0.94)",
  "State: SOC 65%, Duration 0.5h → Action: Flywheel (Q=0.97)",
  "State: SOC 30%, Duration 12h → Action: Hydrogen (Q=0.92)",
  "State: SOC 89%, Duration 2h → Action: Battery (Q=0.86)",
  "State: SOC 55%, Duration 4h → Action: Battery (Q=0.84)",
  "State: SOC 8%,  Duration 18h → Action: Biomass (Q=0.96)",
];

export default function Training() {
  const [logs, setLogs] = useState<{ t: string; msg: string; id: number }[]>([]);
  useEffect(() => {
    let id = 0;
    const fn = () => {
      const d = new Date();
      const t = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
      setLogs((prev) => [{ t, msg: LOG_LINES[id % LOG_LINES.length], id: id++ }, ...prev].slice(0, 8));
    };
    fn();
    const i = setInterval(fn, 1500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 max-w-3xl"
        >
          <div className="eyebrow mb-4">Training Telemetry</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Watch the agent <span className="text-gradient">learn.</span>
          </h2>
        </motion.div>

        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/40 bg-surface/40 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-orange-pulse/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">AGENT.LOG · LIVE STREAM</div>
            <div className="font-mono text-[10px] text-cyan">EP 12,847</div>
          </div>
          <div className="space-y-1 p-5 font-mono text-xs">
            {logs.map((l) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <span className="text-muted-foreground">[{l.t}]</span>
                <span className="text-foreground/90">{l.msg}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
