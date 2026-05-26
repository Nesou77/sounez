import { toolBySlug } from "@/data/tools";

export type ToolEditorialContent = {
  intro: string;
  whatItDoes: string;
  whoFor: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  howTo: string[];
  examples: { title: string; desc: string }[];
  mistakes: string[];
  privacyNote: string;
  whenNotToUse: string;
  faqs: { q: string; a: string }[];
  proTips: string[];
  relatedSlugs: string[];
};

const EDITORIAL: Record<string, ToolEditorialContent> = {
  "pdf-to-word-converter": {
    intro: "Upload a PDF and download an editable Word file when you need to fix typos, reuse text, or hand a document to someone who only works in DOCX.",
    whatItDoes: "Sends your PDF to our conversion service and returns a DOCX you can open in Word, Google Docs, or LibreOffice.",
    whoFor: [
      { title: "Office staff", desc: "Turn a received PDF report into something you can edit and send back." },
      { title: "Students", desc: "Quote from a scanned handout after OCR, with manual cleanup." },
      { title: "Freelancers", desc: "Start from a client PDF instead of retyping pages." },
    ],
    features: [
      { title: "Drag-and-drop", desc: "One file at a time, up to 20 MB, with clear errors if something is wrong." },
      { title: "Layout options", desc: "Choose whether to preserve layout, pull images, or run OCR on scans." },
      { title: "No account", desc: "Convert when you need it — fair-use limits apply on the server." },
    ],
    howTo: ["Drop your PDF on the upload area.", "Pick options that match the file (OCR for scans).", "Start conversion and wait for the DOCX.", "Download and proofread in Word."],
    examples: [
      { title: "Typed contract", desc: "12-page text PDF → DOCX with headings you can redline." },
      { title: "Scanned form", desc: "Phone photo PDF with OCR → editable text to fill gaps." },
    ],
    mistakes: ["Expecting perfect tables from magazine layouts.", "Uploading password-locked PDFs.", "Skipping proofread on OCR output."],
    privacyNote: "Your PDF is processed on our servers and removed after conversion. Only upload documents you may process.",
    whenNotToUse: "Do not upload confidential or classified files unless your organisation allows third-party conversion.",
    faqs: [
      { q: "Is my file stored?", a: "No. It is used only to produce your DOCX, then deleted." },
      { q: "Will formatting match exactly?", a: "Simple layouts convert well. Complex designs need manual touch-up." },
      { q: "What do I get after conversion?", a: "A DOCX file you can open in Word, Google Docs, or LibreOffice." },
    ],
    proTips: ["Split huge PDFs by chapter for cleaner output.", "Enable OCR only when the PDF is image-based."],
    relatedSlugs: ["word-counter", "text-case-converter", "image-compressor"],
  },
  "background-remover": {
    intro: "Cut out a person, product, or object and download a PNG with a transparent background — processing stays on your device.",
    whatItDoes: "Runs an on-device AI model in your browser to separate the subject from the background.",
    whoFor: [
      { title: "Shop owners", desc: "White or transparent product shots for marketplaces." },
      { title: "Designers", desc: "Quick cutouts for composites and mockups." },
      { title: "Creators", desc: "Thumbnails and stickers without a green screen." },
    ],
    features: [
      { title: "On-device AI", desc: "Image bytes stay in your browser; models load from a CDN." },
      { title: "PNG output", desc: "Transparency preserved for design tools." },
      { title: "Optional fill", desc: "Add white, black, or a custom colour behind the subject." },
    ],
    howTo: ["Upload PNG, JPG, or WEBP (max 10 MB).", "Preview the image.", "Run removal and check edges.", "Download PNG or add a solid background."],
    examples: [
      { title: "Product on a table", desc: "Isolate a mug and place it on a plain shop background." },
      { title: "Headshot", desc: "Remove a messy room for a LinkedIn banner." },
    ],
    mistakes: ["Using low-contrast backgrounds with hair detail.", "Expecting perfect edges on glass or fine mesh.", "Saving as JPEG when you need transparency."],
    privacyNote: "Processing happens locally. Model files download from the configured CDN; your image is not uploaded to Sounez.",
    whenNotToUse: "Skip busy crowd photos or images you do not have rights to edit.",
    faqs: [
      { q: "Does it upload my photo?", a: "No. Removal runs in your browser." },
      { q: "Why is the first run slow?", a: "The AI model downloads once, then later runs are faster." },
      { q: "Which file types work?", a: "PNG, JPG, and WEBP up to 10 MB on most devices." },
    ],
    proTips: ["Shoot subjects with clear edges when you can.", "Zoom to check hair before publishing."],
    relatedSlugs: ["image-compressor", "png-to-jpg-converter", "image-describer"],
  },
  "image-describer": {
    intro: "Upload a photo and get alt text, captions, keywords, and a short social line — then edit anything that is not quite right.",
    whatItDoes: "Sends your image to our AI vision service and returns several text fields for accessibility and SEO.",
    whoFor: [
      { title: "Bloggers", desc: "Write alt text without guessing what search engines need." },
      { title: "Store managers", desc: "Describe product photos consistently." },
      { title: "Social teams", desc: "Draft a caption when the designer only sent an image." },
    ],
    features: [
      { title: "Multiple outputs", desc: "Alt text, short caption, long description, keywords, social line." },
      { title: "Tone switch", desc: "Accessibility, SEO, descriptive, or social-focused drafts." },
      { title: "Copy buttons", desc: "Paste into CMS, Shopify, or your scheduler." },
    ],
    howTo: ["Upload an image up to 10 MB.", "Pick a tone.", "Generate and read each field.", "Copy, edit, and publish."],
    examples: [
      { title: "Product hero", desc: "SEO tone → alt text + keywords for a kettle listing." },
      { title: "Event photo", desc: "Social tone → caption with a natural CTA." },
    ],
    mistakes: ["Publishing alt text you did not verify against the image.", "Keyword stuffing inside alt attributes.", "Uploading private documents as images."],
    privacyNote: "Images are sent securely for analysis and are not kept after the response.",
    whenNotToUse: "Avoid ID cards, medical images, or anything you would not share with a processor.",
    faqs: [
      { q: "Can I use the text commercially?", a: "Yes, after you edit it — you are responsible for accuracy." },
      { q: "Is it always correct?", a: "No. AI can miss context; always review." },
      { q: "Can I change the tone?", a: "Yes — pick accessibility, SEO, descriptive, or social-focused output." },
    ],
    proTips: ["Accessibility tone for informative images; keep alt under ~125 characters when possible.", "Match keywords to visible content only."],
    relatedSlugs: ["image-compressor", "ai-caption-generator", "hashtag-generator"],
  },
  "youtube-tags-generator": {
    intro: "Type a video topic and get a list of tags you can paste into YouTube Studio — useful as a starting point, not a guarantee of rankings.",
    whatItDoes: "Builds a set of related tags from your keyword using our tag rules and suggestions.",
    whoFor: [
      { title: "YouTubers", desc: "Fill the tags box faster on upload day." },
      { title: "Editors", desc: "Hand tags to the uploader with the title and description." },
      { title: "Small brands", desc: "Keep tag style consistent across a series." },
    ],
    features: [
      { title: "25 tags", desc: "Sized to fit common YouTube limits." },
      { title: "One-click copy", desc: "Comma-separated list ready to paste." },
      { title: "No login", desc: "Open the page, generate, copy, close." },
    ],
    howTo: ["Enter your main topic or title.", "Generate tags.", "Remove any that feel off-topic.", "Paste into YouTube and save."],
    examples: [
      { title: "Tutorial video", desc: "Topic “Excel pivot tables beginner” → how-to and software-related tags." },
      { title: "Vlog", desc: "Topic “morning routine 2026” → lifestyle tags without spam." },
    ],
    mistakes: ["Using tags that do not appear in the video.", "Copying competitor tags blindly.", "Relying on tags instead of title and watch time."],
    privacyNote: "Your keyword is processed in the browser or on our server depending on implementation — it is not stored.",
    whenNotToUse: "Tags alone will not fix misleading titles or low retention.",
    faqs: [
      { q: "Do tags still matter?", a: "They help context, but title, thumbnail, and retention matter more." },
      { q: "Can I edit the list?", a: "Yes — treat output as a draft." },
      { q: "How many tags are generated?", a: "Up to 25 per run — enough for typical YouTube tag fields." },
    ],
    proTips: ["Mirror language from your title in a few tags.", "Drop duplicate or overly broad tags."],
    relatedSlugs: ["hashtag-generator", "ai-caption-generator", "bio-generator"],
  },
  "tiktok-money-calculator": {
    intro: "Rough estimate of what a sponsored post might pay based on followers and engagement — useful for planning, not a contract rate.",
    whatItDoes: "Applies simple formulas to your numbers and shows a ballpark range per post.",
    whoFor: [
      { title: "New creators", desc: "See whether a brand offer is in the right ballpark." },
      { title: "Managers", desc: "Quick sanity check before negotiations." },
      { title: "Students", desc: "Understand how rates scale with audience size." },
    ],
    features: [
      { title: "Platform toggle", desc: "TikTok, Instagram, or YouTube inputs." },
      { title: "Engagement field", desc: "Adjust when your audience interacts more or less." },
      { title: "Instant update", desc: "Change a number and see the range change." },
    ],
    howTo: ["Choose platform.", "Enter followers and engagement rate.", "Read the estimated range.", "Compare with real offers you receive."],
    examples: [
      { title: "10k followers", desc: "5% engagement → modest per-post range for micro creators." },
      { title: "100k followers", desc: "Higher range — still depends on niche and brand budget." },
    ],
    mistakes: ["Treating the number as guaranteed payment.", "Ignoring niche (finance vs comedy pays differently).", "Forgetting usage rights and whitelisting fees."],
    privacyNote: "Numbers stay in your browser; nothing is saved on Sounez.",
    whenNotToUse: "Not for tax, legal, or signed deals — negotiate with real quotes.",
    faqs: [
      { q: "Why is my offer lower?", a: "Brands consider niche, geography, deliverables, and exclusivity." },
      { q: "Is this stored?", a: "No." },
      { q: "Which platforms are supported?", a: "Inputs for TikTok, Instagram, and YouTube-style estimates." },
    ],
    proTips: ["Track actual paid deals in a spreadsheet to calibrate.", "Ask brands for deliverables in writing."],
    relatedSlugs: ["hashtag-generator", "bio-generator", "ai-caption-generator"],
  },
  "hashtag-generator": {
    intro: "Enter a topic and copy a block of hashtags for Instagram, TikTok, or YouTube — mix popular and specific tags yourself before posting.",
    whatItDoes: "Suggests hashtags grouped by relevance to your keyword.",
    whoFor: [
      { title: "Instagram creators", desc: "Fill the caption hashtag block in seconds." },
      { title: "Small businesses", desc: "Local and product tags for launch posts." },
      { title: "Agencies", desc: "Starter sets interns can refine per client." },
    ],
    features: [
      { title: "Platform-aware", desc: "Lengths suited to different networks." },
      { title: "Copy all", desc: "One click to grab the full set." },
      { title: "Free", desc: "No account; fair-use limits on heavy use." },
    ],
    howTo: ["Type your topic or product.", "Generate.", "Delete tags that feel spammy or irrelevant.", "Paste under your caption."],
    examples: [
      { title: "Coffee shop", desc: "Tags for latte art reel + neighbourhood name tags you add manually." },
      { title: "Fitness coach", desc: "Workout tags plus your branded tag you reuse every post." },
    ],
    mistakes: ["Using banned or shadowbanned tags without checking.", "Maxing hashtags with irrelevant trends.", "Same block on every post forever."],
    privacyNote: "Your topic is used only to generate tags and is not published.",
    whenNotToUse: "Hashtags help discovery but do not replace good content and consistency.",
    faqs: [
      { q: "How many should I use?", a: "Platform-dependent — many creators use 3–15 focused tags." },
      { q: "Can I save sets?", a: "Copy into a notes app or scheduler." },
      { q: "Do I need an account?", a: "No — generate and copy in one visit." },
    ],
    proTips: ["Keep one branded hashtag on every post.", "Rotate tags so you are not repetitive."],
    relatedSlugs: ["ai-caption-generator", "youtube-tags-generator", "bio-generator"],
  },
  "color-palette-generator": {
    intro: "Pick a base colour or upload an image and get a harmonious palette with hex codes you can paste into CSS or Figma.",
    whatItDoes: "Calculates related colours (complementary, analogous, etc.) and shows swatches with codes.",
    whoFor: [
      { title: "Web developers", desc: "Ship a coherent UI without opening a design app." },
      { title: "Brand starters", desc: "Explore directions before hiring a designer." },
      { title: "Students", desc: "Learn how colour relationships work with live examples." },
    ],
    features: [
      { title: "Harmony modes", desc: "Switch schemes and compare quickly." },
      { title: "Copy hex", desc: "One click per swatch." },
      { title: "Image extract", desc: "Pull colours from a reference photo." },
    ],
    howTo: ["Choose a starting colour or image.", "Switch harmony type.", "Copy hex values you like.", "Test contrast for text pairs."],
    examples: [
      { title: "SaaS landing", desc: "Blue primary + neutral greys from complementary mode." },
      { title: "Food blog", desc: "Warm palette extracted from a soup photo." },
    ],
    mistakes: ["Using low-contrast text on accent colours.", "Too many equally loud colours on one screen.", "Skipping accessibility check for buttons."],
    privacyNote: "Runs in your browser. Uploaded images for extraction are not sent to Sounez servers.",
    whenNotToUse: "Print projects still need CMYK review with a professional proof.",
    faqs: [
      { q: "Commercial use?", a: "Yes — the palette you build is yours." },
      { q: "Saved palettes?", a: "Copy codes to your project file." },
      { q: "Can I pull colours from a photo?", a: "Yes — upload an image to extract a starting palette." },
    ],
    proTips: ["Pick one dominant, one accent, one neutral.", "Test #fff and #000 text on each swatch."],
    relatedSlugs: ["css-gradient-generator", "box-shadow-generator", "font-pairing-tool"],
  },
  "css-gradient-generator": {
    intro: "Drag stops and angles to build a CSS gradient, then copy the `background` line into your stylesheet.",
    whatItDoes: "Live-previews linear and radial gradients and outputs ready-to-paste CSS.",
    whoFor: [
      { title: "Front-end devs", desc: "Hero backgrounds without guessing stop positions." },
      { title: "No-code builders", desc: "Paste into custom CSS blocks." },
      { title: "Designers", desc: "Prototype gradients before handing off." },
    ],
    features: [
      { title: "Live preview", desc: "See changes as you drag stops." },
      { title: "Linear & radial", desc: "Switch types without starting over." },
      { title: "Copy CSS", desc: "Includes vendor-prefixed fallbacks where useful." },
    ],
    howTo: ["Add or move colour stops.", "Set angle or centre.", "Preview on the box.", "Copy CSS into your project."],
    examples: [
      { title: "Sunset hero", desc: "Orange → pink → purple at 135deg behind white headline." },
      { title: "Subtle card", desc: "Light grey radial for depth on a white dashboard." },
    ],
    mistakes: ["Banding on wide gradients — add a mid stop.", "Text contrast fails on busy gradients.", "Huge gradients on every section slowing perception."],
    privacyNote: "Entirely in-browser; nothing uploaded.",
    whenNotToUse: "Very dark gradients behind body text without an overlay.",
    faqs: [
      { q: "Works in all browsers?", a: "Modern browsers yes; check older targets if you support them." },
      { q: "Tailwind?", a: "Paste into arbitrary values or extend theme." },
      { q: "Radial gradients too?", a: "Yes — switch between linear and radial in the editor." },
    ],
    proTips: ["Add a semi-transparent overlay for text on photos.", "Use subtle gradients for cards, bold for heroes."],
    relatedSlugs: ["color-palette-generator", "background-pattern-generator", "box-shadow-generator"],
  },
  "qr-code-generator": {
    intro: "Type a link or text and download a PNG QR code — handy for menus, flyers, Wi-Fi, and quick device tests.",
    whatItDoes: "Renders a QR image in your browser from the characters you enter.",
    whoFor: [
      { title: "Cafés and shops", desc: "Link to menus or Google reviews on tables." },
      { title: "Event hosts", desc: "Check-in URLs on posters." },
      { title: "Developers", desc: "Test deep links on a phone." },
    ],
    features: [
      { title: "Live preview", desc: "Updates as you type." },
      { title: "Colours & size", desc: "Brand colours within readable contrast." },
      { title: "PNG download", desc: "512px option for print." },
    ],
    howTo: ["Paste URL or text.", "Check preview scans on your phone.", "Adjust size and colours.", "Download PNG."],
    examples: [
      { title: "Wi-Fi", desc: "WIFI:T:WPA;S:Guest;P:password;; format for guest network." },
      { title: "Menu", desc: "https://yoursite.com/menu-table-4 for table tents." },
    ],
    mistakes: ["Low contrast colours phones cannot read.", "Tiny print size.", "Encoding passwords in public QRs."],
    privacyNote: "Generated locally — Sounez does not receive your QR content.",
    whenNotToUse: "Do not point public codes at staging logins or private docs.",
    faqs: [
      { q: "Do codes expire?", a: "The image is static; the destination must stay live." },
      { q: "Commercial use?", a: "Yes." },
      { q: "Can I brand the QR colours?", a: "Yes — pick colours with enough contrast for phone cameras." },
    ],
    proTips: ["Test scan distance before printing 500 flyers.", "Use 512px for print."],
    relatedSlugs: ["word-counter", "password-generator", "favicon-generator"],
  },
  "word-counter": {
    intro: "Paste text and see words, characters, sentences, and reading time — helpful before hitting a platform limit.",
    whatItDoes: "Counts statistics in real time as you type or paste.",
    whoFor: [
      { title: "Writers", desc: "Check essay or article length." },
      { title: "Marketers", desc: "Fit ad copy into character limits." },
      { title: "Students", desc: "Verify assignment word counts." },
    ],
    features: [
      { title: "Live counts", desc: "Updates on every keystroke." },
      { title: "Reading time", desc: "Rough minutes at average speed." },
      { title: "Private", desc: "Text stays in the tab." },
    ],
    howTo: ["Paste or type your text.", "Read word and character totals.", "Adjust until you meet your target."],
    examples: [
      { title: "Meta description", desc: "Keep under 160 characters with live counter." },
      { title: "Essay draft", desc: "Track 1,500-word target while editing." },
    ],
    mistakes: ["Counting footnotes you forgot to paste.", "Confusing characters with bytes for SMS."],
    privacyNote: "Text is not sent to Sounez servers.",
    whenNotToUse: "Not a grammar or plagiarism checker.",
    faqs: [
      { q: "Saved anywhere?", a: "No." },
      { q: "Includes spaces?", a: "Character count includes spaces; word count uses standard splitting." },
      { q: "Reading time accurate?", a: "It is an estimate at average reading speed — adjust for dense or technical text." },
    ],
    proTips: ["Strip formatting in a plain editor first.", "Use reading time for video scripts."],
    relatedSlugs: ["text-case-converter", "ai-caption-generator", "study-notes-generator"],
  },
  "password-generator": {
    intro: "Create a strong random password with the length and symbols you need, then copy it into your manager.",
    whatItDoes: "Uses secure randomness in your browser to build a password string.",
    whoFor: [
      { title: "Anyone resetting logins", desc: "Replace reused passwords quickly." },
      { title: "IT helpers", desc: "Generate temp passwords for family or clients." },
      { title: "Developers", desc: "Demo accounts and test fixtures." },
    ],
    features: [
      { title: "Length slider", desc: "Up to long passphrases." },
      { title: "Character toggles", desc: "Symbols, numbers, ambiguous chars off." },
      { title: "Copy button", desc: "One click to clipboard." },
    ],
    howTo: ["Set length and character types.", "Generate.", "Copy immediately into a password manager.", "Do not share by email or chat."],
    examples: [
      { title: "Email account", desc: "16+ chars with symbols for a new Gmail." },
      { title: "Wi-Fi", desc: "Readable passphrase you type once on the router." },
    ],
    mistakes: ["Pasting into Slack.", "Generating once and reusing everywhere.", "Losing it because you did not save in a manager."],
    privacyNote: "Generated locally; Sounez never sees your password.",
    whenNotToUse: "Not for memorised PINs you type often — consider a manager instead.",
    faqs: [
      { q: "How random is it?", a: "Uses the browser crypto API." },
      { q: "Stored?", a: "No." },
      { q: "Can I exclude confusing symbols?", a: "Yes — turn off ambiguous characters if a site rejects them." },
    ],
    proTips: ["Use 16+ characters for important accounts.", "Turn off ambiguous symbols if a site rejects them."],
    relatedSlugs: ["text-case-converter", "qr-code-generator", "word-counter"],
  },
  "text-case-converter": {
    intro: "Switch text between uppercase, lowercase, title case, sentence case, and more in one paste.",
    whatItDoes: "Transforms the casing of your pasted string instantly.",
    whoFor: [
      { title: "Developers", desc: "Fix constants and CSS class names." },
      { title: "Editors", desc: "Normalise headings from ALL CAPS drafts." },
      { title: "Data cleanup", desc: "Fix exported CSV labels." },
    ],
    features: [
      { title: "Many modes", desc: "Upper, lower, title, sentence, alternating, and more." },
      { title: "Live output", desc: "See result as you paste." },
      { title: "Copy", desc: "Grab converted text quickly." },
    ],
    howTo: ["Paste source text.", "Pick a case style.", "Copy the result."],
    examples: [
      { title: "CSS class", desc: "my-button-component → MY-BUTTON-COMPONENT for a constant." },
      { title: "Headline fix", desc: "ALL CAPS press release → Title Case for web." },
    ],
    mistakes: ["Title-casing articles (a, the) when style guides differ.", "Changing meaning in case-sensitive passwords."],
    privacyNote: "Processed in your browser only.",
    whenNotToUse: "Not for translating languages or fixing typos.",
    faqs: [
      { q: "Unicode?", a: "Works with most common characters; test special scripts if unsure." },
      { q: "Saved?", a: "No." },
      { q: "camelCase and kebab-case?", a: "Yes — along with upper, lower, title, and sentence modes." },
    ],
    proTips: ["Keep a backup before bulk-changing legal text.", "Use sentence case for body copy."],
    relatedSlugs: ["word-counter", "password-generator", "ai-caption-generator"],
  },
  "image-compressor": {
    intro: "Shrink JPG, PNG, or WebP files in your browser before uploading to a site, shop, or email.",
    whatItDoes: "Re-encodes images with your quality setting, optional resize, and optional format change.",
    whoFor: [
      { title: "Bloggers", desc: "Faster pages without visible blur on photos." },
      { title: "Sellers", desc: "Batch product shots under marketplace limits." },
      { title: "Anyone emailing photos", desc: "Stay under attachment size caps." },
    ],
    features: [
      { title: "Batch up to 20", desc: "Compress many files, ZIP download." },
      { title: "Quality slider", desc: "Trade size vs detail." },
      { title: "Format convert", desc: "WebP often smallest for photos." },
    ],
    howTo: ["Add images.", "Set quality and optional max width.", "Compress.", "Download singles or ZIP."],
    examples: [
      { title: "Hero JPEG", desc: "2.4 MB → ~400 KB at 80% quality." },
      { title: "Shop grid", desc: "12 PNGs → WebP batch for upload." },
    ],
    mistakes: ["Quality below 50% on portraits.", "JPEG for logos needing transparency.", "Re-compressing already tiny files."],
    privacyNote: "Compression runs locally; images are not uploaded.",
    whenNotToUse: "RAW files, animated GIFs, or print CMYK workflows need other tools.",
    faqs: [
      { q: "Max size?", a: "Very large files may be slow; most under 25 MB work." },
      { q: "WebP support?", a: "All modern browsers accept WebP uploads." },
      { q: "Batch compress?", a: "Up to 20 images with optional ZIP download." },
    ],
    proTips: ["Try WebP for photos, PNG for flat graphics.", "Resize width to 1200px for blog heroes."],
    relatedSlugs: ["png-to-jpg-converter", "image-describer", "background-remover"],
  },
  "ai-caption-generator": {
    intro: "Describe your photo or topic and get three caption drafts for Instagram, TikTok, or LinkedIn.",
    whatItDoes: "Sends your brief to our AI service and returns short caption options.",
    whoFor: [
      { title: "Creators", desc: "Break writer's block on post day." },
      { title: "Shops", desc: "First draft for product posts." },
      { title: "Social managers", desc: "Variants to A/B with clients." },
    ],
    features: [
      { title: "3 options", desc: "Pick or blend lines you like." },
      { title: "Tone control", desc: "Funny, professional, or inspirational." },
      { title: "Copy buttons", desc: "Per caption or all at once." },
    ],
    howTo: ["Describe the image or offer.", "Choose platform and tone.", "Generate.", "Edit, then post."],
    examples: [
      { title: "Bakery reel", desc: "Fresh croissants, weekend hours → warm casual caption." },
      { title: "B2B tip", desc: "LinkedIn tone on a productivity habit." },
    ],
    mistakes: ["Posting without reading for factual errors.", "Same tone for every brand.", "Ignoring platform length limits."],
    privacyNote: "Your topic is sent securely for AI processing and not stored after the response.",
    whenNotToUse: "Not a substitute for disclosing sponsored content or legal claims.",
    faqs: [
      { q: "Free?", a: "Yes with fair-use rate limits." },
      { q: "Needs API?", a: "Works with configured AI; fallback templates if unavailable." },
      { q: "How many options per run?", a: "Three caption drafts so you can pick or combine lines." },
    ],
    proTips: ["Add one specific detail in your brief for better lines.", "Trim hashtags before posting."],
    relatedSlugs: ["hashtag-generator", "bio-generator", "image-describer"],
  },
  "bio-generator": {
    intro: "Answer a few prompts and get a short social bio you can paste into Instagram, TikTok, or X.",
    whatItDoes: "Combines your inputs into bio lines with optional emoji and CTA.",
    whoFor: [
      { title: "New accounts", desc: "Ship a clear bio on day one." },
      { title: "Freelancers", desc: "State what you do and how to contact you." },
      { title: "Creators", desc: "Refresh bio when your offer changes." },
    ],
    features: [
      { title: "Platform length", desc: "Keeps common limits in mind." },
      { title: "Tone options", desc: "Professional, fun, or minimal." },
      { title: "Copy ready", desc: "Paste into profile settings." },
    ],
    howTo: ["Enter role, audience, and link.", "Pick tone.", "Generate and trim to fit.", "Paste into your profile."],
    examples: [
      { title: "Photographer", desc: "City + booking link + portfolio CTA." },
      { title: "Coach", desc: "Who you help + free resource link." },
    ],
    mistakes: ["Cramming every service into one line.", "Broken link you forgot to update.", "Claims you cannot prove."],
    privacyNote: "Inputs may be processed by AI on our servers; not published.",
    whenNotToUse: "Bios still need your real credentials and compliance text where required.",
    faqs: [
      { q: "Can I edit?", a: "Always — output is a starting draft." },
      { q: "Emojis?", a: "Optional depending on tone." },
      { q: "Will it fit my platform?", a: "Output targets common length limits — trim before you save your profile." },
    ],
    proTips: ["One clear outcome per bio.", "Put the link closest to the action you want."],
    relatedSlugs: ["hashtag-generator", "ai-caption-generator", "tiktok-money-calculator"],
  },
  calculator: {
    intro: "A simple calculator in the browser for quick maths — no app install, no history saved on our side.",
    whatItDoes: "Evaluates basic arithmetic with standard buttons.",
    whoFor: [
      { title: "Students", desc: "Check homework steps." },
      { title: "Shoppers", desc: "Compare unit prices." },
      { title: "Anyone at a desk", desc: "One-tab arithmetic." },
    ],
    features: [
      { title: "Keyboard friendly", desc: "Click or type digits." },
      { title: "Instant", desc: "No round trip to a server." },
      { title: "Lightweight", desc: "Opens fast on mobile." },
    ],
    howTo: ["Click or type your expression.", "Press equals.", "Clear and start again."],
    examples: [
      { title: "Tip split", desc: "Bill ÷ 4 + percentage." },
      { title: "Margin", desc: "Selling price minus cost." },
    ],
    mistakes: ["Order of operations surprises — use parentheses mentally.", "Relying on browser calc for tax filings."],
    privacyNote: "Runs locally; we do not log calculations.",
    whenNotToUse: "Scientific or graphing needs require a specialised app.",
    faqs: [
      { q: "Saved history?", a: "No." },
      { q: "Offline?", a: "Works once the page is loaded." },
      { q: "Percentages and roots?", a: "Standard arithmetic including common percent operations on supported buttons." },
    ],
    proTips: ["Double-check financial decisions with a spreadsheet."],
    relatedSlugs: ["word-counter", "tiktok-money-calculator", "study-notes-generator"],
  },
  "business-name-generator": {
    intro: "Describe your business and get name ideas you can check for domains and trademarks yourself.",
    whatItDoes: "AI suggests short brandable names from your industry and vibe.",
    whoFor: [
      { title: "Founders", desc: "Brainstorm before paying for naming agencies." },
      { title: "Side projects", desc: "Fun names for newsletters or shops." },
      { title: "Students", desc: "Class project company names." },
    ],
    features: [
      { title: "Multiple ideas", desc: "Compare several directions." },
      { title: "Style hints", desc: "Modern, playful, premium, etc." },
      { title: "Copy list", desc: "Paste into a spreadsheet to research." },
    ],
    howTo: ["Describe product and audience.", "Pick a style.", "Generate.", "Search domains and trademarks before committing."],
    examples: [
      { title: "Plant shop", desc: "Eco, local, friendly → earthy name ideas." },
      { title: "Dev tool", desc: "Short technical-sounding names." },
    ],
    mistakes: ["Picking a name without checking .com availability.", "Names too similar to famous brands.", "Hard-to-spell words on the phone."],
    privacyNote: "Your brief is sent for AI processing and not stored.",
    whenNotToUse: "We do not provide legal clearance — verify trademarks.",
    faqs: [
      { q: "Are names unique?", a: "No guarantee — you must research." },
      { q: "Commercial use?", a: "Yes after you verify availability." },
      { q: "How many ideas per run?", a: "Several directions — shortlist and check domains before you commit." },
    ],
    proTips: ["Say the name aloud.", "Check social handles too."],
    relatedSlugs: ["website-idea-generator", "bio-generator", "favicon-generator"],
  },
  "website-idea-generator": {
    intro: "Describe who you help and get website angle ideas — useful when you are stuck on what the site should focus on.",
    whatItDoes: "AI lists possible site concepts, pages, and hooks from your inputs.",
    whoFor: [
      { title: "Freelancers", desc: "Portfolio angles for a niche." },
      { title: "Startup ideas", desc: "Landing page themes to test." },
      { title: "Students", desc: "Project brief inspiration." },
    ],
    features: [
      { title: "Structured ideas", desc: "Headlines and page outlines." },
      { title: "Niche input", desc: "Better results with a specific audience." },
      { title: "Copyable", desc: "Move into Notion or a doc." },
    ],
    howTo: ["Describe audience and offer.", "Generate.", "Pick one angle to prototype.", "Validate with real users."],
    examples: [
      { title: "Local plumber", desc: "Emergency vs maintenance positioning." },
      { title: "Course creator", desc: "Outcome-led landing ideas." },
    ],
    mistakes: ["Building every idea at once.", "Skipping customer interviews.", "Copying ideas without differentiation."],
    privacyNote: "Brief processed by AI; not stored.",
    whenNotToUse: "Not a replacement for market research.",
    faqs: [
      { q: "Includes code?", a: "Ideas only — use your stack to build." },
      { q: "Unique?", a: "Treat as brainstorming." },
      { q: "Is this a website builder?", a: "No — concepts and page angles only; you build with your own tools." },
    ],
    proTips: ["One audience per site.", "Match idea to one clear CTA."],
    relatedSlugs: ["business-name-generator", "bio-generator", "color-palette-generator"],
  },
  "study-notes-generator": {
    intro: "Paste a topic or lecture snippet and get structured notes for revision — then verify facts yourself.",
    whatItDoes: "AI formats headings, bullets, and key terms from your input.",
    whoFor: [
      { title: "Students", desc: "Turn dense readings into scan-friendly notes." },
      { title: "Teachers", desc: "Draft study sheets to edit." },
      { title: "Self-learners", desc: "Organise online course transcripts." },
    ],
    features: [
      { title: "Levels", desc: "Beginner to advanced depth." },
      { title: "Export", desc: "Copy or download plain text." },
      { title: "Stream", desc: "See notes appear as they generate." },
    ],
    howTo: ["Enter topic or paste text.", "Choose level.", "Generate.", "Cross-check with your materials."],
    examples: [
      { title: "History unit", desc: "WWI causes → timeline bullets." },
      { title: "Biology", desc: "Paste a paragraph → defined terms list." },
    ],
    mistakes: ["Submitting work you did not write.", "Trusting dates and formulas without checking.", "Pasting entire copyrighted books."],
    privacyNote: "Text sent for AI processing; not kept after response.",
    whenNotToUse: "Do not cheat on exams or impersonate others' work.",
    faqs: [
      { q: "Accurate?", a: "Can contain errors — always verify." },
      { q: "Limits?", a: "Fair-use caps on length and frequency." },
      { q: "Can I export notes?", a: "Copy or download plain text after generation." },
    ],
    proTips: ["Add your own examples under each heading.", "Use notes as flashcard source."],
    relatedSlugs: ["word-counter", "calculator", "resume-generator"],
  },
  "resume-generator": {
    intro: "Fill in your experience and print a clean one-page resume — data stays in your browser.",
    whatItDoes: "Builds a formatted CV preview you can print to PDF or copy as HTML.",
    whoFor: [
      { title: "Job seekers", desc: "First draft in minutes." },
      { title: "Students", desc: "Internship layout without Word wrestling." },
      { title: "Career switchers", desc: "See how a new summary reads." },
    ],
    features: [
      { title: "Live preview", desc: "Updates as you type." },
      { title: "Print to PDF", desc: "Browser print dialog." },
      { title: "HTML copy", desc: "Paste into other templates." },
    ],
    howTo: ["Enter contact info and summary.", "Add roles and education.", "Preview.", "Print or export."],
    examples: [
      { title: "Junior dev", desc: "One job + projects + skills." },
      { title: "Retail to office", desc: "Summary highlights transferable skills." },
    ],
    mistakes: ["False employers or degrees.", "Closing tab before export.", "Two pages for entry-level roles."],
    privacyNote: "Stays on your device; Sounez does not store your CV.",
    whenNotToUse: "Not legal advice — do not list credentials you do not hold.",
    faqs: [
      { q: "ATS friendly?", a: "Simple layout helps; export and test in your target system." },
      { q: "Saved?", a: "No — download before closing." },
      { q: "Watermarks?", a: "No — the PDF or HTML you export is yours." },
    ],
    proTips: ["Use action verbs per bullet.", "One page until you have 10+ years."],
    relatedSlugs: ["study-notes-generator", "word-counter", "business-name-generator"],
  },
  "png-to-jpg-converter": {
    intro: "Convert PNG images to JPG when you need a smaller file and do not need transparency.",
    whatItDoes: "Re-encodes PNG pixels to JPEG in your browser with a quality setting.",
    whoFor: [
      { title: "Web publishers", desc: "Smaller assets for photo content." },
      { title: "Email", desc: "Shrink screenshots without ZIP." },
      { title: "Archivers", desc: "Batch-friendly single files." },
    ],
    features: [
      { title: "Quality control", desc: "Balance size and artefacts." },
      { title: "Preview", desc: "Check before download." },
      { title: "Local", desc: "No upload to Sounez." },
    ],
    howTo: ["Upload PNG.", "Set quality.", "Convert.", "Download JPG."],
    examples: [
      { title: "Screenshot", desc: "UI capture PNG → JPG for a blog post." },
      { title: "Photo export", desc: "Drop transparency, save 40% size." },
    ],
    mistakes: ["Converting logos with transparency — backgrounds turn white.", "Quality 30% on text screenshots."],
    privacyNote: "Processed locally in your browser.",
    whenNotToUse: "Keep PNG when you need alpha (logos, icons).",
    faqs: [
      { q: "Transparency?", a: "Lost in JPG — use PNG or WebP instead." },
      { q: "Batch?", a: "Convert one at a time on this page." },
      { q: "Quality slider?", a: "Yes — lower quality means smaller files and more visible artefacts." },
    ],
    proTips: ["Use 85% for photos, higher for text-heavy images.", "Keep originals archived."],
    relatedSlugs: ["image-compressor", "image-describer", "background-remover"],
  },
  "favicon-generator": {
    intro: "Upload a logo and download favicon sizes plus a web manifest snippet for your site.",
    whatItDoes: "Resizes your image to standard icon dimensions in the browser.",
    whoFor: [
      { title: "Developers", desc: "Ship tab icons without Photoshop." },
      { title: "Indie hackers", desc: "Quick brand mark on a new project." },
      { title: "Designers", desc: "Export client favicon packs." },
    ],
    features: [
      { title: "Multi-size", desc: "16px through 512px common set." },
      { title: "ZIP download", desc: "All icons in one file." },
      { title: "HTML hint", desc: "Link tags to copy." },
    ],
    howTo: ["Upload square or high-res logo.", "Generate pack.", "Download ZIP.", "Add tags to your layout."],
    examples: [
      { title: "Startup launch", desc: "Letter mark → favicon + apple-touch." },
      { title: "Rebrand", desc: "Replace old favicon bundle on deploy." },
    ],
    mistakes: ["Tiny source image — looks blurry when scaled.", "Non-square art without padding.", "Forgetting cache bust after deploy."],
    privacyNote: "Image stays in the browser during generation.",
    whenNotToUse: "Complex animated favicons need dedicated tools.",
    faqs: [
      { q: "SVG favicon?", a: "This tool focuses on raster sizes; SVG can be linked separately." },
      { q: "Commercial?", a: "Yes for your own brand assets." },
      { q: "What sizes are included?", a: "Common set from 16px through 512px in one ZIP." },
    ],
    proTips: ["Start from 512×512 or larger.", "Test on dark and light browser chrome."],
    relatedSlugs: ["image-compressor", "png-to-jpg-converter", "color-palette-generator"],
  },
  "svg-blob-generator": {
    intro: "Tweak random seeds and colours to export an SVG blob shape for backgrounds and illustrations.",
    whatItDoes: "Generates organic SVG paths you can download and drop into HTML or design tools.",
    whoFor: [
      { title: "Landing pages", desc: "Soft shapes behind hero text." },
      { title: "Presentations", desc: "Abstract slides without stock photos." },
      { title: "Developers", desc: "Inline SVG with small file size." },
    ],
    features: [
      { title: "Randomise", desc: "New shapes until one fits." },
      { title: "Colour control", desc: "Match brand hex codes." },
      { title: "SVG copy", desc: "Paste into code or Figma." },
    ],
    howTo: ["Adjust complexity and colour.", "Randomise until you like it.", "Copy SVG or download."],
    examples: [
      { title: "SaaS hero", desc: "Purple blob at 20% opacity behind headline." },
      { title: "Newsletter header", desc: "Small blob beside logo." },
    ],
    mistakes: ["Too busy behind text without overlay.", "Huge path count slowing mobile.", "Same blob on every page feels generic."],
    privacyNote: "Generated locally.",
    whenNotToUse: "Print-heavy brand systems may need vector cleanup in Illustrator.",
    faqs: [
      { q: "Commercial use?", a: "Yes." },
      { q: "Animate?", a: "Add CSS yourself if needed." },
      { q: "What format do I get?", a: "SVG markup to paste inline or save as a file." },
    ],
    proTips: ["Lower opacity for backgrounds.", "Pair with a solid fallback colour."],
    relatedSlugs: ["background-pattern-generator", "css-gradient-generator", "color-palette-generator"],
  },
  "font-pairing-tool": {
    intro: "Browse Google Font pairs chosen for headings and body text, then copy the import link.",
    whatItDoes: "Shows live previews of curated font combinations with CSS ready to paste.",
    whoFor: [
      { title: "Developers", desc: "Pick fonts without browsing hundreds of pages." },
      { title: "Designers", desc: "Quick client mockup typography." },
      { title: "Students", desc: "Learn which pairs work together." },
    ],
    features: [
      { title: "Curated pairs", desc: "Heading + body combos that read well." },
      { title: "Live preview", desc: "See real paragraph text." },
      { title: "CSS copy", desc: "Google Fonts import included." },
    ],
    howTo: ["Browse styles (modern, editorial, etc.).", "Pick a pair.", "Copy CSS.", "Load fonts in your project."],
    examples: [
      { title: "Blog", desc: "Serif heading + sans body for long reads." },
      { title: "App UI", desc: "Geometric sans for both, different weights." },
    ],
    mistakes: ["Loading too many weights — slows page.", "Decorative fonts for body paragraphs.", "Skipping line-height in CSS."],
    privacyNote: "Preview loads fonts from Google; your choices are not stored on Sounez.",
    whenNotToUse: "Licensed brand fonts not on Google need your own files.",
    faqs: [
      { q: "Privacy?", a: "Google Fonts CDN applies their policies when browsers fetch fonts." },
      { q: "Self-host?", a: "Download from Google and host yourself if required." },
      { q: "Google Fonts only?", a: "Curated pairs from Google Fonts with ready-to-copy import CSS." },
    ],
    proTips: ["Limit to two families per site.", "Test on Android and iOS."],
    relatedSlugs: ["color-palette-generator", "css-gradient-generator", "box-shadow-generator"],
  },
  "image-placeholder-generator": {
    intro: "Set width, height, colours, and label text to download a placeholder image for mockups.",
    whatItDoes: "Renders a simple SVG or PNG placeholder with your dimensions.",
    whoFor: [
      { title: "Developers", desc: "Wireframes before real assets exist." },
      { title: "Designers", desc: "Layout grids in presentations." },
      { title: "QA", desc: "Test image slots at exact sizes." },
    ],
    features: [
      { title: "Exact pixels", desc: "Match component sizes." },
      { title: "Custom colours", desc: "Match wireframe palette." },
      { title: "Label text", desc: "Show dimensions on the image." },
    ],
    howTo: ["Enter width and height.", "Pick colours and label.", "Download SVG or PNG."],
    examples: [
      { title: "Card grid", desc: "400×300 grey blocks in a Figma handoff." },
      { title: "Hero", desc: "1920×1080 labelled placeholder." },
    ],
    mistakes: ["Shipping placeholders to production.", "Wrong aspect ratio for real photos later."],
    privacyNote: "Generated in browser.",
    whenNotToUse: "Replace with real alt text and photos before launch.",
    faqs: [
      { q: "Retina?", a: "Set 2× dimensions if you need sharper mockups." },
      { q: "SVG size?", a: "Scales cleanly for responsive layouts." },
      { q: "PNG or SVG output?", a: "Both — pick what fits your mockup or handoff." },
    ],
    proTips: ["Match final aspect ratio to avoid layout shift later."],
    relatedSlugs: ["image-compressor", "favicon-generator", "background-pattern-generator"],
  },
  "box-shadow-generator": {
    intro: "Adjust blur, spread, and colour on a box, then copy the CSS `box-shadow` value.",
    whatItDoes: "Live-previews shadow layers and outputs CSS.",
    whoFor: [
      { title: "Front-end devs", desc: "Card elevation without guessing values." },
      { title: "UI designers", desc: "Consistent depth system." },
      { title: "Students", desc: "See how each parameter changes the look." },
    ],
    features: [
      { title: "Multi-layer", desc: "Stack shadows for depth." },
      { title: "Presets", desc: "Soft, medium, strong starting points." },
      { title: "Copy CSS", desc: "One line into your stylesheet." },
    ],
    howTo: ["Tweak offsets and blur.", "Add a second layer if needed.", "Copy CSS.", "Test on real content."],
    examples: [
      { title: "Card", desc: "Subtle 0 4px 20px rgba shadow." },
      { title: "Floating button", desc: "Stronger shadow on hover state." },
    ],
    mistakes: ["Heavy shadows on every element.", "Dark shadows on dark backgrounds.", "Forgetting focus styles."],
    privacyNote: "Runs locally.",
    whenNotToUse: "Performance-sensitive lists with hundreds of shadowed items.",
    faqs: [
      { q: "Inset shadows?", a: "Toggle inset in the tool if available." },
      { q: "Tailwind?", a: "Map values to shadow utilities." },
      { q: "Stack multiple shadows?", a: "Yes — layer shadows and copy one CSS declaration." },
    ],
    proTips: ["Use one elevation scale across the app.", "Softer shadows in dark mode."],
    relatedSlugs: ["css-gradient-generator", "color-palette-generator", "background-pattern-generator"],
  },
  "background-pattern-generator": {
    intro: "Pick dots, lines, or grids and copy CSS for a repeating background on sections or cards.",
    whatItDoes: "Outputs `background-image` CSS for lightweight patterns.",
    whoFor: [
      { title: "Landing pages", desc: "Subtle texture without image weight." },
      { title: "Dashboards", desc: "Separate sections visually." },
      { title: "Developers", desc: "No PNG pattern files to manage." },
    ],
    features: [
      { title: "Pattern types", desc: "Dots, lines, grids, waves." },
      { title: "Colour control", desc: "Match light or dark UI." },
      { title: "Copy CSS", desc: "Paste into global or module CSS." },
    ],
    howTo: ["Choose pattern.", "Set size and colour.", "Preview.", "Copy CSS."],
    examples: [
      { title: "Footer", desc: "Light dot grid on grey background." },
      { title: "Hero", desc: "Wide line pattern at low opacity." },
    ],
    mistakes: ["High contrast patterns behind text.", "Busy patterns on mobile.", "Animating patterns without need."],
    privacyNote: "CSS generated locally.",
    whenNotToUse: "Large photographic textures need real images.",
    faqs: [
      { q: "Performance?", a: "CSS patterns are light vs big PNGs." },
      { q: "Dark mode?", a: "Generate a second palette for dark sections." },
      { q: "Need image files?", a: "No — patterns are CSS only, so there is no PNG tile to host." },
    ],
    proTips: ["Keep opacity under 15% for readability.", "Test with real paragraph text on top."],
    relatedSlugs: ["css-gradient-generator", "svg-blob-generator", "box-shadow-generator"],
  },
};

EDITORIAL["business-name-generator"].relatedSlugs = ["website-idea-generator", "bio-generator", "favicon-generator"];

function defaultEditorial(slug: string): ToolEditorialContent {
  const tool = toolBySlug(slug);
  const name = tool?.name ?? slug;
  return {
    intro: tool?.description ?? `${name} runs on Sounez in your browser. Open the page, follow the fields, and copy or download your result.`,
    whatItDoes: tool?.description ?? `${name} performs one focused job so you do not need a separate desktop app.`,
    whoFor: [
      { title: "Quick tasks", desc: "Anyone who needs a result once without installing software." },
      { title: "Mobile users", desc: "Works in a phone browser — no app store download." },
    ],
    features: [
      { title: "No account", desc: "Open and use for typical day-to-day jobs." },
      { title: "Clear steps", desc: "Fields and buttons are labeled on the page above." },
    ],
    howTo: [
      "Open the tool and read the privacy note if you are uploading files.",
      "Enter your input in the form or upload area.",
      "Review the output, then copy or download.",
    ],
    examples: [
      { title: "Typical use", desc: `Use ${name} for the single task described on this page, then move on.` },
    ],
    mistakes: ["Skipping the privacy note before uploading sensitive files.", "Closing the tab before you copy or download your result."],
    privacyNote: "See the privacy section on this page. Browser-only tools keep data in your tab; server-backed tools explain what is sent.",
    whenNotToUse: "Choose professional desktop software when you need advanced features, batch automation, or team workflows.",
    faqs: [
      { q: "Is it free?", a: "Yes for normal use. Fair-use limits may apply on AI or server processing." },
      { q: "Do I need an account?", a: "No account is required for everyday use." },
      { q: "Is my input stored?", a: "Check the privacy note on this page — it varies by tool." },
    ],
    proTips: ["Bookmark the page if you use it weekly.", "Read the related tools section for the next step in your workflow."],
    relatedSlugs: [],
  };
}

export function getToolEditorial(slug: string): ToolEditorialContent {
  return EDITORIAL[slug] ?? defaultEditorial(slug);
}

