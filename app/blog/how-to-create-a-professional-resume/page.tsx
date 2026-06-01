import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create a Professional Resume Online (2026 Guide) | Sounez",
  description:
    "Learn how to structure a clean resume with personal information, summary, experience, education and skills. Export as PDF for free.",
  alternates: { canonical: getSiteUrl() + "/blog/how-to-create-a-professional-resume" },
  openGraph: {
    title: "How to Create a Professional Resume Online",
    description:
      "Resume structure, writing tips, layout advice and a free browser-based resume builder.",
  },
};

const FAQS = [
  {
    question: "How long should a resume be?",
    answer:
      "One page for candidates with under 10 years of experience. Two pages for senior professionals with extensive relevant experience. Never pad to fill space, a tight one-pager beats a padded two-pager every time.",
  },
  {
    question: "Should I include a photo on my resume?",
    answer:
      "In most English-speaking countries (US, UK, Canada, Australia), photos are not expected and can introduce unconscious bias. In some European and Asian countries, photos are standard. Follow the convention of the country you're applying in.",
  },
  {
    question: "What font should I use for a resume?",
    answer:
      "Clean, readable fonts: Inter, Calibri, Georgia, or Garamond. Avoid decorative fonts. Use 10-12pt for body text and 14-16pt for your name. The Sounez Resume Generator uses Inter by default.",
  },
  {
    question: "How do I export my resume as a PDF?",
    answer:
      "Use the Download PDF button in the Resume Generator. In the print dialog, set margins to None or Minimum and enable Background graphics for the best result. Save as PDF instead of printing.",
  },
  {
    question: "Is my data saved when I use the Resume Generator?",
    answer:
      "No. Everything stays in your browser. Nothing is uploaded to any server. If you close the tab, your data is gone, download your PDF before closing.",
  },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="how-to-create-a-professional-resume"
        title="How to Create a Professional Resume Online"
        description="Learn how to structure a clean resume with personal information, summary, experience, education and skills. Export as PDF for free."
        articleSection="Productivity"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="how-to-create-a-professional-resume"
        ctaTools={["resume-generator", "word-counter", "bio-generator"]}
        title="How to Create a Professional Resume Online"
        excerpt="A resume is your first impression. Here&apos;s how to structure it, what to include in each section, and how to export a clean PDF, all for free, without creating an account."
      >
        <p>
          Most resume advice focuses on what to write. This guide focuses on structure, because a
          well-structured resume with average content outperforms a poorly structured one with great
          content. Recruiters spend an average of 7 seconds on a first scan. If the structure doesn&apos;t
          guide their eye to the right information immediately, the content never gets read.
        </p>
        <p>
          Use the <Link href="/tools/resume-generator">free Resume Generator</Link> alongside this guide to build
          and export your resume as a PDF without creating an account.
        </p>

        <h2>What a resume should include</h2>
        <p>
          A professional resume has five core sections. Everything else is optional and should only
          be included if it adds value for the specific role.
        </p>
        <ul>
          <li>
            <strong>Personal information</strong>: Name, email, phone, location, LinkedIn URL
          </li>
          <li>
            <strong>Professional summary</strong>: 2-3 sentences summarizing your experience and
            value proposition
          </li>
          <li>
            <strong>Work experience</strong>: Roles in reverse chronological order, with bullet
            points for achievements
          </li>
          <li>
            <strong>Education</strong>: Degrees, institutions and graduation years
          </li>
          <li>
            <strong>Skills</strong>: A concise list of relevant technical and soft skills
          </li>
        </ul>

        <PullQuote>
          Structure guides the recruiter&apos;s eye. Get the structure right and the content gets read.
        </PullQuote>

        <h2>Resume layout tips</h2>
        <ul>
          <li>
            <strong>One page</strong> for under 10 years of experience. Two pages maximum for senior
            roles.
          </li>
          <li>
            <strong>Consistent margins</strong>: 0.75-1 inch on all sides. Don&apos;t shrink margins to
            fit more content.
          </li>
          <li>
            <strong>Clean font</strong>: Inter, Calibri or Georgia at 10-12pt. Your name at 16-18pt.
          </li>
          <li>
            <strong>No photos, no graphics, no color blocks</strong>: unless you&apos;re in a creative
            field where visual presentation is part of the job.
          </li>
          <li>
            <strong>Reverse chronological order</strong>: Most recent experience first. This is what
            recruiters expect.
          </li>
          <li>
            <strong>White space is your friend</strong>: A resume that breathes is easier to scan
            than one that&apos;s packed to the margins.
          </li>
        </ul>

        <h2>How to write a professional summary</h2>
        <p>
          The summary sits at the top of your resume, below your contact details. It&apos;s the first
          thing a recruiter reads and the most important 2-3 sentences on the page.
        </p>
        <p>A strong summary has three elements:</p>
        <ol>
          <li>
            <strong>Who you are</strong>: Your role and years of experience
          </li>
          <li>
            <strong>What you&apos;re good at</strong>: Your core skill or specialization
          </li>
          <li>
            <strong>What you&apos;re looking for</strong>: The type of role or company you want to join
          </li>
        </ol>
        <p>
          <strong>Example:</strong> &quot;Product designer with 6 years of experience in B2B SaaS. I
          specialize in turning complex workflows into intuitive interfaces. Looking for a senior
          design role at a product-led growth company.&quot;
        </p>
        <p>
          Keep it under 60 words. Use the <Link href="/tools/word-counter">Word Counter</Link> to check length.
          Avoid clichés like &quot;passionate&quot;, &quot;results-driven&quot; or &quot;team player&quot;, they add no
          information.
        </p>

        <h2>How to present work experience</h2>
        <p>
          Each work experience entry should have: company name, your role, dates (month and year),
          and 2-4 bullet points describing your achievements.
        </p>
        <p>
          The most important rule: write achievements, not responsibilities. Responsibilities
          describe what the job was. Achievements describe what you did with it.
        </p>
        <ul>
          <li>
            <strong>Responsibility (weak):</strong> &quot;Responsible for managing social media accounts&quot;
          </li>
          <li>
            <strong>Achievement (strong):</strong> &quot;Grew Instagram following from 2k to 18k in 8
            months by implementing a consistent content calendar and hashtag strategy&quot;
          </li>
        </ul>
        <p>
          Use the formula: <strong>Action verb + what you did + measurable result</strong>. If you
          don&apos;t have a number, use a qualitative result: &quot;significantly reduced&quot;, &quot;eliminated&quot;,
          &quot;launched&quot;.
        </p>

        <h2>Education and skills sections</h2>

        <h3>Education</h3>
        <p>
          List your highest qualification first. Include: institution name, degree title, graduation
          year. If you graduated more than 5 years ago, you don&apos;t need to include your grade unless
          it was exceptional.
        </p>

        <h3>Skills</h3>
        <p>
          List 8-12 relevant skills as a comma-separated list or in a simple grid. Separate hard
          skills (specific tools, languages, certifications) from soft skills (communication,
          leadership). Recruiters scan this section quickly, keep it tight.
        </p>

        <h2>How to export your resume as PDF</h2>
        <p>
          The <Link href="/tools/resume-generator">Resume Generator</Link> includes a live preview that updates
          as you type. When you&apos;re happy with the result:
        </p>
        <ol>
          <li>Click the Download PDF button.</li>
          <li>
            In the print dialog, set Paper size to A4 or Letter, Margins to None or Minimum, and
            enable Background graphics.
          </li>
          <li>Select Save as PDF as the destination.</li>
          <li>Click Save.</li>
        </ol>
        <p>
          If the layout looks off in the print preview, try adjusting the zoom level in your browser
          to 90% before printing.
        </p>

        <PullQuote>
          A clean one-page PDF beats a fancy two-page design every time for most roles.
        </PullQuote>

        <h2>Frequently Asked Questions</h2>
        <h3>How long should a resume be?</h3>
        <p>
          One page for candidates with under 10 years of experience. Two pages for senior
          professionals with extensive relevant experience. Never pad to fill space.
        </p>
        <h3>Should I include a photo on my resume?</h3>
        <p>
          In most English-speaking countries, photos are not expected. In some European and Asian
          countries, photos are standard. Follow the convention of the country you&apos;re applying in.
        </p>
        <h3>What font should I use for a resume?</h3>
        <p>
          Clean, readable fonts: Inter, Calibri, Georgia or Garamond. Avoid decorative fonts. Use
          10-12pt for body text and 14-16pt for your name.
        </p>
        <h3>How do I export my resume as a PDF?</h3>
        <p>
          Use the Download PDF button in the <Link href="/tools/resume-generator">Resume Generator</Link>. In
          the print dialog, set margins to None or Minimum and enable Background graphics. Save as
          PDF instead of printing.
        </p>
        <h3>Is my data saved when I use the Resume Generator?</h3>
        <p>
          No. Everything stays in your browser. Nothing is uploaded to any server. Download your PDF
          before closing the tab.
        </p>

        <h2>Conclusion: structure, achievements, one page</h2>
        <p>
          A professional resume doesn&apos;t need to be fancy. It needs to be clear, structured and full
          of achievements rather than responsibilities. Open the{" "}
          <Link href="/tools/resume-generator">Resume Generator</Link> now, fill in your details, and download a
          clean PDF in under 10 minutes. For your LinkedIn profile, use the{" "}
          <Link href="/tools/bio-generator">Bio Generator</Link> to write a matching professional summary.
        </p>
      </BlogPostShell>
    </>
  );
}
