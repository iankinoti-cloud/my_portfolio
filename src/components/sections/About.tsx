'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STACK = [
  { name: 'React',      color: '#61DAFB', bg: 'rgba(97,218,251,0.08)'  },
  { name: 'Next.js',    color: '#EDEDED', bg: 'rgba(237,237,237,0.06)' },
  { name: 'TypeScript', color: '#3178C6', bg: 'rgba(49,120,198,0.1)'   },
  { name: 'Tailwind',   color: '#38BDF8', bg: 'rgba(56,189,248,0.08)'  },
  { name: 'Node.js',    color: '#68A063', bg: 'rgba(104,160,99,0.08)'  },
  { name: 'Python',     color: '#F7C948', bg: 'rgba(247,201,72,0.08)'  },
  { name: 'OpenAI',     color: '#10A37F', bg: 'rgba(16,163,127,0.08)'  },
  { name: 'Figma',      color: '#F24E1E', bg: 'rgba(242,78,30,0.08)'   },
  { name: 'Firebase',   color: '#FFCA28', bg: 'rgba(255,202,40,0.08)'  },
  { name: 'Vercel',     color: '#EDEDED', bg: 'rgba(237,237,237,0.06)' },
  { name: 'GSAP',       color: '#88CE02', bg: 'rgba(136,206,2,0.08)'   },
  { name: 'Three.js',   color: '#EDEDED', bg: 'rgba(237,237,237,0.06)' },
];

const WORK_TAGS = [
  'Startup MVPs', 'AI-powered tools', 'Brand experiences',
  'SaaS dashboards', 'Creative websites', 'Design systems',
  'Landing pages', 'Web apps',
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Section separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(123,47,190,0.4), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Section heading */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-20">
            <span className="w-10 h-px" style={{ backgroundColor: '#f4a261' }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#f4a261' }}>
              About
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── LEFT: Who I am + Philosophy ── */}
          <div className="space-y-16">

            {/* Who I am */}
            <FadeIn delay={0.1}>
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6"
                  style={{ color: '#ededed' }}
                >
                  Who I am
                </h2>
                <div className="space-y-4" style={{ color: '#9ca3af' }}>
                  <p className="leading-relaxed text-base">
                    I&apos;m <span style={{ color: '#ededed', fontWeight: 600 }}>Ian Kinoti</span> — a creative developer
                    from <span style={{ color: '#f4a261' }}>Kenya</span> who sits at the intersection of
                    engineering precision and design intuition.
                  </p>
                  <p className="leading-relaxed text-base">
                    I don&apos;t just build websites. I build <em>experiences</em> — the kind where every
                    interaction feels considered, every animation earns its place, and every product
                    solves a real problem beautifully.
                  </p>
                  <p className="leading-relaxed text-base">
                    My edge? I think like a designer, build like an engineer, and move with the urgency
                    a startup needs.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* My Philosophy */}
            <FadeIn delay={0.2}>
              <div
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  backgroundColor: '#0f0f0f',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Quote accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: 'linear-gradient(to right, #7b2fbe, #c77dff)' }}
                />
                <span
                  className="block text-6xl font-bold leading-none mb-4 select-none"
                  style={{ color: 'rgba(123,47,190,0.3)' }}
                >
                  &ldquo;
                </span>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#c77dff' }}>
                  My Philosophy
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#9ca3af' }}>
                  Craftsmanship over shortcuts. I believe the difference between good and great
                  lives in the details no one told you to care about — the easing of an animation,
                  the weight of a typeface, the silence between interactions.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: Stack + Work I enjoy ── */}
          <div className="space-y-16">

            {/* My Stack */}
            <FadeIn delay={0.15}>
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-6"
                  style={{ color: '#ededed' }}
                >
                  My Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {STACK.map((tech, i) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition-all"
                      style={{
                        color: tech.color,
                        backgroundColor: tech.bg,
                        border: `1px solid ${tech.color}22`,
                      }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Work I enjoy */}
            <FadeIn delay={0.25}>
              <div>
                <h2
                  className="text-3xl lg:text-4xl font-bold mb-2"
                  style={{ color: '#ededed' }}
                >
                  Work I enjoy
                </h2>
                <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
                  The kind of problems that get me out of bed.
                </p>
                <div className="flex flex-wrap gap-3">
                  {WORK_TAGS.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg text-sm cursor-default"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#d1d5db',
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}
