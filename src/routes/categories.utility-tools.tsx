import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/CategoryPage";

export const Route = createFileRoute("/categories/utility-tools")({
  head: () => ({
    meta: [
      { title: "Utility Tools — QR Codes, Passwords, Word Counter | Sounez" },
      { name: "description", content: "Free utility tools: QR code generator, password generator, word counter, image compressor and text case converter." },
      { property: "og:title", content: "Utility Tools — Sounez" },
      { property: "og:description", content: "Everyday productivity tools — fast, free and private." },
    ],
  }),
  component: () => <CategoryPage slug="utility-tools" />,
});
