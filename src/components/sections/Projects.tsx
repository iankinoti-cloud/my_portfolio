'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from 'framer-motion';

const projects = [
  {
    title: 'Brand Identity System',
    category: 'Design · Branding',
    description:
      'Full visual identity for a Nairobi-based fintech — logo, design system, marketing site, and onboarding flow.',
    tech: ['Figma', 'Next.js', 'Tailwind'],
    year: '2024',
    color: '#7b2fbe',
    featured: true,
  },
  {
    title: 'AI Content Studio',
    category: 'Product · AI',
    description:
      'An AI-powered writing tool for content creators — GPT-4 integration, custom prompts, and real-time collaboration.',
    tech: ['Next.js', 'OpenAI', 'Firebase'],
    year: '2024',
    color: '#f4a261',
    featured: true,
  },
  {
    title: 'SaaS Dashboard',
    category: 'Engineering · UI',
    description:
      'Analytics dashboard for a logistics startup tracking 50k+ daily shipments. Real-time charts, role-based auth.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    year: '2023',
    color: '#c77dff',
    featured: false,
  },
  {
    title: 'Creative Agency Site',
    category: 'Creative · Motion',
    description:
      'Bespoke portfolio site for a creative agency — GSAP scroll scenes, Three.js hero, and a custom CMS.',
    tech: ['Next.js', 'GSAP', 'Three.js'],
    year: '2023',
    color: '#48cae4',
    featured: false,
  },
  {
    title: 'E-commerce Platform',
    category: 'Engineering · Commerce',
    description:
      'End-to-end online store with M-Pesa payments, inventory management, and a mobile-first checkout.',
    tech: ['Next.js', 'Stripe', 'Sanity'],
    year: '2023',
    color: '#68A063',
    featured: false,
  },
];

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: (typeof projects)[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const enter0 = 0.03 + index * 0.07;
  const enter1 = enter0 + 0.17;
  const exit0 = 0.80;
  const exit1 = 0.93;

  const opacity = useTransform(progress, [enter0, enter1, exit0, exit1], [0, 1, 1, 0]);
  const y = useTransform(progress, [enter0, enter1, exit0, exit1], [64, 0, 0, -24]);
  const scale = useTransform(progress, [enter0, enter1], [0.91, 1]);
  const blurRaw = useTransform(progress, [enter0, enter1], [10, 0]);
  const filter = useTransform(blurRaw, (v) => `blur(${v}px)`);

  // 3D tilt
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
    <motion.div style={{ opacity, y, scale, filter }}>
      <motion.div
        ref={cardRef}
        className="group relative rounded-2xl overflow-hidden cursor-pointer h-full"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          rotateX: springRX,
          rotateY: springRY,
          transformPerspective: 800,
        }}
        onMouseMove={onTiltMove}
        onMouseLeave={onTiltLeave}
        whileHover={{ y: -5, borderColor: `${project.color}55` }}
        data-cursor="hover"
      >
        <div style={{ height: 3, background: project.color }} />

        <div className="p-7">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span
                className="block mb-1 text-xs font-medium uppercase tracking-widest"
                style={{ color: project.color, opacity: 0.85 }}
              >
                {project.category}
              </span>
              <h3
                className="font-bold"
                style={{ fontSize: 19, color: '#ededed', lineHeight: 1.25 }}
              >
                {project.title}
              </h3>
            </div>
            <span
              className="text-xs font-mono shrink-0 ml-4 mt-1"
              style={{ color: 'rgba(255,255,255,0.22)' }}
            >
              {project.year}
            </span>
          </div>

          <p
            className="mb-5 leading-relaxed"
            style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}
          >
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.38)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4"
              style={{ color: project.color }}
            >
              View →
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headOpacity = useTransform(scrollYProgress, [0, 0.10, 0.85, 0.96], [0, 1, 1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.10, 0.85, 0.96], [44, 0, 0, -20]);
  const headBlurRaw = useTransform(scrollYProgress, [0, 0.10], [8, 0]);
  const headFilter = useTransform(headBlurRaw, (v) => `blur(${v}px)`);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="work" className="relative py-32 px-6">
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%', right: '-8%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(244,162,97,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 flex items-end justify-between"
          style={{ opacity: headOpacity, y: headY, filter: headFilter }}
        >
          <div>
            <span
              className="block mb-4 font-semibold uppercase tracking-widest"
              style={{ fontSize: 12, color: '#f4a261' }}
            >
              Selected Work
            </span>
            <h2
              className="font-bold"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#ededed', lineHeight: 1.1 }}
            >
              Projects that
              <br />
              <span style={{ color: '#7b2fbe' }}>made an impact</span>
            </h2>
          </div>
          <span
            className="hidden md:block text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            {projects.length} projects
          </span>
        </motion.div>

        {/* Featured (2-col) */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} progress={scrollYProgress} />
          ))}
        </div>

        {/* Rest (3-col) */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {rest.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i + 2} progress={scrollYProgress} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.55, 0.70], [0, 1]),
            y: useTransform(scrollYProgress, [0.55, 0.70], [24, 0]),
          }}
        >
          <a
            href="https://github.com/iankinoti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.55)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#7b2fbe';
              (e.currentTarget as HTMLElement).style.color = '#c77dff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
            }}
          >
            See all on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

