import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { BatteryCharging, Atom, Disc3, Flame, Sun, Activity, Cpu, Gauge } from "lucide-react";

function useTick(ms = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setN((x) => x + 1), ms);
    return () => clearInterval(i);
  }, [ms]);
  return n;
}

function RadialGauge({ value, label, color, unit = "%" }: { value: number; label: string; color: string; unit?: string }) {
  const dash = (value / 100) * 264;
  return (
    <div className="relative flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 100 100" className="-rotate-[135deg]">
        <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.30 0.05 265 / 0.4)" strokeWidth="6" strokeDasharray="264 100" strokeLinecap="round" />
        <motion.circle
          cx="50" cy="50" r="42"
          fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${dash} 400`}
          initial={false}
          animate={{ strokeDasharray: `${dash} 400` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div key={value} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-3xl font-semibold">
          {Math.round(value)}<span className="text-sm text-muted-foreground">{unit}</span>
        </motion.div>
        <div className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function MiniArea({ data, color }: { data: number[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <AreaChart data={data.map((v, i) => ({ i, v }))}>
        <defs>
          <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.6} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g-${color})`} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const SOURCES = ["Flywheel", "Battery", "Hydrogen", "Biomass"];
const SRC_ICONS = [Disc3, BatteryCharging, Atom, Flame];
const SRC_COLORS = ["#00E5FF", "#2D6BFF", "#7C3AED", "#FF7A1A"];

export default function Dashboard() {
  const tick = useTick(2000);
  const soc = 65 + Math.sin(tick * 0.7) * 15;
  const h2 = 78 + Math.sin(tick * 0.5 + 1) * 10;
  const rpm = 18000 + Math.sin(tick * 0.9) * 3000;
  const bio = 54 + Math.sin(tick * 0.4) * 12;
  const sourceIdx = tick % 4;
  const SrcIcon = SRC_ICONS[sourceIdx];
  const srcColor = SRC_COLORS[sourceIdx];
  const solarData = Array.from({ length: 24 }, (_, i) => Math.max(0, Math.sin((i + tick) * 0.3) * 80 + 60));
  const loadData = Array.from({ length: 24 }, (_, i) => 70 + Math.sin((i + tick * 1.3) * 0.4) * 25);

  return (
    <section id="dashboard" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">Live Digital Twin</div>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
              Mission control for <span className="text-gradient">every watt.</span>
            </h2>
          </div>
          <div className="glass flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em]">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan shadow-[0_0_8px] shadow-cyan" />
            <span className="text-cyan">LIVE · {String(tick).padStart(4, "0")}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          {/* Featured: current source */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 row-span-2 glass-card glow-border p-6 flex flex-col justify-between min-h-[280px]">
            <div className="flex items-center justify-between">
              <div className="eyebrow">Current Source</div>
              <Cpu className="h-4 w-4 text-purple-ai" />
            </div>
            <motion.div key={sourceIdx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-6">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full" style={{ background: `radial-gradient(circle, ${srcColor}44, ${srcColor}00 70%)`, boxShadow: `0 0 60px ${srcColor}88` }}>
                <SrcIcon className="h-14 w-14" style={{ color: srcColor }} />
              </div>
              <div className="mt-5 font-display text-3xl font-semibold" style={{ color: srcColor }}>{SOURCES[sourceIdx]}</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">ACTIVELY DISPATCHING</div>
            </motion.div>
            <div className="font-mono text-[10px] text-muted-foreground">AI confidence · 0.{Math.floor(85 + Math.sin(tick) * 10)}</div>
          </div>

          {/* Battery SOC */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-4 flex flex-col items-center">
            <RadialGauge value={soc} label="Battery SOC" color="#2D6BFF" />
          </div>
          {/* Hydrogen */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-4 flex flex-col items-center">
            <RadialGauge value={h2} label="Hydrogen" color="#7C3AED" />
          </div>

          {/* Predicted duration */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-5">
            <div className="eyebrow mb-3">Predicted Outage</div>
            <div className="font-mono text-4xl font-semibold">{(18 + Math.sin(tick * 0.3) * 4).toFixed(1)}<span className="text-sm text-muted-foreground"> hrs</span></div>
            <div className="mt-2 flex items-center gap-1 font-mono text-[10px] text-orange-pulse">▲ +0.3 vs last</div>
          </div>
          {/* Flow */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-5">
            <div className="eyebrow mb-3">Energy Flow</div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
                  className="h-8 w-2 rounded-sm bg-cyan shadow-[0_0_8px] shadow-cyan"
                />
              ))}
            </div>
            <div className="mt-3 font-mono text-xs text-cyan">{(2.4 + Math.sin(tick * 0.5) * 0.5).toFixed(2)} kW · stable</div>
          </div>

          {/* Flywheel RPM */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-5 flex flex-col">
            <div className="eyebrow mb-2 flex items-center gap-2"><Gauge className="h-3 w-3" /> Flywheel RPM</div>
            <div className="font-mono text-3xl font-semibold text-cyan">{Math.round(rpm).toLocaleString()}</div>
            <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-surface-2">
              <motion.div animate={{ width: `${(rpm / 22000) * 100}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-cyan to-electric" />
            </div>
          </div>
          {/* Biomass */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2 glass-card p-5 flex flex-col">
            <div className="eyebrow mb-2 flex items-center gap-2"><Flame className="h-3 w-3 text-orange-pulse" /> Biomass</div>
            <div className="font-mono text-3xl font-semibold text-orange-pulse">{Math.round(bio)}%</div>
            <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-surface-2">
              <motion.div animate={{ width: `${bio}%` }} className="h-full bg-gradient-to-r from-orange-pulse to-[oklch(0.78_0.18_60)]" />
            </div>
          </div>

          {/* Solar */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="eyebrow flex items-center gap-2"><Sun className="h-3 w-3 text-[#FFB020]" /> Solar Generation</div>
              <div className="font-mono text-xs text-[#FFB020]">{(solarData[solarData.length - 1] / 10).toFixed(1)} kW</div>
            </div>
            <MiniArea data={solarData} color="#FFB020" />
          </div>
          {/* Load */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 glass-card p-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="eyebrow flex items-center gap-2"><Activity className="h-3 w-3 text-orange-pulse" /> Load Demand</div>
              <div className="font-mono text-xs text-orange-pulse">{(loadData[loadData.length - 1] / 10).toFixed(1)} kW</div>
            </div>
            <MiniArea data={loadData} color="#FF7A1A" />
          </div>
        </div>
      </div>
    </section>
  );
}
