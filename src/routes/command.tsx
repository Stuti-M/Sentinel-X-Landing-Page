import { createFileRoute } from "@tanstack/react-router";
import { SentinelCommandCenter } from "@/components/sentinel/SentinelCommandCenter";

export const Route = createFileRoute("/command")({
  head: () => ({
    meta: [
      { title: "SENTINEL-X — Autonomous Environmental Intelligence" },
      {
        name: "description",
        content:
          "Enter the control room for a multi-agent environmental intelligence network that detects, verifies, and responds to ecological crises.",
      },
      { property: "og:title", content: "SENTINEL-X — Autonomous Environmental Intelligence" },
      {
        property: "og:description",
        content: "AI command and control for evidence-backed environmental crisis response.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <SentinelCommandCenter />;
}
