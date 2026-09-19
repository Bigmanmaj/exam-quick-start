import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/login";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [
    { title: "Log in — Perlego Exam Sprint" },
    { name: "description", content: "Log in with UniDays, Google or Apple to reach your personalised Perlego study dashboard." },
    { property: "og:title", content: "Log in — Perlego Exam Sprint" },
    { property: "og:description", content: "Log in with UniDays, Google or Apple to reach your personalised Perlego study dashboard." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: LoginPage,
});
