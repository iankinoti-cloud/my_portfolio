'use client';

import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);

  // Detect hover on interactive elements
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('[data-cursor="hover"], a, button')) {
        setIsHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest('[data-cursor="hover"], a, button')) {
        setIsHovering(false);
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  // Smooth ring follow
  useEffect(() => {
    let ringX = mouse.x;
    let ringY = mouse.y;
    let rafId: number;

    const animate = () => {
      ringX += (mouse.x - ringX) * 0.12;
      ringY += (mouse.y - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [mouse.x, mouse.y]);

  // Dot snaps instantly
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;
    }
  }, [mouse.x, mouse.y]);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9998] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Outer ring — expands + turns purple on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997]"
        style={{
          willChange: 'transform',
          border: isHovering ? '1.5px solid rgba(199,125,255,0.75)' : '1px solid rgba(255,255,255,0.28)',
          transform: isHovering ? 'scale(1.55)' : 'scale(1)',
          transition: 'border 0.2s ease, transform 0.25s ease',
          backdropFilter: isHovering ? 'blur(0px)' : 'none',
        }}
      />
    </>
  );
}
