import React from 'react';

interface CandleData {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  scale: number;
  opacity: number;
}

const CANDLES: CandleData[] = [
  { id: 1, left: '6%', top: '14%', delay: '0s', duration: '5.5s', scale: 0.9, opacity: 0.8 },
  { id: 2, left: '16%', top: '22%', delay: '1.2s', duration: '6.2s', scale: 0.75, opacity: 0.7 },
  { id: 3, left: '26%', top: '10%', delay: '2.5s', duration: '5.8s', scale: 1.05, opacity: 0.85 },
  { id: 4, left: '42%', top: '18%', delay: '0.8s', duration: '7.1s', scale: 0.8, opacity: 0.75 },
  { id: 5, left: '58%', top: '12%', delay: '1.9s', duration: '6.5s', scale: 1.1, opacity: 0.9 },
  { id: 6, left: '72%', top: '24%', delay: '3.1s', duration: '5.2s', scale: 0.7, opacity: 0.65 },
  { id: 7, left: '84%', top: '15%', delay: '0.4s', duration: '6.8s', scale: 0.95, opacity: 0.8 },
  { id: 8, left: '93%', top: '28%', delay: '2.2s', duration: '5.9s', scale: 0.85, opacity: 0.7 },
];

export const FloatingCandles: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] overflow-hidden z-10 select-none">
      {CANDLES.map((c) => (
        <div
          key={c.id}
          className="absolute flex flex-col items-center animate-float"
          style={{
            left: c.left,
            top: c.top,
            animationDelay: c.delay,
            animationDuration: c.duration,
            transform: `scale(${c.scale})`,
            opacity: c.opacity,
          }}
        >
          {/* Flame Halo Glow */}
          <div className="absolute -top-7 w-12 h-12 rounded-full bg-amber-400/20 blur-md pointer-events-none animate-pulse" />
          
          {/* Candle Flame */}
          <div className="relative w-2.5 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#f59e0b] animate-flicker">
            {/* Blue inner core of flame */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400/80 blur-[0.5px]" />
          </div>

          {/* Candle Wick */}
          <div className="w-0.5 h-1.5 bg-neutral-900" />

          {/* Candle Body */}
          <div className="w-3.5 h-12 bg-gradient-to-r from-amber-100 via-stone-200 to-amber-200 rounded-sm shadow-md border-t border-amber-200/50 relative overflow-hidden">
            {/* Wax drips */}
            <div className="absolute top-0 left-0.5 w-1 h-3 bg-amber-50 rounded-b-full shadow-inner" />
            <div className="absolute top-0 right-0.5 w-1 h-4 bg-amber-50 rounded-b-full shadow-inner" />
          </div>
        </div>
      ))}
    </div>
  );
};
