import type { Metadata } from "next";
import { BlogPostShell } from "@/components/BlogPostShell";
import { PullQuote } from "@/components/BlogVisual";
import { BlogJsonLd } from "@/components/BlogJsonLd";

export const metadata: Metadata = {
  title: "Simple Online Calculator Guide for Everyday Math | Sounez",
  description:
    "Use this guide to understand quick everyday calculations such as percentages, square roots and basic arithmetic. Includes a free online calculator.",
  openGraph: {
    title: "Simple Online Calculator Guide for Everyday Math",
    description:
      "Percentages, square roots, basic arithmetic, explained clearly with a free browser calculator.",
  },
};

const FAQS = [
  {
    question: "How do I calculate a percentage?",
    answer:
      "To find X% of a number, multiply the number by X and divide by 100. For example, 20% of 150 = 150 × 20 ÷ 100 = 30. The Sounez Calculator has a % button that handles this automatically.",
  },
  {
    question: "What is a square root?",
    answer:
      "The square root of a number is the value that, when multiplied by itself, gives the original number. The square root of 25 is 5, because 5 × 5 = 25. Use the √ button on the calculator.",
  },
  {
    question: "Does the calculator save my calculations?",
    answer:
      "The Sounez Calculator keeps a history of your last 10 calculations in the current session. Nothing is saved to a server or stored after you close the tab.",
  },
  {
    question: "Can I use the calculator on my phone?",
    answer:
      "Yes. The calculator is fully responsive and works on touchscreen devices. You can also type numbers and operators using your keyboard on desktop.",
  },
  {
    question: "Is the online calculator accurate?",
    answer:
      "Yes, for everyday arithmetic. Like all floating-point calculators, very large numbers or long decimal chains can have minor rounding differences, but for typical daily calculations it is fully accurate.",
  },
];

export default function Post() {
  return (
    <>
      <BlogJsonLd
        slug="simple-online-calculator-guide"
        title="Simple Online Calculator Guide for Everyday Math"
        description="Use this guide to understand quick everyday calculations such as percentages, square roots and basic arithmetic. Includes a free online calculator."
        articleSection="Utility Tools"
        faqs={FAQS}
      />
      <BlogPostShell
        slug="simple-online-calculator-guide"
        ctaTools={["calculator", "word-counter", "text-case-converter"]}
        title="Simple Online Calculator Guide for Everyday Math"
        excerpt="Percentages, discounts, square roots, basic arithmetic, this guide explains the calculations you actually need every day, with a free browser calculator to do them instantly."
      >
        <p>
          You don&apos;t need a scientific calculator for most everyday maths. Whether you&apos;re splitting a
          bill, working out a discount, calculating a tip, or checking a measurement, a clean online
          calculator handles it in seconds. This guide explains the operations you&apos;ll use most, with
          worked examples, so you know exactly what you&apos;re calculating, not just what button to press.
        </p>
        <p>
          Open the <a href="/calculator">free online Calculator</a> alongside this guide and follow
          along with the examples.
        </p>

        <h2>When to use an online calculator</h2>
        <p>
          An online calculator is ideal for quick, one-off calculations where you don&apos;t want to open a
          spreadsheet or reach for your phone&apos;s built-in app. Common use cases:
        </p>
        <ul>
          <li>Splitting a restaurant bill between friends</li>
          <li>Calculating a sale discount or VAT amount</li>
          <li>Working out a tip percentage</li>
          <li>Checking a measurement conversion</li>
          <li>Estimating a monthly budget item</li>
          <li>Verifying a quick arithmetic result</li>
        </ul>

        <h2>Basic operations explained</h2>

        <h3>Addition (+)</h3>
        <p>
          Adds two or more numbers together. Example: you buy three items costing £12, £8.50 and
          £4.75. Total = 12 + 8.50 + 4.75 = <strong>£25.25</strong>.
        </p>

        <h3>Subtraction (−)</h3>
        <p>
          Finds the difference between two numbers. Example: your budget is £100 and you&apos;ve spent
          £67.40. Remaining = 100 − 67.40 = <strong>£32.60</strong>.
        </p>

        <h3>Multiplication (×)</h3>
        <p>
          Multiplies two numbers. Example: you need 6 packs of tiles, each costing £14.99. Total =
          6 × 14.99 = <strong>£89.94</strong>.
        </p>

        <h3>Division (÷)</h3>
        <p>
          Splits a number into equal parts. Example: a £180 dinner bill split between 4 people = 180
          ÷ 4 = <strong>£45 each</strong>.
        </p>

        <PullQuote>
          The four basic operations cover 90% of everyday maths. Master them and everything else
          follows.
        </PullQuote>

        <h2>Percentage calculations: the ones you actually need</h2>

        <h3>Finding X% of a number</h3>
        <p>
          Formula: <code>number × percentage ÷ 100</code>
        </p>
        <ul>
          <li>20% of £250 = 250 × 20 ÷ 100 = <strong>£50</strong></li>
          <li>15% tip on a £60 meal = 60 × 15 ÷ 100 = <strong>£9</strong></li>
          <li>7.5% VAT on £400 = 400 × 7.5 ÷ 100 = <strong>£30</strong></li>
        </ul>
        <p>
          On the <a href="/calculator">Calculator</a>, type the number, press ×, type the percentage,
          then press the % button. It calculates automatically.
        </p>

        <h3>Calculating a discount</h3>
        <p>
          A £120 jacket is 30% off. Discount = 120 × 30 ÷ 100 = £36. Sale price = 120 − 36 ={" "}
          <strong>£84</strong>.
        </p>

        <h3>Finding what percentage one number is of another</h3>
        <p>
          Formula: <code>(part ÷ whole) × 100</code>
        </p>
        <ul>
          <li>You scored 42 out of 60 on a test. Percentage = (42 ÷ 60) × 100 = <strong>70%</strong></li>
          <li>
            Your website had 320 visitors and 48 clicked a button. Click rate = (48 ÷ 320) × 100 ={" "}
            <strong>15%</strong>
          </li>
        </ul>

        <h3>Percentage increase and decrease</h3>
        <p>
          Increase: <code>((new − old) ÷ old) × 100</code>
          <br />
          Decrease: <code>((old − new) ÷ old) × 100</code>
        </p>
        <ul>
          <li>
            Sales went from 200 to 260. Increase = ((260 − 200) ÷ 200) × 100 = <strong>30%</strong>
          </li>
          <li>
            Price dropped from £80 to £68. Decrease = ((80 − 68) ÷ 80) × 100 = <strong>15%</strong>
          </li>
        </ul>

        <h2>Square root: what it is and when you need it</h2>
        <p>
          The square root of a number is the value that, multiplied by itself, gives the original
          number. You&apos;ll use it most often in geometry (finding the side of a square from its area)
          and in some financial calculations.
        </p>
        <ul>
          <li>√25 = 5 (because 5 × 5 = 25)</li>
          <li>√144 = 12 (because 12 × 12 = 144)</li>
          <li>√2 ≈ 1.414 (irrational, the calculator shows the decimal approximation)</li>
        </ul>
        <p>
          Practical example: you want to tile a square room with an area of 36 m². Each side = √36 ={" "}
          <strong>6 metres</strong>.
        </p>

        <h2>How to use the Sounez Calculator</h2>
        <ol>
          <li>
            Open the <a href="/calculator">Calculator</a>. It loads instantly in your browser, no
            install, no account.
          </li>
          <li>
            Click number buttons or type directly from your keyboard. Supported keys: 0–9, +, −, ×
            (*), ÷ (/), %, Enter (=), Escape (clear).
          </li>
          <li>Use the % button for percentage calculations and √ for square roots.</li>
          <li>
            The ± button toggles between positive and negative numbers, useful for calculating
            losses or negative balances.
          </li>
          <li>
            Your last 10 calculations appear in the history panel below the display, so you can
            reference previous results without retyping.
          </li>
          <li>Press C to clear and start a new calculation.</li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <h3>How do I calculate a percentage?</h3>
        <p>
          To find X% of a number, multiply the number by X and divide by 100. For example, 20% of
          150 = 150 × 20 ÷ 100 = 30. The <a href="/calculator">Sounez Calculator</a> has a % button
          that handles this automatically.
        </p>
        <h3>What is a square root?</h3>
        <p>
          The square root of a number is the value that, when multiplied by itself, gives the
          original number. The square root of 25 is 5, because 5 × 5 = 25. Use the √ button on the
          calculator.
        </p>
        <h3>Does the calculator save my calculations?</h3>
        <p>
          The <a href="/calculator">Sounez Calculator</a> keeps a history of your last 10
          calculations in the current session. Nothing is saved to a server or stored after you close
          the tab.
        </p>
        <h3>Can I use the calculator on my phone?</h3>
        <p>
          Yes. The calculator is fully responsive and works on touchscreen devices. You can also type
          numbers and operators using your keyboard on desktop.
        </p>
        <h3>Is the online calculator accurate?</h3>
        <p>
          Yes, for everyday arithmetic. Like all floating-point calculators, very large numbers or
          long decimal chains can have minor rounding differences, but for typical daily calculations
          it is fully accurate.
        </p>

        <h2>Conclusion: bookmark it, use it daily</h2>
        <p>
          The <a href="/calculator">Sounez Calculator</a> is designed for the calculations you
          actually do every day, not the ones you studied in school and never used again. Bookmark
          it, use the keyboard shortcuts, and let the history panel save you from retyping. For
          anything text-related, the <a href="/word-counter">Word Counter</a> is just as fast.
        </p>
      </BlogPostShell>
    </>
  );
}
