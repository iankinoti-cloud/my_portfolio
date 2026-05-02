'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function SplineMascot() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">

      {/* Outer pulse rings */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 340, height: 340,
          borderColor: 'rgba(123, 47, 190, 0.15)',
          animation: 'pulseRing 3.5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full border"
        style={{
          width: 290, height: 290,
          borderColor: 'rgba(123, 47, 190, 0.25)',
          animation: 'pulseRing 3.5s ease-in-out infinite 0.5s',
        }}
      />

      {/* Slow-spinning dashed ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260, height: 260,
          border: '1px dashed rgba(199, 125, 255, 0.3)',
          animation: 'orbit 25s linear infinite',
        }}
      />

      {/* Main sphere */}
      <div
        className="relative rounded-full animate-float"
        style={{
          width: 200, height: 200,
          background: 'radial-gradient(circle at 35% 30%, #c77dff 0%, #7b2fbe 50%, #1a0328 100%)',
          boxShadow: `
            0 0 40px rgba(123, 47, 190, 0.6),
            0 0 80px rgba(123, 47, 190, 0.3),
            0 0 140px rgba(123, 47, 190, 0.15),
            inset 0 0 30px rgba(199, 125, 255, 0.2)
          `,
        }}
      >
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: 28, left: 32, width: 52, height: 32,
            background: 'rgba(255, 255, 255, 0.18)',
            filter: 'blur(6px)',
            transform: 'rotate(-30deg)',
          }}
        />
        {/* Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-bold tracking-widest"
            style={{ fontSize: 28, color: 'rgba(255,255,255,0.75)', letterSpacing: 6 }}
          >
            IK
          </span>
        </div>
      </div>

      {/* Orbiting amber dot (Kenyan accent) */}
      <div
        className="absolute"
        style={{
          width: 240, height: 240,
          animation: 'orbit 7s linear infinite',
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            top: -6, left: '50%', transform: 'translateX(-50%)',
            width: 12, height: 12,
            background: '#f4a261',
            boxShadow: '0 0 12px #f4a261, 0 0 24px rgba(244, 162, 97, 0.5)',
          }}
        />
      </div>

      {/* Orbiting small purple dot (counter-clockwise) */}
      <div
        className="absolute"
        style={{
          width: 270, height: 270,
          animation: 'orbit 12s linear infinite reverse',
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            bottom: -4, right: '25%',
            width: 8, height: 8,
            background: '#c77dff',
            boxShadow: '0 0 8px #c77dff',
          }}
        />
      </div>

      {/* Ground shadow */}
      <div
        className="absolute bottom-16 rounded-full"
        style={{
          width: 120, height: 16,
          background: 'radial-gradient(ellipse, rgba(123,47,190,0.3) 0%, transparent 70%)',
          animation: 'float 4s ease-in-out infinite',
          animationDelay: '0.2s',
        }}
      />

      {/* ── Kenyan flag on a pole ── */}
      <div
        className="absolute"
        style={{ right: 28, bottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/* Flag */}
        <div
          style={{
            width: 56, height: 38,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <div style={{ flex: 1, background: '#006600' }} />
          <div style={{ height: 3, background: '#fff' }} />
          <div style={{ flex: 1.4, background: '#BB0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Maasai shield */}
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
              <ellipse cx="8" cy="11" rx="7" ry="10" fill="#fff" stroke="#000" strokeWidth="0.8"/>
              <ellipse cx="8" cy="11" rx="4.5" ry="7.5" fill="#BB0000"/>
              <rect x="7.2" y="1.5" width="1.6" height="19" rx="0.8" fill="#fff"/>
              <rect x="2" y="10.2" width="12" height="1.6" rx="0.8" fill="#000"/>
              {/* Spears */}
              <line x1="8" y1="-1" x2="8" y2="23" stroke="#888" strokeWidth="0.8"/>
            </svg>
          </div>
          <div style={{ height: 3, background: '#fff' }} />
          <div style={{ flex: 1, background: '#000' }} />
        </div>
        {/* Pole */}
        <div
          style={{
            width: 3,
            height: 90,
            background: 'linear-gradient(to bottom, #bbb, #666)',
            borderRadius: 2,
          }}
        />
        {/* Base */}
        <div
          style={{
            width: 14, height: 5,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
}
