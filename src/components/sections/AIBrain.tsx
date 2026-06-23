import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

const INPUTS = ["Load Demand", "Battery SOC", "Hydrogen Level", "Solar Irradiance", "Predicted Outage"];
const OUTPUTS = ["Flywheel", "Battery", "Hydrogen", "Biomass"];

function NeuralNet() {
  const [winner, setWinner] = useState(2);
  useEffect(() => {
    const i = setInterval(() => setWinner((w) => (w + 1) % OUTPUTS.length), 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative glass-card aspect-[4/3] overflow-hidden p-6">
      <div className="eyebrow mb-2">Decision Engine · Live</div>
      <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full">
        {INPUTS.map((_, i) =>
          OUTPUTS.map((__, j) => {
            const active = j === winner;
            return (
              <line
                key={`${i}-${j}`}
                x1="20"
                y1={10 + i * 14}
                x2="80"
                y2={15 + j * 16}
                stroke={active ? "oklch(0.85 0.15 200)" : "oklch(0.85 0.15 200 / 0.1)"}
                strokeWidth={active ? "0.3" : "0.15"}
              >
                {active && (
                  <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
                )}
              </line>
            );
          })
        )}
        {INPUTS.map((label, i) => (
          <g key={label}>
            <circle cx="20" cy={10 + i * 14} r="1.6" fill="#00E5FF" />
            <text x="17" y={11 + i * 14} textAnchor="end" fontSize="3.2" fill="#8A94A6" fontFamily="JetBrains Mono">
              {label}
            </text>
          </g>
        ))}
        {OUTPUTS.map((label, j) => {
          const active = j === winner;
          return (
            <g key={label}>
              <circle cx="80" cy={15 + j * 16} r={active ? "2.4" : "1.6"} fill={active ? "#7C3AED" : "#2D6BFF"}>
                {active && <animate attributeName="r" values="1.8;3;1.8" dur="1.2s" repeatCount="indefinite" />}
              </circle>
              <text x="83" y={16 + j * 16} fontSize="3.2" fill={active ? "#fff" : "#8A94A6"} fontFamily="JetBrains Mono">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
        <span className="text-muted-foreground">DECISION:</span>
        <motion.span key={winner} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} className="text-cyan">
          {OUTPUTS[winner].toUpperCase()} SELECTED
        </motion.span>
      </div>
    </div>
  );
}

function QHeatmap() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, []);
  const cols = 8;
  const rows = 5;
  const data = Array.from({ length: rows * cols }, (_, i) => {
    const seed = (i * 9301 + tick * 17) % 1000;
    return (Math.sin(seed) + 1) / 2;
  });
  return (
    <div className="glass-card p-5">
      <div className="eyebrow mb-3">Q-Table · States × Actions</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {data.map((v, i) => (
          <motion.div
            key={i}
            animate={{ opacity: 0.4 + v * 0.6 }}
            transition={{ duration: 1.2 }}
            className="aspect-square rounded-sm"
            style={{ background: `oklch(${0.4 + v * 0.4} ${0.15 + v * 0.1} ${200 + v * 90})` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[9px] text-muted-foreground">
        <span>LOW Q-VALUE</span>
        <span>HIGH Q-VALUE</span>
      </div>
    </div>
  );
}

function RewardCurve() {
  const data = Array.from({ length: 60 }, (_, i) => ({
    ep: i,
    r: -50 + Math.log(i + 1) * 40 + Math.sin(i * 0.6) * 8,
  }));
  return (
    <div className="glass-card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="eyebrow">Reward · Episodes</div>
        <div className="font-mono text-xs text-cyan">EP 60/60</div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="rw" x1="0" x2="1">
              <stop offset="0%" stopColor="#2D6BFF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
          <XAxis dataKey="ep" hide />
          <YAxis hide />
          <Tooltip contentStyle={{ background: "oklch(0.15 0.04 265)", border: "1px solid oklch(0.85 0.15 200 / 0.3)", fontFamily: "JetBrains Mono", fontSize: 11 }} />
          <Line type="monotone" dataKey="r" stroke="url(#rw)" strokeWidth={2.5} dot={false} animationDuration={2000} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function AIBrain() {
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
          <div className="eyebrow mb-4">The AI Brain</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Trained to make the right call,{" "}
            <span className="text-gradient">every time.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A reinforcement learning agent — DDPG with Q-Learning bootstrapping — that learns
            the optimal storage policy from millions of simulated outage scenarios.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <NeuralNet />
          <div className="flex flex-col gap-6">
            <QHeatmap />
            <RewardCurve />
          </div>
        </div>
      </div>
    </section>
  );
}
