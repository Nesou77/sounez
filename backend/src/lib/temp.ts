/**
 * Temp-file helpers.
 *
 * All conversion jobs write to a unique sub-directory under TEMP_DIR
 * (defaults to os.tmpdir()). The directory is deleted after the response
 * is sent, and a periodic sweep removes any orphaned directories older
 * than MAX_AGE_MS (default 10 min) in case a job crashed mid-flight.
 */

import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";

const BASE_DIR = process.env.TEMP_DIR?.trim() || os.tmpdir();
const JOB_PREFIX = "sounez-";
const MAX_AGE_MS = 10 * 60_000; // 10 minutes

/** Create a unique temp directory for one conversion job. */
export function createJobDir(): string {
  const dir = path.join(BASE_DIR, `${JOB_PREFIX}${uuidv4()}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Recursively delete a directory, silently ignoring errors. */
export function cleanupDir(dir: string): void {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    // best-effort
  }
}

/**
 * Schedule a periodic sweep that removes orphaned job directories
 * older than MAX_AGE_MS. Call once at server startup.
 */
export function scheduleTempCleanup(intervalMs: number): void {
  const sweep = () => {
    try {
      const entries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
      const now = Date.now();
      for (const entry of entries) {
        if (!entry.isDirectory() || !entry.name.startsWith(JOB_PREFIX)) continue;
        const full = path.join(BASE_DIR, entry.name);
        try {
          const stat = fs.statSync(full);
          if (now - stat.mtimeMs > MAX_AGE_MS) {
            fs.rmSync(full, { recursive: true, force: true });
          }
        } catch {
          // skip
        }
      }
    } catch {
      // skip if BASE_DIR is unreadable
    }
  };

  setInterval(sweep, intervalMs);
}
