import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const PAGES_STYLES = path.resolve(
  process.cwd(),
  "public/assets/scss/pages/_pages_styles.scss"
);

describe("sweetalert2 dark-mode styles", () => {
  const source = readFileSync(PAGES_STYLES, "utf8");

  it("themes modal popups for dark mode", () => {
    expect(source).toMatch(/\.swal2-container \.swal2-popup\s*\{[^}]*dark:bg-bodybg/s);
    expect(source).toMatch(/\.swal2-container \.swal2-title\s*\{[^}]*dark:text-white/s);
  });

  it("themes toast popups separately from modal dialogs", () => {
    expect(source).toMatch(/\.swal2-container \.swal2-popup\.swal2-toast\s*\{[^}]*dark:bg-bodybg2/s);
    expect(source).toMatch(/\.swal2-container \.swal2-popup\.swal2-toast\s*\{[^}]*dark:text-white/s);
  });

  /* `input: "select"` dialogs (Organization > Structure "Reparent") had no dropdown arrow
     at all: @tailwindcss/forms strips the native one with `appearance: none`, and
     SweetAlert2's `background:` SHORTHAND then wipes the replacement chevron the plugin
     paints. Both halves of the repair are asserted, because dropping either one brings
     the plain-text-input look straight back. */
  it("redraws the dropdown chevron on select inputs", () => {
    // Asserted against the whole source rather than an extracted `{...}` block: SCSS
    // interpolation writes a literal `}` in `#{!important}`, so a `[^}]*` block match
    // stops at the first declaration that carries it.
    expect(source).toMatch(/\.swal2-container \.swal2-select\s*\{/);
    // Has to outrank SweetAlert2's runtime-injected stylesheet.
    expect(source).toMatch(/background-image:\s*url\("data:image\/svg\+xml[^"]*"\)\s*#\{!important\}/);
    // Room for the icon, so it never overlaps the selected option's text.
    expect(source).toMatch(/padding-inline-end:\s*2\.25rem\s*#\{!important\}/);
  });
});
