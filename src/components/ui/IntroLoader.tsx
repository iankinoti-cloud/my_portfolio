'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DURATION = 4000; // total ms before exit

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  // useLayoutEffect fires synchronously before the browser can honour the URL hash —
  // this beats Next.js's hash-scroll and ensures we always start at the top.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, DURATION);

    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center flex-col overflow-hidden"
          style={{ backgroundColor: '#030303' }}
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* ── Layer 1: Deep radial bloom ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,47,190,0.22) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{ duration: 3, times: [0, 0.3, 0.6, 1] }}
          />

          {/* ── Layer 2: Light ray fan ── */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none origin-center"
              style={{
                width: 2,
                height: '55vh',
                top: '50%',
                left: '50%',
                transformOrigin: 'top center',
                rotate: `${i * 45}deg`,
                background: 'linear-gradient(to bottom, rgba(199,125,255,0.18), transparent)',
                filter: 'blur(4px)',
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: [0, 0.6, 0] }}
              transition={{ delay: 0.6 + i * 0.05, duration: 1.8, ease: 'easeOut' }}
            />
          ))}

          {/* ── Layer 3: Amber accent ring ── */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 480, height: 480,
              border: '1px solid rgba(244,162,97,0.12)',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.2, 1.0], opacity: [0, 0.5, 0.2] }}
            transition={{ delay: 0.4, duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 340, height: 340,
              border: '1px solid rgba(123,47,190,0.2)',
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.15, 0.95], opacity: [0, 0.7, 0.3] }}
            transition={{ delay: 0.5, duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Layer 4: THE LOGO ── */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            style={{ zIndex: 2 }}
          >
            {/* Logo image — cinematic zoom + focus */}
            <motion.div
              style={{ position: 'relative', width: 320, height: 174 }}
              initial={{ opacity: 0, scale: 0.4, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Glow behind logo */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(123,47,190,0.5) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                  transform: 'scale(1.3)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.6] }}
                transition={{ delay: 0.8, duration: 1.5 }}
              />
              <Image
                src="/iancreative.png"
                alt="IAN Creative"
                fill
                sizes="320px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>

            {/* Divider line */}
            <motion.div
              style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(199,125,255,0.5), transparent)' }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Name + title */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="font-bold tracking-[0.35em] uppercase"
                style={{ fontSize: 22, color: '#ededed', letterSpacing: '0.35em' }}
              >
                Ian Kinoti
              </span>
              <span
                className="text-xs tracking-[0.55em] uppercase"
                style={{ color: 'rgba(199,125,255,0.65)' }}
              >
                Creative Developer
              </span>
            </motion.div>
          </motion.div>

          {/* ── Layer 5: Progress bar ── */}
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 180, height: 1.5, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(to right, #7b2fbe, #c77dff, #f4a261)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.7, duration: 2.0, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
