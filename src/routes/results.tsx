import { createFileRoute } from "@tanstack/react-router";
import { ResultsPage } from "@/components/perlego";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [
    { title: "Your study matches — Perlego" },
    { name: "description", content: "Compare the books and chapters most relevant to your exam topics." },
    { property: "og:title", content: "Your study matches — Perlego" },
    { property: "og:description", content: "Compare the books and chapters most relevant to your exam topics." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: ResultsPage,
});