import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog";
import { SMART_PACKS } from "@/data/smartPacks";
import { getSiteUrl } from "@/lib/site-url";

describe("app/sitemap", () => {
  it("includes the homepage as its own entry", async () => {
    const entries = await sitemap();
    expect(entries.some((e) => e.url === getSiteUrl())).toBe(true);
  });

  it("includes every required trust/legal page", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const path of ["/about", "/contact", "/privacy-policy", "/terms-of-service", "/cookie-policy", "/dmca", "/faq"]) {
      expect(urls.some((u) => u.endsWith(path))).toBe(true);
    }
  });

  it("includes a canonical entry for every tool", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const tool of TOOLS) {
      expect([...urls].some((u) => u.endsWith(`/tools/${tool.slug}`))).toBe(true);
    }
  });

  it("includes a canonical entry for every blog post", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const post of BLOG_POSTS) {
      expect([...urls].some((u) => u.endsWith(`/blog/${post.slug}`))).toBe(true);
    }
  });

  it("includes a canonical entry for every smart pack", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((e) => e.url));
    for (const pack of SMART_PACKS) {
      expect([...urls].some((u) => u.endsWith(`/smart-packs/${pack.slug}`))).toBe(true);
    }
  });

  it("never includes noindexed/private routes", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    for (const forbidden of ["/admin", "/api/", "/smart-packs/history"]) {
      expect(urls.some((u) => u.includes(forbidden))).toBe(false);
    }
  });

  it("produces no duplicate URLs", async () => {
    const entries = await sitemap();
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
