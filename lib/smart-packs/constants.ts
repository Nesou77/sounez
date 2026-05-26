export const SMART_PACK_TONES = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "luxury", label: "Luxury" },
  { value: "simple", label: "Simple" },
  { value: "creative", label: "Creative" },
  { value: "educational", label: "Educational" },
  { value: "persuasive", label: "Persuasive" },
] as const;

export const SMART_PACK_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
  { value: "es", label: "Spanish" },
] as const;

export const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "X / Twitter" },
] as const;

export const MARKETPLACES = [
  { value: "shopify", label: "Shopify" },
  { value: "woocommerce", label: "WooCommerce" },
  { value: "etsy", label: "Etsy" },
  { value: "amazon", label: "Amazon-style" },
  { value: "local", label: "Local / other marketplace" },
] as const;

export type SmartPackTone = (typeof SMART_PACK_TONES)[number]["value"];
export type SmartPackLanguage = (typeof SMART_PACK_LANGUAGES)[number]["value"];
