import { describe, expect, it, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ResumeSkillsExtractOverlay } from "../components/ResumeSkillsExtractOverlay";

afterEach(cleanup);

describe("ResumeSkillsExtractOverlay", () => {
  it("renders nothing when idle", () => {
    const { container } = render(<ResumeSkillsExtractOverlay status="idle" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders accessible loading panel when loading", () => {
    render(<ResumeSkillsExtractOverlay status="loading" />);
    const overlay = screen.getByTestId("resume-skills-extract-overlay");
    expect(overlay).toHaveAttribute("aria-busy", "true");
    expect(overlay).toHaveAttribute("aria-modal", "true");
    expect(overlay).toHaveAttribute("data-overlay-status", "loading");
    expect(screen.getByText("Scanning your resume")).toBeInTheDocument();
    expect(
      screen.getByText(/Detecting skills to suggest for your Qualification step/i),
    ).toHaveAttribute("aria-live", "polite");
  });

  it("renders success state with added skill count", () => {
    render(<ResumeSkillsExtractOverlay status="success" addedCount={24} />);
    const overlay = screen.getByTestId("resume-skills-extract-overlay");
    expect(overlay).toHaveAttribute("aria-busy", "false");
    expect(overlay).toHaveAttribute("data-overlay-status", "success");
    expect(screen.getByText("Added 24 skills from your resume")).toBeInTheDocument();
    expect(screen.getByText("Review them in the Qualification step.")).toBeInTheDocument();
  });

  it("renders success state when no new skills were added", () => {
    render(<ResumeSkillsExtractOverlay status="success" addedCount={0} />);
    expect(screen.getByText("Resume scanned")).toBeInTheDocument();
    expect(
      screen.getByText("No new skills detected from the uploaded CV."),
    ).toBeInTheDocument();
  });

  it("renders error state with message", () => {
    render(
      <ResumeSkillsExtractOverlay
        status="error"
        errorMessage="OpenAI is unavailable."
      />,
    );
    const overlay = screen.getByTestId("resume-skills-extract-overlay");
    expect(overlay).toHaveAttribute("data-overlay-status", "error");
    expect(screen.getByText("Document saved. Skills not extracted")).toBeInTheDocument();
    expect(screen.getByText("OpenAI is unavailable.")).toBeInTheDocument();
  });
});
