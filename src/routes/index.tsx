import { createFileRoute } from "@tanstack/react-router";
import { SearchHome } from "@/components/perlego";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Find exactly what to revise — Perlego" },
    { name: "description", content: "Find the most relevant chapters for your exam and start studying with confidence." },
    { property: "og:title", content: "Find exactly what to revise — Perlego" },
    { property: "og:description", content: "Find the most relevant chapters for your exam and start studying with confidence." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SearchHome,
});
