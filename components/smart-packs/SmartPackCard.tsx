import { SmartLink as Link } from "@/components/smart-link";
import { ArrowRight, Layers } from "lucide-react";
import type { SmartPackDefinition } from "@/data/smartPacks";

export function SmartPackCard({ pack }: { pack: SmartPackDefinition }) {
  return (
    <Link
      href={`/smart-packs/${pack.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40"
    >
      <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-bold">{pack.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pack.shortDescription}</p>
      <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
        {pack.outputFields.slice(0, 4).map((g) => (
          <li key={g}>· {g}</li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Open pack <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
