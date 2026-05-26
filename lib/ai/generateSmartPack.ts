import { env } from "@/lib/env";
import { callGeminiJsonRequired } from "@/lib/ai";
import type { SmartPackGenerateRequest } from "@/lib/smart-packs/schemas";
import { parsePackOutput } from "@/lib/smart-packs/schemas";
import { collectInputText, checkSmartPackSafety } from "@/lib/smart-packs/safety";

export type GenerateSmartPackResult =
  | { ok: true; output: ReturnType<typeof parsePackOutput> }
  | { ok: false; error: string; code?: "AI_UNAVAILABLE" | "SAFETY" | "PARSE_FAILED" };

function languageLabel(code: string): string {
  const map: Record<string, string> = { en: "English", fr: "French", ar: "Arabic", es: "Spanish" };
  return map[code] ?? "English";
}

function buildUserContext(input: SmartPackGenerateRequest): string {
  const lines: string[] = [
    `Language: ${languageLabel(input.language)}`,
    `Tone: ${input.tone}`,
    `Brief: ${input.brief}`,
  ];
  const optional: [string, string | undefined][] = [
    ["Audience", input.audience],
    ["Platform", input.platform],
    ["Goal", input.goal],
    ["Keywords", input.keywords],
    ["Extra notes", input.extraNotes],
    ["Business type", input.businessType],
    ["Product name", input.productName],
    ["Category", input.category],
    ["Main benefits", input.mainBenefits],
    ["Target buyer", input.targetBuyer],
    ["Marketplace", input.marketplace],
    ["Image topic", input.imageTopic],
    ["Page topic", input.pageTopic],
    ["Target keyword", input.targetKeyword],
    ["Website niche", input.websiteNiche],
    ["Image purpose", input.imagePurpose],
    ["Image description", input.imageDescription],
    ["Business idea", input.businessIdea],
    ["Sector", input.sector],
    ["Location", input.location],
    ["Topic", input.topic],
    ["Subject", input.subject],
    ["Level", input.level],
    ["Study goal", input.studyGoal],
    ["Website URL", input.websiteUrl],
  ];
  for (const [label, value] of optional) {
    if (value?.trim()) lines.push(`${label}: ${value.trim()}`);
  }
  return lines.join("\n");
}

const SYSTEM_BASE = `You are a helpful assistant for Sounez, a free online tools website.
Return valid JSON only. No markdown fences. No extra keys outside the schema.
Do not generate harmful, illegal, sexually explicit, hateful, deceptive, or academic cheating content.
Write in the requested language. Be specific and practical, not generic marketing fluff.
Avoid canned marketing slogans, corporate filler, and broad claims that do not help the user.`;

const PACK_PROMPTS: Record<string, { schema: string; userSuffix: string }> = {
  "social-media-pack": {
    schema: `{
  "title": string,
  "caption": string,
  "firstComment": string,
  "hashtags": string[],
  "cta": string,
  "visualText": string,
  "imageIdea": string,
  "altText": string,
  "platformVariations": { "instagram"?: string, "facebook"?: string, "linkedin"?: string, "tiktok"?: string, "twitter"?: string },
  "postingTips": string[],
  "relatedTools": string[]
}`,
    userSuffix: "Adapt caption length to the primary platform. Include 8-15 relevant hashtags without spam.",
  },
  "product-listing-pack": {
    schema: `{
  "productTitle": string,
  "shortDescription": string,
  "longDescription": string,
  "bulletPoints": string[],
  "seoMetaTitle": string,
  "seoMetaDescription": string,
  "imageAltText": string,
  "socialCaption": string,
  "marketplaceTips": string[],
  "relatedTools": string[]
}`,
    userSuffix: "Bullets should be factual. Meta title under 60 chars, meta description under 160 chars when possible.",
  },
  "seo-image-pack": {
    schema: `{
  "seoFilename": string,
  "altText": string,
  "imageTitle": string,
  "imageCaption": string,
  "surroundingParagraph": string,
  "keywordSuggestions": string[],
  "compressionAdvice": string,
  "relatedImageIdeas": string[],
  "relatedTools": string[]
}`,
    userSuffix: "Filename lowercase with hyphens, no spaces. Alt text describes visible content only.",
  },
  "business-launch-pack": {
    schema: `{
  "businessNameIdeas": string[],
  "taglineIdeas": string[],
  "shortPitch": string,
  "homepageHeroText": string,
  "instagramBio": string,
  "linkedInIntro": string,
  "serviceDescriptions": string[],
  "firstPostIdeas": string[],
  "relatedTools": string[]
}`,
    userSuffix: "Provide 5 business name ideas and 3 taglines. Bios must fit typical character limits.",
  },
  "student-study-pack": {
    schema: `{
  "summary": string,
  "keyConcepts": string[],
  "flashcards": [{ "term": string, "definition": string }],
  "quizQuestions": [{ "question": string, "answer": string }],
  "revisionPlan": string[],
  "simpleExplanation": string,
  "commonMistakes": string[],
  "relatedTools": string[]
}`,
    userSuffix: "Provide 6-10 flashcards and 5 quiz questions. Educational tone only - do not help cheat on assignments.",
  },
};

function devFallbackOutput(slug: string, input: SmartPackGenerateRequest): unknown {
  const topic = input.brief.slice(0, 80);
  switch (slug) {
    case "social-media-pack":
      return {
        title: `Draft: ${topic}`,
        caption: `[Development sample] ${input.brief}\n\nEdit before posting.`,
        firstComment: "Add your link or CTA here.",
        hashtags: ["#draft", "#editme"],
        cta: "Learn more - link in bio.",
        visualText: "Short headline for image",
        imageIdea: "Photo that shows the offer clearly",
        altText: "Describe the actual photo when you upload it",
        platformVariations: { instagram: input.brief.slice(0, 200) },
        postingTips: ["Configure GEMINI_API_KEY for full AI output.", "Always verify facts before publishing."],
        relatedTools: ["/tools/ai-caption-generator", "/tools/hashtag-generator"],
      };
    case "product-listing-pack":
      return {
        productTitle: input.productName || topic,
        shortDescription: input.mainBenefits?.slice(0, 160) || input.brief.slice(0, 160),
        longDescription: input.brief,
        bulletPoints: ["Benefit one - edit", "Benefit two - edit", "Shipping - edit"],
        seoMetaTitle: (input.productName || topic).slice(0, 60),
        seoMetaDescription: input.brief.slice(0, 155),
        imageAltText: "Product photo - update to match your image",
        socialCaption: `Now available: ${input.productName || "our product"}. Link in bio.`,
        marketplaceTips: ["Compress images before upload.", "Match title length to your marketplace."],
        relatedTools: ["/tools/image-compressor", "/tools/image-describer"],
      };
    case "seo-image-pack":
      return {
        seoFilename: "sample-image-topic.webp",
        altText: "Update this to describe your real image",
        imageTitle: input.imageTopic || topic,
        imageCaption: input.brief.slice(0, 120),
        surroundingParagraph: input.brief,
        keywordSuggestions: input.targetKeyword ? [input.targetKeyword] : [],
        compressionAdvice: "Resize to display width and compress to WebP or JPG under 200 KB when possible.",
        relatedImageIdeas: ["Close-up detail shot", "Wide context shot"],
        relatedTools: ["/tools/image-compressor", "/tools/image-describer"],
      };
    case "business-launch-pack":
      return {
        businessNameIdeas: ["Sample Name Co", "Working Title LLC"],
        taglineIdeas: ["Clear tagline - edit", "Second option - edit"],
        shortPitch: input.brief,
        homepageHeroText: input.businessIdea?.slice(0, 200) || input.brief.slice(0, 200),
        instagramBio: "What you do - Who you help - Link",
        linkedInIntro: input.brief.slice(0, 260),
        serviceDescriptions: ["Service one - edit", "Service two - edit"],
        firstPostIdeas: ["Introduce what you do", "Share a customer problem you solve"],
        relatedTools: ["/tools/business-name-generator", "/tools/bio-generator"],
      };
    case "student-study-pack":
      return {
        summary: input.brief,
        keyConcepts: ["Concept 1 - verify in your materials", "Concept 2 - verify"],
        flashcards: [{ term: "Term", definition: "Definition - edit" }],
        quizQuestions: [{ question: "Sample question?", answer: "Sample answer - verify" }],
        revisionPlan: ["Day 1: Read summary", "Day 2: Flashcards", "Day 3: Practice quiz"],
        simpleExplanation: input.brief,
        commonMistakes: ["Trusting AI without checking your textbook"],
        relatedTools: ["/tools/study-notes-generator"],
      };
    default:
      return null;
  }
}

export async function generateSmartPack(input: SmartPackGenerateRequest): Promise<GenerateSmartPackResult> {
  const safety = checkSmartPackSafety(collectInputText(input as unknown as Record<string, unknown>));
  if (!safety.safe) {
    return { ok: false, error: safety.message, code: "SAFETY" };
  }

  const packPrompt = PACK_PROMPTS[input.packSlug];
  if (!packPrompt) {
    return { ok: false, error: "Unknown Smart Pack." };
  }

  if (!env.geminiApiKey) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        error: "AI generation is temporarily unavailable. Please try again later.",
        code: "AI_UNAVAILABLE",
      };
    }
    const fallback = devFallbackOutput(input.packSlug, input);
    const parsed = parsePackOutput(input.packSlug, fallback);
    if (!parsed) return { ok: false, error: "Could not build development sample.", code: "PARSE_FAILED" };
    return { ok: true, output: parsed };
  }

  const systemPrompt = `${SYSTEM_BASE}\nSchema:\n${packPrompt.schema}`;
  const userPrompt = `${buildUserContext(input)}\n\n${packPrompt.userSuffix}`;

  const raw = await callGeminiJsonRequired<unknown>({
    systemPrompt,
    userPrompt,
    maxOutputTokens: 2000,
  });

  if (!raw) {
    return {
      ok: false,
      error: "We could not generate this pack. Please simplify your brief or try again.",
      code: "PARSE_FAILED",
    };
  }

  const parsed = parsePackOutput(input.packSlug, raw);
  if (!parsed) {
    return {
      ok: false,
      error: "We could not generate this pack. Please simplify your brief or try again.",
      code: "PARSE_FAILED",
    };
  }

  return { ok: true, output: parsed };
}
