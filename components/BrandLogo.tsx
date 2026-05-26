import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";

type BrandLogoProps = {
  /** Navbar uses smaller lockup than footer for hierarchy */
  variant?: "navbar" | "footer";
};

export function BrandLogo({ variant = "navbar" }: BrandLogoProps) {
  const isNav = variant === "navbar";

  /* Navbar: taller within h-16 bar; capped width on small screens so hamburger nav clears */
  const imgClass = isNav
    ? "h-10 w-auto max-w-[min(168px,48vw)] object-contain object-left sm:max-w-[184px] md:h-11 md:max-w-[208px]"
    : "h-14 w-auto max-w-[min(280px,88vw)] object-contain object-left sm:h-16 sm:max-w-[300px] md:h-[5rem] md:max-w-[min(360px,90vw)] lg:max-w-[380px]";

  if (isNav) {
    return (
      <Link
        href="/"
        className="flex min-h-0 shrink-0 items-center outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
      >
        <Image
          src="/logo.webp"
          alt="Sounez"
          width={216}
          height={54}
          className={imgClass}
          /**
           * Accurate sizes so Next.js serves the smallest adequate variant.
           * Mobile: max 168px CSS -> 336px @2x -> use 384w bucket.
           * Tablet: max 184px CSS -> 368px @2x -> use 384w bucket.
           * Desktop: max 208px CSS -> 416px @2x -> use 432w (not available) -> 384w is fine.
           * All well under the 640w that was previously served.
           */
          sizes="(max-width: 639px) 168px, (max-width: 1023px) 184px, 208px"
          quality={75}
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="flex min-h-0 shrink-0 items-center outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
    >
      <Image
        src="/logo.webp"
        alt="Sounez"
        /**
         * Footer logo: displayed at ~280-380px CSS wide.
         * Use a smaller intrinsic width so Next.js doesn't generate a 640w variant.
         * 380px CSS x 2x DPR = 760px -> 768w bucket is the ceiling we need.
         * Setting width=380 keeps the aspect ratio correct and caps generation.
         */
        width={380}
        height={95}
        className={imgClass}
        sizes="(max-width: 639px) min(280px, 88vw), (max-width: 1023px) min(300px, 92vw), min(380px, 72vw)"
        quality={75}
        fetchPriority="low"
        decoding="async"
        loading="lazy"
      />
    </Link>
  );
}
