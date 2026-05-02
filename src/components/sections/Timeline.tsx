'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timeline = [
  {
    year: '2026',
    role: 'Freelance Creative Developer',
    company: 'Self-employed',
    description:
      'Building bespoke digital products for startups and agencies — AI tools, creative websites, and SaaS MVPs. Combining design thinking with engineering execution.',
    type: 'current',
    color: '#7b2fbe',
  },
  {
    year: '2025',
    role: 'Frontend Engineer',
    company: 'Tech Startup · Nairobi',
    description:
      'Led frontend development for a logistics SaaS platform. Designed and built a real-time dashboard, reduced load time by 60%, and delivered a mobile-first redesign.',
    type: 'work',
    color: '#c77dff',
  },
  {
    year: '2024',
    role: 'UI / UX Designer & Developer',
    company: 'Creative Agency · Remote',
    description:
      'Designed and built marketing sites and brand identities for 10+ clients. Introduced a design system that cut production time by 40%.',
    type: 'work',
    color: '#f4a261',
  },
  {
    year: '2023',
    role: 'Open Source & Learning',
    company: 'GitHub + Personal Projects',
    description:
      'Deep-dived into Three.js, GSAP, and AI APIs. Built 5 open-source tools with 200+ GitHub stars combined. This is where the obsession with craft started.',
    type: 'milestone',
    color: '#48cae4',
  },

];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const isLeft = index % 2 === 0;

  // Card: slides from its side + fades up on enter, reverses on exit
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.28, 0.72, 0.95], [0, 1, 1, 0]);
  const cardX = useTransform(
    scrollYProgress,
    [0.05, 0.28, 0.72, 0.95],
    [isLeft ? -56 : 56, 0, 0, isLeft ? -24 : 24]
  );
  const cardY = useTransform(scrollYProgress, [0.05, 0.28, 0.72, 0.95], [20, 0, 0, -10]);
  const cardBlurRaw = useTransform(scrollYProgress, [0.05, 0.28], [8, 0]);
  const cardFilter = useTransform(cardBlurRaw, (v) => `blur(${v}px)`);

  // Dot: pops in, disappears on exit
  const dotScale = useTransform(scrollYProgress, [0.15, 0.32, 0.68, 0.85], [0, 1, 1, 0]);
  const dotOpacity = useTransform(scrollYProgress, [0.15, 0.32, 0.68, 0.85], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className="relative grid md:grid-cols-2 gap-6 md:gap-12 items-center"
    >
      {/* Column 1 */}
      <div className={isLeft ? 'md:text-right' : 'hidden md:block'}>
        {isLeft && (
          <motion.div style={{ opacity: cardOpacity, x: cardX, y: cardY, filter: cardFilter }}>
            <Card item={item} />
          </motion.div>
        )}
      </div>

      {/* Center dot */}
      <div className="absolute left-0 md:left-1/2 top-8 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
        <motion.div
          className="rounded-full"
          style={{
            width: 16, height: 16,
            background: item.color,
            boxShadow: `0 0 0 4px #080808, 0 0 0 6px ${item.color}55, 0 0 20px ${item.color}66`,
            scale: dotScale,
            opacity: dotOpacity,
          }}
        />
      </div>

      {/* Column 2 */}
      <div className={`pl-8 md:pl-0 ${!isLeft ? '' : 'hidden md:block'}`}>
        {!isLeft && (
          <motion.div style={{ opacity: cardOpacity, x: cardX, y: cardY, filter: cardFilter }}>
            <Card item={item} />
          </motion.div>
        )}
        {/* Mobile: even items show card in col2 */}
        {isLeft && (
          <div className="md:hidden">
            <motion.div style={{ opacity: cardOpacity, y: cardY, filter: cardFilter }}>
              <Card item={item} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ item }: { item: (typeof timeline)[0] }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(255,255,255,0.06)`,
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${item.color}44`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-xs font-bold font-mono px-2 py-0.5 rounded"
          style={{ background: `${item.color}22`, color: item.color }}
        >
          {item.year}
        </span>
        <span
          className="text-xs uppercase tracking-widest font-medium"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {item.type}
        </span>
      </div>
      <h3
        className="font-bold mb-1"
        style={{ fontSize: 17, color: '#ededed', lineHeight: 1.3 }}
      >
        {item.role}
      </h3>
      <span
        className="block mb-3 text-sm font-medium"
        style={{ color: item.color, opacity: 0.8 }}
      >
        {item.company}
      </span>
      <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
        {item.description}
      </p>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // Scroll-driven vertical line (already existed — keep it)
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineHeight = useTransform(lineProgress, [0, 1], ['0%', '100%']);

  // Header: uses its own element scroll
  const { scrollYProgress: headProgress } = useScroll({
    target: headRef,
    offset: ['start end', 'end start'],
  });
  const headOpacity = useTransform(headProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const headY = useTransform(headProgress, [0, 0.25, 0.75, 1], [40, 0, 0, -18]);
  const headBlurRaw = useTransform(headProgress, [0, 0.25], [8, 0]);
  const headFilter = useTransform(headBlurRaw, (v) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} id="timeline" className="relative py-32 px-6">
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%', left: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(123,47,190,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          className="mb-20 text-center"
          style={{ opacity: headOpacity, y: headY, filter: headFilter }}
        >
          <span
            className="block mb-4 font-semibold uppercase tracking-widest"
            style={{ fontSize: 12, color: '#f4a261' }}
          >
            Career
          </span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#ededed', lineHeight: 1.1 }}
          >
            The journey so far
          </h2>
          <p
            className="mt-4 mx-auto max-w-md"
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)' }}
          >
            Every year has been a lesson. Here's the story.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — track */}
          <div
            className="absolute hidden md:block top-0 bottom-0 left-1/2 -translate-x-px"
            style={{ width: 1, background: 'rgba(255,255,255,0.06)' }}
          />
          {/* Scroll-driven fill */}
          <motion.div
            className="absolute hidden md:block top-0 left-1/2 -translate-x-px origin-top"
            style={{
              width: 1,
              height: lineHeight,
              background: 'linear-gradient(to bottom, #7b2fbe, #f4a261)',
            }}
          />

          <div className="flex flex-col gap-16">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year + item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
