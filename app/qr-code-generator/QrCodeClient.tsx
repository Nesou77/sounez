"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackToolComplete, trackDownloadResult, trackCopyResult } from "@/lib/analytics";

type Size = 128 | 192 | 256 | 384 | 512;

const SIZES: Size[] = [128, 192, 256, 384, 512];

const EXAMPLES = [
  { label: "Website", value: "https://sounez.com" },
  { label: "Wi-Fi", value: "WIFI:T:WPA;S:MyNetwork;P:MyPassword;;" },
  { label: "Email", value: "mailto:hello@example.com" },
  { label: "Phone", value: "tel:+15550001234" },
  { label: "SMS", value: "sms:+15550001234?body=Hello!" },
];

export function QrCodeClient({ tool }: { tool: Tool }) {
  const [text, setText] = useState("https://sounez.com");
  const [dark, setDark] = useState("#111827");
  const [light, setLight] = useState("#ffffff");
  const [size, setSize] = useState<Size>(256);
  const canvas = useRef<HTMLCanvasElement>(null);
  const hasTrackedComplete = useRef(false);

  useToolView(tool);

  useEffect(() => {
    if (!canvas.current || !text) return;
    QRCode.toCanvas(canvas.current, text, {
      width: size,
      margin: 2,
      color: { dark, light },
    }).catch(() => {});
    if (!hasTrackedComplete.current) {
      trackToolComplete({ tool_slug: tool.slug, tool_name: tool.name, tool_category: tool.category, output_type: "qr_code" });
      hasTrackedComplete.current = true;
    }
  }, [text, dark, light, size, tool]);

  const download = () => {
    if (!canvas.current) return;
    const a = document.createElement("a");
    a.download = `qrcode-${size}x${size}.png`;
    a.href = canvas.current.toDataURL();
    a.click();
    toast.success("Download started", { description: `Saving as ${size}×${size}px PNG.` });
    trackDownloadResult({ tool_slug: tool.slug, result_type: "qr_code", file_type: "png" });
  };

  const copyDataUrl = () => {
    if (!canvas.current) return;
    navigator.clipboard.writeText(canvas.current.toDataURL()).then(() => {
      toast.success("Data URL copied");
      trackCopyResult({ tool_slug: tool.slug, result_type: "qr_code_data_url" });
    });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Paste any URL, text, Wi-Fi credentials, email or phone number and download a crisp PNG QR code. Free, no account needed, runs entirely in your browser."
      features={[
        { title: "Updates in real time", desc: "Type and watch the QR code change. No generate button needed." },
        { title: "Custom colors", desc: "Match your brand with custom foreground and background colors." },
        { title: "5 export sizes", desc: "From 128px to 512px. Pick a size for print or screen." },
        { title: "Private", desc: "Nothing is uploaded. The QR code is generated entirely in your browser." },
      ]}
      howTo={[
        "Type or paste your URL or text into the input. You can also click an example to try it.",
        "Adjust colors and size to match your use case.",
        "Click Download PNG to save your QR code.",
      ]}
      faqs={[
        { q: "Is the QR code free to use commercially?", a: "Yes. Use it on print materials, ads, merchandise, presentations or anywhere else." },
        { q: "Can I make a QR code for Wi-Fi?", a: "Yes. Use the format WIFI:T:WPA;S:NetworkName;P:Password;; and scan it to auto-connect on most devices." },
        { q: "What size should I use for print?", a: "For print, use 512px or larger. For digital use (emails, presentations), 256px is usually enough." },
        { q: "Can I change the QR code colors?", a: "Yes. Pick any foreground and background color. Keep strong contrast so scanners can read the code." },
        { q: "Does the QR code expire?", a: "No. QR codes created here are static and permanent. They work as long as the URL they point to is active." },
      ]}
      useCases={[
        { title: "Small businesses", desc: "Link menus, booking pages or social profiles to a printed QR code." },
        { title: "Event organizers", desc: "Add a QR code to flyers, badges or posters for quick RSVP or check-in." },
        { title: "Developers", desc: "Test deep links and URLs quickly on a physical device." },
        { title: "Educators", desc: "Share lesson materials or forms with a scannable code on slides." },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2 items-start">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label htmlFor="qr-text" className="mb-1.5 block text-sm font-medium">URL or text</label>
            <textarea
              id="qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Quick examples */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick examples</p>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setText(ex.value)}
                  className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium transition hover:border-primary/50 hover:bg-muted"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="qr-dark" className="mb-1.5 block text-sm font-medium">Foreground</label>
              <input
                id="qr-dark"
                type="color"
                value={dark}
                onChange={(e) => setDark(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
            <div>
              <label htmlFor="qr-light" className="mb-1.5 block text-sm font-medium">Background</label>
              <input
                id="qr-light"
                type="color"
                value={light}
                onChange={(e) => setLight(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-border"
              />
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="mb-2 text-sm font-medium">Export size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                    size === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={download}
              className="flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-pop transition hover:-translate-y-0.5 active:scale-95"
            >
              <Download className="h-4 w-4" /> Download PNG
            </button>
            <button
              onClick={copyDataUrl}
              className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted active:scale-95"
            >
              <Copy className="h-4 w-4" /> Copy data URL
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
          <div className="flex items-center justify-center rounded-2xl border border-border bg-background p-6">
            <canvas ref={canvas} style={{ width: 200, height: 200 }} />
          </div>
          <p className="text-xs text-muted-foreground">Export: {size}×{size}px</p>
        </div>
      </div>
    </ToolPageShell>
  );
}
