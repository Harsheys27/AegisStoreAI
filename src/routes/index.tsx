import { createFileRoute } from "@tanstack/react-router";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Architecture from "@/components/sections/Architecture";
import AIBrain from "@/components/sections/AIBrain";
import Dashboard from "@/components/sections/Dashboard";
import Comparison from "@/components/sections/Comparison";
import Simulation from "@/components/sections/Simulation";
import Training from "@/components/sections/Training";
import Roadmap from "@/components/sections/Roadmap";
import Contact from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AegisStore AI — RL-Powered Multi-Tier Energy Storage" },
      { name: "description", content: "AegisStore AI orchestrates flywheel, battery, hydrogen, and biomass storage with reinforcement learning. Extend backup from 6 to 24 hours." },
      { property: "og:title", content: "AegisStore AI" },
      { property: "og:description", content: "Reinforcement learning powered multi-tier energy storage intelligence." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main id="top" className="relative min-h-screen">
      <SmoothScroll />
      <Nav />
      <Hero />
      <section id="problem"><Problem /></section>
      <Architecture />
      <AIBrain />
      <Dashboard />
      <Comparison />
      <section id="simulator"><Simulation /></section>
      <Training />
      <Roadmap />
      <section id="contact"><Contact /></section>
    </main>
  );
}
