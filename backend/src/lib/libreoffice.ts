/**
 * LibreOffice headless conversion helper.
 *
 * Converts a PDF file to DOCX using LibreOffice's --headless mode.
 * LibreOffice is installed in the Docker image via apt-get.
 *
 * Candidate binary paths (checked in order):
 *   1. LIBREOFFICE_PATH env var
 *   2. /usr/bin/libreoffice   (Debian/Ubuntu apt install)
 *   3. /usr/bin/soffice       (alternative symlink)
 *   4. /opt/libreofficeX/program/soffice  (manual install, X = version number)
 *   5. soffice / libreoffice  (PATH fallback)
 */

import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

// ── Binary resolution ─────────────────────────────────────────────────────────

const CANDIDATES = [
  process.env.LIBREOFFICE_PATH,
  "/usr/bin/libreoffice",
  "/usr/bin/soffice",
  "/usr/local/bin/soffice",
  "/usr/local/bin/libreoffice",
  "soffice",
  "libreoffice",
].filter(Boolean) as string[];

let _resolvedBin: string | null | undefined = undefined;

async function findLibreOfficeBin(): Promise<string | null> {
  if (_resolvedBin !== undefined) return _resolvedBin;

  // Check fixed paths first
  for (const candidate of CANDIDATES.filter((c) => c.startsWith("/"))) {
    if (fs.existsSync(candidate)) {
      _resolvedBin = candidate;
      console.log(`[libreoffice] Found binary at: ${candidate}`);
      return _resolvedBin;
    }
  }

  // Scan /opt for versioned installs like /opt/libreoffice7.6/program/soffice
  try {
    if (fs.existsSync("/opt")) {
      const optEntries = fs.readdirSync("/opt");
      for (const entry of optEntries) {
        if (!entry.startsWith("libreoffice")) continue;
        const candidate = path.join("/opt", entry, "program", "soffice");
        if (fs.existsSync(candidate)) {
          _resolvedBin = candidate;
          console.log(`[libreoffice] Found binary via /opt scan: ${candidate}`);
          return _resolvedBin;
        }
      }
    }
  } catch {
    // /opt not readable — skip
  }

  // PATH fallback — try running soffice --version
  for (const name of ["soffice", "libreoffice"]) {
    try {
      await execFileAsync(name, ["--version"], { timeout: 5000 });
      _resolvedBin = name;
      console.log(`[libreoffice] Found binary on PATH: ${name}`);
      return _resolvedBin;
    } catch {
      // not found on PATH
    }
  }

  _resolvedBin = null;
  console.warn("[libreoffice] LibreOffice binary not found.");
  return null;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type ConvertResult =
  | { ok: true; docxPath: string }
  | { ok: false; reason: "not_installed" | "encrypted" | "corrupt" | "no_text" | "timeout" | "unknown"; message: string };

export type ConvertOptions = {
  /**
   * When true, opens the PDF in LibreOffice Draw (--draw) instead of Writer.
   * Draw preserves the visual layout of each page as positioned drawing objects
   * (text boxes, shapes, images), at the cost of reflowable text.
   * Best for PDFs with complex columns, tables or fixed-position elements.
   *
   * When false (default), Writer is used. Text flows naturally and is fully
   * editable in Word, but complex layouts may be simplified.
   */
  preserveLayout?: boolean;
};

const CONVERSION_TIMEOUT_MS = parseInt(process.env.LIBREOFFICE_TIMEOUT_MS || "90000", 10);

// ── Main conversion ───────────────────────────────────────────────────────────

export async function convertWithLibreOffice(
  pdfPath: string,
  outDir: string,
  options: ConvertOptions = {},
): Promise<ConvertResult> {
  const { preserveLayout = false } = options;
  const bin = await findLibreOfficeBin();

  if (!bin) {
    return {
      ok: false,
      reason: "not_installed",
      message: "We could not process your PDF right now. Please try again in a moment.",
    };
  }

  // --draw: opens PDF in Draw mode. Content becomes positioned drawing objects
  //         (text boxes, shapes) that preserve the visual page layout exactly.
  //         Best for multi-column layouts, forms, and table-heavy PDFs.
  // --writer: opens PDF in Writer mode. Text flows as normal paragraphs and
  //           is fully editable in Word, but complex layouts may reflow.
  const componentFlag = preserveLayout ? "--draw" : "--writer";

  try {
    await execFileAsync(
      bin,
      [
        "--headless",
        "--norestore",
        "--nofirststartwizard",
        componentFlag,
        "--convert-to",
        "docx",
        "--outdir",
        outDir,
        pdfPath,
      ],
      {
        timeout: CONVERSION_TIMEOUT_MS,
        env: {
          ...process.env,
          DISPLAY: "",
          HOME: outDir,
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);

    if (msg.includes("ETIMEDOUT") || msg.includes("timed out")) {
      return {
        ok: false,
        reason: "timeout",
        message: "Your PDF took too long to process. Try a smaller file or split it into sections.",
      };
    }

    if (msg.toLowerCase().includes("encrypt") || msg.toLowerCase().includes("password")) {
      return {
        ok: false,
        reason: "encrypted",
        message: "This PDF is password-protected. Please unlock it and try again.",
      };
    }

    console.error("[libreoffice] execFile error:", msg);
    return {
      ok: false,
      reason: "unknown",
      message: "We could not read this PDF. Please try a different file.",
    };
  }

  const baseName = path.basename(pdfPath, path.extname(pdfPath));
  const docxPath = path.join(outDir, `${baseName}.docx`);

  if (!fs.existsSync(docxPath)) {
    return {
      ok: false,
      reason: "corrupt",
      message: "This PDF could not be converted. It may be image-only or in an unsupported format. Try enabling OCR.",
    };
  }

  return { ok: true, docxPath };
}

export async function isLibreOfficeAvailable(): Promise<boolean> {
  return (await findLibreOfficeBin()) !== null;
}
