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

  // 1. Efficient concurrent image preloading with immediate first-frame readiness
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = loadedImages;
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

        // Show immediately once initial key frames are ready
        if (index === 0 || loaded >= 5) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (index === 0 || loaded >= 5) {
          setIsReady(true);
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [onLoadProgress]);

  // 2. Direct mapping from scroll progress to target frame
  useEffect(() => {
    const exactFrame = scrollProgress * (TOTAL_FRAMES - 1);
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, exactFrame));
    targetFrameRef.current = clamped;
  }, [scrollProgress]);

  // 3. Fluid 60fps render loop with inertial damping and sub-frame cross-fading
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Smooth inertial interpolation towards target frame for silky 60fps turntable physics
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * 0.14; // Smooth damping
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const exactFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      const frameIndex1 = Math.floor(exactFrame);
      const frameIndex2 = Math.min(TOTAL_FRAMES - 1, frameIndex1 + 1);
      const blend = exactFrame - frameIndex1;

      // Find primary frame or nearest available loaded frame
      let img1 = imagesRef.current[frameIndex1];
      if (!img1 || !img1.complete || img1.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = imagesRef.current[frameIndex1 - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img1 = prev;
            break;
          }
          const next = imagesRef.current[frameIndex1 + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img1 = next;
            break;
          }
        }
      }

      const img2 = imagesRef.current[frameIndex2];

      if (img1 && img1.complete && img1.naturalWidth > 0) {
        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const rect = canvas.getBoundingClientRect();

        const targetWidth = Math.floor(rect.width * dpr);
        const targetHeight = Math.floor(rect.height * dpr);

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }

        // Fill background matching frame perimeter (#cbcdcf)
        ctx.fillStyle = "#cbcdcf";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Aspect-ratio contain to preserve full fidelity without cropping
        const imgRatio = img1.naturalWidth / img1.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth: number;
        let drawHeight: number;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.height;
          drawWidth = drawHeight * imgRatio;
        } else {
          drawWidth = canvas.width;
          drawHeight = drawWidth / imgRatio;
        }

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        // Draw primary frame
        ctx.globalAlpha = 1.0;
        ctx.drawImage(img1, offsetX, offsetY, drawWidth, drawHeight);

        // Sub-frame cross-fading for buttery smoothness between frames
        if (blend > 0 && img2 && img2.complete && img2.naturalWidth > 0) {
          ctx.globalAlpha = blend;
          ctx.drawImage(img2, offsetX, offsetY, drawWidth, drawHeight);
          ctx.globalAlpha = 1.0;
        }
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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-100/90 backdrop-blur-sm transition-opacity duration-500">
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
