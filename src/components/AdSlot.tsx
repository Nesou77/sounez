export function AdSlot({ label = "Advertisement", className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-xs uppercase tracking-wider text-muted-foreground ${className}`}
      aria-label="ad slot"
    >
      {label}
    </div>
  );
}
