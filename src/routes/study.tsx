import { createFileRoute } from "@tanstack/react-router";
import { StudyPage } from "@/components/perlego";

export const Route = createFileRoute("/study")({
  head: () => ({ meta: [
    { title: "Your study plan — Perlego" },
    { name: "description", content: "Continue your selected chapter and follow your focused two-day revision plan." },
    { property: "og:title", content: "Your study plan — Perlego" },
    { property: "og:description", content: "Continue your selected chapter and follow your focused two-day revision plan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: StudyPage,
});