import { z } from "zod";
import { SMART_PACK_SLUGS } from "@/data/smartPacks";

export const smartPackGenerateRequestSchema = z.object({
  packSlug: z.enum(SMART_PACK_SLUGS),
  brief: z.string().min(10, "Brief must be at least 10 characters.").max(4000),
  language: z.enum(["en", "fr", "ar", "es"]).default("en"),
  tone: z
    .enum(["professional", "friendly", "luxury", "simple", "creative", "educational", "persuasive"])
    .default("friendly"),
  audience: z.string().max(500).optional(),
  platform: z.string().max(80).optional(),
  goal: z.string().max(500).optional(),
  keywords: z.string().max(500).optional(),
  extraNotes: z.string().max(2000).optional(),
  websiteUrl: z.string().url().max(500).optional().or(z.literal("")),
  imageDescription: z.string().max(2000).optional(),
  businessType: z.string().max(200).optional(),
  productName: z.string().max(200).optional(),
  category: z.string().max(200).optional(),
  mainBenefits: z.string().max(1500).optional(),
  targetBuyer: z.string().max(500).optional(),
  marketplace: z.string().max(80).optional(),
  imageTopic: z.string().max(500).optional(),
  pageTopic: z.string().max(500).optional(),
  targetKeyword: z.string().max(200).optional(),
  websiteNiche: z.string().max(300).optional(),
  imagePurpose: z.string().max(300).optional(),
  businessIdea: z.string().max(1500).optional(),
  sector: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  topic: z.string().max(1500).optional(),
  subject: z.string().max(200).optional(),
  level: z.string().max(100).optional(),
  studyGoal: z.string().max(500).optional(),
});

export type SmartPackGenerateRequest = z.infer<typeof smartPackGenerateRequestSchema>;

export const socialMediaPackOutputSchema = z.object({
  title: z.string(),
  caption: z.string(),
  firstComment: z.string(),
  hashtags: z.array(z.string()),
  cta: z.string(),
  visualText: z.string(),
  imageIdea: z.string(),
  altText: z.string(),
  platformVariations: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    tiktok: z.string().optional(),
    twitter: z.string().optional(),
  }),
  postingTips: z.array(z.string()),
  relatedTools: z.array(z.string()),
});

export const productListingPackOutputSchema = z.object({
  productTitle: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  bulletPoints: z.array(z.string()),
  seoMetaTitle: z.string(),
  seoMetaDescription: z.string(),
  imageAltText: z.string(),
  socialCaption: z.string(),
  marketplaceTips: z.array(z.string()),
  relatedTools: z.array(z.string()),
});

export const seoImagePackOutputSchema = z.object({
  seoFilename: z.string(),
  altText: z.string(),
  imageTitle: z.string(),
  imageCaption: z.string(),
  surroundingParagraph: z.string(),
  keywordSuggestions: z.array(z.string()),
  compressionAdvice: z.string(),
  relatedImageIdeas: z.array(z.string()),
  relatedTools: z.array(z.string()),
});

export const businessLaunchPackOutputSchema = z.object({
  businessNameIdeas: z.array(z.string()),
  taglineIdeas: z.array(z.string()),
  shortPitch: z.string(),
  homepageHeroText: z.string(),
  instagramBio: z.string(),
  linkedInIntro: z.string(),
  serviceDescriptions: z.array(z.string()),
  firstPostIdeas: z.array(z.string()),
  relatedTools: z.array(z.string()),
});

export const studentStudyPackOutputSchema = z.object({
  summary: z.string(),
  keyConcepts: z.array(z.string()),
  flashcards: z.array(z.object({ term: z.string(), definition: z.string() })),
  quizQuestions: z.array(z.object({ question: z.string(), answer: z.string() })),
  revisionPlan: z.array(z.string()),
  simpleExplanation: z.string(),
  commonMistakes: z.array(z.string()),
  relatedTools: z.array(z.string()),
});

export type SocialMediaPackOutput = z.infer<typeof socialMediaPackOutputSchema>;
export type ProductListingPackOutput = z.infer<typeof productListingPackOutputSchema>;
export type SeoImagePackOutput = z.infer<typeof seoImagePackOutputSchema>;
export type BusinessLaunchPackOutput = z.infer<typeof businessLaunchPackOutputSchema>;
export type StudentStudyPackOutput = z.infer<typeof studentStudyPackOutputSchema>;

export type SmartPackOutput =
  | SocialMediaPackOutput
  | ProductListingPackOutput
  | SeoImagePackOutput
  | BusinessLaunchPackOutput
  | StudentStudyPackOutput;

export function parsePackOutput(slug: string, data: unknown): SmartPackOutput | null {
  const parsers: Record<string, z.ZodType<SmartPackOutput>> = {
    "social-media-pack": socialMediaPackOutputSchema,
    "product-listing-pack": productListingPackOutputSchema,
    "seo-image-pack": seoImagePackOutputSchema,
    "business-launch-pack": businessLaunchPackOutputSchema,
    "student-study-pack": studentStudyPackOutputSchema,
  };
  const schema = parsers[slug];
  if (!schema) return null;
  const parsed = schema.safeParse(data);
  return parsed.success ? parsed.data : null;
}
