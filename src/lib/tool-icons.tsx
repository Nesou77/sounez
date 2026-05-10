import {
  Youtube,
  DollarSign,
  Hash,
  Palette,
  Blend,
  QrCode,
  FileText,
  KeyRound,
  CaseSensitive,
  ImageDown,
  Rocket,
  Brush,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const TOOL_ICONS: Record<string, LucideIcon> = {
  "youtube-tags-generator": Youtube,
  "tiktok-money-calculator": DollarSign,
  "hashtag-generator": Hash,
  "color-palette-generator": Palette,
  "css-gradient-generator": Blend,
  "qr-code-generator": QrCode,
  "word-counter": FileText,
  "password-generator": KeyRound,
  "text-case-converter": CaseSensitive,
  "image-compressor": ImageDown,
};

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "creator-tools": Rocket,
  "design-tools": Brush,
  "utility-tools": Wrench,
};

export function getToolIcon(slug: string): LucideIcon {
  return TOOL_ICONS[slug] ?? Wrench;
}

export function getCategoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Wrench;
}
