import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Disc3, BatteryCharging, Atom, Flame, Play } from "lucide-react";

function Slider({ label, value, onChange, min, max, unit }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; unit: string }) {
  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-[11px]">
        <span className="text-muted-foreground tracking-[0.15em] uppercase">{label}</span>
        <span className="text-cyan">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-[oklch(0.85_0.15_200)] [&::-webkit-slider-runnable-track]:to-[oklch(0.55_0.25_295)]
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_0_12px_oklch(0.85_0.15_200/0.8)]
          [&::-webkit-slider-thumb]:-mt-[5px]"
      />
    </div>
  );
}

export default function Simulation() {
  const [load, setLoad] = useState(60);
  const [duration, setDuration] = useState(12);
  const [solar, setSolar] = useState(70);
  const [h2cap, setH2cap] = useState(100);
  const [batCap, setBatCap] = useState(80);

  const decision = useMemo(() => {
    if (load > 75 && duration < 4) return { name: "Flywheel", icon: Disc3, color: "#00E5FF", reason: "Handling Transient Spike" };
    if (duration > 10 && h2cap > 40) return { name: "Hydrogen Fuel Cell", icon: Atom, color: "#7C3AED", reason: "Extended Discharge Mode" };
    if (solar < 30 && duration > 6) return { name: "Biomass Generator", icon: Flame, color: "#FF7A1A", reason: "Solar Deficit Coverage" };
    return { name: "Lithium-Ion Battery", icon: BatteryCharging, color: "#2D6BFF", reason: "Standard Discharge" };
  }, [load, duration, solar, h2cap, batCap]);

  const data = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      t: i,
      supply: Math.max(0, solar * Math.sin((i / 30) * Math.PI) + (h2cap / 4) + (batCap / 5) - i * 1.2),
      load: load + Math.sin(i * 0.4) * 8,
    })),
  [load, duration, solar, h2cap, batCap]);

  const DIcon = decision.icon;

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
          <div className="eyebrow mb-4">Simulator</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Play with the agent. <span className="text-gradient">Watch it decide.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass-card p-6 lg:col-span-4">
            <div className="eyebrow mb-5">Scenario Controls</div>
            <div className="space-y-6">
              <Slider label="Load Demand" value={load} onChange={setLoad} min={10} max={120} unit=" kW" />
              <Slider label="Outage Duration" value={duration} onChange={setDuration} min={1} max={24} unit=" hrs" />
              <Slider label="Solar Irradiance" value={solar} onChange={setSolar} min={0} max={100} unit="%" />
              <Slider label="Hydrogen Capacity" value={h2cap} onChange={setH2cap} min={0} max={150} unit=" kWh" />
              <Slider label="Battery Capacity" value={batCap} onChange={setBatCap} min={20} max={200} unit=" kWh" />
            </div>
            <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple-ai px-5 py-3 font-mono text-xs tracking-[0.2em] text-background shadow-[0_0_30px_-5px_oklch(0.85_0.15_200/0.6)] transition-transform hover:scale-[1.02]">
              <Play className="h-3 w-3" /> RUN SCENARIO
            </button>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div
              key={decision.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card glow-border flex items-center gap-5 p-6"
              style={{ borderColor: `${decision.color}66` }}
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${decision.color}22`, boxShadow: `0 0 40px ${decision.color}66` }}>
                <DIcon className="h-8 w-8" style={{ color: decision.color }} />
              </div>
              <div>
                <div className="eyebrow mb-1" style={{ color: decision.color }}>AI Decision</div>
                <div className="font-display text-2xl font-semibold" style={{ color: decision.color }}>
                  {decision.name} Selected
                </div>
                <div className="font-mono text-xs text-muted-foreground">{decision.reason}</div>
              </div>
              <div className="ml-auto text-right font-mono text-[10px] text-muted-foreground">
                <div>Q-VALUE</div>
                <div className="text-lg text-foreground">0.{Math.floor(80 + load / 5)}</div>
              </div>
            </motion.div>

            <div className="glass-card p-6">
              <div className="mb-3 flex justify-between">
                <div className="eyebrow">Load vs Supply · Live</div>
                <div className="flex gap-4 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan" /> Supply</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orange-pulse" /> Load</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="supply" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="load" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#FF7A1A" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#FF7A1A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 'dataMax + 20']} />
                  <Area type="monotone" dataKey="supply" stroke="#00E5FF" strokeWidth={2} fill="url(#supply)" isAnimationActive />
                  <Area type="monotone" dataKey="load" stroke="#FF7A1A" strokeWidth={2} fill="url(#load)" isAnimationActive />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
