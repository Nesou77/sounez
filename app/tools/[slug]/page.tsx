import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { toolBySlug, TOOLS } from "@/data/tools";
import { toolMetadata } from "@/lib/tool-metadata";
import { ToolJsonLd } from "@/components/ToolJsonLd";
import { ToolClientRenderer } from "./ToolClientRenderer";

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
  if (!tool) return {};

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

  return (
    <>
      <ToolJsonLd tool={tool} />
      <ToolClientRenderer slug={slug} tool={tool} />
    </>
  );
}
