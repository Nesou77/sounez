import { describe, expect, it } from "vitest";
import { toolMetadata } from "./tool-metadata";
import { TOOLS } from "@/data/tools";

describe("toolMetadata", () => {
  const tool = TOOLS.find((t) => t.slug === "image-compressor")!;

  it("produces a canonical URL scoped to the tool slug", () => {
    const meta = toolMetadata(tool);
    expect(meta.alternates?.canonical).toContain(`/tools/${tool.slug}`);
  });

  it("falls back to the tool's own name and description when no overrides are given", () => {
    const meta = toolMetadata(tool);
    expect(meta.title).toBe(tool.name);
    expect(meta.description).toBe(tool.description);
  });

  it("applies title/description overrides", () => {
    const meta = toolMetadata(tool, { title: "Custom Title", description: "Custom description" });
    expect(meta.title).toBe("Custom Title");
    expect(meta.description).toBe("Custom description");
  });

  it("declares an Open Graph image with dimensions matching the real logo asset", () => {
    const meta = toolMetadata(tool);
    const images = meta.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : images;
    expect(image).toMatchObject({ width: 2288, height: 925 });
  });

  it("produces a unique canonical URL per tool (no duplicates across the catalog)", () => {
    const canonicals = TOOLS.map((t) => toolMetadata(t).alternates?.canonical);
    expect(new Set(canonicals).size).toBe(TOOLS.length);
  });
});
