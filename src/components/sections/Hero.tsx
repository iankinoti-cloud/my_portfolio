'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity, MotionValue } from 'framer-motion';
import dynamic from 'next/dynamic';

const SplineMascot = dynamic(() => import('@/components/ui/SplineMascot'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  ),
});

// ── Glass letter: wave hover + scroll wiggle ────────────────────────────────
// Lerps #c77dff → #7b2fbe across the KINOTI letters
function lerpKinotiColor(t: number) {
  const r = Math.round(199 + (123 - 199) * t);
  const g = Math.round(125 + (47  - 125) * t);
  const b = Math.round(255 + (190 - 255) * t);
  return `rgb(${r},${g},${b})`;
}

function GlassLetter({
  char, index, isKinoti, wordLength, hoveredIndex, onHover, onLeave, entranceDelay,
}: {
  char: string;
  index: number;
  isKinoti: boolean;
  wordLength: number;
  hoveredIndex: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
  entranceDelay: number;
}) {
  // Entrance + hover share the same y spring
  const yMV   = useMotionValue(56);
  const ySpring = useSpring(yMV,    { stiffness: 240, damping: 22 });
  const opMV  = useMotionValue(0);
  const opSpring = useSpring(opMV,  { stiffness: 130, damping: 20 });
  const scMV  = useMotionValue(1);
  const scSpring = useSpring(scMV,  { stiffness: 340, damping: 26 });
  const rotMV = useMotionValue(0);
  const rotSpring = useSpring(rotMV, { stiffness: 300, damping: 22 });
  // Separate rotateX only for entrance flip — snaps to 0 and stays
  const rxMV  = useMotionValue(-22);
  const rxSpring = useSpring(rxMV,  { stiffness: 180, damping: 20 });

  // Entrance: staggered fade-up + 3-D flip
  useEffect(() => {
    const t = setTimeout(() => {
      yMV.set(0);
      opMV.set(1);
      rxMV.set(0);
    }, entranceDelay);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wave ripple driven by hovered index distance
  useEffect(() => {
    if (hoveredIndex === null) {
      yMV.set(0); scMV.set(1); rotMV.set(0);
      return;
    }
    const d = Math.abs(index - hoveredIndex);
    yMV.set(d === 0 ? -20 : d === 1 ? -10 : d === 2 ? -4 : 0);
    scMV.set(d === 0 ? 1.18 : d === 1 ? 1.06 : 1);
    rotMV.set(d === 0 ? (index % 2 === 0 ? -6 : 6) : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredIndex, index]);

  const t = wordLength > 1 ? index / (wordLength - 1) : 0;
  const textColor = isKinoti ? lerpKinotiColor(t) : '#f0f0f0';
  const chipBg    = isKinoti
    ? 'linear-gradient(150deg, rgba(199,125,255,0.13) 0%, rgba(123,47,190,0.07) 100%)'
    : 'rgba(255,255,255,0.05)';
  const chipBorder = isKinoti
    ? '1px solid rgba(199,125,255,0.26)'
    : '1px solid rgba(255,255,255,0.13)';
  const chipShadow = isKinoti
    ? 'inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 30px rgba(123,47,190,0.18)'
    : 'inset 0 1px 0 rgba(255,255,255,0.16), 0 4px 18px rgba(0,0,0,0.22)';

  return (
    <motion.span
      style={{
        display: 'inline-block',
        y: ySpring,
        opacity: opSpring,
        scale: scSpring,
        rotate: rotSpring,
        rotateX: rxSpring,
        cursor: 'default',
        transformOrigin: 'bottom center',
        transformPerspective: 600,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <span
        style={{
          display: 'inline-block',
          background: chipBg,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: chipBorder,
          borderRadius: 12,
          padding: '2px 6px',
          color: textColor,
          boxShadow: chipShadow,
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          fontSize: 'inherit',
        }}
      >
        {char}
      </span>
    </motion.span>
  );
}

// ── Magnetic button ──────────────────────────────────────────────────────────
function MagneticButton({
  href, children, variant = 'outline', download,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'outline' | 'solid' | 'ghost';
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 22 });
  const springY = useSpring(y, { stiffness: 350, damping: 22 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.32);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  if (variant === 'solid') return (
    <motion.a ref={ref} href={href} download={download}
      className="px-6 py-3 rounded-full text-sm font-semibold inline-block"
      style={{ background: 'linear-gradient(135deg, #7b2fbe, #9d4edd)', color: '#fff', x: springX, y: springY }}
      whileHover={{ boxShadow: '0 0 40px rgba(123,47,190,0.7)', scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      data-cursor="hover"
    >{children}</motion.a>
  );

  if (variant === 'ghost') return (
    <motion.a ref={ref} href={href} download={download}
      className="px-6 py-3 rounded-full text-sm font-medium inline-block"
      style={{ color: '#6b7280', x: springX, y: springY }}
      whileHover={{ color: '#ededed' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >{children}</motion.a>
  );

  return (
    <motion.a ref={ref} href={href} download={download}
      className="px-6 py-3 rounded-full text-sm font-semibold inline-block"
      style={{ border: '1px solid rgba(123,47,190,0.6)', color: '#ededed', x: springX, y: springY }}
      whileHover={{ borderColor: '#9d4edd', backgroundColor: 'rgba(123,47,190,0.15)', boxShadow: '0 0 24px rgba(123,47,190,0.3)' }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      data-cursor="hover"
    >{children}</motion.a>
  );
}

// ── Animated stat counter ─────────────────────────────────────────────────────
function StatCounter({ target, suffix, label, delay = 0 }: { target: number; suffix: string; label: string; delay?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setCount(Math.round((1 - Math.pow(1 - t, 3)) * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 1200 + delay);
    return () => clearTimeout(timer);
  }, [target, delay]);
  return (
    <div>
      <div className="text-2xl font-bold tabular-nums" style={{ color: '#c77dff' }}>{count}{suffix}</div>
      <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{label}</div>
    </div>
  );
}

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 1.15 } },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [hovIAN,    setHovIAN]    = useState<number | null>(null);
  const [hovKINOTI, setHovKINOTI] = useState<number | null>(null);

  // Scroll velocity → gentle name-block wiggle
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothScrollV  = useSpring(scrollVelocity, { damping: 60, stiffness: 120, mass: 0.4 });
  const scrollWiggle   = useTransform(smoothScrollV, [-1800, 0, 1800], [5, 0, -5]);

  // Raw mouse -1…1 relative to hero center
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 18 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 18 });

  // Each layer moves a different amount — creates depth
  const glow1X = useTransform(smoothX, [-1, 1], [-55, 55]);
  const glow1Y = useTransform(smoothY, [-1, 1], [-35, 35]);
  const glow2X = useTransform(smoothX, [-1, 1], [35, -35]);
  const glow2Y = useTransform(smoothY, [-1, 1], [22, -22]);
  const textX  = useTransform(smoothX, [-1, 1], [-12, 12]);
  const textY  = useTransform(smoothY, [-1, 1], [-7, 7]);
  const mascotX = useTransform(smoothX, [-1, 1], [22, -22]);
  const mascotY = useTransform(smoothY, [-1, 1], [14, -14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left - r.width / 2) / (r.width / 2));
    rawY.set((e.clientY - r.top - r.height / 2) / (r.height / 2));
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      {/* Background glows — deepest parallax layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute"
          style={{
            top: '20%', left: '-10%',
            width: 700, height: 700,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,47,190,0.13) 0%, transparent 70%)',
            x: glow1X, y: glow1Y,
          }}
        />
        <motion.div
          className="absolute"
          style={{
            bottom: '10%', right: '-5%',
            width: 500, height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244,162,97,0.07) 0%, transparent 70%)',
            x: glow2X, y: glow2Y,
          }}
        />
      </div>

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center pt-24 pb-16">

        {/* ── Left column: Text — mid parallax layer ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col"
          style={{ x: textX, y: textY }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px" style={{ backgroundColor: '#f4a261' }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#f4a261' }}>
              Creative Developer
            </span>
          </motion.div>

          {/* Name — glass chips with wave hover + scroll wiggle */}
          <motion.div
            className="font-bold leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', y: scrollWiggle }}
          >
            {/* IAN row */}
            <div aria-label="IAN" style={{ display: 'block' }}>
              {'IAN'.split('').map((ch, i) => (
                <GlassLetter
                  key={i} char={ch} index={i}
                  isKinoti={false} wordLength={3}
                  hoveredIndex={hovIAN}
                  onHover={setHovIAN}
                  onLeave={() => setHovIAN(null)}
                  entranceDelay={480 + i * 72}
                />
              ))}
            </div>
            {/* KINOTI row */}
            <div aria-label="KINOTI" style={{ display: 'block' }}>
              {'KINOTI'.split('').map((ch, i) => (
                <GlassLetter
                  key={i} char={ch} index={i}
                  isKinoti wordLength={6}
                  hoveredIndex={hovKINOTI}
                  onHover={setHovKINOTI}
                  onLeave={() => setHovKINOTI(null)}
                  entranceDelay={780 + i * 72}
                />
              ))}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="font-medium leading-relaxed mb-4 max-w-lg"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', color: '#d1d5db' }}
          >
            I craft modern web experiences for startups and creators.
          </motion.p>

          {/* Sub-tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-10 max-w-md"
            style={{ color: '#6b7280' }}
          >
            Building fast, creative, AI-powered digital products.
          </motion.p>

          {/* Magnetic buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <MagneticButton href="#work">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="solid">Hire Me</MagneticButton>
            <MagneticButton href="/cv.pdf" variant="ghost" download>Download CV →</MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            className="flex gap-8 mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <StatCounter target={3} suffix="+" label="Years crafting" />
            <StatCounter target={20} suffix="+" label="Projects shipped" delay={120} />
            <StatCounter target={100} suffix="%" label="Craftsmanship" delay={240} />
          </motion.div>
        </motion.div>

        {/* ── Right column: Mascot — front parallax layer ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
          style={{ height: 'clamp(400px, 55vw, 600px)', x: mascotX, y: mascotY }}
        >
          <SplineMascot />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#4b5563' }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #4b5563, transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
