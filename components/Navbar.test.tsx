import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders the primary navigation links", () => {
    render(<Navbar />);
    const primaryNav = screen.getByLabelText("Main navigation");
    for (const label of ["Home", "Smart Packs", "Tools", "Guides", "FAQ", "About", "Contact"]) {
      expect(within(primaryNav).getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("hides the mobile menu until the toggle is opened", () => {
    render(<Navbar />);
    expect(screen.queryByLabelText("Mobile navigation")).not.toBeInTheDocument();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the mobile menu on toggle click and shows the same links", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNav = screen.getByLabelText("Mobile navigation");
    expect(within(mobileNav).getByRole("link", { name: "Tools" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the mobile menu and returns focus to the toggle on Escape", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByLabelText("Mobile navigation")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("closes the mobile menu when a link is clicked", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNav = screen.getByLabelText("Mobile navigation");
    fireEvent.click(within(mobileNav).getByRole("link", { name: "About" }));
    expect(screen.queryByLabelText("Mobile navigation")).not.toBeInTheDocument();
  });
});
