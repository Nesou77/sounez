import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const toolsPath = path.join(root, "data/tools.ts");
let tools = fs.readFileSync(toolsPath, "utf8");
tools = tools.replace(
  /  views\?: number;\r?\n  likes\?: number;\r?\n  updatedAt\?: string;[^\n]*\r?\n/,
  "",
);
tools = tools.replace(/\r?\n\s*views: \d+,/g, "");
tools = tools.replace(/\r?\n\s*likes: \d+,/g, "");
tools = tools.replace(/\r?\n\s*updatedAt: "[^"]+",/g, "");
tools = tools.replace(/by views, then likes/, "by featured status");
fs.writeFileSync(toolsPath, tools);

const blogPath = path.join(root, "data/blog.ts");
let blog = fs.readFileSync(blogPath, "utf8");
blog = blog.replace(/import \{ sortBlogPostsByPopularity \} from "@\/lib\/popularity";\r?\n\r?\n/, "");
blog = blog.replace(/  date: string;\r?\n  updatedAt\?: string;\r?\n/, "");
blog = blog.replace(/  views\?: number;\r?\n  likes\?: number;\r?\n/, "");
blog = blog.replace(/const ENGAGEMENT[\s\S]*?^}\r?\n\r?\nfunction post[\s\S]*?^}\r?\n\r?\n/m, "");
blog = blog.replace(/\bpost\(/g, "(");
blog = blog.replace(/\r?\n\s*date: "[^"]+",/g, "");
blog = blog.replace(/\r?\n\s*updatedAt: "[^"]+",/g, "");
blog = blog.replace(
  /export const BLOG_POSTS = sortBlogPostsByPopularity\(BLOG_POSTS_RAW\);/,
  "export const BLOG_POSTS = [...BLOG_POSTS_RAW].sort((a, b) => a.title.localeCompare(b.title));",
);
blog = blog.replace(/sorted by popularity \(views, then likes\)/, "sorted alphabetically by title");
fs.writeFileSync(blogPath, blog);

console.log("Cleaned tools.ts and blog.ts");
