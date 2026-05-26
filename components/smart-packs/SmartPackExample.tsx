import type { SmartPackDefinition } from "@/data/smartPacks";

export function SmartPackExample({ pack }: { pack: SmartPackDefinition }) {
  return (
    <section className="rounded-2xl border border-border bg-muted/30 p-6">
      <h2 className="text-lg font-bold">Example output</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Sample structure — your generated pack will match your brief.
      </p>
      <div className="mt-4 space-y-4">
        {pack.exampleOutput.map((ex) => (
          <div key={ex.label} className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{ex.label}</div>
            <p className="mt-2 text-sm leading-relaxed">{ex.sample}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
