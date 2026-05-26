"use client";

import type { SmartPackOutput } from "@/lib/smart-packs/schemas";
import { SmartPackExport } from "./SmartPackExport";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{children}</div>
    </div>
  );
}

function ListBlock({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function SmartPackResult({
  packSlug,
  output,
  createdAt,
}: {
  packSlug: string;
  output: SmartPackOutput;
  createdAt?: string;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-primary/20 bg-primary/5 p-6" aria-live="polite">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Your Smart Pack is ready</h2>
          <p className="text-sm text-muted-foreground">Review and edit before you publish.</p>
          {createdAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Generated{" "}
              <time dateTime={createdAt}>
                {new Date(createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
            </p>
          )}
        </div>
        <SmartPackExport packSlug={packSlug} output={output} />
      </div>

      {packSlug === "social-media-pack" && "caption" in output && (
        <div className="grid gap-4">
          <Block label="Post title">{output.title}</Block>
          <Block label="Caption">{output.caption}</Block>
          <Block label="First comment">{output.firstComment}</Block>
          <Block label="Hashtags">{output.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}</Block>
          <Block label="CTA">{output.cta}</Block>
          <Block label="Visual text">{output.visualText}</Block>
          <Block label="Image idea">{output.imageIdea}</Block>
          <Block label="Alt text">{output.altText}</Block>
          {Object.entries(output.platformVariations).map(([platform, text]) =>
            text ? <Block key={platform} label={`${platform} version`}>{text}</Block> : null,
          )}
          <ListBlock label="Posting tips" items={output.postingTips} />
        </div>
      )}

      {packSlug === "product-listing-pack" && "productTitle" in output && (
        <div className="grid gap-4">
          <Block label="Product title">{output.productTitle}</Block>
          <Block label="Short description">{output.shortDescription}</Block>
          <Block label="Long description">{output.longDescription}</Block>
          <ListBlock label="Bullet points" items={output.bulletPoints} />
          <Block label="SEO meta title">{output.seoMetaTitle}</Block>
          <Block label="SEO meta description">{output.seoMetaDescription}</Block>
          <Block label="Image alt text">{output.imageAltText}</Block>
          <Block label="Social caption">{output.socialCaption}</Block>
          <ListBlock label="Marketplace tips" items={output.marketplaceTips} />
        </div>
      )}

      {packSlug === "seo-image-pack" && "seoFilename" in output && (
        <div className="grid gap-4">
          <Block label="SEO filename">{output.seoFilename}</Block>
          <Block label="Alt text">{output.altText}</Block>
          <Block label="Image title">{output.imageTitle}</Block>
          <Block label="Caption">{output.imageCaption}</Block>
          <Block label="Surrounding paragraph">{output.surroundingParagraph}</Block>
          <ListBlock label="Keyword suggestions" items={output.keywordSuggestions} />
          <Block label="Compression advice">{output.compressionAdvice}</Block>
          <ListBlock label="Related image ideas" items={output.relatedImageIdeas} />
        </div>
      )}

      {packSlug === "business-launch-pack" && "shortPitch" in output && (
        <div className="grid gap-4">
          <ListBlock label="Business name ideas" items={output.businessNameIdeas} />
          <ListBlock label="Tagline ideas" items={output.taglineIdeas} />
          <Block label="Short pitch">{output.shortPitch}</Block>
          <Block label="Homepage hero">{output.homepageHeroText}</Block>
          <Block label="Instagram bio">{output.instagramBio}</Block>
          <Block label="LinkedIn intro">{output.linkedInIntro}</Block>
          <ListBlock label="Service descriptions" items={output.serviceDescriptions} />
          <ListBlock label="First post ideas" items={output.firstPostIdeas} />
        </div>
      )}

      {packSlug === "student-study-pack" && "summary" in output && (
        <div className="grid gap-4">
          <Block label="Summary">{output.summary}</Block>
          <ListBlock label="Key concepts" items={output.keyConcepts} />
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Flashcards</div>
            <dl className="mt-2 space-y-3 text-sm">
              {output.flashcards.map((fc) => (
                <div key={fc.term}>
                  <dt className="font-semibold">{fc.term}</dt>
                  <dd className="text-muted-foreground">{fc.definition}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quiz</div>
            <ul className="mt-2 space-y-3 text-sm">
              {output.quizQuestions.map((q) => (
                <li key={q.question}>
                  <p className="font-medium">{q.question}</p>
                  <p className="text-muted-foreground">{q.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <ListBlock label="Revision plan" items={output.revisionPlan} />
          <Block label="Simple explanation">{output.simpleExplanation}</Block>
          <ListBlock label="Common mistakes" items={output.commonMistakes} />
        </div>
      )}
    </section>
  );
}
