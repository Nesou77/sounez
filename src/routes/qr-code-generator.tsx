import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";
const tool = toolBySlug("qr-code-generator")!;
export const Route = createFileRoute("/qr-code-generator")({
  head: () => ({ meta: [
    { title: `${tool.name} — Free Online QR Code Maker | Sounez` },
    { name: "description", content: tool.description },
    { property: "og:title", content: tool.name },
    { property: "og:description", content: tool.description },
  ]}),
  component: Page,
});
function Page() {
  const [text, setText] = useState("https://sounez.com");
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current && text) QRCode.toCanvas(canvas.current, text, { width: 256, margin: 2, color: { dark: "#111827", light: "#ffffff" } });
  }, [text]);
  const download = () => {
    if (!canvas.current) return;
    const a = document.createElement("a");
    a.download = "qrcode.png"; a.href = canvas.current.toDataURL(); a.click();
    toast.success("Download started", { description: "Your QR code is saving as PNG." });
  };
  return (
    <ToolPageShell tool={tool}
      intro="Generate a high-quality QR code for any URL, text or message — instantly, free and no signup required."
      features={[
        { title: "Instant generation", desc: "Type and watch your QR code update in real time." },
        { title: "High resolution", desc: "Download a crisp 256×256 PNG ready to print or share." },
        { title: "Private", desc: "Everything runs in your browser — nothing is uploaded." },
      ]}
      howTo={["Type or paste your URL/text in the input.", "Preview your QR code on the right.", "Click Download PNG to save it."]}
      faqs={[
        { q: "Is the QR code free to use commercially?", a: "Yes — use it anywhere, including print and ads." },
        { q: "Does it work for Wi-Fi or vCards?", a: "Currently optimized for URLs and text. More formats coming soon." },
      ]}>
      <div className="grid gap-6 sm:grid-cols-2 items-center">
        <div>
          <label className="text-sm font-medium">URL or text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
            className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <button onClick={download} className="mt-3 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop">Download PNG</button>
        </div>
        <div className="flex justify-center rounded-2xl border border-border bg-background p-6">
          <canvas ref={canvas} />
        </div>
      </div>
    </ToolPageShell>
  );
}
