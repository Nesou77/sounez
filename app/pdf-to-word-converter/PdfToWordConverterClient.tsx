"use client";

import { useCallback, useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  RotateCcw,
  Shield,
  Loader2,
  Download,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";
import { useToolView } from "@/lib/use-tool-view";

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

type Stage = "idle" | "ready" | "processing" | "done" | "error";

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

const FAQS = [
  {
    q: "Is my PDF file uploaded to a server?",
    a: "Yes. Your PDF is securely transmitted over HTTPS to our conversion server, processed immediately, and deleted right after the DOCX is returned. We never store your documents.",
  },
  {
    q: "What does the DOCX output preserve?",
    a: "The converter preserves text, headings, paragraphs and basic formatting. Complex layouts, tables and images may require manual adjustment after conversion.",
  },
  {
    q: "What is the maximum file size?",
    a: `The tool supports PDF files up to ${MAX_FILE_SIZE_MB} MB. Larger documents may be split into multiple files before converting.`,
  },
  {
    q: "Does it support scanned PDFs?",
    a: "Scanned PDFs are image-based. Enable the OCR option to attempt text extraction from scanned pages. Results may vary depending on scan quality.",
  },
  {
    q: "Is the converter free?",
    a: "Yes, the PDF to Word converter is free with no account required.",
  },
  {
    q: "What browsers are supported?",
    a: "The tool works in all modern browsers: Chrome, Firefox, Safari and Edge.",
  },
];

export function PdfToWordConverterClient({ tool }: { tool: Tool }) {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [dragging, setDragging] = useState(false);
  const [preserveLayout, setPreserveLayout] = useState(true);
  const [extractImages, setExtractImages] = useState(false);
  const [useOcr, setUseOcr] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useToolView(tool);

  const accept = (f: File) => {
    if (!isPdf(f)) {
      toast.error("Please upload a PDF file (.pdf).");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setFile(f);
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

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setStage("idle");
    setDownloadUrl(null);
    setErrorMsg("");
  };

  const convert = async () => {
    if (!file) return;
    setStage("processing");
    setDownloadUrl(null);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("preserveLayout", String(preserveLayout));
      formData.append("useOcr", String(useOcr));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120_000); // 2 min

      let res: Response;
      try {
        res = await fetch("/api/pdf-to-word", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const raw = (data as { error?: string })?.error ?? "";
        const userMsg =
          raw &&
          !raw.toLowerCase().includes("internal") &&
          !raw.toLowerCase().includes("unexpected") &&
          raw.length < 300
            ? raw
            : "We could not convert this PDF. Please try a different file or try again later.";
        setErrorMsg(userMsg);
        setStage("error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStage("done");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setErrorMsg("Conversion is taking longer than expected. Try a smaller PDF or try again later.");
      } else {
        setErrorMsg("Could not reach the conversion service. Please check your connection and try again.");
      }
      setStage("error");
    }
  };

  const downloadFile = () => {
    if (!downloadUrl || !file) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = outputName;
    a.click();
  };

  const outputName = file ? file.name.replace(/\.pdf$/i, ".docx") : "document.docx";

  return (
    <ToolPageShell
      tool={tool}
      intro="Convert PDF files into editable Word documents. Upload your PDF, choose your conversion options, and get a clean DOCX file ready to edit in Microsoft Word or Google Docs."
      features={[
        { title: "Drag & Drop Upload", desc: "Drop your PDF directly onto the page or click to browse from your device." },
        { title: "PDF Validation", desc: "Validates file type and size before conversion starts, giving you clear error messages." },
        { title: "Conversion Options", desc: "Preserve layout, extract images and enable OCR for scanned documents." },
        { title: "Output Preview", desc: "See the output filename before you download so you know exactly what you'll get." },
        { title: "Privacy First", desc: "Files are processed securely and never stored after conversion." },
        { title: "Free & No Account", desc: "No sign-up or watermarks. Free to use with fair-use limits on server conversion." },
      ]}
      examples={[
        { title: "Contract redlines", desc: "Convert a text-based 12-page agreement PDF to DOCX, then track changes in Word." },
        { title: "Scanned invoice", desc: "Enable OCR on a phone-scanned PDF so line items become editable cells." },
        { title: "Course handout", desc: "Turn a lecture PDF into DOCX for students who need screen-reader friendly editing." },
      ]}
      mistakes={[
        "Expecting pixel-perfect tables from complex magazine layouts - plan manual cleanup.",
        "Uploading password-protected PDFs without unlocking them first.",
        "Using OCR on blurry scans - results will need heavy proofreading.",
      ]}
      privacyNote="Your PDF is sent securely to our conversion service, processed, and deleted after the DOCX is returned. We do not keep copies."
      whenNotToUse="Do not use for confidential legal filings or classified documents unless your organisation approves third-party processing."
      howTo={[
        "Click the upload area or drag and drop your PDF file onto it.",
        "Review the file name and size to confirm you selected the right document.",
        "Choose your conversion options: preserve layout, extract images, or use OCR for scanned PDFs.",
        "Click Convert to Word to start the conversion.",
        "Once ready, click Download DOCX to save your editable Word document.",
      ]}
      faqs={FAQS}
      useCases={[
        { title: "Students", desc: "Edit and annotate PDF lecture notes in Word or Google Docs." },
        { title: "Office workers", desc: "Turn received PDF reports into editable documents for updates." },
        { title: "Writers", desc: "Extract and continue writing from PDF manuscripts or drafts." },
        { title: "Freelancers", desc: "Convert client-sent PDFs into editable files for fast turnaround." },
      ]}
      proTips={[
        "Text-based PDFs convert with the highest accuracy. Scanned PDFs need OCR.",
        "Enable Preserve Layout for PDFs with columns, tables or complex formatting.",
        "For large PDFs, split them into chapters first for cleaner DOCX output.",
        "After conversion, run a spell-check in Word to catch any OCR errors.",
      ]}
    >
      {/* Upload zone */}
      {stage === "idle" && (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
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
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-soft text-primary ring-1 ring-primary/10">
            <Upload className="h-7 w-7" />
          </div>
          <div>
            <p className="text-base font-semibold">Drop your PDF here, or click to browse</p>
            <p className="mt-1 text-sm text-muted-foreground">
              PDF files only - maximum {MAX_FILE_SIZE_MB} MB
            </p>
          </div>
        </div>
      )}

      {/* File ready */}
      {(stage === "ready" || stage === "processing" || stage === "done" || stage === "error") && file && (
        <div className="space-y-5">
          {/* File card */}
          <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/40 p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-soft text-primary ring-1 ring-primary/10">
              <FileText className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{file.name}</p>
              <p className="text-sm text-muted-foreground">{fmtSize(file.size)}</p>
            </div>
            {stage === "ready" && (
              <button
                onClick={reset}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Options */}
          {stage === "ready" && (
            <div className="space-y-3 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold">Conversion options</p>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={preserveLayout}
                  onChange={(e) => setPreserveLayout(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">
                  <span className="font-medium">Preserve layout</span>
                  <span className="ml-1.5 text-muted-foreground">- keep columns, spacing and page structure</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={extractImages}
                  onChange={(e) => setExtractImages(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">
                  <span className="font-medium">Extract images</span>
                  <span className="ml-1.5 text-muted-foreground">- include embedded images in the DOCX</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={useOcr}
                  onChange={(e) => setUseOcr(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">
                  <span className="font-medium">OCR (scanned PDF)</span>
                  <span className="ml-1.5 text-muted-foreground">- extract text from image-based pages</span>
                </span>
              </label>
            </div>
          )}

          {/* Output name preview */}
          {stage === "ready" && (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
              <FileText className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">Output file:</span>
              <span className="font-mono font-medium">{outputName}</span>
            </div>
          )}

          {/* Convert button */}
          {stage === "ready" && (
            <button
              onClick={convert}
              className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
            >
              Convert to Word
            </button>
          )}

          {/* Processing */}
          {stage === "processing" && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-6 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Converting PDF to Word…</span>
            </div>
          )}

          {/* Error */}
          {stage === "error" && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive">Unable to convert</p>
                  <p className="mt-1 text-muted-foreground">{errorMsg}</p>
                </div>
              </div>
              <button
                onClick={() => setStage("ready")}
                className="w-full rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                Try Again
              </button>
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Convert another file
              </button>
            </div>
          )}

          {/* Done */}
          {stage === "done" && downloadUrl && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950/30">
                <FileText className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div className="text-sm">
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300">Conversion complete</p>
                  <p className="mt-0.5 text-emerald-700 dark:text-emerald-400">
                    Your Word document is ready to download.
                  </p>
                </div>
              </div>
              <button
                onClick={downloadFile}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-primary-foreground shadow-pop transition hover:opacity-90 active:scale-95"
              >
                <Download className="h-4 w-4" /> Download DOCX
              </button>
              <button
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-medium hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Convert another file
              </button>
            </div>
          )}
        </div>
      )}

      {/* Privacy notice */}
      <div className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>
          Your PDF is processed securely. Files are never stored on our servers and are deleted immediately after conversion.
        </span>
      </div>
    </ToolPageShell>
  );
}
