import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/dashboard";

export const Route = createFileRoute("/study")({
  head: () => ({ meta: [
    { title: "Your dashboard — Perlego" },
    { name: "description", content: "Your personalised Perlego dashboard: recommended books, your bookshelf and account details." },
    { property: "og:title", content: "Your dashboard — Perlego" },
    { property: "og:description", content: "Your personalised Perlego dashboard: recommended books, your bookshelf and account details." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: DashboardPage,
});