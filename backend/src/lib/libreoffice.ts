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
 *   4. /opt/libreoffice*/program/soffice  (manual install)
 *   5. soffice / libreoffice  (PATH fallback)
 */

import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { glob } from "fs/promises";

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

let _resolvedBin: string | null | undefined = undefined; // undefined = not yet checked

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

  // Try glob for manual installs like /opt/libreoffice7.6/program/soffice
  try {
    const matches: string[] = [];
    for await (const f of glob("/opt/libreoffice*/program/soffice")) {
      matches.push(f);
    }
    if (matches.length > 0) {
      _resolvedBin = matches[0];
      console.log(`[libreoffice] Found binary via glob: ${_resolvedBin}`);
      return _resolvedBin;
    }
  } catch {
    // glob not available or no matches
  }

  // PATH fallback — try running `soffice --version`
  for (const name of ["soffice", "libreoffice"]) {
    try {
      await execFileAsync(name, ["--version"], { timeout: 5000 });
      _resolvedBin = name;
      console.log(`[libreoffice] Found binary on PATH: ${name}`);
      return _resolvedBin;
    } catch {
      // not found
    }
  }

  _resolvedBin = null;
  console.warn("[libreoffice] LibreOffice binary not found.");
  return null;
}

// ── Conversion ────────────────────────────────────────────────────────────────

export type ConvertResult =
  | { ok: true; docxPath: string }
  | { ok: false; reason: "not_installed" | "encrypted" | "corrupt" | "no_text" | "timeout" | "unknown"; message: string };

const CONVERSION_TIMEOUT_MS = 60_000; // 60 s

/**
 * Convert a PDF file to DOCX using LibreOffice headless.
 *
 * @param pdfPath   Absolute path to the input PDF file.
 * @param outDir    Directory where LibreOffice will write the output DOCX.
 * @returns         ConvertResult — either the path to the DOCX or an error descriptor.
 */
export async function convertWithLibreOffice(
  pdfPath: string,
  outDir: string,
): Promise<ConvertResult> {
  const bin = await findLibreOfficeBin();

  if (!bin) {
    return {
      ok: false,
      reason: "not_installed",
      message:
        "PDF conversion service is temporarily unavailable. Please try again later.",
    };
  }

  try {
    await execFileAsync(
      bin,
      [
        "--headless",
        "--norestore",
        "--nofirststartwizard",
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
          // Prevent LibreOffice from trying to open a display
          DISPLAY: "",
          HOME: outDir, // isolate user profile per job
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);

    if (msg.includes("ETIMEDOUT") || msg.includes("timed out")) {
      return {
        ok: false,
        reason: "timeout",
        message: "Conversion timed out. Try a smaller or simpler PDF.",
      };
    }

    // LibreOffice exits 0 even on some errors — check stderr for clues
    if (msg.toLowerCase().includes("encrypt") || msg.toLowerCase().includes("password")) {
      return {
        ok: false,
        reason: "encrypted",
        message: "This PDF is password-protected. Please remove the password and try again.",
      };
    }

    console.error("[libreoffice] execFile error:", msg);
    return {
      ok: false,
      reason: "unknown",
      message: "Conversion failed. Please try a different PDF.",
    };
  }

  // LibreOffice names the output file after the input basename
  const baseName = path.basename(pdfPath, path.extname(pdfPath));
  const docxPath = path.join(outDir, `${baseName}.docx`);

  if (!fs.existsSync(docxPath)) {
    // LibreOffice produced no output — likely a corrupt or image-only PDF
    return {
      ok: false,
      reason: "corrupt",
      message:
        "Could not convert this PDF. It may be corrupted, image-only, or in an unsupported format.",
    };
  }

  return { ok: true, docxPath };
}

/** Check whether LibreOffice is available (used by health endpoint). */
export async function isLibreOfficeAvailable(): Promise<boolean> {
  return (await findLibreOfficeBin()) !== null;
}
