import React, { useEffect, useRef } from 'react';
import { Sliders } from 'lucide-react';

export interface WatchLayerSpec {
  id: number;
  code: string;
  shortTab: string;
  calloutLabel?: string;
  calloutPosition?: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
  chapterKicker: string;
  tolerance: string;
  title: string;
  description: string;
  material: string;
  hydrostatic: string;
}

export const WATCH_LAYERS: WatchLayerSpec[] = [
  {
    id: 1,
    code: '01',
    shortTab: 'Dual-Curved Sapphire',
    calloutLabel: 'Titanium GR-5 Screws (6x)',
    calloutPosition: 'top-left',
    chapterKicker: 'CHAPTER 01 • OPTICAL SHIELD',
    tolerance: '± 0.2 MICRONS',
    title: 'Box-Domed Anti-Reflective Sapphire Crystal',
    description:
      'Diamond-ground synthetic corundum rated at 9 Mohs hardness, treated with five internal and external vapor-deposited anti-reflective layers.',
    material: 'Synthetic Corundum (Al₂O₃) & Grade 5 Titanium Bezel Screws',
    hydrostatic: '30 Bar Tested',
  },
  {
    id: 2,
    code: '02',
    shortTab: 'Sunray Lacquered',
    chapterKicker: 'CHAPTER 02 • CHROMATIC DIAL',
    tolerance: '± 0.5 MICRONS',
    title: 'Abyssal Blue Sunray Brushed Chapter Ring',
    description:
      'Hand-lacquered galvanic blue dial ring with diamond-cut rhodium indices filled with high-emission Swiss Super-LumiNova BGW9.',
    material: 'Solid Brass Base with Galvanic Abyssal Blue & Rhodium Indices',
    hydrostatic: 'Condensation Immune',
  },
  {
    id: 3,
    code: '03',
    shortTab: 'Instantaneous Date',
    chapterKicker: 'CHAPTER 03 • CALENDAR COMPLICATION',
    tolerance: '± 0.3 MICRONS',
    title: 'Openworked Instantaneous Jump Date Disc',
    description:
      'Skeletonized calendar ring driven by a ruby-roller cam mechanism that executes a complete date jump in less than 4 milliseconds at midnight.',
    material: 'Laser-Cut Brushed Titanium Alloy with Transfers',
    hydrostatic: 'Shock Isolated (5,000G)',
  },
  {
    id: 4,
    code: '04',
    shortTab: '316L Monobloc',
    calloutLabel: '316L Monobloc Case',
    calloutPosition: 'bottom-left',
    chapterKicker: 'CHAPTER 04 • EXOSKELETON ARCHITECTURE',
    tolerance: '± 1.0 MICRONS',
    title: 'Cold-Forged 316L Surgical Monobloc Middle Case',
    description:
      'Milled from a solid billet of low-carbon 316L surgical stainless steel with hand-beveled mirror-polished chamfers and Triplock screw-down crown.',
    material: '316L Low-Carbon Austenitic Stainless Steel',
    hydrostatic: '300M / 1000FT Hermetic',
  },
  {
    id: 5,
    code: '05',
    shortTab: 'Calibre 10',
    calloutLabel: 'Calibre 10 Movement',
    calloutPosition: 'top-right',
    chapterKicker: 'CHAPTER 05 • THE MECHANICAL HEART',
    tolerance: '± 0.1 MICRONS',
    title: 'Calibre 10 In-House Skeleton Movement',
    description:
      'Free-spring Glucydur balance wheel vibrating at 28,800 beats per hour with paramagnetic hairspring.',
    material: 'Cupro-Beryllium & German Silver with Rhodium Plating',
    hydrostatic: '30 Bar Tested',
  },
  {
    id: 6,
    code: '06',
    shortTab: '22K Gold',
    chapterKicker: 'CHAPTER 06 • KINETIC WINDING',
    tolerance: '± 0.2 MICRONS',
    title: '22-Karat Solid Gold Openworked Oscillating Rotor',
    description:
      'Bi-directional peripheral winding mass peripheral-weighted in 22K rose gold, feeding twin mainspring barrels for a 70-hour autonomous reserve.',
    material: '22K 5N Rose Gold & Unlubricated Ceramic Ball Bearings',
    hydrostatic: 'Bi-Directional Winding',
  },
  {
    id: 7,
    code: '07',
    shortTab: 'Hermetic Exhibition',
    calloutLabel: 'Exhibition Sapphire & Ceramic Bearings',
    calloutPosition: 'bottom-right',
    chapterKicker: 'CHAPTER 07 • TRANSPARENT SEAL',
    tolerance: '± 0.2 MICRONS',
    title: 'Decagonal Screw-Down Sapphire Exhibition Caseback',
    description:
      'Triple-gasket Viton O-ring seal paired with an optical-grade rear sapphire window offering an unobstructed view of the hand-beveled bridges.',
    material: '316L Steel Decagonal Ring & Optical Sapphire Window',
    hydrostatic: '30 Bar Vacuum Verified',
  },
];

const REFERENCE_EXPLODED_IMAGE =
  '/src/assets/images/aura_exploded_minute_details_1791440510426.jpg';
const ASSEMBLED_REAL_WATCH_IMAGE =
  '/src/assets/images/aura_assembled_real_watch_1791439929383.jpg';

interface LayerSliceConfig {
  id: number;
  label: string;
  startX: number;
  endX: number;
  combineDeltaPercent: number;
  zIndex: number;
}

// Contiguous horological segments across the reference image (0%..100%)
// When separation = 100%, delta = 0 so all 7 segments form the exact continuous reference image.
// When separation -> 0%, each segment glides smoothly into the central 316L case at 48% X and morphs into the real watch.
const SLICE_CONFIGS: LayerSliceConfig[] = [
  {
    id: 1,
    label: '01 • Luminous Hands & Titanium GR-5 Screws',
    startX: 0,
    endX: 19,
    combineDeltaPercent: 34,
    zIndex: 75,
  },
  {
    id: 2,
    label: '02 • Sunray Lacquered AURA Dial',
    startX: 18,
    endX: 30,
    combineDeltaPercent: 24,
    zIndex: 70,
  },
  {
    id: 3,
    label: '03 • Instantaneous Date Disc & 3x Gold Gear Train',
    startX: 29,
    endX: 41,
    combineDeltaPercent: 13,
    zIndex: 60,
  },
  {
    id: 4,
    label: '04 • 316L Monobloc Middle Case',
    startX: 40,
    endX: 56,
    combineDeltaPercent: 0,
    zIndex: 80,
  },
  {
    id: 5,
    label: '05 • Calibre 10 In-House Movement',
    startX: 55,
    endX: 67,
    combineDeltaPercent: -13,
    zIndex: 55,
  },
  {
    id: 6,
    label: '06 • Bridges, Balance Wheel, Mainspring & AURA Rotor',
    startX: 66,
    endX: 80,
    combineDeltaPercent: -25,
    zIndex: 45,
  },
  {
    id: 7,
    label: '07 • Hermetic Caseback & Milanese Mesh Bracelet',
    startX: 79,
    endX: 100,
    combineDeltaPercent: -35,
    zIndex: 35,
  },
];

// Smooth cubic ease-in-out helper
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface ExplodedWatchVisualizerProps {
  separation: number;
  setSeparation: (val: number) => void;
  activeLayerId: number;
  setActiveLayerId: (id: number) => void;
  is3DLocked: boolean;
  setIs3DLocked: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean;
  autoMotion?: boolean;
  setAutoMotion?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExplodedWatchVisualizer: React.FC<ExplodedWatchVisualizerProps> = ({
  separation,
  setSeparation,
  activeLayerId,
  setActiveLayerId,
  is3DLocked,
  setIs3DLocked,
  reducedMotion,
  autoMotion = true,
  setAutoMotion,
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const slicesContainerRef = useRef<HTMLDivElement | null>(null);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const microDetailsRef = useRef<SVGSVGElement | null>(null);
  const assembledWatchOverlayRef = useRef<HTMLImageElement | null>(null);
  const calloutGroupRef = useRef<HTMLDivElement | null>(null);
  const calloutRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const percentTextRef = useRef<HTMLSpanElement | null>(null);

  const smoothSepRef = useRef<number>(separation);
  const targetSepRef = useRef<number>(separation);
  const phaseRef = useRef<number>(0.8);

  // Sync manual target changes (when user clicks COMBINE WATCH, 100% DECONSTRUCT, or drags slider)
  useEffect(() => {
    if (!autoMotion) {
      targetSepRef.current = separation;
    }
  }, [separation, autoMotion]);

  // Pure 60fps DOM-driven animation loop (NEVER calls setSeparation during autoMotion, avoiding React re-render hitches!)
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (autoMotion && !reducedMotion) {
        // Smooth continuous oscillation with gentle dwell at 0% (Assembled Watch) and 100% (Exploded Reference)
        phaseRef.current += dt * 0.75;
        const rawWave = 0.5 + 0.58 * Math.sin(phaseRef.current);
        const clamped = Math.max(0, Math.min(1, rawWave));
        targetSepRef.current = easeInOutCubic(clamped) * 100;
      }

      // Silky frame-rate-independent exponential smoothing
      const smoothingFactor = 1 - Math.exp(-dt * 9.5);
      smoothSepRef.current += (targetSepRef.current - smoothSepRef.current) * smoothingFactor;

      const currentSep = smoothSepRef.current;
      const spread = Math.max(0, Math.min(1, currentSep / 100)); // 1 = Exploded, 0 = Assembled
      const combineProgress = 1 - spread;
      const stageWidth = stageRef.current?.clientWidth || 1000;

      // 1. Glide all 7 watch component layers smoothly along the horizontal axis
      for (let idx = 0; idx < SLICE_CONFIGS.length; idx++) {
        const el = sliceRefs.current[idx];
        if (!el) continue;
        const slice = SLICE_CONFIGS[idx];
        const deltaPx = (slice.combineDeltaPercent / 100) * stageWidth * combineProgress;
        const scale = slice.id === 4 ? 1 : 1 - combineProgress * 0.04;
        el.style.transform = `translate3d(${deltaPx.toFixed(2)}px, 0, 0) scale(${scale.toFixed(4)})`;
      }

      // 2. Smoothly cross-dissolve into the Real Assembled Watch as parts converge into the central 316L case
      const morphT = Math.max(0, Math.min(1, (combineProgress - 0.35) / 0.62));
      const smoothMorph = easeInOutCubic(morphT);

      if (assembledWatchOverlayRef.current) {
        const scale = 0.96 + 0.04 * smoothMorph;
        assembledWatchOverlayRef.current.style.opacity = smoothMorph.toFixed(4);
        assembledWatchOverlayRef.current.style.transform = `scale(${scale.toFixed(4)})`;
      }

      if (slicesContainerRef.current) {
        const slicesAlpha = 1 - smoothMorph * 0.92;
        slicesContainerRef.current.style.opacity = slicesAlpha.toFixed(4);
      }

      if (microDetailsRef.current) {
        const detailsAlpha = 0.35 + 0.65 * spread;
        microDetailsRef.current.style.opacity = detailsAlpha.toFixed(4);
      }

      // 3. Smoothly glide and fade the 4 floating callout badges
      if (calloutGroupRef.current) {
        const calloutAlpha = easeInOutCubic(Math.max(0, Math.min(1, (spread - 0.15) / 0.55)));
        calloutGroupRef.current.style.opacity = calloutAlpha.toFixed(4);
      }

      const c0 = calloutRefs.current[0];
      if (c0) {
        c0.style.transform = `translate3d(${(-75 - spread * 170).toFixed(2)}px, ${(-140 - spread * 12).toFixed(2)}px, 0)`;
      }
      const c1 = calloutRefs.current[1];
      if (c1) {
        c1.style.transform = `translate3d(${(-35 - spread * 65).toFixed(2)}px, ${(145 + spread * 10).toFixed(2)}px, 0)`;
      }
      const c2 = calloutRefs.current[2];
      if (c2) {
        c2.style.transform = `translate3d(${(55 + spread * 95).toFixed(2)}px, ${(-140 - spread * 12).toFixed(2)}px, 0)`;
      }
      const c3 = calloutRefs.current[3];
      if (c3) {
        c3.style.transform = `translate3d(${(90 + spread * 155).toFixed(2)}px, ${(142 + spread * 12).toFixed(2)}px, 0)`;
      }

      // 4. Update slider thumb and percentage counter directly in DOM at 60fps
      const rounded = Math.round(currentSep);
      if (sliderRef.current && document.activeElement !== sliderRef.current) {
        sliderRef.current.value = String(rounded);
      }
      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${rounded}%`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [autoMotion, reducedMotion]);

  return (
    <div className="relative w-full rounded-xl border border-slate-800/90 bg-[#040914] overflow-hidden select-none shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
      {/* Stage: Exploded Reference Image with All Minute Details <-> Assembled Real Watch */}
      <div
        ref={stageRef}
        className="relative aspect-[16/9] max-h-[540px] w-full overflow-hidden bg-[#040914]"
      >
        {/* Static Studio Environment from Reference Image (Top Blueprint Wall & Bottom Glowing Cyan Ledge) */}
        <img
          src={REFERENCE_EXPLODED_IMAGE}
          alt="AURA SWISS Blueprint Backdrop"
          referrerPolicy="no-referrer"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 17%, rgba(4, 10, 22, 0.92) 31%, rgba(4, 10, 22, 0.94) 67%, transparent 81%, transparent 100%)',
          }}
        />

        {/* Blueprint & Horological Minute Details Vector Overlay */}
        <svg
          ref={microDetailsRef}
          viewBox="0 0 1600 900"
          className="pointer-events-none absolute inset-0 w-full h-full z-[12]"
          style={{ willChange: 'opacity' }}
        >
          {/* Beveled Outer Technical Blueprint Frame Lines */}
          <path
            d="M 140 50 L 540 50 L 580 90 L 1360 90 L 1360 580"
            fill="none"
            stroke="rgba(56, 189, 248, 0.22)"
            strokeWidth="1.5"
          />
          <path
            d="M 140 50 L 140 680 L 1360 560"
            fill="none"
            stroke="rgba(56, 189, 248, 0.16)"
            strokeWidth="1.2"
          />

          {/* Left Blueprint Compartment: Circular Target & Escapement Schematic with 'AURA' */}
          <g transform="translate(340, 235)" opacity="0.28">
            <circle cx="0" cy="0" r="125" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="95" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            <circle
              cx="0"
              cy="0"
              r="62"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="6 4"
            />
            <line x1="-145" y1="0" x2="145" y2="0" stroke="#38bdf8" strokeWidth="1" />
            <line x1="0" y1="-145" x2="0" y2="145" stroke="#38bdf8" strokeWidth="1" />
            <line x1="-45" y1="-15" x2="35" y2="-65" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="35" cy="-65" r="8" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
            <text
              x="0"
              y="54"
              textAnchor="middle"
              fill="#38bdf8"
              fontSize="24"
              fontFamily="Cinzel, sans-serif"
              letterSpacing="6"
            >
              AURA
            </text>
          </g>

          {/* Center Blueprint Compartment: Large 'AURA' Header Above Watch Case */}
          <g transform="translate(800, 195)" opacity="0.32">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="#7dd3fc"
              fontSize="58"
              fontWeight="600"
              fontFamily="Cinzel, sans-serif"
              letterSpacing="10"
            >
              AURA
            </text>
            <line x1="-180" y1="22" x2="180" y2="22" stroke="#38bdf8" strokeWidth="1" />
          </g>

          {/* Right Blueprint Compartment: Gear Train Schematic & 'AURA SWISS' */}
          <g transform="translate(1160, 190)" opacity="0.25">
            <text
              x="120"
              y="-105"
              textAnchor="end"
              fill="#38bdf8"
              fontSize="16"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="4"
            >
              AURA SWISS
            </text>
            <circle cx="0" cy="0" r="68" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
            <circle cx="82" cy="42" r="46" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="-55" cy="65" r="34" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
          </g>

          {/* Horizontal Glowing Cyan Optical Laser Axis Beams */}
          <line
            x1="280"
            y1="460"
            x2="840"
            y2="460"
            stroke="rgba(56, 189, 248, 0.65)"
            strokeWidth="2.5"
          />
          <line
            x1="390"
            y1="325"
            x2="530"
            y2="325"
            stroke="rgba(125, 211, 252, 0.8)"
            strokeWidth="3"
          />

          {/* Bottom-Right 4-Pointed Diamond Sparkle Watermark & Corner Tech Lines */}
          <g transform="translate(1485, 795)">
            <path
              d="M -220 95 L -120 15 L 80 15"
              fill="none"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="1.2"
            />
            <path
              d="M 0 -28 C 4 -7 7 -4 28 0 C 7 4 4 7 0 28 C -4 7 -7 4 -28 0 C -7 -4 -4 -7 0 -28 Z"
              fill="rgba(148, 163, 184, 0.65)"
            />
          </g>
        </svg>

        {/* 7 Smoothly Gliding Watch Component Layers from the Reference Image */}
        <div
          ref={slicesContainerRef}
          className="absolute inset-0 z-[20]"
          style={{ willChange: 'opacity' }}
        >
          {SLICE_CONFIGS.map((slice, idx) => {
            const feather = 2.8;
            const leftStart = Math.max(0, slice.startX - feather);
            const leftFull = slice.startX === 0 ? 0 : slice.startX + feather;
            const rightFull = slice.endX === 100 ? 100 : slice.endX - feather;
            const rightEnd = Math.min(100, slice.endX + feather);

            const horizontalMask =
              slice.startX === 0
                ? `linear-gradient(to right, #000 0%, #000 ${rightFull}%, transparent ${rightEnd}%)`
                : slice.endX === 100
                ? `linear-gradient(to right, transparent ${leftStart}%, #000 ${leftFull}%, #000 100%)`
                : `linear-gradient(to right, transparent ${leftStart}%, #000 ${leftFull}%, #000 ${rightFull}%, transparent ${rightEnd}%)`;

            return (
              <div
                key={slice.id}
                ref={(el) => {
                  sliceRefs.current[idx] = el;
                }}
                onClick={() => setActiveLayerId(slice.id)}
                title={slice.label}
                style={{
                  zIndex: activeLayerId === slice.id ? 82 : slice.zIndex,
                  willChange: 'transform',
                  WebkitMaskImage: horizontalMask,
                  maskImage: horizontalMask,
                }}
                className="absolute inset-0 cursor-pointer"
              >
                <img
                  src={REFERENCE_EXPLODED_IMAGE}
                  alt={slice.label}
                  referrerPolicy="no-referrer"
                  className="pointer-events-none w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </div>

        {/* Fully Assembled Real AURA Watch (Smoothly cross-dissolves in as parts combine at 0%) */}
        <img
          ref={assembledWatchOverlayRef}
          src={ASSEMBLED_REAL_WATCH_IMAGE}
          alt="AURA SWISS Fully Assembled Timepiece"
          referrerPolicy="no-referrer"
          style={{ willChange: 'opacity, transform', opacity: 0 }}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center z-[85]"
        />

        {/* 4 Floating Callout Badges */}
        <div
          ref={calloutGroupRef}
          style={{ willChange: 'opacity' }}
          className="pointer-events-auto absolute inset-0 max-w-5xl mx-auto z-[95]"
        >
          <button
            ref={(el) => {
              calloutRefs.current[0] = el;
            }}
            type="button"
            onClick={() => setActiveLayerId(1)}
            style={{ willChange: 'transform' }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono-tech transition-colors whitespace-nowrap ${
              activeLayerId === 1
                ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-[#071020]/90 border-slate-700/80 text-slate-200 hover:border-sky-400/60'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-semibold">
              01
            </span>
            <span>Titanium GR-5 Screws (6x)</span>
          </button>

          <button
            ref={(el) => {
              calloutRefs.current[1] = el;
            }}
            type="button"
            onClick={() => setActiveLayerId(4)}
            style={{ willChange: 'transform' }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono-tech transition-colors whitespace-nowrap ${
              activeLayerId === 4
                ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-[#071020]/90 border-slate-700/80 text-slate-200 hover:border-sky-400/60'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-semibold">
              04
            </span>
            <span>316L Monobloc Case</span>
          </button>

          <button
            ref={(el) => {
              calloutRefs.current[2] = el;
            }}
            type="button"
            onClick={() => setActiveLayerId(5)}
            style={{ willChange: 'transform' }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono-tech transition-colors whitespace-nowrap ${
              activeLayerId === 5
                ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-[#071020]/90 border-slate-700/80 text-slate-200 hover:border-sky-400/60'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-semibold">
              05
            </span>
            <span>Calibre 10 Movement</span>
          </button>

          <button
            ref={(el) => {
              calloutRefs.current[3] = el;
            }}
            type="button"
            onClick={() => setActiveLayerId(7)}
            style={{ willChange: 'transform' }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono-tech transition-colors whitespace-nowrap ${
              activeLayerId === 7
                ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'bg-[#071020]/90 border-slate-700/80 text-slate-200 hover:border-sky-400/60'
            }`}
          >
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-semibold">
              07
            </span>
            <span>Exhibition Sapphire &amp; Ceramic Bearings</span>
          </button>
        </div>
      </div>

      {/* Bottom Control Bar Inside Deconstruction Viewport */}
      <div className="border-t border-slate-800/90 bg-[#050A14]/95 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-xs font-mono-tech">
          <Sliders className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-300">Assembly Separation:</span>
          <span ref={percentTextRef} className="text-sky-400 font-semibold w-9">
            {separation}%
          </span>
        </div>

        <div className="flex-1 max-w-md flex items-center gap-3">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500">
            ASSEMBLED
          </span>
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={100}
            defaultValue={separation}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (setAutoMotion) setAutoMotion(false);
              targetSepRef.current = val;
              setSeparation(val);
            }}
            aria-label="Assembly Separation Percentage"
            className="aura-slider w-full"
          />
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-500">
            EXPLODED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIs3DLocked((prev) => !prev)}
            className={`px-3 py-1.5 rounded text-[11px] font-mono-tech uppercase tracking-wider border transition-colors whitespace-nowrap ${
              is3DLocked
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            3D LOCK
          </button>
          <button
            type="button"
            onClick={() => {
              if (setAutoMotion) setAutoMotion(false);
              targetSepRef.current = 100;
              setSeparation(100);
            }}
            className={`px-3 py-1.5 rounded text-[11px] font-mono-tech uppercase tracking-wider border transition-colors whitespace-nowrap ${
              separation === 100 && !autoMotion
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-sky-400/60 hover:text-sky-300'
            }`}
          >
            100% DECONSTRUCT
          </button>
        </div>
      </div>
    </div>
  );
};
