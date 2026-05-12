import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug } from "@/data/tools";
import { StudyNotesClient } from "./StudyNotesClient";

export const metadata: Metadata = {
  title: "Free Study Notes Generator | Summarize Lessons Online | Sounez",
  description:
    "Turn your text into study notes, summaries, bullet points, key ideas or flashcards with this free study notes generator.",
  openGraph: {
    title: "Free Study Notes Generator | Sounez",
    description: "Enter any topic and get clean, structured study notes ready to review or export.",
  },
};

export default function Page() {
  const tool = toolBySlug("study-notes-generator");
  if (!tool) notFound();
  return <StudyNotesClient tool={tool} />;
}
