/** Google reCAPTCHA v3 (standard) globals — loaded async from `/api.js?render=` */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export {};
