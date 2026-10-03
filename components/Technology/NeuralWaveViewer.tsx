"use client";

import React, { useEffect, useRef, useState } from "react";
import { Activity, Play, Pause, RefreshCw } from "lucide-react";

interface WaveBand {
  name: string;
  range: string;
  state: string;
  frequency: number; // Hz for visual rendering
  amplitude: number;
  color: string;
  description: string;
}

const BANDS: WaveBand[] = [
  {
    name: "Alpha Waves",
    range: "8.0 – 12.0 Hz",
    state: "Calm Focus & Alert Relaxation",
    frequency: 10,
    amplitude: 26,
    color: "#0d9488", // teal-600
    description:
      "Indicates optimal relaxed alertness and mental recovery. Decreased alpha often correlates with chronic stress.",
  },
  {
    name: "Beta Waves",
    range: "12.0 – 30.0 Hz",
    state: "Active Cognition & Analytical Focus",
    frequency: 20,
    amplitude: 18,
    color: "#0284c7", // sky-600
    description:
      "Dominates during active problem solving and high cognitive engagement. Excessive high-beta suggests acute anxiety.",
  },
  {
    name: "Theta Waves",
    range: "4.0 – 8.0 Hz",
    state: "Deep Introspection & Memory Encoding",
    frequency: 6,
    amplitude: 34,
    color: "#8b5cf6", // violet-500
    description:
      "Associated with flow states, creativity, and subconscious memory consolidation during resting wakefulness.",
  },
  {
    name: "Delta Waves",
    range: "0.5 – 4.0 Hz",
    state: "Deep Rest & Neuro-Regeneration",
    frequency: 2.5,
    amplitude: 44,
    color: "#f59e0b", // amber-500
    description:
      "Slow, high-amplitude waves essential for cellular neuro-regeneration and physiological stress recovery.",
  },
  {
    name: "Gamma Waves",
    range: "30.0 – 100 Hz",
    state: "Peak Neural Binding & High Information Flow",
    frequency: 38,
    amplitude: 12,
    color: "#ec4899", // pink-500
    description:
      "Synchronizes disparate brain regions during complex multisensory synthesis and rapid insight generation.",
  },
];

export default function NeuralWaveViewer() {
  const [activeBandIndex, setActiveBandIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const currentBand = BANDS[activeBandIndex];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only pause when off-screen on mobile (cap animation work)
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const observer = new IntersectionObserver((entries) => {
      setIsVisible(entries[0].isIntersecting);
    }, { threshold: 0.1 });
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localTime = timeRef.current;

    const render = () => {
      if (isPlaying && isVisible) {
        localTime += 0.04;
        timeRef.current = localTime;
      }

      if (isVisible || typeof window !== 'undefined' && window.innerWidth >= 1024) {
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
        const pointStep = isMobile ? 4 : 2;
        const gridStep = isMobile ? 80 : 40;

        ctx.clearRect(0, 0, width, height);

        // Draw subtle grid lines
        ctx.strokeStyle = "rgba(226, 232, 240, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Horizontal center
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        // Vertical grid divisions
        for (let x = 0; x < width; x += gridStep) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
        }
        ctx.stroke();

        // Multi-channel background waveforms (ghosted traces)
        BANDS.forEach((band, idx) => {
          if (idx === activeBandIndex) return;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(148, 163, 184, 0.18)";
          ctx.lineWidth = 1;

          for (let x = 0; x < width; x += pointStep) {
            const freq = band.frequency * 0.08;
            const amp = band.amplitude * 0.45;
            const noise = Math.sin(x * 0.05 + localTime * 2) * 2;
            const y =
              centerY +
              Math.sin(x * freq * 0.15 + localTime * band.frequency * 0.3) * amp +
              noise;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });

        // Active selected wave channel
        ctx.beginPath();
        ctx.strokeStyle = currentBand.color;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = currentBand.color;
        ctx.shadowBlur = 8;

        for (let x = 0; x < width; x += pointStep) {
          const freq = currentBand.frequency * 0.08;
          const amp = currentBand.amplitude;
          // Natural physiological harmonic variance
          const harmonic = Math.sin(x * 0.03 + localTime) * 3;
          const subNoise = Math.cos(x * 0.09 - localTime * 1.5) * 1.5;
          const y =
            centerY +
            Math.sin(x * freq * 0.15 + localTime * currentBand.frequency * 0.3) * amp +
            harmonic +
            subNoise;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

      ctx.shadowBlur = 0; // reset

      // Draw real-time active pulse dot at leading edge
      const leadX = width - 10;
      const leadY =
        centerY +
        Math.sin(
          leadX * currentBand.frequency * 0.08 * 0.15 +
            localTime * currentBand.frequency * 0.3
        ) *
          currentBand.amplitude;
      ctx.fillStyle = currentBand.color;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 4, 0, Math.PI * 2);
      ctx.fill();
      } // CLOSE THE IF BRACKET

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeBandIndex, isPlaying, currentBand, isVisible]);

  return (
    <div ref={containerRef} className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl">
      {/* Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Real-Time Neural Frequency Oscilloscope</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {currentBand.name}{" "}
            <span className="text-sm font-mono font-normal text-slate-400">
              ({currentBand.range})
            </span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-teal-400" />
                <span>Freeze</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-teal-400" />
                <span>Stream</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Wave Oscilloscope Canvas */}
      <div className="relative w-full h-44 sm:h-52 my-6 bg-slate-950/80 rounded-2xl overflow-hidden border border-slate-800/80">
        <canvas
          ref={canvasRef}
          width={800}
          height={220}
          className="w-full h-full block"
        />

        <div className="absolute top-3 right-4 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/60 text-[11px] font-mono text-slate-300">
          State: <span className="text-white font-semibold">{currentBand.state}</span>
        </div>
      </div>

      {/* Band Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
        {BANDS.map((band, idx) => {
          const isSelected = activeBandIndex === idx;
          return (
            <button
              key={band.name}
              onClick={() => setActiveBandIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-slate-800 border-teal-500 shadow-sm"
                  : "bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: band.color }}
                />
                <span className="text-[10px] font-mono text-slate-500">
                  {band.range}
                </span>
              </div>
              <span
                className={`text-xs font-bold block ${
                  isSelected ? "text-white" : "text-slate-300"
                }`}
              >
                {band.name.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="mt-4 text-xs text-slate-400 leading-relaxed pt-3 border-t border-slate-800/60">
        <strong className="text-slate-200">Clinical Correlate:</strong>{" "}
        {currentBand.description}
      </p>
    </div>
  );
}
