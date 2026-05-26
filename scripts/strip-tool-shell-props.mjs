import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app");

function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (name.name.endsWith("Client.tsx")) fix(p);
  }
}

function fix(file) {
  let c = fs.readFileSync(file, "utf8");
  if (!c.includes("<ToolPageShell")) return;
  const next = c.replace(
    /<ToolPageShell\s+tool=\{tool\}[\s\S]*?>\s*\n(\s*<)/,
    "<ToolPageShell tool={tool}>\n$1",
  );
  if (next !== c) {
    fs.writeFileSync(file, next);
    console.log("updated", path.relative(root, file));
  }
}

walk(root);
