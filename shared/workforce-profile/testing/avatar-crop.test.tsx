import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { AvatarCropOverlay } from "../components/AvatarCropOverlay";

vi.mock("react-easy-crop", () => ({
  default: function MockCropper({
    onCropComplete,
  }: {
    onCropComplete?: (area: unknown, pixels: { x: number; y: number; width: number; height: number }) => void;
  }) {
    React.useEffect(() => {
      onCropComplete?.(
        { x: 0, y: 0, width: 50, height: 50 },
        { x: 10, y: 20, width: 100, height: 100 },
      );
    }, [onCropComplete]);
    return <div data-testid="mock-cropper" />;
  },
}));

const renderCropMock = vi.fn();
vi.mock("@/shared/lib/image/cropImage", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/shared/lib/image/cropImage")>();
  return {
    ...actual,
    renderCrop: (...args: unknown[]) => renderCropMock(...args),
  };
});

beforeEach(() => {
  renderCropMock.mockReset();
  renderCropMock.mockResolvedValue(new Blob(["jpeg"], { type: "image/jpeg" }));
  vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:preview");
  vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
});

afterEach(cleanup);

describe("AvatarCropOverlay", () => {
  const file = new File(["img"], "avatar.png", { type: "image/png" });

  it("renders nothing when closed", () => {
    const { container } = render(
      <AvatarCropOverlay open={false} imageFile={file} onClose={vi.fn()} onApply={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("opens an accessible dialog with crop controls", () => {
    render(<AvatarCropOverlay open imageFile={file} onClose={vi.fn()} onApply={vi.fn()} />);
    expect(screen.getByRole("dialog", { name: "Edit profile photo" })).toHaveAttribute(
      "aria-modal",
      "true",
    );
    expect(screen.getByTestId("mock-cropper")).toBeInTheDocument();
    expect(screen.getByLabelText("Zoom")).toBeInTheDocument();
  });

  it("cancel closes without calling onApply", () => {
    const onClose = vi.fn();
    const onApply = vi.fn();
    render(<AvatarCropOverlay open imageFile={file} onClose={onClose} onApply={onApply} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onApply).not.toHaveBeenCalled();
    expect(renderCropMock).not.toHaveBeenCalled();
  });

  it("escape closes without calling onApply", () => {
    const onClose = vi.fn();
    const onApply = vi.fn();
    render(<AvatarCropOverlay open imageFile={file} onClose={onClose} onApply={onApply} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onApply).not.toHaveBeenCalled();
  });

  it("apply renders crop and passes a JPEG file to onApply", async () => {
    const onApply = vi.fn();
    render(<AvatarCropOverlay open imageFile={file} onClose={vi.fn()} onApply={onApply} />);

    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    await waitFor(() => expect(renderCropMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(onApply).toHaveBeenCalledTimes(1));
    const cropped = onApply.mock.calls[0][0] as File;
    expect(cropped.name).toBe("avatar.jpg");
    expect(cropped.type).toBe("image/jpeg");
  });

  it("reset restores default zoom without applying", () => {
    render(<AvatarCropOverlay open imageFile={file} onClose={vi.fn()} onApply={vi.fn()} />);
    const slider = screen.getByLabelText("Zoom") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "2" } });
    expect(slider.value).toBe("2");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(slider.value).toBe("1");
  });
});
