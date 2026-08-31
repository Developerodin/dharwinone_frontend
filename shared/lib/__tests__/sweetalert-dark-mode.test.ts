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
});
