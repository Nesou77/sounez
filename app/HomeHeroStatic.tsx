/**
 * Server component - renders the static hero content without client-side state.
 * This improves LCP by allowing the hero to render instantly on the server.
 */
import { SmartLink as Link } from "@/components/smart-link";
import { ArrowRight, Sparkles, Zap, Shield, Heart } from "lucide-react";

export function HomeHeroStatic() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 -z-10 h-[28rem] w-[70rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-25 blur-3xl hidden sm:block" />
      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <span className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-soft backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Free tools that actually work.
        </span>
        <h1 className="animate-slide-up mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Free online tools for{" "}
          <span className="text-gradient-brand">creators</span>, designers <br className="hidden sm:block" />
          &amp; everyday productivity
        </h1>
        <p className="animate-slide-up delay-75 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          No account needed. No installs. Open a tool and use it. Everything runs in your browser and it's all free.
        </p>

        <div className="animate-slide-up delay-150 mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
          >
            Explore all tools
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#popular"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-muted"
          >
            See popular
          </a>
        </div>

        <div className="animate-fade-in delay-300 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Lightning fast
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Private &amp; secure
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> 100% free, forever
          </span>
        </div>
      </div>
    </section>
  );
}
