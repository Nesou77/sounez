"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "sonner";
import {
  trackSmartPackCopied,
  trackSmartPackExported,
} from "@/lib/analytics";

function flattenOutput(output: unknown): string {
  const lines: string[] = [];
  const walk = (obj: unknown, prefix = "") => {
    if (obj === null || obj === undefined) return;
    if (typeof obj === "string") {
      lines.push(prefix ? `${prefix}: ${obj}` : obj);
      return;
    }
    if (typeof obj === "number" || typeof obj === "boolean") {
      lines.push(`${prefix}: ${obj}`);
      return;
    }
    if (Array.isArray(obj)) {
      if (obj.every((x) => typeof x === "string")) {
        lines.push(`${prefix}:\n${obj.map((s) => `  - ${s}`).join("\n")}`);
        return;
      }
      obj.forEach((item, i) => walk(item, `${prefix}[${i}]`));
      return;
    }
    if (typeof obj === "object") {
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        const key = prefix ? `${prefix}.${k}` : k;
        walk(v, key);
      }
    }
  };
  walk(output);
  return lines.join("\n\n");
}

export function SmartPackExport({
  packSlug,
  output,
}: {
  packSlug: string;
  output: unknown;
}) {
  const [copied, setCopied] = useState(false);
  const text = flattenOutput(output);
  const json = JSON.stringify(output, null, 2);

  const copy = async (content: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success(`Copied ${label}`);
      trackSmartPackCopied({ pack_slug: packSlug, export_type: label });
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Download started");
    trackSmartPackExported({ pack_slug: packSlug, format: filename.endsWith(".json") ? "json" : "txt" });
  };

  const social = output as { caption?: string; hashtags?: string[] };
  const captionOnly =
    social.caption ??
    (output as { socialCaption?: string }).socialCaption ??
    "";

  const hashtagsOnly = Array.isArray(social.hashtags)
    ? social.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ")
    : "";

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => copy(text, "all")}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        Copy all
      </Button>
      {captionOnly && (
        <Button type="button" variant="outline" size="sm" onClick={() => copy(captionOnly, "caption")}>
          <Copy className="h-4 w-4" /> Copy caption
        </Button>
      )}
      {hashtagsOnly && (
        <Button type="button" variant="outline" size="sm" onClick={() => copy(hashtagsOnly, "hashtags")}>
          <Copy className="h-4 w-4" /> Copy hashtags
        </Button>
      )}
      <Button type="button" variant="outline" size="sm" onClick={() => download(text, `${packSlug}.txt`, "text/plain")}>
        <Download className="h-4 w-4" /> Download TXT
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => download(json, `${packSlug}.json`, "application/json")}>
        <Download className="h-4 w-4" /> Download JSON
      </Button>
    </div>
  );
}
