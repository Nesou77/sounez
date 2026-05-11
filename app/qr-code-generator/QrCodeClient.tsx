"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import { toolBySlug } from "@/data/tools";

const tool = toolBySlug("qr-code-generator")!;

export function QrCodeClient() {
  const [text, setText] = useState("https://sounez.com");
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current && text) {
      QRCode.toCanvas(canvas.current, text, { width: 256, margin: 2, color: { dark: "#111827", light: "#ffffff" } });
    }
  }, [text]);

  const download = () => {
    if (!canvas.current) return;
    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = canvas.current.toDataURL();
    a.click();
    toast.success("Download started", { description: "Your QR code is saving as PNG." });
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Paste a URL or any text and get a high-resolution QR code you can download and use anywhere. Free, no account needed."
      features={[
        { title: "Updates in real time", desc: "Type and watch the QR code change as you go." },
        { title: "High resolution", desc: "Downloads as a crisp 256x256 PNG that prints cleanly." },
        { title: "Private", desc: "Everything runs in your browser. Nothing is uploaded." },
      ]}
      howTo={["Type or paste your URL or text into the input.", "Your QR code appears instantly on the right.", "Click Download PNG to save it."]}
      faqs={[
        { q: "Is the QR code free to use commercially?", a: "Yes. Use it anywhere you like, including print materials and ads." },
        { q: "Does it work for Wi-Fi or vCards?", a: "Right now it is optimized for URLs and plain text. More formats are coming." },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2 items-center">
        <div>
          <label className="text-sm font-medium">URL or text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button onClick={download} className="mt-3 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-pop">Download PNG</button>
        </div>
        <div className="flex justify-center rounded-2xl border border-border bg-background p-6">
          <canvas ref={canvas} />
        </div>
      </div>
    </ToolPageShell>
  );
}
