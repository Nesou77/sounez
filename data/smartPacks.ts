import type { SmartPackField } from "@/lib/smart-packs/field-types";

export type SmartPackDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  tagline: string;
  summary: string;
  targetUsers: { title: string; desc: string }[];
  outputFields: string[];
  useCases: string[];
  fields: SmartPackField[];
  generates: string[];
  whoFor: { title: string; desc: string }[];
  workflow: string[];
  exampleOutput: { label: string; sample: string }[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  relatedTools: { href: string; label: string }[];
  relatedPack?: { href: string; label: string };
  safetyNote: string;
  seo: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  studyDisclaimer?: string;
};

const commonToneLanguage: SmartPackField[] = [
  {
    name: "tone",
    label: "Tone",
    type: "select",
    required: true,
    options: [
      { value: "professional", label: "Professional" },
      { value: "friendly", label: "Friendly" },
      { value: "luxury", label: "Luxury" },
      { value: "simple", label: "Simple" },
      { value: "creative", label: "Creative" },
      { value: "educational", label: "Educational" },
      { value: "persuasive", label: "Persuasive" },
    ],
  },
  {
    name: "language",
    label: "Language",
    type: "select",
    required: true,
    options: [
      { value: "en", label: "English" },
      { value: "fr", label: "French" },
      { value: "ar", label: "Arabic" },
      { value: "es", label: "Spanish" },
    ],
  },
];

export const SMART_PACKS: SmartPackDefinition[] = [
  {
    slug: "social-media-pack",
    name: "Social Media Pack",
    shortDescription: "One post brief -> caption, hashtags, CTA, and platform-ready copy.",
    longDescription:
      "Enter what you are posting about - a service, product, event, or tip. You get a structured pack with a title, caption, first comment, hashtags, visual text idea, and short versions for other platforms. Edit everything before you schedule.",
    tagline: "One post idea -> caption, tags, and comments ready to edit",
    summary:
      "Turn a short brief into post copy you can paste into Instagram, Facebook, LinkedIn, TikTok, or X. Sounez does not publish for you.",
    targetUsers: [
      { title: "Local businesses", desc: "Promote services, seasonal offers, and events with consistent copy." },
      { title: "Creators", desc: "Draft posts faster when you already know the photo or topic." },
      { title: "Freelancers", desc: "Send clients a first draft to refine together." },
    ],
    outputFields: [
      "Post title",
      "Caption",
      "First comment",
      "Hashtags",
      "CTA",
      "Visual text on image",
      "Image idea",
      "Alt text",
      "Platform variations",
      "Posting tips",
    ],
    useCases: [
      "Local business posts",
      "Service promotion",
      "Event announcement",
      "Holiday campaigns",
      "Product launch",
      "Educational tip posts",
    ],
    fields: [
      {
        name: "brief",
        label: "Post brief",
        type: "textarea",
        required: true,
        placeholder: "e.g. Instagram post for a cleaning company offering 20% off deep cleaning before a family gathering, moving day, seasonal refresh, or weekend home reset.",
        helpText: "What is the post about, who is it for, and any offer or deadline?",
      },
      {
        name: "businessType",
        label: "Business or page type",
        type: "text",
        placeholder: "e.g. Home cleaning service, bakery, coach",
      },
      {
        name: "platform",
        label: "Primary platform",
        type: "select",
        required: true,
        options: [
          { value: "instagram", label: "Instagram" },
          { value: "facebook", label: "Facebook" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "tiktok", label: "TikTok" },
          { value: "twitter", label: "X / Twitter" },
        ],
      },
      {
        name: "audience",
        label: "Audience",
        type: "text",
        placeholder: "e.g. Busy parents, renters, or new homeowners in your local area",
      },
      {
        name: "goal",
        label: "Goal",
        type: "text",
        placeholder: "e.g. Bookings, brand awareness, event sign-ups",
      },
      {
        name: "keywords",
        label: "Keywords (optional)",
        type: "text",
        placeholder: "e.g. deep cleaning, move-out cleaning, weekend refresh",
      },
      ...commonToneLanguage,
      {
        name: "extraNotes",
        label: "Extra notes",
        type: "textarea",
        placeholder: "Tone details, words to avoid, link to include in first comment",
      },
    ],
    generates: [
      "Post title",
      "Caption",
      "First comment",
      "Hashtags",
      "CTA",
      "Visual text suggestion",
      "Image idea",
      "Alt text",
      "Platform variations",
      "Posting tips",
    ],
    whoFor: [
      { title: "Small shops", desc: "Launch a product post without a blank caption box." },
      { title: "Creators", desc: "Batch ideas from one theme." },
      { title: "Freelancers", desc: "Draft client copy faster." },
    ],
    workflow: [
      "Write a one-sentence brief with offer and audience.",
      "Generate the pack and read every field.",
      "Edit prices, dates, and claims for accuracy.",
      "Copy into your scheduler or app.",
    ],
    exampleOutput: [
      { label: "Brief", sample: "Cleaning company promotion - 20% off deep cleaning before a family gathering or weekend home reset." },
      {
        label: "Caption (draft)",
        sample:
          "Make the house feel guest-ready without losing your weekend. Book a deep clean this week and save 20% - limited openings in your area. Message us or tap the link in bio.",
      },
      { label: "First comment", sample: "Book here -> [your-link] - Offer ends Sunday." },
    ],
    commonMistakes: [
      "Publishing without checking prices and dates.",
      "Using the same hashtags on every post.",
      "Skipping mobile preview for line breaks.",
    ],
    faqs: [
      { q: "Does the Social Media Pack post to my accounts automatically?", a: "No. Sounez never posts to social networks on your behalf. You generate the pack, edit the fields for accuracy, then copy the caption, hashtags, and CTA into your own app or scheduler before publishing." },
      { q: "Is my generated content stored?", a: "Successful generations may be saved with a session identifier so you can reopen them from this browser. Other devices will not see the same list. See the Privacy Policy for full details on storage and deletion." },
      { q: "Can I generate packs in Arabic or French?", a: "Yes. Select Arabic, French, Spanish, or English in the language dropdown before generating. All output fields — caption, hashtags, CTA, and platform variations — will be produced in your chosen language." },
      { q: "What should I check before posting?", a: "Review all prices, dates, links, phone numbers, and discount offers for accuracy. Check that the caption matches your actual image or offer. Confirm any hashtags are still active and relevant — some are periodically banned or shadowbanned on Instagram and TikTok." },
    ],
    relatedTools: [
      { href: "/tools/ai-caption-generator", label: "AI Caption Generator" },
      { href: "/tools/hashtag-generator", label: "Hashtag Generator" },
      { href: "/tools/bio-generator", label: "Bio Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    ],
    relatedPack: { href: "/smart-packs/product-listing-pack", label: "Product Listing Pack" },
    safetyNote:
      "Your brief is sent to our AI provider to generate the pack. Do not include passwords or private customer data. Review all copy before publishing.",
    seo: {
      title: "Social Media Pack | Sounez Smart Packs",
      description:
        "Generate captions, hashtags, CTAs, and platform variations from one brief. Free Smart Pack for Instagram, Facebook, LinkedIn, TikTok, and X.",
      ogTitle: "Social Media Pack - Sounez",
      ogDescription: "One brief -> caption, hashtags, first comment, and more. Edit before you post.",
    },
  },
  {
    slug: "product-listing-pack",
    name: "Product Listing Pack",
    shortDescription: "Product facts -> title, descriptions, SEO meta, and social line.",
    longDescription:
      "Describe your product once and get marketplace-ready copy: title, bullets, long description, meta title and description, alt text, and a short social caption. Built for sellers who list on Shopify, Etsy, WooCommerce, or similar platforms.",
    tagline: "One product -> title, descriptions, alt text, and social line",
    summary:
      "Listing copy in one structured pack. You paste into your shop admin and edit to match your brand voice.",
    targetUsers: [
      { title: "Online sellers", desc: "Ship listings faster with a consistent structure." },
      { title: "Resellers", desc: "Rewrite supplier specs in your own words." },
      { title: "Agencies", desc: "Hand juniors a checklist per SKU." },
    ],
    outputFields: [
      "Product title",
      "Short description",
      "Long description",
      "Bullet points",
      "SEO meta title",
      "SEO meta description",
      "Image alt text",
      "Social caption",
      "Marketplace tips",
    ],
    useCases: ["Shopify", "WooCommerce", "Etsy", "Amazon-style listings", "Local marketplace listings"],
    fields: [
      {
        name: "brief",
        label: "Listing brief",
        type: "textarea",
        required: true,
        placeholder: "What you sell, who buys it, and what makes it different.",
      },
      { name: "productName", label: "Product name", type: "text", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "e.g. Kitchen, handmade jewelry" },
      {
        name: "mainBenefits",
        label: "Main benefits",
        type: "textarea",
        placeholder: "Materials, size, durability, shipping, warranty",
      },
      { name: "targetBuyer", label: "Target buyer", type: "text" },
      {
        name: "marketplace",
        label: "Marketplace",
        type: "select",
        options: [
          { value: "shopify", label: "Shopify" },
          { value: "woocommerce", label: "WooCommerce" },
          { value: "etsy", label: "Etsy" },
          { value: "amazon", label: "Amazon-style" },
          { value: "local", label: "Local / other" },
        ],
      },
      { name: "keywords", label: "Keywords", type: "text" },
      ...commonToneLanguage,
      { name: "extraNotes", label: "Extra notes", type: "textarea" },
    ],
    generates: [
      "Product title",
      "Short & long description",
      "Bullet points",
      "SEO meta fields",
      "Image alt text",
      "Social caption",
      "Marketplace tips",
    ],
    whoFor: [
      { title: "Etsy / Shopify sellers", desc: "Consistent listings at scale." },
      { title: "Resellers", desc: "Unique copy from supplier facts." },
      { title: "Agencies", desc: "On-brand listing templates." },
    ],
    workflow: [
      "Gather facts: size, material, shipping, returns.",
      "Generate the pack.",
      "Compress photos with the Image Compressor.",
      "Paste into your marketplace and proofread.",
    ],
    exampleOutput: [
      { label: "Title", sample: "Ceramic Pour-Over Dripper - Matte White, 1-2 Cups" },
      { label: "Alt text", sample: "White ceramic pour-over dripper beside a glass carafe on a wooden counter." },
    ],
    commonMistakes: [
      "Copying supplier text word-for-word.",
      "Keyword stuffing in alt text.",
      "Announcing on social before the listing URL works.",
    ],
    faqs: [
      { q: "Does Sounez connect to my Shopify or Etsy shop?", a: "No. Sounez does not connect to any marketplace or shop platform. You copy each generated field — title, description, bullets, meta copy — manually into your shop admin and edit to match your brand voice before saving." },
      { q: "Are the SEO meta fields guaranteed to rank?", a: "No. The generated meta title and description are starting drafts based on your inputs. Search ranking depends on many factors including competition, domain authority, and how well the keywords match real buyer search intent. Treat the output as an optimized starting point and refine it over time." },
      { q: "Can I regenerate if the first result is too generic?", a: "Yes. If the first result is too broad, add more specific details to your brief — exact dimensions, main material, unique selling point, and target buyer. Changing the tone setting (professional vs. friendly) also produces noticeably different copy." },
      { q: "What information produces the best listing copy?", a: "Specific facts: exact dimensions, materials, care instructions, shipping time, and what problem the product solves for the buyer. Generic phrases like 'high quality' or 'great value' produce weak output. Include your main differentiator and target buyer in the brief for the strongest results." },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-describer", label: "Image Describer" },
      { href: "/tools/ai-caption-generator", label: "AI Caption Generator" },
    ],
    relatedPack: { href: "/smart-packs/seo-image-pack", label: "SEO Image Pack" },
    safetyNote: "Listing briefs are processed by AI on our servers. Verify specs and claims before publishing.",
    seo: {
      title: "Product Listing Pack | Sounez Smart Packs",
      description:
        "Generate product titles, descriptions, bullets, SEO meta, and alt text from one brief. For Shopify, Etsy, and more.",
    },
  },
  {
    slug: "seo-image-pack",
    name: "SEO Image Pack",
    shortDescription: "Image context -> filename, alt text, caption, and on-page copy ideas.",
    longDescription:
      "Describe your image and page topic to get an SEO-friendly filename, alt text, caption, paragraph to place nearby, keyword ideas, and compression advice. Helps bloggers and shop owners fix image SEO without guessing.",
    tagline: "One image -> filename, alt text, compression plan, and keywords",
    summary: "Structured image SEO assets from a short brief. Always check alt text against the real image.",
    targetUsers: [
      { title: "Bloggers", desc: "Fix older posts without reshooting." },
      { title: "Store owners", desc: "Accessible product galleries." },
      { title: "Developers", desc: "Hand editors clear alt text rules." },
    ],
    outputFields: [
      "SEO filename",
      "Alt text",
      "Image title",
      "Caption",
      "Surrounding paragraph",
      "Keyword suggestions",
      "Compression advice",
      "Related image ideas",
    ],
    useCases: ["Blog images", "Product photos", "Landing pages", "Portfolio", "Local SEO pages"],
    fields: [
      {
        name: "brief",
        label: "Image brief",
        type: "textarea",
        required: true,
        placeholder: "What the image shows and where it will appear on the site.",
      },
      { name: "imageTopic", label: "Image topic", type: "text", required: true },
      { name: "pageTopic", label: "Page topic", type: "text" },
      { name: "targetKeyword", label: "Target keyword", type: "text" },
      { name: "websiteNiche", label: "Website niche", type: "text" },
      { name: "imagePurpose", label: "Image purpose", type: "text", placeholder: "Hero, inline blog, product gallery" },
      { name: "imageDescription", label: "Image description (optional)", type: "textarea" },
      {
        name: "language",
        label: "Language",
        type: "select",
        required: true,
        options: [
          { value: "en", label: "English" },
          { value: "fr", label: "French" },
          { value: "ar", label: "Arabic" },
          { value: "es", label: "Spanish" },
        ],
      },
      { name: "extraNotes", label: "Extra notes", type: "textarea" },
    ],
    generates: ["Filename", "Alt text", "Caption", "Keywords", "Compression note", "On-page paragraph"],
    whoFor: [
      { title: "Bloggers", desc: "Better image SEO on content sites." },
      { title: "Store owners", desc: "Searchable product images." },
      { title: "Developers", desc: "Editor-friendly handoffs." },
    ],
    workflow: [
      "Rename file before upload.",
      "Compress with Image Compressor.",
      "Use generated alt text - edit for accuracy.",
      "Place image near matching paragraph text.",
    ],
    exampleOutput: [
      { label: "Filename", sample: "team-meeting-whiteboard-2026.webp" },
      { label: "Alt text", sample: "Four teammates reviewing charts on a whiteboard in a bright office." },
    ],
    commonMistakes: [
      "Keywords inside alt text instead of description.",
      "Leaving IMG_3847.jpg as the filename.",
      "Skipping alt text after cropping.",
    ],
    faqs: [
      { q: "Do I need to upload an image file for this pack?", a: "No. This pack works entirely from a text description of your image — what it shows and where it appears on the page. No image file is uploaded, sent to any server, or stored. You apply the generated filename and alt text manually when you upload or rename the image." },
      { q: "Is alt text enough for image SEO?", a: "Alt text is one part of image SEO. The filename, surrounding page copy, image compression (which affects page speed), and topic relevance all contribute. The SEO Image Pack generates all of these in one structured output so you can address every factor at once." },
      { q: "Should I use WebP or JPG for my images?", a: "The pack recommends a format based on your image type. WebP typically produces smaller file sizes for photos and is supported in all modern browsers. Use the Image Compressor on Sounez to convert and compress your image to the recommended format before uploading." },
      { q: "How do I use the generated alt text?", a: "Copy the alt text to your image's alt attribute in HTML, or paste it into your CMS's alt text field. Always verify it accurately describes what is actually visible in the image — AI descriptions can miss context or make assumptions. Edit for accuracy before publishing." },
    ],
    relatedTools: [
      { href: "/tools/image-compressor", label: "Image Compressor" },
      { href: "/tools/image-describer", label: "Image Describer" },
      { href: "/tools/png-to-jpg-converter", label: "PNG to JPG Converter" },
    ],
    relatedPack: { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
    safetyNote: "Text briefs are processed by AI. No image files are stored from this form.",
    seo: {
      title: "SEO Image Pack | Sounez Smart Packs",
      description:
        "Generate SEO filenames, alt text, captions, and keyword ideas for blog and product images from one brief.",
    },
  },
  {
    slug: "business-launch-pack",
    name: "Business Launch Pack",
    shortDescription: "Business idea -> names, taglines, bios, and first post ideas.",
    longDescription:
      "Describe your business idea, sector, and audience to get name ideas, taglines, a short pitch, homepage hero text, social bios, service blurbs, and five starter post ideas. Check domain and trademark availability yourself before committing.",
    tagline: "One idea -> names, pitch, bios, and starter posts",
    summary: "Launch copy in one pack. Names and claims need your own verification.",
    targetUsers: [
      { title: "Freelancers", desc: "Position a new offer clearly." },
      { title: "Startups", desc: "First website and social copy." },
      { title: "Students", desc: "Project branding drafts." },
    ],
    outputFields: [
      "Business name ideas",
      "Taglines",
      "Short pitch",
      "Homepage hero",
      "Instagram bio",
      "LinkedIn intro",
      "Service descriptions",
      "First post ideas",
    ],
    useCases: ["Freelancers", "Startups", "Agencies", "Local businesses", "Student projects"],
    fields: [
      {
        name: "brief",
        label: "Business brief",
        type: "textarea",
        required: true,
        placeholder: "What you offer, who you help, and how you are different.",
      },
      { name: "businessIdea", label: "Business idea", type: "textarea", required: true },
      { name: "sector", label: "Sector", type: "text", placeholder: "e.g. Design, food, coaching" },
      { name: "audience", label: "Audience", type: "text" },
      { name: "location", label: "Location (optional)", type: "text" },
      { name: "websiteUrl", label: "Website URL (optional)", type: "text", placeholder: "https://" },
      ...commonToneLanguage,
      { name: "extraNotes", label: "Extra notes", type: "textarea" },
    ],
    generates: ["Names", "Taglines", "Pitch", "Hero text", "Bios", "Services", "Post ideas"],
    whoFor: [
      { title: "New founders", desc: "Brainstorm before hiring branding help." },
      { title: "Side projects", desc: "Ship a coherent first presence." },
      { title: "Local businesses", desc: "Opening-week messaging." },
    ],
    workflow: [
      "Write a clear one-paragraph idea.",
      "Generate and shortlist names.",
      "Check domains and trademarks.",
      "Paste hero and bios into your site and profiles.",
    ],
    exampleOutput: [
      { label: "Tagline idea", sample: "Bookkeeping that speaks plain language." },
      { label: "Hero draft", sample: "Monthly books and tax-ready reports for freelancers - without the jargon." },
    ],
    commonMistakes: [
      "Choosing a name without checking .com availability.",
      "Publishing bios with unverified credentials.",
      "Using every post idea in one week without a plan.",
    ],
    faqs: [
      { q: "Are the generated business names trademark-cleared?", a: "No. Generated names are brainstorming ideas only. Before using any name commercially, check domain availability on a registrar, search your country's trademark database (e.g. USPTO for the US, IPO for the UK), and look for existing businesses with the same or similar names." },
      { q: "Does the pack provide legal or financial business advice?", a: "No. The pack generates marketing copy, pitch text, and social bios — not legal, financial, or business registration advice. For company formation, contracts, tax obligations, or regulated claims, consult a qualified professional in your jurisdiction." },
      { q: "Can I generate a QR code to share my new website?", a: "Yes — after your site is live, use the free QR Code Generator on Sounez to create a scannable code pointing to your URL. Useful for printed materials, business cards, or in-person events during a launch." },
      { q: "How many name ideas will I get per run?", a: "Several naming directions per generation — enough to compare and shortlist. Run the pack multiple times with slightly different briefs or style settings (modern vs. playful, for example) to explore different angles before committing to one name." },
    ],
    relatedTools: [
      { href: "/tools/business-name-generator", label: "Business Name Generator" },
      { href: "/tools/bio-generator", label: "Bio Generator" },
      { href: "/tools/website-idea-generator", label: "Website Idea Generator" },
      { href: "/tools/qr-code-generator", label: "QR Code Generator" },
    ],
    relatedPack: { href: "/smart-packs/social-media-pack", label: "Social Media Pack" },
    safetyNote: "Briefs are processed by AI. Do not submit confidential client data without permission.",
    seo: {
      title: "Business Launch Pack | Sounez Smart Packs",
      description:
        "Generate business names, taglines, homepage hero text, bios, and first post ideas from one brief.",
    },
  },
  {
    slug: "student-study-pack",
    name: "Student Study Pack",
    shortDescription: "Topic -> summary, flashcards, quiz questions, and revision plan.",
    longDescription:
      "Enter a subject and topic to get a study summary, key concepts, flashcards, quiz questions, a revision plan, a plain explanation, and common mistakes to watch for. Built for learning - not for submitting as graded work you did not create.",
    tagline: "One topic -> notes, flashcards, and a revision plan",
    summary: "Revision assets from your topic. Verify facts with your course materials.",
    targetUsers: [
      { title: "Students", desc: "Organize revision before exams." },
      { title: "Teachers", desc: "Draft study sheets to edit." },
      { title: "Self-learners", desc: "Structure online course notes." },
    ],
    outputFields: [
      "Summary",
      "Key concepts",
      "Flashcards",
      "Quiz questions",
      "Revision plan",
      "Simple explanation",
      "Common mistakes",
    ],
    useCases: ["Exam revision", "Lecture recap", "Self-paced courses", "Tutoring prep"],
    fields: [
      {
        name: "brief",
        label: "Study brief",
        type: "textarea",
        required: true,
        placeholder: "Topic, what you need to learn, and exam or goal.",
      },
      { name: "topic", label: "Topic", type: "text", required: true },
      { name: "subject", label: "Subject", type: "text", placeholder: "e.g. Biology, History" },
      { name: "level", label: "Level", type: "text", placeholder: "e.g. High school, college sophomore, adult learner" },
      { name: "studyGoal", label: "Study goal", type: "text", placeholder: "e.g. Final exam in two weeks" },
      ...commonToneLanguage,
      { name: "extraNotes", label: "Extra notes", type: "textarea" },
    ],
    generates: ["Summary", "Flashcards", "Quiz", "Revision plan", "Mistakes list"],
    whoFor: [
      { title: "Students", desc: "Scan-friendly revision." },
      { title: "Teachers", desc: "Editable study sheets." },
      { title: "Parents", desc: "Help structure home revision." },
    ],
    workflow: [
      "Enter topic and level.",
      "Generate the pack.",
      "Cross-check facts in your textbook or slides.",
      "Add your own examples under each heading.",
    ],
    exampleOutput: [
      { label: "Key concept", sample: "Photosynthesis: light energy -> chemical energy in glucose." },
      { label: "Flashcard", sample: "Term: Stomata - Definition: Pores on leaves for gas exchange." },
    ],
    commonMistakes: [
      "Trusting dates or formulas without checking.",
      "Submitting generated text as your own assignment.",
      "Pasting entire copyrighted chapters into the brief.",
    ],
    faqs: [
      { q: "Can I submit the generated notes as my own homework or assignment?", a: "No. The pack is designed to help you study a topic, not to produce work you submit as your own. Use the notes to understand the material, then write your assignments and exam answers in your own words. Submitting AI-generated content as your own work violates academic integrity policies at most schools." },
      { q: "Are the generated facts always accurate?", a: "No. AI can produce plausible-sounding but incorrect information, especially for specific dates, scientific formulas, historical events, or nuanced arguments. Always verify the generated content against your textbook, lecture notes, or a verified academic source before relying on it." },
      { q: "Is my study brief stored on Sounez servers?", a: "Prompts may be temporarily stored with a session identifier so you can revisit the result from this browser. See the Privacy Policy for full details on data retention and deletion. Do not include exam questions from a live assessment, personal data, or long copyrighted passages in your brief." },
      { q: "What level setting should I choose?", a: "Match the level to your course year and the depth you need. Beginner produces simple overviews with plain language, while advanced generates more detailed explanations with technical terms and nuance. Start with your current course level and adjust if the output is too basic or too detailed." },
    ],
    relatedTools: [
      { href: "/tools/study-notes-generator", label: "Study Notes Generator" },
      { href: "/tools/word-counter", label: "Word Counter" },
      { href: "/tools/calculator", label: "Calculator" },
    ],
    relatedPack: { href: "/smart-packs/business-launch-pack", label: "Business Launch Pack" },
    studyDisclaimer:
      "Use this pack for learning and revision. Do not use it to cheat, impersonate someone, or submit work you did not create.",
    safetyNote: "Study briefs are processed by AI. Follow your school's academic integrity rules.",
    seo: {
      title: "Student Study Pack | Sounez Smart Packs",
      description:
        "Generate study summaries, flashcards, quiz questions, and revision plans from a topic. For learning only - not for cheating.",
    },
  },
];

export function smartPackBySlug(slug: string): SmartPackDefinition | undefined {
  return SMART_PACKS.find((p) => p.slug === slug);
}

export const SMART_PACK_SLUGS = [
  "social-media-pack",
  "product-listing-pack",
  "seo-image-pack",
  "business-launch-pack",
  "student-study-pack",
] as const;

export type SmartPackSlug = (typeof SMART_PACK_SLUGS)[number];
