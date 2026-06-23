import { useEffect, useState } from "react";

const LINKS = [
  ["#problem", "Problem"],
  ["#dashboard", "Twin"],
  ["#simulator", "Simulator"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed left-1/2 top-5 z-50 -translate-x-1/2 transition-all ${scrolled ? "scale-100" : "scale-105"}`}>
      <div className="glass flex items-center gap-6 rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-cyan to-purple-ai">
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan to-purple-ai blur-md opacity-60" />
            <span className="relative font-mono text-[10px] font-bold text-background">Æ</span>
          </span>
          AegisStore
        </a>
        <div className="hidden gap-5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground sm:flex">
          {LINKS.map(([h, l]) => (
            <a key={h} href={h} className="transition-colors hover:text-cyan">{l}</a>
          ))}
        </div>
        <a href="#contact" className="rounded-full bg-foreground/95 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-background transition-transform hover:scale-105">
          Pilot →
        </a>
      </div>
    </nav>
  );
}
