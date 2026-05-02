'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const NAV_LINKS = [
  { label: 'About',     href: '#about' },
  { label: 'What I Do', href: '#services' },
  { label: 'Stack',     href: '#stack' },
  { label: 'Timeline',  href: '#timeline' },
  { label: 'Contact',   href: '#contact' },
];

// ── Chromatic aberration "Hire Me" button ────────────────────────────────────
function ChromaticButton({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold select-none"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #7b2fbe 0%, #9d4edd 60%, #c77dff 100%)',
        color: '#fff',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 0 36px rgba(123,47,190,0.75), 0 0 60px rgba(199,125,255,0.25)'
          : '0 0 20px rgba(123,47,190,0.45)',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        overflow: 'visible',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      {/* Red channel — drifts left */}
      <span
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          borderRadius: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600,
          color: 'rgba(255,80,80,0.55)',
          transform: hovered ? 'translate(-2.5px, 0.5px)' : 'translate(-1px, 0)',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none',
          userSelect: 'none',
          mixBlendMode: 'screen',
        }}
      >
        Hire Me
      </span>
      {/* Blue channel — drifts right */}
      <span
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          borderRadius: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600,
          color: 'rgba(80,160,255,0.55)',
          transform: hovered ? 'translate(2.5px, -0.5px)' : 'translate(1px, 0)',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none',
          userSelect: 'none',
          mixBlendMode: 'screen',
        }}
      >
        Hire Me
      </span>
      {/* Real label */}
      <span style={{ position: 'relative', zIndex: 1 }}>Hire Me</span>
    </a>
  );
}

// ── Glass nav pill ────────────────────────────────────────────────────────────
function GlassNavLink({ label, href }: { label: string; href: string }) {
  const [active, setActive] = useState(false);
  return (
    <a
      href={href}
      className="relative text-sm transition-colors duration-200"
      style={{
        color: active ? '#ededed' : '#6b7280',
        padding: '5px 14px',
        borderRadius: 9999,
        display: 'inline-block',
        background: active ? 'rgba(123,47,190,0.13)' : 'transparent',
        backdropFilter: active ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: active ? 'blur(12px)' : 'none',
        border: active ? '1px solid rgba(199,125,255,0.28)' : '1px solid transparent',
        boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.12)' : 'none',
        transition: 'all 0.22s ease',
      }}
      onMouseEnter={(e) => {
        setActive(true);
        (e.currentTarget as HTMLElement).style.color = '#ededed';
      }}
      onMouseLeave={(e) => {
        setActive(false);
        (e.currentTarget as HTMLElement).style.color = '#6b7280';
      }}
      data-cursor="hover"
    >
      {label}
      {/* Active dot */}
      <span
        style={{
          position: 'absolute',
          bottom: 2, left: '50%',
          transform: 'translateX(-50%)',
          width: active ? 4 : 0,
          height: 4,
          borderRadius: '50%',
          background: '#c77dff',
          transition: 'width 0.2s ease',
          display: 'block',
        }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'linear-gradient(to bottom, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.55) 100%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(199,125,255,0.10)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 1px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)'
          : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <AnimatedLogo size={64} />
        </Link>

        {/* Glass nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <GlassNavLink label={link.label} href={link.href} />
            </li>
          ))}
        </ul>

        {/* Chromatic "Hire Me" */}
        <ChromaticButton href="#contact" />
      </nav>
    </header>
  );
}
