import { SmartLink as Link } from "@/components/smart-link";
import { Wrench } from "lucide-react";

export function SmartPackRelatedTools({
  tools,
}: {
  tools: { href: string; label: string }[];
}) {
  if (tools.length === 0) return null;
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center gap-2">
        <Wrench className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-bold">Related tools</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Use these Sounez tools to refine individual assets after your pack is generated.
      </p>
      <ul className="mt-4 space-y-2">
        {tools.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="text-sm font-medium text-primary hover:underline">
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
