import type { ReactNode } from "react";

/**
 * A real, contextual blog image.
 * Use this instead of decorative gradient blocks — every illustration
 * must visually represent the surrounding content.
 */
export function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={1280}
          height={640}
          className="h-auto w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-border bg-muted/30 px-4 py-2.5 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Inline pull-quote for breaking long text. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 rounded-2xl border-l-4 border-primary bg-primary-soft/60 px-6 py-5 text-lg font-medium leading-relaxed text-foreground">
      {children}
    </blockquote>
  );
}
