import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import PrivacyPolicyPage from "./privacy-policy/page";
import TermsOfServicePage from "./terms-of-service/page";
import CookiePolicyPage from "./cookie-policy/page";
import DmcaPage from "./dmca/page";
import EditorialPolicyPage from "./editorial-policy/page";

// Smoke tests: every trust/legal page must render without throwing and expose
// exactly one <h1>, so a broken import or accidental duplicate heading fails CI.
describe.each([
  ["About", AboutPage],
  ["Contact", ContactPage],
  ["Privacy Policy", PrivacyPolicyPage],
  ["Terms of Service", TermsOfServicePage],
  ["Cookie Policy", CookiePolicyPage],
  ["DMCA", DmcaPage],
  ["Editorial Policy", EditorialPolicyPage],
])("%s page", (_name, Page) => {
  it("renders exactly one top-level heading", () => {
    render(<Page />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(/.+/);
  });
});
