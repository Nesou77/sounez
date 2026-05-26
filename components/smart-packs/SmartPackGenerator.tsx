"use client";

import { useState } from "react";
import type { SmartPackDefinition } from "@/data/smartPacks";
import type { SmartPackOutput } from "@/lib/smart-packs/schemas";
import { SmartPackForm, type SmartPackFormValues } from "./SmartPackForm";
import { SmartPackResult } from "./SmartPackResult";
import { trackSmartPackGenerated, trackSmartPackStarted } from "@/lib/analytics";
import { toast } from "sonner";

export function SmartPackGenerator({ pack }: { pack: SmartPackDefinition }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<SmartPackOutput | null>(null);
  const [createdAt, setCreatedAt] = useState<string | undefined>();
  const [started, setStarted] = useState(false);

  const onSubmit = async (values: SmartPackFormValues) => {
    if (!started) {
      trackSmartPackStarted({ pack_slug: pack.slug });
      setStarted(true);
    }
    setLoading(true);
    setError(null);
    try {
      const body = {
        packSlug: pack.slug,
        ...values,
        websiteUrl: values.websiteUrl?.trim() || undefined,
      };
      const res = await fetch("/api/smart-packs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg =
          data.error ??
          "We could not generate this pack. Please simplify your brief or try again.";
        setError(msg);
        toast.error(msg);
        return;
      }
      setOutput(data.output as SmartPackOutput);
      setCreatedAt(data.createdAt);
      trackSmartPackGenerated({ pack_slug: pack.slug });
      toast.success("Your Smart Pack is ready.");
    } catch {
      const msg = "Network error. Check your connection and try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <SmartPackForm pack={pack} onSubmit={onSubmit} loading={loading} />

      {!output && !loading && !error && (
        <p className="text-center text-sm text-muted-foreground">
          Fill in the form to generate your first Smart Pack.
        </p>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
          {error}
        </div>
      )}

      {output && <SmartPackResult packSlug={pack.slug} output={output} createdAt={createdAt} />}
    </div>
  );
}
