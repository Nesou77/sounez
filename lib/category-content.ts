/** Unique editorial content per tool category - not duplicated on tool pages. */

export type CategoryEditorial = {
  extendedIntro: string;
  contentPolicy: string;
  useCases: { title: string; desc: string }[];
  tips: string[];
  faqs: { q: string; a: string }[];
};

export const CATEGORY_EDITORIAL: Record<string, CategoryEditorial> = {
  "creator-tools": {
    extendedIntro:
      "These tools help with the text and numbers around publishing: captions, hashtags, channel tags, bios, and rough sponsored-post estimates. They are starting points — you should edit anything before it goes live and follow each platform's rules for ads and disclosures. AI-assisted tools (captions, bios, business names, website ideas) process your brief on Sounez servers and return generated drafts; none of the text is stored after the response or used to train models. Browser-only tools (the hashtag and YouTube tag generators) never send your input anywhere.",
    contentPolicy:
      "Creator tools generate text drafts from the input you provide. You are responsible for verifying accuracy, removing misleading claims, and complying with the advertising and disclosure rules of the platform you publish on. Do not use these tools to generate content that impersonates real people, makes false health or financial claims, targets minors inappropriately, or violates intellectual property rights. Generated content that appears to involve prohibited topics is blocked automatically; repeated misuse may result in access restriction.",
    useCases: [
      {
        title: "Upload day",
        desc: "Generate tags and a caption draft, then trim to match what is actually in the video or photo.",
      },
      {
        title: "Profile refresh",
        desc: "Rewrite your bio when your offer changes without copying a template from someone else's niche.",
      },
      {
        title: "Brand sanity check",
        desc: "Compare a sponsorship offer to a rough calculator range before you reply by email.",
      },
    ],
    tips: [
      "Keep one branded hashtag you reuse; rotate the rest so posts do not look copy-pasted.",
      "Tags and hashtags support good titles and retention - they do not replace them.",
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
        a: "No. They are ballpark ranges for planning. Real deals depend on niche, deliverables, and the brand's budget.",
      },
    ],
  },
  "design-tools": {
    extendedIntro:
      "Design tools on Sounez focus on quick decisions: pick colors, build gradients, export favicons, or copy CSS for shadows and patterns. They suit landing pages, side projects, and handoffs — not full print production without a final proof. Every design tool on this list runs entirely in your browser using standard Web APIs. No image, color value, or CSS snippet is sent to Sounez servers. Your work stays on your device until you choose to download or copy it.",
    contentPolicy:
      "Design tools generate visual assets and CSS code from the settings you configure in your browser. There is no user-submitted text input that requires moderation. Generated output — palettes, gradients, favicons, SVG shapes, and CSS declarations — is yours to use in any personal or commercial project without attribution. You are responsible for ensuring that uploaded reference images (for color extraction or favicon generation) are either your own work or licensed for the intended use.",
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
      "Test text contrast on every color you use for buttons and links.",
      "Font previews load from Google Fonts - self-host if your project requires it.",
      "Export SVG blobs at low opacity behind headlines so type stays readable.",
    ],
    faqs: [
      {
        q: "Can I use palettes and CSS commercially?",
        a: "Yes. Generated colors and code are yours to use in client and personal work.",
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
      "Utilities cover everyday file and text jobs: compress images, convert PDFs, count words, make QR codes, and similar tasks. Some run entirely in your tab; others need a short server step. Each tool page states clearly which applies — read it before uploading anything sensitive. Browser tools keep files on your device and never send bytes to Sounez servers. Server tools (PDF conversion, AI study notes) transmit only the content needed to complete the request and delete it after the response is returned.",
    contentPolicy:
      "Utility tools process files and text you provide to complete a specific task. Only upload or paste content you own or have permission to process through a third-party web service. Do not upload files containing: personal data belonging to others without consent, copyrighted material you are not licensed to convert, documents marked confidential by your employer, or content that violates applicable law. The PDF-to-Word converter and study-notes generator use server-side processing; see their individual privacy notes for retention details. Image and text tools run locally and have no server-side content policy implications.",
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
      "Keep originals when converting PNG to JPG - transparency does not survive JPEG.",
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
