import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BLOG_POSTS } from "../data/blog";
import { TOOLS } from "../data/tools";

const prisma = new PrismaClient();
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function fileTimes(filePath: string): { createdAt: Date; updatedAt: Date } | null {
  try {
    const stat = fs.statSync(filePath);
    const updatedAt = stat.mtime;
    const createdAt = stat.birthtime && stat.birthtime.getTime() > 0 ? stat.birthtime : stat.ctime;
    return { createdAt, updatedAt };
  } catch {
    return null;
  }
}

function resolveToolFile(slug: string): string | null {
  const folder = path.join(root, "app", slug);
  if (fs.existsSync(folder)) {
    const client = fs.readdirSync(folder).find((f) => f.endsWith("Client.tsx"));
    if (client) return path.join(folder, client);
    const page = path.join(folder, "page.tsx");
    if (fs.existsSync(page)) return page;
  }
  const toolsPage = path.join(root, "app", "tools", slug, "page.tsx");
  if (fs.existsSync(toolsPage)) return toolsPage;
  return null;
}

async function seedContentMeta() {
  const migrationDate = new Date();

  for (const tool of TOOLS) {
    const file = resolveToolFile(tool.slug);
    const times = file ? fileTimes(file) : null;
    const createdAt = times?.createdAt ?? migrationDate;
    const updatedAt = times?.updatedAt ?? migrationDate;

    await prisma.contentMeta.upsert({
      where: { contentType_slug: { contentType: "tool", slug: tool.slug } },
      create: {
        contentType: "tool",
        slug: tool.slug,
        title: tool.name,
        createdAt,
        updatedAt,
      },
      update: { title: tool.name, updatedAt },
    });
  }

  for (const post of BLOG_POSTS) {
    const blogPage = path.join(root, "app", "blog", post.slug, "page.tsx");
    const times = fs.existsSync(blogPage) ? fileTimes(blogPage) : null;
    const createdAt = times?.createdAt ?? migrationDate;
    const updatedAt = times?.updatedAt ?? migrationDate;

    await prisma.contentMeta.upsert({
      where: { contentType_slug: { contentType: "blog", slug: post.slug } },
      create: {
        contentType: "blog",
        slug: post.slug,
        title: post.title,
        createdAt,
        updatedAt,
      },
      update: { title: post.title, updatedAt },
    });
  }

  const staticPages: { slug: string; title: string; file: string }[] = [
    { slug: "home", title: "Sounez Home", file: "app/page.tsx" },
    { slug: "about", title: "About Sounez", file: "app/about/page.tsx" },
    { slug: "contact", title: "Contact", file: "app/contact/page.tsx" },
    { slug: "privacy-policy", title: "Privacy Policy", file: "app/privacy-policy/page.tsx" },
    { slug: "terms-of-service", title: "Terms of Service", file: "app/terms-of-service/page.tsx" },
    { slug: "cookie-policy", title: "Cookie Policy", file: "app/cookie-policy/page.tsx" },
    { slug: "dmca", title: "DMCA / Copyright", file: "app/dmca/page.tsx" },
    { slug: "smart-packs", title: "Smart Packs", file: "app/smart-packs/page.tsx" },
  ];

  for (const page of staticPages) {
    const fp = path.join(root, page.file);
    const times = fs.existsSync(fp) ? fileTimes(fp) : null;
    const createdAt = times?.createdAt ?? migrationDate;
    const updatedAt = times?.updatedAt ?? migrationDate;
    await prisma.contentMeta.upsert({
      where: { contentType_slug: { contentType: "page", slug: page.slug } },
      create: {
        contentType: "page",
        slug: page.slug,
        title: page.title,
        createdAt,
        updatedAt,
      },
      update: { title: page.title, updatedAt },
    });
  }

  const packs = [
    { slug: "social-media-pack", title: "Social Media Pack" },
    { slug: "product-listing-pack", title: "Product Listing Pack" },
    { slug: "seo-image-pack", title: "SEO Image Pack" },
  ];
  for (const pack of packs) {
    const fp = path.join(root, "app", "smart-packs", pack.slug, "page.tsx");
    const times = fs.existsSync(fp) ? fileTimes(fp) : null;
    const createdAt = times?.createdAt ?? migrationDate;
    const updatedAt = times?.updatedAt ?? migrationDate;
    await prisma.contentMeta.upsert({
      where: { contentType_slug: { contentType: "smart_pack", slug: pack.slug } },
      create: {
        contentType: "smart_pack",
        slug: pack.slug,
        title: pack.title,
        createdAt,
        updatedAt,
      },
      update: { title: pack.title, updatedAt },
    });
  }
}

async function main() {
  await seedContentMeta();
  console.log("Seeded ContentMeta for tools, blog posts, pages, and smart packs.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
