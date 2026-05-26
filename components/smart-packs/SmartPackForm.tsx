"use client";

import { useState } from "react";
import type { SmartPackDefinition } from "@/data/smartPacks";
import type { SmartPackField } from "@/lib/smart-packs/field-types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export type SmartPackFormValues = Record<string, string>;

function defaultValues(pack: SmartPackDefinition): SmartPackFormValues {
  const v: SmartPackFormValues = {};
  for (const f of pack.fields) {
    if (f.type === "select" && f.options?.[0]) v[f.name] = f.options[0].value;
    else v[f.name] = "";
  }
  return v;
}

function FieldInput({
  field,
  value,
  onChange,
  error,
}: {
  field: SmartPackField;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const id = `sp-${field.name}`;
  if (field.type === "textarea") {
    return (
      <div>
        <Label htmlFor={id}>{field.label}</Label>
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className="mt-1.5"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : field.helpText ? `${id}-help` : undefined}
        />
        {field.helpText && (
          <p id={`${id}-help`} className="mt-1 text-xs text-muted-foreground">
            {field.helpText}
          </p>
        )}
        {error && (
          <p id={`${id}-err`} className="mt-1 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
  if (field.type === "select" && field.options) {
    return (
      <div>
        <Label htmlFor={id}>{field.label}</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id} className="mt-1.5" aria-invalid={!!error}>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p id={`${id}-err`} className="mt-1 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
  return (
    <div>
      <Label htmlFor={id}>{field.label}</Label>
      <Input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-1.5"
        aria-invalid={!!error}
      />
      {field.helpText && <p className="mt-1 text-xs text-muted-foreground">{field.helpText}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function SmartPackForm({
  pack,
  onSubmit,
  loading,
}: {
  pack: SmartPackDefinition;
  onSubmit: (values: SmartPackFormValues) => void;
  loading: boolean;
}) {
  const [values, setValues] = useState(() => defaultValues(pack));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (name: string, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    for (const f of pack.fields) {
      if (f.required && !values[f.name]?.trim()) {
        next[f.name] = `${f.label} is required.`;
      }
    }
    if (!values.brief?.trim() || values.brief.trim().length < 10) {
      next.brief = "Brief must be at least 10 characters.";
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div>
        <h2 className="text-lg font-bold">Generate your pack</h2>
        <p className="mt-1 text-sm text-muted-foreground">{pack.safetyNote}</p>
      </div>
      {pack.fields.map((f) => (
        <FieldInput
          key={f.name}
          field={f}
          value={values[f.name] ?? ""}
          onChange={(v) => set(f.name, v)}
          error={errors[f.name]}
        />
      ))}
      {pack.studyDisclaimer && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs leading-relaxed text-foreground/90">
          {pack.studyDisclaimer}
        </p>
      )}
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Creating your Smart Pack…
          </>
        ) : (
          "Generate Smart Pack"
        )}
      </Button>
    </form>
  );
}
