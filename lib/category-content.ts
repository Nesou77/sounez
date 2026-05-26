/** Unique editorial content per tool category — not duplicated on tool pages. */

export type CategoryEditorial = {
  extendedIntro: string;
  useCases: { title: string; desc: string }[];
  tips: string[];
  faqs: { q: string; a: string }[];
};

export const CATEGORY_EDITORIAL: Record<string, CategoryEditorial> = {
  "creator-tools": {
    extendedIntro:
      "These tools help with the text and numbers around publishing: captions, hashtags, channel tags, bios, and rough sponsored-post estimates. They are starting points — you should edit anything before it goes live and follow each platform’s rules for ads and disclosures.",
    useCases: [
      {
        title: "Upload day",
        desc: "Generate tags and a caption draft, then trim to match what is actually in the video or photo.",
      },
      {
        title: "Profile refresh",
        desc: "Rewrite your bio when your offer changes without copying a template from someone else’s niche.",
      },
      {
        title: "Brand sanity check",
        desc: "Compare a sponsorship offer to a rough calculator range before you reply by email.",
      },
    ],
    tips: [
      "Keep one branded hashtag you reuse; rotate the rest so posts do not look copy-pasted.",
      "Tags and hashtags support good titles and retention — they do not replace them.",
      "AI captions can misstate facts; read every line against your image or clip.",
    ],
    faqs: [
      {
        q: "Do creator tools post for me?",
        a: "No. Sounez only gives you text or numbers to copy. You publish through Instagram, TikTok, YouTube, or your scheduler.",
      },
      {
        q: "Which tools send data to a server?",
        a: "AI writing tools (captions, bios, names, ideas) process your brief on our servers. Hashtag and tag generators are lighter; see each tool page.",
      },
      {
        q: "Can I use the text in paid campaigns?",
        a: "Yes, after you edit and verify claims. You are responsible for compliance and accuracy.",
      },
      {
        q: "Are earnings calculator results guaranteed?",
        a: "No. They are ballpark ranges for planning. Real deals depend on niche, deliverables, and the brand’s budget.",
      },
    ],
  },
  "design-tools": {
    extendedIntro:
      "Design tools on Sounez focus on quick decisions: pick colours, build gradients, export favicons, or copy CSS for shadows and patterns. They suit landing pages, side projects, and handoffs — not full print production without a final proof.",
    useCases: [
      {
        title: "New landing page",
        desc: "Lock a palette and gradient, then paste box-shadow and pattern CSS into your component.",
      },
      {
        title: "Side project launch",
        desc: "Generate a favicon pack and placeholder images while real screenshots are still in progress.",
      },
      {
        title: "Client mockup",
        desc: "Try font pairs and blob backgrounds in a call without opening a heavy desktop app.",
      },
    ],
    tips: [
      "Test text contrast on every colour you use for buttons and links.",
      "Font previews load from Google Fonts — self-host if your project requires it.",
      "Export SVG blobs at low opacity behind headlines so type stays readable.",
    ],
    faqs: [
      {
        q: "Can I use palettes and CSS commercially?",
        a: "Yes. Generated colours and code are yours to use in client and personal work.",
      },
      {
        q: "Do design tools store my uploads?",
        a: "Most run in your browser. Favicon and placeholder tools process images locally unless noted on the page.",
      },
      {
        q: "Will CSS work in my framework?",
        a: "Copy into global CSS, CSS modules, or Tailwind arbitrary values. Test in your target browsers.",
      },
      {
        q: "Are these a replacement for Figma?",
        a: "No. They speed up small tasks. Complex layout and component libraries still belong in a design tool.",
      },
    ],
  },
  "utility-tools": {
    extendedIntro:
      "Utilities cover everyday file and text jobs: compress images, convert PDFs, count words, make QR codes, and similar tasks. Some run entirely in your tab; others need a short server step. Each tool page states which applies before you upload anything sensitive.",
    useCases: [
      {
        title: "Before publishing a post",
        desc: "Compress hero images and confirm word count fits the platform limit.",
      },
      {
        title: "Office handoff",
        desc: "Convert a received PDF to DOCX, then proofread tables and headings in Word.",
      },
      {
        title: "Event or shop setup",
        desc: "Generate a QR code, test it on your phone, then print at a size phones can scan.",
      },
    ],
    tips: [
      "Keep originals when converting PNG to JPG — transparency does not survive JPEG.",
      "Enable OCR on PDF conversion only when the file is a scan, not typed text.",
      "Store passwords in a manager, not in chat or email.",
    ],
    faqs: [
      {
        q: "Are utility tools safe for confidential files?",
        a: "Only upload documents you may process. PDF and AI tools use our servers; browser tools keep files on your device.",
      },
      {
        q: "Is there a file size limit?",
        a: "Yes on server tools (for example PDFs up to 20 MB). Browser tools depend on your device memory.",
      },
      {
        q: "Do I need an account?",
        a: "No for normal use. Fair-use limits apply on heavy AI or conversion use.",
      },
      {
        q: "Can I batch process files?",
        a: "The image compressor supports batches in the browser. Other tools are mostly one job at a time.",
      },
    ],
  },
};

export function getCategoryEditorial(slug: string): CategoryEditorial | undefined {
  return CATEGORY_EDITORIAL[slug];
}
