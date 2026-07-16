import { describe, expect, it } from "vitest";
import { generateMetadata } from "./page";

describe("tools/[slug] generateMetadata", () => {
  it("returns real metadata for a known tool slug", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "word-counter" }) });
    expect(meta.title).toBeTruthy();
    expect(meta.alternates?.canonical).toContain("/tools/word-counter");
  });

  it("returns a noindex fallback (not an empty object) for an unknown slug", async () => {
    const meta = await generateMetadata({ params: Promise.resolve({ slug: "does-not-exist" }) });
    expect(meta.title).toBeTruthy();
    expect(meta.robots).toMatchObject({ index: false });
  });
});
