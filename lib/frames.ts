// List of sequential video frames for BrainVibe Hero scroll experience
// 129 clean PNG frames starting from frame-2.png up to frame-130.png (no frame 1)
export const HERO_FRAMES: string[] = Array.from(
  { length: 129 },
  (_, index) => `/frames/frame-${index + 2}.png`
);

export const TOTAL_FRAMES = HERO_FRAMES.length; // 129
