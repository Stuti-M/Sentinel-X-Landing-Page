import { createFileRoute } from "@tanstack/react-router";
import { ShowcaseNav } from "../components/showcase/ShowcaseNav";
import { Hero } from "../components/showcase/Hero";
import { SectionTransition } from "../components/showcase/SectionTransition";
import { TheProblem } from "../components/showcase/TheProblem";
import { Introduction } from "../components/showcase/Introduction";
import { IntelligenceFeatures } from "../components/showcase/IntelligenceFeatures";
import { AgentCards } from "../components/showcase/AgentCards";
import { Pipeline } from "../components/showcase/Pipeline";
import { Architecture } from "../components/showcase/Architecture";
import { TechnologyEcosystem } from "../components/showcase/TechnologyEcosystem";
import { Roadmap } from "../components/showcase/Roadmap";
import { Builder } from "../components/showcase/Builder";
import { FinalCTA } from "../components/showcase/FinalCTA";
import { Footer } from "../components/showcase/Footer";
import { CustomCursor } from "../components/showcase/CustomCursor";
import { ScrollProgress } from "../components/showcase/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SENTINEL-X — Autonomous Environmental Intelligence" },
      {
        name: "description",
        content: "Sentinel-X is a multi-agent environmental intelligence system designed to investigate potential deforestation, verify evidence, and transform fragmented information into actionable policy intelligence.",
      },
    ],
  }),
  component: ShowcaseLanding,
});

function ShowcaseLanding() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-signal selection:text-background font-sans overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <ShowcaseNav />
      <main>
        <Hero />
        <SectionTransition />
        <TheProblem />
        <Introduction />
        <AgentCards />
        <IntelligenceFeatures />
        <Pipeline />
        <Architecture />
        <TechnologyEcosystem />
        <Roadmap />
        <Builder />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
