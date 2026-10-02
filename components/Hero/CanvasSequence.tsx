"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { HERO_FRAMES, TOTAL_FRAMES } from "@/lib/frames";

interface CanvasSequenceProps {
  scrollProgress: number; // 0.0 to 1.0
  onLoadProgress?: (progress: number) => void;
}

interface LayoutMetrics {
  width: number;
  height: number;
  drawWidth: number;
  drawHeight: number;
  offsetX: number;
  offsetY: number;
}

export default function CanvasSequence({
  scrollProgress,
  onLoadProgress,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const requestRef = useRef<number | null>(null);
  const layoutRef = useRef<LayoutMetrics>({
    width: 0,
    height: 0,
    drawWidth: 0,
    drawHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // 1. Cached layout calculation — ZERO getBoundingClientRect() calls inside requestAnimationFrame
  const updateLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.max(1, Math.floor(rect.width * dpr));
    const targetHeight = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgRatio = 16 / 9; // 1920x1080 native frame aspect ratio
    const canvasRatio = targetWidth / targetHeight;

    let drawWidth: number;
    let drawHeight: number;

    // Object-cover scaling: Fill the entire screen
    if (canvasRatio > imgRatio) {
      drawWidth = targetWidth;
      drawHeight = drawWidth / imgRatio;
    } else {
      drawHeight = targetHeight;
      drawWidth = drawHeight * imgRatio;
    }

    const offsetX = (targetWidth - drawWidth) / 2;
    let offsetY = (targetHeight - drawHeight) / 2;

    // On mobile portrait, push the model down slightly so it doesn't overlap the large text
    if (canvasRatio < 1) {
      offsetY += targetHeight * 0.15;
    }

    layoutRef.current = {
      width: targetWidth,
      height: targetHeight,
      drawWidth,
      drawHeight,
      offsetX,
      offsetY,
    };

    // Force redraw on resize
    lastRenderedFrameRef.current = -1;
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout, { passive: true });
    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [updateLayout]);

  // 2. High-performance interleaved preloader with off-thread asynchronous decoding
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    // Interleaved order: keyframes across the 360 rotation load first
    // This guarantees the middle (frames 30-80) never has missing frames or lag
    const order: number[] = [];
    const step = 4;

    // Pass 1: Every 4th frame across the entire turntable
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      order.push(i);
    }
    // Pass 2: Halfway between keyframes
    for (let i = 2; i < TOTAL_FRAMES; i += step) {
      if (!order.includes(i)) order.push(i);
    }
    // Pass 3: All remaining intermediate frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (!order.includes(i)) order.push(i);
    }

    const loadFrame = async (index: number) => {
      if (isCancelled) return;
      const src = HERO_FRAMES[index];
      const img = new Image();
      img.decoding = "async";
      img.src = src;

      try {
        if ("decode" in img) {
          await img.decode();
        }
      } catch {
        // Fallback for decode rejection
      }

      if (isCancelled) return;
      imagesRef.current[index] = img;
      loaded++;
      setLoadedCount(loaded);

      if (onLoadProgress) {
        onLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      }

      if (index === 0 || loaded >= 4) {
        setIsReady(true);
      }
    };

    // Parallel batches with concurrency pool
    const CONCURRENCY = 6;
    let activeIndex = 0;

    const worker = async () => {
      while (activeIndex < order.length && !isCancelled) {
        const nextIdx = order[activeIndex++];
        await loadFrame(nextIdx);
      }
    };

    const pool = Array.from({ length: CONCURRENCY }, () => worker());
    Promise.all(pool);

    return () => {
      isCancelled = true;
    };
  }, [onLoadProgress]);

  // 3. Smooth scroll progress mapping to target frame
  useEffect(() => {
    const exactFrame = scrollProgress * (TOTAL_FRAMES - 1);
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, exactFrame));
    targetFrameRef.current = clamped;
  }, [scrollProgress]);

  // 4. Ultra-smooth 60fps render loop with zero layout thrashing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      // Smooth inertial interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * 0.16; // Perfectly responsive 60fps damping
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const exactFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      const frameDelta = Math.abs(exactFrame - lastRenderedFrameRef.current);

      // Only draw when the frame position actually moves or on initial draw
      if (frameDelta > 0.001 || lastRenderedFrameRef.current === -1) {
        const frameIndex1 = Math.floor(exactFrame);
        const frameIndex2 = Math.min(TOTAL_FRAMES - 1, frameIndex1 + 1);
        const blend = exactFrame - frameIndex1;

        // Resolve primary frame or nearest loaded neighbor
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
        const layout = layoutRef.current;

        if (layout.width > 0) {
          // Unconditionally fill perimeter with background color to prevent black screen
          ctx.fillStyle = "#cbcdcf";
          ctx.fillRect(0, 0, layout.width, layout.height);

          if (img1 && img1.complete && img1.naturalWidth > 0) {
            // Only cache the rendered frame if we actually drew the image!
            lastRenderedFrameRef.current = exactFrame;

            // Draw primary frame
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img1, layout.offsetX, layout.offsetY, layout.drawWidth, layout.drawHeight);

            // Sub-frame cross-fading for buttery transition
            if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0) {
              ctx.globalAlpha = blend;
              ctx.drawImage(img2, layout.offsetX, layout.offsetY, layout.drawWidth, layout.drawHeight);
              ctx.globalAlpha = 1.0;
            }
          }
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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#cbcdcf]/90 backdrop-blur-sm transition-opacity duration-500">
          <div className="relative w-16 h-16 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-teal-200 animate-ping opacity-30" />
            <div className="w-12 h-12 rounded-full border-3 border-teal-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
            Calibrating Neuro Spatial Model
          </p>
          <div className="w-48 h-1.5 bg-slate-300 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all duration-200 ease-out"
              style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-slate-700 mt-1.5">
            {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
        </div>
      )}

      {/* Main High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: isReady ? 1 : 0 }}
      />
    </div>
  );
}
