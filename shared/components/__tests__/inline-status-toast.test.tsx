import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  INLINE_STATUS_TOAST_INNER_CLASSES,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER,
  INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT,
} from "@/shared/lib/inline-status-toast";
import { InlineStatusToast } from "@/shared/components/InlineStatusToast";

describe("inline-status-toast classes", () => {
  it("keeps light-mode contrast on defaulttextcolor surface", () => {
    expect(INLINE_STATUS_TOAST_INNER_CLASSES).toContain("bg-defaulttextcolor");
    expect(INLINE_STATUS_TOAST_INNER_CLASSES).toContain("text-white");
  });

  it("inverts surface and text in dark mode", () => {
    expect(INLINE_STATUS_TOAST_INNER_CLASSES).toContain("dark:bg-white");
    expect(INLINE_STATUS_TOAST_INNER_CLASSES).toContain("dark:text-bodybg");
  });

  it("exposes stable position helpers", () => {
    expect(INLINE_STATUS_TOAST_POSITION_BOTTOM_RIGHT).toContain("bottom-4");
    expect(INLINE_STATUS_TOAST_POSITION_BOTTOM_CENTER).toContain("left-1/2");
  });
});

describe("InlineStatusToast", () => {
  it("renders punch-out style toast with status semantics", () => {
    render(<InlineStatusToast message="You have been punched out." />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("You have been punched out.");
    expect(status.firstElementChild).toHaveClass("dark:bg-white", "dark:text-bodybg");
  });

  it("supports bottom-center placement for dashboard reuse", () => {
    render(<InlineStatusToast message="Saved" position="bottom-center" iconClassName="ri-check-line" />);
    const status = screen.getByText("Saved").closest("[role='status']");
    expect(status).toHaveClass("left-1/2", "-translate-x-1/2");
    expect(status?.querySelector(".ri-check-line")).not.toBeNull();
  });
});
