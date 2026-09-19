import { createFileRoute } from "@tanstack/react-router";
import { SearchHome } from "@/components/perlego";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Find the right chapters in minutes — Perlego Exam Sprint" },
    { name: "description", content: "Enter your module, see the chapters that match your revision topics and start reading before you sign up." },
    { property: "og:title", content: "Find the right chapters in minutes — Perlego Exam Sprint" },
    { property: "og:description", content: "Enter your module, see the chapters that match your revision topics and start reading before you sign up." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SearchHome,
});
