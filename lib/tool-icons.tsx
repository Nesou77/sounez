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
  Captions,
  UserRound,
  Calculator,
  Building2,
  BookOpenCheck,
  Lightbulb,
  FileUser,
  ImageUp,
  Star,
  Shapes,
  Type,
  Image,
  Box,
  Grid3X3,
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
  "ai-caption-generator": Captions,
  "bio-generator": UserRound,
  "calculator": Calculator,
  "business-name-generator": Building2,
  "study-notes-generator": BookOpenCheck,
  "website-idea-generator": Lightbulb,
  "resume-generator": FileUser,
  "png-to-jpg-converter": ImageUp,
  "favicon-generator": Star,
  "svg-blob-generator": Shapes,
  "font-pairing-tool": Type,
  "image-placeholder-generator": Image,
  "box-shadow-generator": Box,
  "background-pattern-generator": Grid3X3,
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
