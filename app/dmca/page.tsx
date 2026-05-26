import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const pageUrl = `${getSiteUrl()}/dmca`;

export const metadata: Metadata = {
  title: "DMCA / Copyright | Sounez",
  description: "Copyright policy and takedown process for Sounez.",
  alternates: { canonical: pageUrl },
};

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">DMCA / Copyright</h1>
      <p className="mt-4 text-muted-foreground">
        Sounez respects intellectual property rights. Only upload or convert files you own or have permission to use.
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-bold text-foreground">Your responsibility</h2>
          <p className="mt-2">
            You must not use Sounez tools to process, convert, describe, or distribute content that infringes copyright,
            trademark, or other rights of others.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">Report infringement</h2>
          <p className="mt-2">
            To report copyright infringement, email{" "}
            <a href="mailto:hello@sounez.com" className="font-medium text-primary hover:underline">
              hello@sounez.com
            </a>{" "}
            with:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Identification of the copyrighted work</li>
            <li>URL or description of the infringing material on Sounez</li>
            <li>Your contact information</li>
            <li>A statement of good-faith belief that use is not authorized</li>
            <li>A statement that the information is accurate and you are authorized to act</li>
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-foreground">Takedown process</h2>
          <p className="mt-2">
            We review valid notices promptly and may remove or disable access to reported content. Repeat infringers may
            have access restricted.
          </p>
        </section>
      </div>
    </div>
  );
}
