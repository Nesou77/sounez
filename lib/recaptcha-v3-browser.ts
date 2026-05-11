"use client";

import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-constants";

const SCRIPT_ID = "google-recaptcha-v3";

function resolveWhenReady(resolve: () => void) {
  window.grecaptcha?.ready(() => resolve());
}

export function loadRecaptchaV3(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("reCAPTCHA v3 runs in the browser only."));
      return;
    }

    const key = siteKey.trim();
    if (!key) {
      reject(new Error("Missing reCAPTCHA site key."));
      return;
    }

    if (window.grecaptcha?.execute) {
      resolveWhenReady(() => resolve());
      return;
    }

    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    const finishLoad = () => {
      resolveWhenReady(() => resolve());
    };

    if (el?.dataset.loaded === "true") {
      if (window.grecaptcha?.execute) finishLoad();
      else reject(new Error("reCAPTCHA failed to initialise."));
      return;
    }

    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
      el.async = true;
      el.defer = true;
      el.onload = () => {
        el!.dataset.loaded = "true";
        finishLoad();
      };
      el.onerror = () => reject(new Error("Could not load reCAPTCHA script."));
      document.head.appendChild(el);
      return;
    }

    el.addEventListener(
      "load",
      () => {
        el!.dataset.loaded = "true";
        finishLoad();
      },
      { once: true },
    );
    el.addEventListener(
      "error",
      () => reject(new Error("Could not load reCAPTCHA script.")),
      { once: true },
    );
  });
}

/**
 * Executes reCAPTCHA v3 for the contact form — no visible widget.
 * Call after mount only (e.g. on submit) to avoid SSR / hydration issues.
 */
export async function executeContactRecaptchaV3(siteKey: string): Promise<string> {
  const key = siteKey.trim();

  await loadRecaptchaV3(key);

  return new Promise((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(key, { action: RECAPTCHA_CONTACT_ACTION })
        .then(resolve)
        .catch(() => reject(new Error("Could not obtain reCAPTCHA token.")));
    });
  });
}
