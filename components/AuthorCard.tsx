import { SmartLink as Link } from "@/components/smart-link";

export function AuthorCard({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5">
        <div
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground shadow-pop"
        >
          N
        </div>
        <span className="text-sm font-medium text-foreground/80">Nesou</span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div
        aria-hidden
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-brand text-base font-bold text-primary-foreground shadow-pop"
      >
        N
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">Nesou</span>
          <span className="rounded-full border border-primary/30 bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
            Founder &amp; Creator
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Nesou is a developer and creator who built Sounez to make professional-grade tools free
          and accessible. The focus is on tools and guides that solve real tasks for creators,
          designers and makers — without unnecessary complexity or paywalls.{" "}
          <Link href="/about" className="font-medium text-primary hover:underline">
            About Sounez →
          </Link>
        </p>
      </div>
    </div>
  );
}
