"use client";

import React, { useEffect, useRef, useState } from "react";
import { HERO_FRAMES, TOTAL_FRAMES } from "@/lib/frames";

interface CanvasSequenceProps {
  scrollProgress: number; // 0.0 to 1.0
  onLoadProgress?: (progress: number) => void;
}

export default function CanvasSequence({
  scrollProgress,
  onLoadProgress,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // 1. Preload all frames sequentially & efficiently
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    HERO_FRAMES.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isCancelled) return;
        loadedImages[index] = img;
        loaded++;
        setLoadedCount(loaded);
        if (onLoadProgress) {
          onLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        }
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsReady(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        // Fallback in case of individual load issue
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setIsReady(true);
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [onLoadProgress]);

  // 2. Update target frame on scroll progress change
  useEffect(() => {
    const rawIndex = scrollProgress * (TOTAL_FRAMES - 1);
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIndex));
    targetFrameRef.current = clamped;
  }, [scrollProgress]);

  // 3. Render loop with sub-frame lerping for silk-smooth cinematic movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Smooth lerp towards target frame
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.18; // smooth interpolation factor
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameIndex = Math.round(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current))
      );

      const img = imagesRef.current[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const rect = canvas.getBoundingClientRect();
        
        // Ensure canvas internal resolution matches display size * DPR
        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        // Fill clean background matching the pristine studio backdrop of the frames
        ctx.fillStyle = "#fbfbfd";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Aspect ratio calculation - contain with slight upscale for immersive focus
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth: number;
        let drawHeight: number;
        let offsetX: number;
        let offsetY: number;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image
          drawHeight = canvas.height * 0.96;
          drawWidth = drawHeight * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          // Canvas is taller than image (e.g. mobile/portrait)
          drawWidth = canvas.width * 0.96;
          drawHeight = drawWidth / imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        // Draw image onto canvas
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isReady]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Loading state indicator */}
      {!isReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm transition-opacity duration-500">
          <div className="relative w-16 h-16 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-teal-200 animate-ping opacity-30" />
            <div className="w-12 h-12 rounded-full border-3 border-teal-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
            Calibrating Neuro Spatial Model
          </p>
          <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-200 ease-out"
              style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-slate-600 mt-1.5">
            {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        </div>
      )}

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block pointer-events-none transition-opacity duration-700 ease-out"
        style={{ opacity: isReady ? 1 : 0 }}
      />
    </div>
  );
}
