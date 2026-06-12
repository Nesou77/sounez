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
      { title: "No account", desc: "Convert when you need it - fair-use limits apply on the server." },
    ],
    howTo: ["Drop your PDF on the upload area.", "Pick options that match the file (OCR for scans).", "Start conversion and wait for the DOCX.", "Download and proofread in Word."],
    examples: [
      { title: "Typed contract", desc: "12-page text PDF -> DOCX with headings you can redline." },
      { title: "Scanned form", desc: "Phone photo PDF with OCR -> editable text to fill gaps." },
    ],
    mistakes: ["Expecting perfect tables from magazine layouts.", "Uploading password-locked PDFs.", "Skipping proofread on OCR output."],
    privacyNote: "Your PDF is processed on our servers and removed after conversion. Only upload documents you are permitted to process through a third-party service.",
    whenNotToUse: "Do not upload confidential or classified files unless your organisation allows third-party conversion. For highly sensitive legal or medical documents, use an offline conversion tool instead.",
    faqs: [
      { q: "Is my file stored after conversion?", a: "No. Your PDF is used only to produce the DOCX output, then permanently deleted from the server. It is not retained, indexed, or used for any other purpose." },
      { q: "Will formatting match exactly?", a: "Simple layouts with standard paragraphs and headings convert well. Complex designs with multi-column layouts, tables, or embedded charts may need manual touch-up in Word after conversion." },
      { q: "What do I get after conversion?", a: "A DOCX file you can open in Microsoft Word, Google Docs, or LibreOffice. The file is fully editable and ready to modify." },
    ],
    proTips: ["Split huge PDFs by chapter for cleaner output.", "Enable OCR only when the PDF is image-based."],
    relatedSlugs: ["word-counter", "text-case-converter", "image-compressor"],
  },
  "background-remover": {
    intro: "Cut out a person, product, or object and download a PNG with a transparent background — all processing stays on your device, so nothing is uploaded.",
    whatItDoes: "Runs an on-device AI model in your browser to separate the subject from the background, producing a clean transparent PNG you can use in design tools or on the web.",
    whoFor: [
      { title: "Shop owners", desc: "White or transparent product shots for marketplaces." },
      { title: "Designers", desc: "Quick cutouts for composites and mockups." },
      { title: "Creators", desc: "Thumbnails and stickers without a green screen." },
    ],
    features: [
      { title: "On-device AI", desc: "Image bytes stay in your browser; models load from a CDN." },
      { title: "PNG output", desc: "Transparency preserved for design tools." },
      { title: "Optional fill", desc: "Add white, black, or a custom color behind the subject." },
    ],
    howTo: ["Upload PNG, JPG, or WEBP (max 10 MB).", "Preview the image.", "Run removal and check edges.", "Download PNG or add a solid background."],
    examples: [
      { title: "Product on a table", desc: "Isolate a mug and place it on a plain shop background." },
      { title: "Headshot", desc: "Remove a messy room for a LinkedIn banner." },
    ],
    mistakes: ["Using low-contrast backgrounds with hair detail.", "Expecting perfect edges on glass or fine mesh.", "Saving as JPEG when you need transparency."],
    privacyNote: "Processing happens locally in your browser using an on-device AI model. Your image is never uploaded to Sounez servers. Model files download once from the configured CDN.",
    whenNotToUse: "Skip busy crowd photos where multiple people are close together, as edge detection becomes unreliable. Also avoid images you do not have the rights to edit or redistribute.",
    faqs: [
      { q: "Does it upload my photo to a server?", a: "No. Background removal runs entirely in your browser using a local AI model. Your image never leaves your device and is not sent to Sounez or any third-party server." },
      { q: "Why is the first run slow?", a: "The AI model downloads once the first time you use the tool, then later runs are faster. Subsequent removals in the same session do not need to re-download the model." },
      { q: "Which file types work?", a: "PNG, JPG, and WEBP up to 10 MB on most devices. Very large or high-resolution images may be slower depending on your device's available memory." },
    ],
    proTips: ["Shoot subjects with clear edges when you can.", "Zoom to check hair before publishing."],
    relatedSlugs: ["image-compressor", "png-to-jpg-converter", "image-describer"],
  },
  "image-describer": {
    intro: "Upload a photo and get alt text, captions, keywords, and a short social line — then edit anything that is not quite right before publishing.",
    whatItDoes: "Sends your image to our AI vision service and returns several text fields covering accessibility alt text, SEO descriptions, and social captions in one pass.",
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
      { title: "Product hero", desc: "SEO tone -> alt text + keywords for a kettle listing." },
      { title: "Event photo", desc: "Social tone -> caption with a natural CTA." },
    ],
    mistakes: ["Publishing alt text you did not verify against the image.", "Keyword stuffing inside alt attributes.", "Uploading private documents as images."],
    privacyNote: "Images are sent securely to our AI vision service for analysis. They are not retained after the response is generated and are not used for model training.",
    whenNotToUse: "Avoid uploading ID cards, medical images, or anything containing personally identifiable information you would not share with a third-party processor. Always review AI-generated alt text before publishing — it can miss context or contain subtle errors.",
    faqs: [
      { q: "Can I use the generated text commercially?", a: "Yes, after you review and edit it. You are responsible for verifying that the description accurately reflects the image before using it in any commercial or published context." },
      { q: "Is the AI always correct?", a: "No. AI vision can miss context, misidentify objects, or produce generic descriptions. Always review the output against the actual image before publishing, especially for product listings or accessibility use." },
      { q: "Can I change the output tone?", a: "Yes — choose from accessibility, SEO, descriptive, or social-focused output before generating. Each tone shapes how the description is written and what it prioritizes." },
    ],
    proTips: ["Use accessibility tone for informative images; keep alt text under ~125 characters when possible.", "Match keywords to visible content only — do not add keywords for things not in the image."],
    relatedSlugs: ["image-compressor", "ai-caption-generator", "hashtag-generator"],
  },
  "youtube-tags-generator": {
    intro: "Type a video topic and get a list of tags you can paste into YouTube Studio — useful as a starting point, not a guarantee of rankings.",
    whatItDoes: "Builds a set of related tags from your keyword using our tag rules and suggestions, sized to fit YouTube's typical tag field limits.",
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
      { title: "Tutorial video", desc: "Topic 'Excel pivot tables beginner' to how-to and software-related tags." },
      { title: "Vlog", desc: "Topic 'morning routine 2026' to lifestyle tags without spam." },
    ],
    mistakes: ["Using tags that do not appear in the video.", "Copying competitor tags blindly.", "Relying on tags instead of title and watch time."],
    privacyNote: "Your keyword is processed to generate the tag list and is not stored or linked to your account. Sounez does not retain your topic input after generating the list.",
    whenNotToUse: "Tags alone will not fix misleading titles or low audience retention. YouTube's algorithm weights watch time, click-through rate, and viewer satisfaction far more heavily than tags. Focus on those first.",
    faqs: [
      { q: "Do YouTube tags still matter for rankings?", a: "They help YouTube understand context, especially for new channels, but title, thumbnail, and audience retention matter far more for discoverability. Use tags as a supplement, not a strategy." },
      { q: "Can I edit the generated tag list?", a: "Yes — treat the output as a draft starting point. Remove tags that are not accurate to your video, and add any specific terms you know your audience searches for." },
      { q: "How many tags are generated?", a: "Up to 25 per run — enough to fill a typical YouTube tag field. YouTube's internal character limit for all tags combined is around 500 characters." },
    ],
    proTips: ["Mirror language from your title in a few tags.", "Drop duplicate or overly broad tags."],
    relatedSlugs: ["hashtag-generator", "ai-caption-generator", "bio-generator"],
  },
  "tiktok-money-calculator": {
    intro: "Get a rough estimate of what a sponsored post might pay based on your followers and engagement — useful for planning and sanity-checking offers, not a contract rate.",
    whatItDoes: "Applies standard influencer rate formulas to your follower count and engagement rate, returning a ballpark range per sponsored post.",
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
      { title: "10k followers", desc: "5% engagement -> modest per-post range for micro creators." },
      { title: "100k followers", desc: "Higher range - still depends on niche and brand budget." },
    ],
    mistakes: ["Treating the number as guaranteed payment.", "Ignoring niche (finance vs comedy pays differently).", "Forgetting usage rights and whitelisting fees."],
    privacyNote: "The follower and engagement numbers you enter stay in your browser session only. Sounez does not receive or store any account data you input into the calculator.",
    whenNotToUse: "Not for tax, legal, or signed deals. Always negotiate with real quotes and get deliverables in writing. This calculator does not account for niche value, exclusivity clauses, usage rights, or whitelisting fees, which can significantly change real rates.",
    faqs: [
      { q: "Why is my actual brand offer lower than the estimate?", a: "Brands consider niche, geography, deliverables, exclusivity, and their own budget constraints. The calculator uses averages — your niche, audience quality, and relationship with the brand all affect the real number." },
      { q: "Is my data stored anywhere?", a: "No. The numbers you enter stay in your browser only. Sounez does not receive or log any data from the calculator. When you close the tab, the session ends." },
      { q: "Which platforms are supported?", a: "The calculator includes input fields for TikTok, Instagram, and YouTube-style follower and engagement estimates. Each platform uses slightly different rate formulas." },
    ],
    proTips: ["Track actual paid deals in a spreadsheet to calibrate your real rates over time.", "Ask brands for deliverables and usage rights in writing before accepting any offer."],
    relatedSlugs: ["hashtag-generator", "bio-generator", "ai-caption-generator"],
  },
  "hashtag-generator": {
    intro: "Enter a topic and copy a block of hashtags for Instagram, TikTok, or YouTube — then review and mix popular and specific tags yourself before posting.",
    whatItDoes: "Suggests hashtags grouped by relevance to your keyword, sized to fit platform limits and ready to paste into your caption or description.",
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
    privacyNote: "Your topic keyword is used only to generate the tag list and is not stored on Sounez servers or linked to your account in any way.",
    whenNotToUse: "Hashtags help discovery but cannot replace good content quality and posting consistency. Do not use generated hashtags without reviewing them first — some may be temporarily banned or irrelevant to your audience and could reduce reach.",
    faqs: [
      { q: "How many hashtags should I use per post?", a: "Platform recommendations vary. Many creators find 3–15 focused, relevant tags outperform larger generic blocks. On TikTok, 3–6 specific tags often outperform 30 broad ones. Test different amounts and check your analytics." },
      { q: "Can I save my hashtag sets?", a: "Copy the set into a notes app, Notion page, or social scheduler for reuse. Sounez does not store generated sets — copy them before closing the tab." },
      { q: "Do I need an account to use the hashtag generator?", a: "No. Open the page, enter your topic, generate, copy your tags, and close — no sign-up or login required." },
    ],
    proTips: ["Keep one branded hashtag on every post to build a searchable archive over time.", "Rotate tag sets between posts so the algorithm does not treat your account as repetitive."],
    relatedSlugs: ["ai-caption-generator", "youtube-tags-generator", "bio-generator"],
  },
  "color-palette-generator": {
    intro: "Pick a base color or upload an image and get a harmonious palette with hex codes you can paste into CSS or Figma — no design app required.",
    whatItDoes: "Calculates related colors using color theory (complementary, analogous, triadic, etc.) and shows live swatches with copyable hex codes.",
    whoFor: [
      { title: "Web developers", desc: "Ship a coherent UI without opening a design app." },
      { title: "Brand starters", desc: "Explore directions before hiring a designer." },
      { title: "Students", desc: "Learn how color relationships work with live examples." },
    ],
    features: [
      { title: "Harmony modes", desc: "Switch schemes and compare quickly." },
      { title: "Copy hex", desc: "One click per swatch." },
      { title: "Image extract", desc: "Pull colors from a reference photo." },
    ],
    howTo: ["Choose a starting color or image.", "Switch harmony type.", "Copy hex values you like.", "Test contrast for text pairs."],
    examples: [
      { title: "SaaS landing", desc: "Blue primary + neutral grays from complementary mode." },
      { title: "Food blog", desc: "Warm palette extracted from a soup photo." },
    ],
    mistakes: ["Using low-contrast text on accent colors.", "Too many equally loud colors on one screen.", "Skipping accessibility check for buttons."],
    privacyNote: "The color generator runs entirely in your browser. Uploaded images for color extraction are not sent to Sounez servers — all processing happens locally on your device.",
    whenNotToUse: "Print projects still need CMYK review with a professional proof. Web hex codes do not translate directly to print CMYK values, so always verify print output with a designer or proof print before production.",
    faqs: [
      { q: "Can I use generated palettes commercially?", a: "Yes. Any palette you generate on this page is yours to use without restriction in personal, commercial, or client projects. There is no licensing fee or attribution requirement." },
      { q: "Can I save my color palettes?", a: "Copy the hex codes into your project file, a design tool like Figma, or a notes document. Sounez does not store palettes between sessions, so copy before closing the tab." },
      { q: "Can I pull colors from a photo?", a: "Yes — upload an image to extract a starting palette from the dominant colors in the photo. This is useful for matching a brand identity to existing photography or visual assets." },
    ],
    proTips: ["Pick one dominant, one accent, one neutral for a clean system.", "Test #fff and #000 text on each swatch to check contrast before committing."],
    relatedSlugs: ["css-gradient-generator", "box-shadow-generator", "font-pairing-tool"],
  },
  "css-gradient-generator": {
    intro: "Drag stops and angles to build a CSS gradient visually, then copy the ready-to-use background line directly into your stylesheet.",
    whatItDoes: "Live-previews linear and radial gradients as you adjust color stops, outputs ready-to-paste CSS with no manual value guessing.",
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
    howTo: ["Add or move color stops.", "Set angle or center.", "Preview on the box.", "Copy CSS into your project."],
    examples: [
      { title: "Sunset hero", desc: "Orange -> pink -> purple at 135deg behind white headline." },
      { title: "Subtle card", desc: "Light gray radial for depth on a white dashboard." },
    ],
    mistakes: ["Banding on wide gradients - add a mid stop.", "Text contrast fails on busy gradients.", "Huge gradients on every section slowing perception."],
    privacyNote: "The gradient generator runs entirely in your browser. No color values or CSS output are sent to Sounez servers. Everything is computed locally as you interact with the tool.",
    whenNotToUse: "Avoid very dark gradients directly behind body text without a contrasting overlay. Text legibility on gradient backgrounds is notoriously hard to test — always verify WCAG contrast at the lightest and darkest points of the gradient.",
    faqs: [
      { q: "Does the CSS work in all browsers?", a: "Yes, in all modern browsers. The generated CSS uses standard syntax supported by Chrome, Firefox, Safari, and Edge. If you need to support very old browsers, test accordingly or add a solid color fallback." },
      { q: "Can I use gradient CSS in Tailwind?", a: "Yes. Paste the CSS value into a Tailwind config under extend.backgroundImage as a named utility, or use it as an arbitrary value class in your markup with the bracket syntax." },
      { q: "Does it support radial gradients too?", a: "Yes — switch between linear and radial gradient types in the editor without losing your color stops." },
    ],
    proTips: ["Add a semi-transparent dark overlay between a photo and white text for legibility.", "Use subtle gradients on cards, bold gradients on hero sections."],
    relatedSlugs: ["color-palette-generator", "background-pattern-generator", "box-shadow-generator"],
  },
  "qr-code-generator": {
    intro: "Type a link or text and download a PNG QR code — handy for menus, event flyers, Wi-Fi credentials, and quick device-to-device link transfers.",
    whatItDoes: "Renders a QR image in your browser from the URL or text you enter, with live preview, brand color options, and PNG download.",
    whoFor: [
      { title: "Cafés and shops", desc: "Link to menus or Google reviews on tables." },
      { title: "Event hosts", desc: "Check-in URLs on posters." },
      { title: "Developers", desc: "Test deep links on a phone." },
    ],
    features: [
      { title: "Live preview", desc: "Updates as you type." },
      { title: "Colors & size", desc: "Brand colors within readable contrast." },
      { title: "PNG download", desc: "512px option for print." },
    ],
    howTo: ["Paste URL or text.", "Check preview scans on your phone.", "Adjust size and colors.", "Download PNG."],
    examples: [
      { title: "Wi-Fi", desc: "WIFI:T:WPA;S:Guest;P:password;; format for guest network." },
      { title: "Menu", desc: "https://yoursite.com/menu-table-4 for table tents." },
    ],
    mistakes: ["Low contrast colors phones cannot read.", "Tiny print size.", "Encoding passwords in public QRs."],
    privacyNote: "QR codes are generated entirely in your browser. Sounez does not receive the URL or text you encode. Nothing is sent to a server, stored, or logged.",
    whenNotToUse: "Do not point public QR codes at staging login pages, private documents, or internal admin URLs that should not be accessible to the general public.",
    faqs: [
      { q: "Do QR codes expire?", a: "The generated image is static and does not expire. However, the destination URL or content must stay live. If the linked page goes offline or moves, the code will stop working." },
      { q: "Can I use generated QR codes commercially?", a: "Yes. QR codes you generate are free to use in any commercial context — printed materials, product packaging, marketing campaigns, or client projects — with no attribution required." },
      { q: "Can I brand the QR code with custom colors?", a: "Yes — pick foreground and background colors, but maintain high contrast so phone cameras can reliably scan the code. Test the colored version on at least two different phones before printing at scale." },
    ],
    proTips: ["Test scan distance before printing 500 flyers.", "Use 512px resolution for any print application."],
    relatedSlugs: ["word-counter", "password-generator", "favicon-generator"],
  },
  "word-counter": {
    intro: "Paste text and instantly see word count, character count, sentence count, and estimated reading time — all before you hit a platform character limit or word target.",
    whatItDoes: "Counts statistics in real time as you type or paste, updating every keystroke with words, characters, sentences, and an average reading time estimate.",
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
    privacyNote: "Your text is never sent to Sounez servers. All counting happens locally in your browser. When you close the tab or clear the input, the text is gone completely.",
    whenNotToUse: "Not a grammar checker or plagiarism detector. If you need to check spelling and grammar, use a dedicated writing tool like Grammarly. If you need plagiarism detection, use an academic tool designed for that purpose.",
    faqs: [
      { q: "Is my text saved anywhere?", a: "No. Your text stays entirely in your browser tab and is processed locally. It is never sent to Sounez servers, stored in a database, or used for any purpose. Close the tab to clear it completely." },
      { q: "Does character count include spaces?", a: "Character count includes spaces; word count uses standard whitespace splitting. Both counts are shown separately so you can use whichever metric your platform requires." },
      { q: "How accurate is the reading time estimate?", a: "It is an estimate based on an average adult reading speed of around 200–250 words per minute. Dense technical content or skimmable bullet lists will read faster or slower than the estimate." },
    ],
    proTips: ["Strip formatting in a plain text editor before pasting for the cleanest count.", "Use the reading time estimate for video scripts and podcast outlines."],
    relatedSlugs: ["text-case-converter", "ai-caption-generator", "study-notes-generator"],
  },
  calculator: {
    intro: "Run quick everyday calculations for percentages, totals, square roots, and simple arithmetic — faster than opening a spreadsheet for a one-off result.",
    whatItDoes: "Performs basic math in your browser and keeps a short on-page history so you can compare recent results during the same session.",
    whoFor: [
      { title: "Shoppers", desc: "Check discounts, tax estimates, and split totals before you buy." },
      { title: "Students", desc: "Work through simple arithmetic while studying or checking notes." },
      { title: "Freelancers", desc: "Estimate quick totals, percentages, and small invoice adjustments." },
    ],
    features: [
      { title: "Keyboard support", desc: "Use number keys, operators, Enter, and Escape when you prefer typing." },
      { title: "Recent history", desc: "Keep the last few calculations visible until you leave the page." },
      { title: "Common functions", desc: "Includes percentages, sign switching, and square roots for everyday math." },
    ],
    howTo: ["Enter numbers with the buttons or keyboard.", "Choose an operation such as plus, minus, multiply, divide, percent, or square root.", "Press equals or Enter, then compare the result with the history if needed."],
    examples: [
      { title: "Sale price", desc: "Turn 25% into 0.25, subtract from the original price, and check the final amount." },
      { title: "Shared bill", desc: "Add meal items, divide by the number of people, then round manually for tip or tax." },
    ],
    mistakes: ["Using it for tax, payroll, or legal calculations that need a formal record.", "Closing the tab before copying a result you still need.", "Forgetting that percentage buttons convert the displayed number into a decimal."],
    privacyNote: "Calculations run entirely in your browser. Sounez does not receive the numbers you enter, and no calculation history is stored or transmitted.",
    whenNotToUse: "Use a spreadsheet, accounting app, or professional calculator when you need formulas, audit history, exact financial records, or scientific notation. This tool is designed for quick everyday arithmetic, not complex financial or scientific calculations.",
    faqs: [
      { q: "Is my calculation stored anywhere?", a: "No. The short history stays only in the open page and disappears when the session ends. Nothing is sent to Sounez servers or saved between sessions." },
      { q: "Can I use the keyboard?", a: "Yes. Number keys, common operators (+, -, *, /), Enter, Escape, and Backspace are all supported. Using the keyboard is often faster than clicking buttons for long calculations." },
      { q: "Is this calculator suitable for advanced math?", a: "No. It is designed for everyday arithmetic — percentages, totals, and quick checks. For scientific notation, trigonometry, or statistical functions, use a dedicated scientific calculator app." },
    ],
    proTips: ["Use a spreadsheet when you need to save or audit work over time.", "Round money manually based on the specific rules you need to follow — the calculator does not apply tax or rounding rules automatically."],
    relatedSlugs: ["word-counter", "study-notes-generator", "password-generator"],
  },
  "password-generator": {
    intro: "Create a strong, random password with the exact length and character set you need, then copy it directly into your password manager.",
    whatItDoes: "Uses the browser's cryptographic random API to build a password string — more secure than mental patterns or repeated words.",
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
    mistakes: ["Pasting into Slack or email instead of a manager.", "Generating once and reusing across multiple accounts.", "Losing it because you did not save it in a manager immediately."],
    privacyNote: "Passwords are generated entirely in your browser using the Web Crypto API. The generated string is never sent to Sounez servers, never logged, and never stored. It exists only in your browser until you copy it.",
    whenNotToUse: "Not designed for memorized PINs you type frequently — for those, use a passphrase you can remember or a manager with autofill. This tool creates random strings optimized for storage in a password manager, not memorization.",
    faqs: [
      { q: "How random is the generated password?", a: "It uses the browser's built-in crypto.getRandomValues() API, which provides cryptographically strong randomness suitable for security purposes. This is significantly more random than Math.random() used in less secure generators." },
      { q: "Is my password saved anywhere?", a: "No. The generated password exists only in your browser tab. Sounez never receives or logs it. Copy it directly into your password manager immediately after generating — if you close the tab, the password is gone." },
      { q: "Can I exclude confusing symbols?", a: "Yes — toggle off ambiguous characters (like 0 and O, or 1 and l) if you need to type the password manually or if a specific site rejects certain characters." },
    ],
    proTips: ["Use 16+ characters for important accounts like email, banking, and work logins.", "Turn off ambiguous symbols if a site rejects them during the password change step."],
    relatedSlugs: ["text-case-converter", "qr-code-generator", "word-counter"],
  },
  "text-case-converter": {
    intro: "Switch text between uppercase, lowercase, title case, sentence case, camelCase, kebab-case, and more — paste once and copy the converted version instantly.",
    whatItDoes: "Transforms the casing of any text string in real time as you paste or type, supporting a wide range of case formats for writing, code, and data work.",
    whoFor: [
      { title: "Developers", desc: "Fix constants and CSS class names." },
      { title: "Editors", desc: "Normalize headings from ALL CAPS drafts." },
      { title: "Data cleanup", desc: "Fix exported CSV labels." },
    ],
    features: [
      { title: "Many modes", desc: "Upper, lower, title, sentence, alternating, camelCase, kebab-case, and more." },
      { title: "Live output", desc: "See result as you paste." },
      { title: "Copy", desc: "Grab converted text quickly." },
    ],
    howTo: ["Paste source text.", "Pick a case style.", "Copy the result."],
    examples: [
      { title: "CSS class", desc: "my-button-component -> MY-BUTTON-COMPONENT for a constant." },
      { title: "Headline fix", desc: "ALL CAPS press release -> Title Case for web." },
    ],
    mistakes: ["Title-casing articles (a, the) when style guides differ.", "Changing meaning in case-sensitive passwords."],
    privacyNote: "Your text is processed entirely in your browser. Nothing is sent to Sounez servers, and nothing is stored after you close the tab. The conversion happens locally as you type.",
    whenNotToUse: "Not for translating between languages or fixing spelling errors. Case conversion only changes capitalization — it does not alter the words themselves. If you need spell-check or grammar correction, use a dedicated writing tool.",
    faqs: [
      { q: "Does it support Unicode and non-Latin characters?", a: "It works with most common Unicode characters including accented Latin letters. Special scripts like Arabic, Chinese, or Cyrillic may not follow standard case rules — test with your specific content before bulk-converting." },
      { q: "Is my text saved anywhere?", a: "No. Your text is processed locally in the browser as you type. Nothing is transmitted to a server or stored in any database. When you close the tab, the content is gone." },
      { q: "Does it support camelCase and kebab-case?", a: "Yes — along with uppercase, lowercase, title case, sentence case, and other common formats. These modes are useful for converting variable names, CSS class names, and identifiers between coding conventions." },
    ],
    proTips: ["Keep a backup copy before bulk-converting large legal or technical documents.", "Use sentence case for most body copy — it reads more naturally than title case in long paragraphs."],
    relatedSlugs: ["word-counter", "password-generator", "ai-caption-generator"],
  },
  "image-compressor": {
    intro: "Shrink JPG, PNG, or WebP files in your browser before uploading to a website, shop, email, or CMS — without sending images to an external server.",
    whatItDoes: "Re-encodes images with your chosen quality setting, optional resize, and optional format conversion, all locally in your browser.",
    whoFor: [
      { title: "Bloggers", desc: "Faster pages without visible blur on photos." },
      { title: "Sellers", desc: "Batch product shots under marketplace limits." },
      { title: "Anyone emailing photos", desc: "Stay under attachment size caps." },
    ],
    features: [
      { title: "Batch up to 20", desc: "Compress many files, ZIP download." },
      { title: "Quality slider", desc: "Trade file size vs. image detail." },
      { title: "Format convert", desc: "WebP often produces the smallest files for photos." },
    ],
    howTo: ["Add images.", "Set quality and optional max width.", "Compress.", "Download singles or ZIP."],
    examples: [
      { title: "Hero JPEG", desc: "2.4 MB -> ~400 KB at 80% quality." },
      { title: "Shop grid", desc: "12 PNGs -> WebP batch for upload." },
    ],
    mistakes: ["Quality below 50% on portraits.", "JPEG for logos needing transparency.", "Re-compressing already tiny files."],
    privacyNote: "All compression happens locally in your browser using the Canvas API. Your images are never uploaded to Sounez servers. The compressed files stay on your device until you download them.",
    whenNotToUse: "RAW camera files, animated GIFs, and print CMYK workflows need dedicated tools. If you need to preserve lossless image data for professional photography archiving, use a desktop tool designed for that workflow.",
    faqs: [
      { q: "What is the maximum file size supported?", a: "Very large files (above 25 MB) may be slow or cause issues depending on available browser memory. Most files under 25 MB work reliably. If a file is too large, try resizing the dimensions first." },
      { q: "Does the compressor support WebP uploads?", a: "All modern browsers support WebP as an input format. The compressor accepts WebP, JPG, and PNG files as input and can convert between these formats." },
      { q: "Can I compress multiple images at once?", a: "Yes — up to 20 images per batch. After compression, download them individually or use the ZIP download option to get all files at once." },
    ],
    proTips: ["Try converting to WebP for photos — it typically produces smaller files than JPEG at the same visual quality.", "Resize width to 1200px or less for blog hero images before uploading."],
    relatedSlugs: ["png-to-jpg-converter", "image-describer", "background-remover"],
  },
  "ai-caption-generator": {
    intro: "Describe your photo or topic and get three caption drafts for Instagram, TikTok, or LinkedIn — then edit before posting.",
    whatItDoes: "Sends your brief to our AI service and returns short caption options tailored to your chosen platform and tone.",
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
      { title: "Bakery reel", desc: "Fresh croissants, weekend hours -> warm casual caption." },
      { title: "B2B tip", desc: "LinkedIn tone on a productivity habit." },
    ],
    mistakes: ["Posting without reading for factual errors.", "Same tone for every brand.", "Ignoring platform length limits."],
    privacyNote: "Your topic brief is sent securely to our AI processing service for generation. It is not stored after the response is returned and is not used to train AI models.",
    whenNotToUse: "Not a substitute for disclosing sponsored content or complying with legal claim requirements. Always review generated captions before posting — AI can produce inaccurate claims, especially about products, prices, or health topics.",
    faqs: [
      { q: "Is the caption generator free to use?", a: "Yes, with fair-use rate limits. Most users can generate captions without hitting any limit. Heavy automated use may be throttled to ensure availability for all users." },
      { q: "Does it require an API key to work?", a: "No. It works with the configured AI service on the Sounez platform. No personal API key is required from users." },
      { q: "How many caption options do I get per run?", a: "Three caption drafts per generation so you can compare approaches, pick the one that fits best, or blend lines from multiple options." },
    ],
    proTips: ["Add one specific detail in your brief (the product name, the emotion, the action) for more relevant captions.", "Trim any auto-added hashtags before posting — curate them manually."],
    relatedSlugs: ["hashtag-generator", "bio-generator", "image-describer"],
  },
  "bio-generator": {
    intro: "Answer a few prompts and get a short social bio you can paste into Instagram, TikTok, X, or LinkedIn — ready to edit and customize.",
    whatItDoes: "Combines your role, audience, and link into a bio structure with optional emoji and a clear CTA, sized for common platform limits.",
    whoFor: [
      { title: "New accounts", desc: "Ship a clear bio on day one." },
      { title: "Freelancers", desc: "State what you do and how to contact you." },
      { title: "Creators", desc: "Refresh bio when your offer changes." },
    ],
    features: [
      { title: "Platform length", desc: "Keeps common character limits in mind." },
      { title: "Tone options", desc: "Professional, fun, or minimal." },
      { title: "Copy ready", desc: "Paste into profile settings." },
    ],
    howTo: ["Enter role, audience, and link.", "Pick tone.", "Generate and trim to fit.", "Paste into your profile."],
    examples: [
      { title: "Photographer", desc: "City + booking link + portfolio CTA." },
      { title: "Coach", desc: "Who you help + free resource link." },
    ],
    mistakes: ["Cramming every service into one line.", "A broken link you forgot to update.", "Claims you cannot prove."],
    privacyNote: "Your inputs may be processed by AI on our servers. The information you enter is not published, stored permanently, or linked to your social accounts.",
    whenNotToUse: "Bios for regulated industries (finance, healthcare, legal) still need your real credentials and any legally required disclosure text. Always verify compliance before publishing.",
    faqs: [
      { q: "Can I edit the generated bio?", a: "Always — the output is a starting draft designed to be edited. Personalize it with your specific details, adjust the wording to match your voice, and trim it to fit your platform's character limit." },
      { q: "Can it include emojis?", a: "Optional — emoji inclusion depends on the tone you choose. Professional tone outputs minimal or no emoji; fun and creator tones include them more freely." },
      { q: "Will the bio fit my platform's character limit?", a: "The output targets common platform limits (Instagram's 150 characters, for example), but trim before saving your profile. Platform limits change, and the generator aims for a safe length rather than a precise count." },
    ],
    proTips: ["One clear outcome per bio — what you help people achieve or make.", "Put the link or CTA closest to the action you most want visitors to take."],
    relatedSlugs: ["hashtag-generator", "ai-caption-generator", "tiktok-money-calculator"],
  },
  "business-name-generator": {
    intro: "Describe your business and get name ideas you can immediately check for domain availability and trademark conflicts before committing.",
    whatItDoes: "Uses AI to suggest short, brandable business names based on your industry, audience, and preferred style — multiple directions in one generation.",
    whoFor: [
      { title: "Founders", desc: "Brainstorm before paying for naming agencies." },
      { title: "Side projects", desc: "Fun names for newsletters or shops." },
      { title: "Students", desc: "Class project company names." },
    ],
    features: [
      { title: "Multiple ideas", desc: "Compare several naming directions." },
      { title: "Style hints", desc: "Modern, playful, premium, and more." },
      { title: "Copy list", desc: "Paste into a spreadsheet to research." },
    ],
    howTo: ["Describe product and audience.", "Pick a style.", "Generate.", "Search domains and trademarks before committing."],
    examples: [
      { title: "Plant shop", desc: "Eco, local, friendly -> earthy name ideas." },
      { title: "Dev tool", desc: "Short technical-sounding names." },
    ],
    mistakes: ["Picking a name without checking .com availability.", "Names too similar to famous brands.", "Hard-to-spell words that are unclear when spoken on the phone."],
    privacyNote: "Your business description is sent to our AI processing service and is not stored after the response. It is not used to train models or shared with third parties.",
    whenNotToUse: "We do not provide legal clearance for trademarks. Always verify availability through your country's trademark database and check domain registrars before registering a business name.",
    faqs: [
      { q: "Are the generated names unique and available?", a: "No. Treat them as brainstorming ideas. Always check domain availability on a registrar, search trademark databases in your jurisdiction, and look for existing businesses with the same name before using one commercially." },
      { q: "Can I use the names commercially?", a: "Yes, after you verify domain availability and trademark clearance. The generator produces name ideas — you are responsible for confirming they are legally available for your use." },
      { q: "How many name ideas are generated per run?", a: "Several naming directions per generation — enough to shortlist and compare. Run it multiple times with slightly different descriptions to explore different angles." },
    ],
    proTips: ["Say the name aloud to test how it sounds in conversation and on the phone.", "Check social handle availability (@name) alongside domain availability."],
    relatedSlugs: ["website-idea-generator", "bio-generator", "favicon-generator"],
  },
  "website-idea-generator": {
    intro: "Describe who you help and get website angle ideas — useful when you are stuck on what your site should focus on or how to position your service.",
    whatItDoes: "Uses AI to list possible site concepts, page structures, and positioning hooks from your target audience and offer description.",
    whoFor: [
      { title: "Freelancers", desc: "Portfolio angles for a niche." },
      { title: "Startup ideas", desc: "Landing page themes to test." },
      { title: "Students", desc: "Project brief inspiration." },
    ],
    features: [
      { title: "Structured ideas", desc: "Headlines and page outlines per concept." },
      { title: "Niche input", desc: "Better results with a specific audience." },
      { title: "Copyable", desc: "Move into Notion or a planning doc." },
    ],
    howTo: ["Describe audience and offer.", "Generate.", "Pick one angle to prototype.", "Validate with real users before building."],
    examples: [
      { title: "Local plumber", desc: "Emergency vs maintenance-first positioning ideas." },
      { title: "Course creator", desc: "Outcome-led landing page angle ideas." },
    ],
    mistakes: ["Building every idea at once instead of testing one.", "Skipping customer interviews before committing.", "Copying ideas without adding differentiation."],
    privacyNote: "Your description brief is processed by AI on our servers. It is not stored after the response and is not used for any purpose beyond generating the ideas you requested.",
    whenNotToUse: "Not a replacement for market research or customer discovery. Generated ideas are starting points — validate them with real potential customers before committing time and money to building.",
    faqs: [
      { q: "Does the generator produce code or templates?", a: "Ideas and page structure concepts only — you build the actual site with your own tools, framework, or website builder. The output is strategic direction, not code." },
      { q: "Are the ideas unique to my input?", a: "Treat output as brainstorming — AI generates from patterns, so some ideas may resemble common approaches in your industry. Use them as a starting point and add your own differentiating perspective." },
      { q: "Is this a website builder?", a: "No. It generates website concepts and positioning angles only. Use the ideas as a brief, then build with your preferred platform — WordPress, Webflow, Next.js, or any other tool." },
    ],
    proTips: ["Focus on one clear audience per site concept — broader is not better in early positioning.", "Match each idea to a single clear call-to-action before prototyping."],
    relatedSlugs: ["business-name-generator", "bio-generator", "color-palette-generator"],
  },
  "study-notes-generator": {
    intro: "Paste a topic or lecture snippet and get structured notes for revision — then verify any facts before using them for exams or coursework.",
    whatItDoes: "Uses AI to format headings, bullet points, and key terms from your input, structured for easier scanning and revision.",
    whoFor: [
      { title: "Students", desc: "Turn dense readings into scan-friendly notes." },
      { title: "Teachers", desc: "Draft study sheets to edit and distribute." },
      { title: "Self-learners", desc: "Organise online course transcripts." },
    ],
    features: [
      { title: "Depth levels", desc: "Beginner to advanced detail." },
      { title: "Export", desc: "Copy or download plain text." },
      { title: "Stream", desc: "See notes appear as they generate." },
    ],
    howTo: ["Enter topic or paste text.", "Choose detail level.", "Generate.", "Cross-check against your course materials."],
    examples: [
      { title: "History unit", desc: "WWI causes -> timeline bullets." },
      { title: "Biology", desc: "Paste a paragraph -> defined terms list." },
    ],
    mistakes: ["Submitting AI-generated work without disclosure or rewriting.", "Trusting dates and formulas without cross-checking a verified source.", "Pasting entire copyrighted textbooks."],
    privacyNote: "Text is sent to our AI processing service for note generation. It is not stored after the response and is not used for training. Do not paste personal or confidential information.",
    whenNotToUse: "Do not use generated notes as a substitute for reading primary sources, especially for exams or academic submissions. AI can produce plausible-sounding but incorrect information — always verify facts against your course materials.",
    faqs: [
      { q: "Are the generated notes always accurate?", a: "No. AI can produce errors, especially with specific dates, formulas, names, or nuanced arguments. Always verify the generated content against your textbook, lecture notes, or a reliable reference before relying on it." },
      { q: "Are there usage limits on the tool?", a: "Fair-use limits apply to length and frequency. Most student use falls well within those limits. Heavy or automated use may be throttled to ensure availability for all users." },
      { q: "Can I export the generated notes?", a: "Yes — copy the notes to your clipboard or download as plain text after generation. Format them further in your preferred note-taking app or document editor." },
    ],
    proTips: ["Add your own examples and mnemonics under each AI-generated heading to reinforce memory.", "Use the structured output as a source for flashcard creation."],
    relatedSlugs: ["word-counter", "calculator", "resume-generator"],
  },
  "resume-generator": {
    intro: "Fill in your experience and get a clean, formatted one-page resume you can print to PDF — all data stays in your browser, nothing is uploaded.",
    whatItDoes: "Builds a live-preview formatted CV from your inputs that you can print directly to PDF from the browser or copy as HTML.",
    whoFor: [
      { title: "Job seekers", desc: "First draft in minutes, no Word wrestling." },
      { title: "Students", desc: "Internship layout without formatting headaches." },
      { title: "Career switchers", desc: "See how a new summary section reads before committing." },
    ],
    features: [
      { title: "Live preview", desc: "Updates as you type each field." },
      { title: "Print to PDF", desc: "Use the browser print dialog for clean output." },
      { title: "HTML copy", desc: "Paste into other templates if needed." },
    ],
    howTo: ["Enter contact info and summary.", "Add roles and education.", "Preview the layout.", "Print to PDF or export."],
    examples: [
      { title: "Junior dev", desc: "One job + personal projects + skills section." },
      { title: "Retail to office", desc: "Summary highlights transferable communication and customer skills." },
    ],
    mistakes: ["Adding false employers or credentials.", "Closing the tab before exporting the PDF.", "Going to two pages for an entry-level role."],
    privacyNote: "Your resume data stays on your device. Sounez does not store, transmit, or process your personal information or employment history. Close the tab to clear all entered data.",
    whenNotToUse: "Not legal or career advice. Do not list credentials, certifications, or degrees you do not hold. The output is a formatting template — the accuracy and truthfulness of the content is entirely your responsibility.",
    faqs: [
      { q: "Will the resume pass ATS systems?", a: "A simple, clean single-column layout helps automated screening systems parse text correctly. Export and test in your target system if ATS compatibility is critical — some companies use systems that handle formatting differently." },
      { q: "Is my resume data saved on Sounez servers?", a: "No. All resume data stays in your browser session. Sounez does not receive, store, or have access to any of the personal information you enter. Download your PDF before closing the tab." },
      { q: "Is there a watermark on the exported PDF?", a: "No. The PDF or HTML you export is yours, clean and watermark-free. Use it however you need." },
    ],
    proTips: ["Use action verbs to start each bullet point (Built, Led, Reduced, Improved).", "Keep to one page until you have 10+ years of directly relevant experience."],
    relatedSlugs: ["study-notes-generator", "word-counter", "business-name-generator"],
  },
  "png-to-jpg-converter": {
    intro: "Convert PNG images to JPG when you need a smaller file size and the image does not require a transparent background.",
    whatItDoes: "Re-encodes PNG pixel data to JPEG format in your browser with a configurable quality setting — no upload required.",
    whoFor: [
      { title: "Web publishers", desc: "Smaller assets for photo content." },
      { title: "Email senders", desc: "Shrink screenshots without ZIP compression." },
      { title: "Archivers", desc: "Reduce storage for large photo libraries." },
    ],
    features: [
      { title: "Quality control", desc: "Balance file size and visible artifacts." },
      { title: "Before/after preview", desc: "Check quality before downloading." },
      { title: "Local processing", desc: "No upload to Sounez servers." },
    ],
    howTo: ["Upload your PNG file.", "Set a quality level (80–90% for most photos).", "Convert.", "Download the JPG."],
    examples: [
      { title: "Screenshot", desc: "UI capture PNG -> smaller JPG for a blog post or documentation." },
      { title: "Photo export", desc: "Drop transparency, reduce file size by 40% or more." },
    ],
    mistakes: ["Converting logos or icons with transparency — the background becomes white or black.", "Setting quality too low (under 50%) on images with text or fine details."],
    privacyNote: "Conversion happens entirely in your browser using the Canvas API. Your images are never uploaded to Sounez servers. The converted file stays on your device until you download it.",
    whenNotToUse: "Keep the original PNG when you need a transparent background — logos, icons, product cutouts, and UI assets with transparent areas must stay as PNG or WebP. Converting them to JPG destroys the transparency.",
    faqs: [
      { q: "What happens to transparent areas when converting?", a: "JPEG does not support transparency, so transparent areas are filled with a solid color (usually white or black) during conversion. If your image needs transparency for its intended use, keep it as PNG or convert to WebP instead." },
      { q: "Can I convert multiple files at once?", a: "This tool converts one file at a time. For batch conversion of many PNG files, use the Image Compressor which supports up to 20 files with format conversion to JPEG or WebP." },
      { q: "What quality setting should I use?", a: "Use 85–90% for photos where detail matters. Lower quality (70–80%) is fine for screenshots and UI captures where small compression artifacts are less noticeable." },
    ],
    proTips: ["Use 85% quality for photos, and 90%+ for images with small text or fine detail.", "Keep your original PNG files archived — you cannot recover transparency once converted."],
    relatedSlugs: ["image-compressor", "image-describer", "background-remover"],
  },
  "favicon-generator": {
    intro: "Upload a logo, enter a letter, or pick an emoji and download favicon PNG files plus the HTML snippet to add to your site's head — all in your browser.",
    whatItDoes: "Resizes and renders your chosen input to standard favicon dimensions using the browser Canvas API, producing production-ready PNG files.",
    whoFor: [
      { title: "Developers", desc: "Ship tab icons without opening Photoshop." },
      { title: "Indie hackers", desc: "Quick brand mark for a new project." },
      { title: "Designers", desc: "Export favicon packs for clients." },
    ],
    features: [
      { title: "Multi-size export", desc: "16px through 512px in the common set." },
      { title: "PNG download", desc: "Individual sizes or all at once." },
      { title: "HTML snippet", desc: "Link tags to copy directly into your head." },
    ],
    howTo: ["Upload a square logo, type a letter or initials, or enter an emoji.", "Set background color, shape (square, rounded, or circle), and export size.", "Generate the favicon.", "Download the PNG and copy the HTML link tag."],
    examples: [
      { title: "Startup launch", desc: "Letter mark -> 32px favicon + 180px Apple touch icon." },
      { title: "Rebrand", desc: "Replace an old favicon bundle on the next deployment." },
    ],
    mistakes: ["Using a tiny source image — it looks blurry when scaled up.", "Non-square artwork without padding around it.", "Forgetting to clear the browser cache after deploying a new favicon."],
    privacyNote: "Your uploaded image is processed entirely in the browser using the Canvas API. It is never sent to Sounez servers. The generated favicon PNG stays on your device until you download it.",
    whenNotToUse: "Complex animated favicons or SVG favicons with dynamic theming require dedicated tools or hand-coding. This tool focuses on raster PNG favicon generation for standard use cases.",
    faqs: [
      { q: "Can I use an SVG as a favicon?", a: "This tool focuses on raster PNG favicon generation, which covers the vast majority of browser favicon use cases. SVG favicons can be linked separately with a type='image/svg+xml' attribute if your site needs them." },
      { q: "Can I use the generated favicon commercially?", a: "Yes. Favicons you generate are yours for commercial and personal use without restriction. Use them for client projects, open-source tools, or any website with no attribution required." },
      { q: "What sizes are included in the download?", a: "The standard set covers 16px through 512px, including the common sizes for browser tabs (32px), Apple touch icons (180px), and PWA manifests (192px and 512px)." },
    ],
    proTips: ["Start from a source image of 512×512 or larger for the sharpest output at all sizes.", "Test the favicon on both light and dark browser chrome — a white icon on a white tab background is invisible."],
    relatedSlugs: ["image-compressor", "png-to-jpg-converter", "color-palette-generator"],
  },
  "svg-blob-generator": {
    intro: "Adjust points, complexity, and color to generate a smooth organic SVG blob shape for hero sections, card backgrounds, and decorative web elements.",
    whatItDoes: "Generates random organic SVG path shapes you can copy as inline code or download as a file and drop directly into HTML or design tools.",
    whoFor: [
      { title: "Landing pages", desc: "Soft organic shapes behind hero text." },
      { title: "Presentations", desc: "Abstract background shapes without stock photos." },
      { title: "Developers", desc: "Inline SVG with tiny file size." },
    ],
    features: [
      { title: "Randomize", desc: "New shapes generated until one fits." },
      { title: "Color control", desc: "Match your brand hex code exactly." },
      { title: "SVG copy", desc: "Paste inline into HTML or import into Figma." },
    ],
    howTo: ["Adjust complexity, points, and color settings.", "Randomize until you find a shape that works.", "Copy the SVG code or download the file.", "Paste inline into your HTML or import into your design tool."],
    examples: [
      { title: "SaaS hero", desc: "Purple blob at 20% opacity positioned behind the headline." },
      { title: "Newsletter header", desc: "Small blob shape beside the logo for visual interest." },
    ],
    mistakes: ["Placing a busy blob directly behind text without a contrasting overlay.", "Using a very high point count that slows rendering on mobile.", "Using the same blob shape on every page — it starts to feel generic quickly."],
    privacyNote: "All blob generation happens entirely in your browser. No data is sent to Sounez servers. The generated SVG code stays on your device until you copy or download it.",
    whenNotToUse: "For professional print production, exported SVG paths may need cleanup in Illustrator or Affinity Designer to meet CMYK requirements or proper bleed handling. Browser-generated SVG paths are optimized for screen rendering.",
    faqs: [
      { q: "Can I use blob shapes commercially?", a: "Yes. You are free to use any blob SVG generated on this page in personal or commercial projects, including client websites, marketing materials, and packaged products — no attribution required." },
      { q: "Can I animate the blob SVG?", a: "Yes. The SVG output can be animated using CSS keyframe animations targeting the path element, or with JavaScript animation libraries. Add a CSS animation on the path's d attribute for a fluid morphing effect." },
      { q: "What format is the output?", a: "SVG markup — either as an inline code snippet to paste directly into HTML, or as a downloadable .svg file. SVG scales to any size without quality loss and is typically only a few hundred bytes." },
    ],
    proTips: ["Use 10–20% opacity for background blobs so they add texture without competing with content.", "Pair a colored blob with a solid fallback background color for browsers that block SVG rendering."],
    relatedSlugs: ["background-pattern-generator", "css-gradient-generator", "color-palette-generator"],
  },
  "font-pairing-tool": {
    intro: "Browse curated Google Font pairings for headings and body text, preview them with real content, and copy the CSS import link to use in your project.",
    whatItDoes: "Shows live previews of carefully chosen heading and body font combinations with copy-ready CSS, grouped by design style.",
    whoFor: [
      { title: "Developers", desc: "Pick fonts without browsing hundreds of options." },
      { title: "Designers", desc: "Quick typography for client mockups." },
      { title: "Students", desc: "Learn which pairings work well together and why." },
    ],
    features: [
      { title: "Curated pairs", desc: "Heading and body combinations chosen for readability." },
      { title: "Live preview", desc: "See real paragraph text in the selected pair." },
      { title: "CSS copy", desc: "Google Fonts import link included." },
    ],
    howTo: ["Browse style categories (modern, editorial, startup, etc.).", "Select a pairing and preview with your content.", "Copy the CSS import.", "Load the fonts in your project."],
    examples: [
      { title: "Blog", desc: "Serif heading + sans-serif body for comfortable long-form reading." },
      { title: "App UI", desc: "Geometric sans-serif for both heading and body at different weights." },
    ],
    mistakes: ["Loading too many font weights — extra weights slow page load time.", "Using decorative or display fonts for body paragraph text.", "Forgetting to set an appropriate line-height in your CSS."],
    privacyNote: "Font previews load from the Google Fonts CDN, so Google's CDN privacy policy applies when your browser fetches them. Your font choices and pairing selections are not stored on Sounez.",
    whenNotToUse: "Licensed brand fonts not available on Google Fonts need to be self-hosted using your own font files. This tool only covers the curated set of Google Fonts pairs.",
    faqs: [
      { q: "Are my font choices private?", a: "Your selections are not stored on Sounez. However, when your browser loads font previews from the Google Fonts CDN, Google's standard CDN privacy policy applies. If you need full privacy, self-host the fonts after downloading them." },
      { q: "Can I self-host the fonts instead of loading from Google?", a: "Yes. Download the font files directly from Google Fonts and host them on your own server or CDN. This avoids the Google CDN dependency and can improve GDPR compliance for European visitors." },
      { q: "Are the pairings limited to Google Fonts only?", a: "The curated pairs in this tool use Google Fonts, which provides a wide range of high-quality options. Copy-ready import CSS is included for each pairing so you can load them in any web project immediately." },
    ],
    proTips: ["Limit to two font families per site for visual coherence.", "Test your chosen pair on both Android and iOS — rendering can differ subtly between platforms."],
    relatedSlugs: ["color-palette-generator", "css-gradient-generator", "box-shadow-generator"],
  },
  "image-placeholder-generator": {
    intro: "Set width, height, colors, and optional label text to instantly download a placeholder image for mockups, wireframes, and frontend development.",
    whatItDoes: "Renders a simple SVG or PNG placeholder at your exact dimensions in the browser — no external service, no network request.",
    whoFor: [
      { title: "Developers", desc: "Wireframes before real assets exist." },
      { title: "Designers", desc: "Accurate layout grids for presentations." },
      { title: "QA engineers", desc: "Test image component slots at exact sizes." },
    ],
    features: [
      { title: "Exact pixel dimensions", desc: "Match your component's required size precisely." },
      { title: "Custom colors and label", desc: "Match your wireframe palette and show dimensions." },
      { title: "SVG or PNG output", desc: "Choose the format that fits your workflow." },
    ],
    howTo: ["Enter width and height in pixels.", "Choose background and text colors, and an optional custom label.", "Select SVG or PNG format.", "Download or copy the data URL for inline use."],
    examples: [
      { title: "Card grid layout", desc: "400×300 gray placeholder blocks in a Figma handoff." },
      { title: "Hero section", desc: "1920×1080 labelled placeholder for a full-width layout." },
    ],
    mistakes: ["Shipping placeholders to a production environment.", "Using the wrong aspect ratio for the real photos that will replace them later."],
    privacyNote: "All placeholder images are generated entirely in your browser. Nothing is uploaded to or stored on Sounez servers. The generated image stays on your device until you download or copy it.",
    whenNotToUse: "Replace all placeholder images with real, properly sized and compressed images before any production launch. Add meaningful alt text to all images at replacement time.",
    faqs: [
      { q: "Can I create retina-ready (2x) placeholders?", a: "Yes — set the dimensions to double the displayed size (for example, 800×600 for a 400×300 display slot) to create a 2x retina-ready placeholder. Scale it back down in your CSS or HTML with width and height attributes." },
      { q: "How large is an SVG placeholder file?", a: "SVG placeholders are extremely small — typically under 500 bytes regardless of the dimensions you specify. SVG scales perfectly to any size, making it far more efficient than an equivalent PNG for most placeholder use cases." },
      { q: "Should I use PNG or SVG output?", a: "SVG is recommended for most cases — it scales cleanly to any resolution, has near-zero file size, and renders crisply on all displays. Use PNG when your project requires a raster format or when a tool in your workflow does not support SVG." },
    ],
    proTips: ["Use the same aspect ratio as the real images that will replace the placeholder — this prevents layout reflow when real images load.", "Name placeholder files with their dimensions (e.g., hero-placeholder-1600x900.svg) so developers know what size to replace them with."],
    relatedSlugs: ["image-compressor", "favicon-generator", "background-pattern-generator"],
  },
  "box-shadow-generator": {
    intro: "Adjust blur, spread, offset, and color on a live preview box, then copy the CSS box-shadow value directly into your stylesheet.",
    whatItDoes: "Live-previews one or more shadow layers as you adjust parameters, and outputs a single CSS declaration ready to paste.",
    whoFor: [
      { title: "Front-end developers", desc: "Card and button elevation without guessing values." },
      { title: "UI designers", desc: "Build a consistent depth system across a design." },
      { title: "Students", desc: "See exactly how each parameter changes the visual result." },
    ],
    features: [
      { title: "Multi-layer shadows", desc: "Stack multiple shadows for richer, more realistic depth." },
      { title: "Presets", desc: "Soft, medium, and strong starting points to build from." },
      { title: "Copy CSS", desc: "One complete declaration ready for your stylesheet." },
    ],
    howTo: ["Adjust offsets, blur, and spread with sliders.", "Add a second shadow layer for more realistic depth.", "Copy the CSS declaration.", "Test on real content at the intended size."],
    examples: [
      { title: "Card component", desc: "Subtle 0 4px 20px rgba shadow for gentle elevation." },
      { title: "Floating button", desc: "Stronger shadow that increases on hover state." },
    ],
    mistakes: ["Applying heavy shadows to every element on the page.", "Dark shadows on dark backgrounds where they are invisible.", "Forgetting focus styles when styling interactive elements."],
    privacyNote: "The shadow generator runs entirely in your browser. No CSS values, colors, or configuration data are sent to Sounez servers or stored anywhere.",
    whenNotToUse: "Avoid applying complex multi-layer box-shadow values to long scrolling lists or grids with hundreds of items — this can significantly reduce rendering performance on lower-end devices. For large repeated components, consider simpler borders or background differences instead.",
    faqs: [
      { q: "Can I create inset (inner) shadows?", a: "Yes — toggle the inset option to create a shadow that appears inside the element rather than outside it. Inset shadows are useful for pressed button states, focused input fields, and inner glow effects." },
      { q: "Can I use box-shadow values in Tailwind CSS?", a: "Yes — map the generated CSS values to Tailwind's shadow utilities, or add them as custom shadow values in your tailwind.config.js under extend.boxShadow. You can then use them as utility classes." },
      { q: "Can I stack multiple shadows in one declaration?", a: "Yes — add multiple shadow layers in the generator and copy a single CSS declaration that includes all of them comma-separated. Layering a tight shadow and a diffuse shadow creates more realistic depth than a single shadow." },
    ],
    proTips: ["Use one consistent elevation scale across the full app — typically three levels: card, modal, and tooltip.", "In dark mode, reduce opacity and increase blur radius so shadows remain visible against dark backgrounds."],
    relatedSlugs: ["css-gradient-generator", "color-palette-generator", "background-pattern-generator"],
  },
  "background-pattern-generator": {
    intro: "Choose a pattern type, set colors and size, and copy CSS for a repeating background — no image files, no external dependencies, zero kilobytes.",
    whatItDoes: "Outputs background-image CSS using SVG data URIs or CSS gradients for lightweight repeating patterns like dots, grids, diagonal lines, and waves.",
    whoFor: [
      { title: "Landing pages", desc: "Subtle texture without image weight." },
      { title: "Dashboards", desc: "Visually separate sections without photos." },
      { title: "Developers", desc: "No PNG tile files to host or maintain." },
    ],
    features: [
      { title: "Pattern types", desc: "Dots, lines, grids, checkerboards, waves, and more." },
      { title: "Color control", desc: "Match light or dark UI palettes." },
      { title: "Copy CSS", desc: "Paste into global or scoped CSS files." },
    ],
    howTo: ["Choose a pattern type.", "Set size, spacing, and colors.", "Preview with different background colors.", "Copy the CSS and paste into your stylesheet."],
    examples: [
      { title: "Footer section", desc: "Light dot grid on a gray background for subtle texture." },
      { title: "Hero section", desc: "Wide diagonal line pattern at low opacity behind content." },
    ],
    mistakes: ["High contrast patterns behind text that reduce readability.", "Busy patterns on mobile screens where they feel cluttered.", "Animating background patterns without a strong reason — it rarely improves usability."],
    privacyNote: "All pattern CSS is generated entirely in your browser. No input values or CSS output are sent to Sounez servers, and nothing is stored after you close the page.",
    whenNotToUse: "CSS patterns work best for subtle geometric textures. For rich photographic textures, grain effects, or organic noise, use a real image file instead. CSS patterns also may not reproduce well in PDF exports or certain screenshot tools.",
    faqs: [
      { q: "How does CSS pattern performance compare to image textures?", a: "CSS patterns are significantly lighter than PNG or JPEG texture images — they add zero bytes to your page weight because the pattern is rendered by the browser from CSS rules. A PNG tile file of the same texture would typically be 2–20 KB." },
      { q: "How do I adapt a pattern for dark mode?", a: "Generate a second version of the pattern with inverted or adjusted colors for your dark theme. Use a CSS media query (prefers-color-scheme: dark) or a dark-mode class to switch between the two pattern CSS values." },
      { q: "Do CSS patterns require any image files to work?", a: "No — these patterns are CSS-only, using inline SVG data URIs or gradient syntax. There is no PNG tile or external image file to host, which eliminates the extra network request and keeps your page fast." },
    ],
    proTips: ["Keep pattern opacity under 10–15% when placing text over it — legibility is the priority.", "Test the pattern with real paragraph text on top before committing to it."],
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
      { title: "Mobile users", desc: "Works in a phone browser - no app store download." },
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
    privacyNote: "See the privacy section on this page. Browser-only tools keep data in your tab; server-backed tools explain what is sent and how long it is retained.",
    whenNotToUse: "Choose professional desktop software when you need advanced features, batch automation, audit history, or team collaboration workflows that go beyond what a browser tool provides.",
    faqs: [
      { q: "Is this tool free to use?", a: "Yes for normal use. Fair-use limits may apply on AI-powered or server-processing tools to ensure availability for all users." },
      { q: "Do I need an account to use this tool?", a: "No account is required for everyday use. Open the page, use the tool, and close — no sign-up or login needed." },
      { q: "Is my input stored anywhere?", a: "Check the privacy note on this page — it varies by tool. Browser-only tools never send your data anywhere. Server-backed tools explain exactly what is transmitted and how it is handled." },
    ],
    proTips: ["Bookmark the page if you use it weekly — it opens faster than searching each time.", "Read the related tools section below to find the next step in your workflow."],
    relatedSlugs: [],
  };
}

export function getToolEditorial(slug: string): ToolEditorialContent {
  return EDITORIAL[slug] ?? defaultEditorial(slug);
}
