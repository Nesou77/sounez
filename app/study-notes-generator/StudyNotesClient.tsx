"use client";

import { useState } from "react";
import { Copy, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("study-notes-generator")!;

type Level = "beginner" | "intermediate" | "advanced";

export function StudyNotesClient() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState<Level>("beginner");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic or paste some text");
      return;
    }
    setLoading(true);
    setNotes("");
    try {
      const res = await fetch("/api/study-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), level }),
      });
      const data = await res.json();
      if (typeof data.notes === "string" && data.notes.trim()) {
        setNotes(data.notes.trim());
        toast.success("Notes generated");
      } else {
        toast.error("No notes returned. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(notes);
    toast.success("Notes copied");
  };

  const download = () => {
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "study-notes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Notes downloaded");
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Enter any topic and get clean, structured study notes ready to review or export."
      features={[
        {
          title: "Structured output",
          desc: "Notes come with headings, bullets and a key terms section.",
        },
        {
          title: "Level-aware",
          desc: "Adjust depth from beginner to advanced.",
        },
        {
          title: "Export as text",
          desc: "Download your notes to read offline or import into Notion.",
        },
      ]}
      howTo={[
        "Type a topic or paste a block of text.",
        "Select your study level.",
        "Click Generate, then copy or download your notes.",
      ]}
      faqs={[
        {
          q: "Can I paste a paragraph and get notes from it?",
          a: "Yes. Paste any text into the topic box and the tool will summarise it into structured notes.",
        },
        {
          q: "Are the notes accurate?",
          a: "AI-generated notes can contain errors. Always cross-check important facts with a textbook or trusted source.",
        },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="notes-topic"
            className="mb-1.5 block text-sm font-medium"
          >
            Topic or text to summarise
          </label>
          <textarea
            id="notes-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={5}
            placeholder="e.g. The French Revolution, or paste a paragraph from your textbook…"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="notes-level"
            className="mb-1.5 block text-sm font-medium"
          >
            Study level
          </label>
          <select
            id="notes-level"
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Generating…" : "Generate Notes"}
        </button>
      </div>

      {notes && (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-sm font-semibold">Your study notes</p>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95"
              >
                <Copy className="h-3.5 w-3.5" />
                Copy
              </button>
              <button
                onClick={download}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition hover:bg-muted active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                Download .txt
              </button>
            </div>
          </div>
          <pre className="w-full overflow-auto rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {notes}
          </pre>
        </div>
      )}
    </ToolPageShell>
  );
}
