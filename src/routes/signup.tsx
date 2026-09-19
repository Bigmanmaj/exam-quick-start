import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/components/perlego";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [
    { title: "Start your student plan — Perlego" },
    { name: "description", content: "Unlock your selected chapters and personalised revision plan." },
    { property: "og:title", content: "Start your student plan — Perlego" },
    { property: "og:description", content: "Unlock your selected chapters and personalised revision plan." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: SignupPage,
});