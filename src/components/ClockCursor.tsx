import React, { useEffect, useState } from 'react';

interface ClockCursorProps {
  enabled: boolean;
}

export const ClockCursor: React.FC<ClockCursorProps> = ({ enabled }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      setNow(new Date());
    }, 250);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [role="button"]');
        setIsHoveringInteractive(Boolean(interactive));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const secDeg = seconds * 6;
  const minDeg = minutes * 6;
  const hourDeg = hours * 30;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        transform: `translate3d(${pos.x - 22}px, ${pos.y - 22}px, 0) scale(${
          isHoveringInteractive ? 1.18 : 1
        })`,
        transition: 'transform 60ms linear',
      }}
    >
      <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(56,189,248,0.45)]">
        <svg width="44" height="44" viewBox="0 0 44 44">
          {/* Outer dark sapphire dial */}
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="rgba(5, 11, 22, 0.88)"
            stroke={isHoveringInteractive ? '#38bdf8' : 'rgba(56, 189, 248, 0.7)'}
            strokeWidth="1.5"
          />
          {/* 12 Horological indices */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="22"
              y1="4"
              x2="22"
              y2={deg % 90 === 0 ? '7.5' : '6'}
              stroke={deg % 90 === 0 ? '#38bdf8' : '#64748b'}
              strokeWidth={deg % 90 === 0 ? '1.5' : '1'}
              transform={`rotate(${deg} 22 22)`}
            />
          ))}
          {/* Hour hand */}
          <line
            x1="22"
            y1="22"
            x2="22"
            y2="12"
            stroke="#e2e8f0"
            strokeWidth="1.8"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 22 22)`}
          />
          {/* Minute hand */}
          <line
            x1="22"
            y1="22"
            x2="22"
            y2="8"
            stroke="#f8fafc"
            strokeWidth="1.3"
            strokeLinecap="round"
            transform={`rotate(${minDeg} 22 22)`}
          />
          {/* Sweeping Second hand */}
          <line
            x1="22"
            y1="25"
            x2="22"
            y2="6.5"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeLinecap="round"
            transform={`rotate(${secDeg} 22 22)`}
          />
          {/* Gold Center Jewel Pivot */}
          <circle cx="22" cy="22" r="2.3" fill="#f59e0b" stroke="#fef08a" strokeWidth="0.7" />
        </svg>
      </div>
    </div>
  );
};
