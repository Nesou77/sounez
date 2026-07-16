import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug, TOOLS } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
import { ToolJsonLd } from "@/components/ToolJsonLd";
import { getToolEditorial } from "@/lib/tool-editorial";
import { getContentDates, formatContentDate } from "@/lib/content-meta";
import { ToolClientRenderer } from "./ToolClientRenderer";
import { ToolPageSections } from "@/components/ToolPageSections";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) return { title: "Tool not found", robots: { index: false, follow: true } };

  const base = toolMetadata(tool, {
    title: tool.seoTitle,
    description: tool.seoDescription,
  });

  if (tool.ogTitle || tool.ogDescription) {
    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        ...(tool.ogTitle ? { title: tool.ogTitle } : {}),
        ...(tool.ogDescription ? { description: tool.ogDescription } : {}),
      },
    };
  }

  return base;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();

  const editorial = getToolEditorial(slug);

  const rawDates = await getContentDates("tool", slug);
  const dates = rawDates
    ? {
        createdDisplay: formatContentDate(rawDates.createdAt),
        createdIso: rawDates.createdAt.toISOString(),
        ...(rawDates.updatedAt.getTime() > rawDates.createdAt.getTime()
          ? {
              updatedDisplay: formatContentDate(rawDates.updatedAt),
              updatedIso: rawDates.updatedAt.toISOString(),
            }
          : {}),
      }
    : null;

  return (
    <>
      <ToolJsonLd tool={tool} faqs={editorial.faqs} />
      <ToolClientRenderer slug={slug} tool={tool} dates={dates} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ToolPageSections tool={tool} />
      </div>
    </>
  );
}
