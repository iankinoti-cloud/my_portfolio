'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Production-grade web applications — fast, accessible, and built to scale. From startup MVPs to full SaaS platforms.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'APIs'],
    color: '#7b2fbe',
    glow: 'rgba(123,47,190,0.25)',
  },
  {
    number: '02',
    title: 'UI / UX Design',
    description:
      'Interfaces that feel inevitable. I design with Figma, prototype in code, and care obsessively about the 1px decisions.',
    tags: ['Figma', 'Framer', 'Design Systems', 'Prototyping'],
    color: '#c77dff',
    glow: 'rgba(199,125,255,0.2)',
  },
  {
    number: '03',
    title: 'AI-Powered Products',
    description:
      'Integrating LLMs, computer vision, and automation into real products that solve real problems — not demos.',
    tags: ['OpenAI', 'LangChain', 'Python', 'Firebase'],
    color: '#f4a261',
    glow: 'rgba(244,162,97,0.2)',
  },
  {
    number: '04',
    title: 'Creative Direction',
    description:
      'Brand identity, motion, and digital presence. I help startups and creators look world-class from day one.',
    tags: ['Branding', 'Motion', 'Three.js', 'GSAP'],
    color: '#48cae4',
    glow: 'rgba(72,202,228,0.18)',
  },
];

// Each card gets the section's scrollYProgress + its index.
// It maps its own slice of that 0→1 range so cards assemble one-by-one.
// Reversing scroll un-assembles them in the same order.
function ServiceCard({
  service,
  index,
  progress,
}: {
  service: (typeof services)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const enter0 = 0.03 + index * 0.07; // each card starts 7% later
  const enter1 = enter0 + 0.17;
  const exit0 = 0.80;
  const exit1 = 0.93;

  const opacity = useTransform(progress, [enter0, enter1, exit0, exit1], [0, 1, 1, 0]);
  const y = useTransform(progress, [enter0, enter1, exit0, exit1], [70, 0, 0, -28]);
  const scale = useTransform(progress, [enter0, enter1], [0.90, 1]);
  const blurRaw = useTransform(progress, [enter0, enter1], [10, 0]);
  const filter = useTransform(blurRaw, (v) => `blur(${v}px)`);

  // 3D tilt on hover
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRX = useSpring(rotX, { stiffness: 320, damping: 28 });
  const springRY = useSpring(rotY, { stiffness: 320, damping: 28 });

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rotY.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 9);
    rotX.set(-((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 6);
  };
  const onTiltLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    // outer div: scroll-linked transforms
    <motion.div style={{ opacity, y, scale, filter }}>
      {/* inner div: hover tilt + glow */}
      <motion.div
        ref={cardRef}
        className="group relative rounded-2xl p-8 cursor-default overflow-hidden h-full"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          rotateX: springRX,
          rotateY: springRY,
          transformPerspective: 800,
        }}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
        whileHover={{ y: -5, borderColor: `${service.color}55` }}
        data-cursor="hover"
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${service.glow} 0%, transparent 65%)`,
            transition: 'opacity 0.4s',
          }}
        />
        {/* Top border accent on hover */}
        <motion.div
          className="absolute top-0 left-8 right-8 h-px rounded-full pointer-events-none"
          style={{ background: service.color }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <span
          className="block font-bold mb-4"
          style={{ fontSize: 13, color: service.color, letterSpacing: '0.2em' }}
        >
          {service.number}
        </span>

        <h3
          className="font-bold mb-3"
          style={{ fontSize: 22, color: '#ededed', lineHeight: 1.25 }}
        >
          {service.title}
        </h3>

        <p
          className="mb-6 leading-relaxed"
          style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.48)' }}
        >
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100"
          style={{ color: service.color, fontSize: 20, transition: 'opacity 0.3s' }}
          initial={{ x: -6 }}
          whileHover={{ x: 0 }}
        >
          →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header assembles first, exits subtly
  const headOpacity = useTransform(scrollYProgress, [0, 0.10, 0.85, 0.96], [0, 1, 1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.10, 0.85, 0.96], [44, 0, 0, -20]);
  const headBlurRaw = useTransform(scrollYProgress, [0, 0.10], [8, 0]);
  const headFilter = useTransform(headBlurRaw, (v) => `blur(${v}px)`);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-6"
      style={{ background: 'transparent' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '-10%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(123,47,190,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          style={{ opacity: headOpacity, y: headY, filter: headFilter }}
        >
          <span
            className="block mb-4 font-semibold uppercase tracking-widest"
            style={{ fontSize: 12, color: '#f4a261' }}
          >
            What I Do
          </span>
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#ededed', lineHeight: 1.1 }}
          >
            Crafting digital experiences
            <br />
            <span style={{ color: '#7b2fbe' }}>across every layer</span>
          </h2>
        </motion.div>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

