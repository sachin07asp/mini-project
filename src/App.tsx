/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Layers,
  Gauge,
  Shield,
  Droplets,
  Sun,
  Sparkles,
  Award,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  User,
  Mail,
  ShieldCheck,
  Eye,
  X,
  CheckCircle2,
} from 'lucide-react';
import { ExplodedWatchVisualizer, WATCH_LAYERS } from './components/ExplodedWatchVisualizer';
import { ClockCursor } from './components/ClockCursor';
import explodedWatchHeroImg from './assets/images/exploded_watch_hero_1791437510674.jpg';
import watchBelmontCarreImg from './assets/images/watch_belmont_carre_1791437532656.jpg';
import watchSteinachChronoImg from './assets/images/watch_steinach_chrono_1791437543895.jpg';
import watchCalibreDiverImg from './assets/images/watch_calibre_diver_1791437558005.jpg';
import watchSarnenGmtImg from './assets/images/watch_sarnen_gmt_1791437574187.jpg';
import atelierWatchmakerImg from './assets/images/atelier_watchmaker_1791437586375.jpg';

interface EngineeringSpec {
  id: string;
  specNumber: string;
  metricValue: string;
  metricUnit: string;
  kicker: string;
  title: string;
  description: string;
  dossierDetails: string;
  toleranceBench: string;
  icon: 'gauge' | 'shield' | 'droplets' | 'sun' | 'sparkles' | 'award';
}

const ENGINEERING_SPECS: EngineeringSpec[] = [
  {
    id: 'calibre-10',
    specNumber: '01 / 06',
    metricValue: '28,800',
    metricUnit: 'vph',
    kicker: 'CHRONOMETRIC PRECISION',
    title: 'CALIBRE 10 IN-HOUSE ENGINE',
    description:
      'Engineered entirely in La Chaux-de-Fonds. 240 components oscillating at 4 Hz with a Glucydur balance wheel.',
    dossierDetails:
      'Regulated across 5 spatial positions with variable-inertia gold timing screws. Twin series-coupled mainspring barrels deliver linear torque across 70 hours of autonomy.',
    toleranceBench: 'COSC + Internal ±2 sec/day',
    icon: 'gauge',
  },
  {
    id: 'oystersteel-316l',
    specNumber: '02 / 06',
    metricValue: '316L',
    metricUnit: 'grade',
    kicker: 'MATERIAL METALLURGY',
    title: 'SURGICAL OYSTERSTEEL 316L',
    description:
      'Cold-forged under 400 tons of pressure, offering supreme tensile strength and corrosion resistance against seawater.',
    dossierDetails:
      'Vacuum-remelted low-carbon austenitic steel alloy impervious to intergranular pitting. Hand-finished with alternating satin-brushed flats and 45-degree diamond-beveled mirror chamfers.',
    toleranceBench: 'Vickers Hardness 215 HV',
    icon: 'shield',
  },
  {
    id: 'hermetic-seal',
    specNumber: '03 / 06',
    metricValue: '30',
    metricUnit: 'bar',
    kicker: 'OCEANIC ENDURANCE',
    title: '300-METER HERMETIC SEAL',
    description:
      'Triple gasket O-ring crown system with helium relief pressure valve, vacuum-tested in pressure tanks.',
    dossierDetails:
      'Each middle case undergoes dry barometric compression and wet hyperbaric immersion testing to 37.5 Bar (125% safety margin under ISO 6425 protocol).',
    toleranceBench: 'ISO 6425 Certified',
    icon: 'droplets',
  },
  {
    id: 'luminova-bgw9',
    specNumber: '04 / 06',
    metricValue: '8',
    metricUnit: 'hrs glow',
    kicker: 'DEEP-OCEAN LEGIBILITY',
    title: 'SUPER-LUMINOVA BGW9',
    description:
      'High-intensity photoluminescent compound radiating bright cyan-blue glow for up to 8 continuous nocturnal hours.',
    dossierDetails:
      'Non-radioactive strontium aluminate pigment hand-inlaid into recessed rhodium-plated indices and skeletonized hands for zero-light abyssal readability.',
    toleranceBench: '485nm Cyan Spectral Peak',
    icon: 'sun',
  },
  {
    id: 'sapphire-crystal',
    specNumber: '05 / 06',
    metricValue: '9',
    metricUnit: 'Mohs',
    kicker: 'OPTICAL PURITY',
    title: 'ANTI-REFLECTIVE SAPPHIRE',
    description:
      'Diamond-hard corundum crystal polished with micron diamond paste and five internal anti-glare vapor layers.',
    dossierDetails:
      'Grown via the Verneuil flame-fusion method at 2,050°C and CNC-ground to a 2.8mm box dome, achieving 99.4% light transmission without distortion.',
    toleranceBench: '99.4% Optical Transmission',
    icon: 'sparkles',
  },
  {
    id: 'atelier-guarantee',
    specNumber: '06 / 06',
    metricValue: '10',
    metricUnit: 'years',
    kicker: 'LIFETIME RESPONSIBILITY',
    title: 'DECENNIAL ATELIER GUARANTEE',
    description:
      'Every timepiece comes backed by a 10-year comprehensive service warranty and digital blockchain certificate.',
    dossierDetails:
      'Includes complimentary ultrasonic case refurbishment, gasket replacement, and chronometric recalibration at our La Chaux-de-Fonds bench.',
    toleranceBench: 'Cryptographic Serial Ledger',
    icon: 'award',
  },
];

interface TimepieceItem {
  id: string;
  name: string;
  refCode: string;
  collectionTag: string;
  category: 'Diver 300M' | 'Chronograph' | 'Haute Skeleton';
  status: 'AVAILABLE' | 'LAST ONES' | 'ON INQUIRY';
  statusColor: 'emerald' | 'amber' | 'sky';
  image: string;
  description: string;
  dimensions: string;
  waterResistance: string;
  powerReserve: string;
  price: string;
  calibre: string;
  caseMaterial: string;
}

const TIMEPIECES: TimepieceItem[] = [
  {
    id: 'belmont',
    name: 'AURA BELMONT',
    refCode: 'REF. BL-408',
    collectionTag: 'CARRÉ SKELETON • REF. BL-408',
    category: 'Haute Skeleton',
    status: 'AVAILABLE',
    statusColor: 'emerald',
    image: watchBelmontCarreImg,
    description:
      'Architectural geometry meeting haute horlogerie skeleton bridges. Polishedchamfers frame a suspended rectangular gear train.',
    dimensions: '38.5 x 29.5 mm',
    waterResistance: '50m / 165ft',
    powerReserve: '72 Hours',
    price: '₹8,00,000',
    calibre: 'Calibre 10-CS Manual Architectural Skeleton',
    caseMaterial: '316L Surgical Steel with Integrated Link Bracelet',
  },
  {
    id: 'steinach',
    name: 'AURA STEINACH',
    refCode: 'REF. ST-2709',
    collectionTag: 'PAVILLON CHRONOGRAPH • REF. ST-2709',
    category: 'Chronograph',
    status: 'LAST ONES',
    statusColor: 'amber',
    image: watchSteinachChronoImg,
    description:
      'Warm rose-gold case upon charcoal sunray finish with column-wheel clutch and flyback chronograph complication.',
    dimensions: '41.0 mm',
    waterResistance: '100m / 330ft',
    powerReserve: '65 Hours',
    price: '₹8,20,000',
    calibre: 'Calibre 10-CH Column-Wheel Flyback Chronograph',
    caseMaterial: '18K 5N Rose Gold & Hand-Stitched Alligator Strap',
  },
  {
    id: 'calibre-diver',
    name: 'AURA CALIBRE 10 DIVER',
    refCode: 'REF. CV-1002',
    collectionTag: 'SEALED OCEAN MASTER • REF. CV-1002',
    category: 'Diver 300M',
    status: 'AVAILABLE',
    statusColor: 'emerald',
    image: watchCalibreDiverImg,
    description:
      'The definitive deep-sea instrument. 120-click ceramic dive bezel, hermetic helium valve, and abyssal blue sunray dial.',
    dimensions: '40.5 mm',
    waterResistance: '300m / 1000ft',
    powerReserve: '70 Hours',
    price: '₹7,15,000',
    calibre: 'Calibre 10 Automatic Bi-Directional Chronometer',
    caseMaterial: 'Cold-Forged 316L Monobloc Steel & Ceramic Bezel',
  },
  {
    id: 'sarnen',
    name: 'AURA SARNEN',
    refCode: 'REF. SR-5511',
    collectionTag: 'OVERLAND GMT • REF. SR-5511',
    category: 'Haute Skeleton',
    status: 'ON INQUIRY',
    statusColor: 'sky',
    image: watchSarnenGmtImg,
    description:
      'Dual timezone tracking with integrated 24-hour chapter ring and skeletonized gold bridge architecture.',
    dimensions: '40.0 mm',
    waterResistance: '200m / 660ft',
    powerReserve: '70 Hours',
    price: '₹10,35,000',
    calibre: 'Calibre 10-GMT Dual-Timezone Openworked',
    caseMaterial: 'Grade 5 Titanium & 18K Gold Bezel Architecture',
  },
];

const ATELIER_PILLARS = [
  {
    number: '01',
    title: 'Hand-Anglage & Black Polish',
    badge: '0.45 mm chamfer width',
    description:
      'Every steel bridge is beveled by hand with diamond-impregnated boxwood pegs to create a flawless 45-degree mirror sheen.',
  },
  {
    number: '02',
    title: 'Thermal & Positional Regulation',
    badge: 'Surpassing COSC benchmarks',
    description:
      'Adjusted across five spatial orientations and three thermal chambers (4°C, 20°C, 38°C) for 360 continuous hours to ensure -1/+2 sec/day isochronism.',
  },
  {
    number: '03',
    title: 'Paramagnetic Hairspring',
    badge: '15x shock resilience',
    description:
      'Free-sprung Niobium-Zirconium balance spring unaffected by magnetic fields up to 15,000 Gauss and protected by twin Incabloc shock absorbers.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      '"The architectural depth of the Calibre 10 movement rivals pieces four times its price. The separation of the bridges gives an astonishing play of light on the wrist."',
    author: 'Marc-André Laurent',
    role: 'Senior Horology Editor, ChronoStyle • Geneva, Switzerland',
    reference: 'AURA Belmont Ref. BL-408',
  },
  {
    quote:
      '"After six months of saturation diving testing in the North Sea, my Calibre 10 Diver has maintained a deviation of +0.8 seconds per day. Uncompromising Swiss tool watchmaking."',
    author: 'Dr. Henrik Lindqvist',
    role: 'Subsea Oceanographer & Collector • Zurich, Switzerland',
    reference: 'AURA Calibre 10 Diver Ref. CV-1002',
  },
  {
    quote:
      '"Visiting the La Chaux-de-Fonds bench to watch my Master Chronometer rotor being hand-chased was unforgettable. True independent horology with zero industrial shortcuts."',
    author: 'Lord Julian Vance-Sterling',
    role: 'Patron of Independent Watchmaking • London, United Kingdom',
    reference: 'AURA Sarnen GMT Ref. SR-5511',
  },
];

const FAQ_ITEMS = [
  {
    category: 'Craftsmanship',
    question: 'How is the Calibre 10 movement regulated and tested?',
    answer:
      'Every Calibre 10 movement undergoes 15 days of continuous chronometer testing across 5 spatial positions and 3 distinct temperatures (4°C, 20°C, and 38°C). Our internal benchmark requires an average daily rate within -2/+2 seconds, surpassing standard Swiss COSC criteria.',
  },
  {
    category: 'Water Resistance',
    question: 'Can the watch be worn for deep scuba diving and salt water sports?',
    answer:
      'Yes. The Calibre 10 Diver is engineered to ISO 6425 professional diving standards and pressure-tested to 30 Bar (300 meters / 1,000 feet), featuring a triple-gasket Triplock screw-down crown and surgical 316L steel impervious to marine salinity.',
  },
  {
    category: 'Ordering & Delivery',
    question: 'How does the reservation deposit and delivery process work?',
    answer:
      'Collectors may secure their serial number either with a 20% refundable atelier deposit or via Full Atelier Pre-Order (which confers a 20% manufacture advantage). Every watch is shipped fully insured via Malca-Amit armored vault courier with a 14-day inspection window.',
  },
  {
    category: 'Servicing & Warranty',
    question: 'What is included in the 10-Year Decennial Atelier Guarantee?',
    answer:
      'Our 10-Year Decennial Guarantee covers all mechanical components, escapement regulation, waterproofness resealing, and includes your first complete maintenance overhaul at our La Chaux-de-Fonds manufacture free of charge.',
  },
  {
    category: 'Maintenance',
    question: 'How often does a mechanical automatic movement require servicing?',
    answer:
      'Thanks to unlubricated ceramic rotor bearings and synthetic Moebius epilame lubricants, the Calibre 10 requires a full mechanical service only once every 7 to 10 years, alongside a quick pressure seal check every 3 years if used for scuba diving.',
  },
];

export default function App() {
  // Navigation & Global UI Controls
  const [activeNav, setActiveNav] = useState<string>('ARCHITECTURE');
  const [clockCursorEnabled, setClockCursorEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Hero & Chapter 01 Deconstruction States
  const [heroSeparation, setHeroSeparation] = useState<number>(0);
  const [separation, setSeparation] = useState<number>(85);
  const [activeLayerId, setActiveLayerId] = useState<number>(5);
  const [autoMotion, setAutoMotion] = useState<boolean>(true);
  const [is3DLocked, setIs3DLocked] = useState<boolean>(false);

  // Chapter 02 Engineering Dossier expansion state
  const [expandedDossierId, setExpandedDossierId] = useState<string | null>(null);

  // Chapter 03 Timepiece Filter & Quick Inspect Modal
  const [selectedFilter, setSelectedFilter] = useState<string>('All References');
  const [inspectedTimepiece, setInspectedTimepiece] = useState<TimepieceItem | null>(null);

  // Chapter 04 Atelier Accordion
  const [activeAtelierIndex, setActiveAtelierIndex] = useState<number>(0);

  // Chapter 05 Commission Pricing Mode ('deposit' = 20% Initial Deposit, 'full' = Full Atelier Pre-Order Save 20%)
  const [pricingMode, setPricingMode] = useState<'deposit' | 'full'>('full');

  // Collector Registry Testimonial Carousel
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  // Direct Atelier Allocation Form State
  const [collectorName, setCollectorName] = useState<string>('');
  const [collectorEmail, setCollectorEmail] = useState<string>('');
  const [preferredReference, setPreferredReference] = useState<string>(
    'AURA Calibre 10 Diver (300M)'
  );
  const [deliveryRegion, setDeliveryRegion] = useState<string>('Europe & Switzerland');
  const [allocationSubmitted, setAllocationSubmitted] = useState<{
    serial: string;
    name: string;
    reference: string;
    region: string;
  } | null>(null);

  // Active section scroll spy
  useEffect(() => {
    const sections = [
      { id: 'architecture', label: 'ARCHITECTURE' },
      { id: 'engineering', label: 'ENGINEERING' },
      { id: 'timepieces', label: 'TIMEPIECES' },
      { id: 'atelier', label: 'ATELIER' },
      { id: 'editions', label: 'EDITIONS' },
      { id: 'faq', label: 'FAQ' },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sections[i].label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLayer =
    WATCH_LAYERS.find((layer) => layer.id === activeLayerId) || WATCH_LAYERS[4];

  const filteredTimepieces =
    selectedFilter === 'All References'
      ? TIMEPIECES
      : TIMEPIECES.filter((item) => item.category === selectedFilter);

  const scrollToAllocation = (referenceLabel?: string) => {
    if (referenceLabel) {
      setPreferredReference(referenceLabel);
    }
    const el = document.getElementById('allocation-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAllocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSerial = `CH-2026-${Math.floor(100 + Math.random() * 899)}`;
    setAllocationSubmitted({
      serial: randomSerial,
      name: collectorName.trim() || 'Distinguished Patron',
      reference: preferredReference,
      region: deliveryRegion,
    });
  };

  const renderSpecIcon = (icon: EngineeringSpec['icon']) => {
    switch (icon) {
      case 'gauge':
        return <Gauge className="w-4 h-4 text-sky-400" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-sky-400" />;
      case 'droplets':
        return <Droplets className="w-4 h-4 text-sky-400" />;
      case 'sun':
        return <Sun className="w-4 h-4 text-sky-400" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-sky-400" />;
      case 'award':
        return <Award className="w-4 h-4 text-sky-400" />;
    }
  };

  const heroActiveLayerLabel =
    heroSeparation < 15
      ? 'Parts Locked into 316L Monobloc Middle Case'
      : heroSeparation < 50
      ? 'Sapphire & Dial Assembly Separating (40.5mm Axis)'
      : heroSeparation < 85
      ? 'Calibre 10 Twin-Barrel Movement & Glucydur Balance Exposed'
      : 'Full 240-Component Horological Deconstruction Engaged';

  return (
    <div
      className={`min-h-screen bg-[#050911] text-slate-100 relative ${
        clockCursorEnabled ? 'clock-cursor-active' : ''
      }`}
    >
      {/* Live Mechanical Watch Cursor */}
      <ClockCursor enabled={clockCursorEnabled} />

      {/* =====================================================================
          STICKY TOP BAR NAVIGATION (Matches 00:00 - 00:30)
      ===================================================================== */}
      <header className="sticky top-0 z-50 h-16 border-b border-slate-800/80 bg-[#050911]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Lockup */}
          <a
            href="#"
            className="flex items-baseline gap-2 shrink-0 focus:outline-none"
          >
            <span className="font-display-luxury text-xl sm:text-2xl font-semibold tracking-[0.22em] text-white">
              AURA
            </span>
            <span className="font-mono-tech text-[10px] tracking-[0.25em] text-slate-400 uppercase">
              SWISS
            </span>
          </a>

          {/* Primary Nav Links */}
          <nav className="hidden lg:flex items-center h-full gap-7">
            {[
              { label: 'ARCHITECTURE', href: '#architecture' },
              { label: 'ENGINEERING', href: '#engineering' },
              { label: 'TIMEPIECES', href: '#timepieces' },
              { label: 'ATELIER', href: '#atelier' },
              { label: 'EDITIONS', href: '#editions' },
              { label: 'FAQ', href: '#faq' },
            ].map((item) => {
              const isActive = activeNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveNav(item.label)}
                  className={`relative h-full flex items-center text-[11px] font-mono-tech tracking-[0.18em] uppercase transition-colors whitespace-nowrap ${
                    isActive ? 'text-sky-400 font-medium' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Utility Controls & CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setClockCursorEnabled((prev) => !prev)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-[10px] font-mono-tech tracking-widest uppercase transition-all whitespace-nowrap ${
                clockCursorEnabled
                  ? 'border-sky-500/60 bg-sky-500/10 text-sky-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="w-3 h-3 text-sky-400" />
              <span>CLOCK CURSOR</span>
            </button>

            <button
              type="button"
              onClick={() => setReducedMotion((prev) => !prev)}
              className="hidden md:inline-flex items-center px-3 py-1.5 rounded border border-slate-800 bg-slate-900/60 text-[10px] font-mono-tech tracking-widest uppercase text-slate-300 hover:border-slate-700 hover:text-white transition-colors whitespace-nowrap"
            >
              MOTION: {reducedMotion ? 'REDUCED' : 'FULL'}
            </button>

            <button
              type="button"
              onClick={() => scrollToAllocation()}
              className="px-4 py-2 rounded bg-[#38BDF8] hover:bg-sky-300 text-[#040811] text-[11px] font-mono-tech font-semibold tracking-[0.14em] uppercase transition-colors shadow-[0_0_20px_rgba(56,189,248,0.35)] whitespace-nowrap"
            >
              RESERVE TIMEPIECE
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO STAGE + ACTIVE LAYER CONTROL BAR + 5-METRIC BAR (00:00 - 00:02)
      ===================================================================== */}
      <section className="relative pt-4 pb-8 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Exploded Macro Hero Frame */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-[#070E1B] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
            <div className="relative h-[340px] sm:h-[420px] md:h-[460px] w-full overflow-hidden bg-[#050B16]">
              <img
                src={explodedWatchHeroImg}
                alt="AURA SWISS Calibre 10 Exploded Horological Architecture"
                referrerPolicy="no-referrer"
                style={{
                  transform: `scale(${1 + heroSeparation * 0.0014}) translateX(${
                    (heroSeparation - 30) * 0.15
                  }px)`,
                  filter: `brightness(${0.92 + heroSeparation * 0.002}) contrast(${
                    1.04 + heroSeparation * 0.001
                  })`,
                  transition: 'transform 150ms ease-out, filter 150ms ease-out',
                }}
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle Edge Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050911] via-transparent to-[#050911]/50" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050911]/65 via-transparent to-[#050911]/65" />
            </div>

            {/* Bottom Interactive Bar on Hero (Exact match to 00:00) */}
            <div className="px-4 sm:px-6 pb-5 pt-2 bg-[#050911]">
              <div className="rounded-lg border border-slate-800/90 bg-[#080F1E]/95 px-4 sm:px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs font-mono-tech">
                  <span className="text-sky-400 font-medium">Active Layer: </span>
                  <span className="text-slate-200">{heroActiveLayerLabel}</span>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 whitespace-nowrap">
                    ASSEMBLY SEPARATION:
                  </span>
                  <div className="w-36 sm:w-44 flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={heroSeparation}
                      onChange={(e) => setHeroSeparation(Number(e.target.value))}
                      aria-label="Hero Assembly Separation"
                      className="aura-slider w-full"
                    />
                  </div>
                  <span className="text-xs font-mono-tech font-semibold text-sky-400 w-9 text-right">
                    {heroSeparation}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Column Horological Spec Bar (Matches 00:01 - 00:03) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-6 border-t border-slate-800/70">
            {/* Metric 1 */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono-tech tracking-tight text-white">
                240<span className="text-sky-400 text-xl align-top ml-0.5">+</span>
              </div>
              <div className="mt-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 font-semibold">
                HAND-FINISHED PARTS
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">Individually chamfered</div>
            </div>

            {/* Metric 2 */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono-tech tracking-tight text-white">
                28,800<span className="text-sky-400 text-lg ml-0.5">VPH</span>
              </div>
              <div className="mt-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 font-semibold">
                BALANCE FREQUENCY
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">4 Hz chronometer cadence</div>
            </div>

            {/* Metric 3 */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono-tech tracking-tight text-white">
                70<span className="text-sky-400 text-lg ml-1">Hours</span>
              </div>
              <div className="mt-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 font-semibold">
                AUTONOMOUS RESERVE
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">Dual-barrel system</div>
            </div>

            {/* Metric 4 */}
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono-tech tracking-tight text-white">
                300<span className="text-sky-400 text-lg ml-1">Meters</span>
              </div>
              <div className="mt-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 font-semibold">
                HYDROSTATIC RATING
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">Sealed Triplock crown</div>
            </div>

            {/* Metric 5 */}
            <div className="col-span-2 sm:col-span-1 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono-tech tracking-tight text-white">
                <span className="text-sky-400">±</span>2<span className="text-sky-400 text-lg ml-1">sec/day</span>
              </div>
              <div className="mt-1 text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 font-semibold">
                RATE ACCURACY
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">Surpasses COSC standard</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 01 ARCHITECTURE: INTERACTIVE DECONSTRUCTION (00:03 - 00:06)
      ===================================================================== */}
      <section id="architecture" className="py-20 border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-sky-400 mb-2">
                INTERACTIVE DECONSTRUCTION • CHAPTER 01 ARCHITECTURE
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold tracking-wide text-white uppercase">
                EVERY LAYER, DELIBERATE.
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setAutoMotion(false);
                  setSeparation((prev) => (prev > 15 ? 0 : 65));
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-slate-700/90 bg-[#0B1324] hover:border-sky-400/60 text-xs font-mono-tech uppercase tracking-wider text-slate-200 transition-colors whitespace-nowrap"
              >
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>{separation > 15 ? 'COMBINE WATCH' : 'EXPLODE WATCH'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoMotion((prev) => !prev)}
                className={`px-3.5 py-2 rounded border text-xs font-mono-tech uppercase tracking-wider transition-colors whitespace-nowrap ${
                  autoMotion
                    ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-[0_0_16px_rgba(56,189,248,0.25)]'
                    : 'border-slate-800 bg-[#09101E] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                AUTO MOTION
              </button>
            </div>
          </div>

          {/* Interactive Exploded Watch Stage */}
          <ExplodedWatchVisualizer
            separation={separation}
            setSeparation={setSeparation}
            activeLayerId={activeLayerId}
            setActiveLayerId={setActiveLayerId}
            is3DLocked={is3DLocked}
            setIs3DLocked={setIs3DLocked}
            reducedMotion={reducedMotion}
            autoMotion={autoMotion}
            setAutoMotion={setAutoMotion}
          />

          {/* Selected Layer Technical Inspector Box (Matches 00:05 - 00:06) */}
          <div className="mt-5 rounded-xl border border-slate-800/90 bg-[#080F1E]/90 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
              <div className="max-w-2xl">
                <div className="text-[11px] font-mono-tech uppercase tracking-[0.18em] text-sky-400 mb-1.5">
                  {currentLayer.chapterKicker} • TOLERANCE: {currentLayer.tolerance}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {currentLayer.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {currentLayer.description}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 shrink-0">
                <div className="px-3.5 py-2 rounded border border-slate-800 bg-[#050A14] text-xs font-mono-tech">
                  <span className="text-slate-500">Material: </span>
                  <span className="text-sky-300">{currentLayer.material}</span>
                </div>
                <div className="px-3.5 py-2 rounded border border-slate-800 bg-[#050A14] text-xs font-mono-tech self-start lg:self-end">
                  <span className="text-slate-500">Hydrostatic: </span>
                  <span className="text-sky-300">{currentLayer.hydrostatic}</span>
                </div>
              </div>
            </div>

            {/* INSPECT PART Selector Pills (Matches 00:06) */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.16em] text-slate-500 mr-2">
                INSPECT PART:
              </span>
              {WATCH_LAYERS.map((layer) => {
                const isSelected = layer.id === activeLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => {
                      setActiveLayerId(layer.id);
                      if (separation < 35) setSeparation(65);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono-tech border transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-medium shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                        : 'bg-[#050A14] border-slate-800/90 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {layer.shortTab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 02 ENGINEERING TENETS: CONSTRUCTED FOR THE EXTREMES (00:07 - 00:10)
      ===================================================================== */}
      <section id="engineering" className="py-24 border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-sky-400 mb-3">
              ENGINEERING TENETS • CHAPTER 02
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold tracking-wide text-white uppercase leading-tight">
              CONSTRUCTED FOR THE EXTREMES
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              From the sub-zero depths of alpine glaciers to deep ocean trenches, each
              constituent is manufactured to endure relentless hydrostatic stress without
              compromise.
            </p>
          </div>

          {/* 6-Card Engineering Bento Grid (3x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_SPECS.map((spec) => {
              const isExpanded = expandedDossierId === spec.id;
              return (
                <div
                  key={spec.id}
                  className="rounded-xl border border-slate-800/90 bg-[#080F1E]/80 hover:border-slate-700 transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Icon Box + Large Tabular Metric */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-10 h-10 rounded-lg border border-sky-500/30 bg-sky-500/10 flex items-center justify-center">
                        {renderSpecIcon(spec.icon)}
                      </div>
                      <div className="text-right font-mono-tech">
                        <span className="text-xl sm:text-2xl font-bold text-white">
                          {spec.metricValue}
                        </span>
                        <span className="text-xs text-slate-400 ml-1">{spec.metricUnit}</span>
                      </div>
                    </div>

                    {/* Kicker & Title */}
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-sky-400 mb-1.5">
                      {spec.kicker}
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2.5">
                      {spec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {spec.description}
                    </p>

                    {/* Expandable Technical Dossier Drawer */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2 bg-[#050A14]/90 p-3.5 rounded-lg border">
                        <div className="font-mono-tech text-[10px] text-sky-400 uppercase tracking-wider">
                          BENCHMARK: {spec.toleranceBench}
                        </div>
                        <p className="leading-relaxed text-slate-300">{spec.dossierDetails}</p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-slate-500">Spec: {spec.specNumber}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedDossierId(isExpanded ? null : spec.id)
                      }
                      className="text-sky-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Dossier −' : 'Dossier +'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Certification Strip (Matches 00:09 - 00:10) */}
          <div className="mt-8 rounded-lg border border-slate-800/90 bg-[#070D19] px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono-tech">
            <div className="flex items-center gap-2.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span>
                Certified by Contrôle Officiel Suisse des Chronomètres • Ref. ISO 6425 Diver
                Standard
              </span>
            </div>
            <div className="text-sky-400">
              Internal Quality Benchmark: 100% Hermetic Yield
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE MANUFACTURE COLLECTION: FEATURED TIMEPIECES (00:10 - 00:13)
      ===================================================================== */}
      <section id="timepieces" className="py-24 border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-sky-400 mb-2">
                THE MANUFACTURE COLLECTION
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold tracking-wide text-white uppercase">
                FEATURED TIMEPIECES
              </h2>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {['All References', 'Diver 300M', 'Chronograph', 'Haute Skeleton'].map(
                (category) => {
                  const isActive = selectedFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedFilter(category)}
                      className={`px-3.5 py-2 rounded text-xs font-mono-tech border transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#38BDF8] border-[#38BDF8] text-[#050911] font-semibold shadow-[0_0_16px_rgba(56,189,248,0.3)]'
                          : 'bg-[#080F1E] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {category}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTimepieces.map((watch) => (
              <div
                key={watch.id}
                className="group rounded-xl border border-slate-800/90 bg-[#080F1E]/90 hover:border-sky-500/50 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Availability Header */}
                  <div className="px-4 py-3 flex items-center justify-end border-b border-slate-800/60">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono-tech uppercase tracking-widest">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          watch.statusColor === 'emerald'
                            ? 'bg-emerald-400'
                            : watch.statusColor === 'amber'
                            ? 'bg-amber-400'
                            : 'bg-sky-400'
                        }`}
                      />
                      <span
                        className={
                          watch.statusColor === 'emerald'
                            ? 'text-emerald-400'
                            : watch.statusColor === 'amber'
                            ? 'text-amber-400'
                            : 'text-sky-400'
                        }
                      >
                        {watch.status}
                      </span>
                    </div>
                  </div>

                  {/* Watch Image Container with Hover Inspect Button */}
                  <div className="relative h-56 w-full bg-[#050912] overflow-hidden">
                    <img
                      src={watch.image}
                      alt={watch.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080F1E] via-transparent to-transparent opacity-80" />

                    <button
                      type="button"
                      onClick={() => setInspectedTimepiece(watch)}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#050911]/90 border border-sky-400/60 text-[11px] font-mono-tech text-sky-300 shadow-lg transition-all whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Spec</span>
                    </button>
                  </div>

                  {/* Card Text Body */}
                  <div className="p-4">
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.16em] text-sky-400 mb-1">
                      {watch.collectionTag}
                    </div>
                    <h3 className="font-serif-luxury text-xl font-semibold text-white tracking-wide uppercase mb-2">
                      {watch.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {watch.description}
                    </p>

                    {/* 3-Column Micro Spec Table */}
                    <div className="grid grid-cols-3 gap-1 py-2.5 border-y border-slate-800/80 text-[10px] font-mono-tech text-slate-300">
                      <div>
                        <span className="block text-slate-500 text-[9px]">CASE</span>
                        {watch.dimensions}
                      </div>
                      <div className="border-x border-slate-800/80 px-2">
                        <span className="block text-slate-500 text-[9px]">DEPTH</span>
                        {watch.waterResistance}
                      </div>
                      <div className="pl-1">
                        <span className="block text-slate-500 text-[9px]">RESERVE</span>
                        {watch.powerReserve}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Reserve Action Footer */}
                <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2">
                  <div className="text-lg font-bold font-mono-tech text-white">
                    {watch.price}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToAllocation(`${watch.name} (${watch.refCode})`)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-900/90 hover:border-sky-400 hover:bg-sky-500/15 hover:text-sky-300 text-[11px] font-mono-tech uppercase tracking-wider text-slate-200 transition-colors whitespace-nowrap"
                  >
                    <span>RESERVE</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHAPTER 04 THE ATELIER: PRECISION IS NOT A FEATURE (00:14 - 00:17)
      ===================================================================== */}
      <section id="atelier" className="py-24 border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Master Watchmaker Editorial Portrait with Overlay Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#080F1E] shadow-2xl">
                <div className="aspect-[3/4] w-full relative">
                  <img
                    src={atelierWatchmakerImg}
                    alt="Master Watchmaker at La Chaux-de-Fonds Atelier Bench"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050911] via-[#050911]/25 to-transparent" />
                </div>

                {/* Bottom Overlay Info Bar inside Portrait */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-slate-700/80 bg-[#070E1C]/90 backdrop-blur-md p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-sky-400">
                      LA CHAUX-DE-FONDS ATELIER
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      Calibre 10 Escapement Assembly
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded border border-slate-700 bg-slate-900/90 text-[10px] font-mono-tech text-slate-300 whitespace-nowrap">
                    29 Synthetic Rubies
                  </span>
                </div>
              </div>

              {/* Floating Bottom-Left Manufacture Badge (Matches 00:16) */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-4 z-10 inline-flex items-center gap-3 px-4 py-3 rounded-lg border border-sky-500/40 bg-[#081225]/95 shadow-xl">
                <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">
                    100% Manufacture In-House
                  </div>
                  <div className="text-[10px] font-mono-tech text-slate-400">
                    Zero Third-Party Ébauches
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Prose & 3 Craftsmanship Accordions */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-sky-400 mb-3">
                CHAPTER 04 • THE ATELIER
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold tracking-wide text-white uppercase leading-[1.12] mb-6">
                PRECISION IS NOT A FEATURE. IT IS OUR FOUNDATION.
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
                In an era of mass industrial replication, each AURA timepiece is
                individually hand-assembled by a solitary master watchmaker. From bridge
                graining to balance poise, nothing leaves our bench without human
                scrutiny.
              </p>

              {/* 3 Interactive Craftsmanship Cards */}
              <div className="space-y-3.5">
                {ATELIER_PILLARS.map((pillar, idx) => {
                  const isOpen = activeAtelierIndex === idx;
                  return (
                    <div
                      key={pillar.number}
                      onClick={() => setActiveAtelierIndex(idx)}
                      className={`cursor-pointer rounded-xl border transition-all p-5 ${
                        isOpen
                          ? 'border-sky-500/60 bg-[#0A1428]/90 shadow-[0_0_25px_rgba(56,189,248,0.1)]'
                          : 'border-slate-800/90 bg-[#070D19]/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <span className="text-xs font-mono-tech font-semibold text-sky-400">
                            {pillar.number}
                          </span>
                          <h3 className="text-base font-semibold text-white">
                            {pillar.title}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono-tech text-sky-400/90 whitespace-nowrap">
                          {pillar.badge}
                        </span>
                      </div>

                      {isOpen && (
                        <p className="mt-3 pl-7 text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COMMISSION TIERS — SERIES 2026: SECURING YOUR SERIAL NUMBER (00:18 - 00:22)
      ===================================================================== */}
      <section id="editions" className="py-24 border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Header & Deposit/Full Toggle */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-sky-400 mb-3">
              COMMISSION TIERS • SERIES 2026
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-semibold tracking-wide text-white uppercase">
              SECURING YOUR SERIAL NUMBER
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Every timepiece is hand-regulated and issued with an individualized
              chronometer certification and international courier vault transit.
            </p>

            {/* Pricing Mode Segmented Toggle */}
            <div className="mt-7 inline-flex items-center p-1 rounded-lg border border-slate-800 bg-[#070D19]">
              <button
                type="button"
                onClick={() => setPricingMode('deposit')}
                className={`px-4 py-2 rounded-md text-xs font-mono-tech uppercase tracking-wider transition-all whitespace-nowrap ${
                  pricingMode === 'deposit'
                    ? 'bg-sky-500/20 border border-sky-400 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                20% INITIAL DEPOSIT
              </button>
              <button
                type="button"
                onClick={() => setPricingMode('full')}
                className={`px-4 py-2 rounded-md text-xs font-mono-tech uppercase tracking-wider transition-all inline-flex items-center gap-2 whitespace-nowrap ${
                  pricingMode === 'full'
                    ? 'bg-sky-500/20 border border-sky-400 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>FULL ATELIER PRE-ORDER</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                  SAVE 20%
                </span>
              </button>
            </div>
          </div>

          {/* 3-Column Commission Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* TIER 1: ATELIER SELECTION */}
            <div className="rounded-xl border border-slate-800/90 bg-[#080F1E]/90 p-7 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold uppercase tracking-wider text-white">
                  ATELIER SELECTION
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Series of 500 numbered pieces
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Standard chronometer production run
                </p>

                <div className="mt-6 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-white">
                      {pricingMode === 'full' ? '₹5,72,000' : '₹1,43,000'}
                    </span>
                    <span className="text-xs font-mono-tech text-slate-400">
                      {pricingMode === 'full' ? 'pre-order total' : '20% deposit today'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs font-mono-tech">
                    <span className="text-slate-500 line-through mr-2">₹7,15,000</span>
                    <span className="text-emerald-400">
                      {pricingMode === 'full'
                        ? '• 20% Pre-Order Advantage Applied'
                        : '• Balance ₹5,72,000 due upon inspection'}
                    </span>
                  </div>
                </div>

                {/* Configuration Box */}
                <div className="mt-5 p-3.5 rounded-lg border border-slate-800 bg-[#050A14] text-xs font-mono-tech">
                  <span className="text-sky-400 uppercase">CONFIGURATION: </span>
                  <span className="text-slate-300">
                    300M Diver Standard • 316L Stainless Steel • Steel Link Bracelet
                  </span>
                </div>

                <div className="mt-6">
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-3.5">
                    INCLUDED WITH COMMISSION:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {[
                      'Official Swiss COSC Chronometer Certificate',
                      'Dual sapphire crystal with anti-reflective coating',
                      'Handmade Italian calfskin leather travel pouch',
                      '5-Year international warranty & first complimentary service',
                      'Worldwide insured courier delivery via Malca-Amit',
                    ].map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    scrollToAllocation('AURA Calibre 10 Diver (300M)')
                  }
                  className="w-full py-3 px-4 rounded-lg border border-slate-700 bg-slate-900 hover:border-sky-400 hover:text-sky-300 text-xs font-mono-tech font-semibold uppercase tracking-[0.16em] text-white transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>COMMISSION THIS EDITION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="mt-3 text-center text-[10px] font-mono-tech text-slate-500">
                  14-Day Vault Inspection Guarantee • Insured Delivery
                </div>
              </div>
            </div>

            {/* TIER 2: MASTER CHRONOMETER (Recommended Highlighted Card) */}
            <div className="relative rounded-xl border-2 border-sky-400/80 bg-[#091326] p-7 flex flex-col justify-between shadow-[0_0_40px_rgba(56,189,248,0.14)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded bg-[#38BDF8] text-[#040811] text-[10px] font-mono-tech font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                RECOMMENDED MASTER EDITION
              </div>

              <div>
                <h3 className="font-serif-luxury text-xl font-semibold uppercase tracking-wider text-white">
                  MASTER CHRONOMETER
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Limited to 100 individually engraved pieces
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Highlighted collector choice with exhibition back
                </p>

                <div className="mt-6 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-white">
                      {pricingMode === 'full' ? '₹7,04,000' : '₹1,76,000'}
                    </span>
                    <span className="text-xs font-mono-tech text-slate-400">
                      {pricingMode === 'full' ? 'pre-order total' : '20% deposit today'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs font-mono-tech">
                    <span className="text-slate-500 line-through mr-2">₹8,80,000</span>
                    <span className="text-emerald-400">
                      {pricingMode === 'full'
                        ? '• 20% Pre-Order Advantage Applied'
                        : '• Balance ₹7,04,000 due upon inspection'}
                    </span>
                  </div>
                </div>

                {/* Configuration Box */}
                <div className="mt-5 p-3.5 rounded-lg border border-sky-500/30 bg-[#050A14] text-xs font-mono-tech">
                  <span className="text-sky-400 uppercase">CONFIGURATION: </span>
                  <span className="text-slate-200">
                    Skeleton Dial • 22K Gold Rotor • Dual Straps (Steel + FKM Rubber)
                  </span>
                </div>

                <div className="mt-6">
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-300 mb-3.5">
                    INCLUDED WITH COMMISSION:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {[
                      'Master Chronometer Certification (-1/+2 sec/day accuracy)',
                      'Solid 22-Karat gold engraved oscillating rotor',
                      'Custom caseback engraving (up to 24 characters)',
                      'Interchangeable steel bracelet & FKM vulcanized dive strap',
                      '10-Year Atelier Guarantee with priority service queue',
                      'Invitation to annual Geneva horology masterclasses',
                    ].map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    scrollToAllocation('AURA Belmont Carré (Ref. BL-408)')
                  }
                  className="w-full py-3 px-4 rounded-lg bg-[#38BDF8] hover:bg-sky-300 text-[#040811] text-xs font-mono-tech font-bold uppercase tracking-[0.16em] transition-colors shadow-[0_0_24px_rgba(56,189,248,0.4)] inline-flex items-center justify-center gap-2"
                >
                  <span>COMMISSION THIS EDITION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="mt-3 text-center text-[10px] font-mono-tech text-slate-400">
                  14-Day Vault Inspection Guarantee • Insured Delivery
                </div>
              </div>
            </div>

            {/* TIER 3: BESPOKE ATELIER BOXSET */}
            <div className="rounded-xl border border-slate-800/90 bg-[#080F1E]/90 p-7 flex flex-col justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold uppercase tracking-wider text-white">
                  BESPOKE ATELIER BOXSET
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Only 25 commissioned per calendar year
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Custom hand-finished commission for connoisseurs
                </p>

                <div className="mt-6 pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-mono-tech text-white">
                      {pricingMode === 'full' ? '₹10,44,000' : '₹2,61,000'}
                    </span>
                    <span className="text-xs font-mono-tech text-slate-400">
                      {pricingMode === 'full' ? 'pre-order total' : '20% deposit today'}
                    </span>
                  </div>
                  <div className="mt-1.5 text-xs font-mono-tech">
                    <span className="text-slate-500 line-through mr-2">₹13,05,000</span>
                    <span className="text-emerald-400">
                      {pricingMode === 'full'
                        ? '• 20% Pre-Order Advantage Applied'
                        : '• Balance ₹10,44,000 due upon inspection'}
                    </span>
                  </div>
                </div>

                {/* Configuration Box */}
                <div className="mt-5 p-3.5 rounded-lg border border-slate-800 bg-[#050A14] text-xs font-mono-tech">
                  <span className="text-sky-400 uppercase">CONFIGURATION: </span>
                  <span className="text-slate-300">
                    Calibre 10 Royal Skeleton • Hand-Chased Bridges • Walnut Presentation
                    Safe
                  </span>
                </div>

                <div className="mt-6">
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-3.5">
                    INCLUDED WITH COMMISSION:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {[
                      'Hand-anglage movement finishing by master artisan',
                      'Custom dial hue selection and bespoke hand-painted indices',
                      'Swiss walnut presentation watch winder chest',
                      'Full horological loupe, spring-bar toolkit, and 3 custom straps',
                      'Lifetime personal concierge and biannual inspection',
                      'Private 2-day visit to the atelier in La Chaux-de-Fonds',
                    ].map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    scrollToAllocation('AURA Sarnen GMT (Ref. SR-5511)')
                  }
                  className="w-full py-3 px-4 rounded-lg border border-slate-700 bg-slate-900 hover:border-sky-400 hover:text-sky-300 text-xs font-mono-tech font-semibold uppercase tracking-[0.16em] text-white transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span>COMMISSION THIS EDITION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="mt-3 text-center text-[10px] font-mono-tech text-slate-500">
                  14-Day Vault Inspection Guarantee • Insured Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE COLLECTOR REGISTRY: WORDS FROM THE WRIST (00:22 - 00:23)
      ===================================================================== */}
      <section className="py-24 border-b border-slate-800/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-sky-400 mb-2">
              THE COLLECTOR REGISTRY
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold tracking-wide text-white uppercase">
              WORDS FROM THE WRIST
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800/90 bg-[#080F1E]/90 p-8 sm:p-10 relative">
            {/* Quote mark accent */}
            <div className="text-sky-500/30 font-serif-luxury text-6xl leading-none select-none mb-2">
              “
            </div>

            <blockquote className="font-serif-luxury italic text-xl sm:text-2xl text-slate-100 leading-relaxed mb-8">
              {TESTIMONIALS[testimonialIndex].quote}
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-semibold text-white">
                    {TESTIMONIALS[testimonialIndex].author}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono-tech text-emerald-300">
                    <Check className="w-3 h-3" />
                    Verified Patron
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {TESTIMONIALS[testimonialIndex].role}
                </div>
              </div>

              <div className="px-3 py-1.5 rounded border border-slate-800 bg-[#050A14] text-xs font-mono-tech text-sky-400 self-start sm:self-center">
                {TESTIMONIALS[testimonialIndex].reference}
              </div>
            </div>

            {/* Carousel Indicators & Prev/Next Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`View testimonial ${idx + 1}`}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      testimonialIndex === idx
                        ? 'w-7 bg-sky-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setTestimonialIndex((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="w-8 h-8 rounded-full border border-slate-800 bg-[#050A14] hover:border-sky-400/60 flex items-center justify-center text-slate-300 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() =>
                    setTestimonialIndex((prev) =>
                      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-8 h-8 rounded-full border border-slate-800 bg-[#050A14] hover:border-sky-400/60 flex items-center justify-center text-slate-300 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FAQ ACCORDION SECTION (00:24 - 00:25)
      ===================================================================== */}
      <section id="faq" className="py-24 border-b border-slate-800/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className="rounded-xl border border-slate-800/90 bg-[#080F1E]/90 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="text-sm sm:text-base font-medium text-white">
                      <span className="font-mono-tech text-xs text-sky-400 mr-2.5">
                        [{item.category}]
                      </span>
                      <span>{item.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 border-t border-slate-800/60 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          DIRECT ATELIER ALLOCATION FORM (00:25 - 00:27)
      ===================================================================== */}
      <section id="allocation-form" className="py-24 border-b border-slate-800/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-b from-[#091326] to-[#070D19] p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.24em] text-sky-400 mb-2">
                DIRECT ATELIER ALLOCATION
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-semibold tracking-wide text-white uppercase">
                RESERVE YOUR SERIAL
              </h2>
            </div>

            {allocationSubmitted ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-xs font-mono-tech uppercase tracking-widest text-emerald-300">
                  ALLOCATION DOSSIER REGISTERED • SERIAL {allocationSubmitted.serial}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Thank you, {allocationSubmitted.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Our Private Concierge in La Chaux-de-Fonds has reserved an allocation
                  slot for <span className="text-sky-300">{allocationSubmitted.reference}</span>{' '}
                  ({allocationSubmitted.region} Vault Transit).
                </p>
                <button
                  type="button"
                  onClick={() => setAllocationSubmitted(null)}
                  className="px-4 py-2 rounded border border-slate-700 bg-slate-900 text-xs font-mono-tech text-slate-300 hover:text-white"
                >
                  Modify Allocation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleAllocationSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Collector Full Name */}
                  <div>
                    <label className="block text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-2">
                      COLLECTOR FULL NAME *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={collectorName}
                        onChange={(e) => setCollectorName(e.target.value)}
                        placeholder="e.g. Jean-Luc Vauthier"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#050A14] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={collectorEmail}
                        onChange={(e) => setCollectorEmail(e.target.value)}
                        placeholder="j.vauthier@genevahorology.ch"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-800 bg-[#050A14] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Reference */}
                  <div>
                    <label className="block text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-2">
                      PREFERRED REFERENCE
                    </label>
                    <select
                      value={preferredReference}
                      onChange={(e) => setPreferredReference(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-800 bg-[#050A14] text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                    >
                      <option value="AURA Calibre 10 Diver (300M)">
                        AURA Calibre 10 Diver (300M)
                      </option>
                      <option value="AURA Belmont Carré (Ref. BL-408)">
                        AURA Belmont Carré (Ref. BL-408)
                      </option>
                      <option value="AURA Steinach Chronograph (Ref. ST-2709)">
                        AURA Steinach Chronograph (Ref. ST-2709)
                      </option>
                      <option value="AURA Sarnen GMT (Ref. SR-5511)">
                        AURA Sarnen GMT (Ref. SR-5511)
                      </option>
                    </select>
                  </div>

                  {/* Delivery Region */}
                  <div>
                    <label className="block text-[10px] font-mono-tech uppercase tracking-[0.18em] text-slate-400 mb-2">
                      DELIVERY REGION
                    </label>
                    <select
                      value={deliveryRegion}
                      onChange={(e) => setDeliveryRegion(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-800 bg-[#050A14] text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                    >
                      <option value="Europe & Switzerland">Europe &amp; Switzerland</option>
                      <option value="North America">North America</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Asia-Pacific & Middle East">
                        Asia-Pacific &amp; Middle East
                      </option>
                      <option value="Private Pickup — La Chaux-de-Fonds">
                        Private Pickup — La Chaux-de-Fonds
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-lg bg-[#38BDF8] hover:bg-sky-300 text-[#040811] text-xs font-mono-tech font-bold uppercase tracking-[0.18em] transition-colors shadow-[0_0_25px_rgba(56,189,248,0.4)] inline-flex items-center justify-center gap-2"
                >
                  <span>CONFIRM TIMEPIECE ALLOCATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono-tech text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    Encrypted 256-bit Swiss privacy protection • No spam or third-party
                    syndication
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER (Matches 00:27 - 00:30)
      ===================================================================== */}
      <footer className="pt-16 pb-12 bg-[#04070E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display-luxury text-xl font-semibold tracking-[0.22em] text-white">
                  AURA
                </span>
                <span className="font-mono-tech text-[10px] tracking-[0.25em] text-slate-400 uppercase">
                  SWISS
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Independent manufacture horology based in La Chaux-de-Fonds, Switzerland.
                Dedicated to mechanical transparency and extreme durability.
              </p>
              <div className="text-[11px] font-mono-tech text-sky-400">
                Atelier No. CH-645-102948-A
              </div>
            </div>

            {/* Col 2: References */}
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-white font-semibold mb-4">
                REFERENCES
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {TIMEPIECES.map((w) => (
                  <li key={w.id}>
                    <button
                      type="button"
                      onClick={() => setInspectedTimepiece(w)}
                      className="hover:text-sky-400 transition-colors"
                    >
                      {w.name
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())
                        .replace('Aura', 'AURA')
                        .replace('Gmt', 'GMT')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Manufacture */}
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-white font-semibold mb-4">
                MANUFACTURE
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#architecture" className="hover:text-sky-400 transition-colors">
                    Calibre 10 Architecture
                  </a>
                </li>
                <li>
                  <a href="#engineering" className="hover:text-sky-400 transition-colors">
                    316L Metallurgy
                  </a>
                </li>
                <li>
                  <a href="#atelier" className="hover:text-sky-400 transition-colors">
                    Master Horologist Atelier
                  </a>
                </li>
                <li>
                  <a href="#editions" className="hover:text-sky-400 transition-colors">
                    Commission Process
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Private Atelier */}
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-white font-semibold mb-4">
                PRIVATE ATELIER
              </div>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>Rue de la Paix 18</p>
                <p>2300 La Chaux-de-Fonds</p>
                <p>Canton of Neuchâtel, Switzerland</p>
                <p className="pt-2">
                  <a
                    href="mailto:concierge@auraswiss.ch"
                    className="font-mono-tech text-sky-400 hover:underline"
                  >
                    concierge@auraswiss.ch
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-slate-500">
            <div>© 2026 AURA SWISS MANUFACTURE SA. All rights reserved.</div>
            <div>
              Swiss Made Horology • Contrôle Officiel Suisse des Chronomètres • ISO 6425
              Standard
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          TIMEPIECE SPECIFICATION INSPECTOR MODAL
      ===================================================================== */}
      {inspectedTimepiece && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInspectedTimepiece(null)}
        >
          <div
            className="max-w-2xl w-full rounded-2xl border border-slate-700 bg-[#080F1E] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto bg-[#050911]">
                <img
                  src={inspectedTimepiece.image}
                  alt={inspectedTimepiece.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-sky-400">
                      {inspectedTimepiece.collectionTag}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInspectedTimepiece(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-white uppercase mb-2">
                    {inspectedTimepiece.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {inspectedTimepiece.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800 pt-3 text-xs font-mono-tech">
                    <div className="flex justify-between">
                      <span className="text-slate-500">MOVEMENT:</span>
                      <span className="text-slate-200 text-right">
                        {inspectedTimepiece.calibre}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">DIMENSIONS:</span>
                      <span className="text-slate-200">{inspectedTimepiece.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">HYDROSTATIC:</span>
                      <span className="text-slate-200">
                        {inspectedTimepiece.waterResistance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">AUTONOMY:</span>
                      <span className="text-slate-200">
                        {inspectedTimepiece.powerReserve}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xl font-bold font-mono-tech text-white">
                    {inspectedTimepiece.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const label = `${inspectedTimepiece.name} (${inspectedTimepiece.refCode})`;
                      setInspectedTimepiece(null);
                      scrollToAllocation(label);
                    }}
                    className="px-4 py-2 rounded bg-[#38BDF8] hover:bg-sky-300 text-[#040811] text-xs font-mono-tech font-bold uppercase tracking-wider"
                  >
                    RESERVE THIS PIECE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
