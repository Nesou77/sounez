import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const mockPath = vi.hoisted(() => ({ current: "/blog/how-to-compress-images" }));
vi.mock("next/navigation", () => ({
  usePathname: () => mockPath.current,
}));

import { AdSlot } from "./AdSlot";
import { setStoredConsent } from "@/lib/consent";

describe("AdSlot", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.unstubAllEnvs();
    mockPath.current = "/blog/how-to-compress-images";
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("renders nothing when ads are disabled", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "false");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890123456");
    const { container } = render(<AdSlot slot="1234567890" name="test-slot" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when no slot ID is configured for this placement", () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890123456");
    const { container } = render(<AdSlot slot={undefined} name="test-slot" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing on an ad-excluded route like /privacy-policy", () => {
    mockPath.current = "/privacy-policy";
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890123456");
    const { container } = render(<AdSlot slot="1234567890" name="test-slot" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the labeled ad container once advertising consent is granted", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890123456");
    // Ads being enabled always implies nonEssentialScriptsConfigured() === true, so
    // consent is always required before AdSlot renders — grant it up front here.
    setStoredConsent({ analytics: false, advertising: true });
    render(<AdSlot slot="1234567890" name="test-slot" />);
    expect(await screen.findByText("Advertisement")).toBeInTheDocument();
    expect(screen.getByLabelText("Advertisement (test-slot)")).toBeInTheDocument();
  });

  it("stays hidden pending advertising consent, then appears once consent is granted", async () => {
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_ENABLED", "true");
    vi.stubEnv("NEXT_PUBLIC_ADSENSE_PUB_ID", "ca-pub-1234567890123456");

    render(<AdSlot slot="1234567890" name="test-slot" />);
    expect(screen.queryByText("Advertisement")).not.toBeInTheDocument();

    setStoredConsent({ analytics: false, advertising: true });

    expect(await screen.findByText("Advertisement")).toBeInTheDocument();
  });
});
