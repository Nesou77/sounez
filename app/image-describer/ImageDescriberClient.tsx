"use client";

import { useCallback, useRef, useState } from "react";
import {
  Upload,
  X,
  RotateCcw,
  Shield,
  Copy,
  Check,
  Loader2,
  ImageIcon,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";
import { trackCopyResult } from "@/lib/analytics";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const ACCEPTED_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

type Stage = "idle" | "ready" | "generating" | "done" | "error";

type DescribeResult = {
  altText: string;
  shortCaption: string;
  detailedDescription: string;
  seoKeywords: string;
  socialCaption: string;
};
type Tone = "descriptive" | "accessibility" | "seo" | "social";

function isAccepted(file: File) {
  return ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXT.some((e) => file.name.toLowerCase().endsWith(e));
}

function fmtSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const TONES: { value: Tone; label: string; desc: string }[] = [
  { value: "descriptive", label: "Descriptive", desc: "Neutral, factual description" },
  { value: "accessibility", label: "Accessibility", desc: "Screen reader friendly alt text" },
  { value: "seo", label: "SEO-focused", desc: "Keyword-rich for search engines" },
  { value: "social", label: "Social media", desc: "Engaging caption for social posts" },
];

const FAQS = [
  {
    q: "What AI model powers the image descriptions?",
    a: "The tool uses a vision language model to analyse your image and generate contextually accurate descriptions, alt text and SEO keywords.",
  },
  {
    q: "Is my image sent to a server?",
    a: "Yes. Your image is sent securely over HTTPS and processed immediately. Images are never stored after the result is returned.",
  },
  {
    q: "What image formats are supported?",
    a: "PNG, JPG, JPEG, WEBP and GIF files up to 10 MB are supported.",
  },
  {
    q: "What is the difference between the tones?",
    a: "Descriptive gives a neutral factual description. Accessibility focuses on concise alt text for screen readers. SEO-focused generates keyword-rich descriptions. Social media creates engaging captions for Instagram or Twitter.",
  },
  {
    q: "Can I use the generated descriptions on my website?",
    a: "Yes. Generated content is yours to use freely on websites, in CMS platforms, in image alt attributes, or in social media posts.",
  },
  {
    q: "Is the tool free?",
    a: "Yes, the image describer is free with no account required.",
  },
];

function CopyButton({ text, label, toolSlug, resultType }: { text: string; label: string; toolSlug: string; resultType: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied`);
    trackCopyResult({ tool_slug: toolSlug, result_type: resultType });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ResultCard({
  label,
  value,
  toolSlug,
  resultType,
}: {
  label: string;
  value: string;
  toolSlug: string;
  resultType: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        {value && <CopyButton text={value} label={label} toolSlug={toolSlug} resultType={resultType} />}
      </div>
      <p className="text-sm leading-relaxed">{value || <span className="text-muted-foreground italic">—</span>}</p>
    </div>
  );
}

export function ImageDescriberClient({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);
  const [tone, setTone] = useState<Tone>("descriptive");
  const [result, setResult] = useState<DescribeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  const accept = (f: File) => {
    if (!isAccepted(f)) {
      toast.error("Please upload a PNG, JPG, JPEG, WEBP or GIF image.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      toast.error(`File too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setStage("ready");
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) accept(f);
    e.target.value = "";
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) accept(f);
  }, []);

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setStage("idle");
    setResult(null);
    setErrorMsg("");
  };

  const generate = async () => {
    if (!file) return;
    setStage("generating");
    setResult(null);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("tone", tone);

      const res = await fetch("/api/image-describe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStage("error");
        return;
      }

      setResult(data as DescribeResult);
      setStage("done");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStage("error");
    }
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="Upload an image and generate alt text, captions, SEO keywords and social media captions automatically. Choose a tone to get results optimised for accessibility, SEO or social media."
      features={[
        { title: "Alt Text Generator", desc: "Generate concise, descriptive alt text for screen readers and SEO." },
        { title: "Short Caption", desc: "Get a punchy one-line caption for social media or website thumbnails." },
        { title: "Detailed Description", desc: "Full scene description for content writers, designers or AI prompts." },
        { title: "SEO Keywords", desc: "Extract relevant search keywords from the visual content of your image." },
        { title: "Social Media Caption", desc: "Engaging caption with hashtags and call to action for Instagram or Twitter." },
        { title: "Tone Selector", desc: "Switch between descriptive, accessibility, SEO-focused and social media tones." },
      ]}
      howTo={[
        "Click the upload area or drag and drop your image onto the page.",
        "Choose a tone that matches your use case: accessibility, SEO, social media or neutral.",
        "Click Generate Description to start AI analysis.",
        "Review the results — alt text, caption, keywords and social media copy.",
        "Click Copy next to any result to copy it to your clipboard.",
      ]}
      faqs={FAQS}
      useCases={[
        { title: "Web developers", desc: "Generate accurate alt text for every image to improve accessibility and Core Web Vitals." },
        { title: "Content marketers", desc: "Get keyword-rich image descriptions for product pages, blog posts and landing pages." },
        { title: "Social media managers", desc: "Write engaging captions and hashtags from product or lifestyle photos instantly." },
        { title: "SEO specialists", desc: "Extract target keywords from images to inform alt tags and structured data." },
      ]}
      proTips={[
        "Use the Accessibility tone for alt text on informational images — it produces concise, screen-reader-friendly results.",
        "SEO-focused tone is best for product and category page images.",
        "Social tone generates captions with natural hashtag suggestions.",
        "For complex infographics, use Detailed Description to get a full text summary.",
      ]}
      examples={[
        { title: "Product photo", desc: "SEO tone on a stainless water bottle — alt text plus keyword list for a Shopify listing." },
        { title: "Team headshot", desc: "Accessibility tone for an about-page portrait — short, factual alt under 125 characters." },
        { title: "Event flyer", desc: "Social tone on a conference graphic — caption with CTA for LinkedIn." },
      ]}
      mistakes={[
        "Publishing AI alt text without checking it matches what is actually in the image.",
        "Uploading photos of people without consent or rights to process them.",
        "Stuffing keywords unnaturally — search engines and screen readers both suffer.",
      ]}
      privacyNote="Images are sent securely for AI vision analysis and are not stored after results are returned."
      whenNotToUse="Avoid uploading ID documents, medical scans, or other sensitive images you would not share with a third-party processor."
      {/* Upload zone */}
      {stage === "idle" && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-colors ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/40"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.gif,image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-soft text-primary ring-1 ring-primary/10">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-semibold">Drop your image here, or click to browse</p>
            <p className="mt-1 text-sm text-muted-foreground">
              PNG, JPG, JPEG, WEBP, GIF — maximum {MAX_FILE_SIZE_MB} MB
            </p>
          </div>
        </div>
      )}

      {/* Ready / generating / done */}
      {stage !== "idle" && file && (
        <div className="space-y-5">
          {/* Image preview */}
          <div className="flex gap-4">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between">
              <div className="min-w-0">
                <p className="truncate font-semibold">{file.name}</p>
                <p className="text-sm text-muted-foreground">{fmtSize(file.size)}</p>
              </div>
              {stage === "ready" && (
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 self-start rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  <X className="h-3.5 w-3.5" /> Remove
                </button>
              )}
            </div>
          </div>

          {/* Tone selector */}
          {(stage === "ready" || stage === "done") && (
            <div className="space-y-2">
              <p className="text-sm font-semibold">Tone</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TONES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTone(t.value)}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      tone === t.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <span className={`block font-semibold ${tone === t.value ? "text-primary" : ""}`}>{t.label}</span>
                    <span className="mt-0.5 text-muted-foreground">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate button */}
          {stage === "ready" && (
            <button
              onClick={generate}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
            >
              <Sparkles className="h-4 w-4" /> Generate Description
            </button>
          )}

          {/* Generating */}
          {stage === "generating" && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-8 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Analysing image with AI…</span>
            </div>
          )}

          {/* Error */}
          {stage === "error" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive">Unable to generate description</p>
                  <p className="mt-1 text-muted-foreground">{errorMsg}</p>
                </div>
              </div>
              <button
                onClick={() => setStage("ready")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                <Sparkles className="h-4 w-4" /> Try Again
              </button>
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <ImageIcon className="h-4 w-4" /> New image
              </button>
            </div>
          )}

          {/* Done — real results */}
          {stage === "done" && result && (
            <div className="space-y-4">
              <div className="space-y-3">
                <ResultCard label="Alt Text" value={result.altText} toolSlug={tool.slug} resultType="alt_text" />
                <ResultCard label="Short Caption" value={result.shortCaption} toolSlug={tool.slug} resultType="short_caption" />
                <ResultCard label="Detailed Description" value={result.detailedDescription} toolSlug={tool.slug} resultType="detailed_description" />
                <ResultCard label="SEO Keywords" value={result.seoKeywords} toolSlug={tool.slug} resultType="seo_keywords" />
                <ResultCard label="Social Media Caption" value={result.socialCaption} toolSlug={tool.slug} resultType="social_caption" />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setStage("ready"); setResult(null); }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-semibold hover:bg-muted"
                >
                  <RotateCcw className="h-4 w-4" /> Regenerate
                </button>
                <button
                  onClick={reset}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
                >
                  <ImageIcon className="h-4 w-4" /> New image
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>
          Your image is processed securely. Files are never stored on our servers after the results are returned.
        </span>
      </div>
    </ToolPageShell>
  );
}
