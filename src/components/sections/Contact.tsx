import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { useState } from "react";

const TEAM = [
  { name: "Dr. Aria Vance",      role: "Founder · RL Research",   initials: "AV" },
  { name: "Kai Okafor",          role: "Power Systems Lead",      initials: "KO" },
  { name: "Lena Park",           role: "Head of Hardware",        initials: "LP" },
  { name: "Idris Patel",         role: "Field Deployment",        initials: "IP" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-ai/20 blur-[120px] animate-float" />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <div className="eyebrow mb-4">Team & Contact</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.05]">
            Built by engineers who <span className="text-gradient">love the grid.</span>
          </h2>
        </motion.div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card glass-card-hover group p-5"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/30 to-purple-ai/30 font-display text-2xl font-semibold">
                {m.initials}
              </div>
              <div className="mt-4">
                <div className="font-display text-lg font-medium">{m.name}</div>
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{m.role}</div>
              </div>
              <div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {[Mail, Linkedin, Github].map((Icon, k) => (
                  <button key={k} className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface/60 text-muted-foreground transition-colors hover:bg-cyan/20 hover:text-cyan">
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card glow-border p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold">Pilot a site.</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Telecom, healthcare, data centers, microgrids. If you have 4–6 hours of backup
                and need 24, we should talk.
              </p>
              <div className="mt-8 space-y-2 font-mono text-xs text-muted-foreground">
                <div>hello@aegisstore.ai</div>
                <div>+91 80 0000 0000</div>
                <div>Bengaluru · Lagos · Singapore</div>
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              {["Full Name", "Work Email", "Organization"].map((p) => (
                <input
                  key={p}
                  required
                  placeholder={p}
                  className="w-full rounded-lg border border-border/60 bg-surface/30 px-4 py-3 text-sm backdrop-blur-md outline-none transition-all placeholder:text-muted-foreground focus:border-cyan/60 focus:shadow-[0_0_20px_-5px_oklch(0.85_0.15_200/0.5)]"
                />
              ))}
              <textarea
                rows={4}
                placeholder="Tell us about your site"
                className="w-full rounded-lg border border-border/60 bg-surface/30 px-4 py-3 text-sm backdrop-blur-md outline-none placeholder:text-muted-foreground focus:border-cyan/60 focus:shadow-[0_0_20px_-5px_oklch(0.85_0.15_200/0.5)]"
              />
              <button
                type="submit"
                disabled={sent}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-purple-ai px-6 py-3 font-mono text-xs tracking-[0.2em] text-background shadow-[0_0_30px_-5px_oklch(0.85_0.15_200/0.6)] transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {sent ? "✓ MESSAGE RECEIVED" : "REQUEST PILOT →"}
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border/30 pt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan animate-pulse" />
            AegisStore AI · 2026
          </div>
          <div className="flex gap-6">
            <a href="#">Privacy</a><a href="#">Security</a><a href="#">Docs</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
