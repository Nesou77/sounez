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

  return (
    <Link
      href="/"
      className="flex min-h-0 shrink-0 items-center outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
    >
      <Image
        src="/logo.webp"
        alt="Sounez"
        width={isNav ? 216 : 560}
        height={isNav ? 54 : 140}
        className={imgClass}
        sizes={
          isNav
            ? /* Match max rendered width + room for DPR (avoids oversized 384w on phones) */
              "(max-width: 639px) 168px, (max-width: 1023px) 184px, 208px"
            : "(max-width: 639px) min(280px, 88vw), (max-width: 1023px) min(300px, 92vw), min(380px, 72vw)"
        }
        quality={isNav ? 82 : 90}
        priority={isNav}
        fetchPriority={isNav ? "high" : "low"}
        decoding="async"
        loading={isNav ? "eager" : "lazy"}
      />
    </Link>
  );
}
