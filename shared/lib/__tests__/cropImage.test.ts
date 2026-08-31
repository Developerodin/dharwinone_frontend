import { describe, expect, it, vi } from "vitest";
import {
  computeCropRect,
  renderCrop,
  CROP_OUTPUT_SIZE,
  CROP_JPEG_QUALITY,
} from "../image/cropImage";

describe("computeCropRect", () => {
  it("maps percentage crop area to natural pixel coordinates", () => {
    expect(
      computeCropRect({ x: 10, y: 20, width: 50, height: 50 }, 1000, 800),
    ).toEqual({ x: 100, y: 160, width: 500, height: 400 });
  });

  it("rounds fractional pixel values", () => {
    expect(
      computeCropRect({ x: 33.3, y: 0, width: 33.3, height: 100 }, 300, 300),
    ).toEqual({ x: 100, y: 0, width: 100, height: 300 });
  });
});

describe("renderCrop", () => {
  it("draws the crop onto a square canvas and returns a JPEG blob", async () => {
    const drawImage = vi.fn();
    const toBlob = vi.fn((cb: (b: Blob | null) => void) =>
      cb(new Blob(["out"], { type: "image/jpeg" })),
    );
    const getContext = vi.fn(() => ({
      fillStyle: "",
      fillRect: vi.fn(),
      drawImage,
    }));

    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "canvas") {
        return { width: 0, height: 0, getContext, toBlob } as unknown as HTMLCanvasElement;
      }
      return document.createElement.bind(document)(tag);
    });

    const image = { width: 400, height: 300 } as HTMLImageElement;
    vi.spyOn(globalThis, "Image").mockImplementation(function ImageMock(this: HTMLImageElement) {
      const el = {
        crossOrigin: "",
        width: 400,
        height: 300,
        addEventListener(type: string, listener: () => void) {
          if (type === "load") {
            setTimeout(listener, 0);
          }
        },
        set src(_value: string) {
          // load listener already scheduled in addEventListener
        },
      };
      return el as unknown as HTMLImageElement;
    });

    const blob = await renderCrop("blob:src", { x: 0, y: 0, width: 200, height: 200 });

    expect(getContext).toHaveBeenCalledWith("2d");
    expect(drawImage).toHaveBeenCalledWith(
      expect.anything(),
      0,
      0,
      200,
      200,
      0,
      0,
      CROP_OUTPUT_SIZE,
      CROP_OUTPUT_SIZE,
    );
    expect(toBlob).toHaveBeenCalledWith(
      expect.any(Function),
      "image/jpeg",
      CROP_JPEG_QUALITY,
    );
    expect(blob.type).toBe("image/jpeg");
  });
});
