import type { Area } from "react-easy-crop";

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const CROP_OUTPUT_SIZE = 512;
export const CROP_JPEG_QUALITY = 0.9;

/**
 * Convert react-easy-crop percentage area (0–100) to pixel coordinates on the
 * natural image dimensions.
 */
export function computeCropRect(
  croppedAreaPercentages: Area,
  naturalWidth: number,
  naturalHeight: number,
): CropRect {
  return {
    x: Math.round((croppedAreaPercentages.x / 100) * naturalWidth),
    y: Math.round((croppedAreaPercentages.y / 100) * naturalHeight),
    width: Math.round((croppedAreaPercentages.width / 100) * naturalWidth),
    height: Math.round((croppedAreaPercentages.height / 100) * naturalHeight),
  };
}

type RenderCropOptions = {
  outputSize?: number;
  quality?: number;
  mimeType?: string;
};

async function loadImageSource(
  imageSrc: string,
  sourceFile?: File | null,
): Promise<CanvasImageSource> {
  if (sourceFile && typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(sourceFile, { imageOrientation: "from-image" });
    } catch {
      // Fall through to Image element — react-easy-crop already previews orientation.
    }
  }

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(new Error("Failed to load image")));
    image.crossOrigin = "anonymous";
    image.src = imageSrc;
  });
}

/**
 * Draw the cropped region onto a square canvas and return a JPEG blob.
 */
export async function renderCrop(
  imageSrc: string,
  cropRect: CropRect,
  options: RenderCropOptions = {},
  sourceFile?: File | null,
): Promise<Blob> {
  const outputSize = options.outputSize ?? CROP_OUTPUT_SIZE;
  const quality = options.quality ?? CROP_JPEG_QUALITY;
  const mimeType = options.mimeType ?? "image/jpeg";

  const image = await loadImageSource(imageSrc, sourceFile);

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not supported");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outputSize, outputSize);
  ctx.drawImage(
    image,
    cropRect.x,
    cropRect.y,
    cropRect.width,
    cropRect.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  if ("close" in image && typeof image.close === "function") {
    image.close();
  }

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), mimeType, quality);
  });

  if (!blob) {
    throw new Error("Failed to render cropped image");
  }

  return blob;
}

export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}
