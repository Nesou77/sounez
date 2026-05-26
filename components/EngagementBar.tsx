"use client";

import { useState } from "react";
import { Heart, Share2, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { trackShare } from "@/lib/analytics";
import { parseEngagementSlug } from "@/lib/engagement-slug";
import { useLikes } from "@/lib/use-likes";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.554-5.338 11.89-11.893 11.89a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.514 5.26l-.999 3.648 3.974-1.041zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.52 7.45L22.5 22h-6.86l-4.6-6.02L5.7 22H3l7.04-8.04L1.5 2h7.05l4.16 5.5L18.244 2zm-1.2 18h1.62L7.05 4h-1.7l11.694 16z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 5 3.66 9.15 8.44 9.93v-7.02H7.9v-2.91h2.4V9.85c0-2.37 1.41-3.68 3.57-3.68 1.04 0 2.13.18 2.13.18v2.34h-1.2c-1.18 0-1.55.74-1.55 1.5v1.8h2.64l-.42 2.91h-2.22V22c4.78-.78 8.44-4.93 8.44-9.93z" />
    </svg>
  );
}

export function EngagementBar({
  slug,
  title,
  className,
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { contentType, slug: itemSlug } = parseEngagementSlug(slug);
  const { count, liked, pulse, toggleLike, loading } = useLikes(contentType, itemSlug);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-2.5 shadow-soft backdrop-blur",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => void toggleLike()}
        disabled={loading}
        aria-pressed={liked}
        aria-label={liked ? "Remove helpful vote" : "Mark this page as helpful"}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition active:scale-95 disabled:opacity-60",
          liked
            ? "border-[#ed4956]/50 bg-[#ed4956]/10 text-[#ed4956] shadow-[0_0_0_3px_rgba(237,73,86,0.08)]"
            : "border-border bg-background hover:border-[#ed4956]/50 hover:bg-[#ed4956]/5 hover:text-[#ed4956]",
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            liked && "fill-[#ed4956] text-[#ed4956]",
            pulse && "scale-150",
            !liked && "group-hover:scale-110",
          )}
          aria-hidden="true"
        />
        {count !== null && count > 0 && (
          <span className="tabular-nums">{count}</span>
        )}
        <span className="hidden sm:inline">{liked ? "Helpful ✓" : "Helpful"}</span>
      </button>

      <ShareButton title={title} shareToolSlug={slug} />
    </div>
  );
}

export function ShareButton({
  title,
  className,
  shareToolSlug,
}: {
  title: string;
  className?: string;
  shareToolSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  const shareContext = shareToolSlug
    ? {
        content_type: (shareToolSlug.startsWith("blog:") ? "blog" : "tool") as "tool" | "blog",
        item_id: shareToolSlug.startsWith("blog:") ? shareToolSlug.slice(5) : shareToolSlug.replace(/^tool:/, ""),
      }
    : null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied ✔");
      setTimeout(() => setCopied(false), 1500);
      if (shareContext) trackShare({ ...shareContext, method: "copy_link" });
    } catch {
      toast.error("Could not copy link");
    }
  };

  const openShare = (href: string, method: string) => {
    if (shareContext) trackShare({ ...shareContext, method });
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=520");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Share"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition hover:border-primary/50 hover:text-primary active:scale-95",
            className,
          )}
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>Share</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-64 origin-top animate-in fade-in-0 zoom-in-95 p-2"
      >
        <button
          type="button"
          onClick={copyLink}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-brand text-primary-foreground">
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </span>
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={() => openShare(`https://wa.me/?text=${shareText}%20${shareUrl}`, "whatsapp")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#25D366] text-white">
            <WhatsAppIcon className="h-4 w-4" />
          </span>
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() =>
            openShare(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, "twitter")
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-background">
            <XIcon className="h-4 w-4" />
          </span>
          X (Twitter)
        </button>
        <button
          type="button"
          onClick={() =>
            openShare(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "facebook")
          }
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-[#1877F2] text-white">
            <FacebookIcon className="h-4 w-4" />
          </span>
          Facebook
        </button>
      </PopoverContent>
    </Popover>
  );
}
