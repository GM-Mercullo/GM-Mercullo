import React, { useEffect, useRef, useState } from 'react';
import { LIBRARY_SPARK_COLORS } from '../../utils/magicFx';

interface WandCursorProps {
  enabled: boolean;
  house?: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const WandCursor: React.FC<WandCursorProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isWandActive, setIsWandActive] = useState(enabled);

  useEffect(() => {
    setIsWandActive(enabled);
  }, [enabled]);

  useEffect(() => {
    if (!isWandActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Gentle spark emission
      for (let i = 0; i < 2; i++) {
        const color = LIBRARY_SPARK_COLORS[Math.floor(Math.random() * LIBRARY_SPARK_COLORS.length)];
        sparksRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 + 0.4,
          size: Math.random() * 2.5 + 1,
          color,
          alpha: 1,
          life: 0,
          maxLife: 24 + Math.random() * 12
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1;
        const color = LIBRARY_SPARK_COLORS[Math.floor(Math.random() * LIBRARY_SPARK_COLORS.length)];
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          color,
          alpha: 1,
          life: 0,
          maxLife: 35 + Math.random() * 15
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.alpha = 1 - s.life / s.maxLife;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - s.life / s.maxLife * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [isWandActive]);

  if (!isWandActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
};
