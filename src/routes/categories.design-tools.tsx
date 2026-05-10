import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/categories/design-tools")({
  head: () => ({
    meta: [
      { title: "Design Tools — Color Palettes & CSS Gradients | Sounez" },
      { name: "description", content: "Free design tools: color palette generator and CSS gradient generator. Copy-ready code for designers and developers." },
      { property: "og:title", content: "Design Tools — Sounez" },
      { property: "og:description", content: "Generate beautiful colors and gradients in seconds." },
    ],
  }),
  component: () => <CategoryPage slug="design-tools" />,
});
