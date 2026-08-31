"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import Cropper, { type Area, type Point } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import {
  blobToFile,
  renderCrop,
} from "@/shared/lib/image/cropImage";
import styles from "./avatar-crop-overlay.module.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;

export interface AvatarCropOverlayProps {
  open: boolean;
  imageFile: File | null;
  onClose: () => void;
  onApply: (croppedFile: File) => void | Promise<void>;
}

export function AvatarCropOverlay({
  open,
  imageFile,
  onClose,
  onApply,
}: AvatarCropOverlayProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imageUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !imageFile) {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = null;
      }
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    imageUrlRef.current = url;
    setImageUrl(url);
    setCrop({ x: 0, y: 0 });
    setZoom(MIN_ZOOM);
    setCroppedAreaPixels(null);

    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = null;
      }
    };
  }, [open, imageFile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleReset = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(MIN_ZOOM);
  }, []);

  const handleApply = useCallback(async () => {
    if (!imageFile || !imageUrl || !croppedAreaPixels || applying) return;
    setApplying(true);
    try {
      const blob = await renderCrop(imageUrl, croppedAreaPixels, {}, imageFile);
      const baseName = imageFile.name.replace(/\.[^.]+$/, "") || "profile-photo";
      const croppedFile = blobToFile(blob, `${baseName}.jpg`);
      await onApply(croppedFile);
    } finally {
      setApplying(false);
    }
  }, [applying, croppedAreaPixels, imageFile, imageUrl, onApply]);

  const decZoom = () => setZoom((z) => Math.max(MIN_ZOOM, Number((z - ZOOM_STEP).toFixed(2))));
  const incZoom = () => setZoom((z) => Math.min(MAX_ZOOM, Number((z + ZOOM_STEP).toFixed(2))));

  if (!open || !mounted || !imageFile || !imageUrl) return null;

  return createPortal(
    <div className={styles.scrim} onClick={onClose} data-testid="avatar-crop-overlay">
      <FocusLock returnFocus>
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit profile photo"
          className={styles.dialog}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <div>
              <h3 className={styles.title}>Edit profile photo</h3>
              <p className={styles.subtitle}>Drag to reposition. Pinch or use the slider to zoom.</p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <i className="ri-close-line" aria-hidden="true" />
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.cropStage}>
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className={styles.zoomRow}>
              <button
                type="button"
                className={styles.zoomBtn}
                onClick={decZoom}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
              >
                <i className="ri-subtract-line" aria-hidden="true" />
              </button>
              <input
                type="range"
                className={styles.zoomSlider}
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={ZOOM_STEP}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Zoom"
              />
              <button
                type="button"
                className={styles.zoomBtn}
                onClick={incZoom}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
              >
                <i className="ri-add-line" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
              disabled={applying}
            >
              Reset
            </button>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={applying}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.applyBtn}
                onClick={() => void handleApply()}
                disabled={applying || !croppedAreaPixels}
              >
                {applying ? "Applying…" : "Apply"}
              </button>
            </div>
          </div>
        </div>
      </FocusLock>
    </div>,
    document.body,
  );
}
