// List of sequential video frames for BrainVibe Hero scroll experience
// 240 perfectly smooth WebP frames starting from frame-1.webp up to frame-240.webp
export const HERO_FRAMES: string[] = Array.from(
  { length: 240 },
  (_, index) => `/frames/frame-${index + 1}.webp`
);

export const TOTAL_FRAMES = HERO_FRAMES.length; // 240
