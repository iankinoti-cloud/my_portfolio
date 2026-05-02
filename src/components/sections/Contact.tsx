'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const socials = [
  { label: 'GitHub',    href: 'https://github.com/iankinoti-cloud/my_portfolio', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ian-khelan-040371407/', icon: '◈' },
  { label: 'Instagram', href: 'https://www.instagram.com/khelan_websites_kenya', icon: '◇' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Header: float up and clear blur on enter
  const headOpacity = useTransform(scrollYProgress, [0, 0.15, 0.90, 1], [0, 1, 1, 0]);
  const headY = useTransform(scrollYProgress, [0, 0.15, 0.90, 1], [44, 0, 0, -18]);
  const headBlurRaw = useTransform(scrollYProgress, [0, 0.15], [10, 0]);
  const headFilter = useTransform(headBlurRaw, (v) => `blur(${v}px)`);

  // Left column: slides in from left, exits left
  const leftOpacity = useTransform(scrollYProgress, [0.10, 0.30, 0.88, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0.10, 0.30, 0.88, 1], [-60, 0, 0, -24]);
  const leftBlurRaw = useTransform(scrollYProgress, [0.10, 0.30], [8, 0]);
  const leftFilter = useTransform(leftBlurRaw, (v) => `blur(${v}px)`);

  // Right column: slides in from right, exits right
  const rightOpacity = useTransform(scrollYProgress, [0.17, 0.35, 0.88, 1], [0, 1, 1, 0]);
  const rightX = useTransform(scrollYProgress, [0.17, 0.35, 0.88, 1], [60, 0, 0, 24]);
  const rightBlurRaw = useTransform(scrollYProgress, [0.17, 0.35], [8, 0]);
  const rightFilter = useTransform(rightBlurRaw, (v) => `blur(${v}px)`);

  // Footer
  const footerOpacity = useTransform(scrollYProgress, [0.60, 0.78], [0, 1]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('sent');
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6">
      <div
        className="absolute pointer-events-none inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(123,47,190,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          style={{ opacity: headOpacity, y: headY, filter: headFilter }}
        >
          <span
            className="block mb-4 font-semibold uppercase tracking-widest"
            style={{ fontSize: 12, color: '#f4a261' }}
          >
            Contact
          </span>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#ededed', lineHeight: 1.05 }}
          >
            Let's build something
            <br />
            <span style={{ color: '#7b2fbe' }}>remarkable together.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.38)', maxWidth: 480, margin: '0 auto' }}>
            Whether it's a startup, a passion project, or a creative idea you haven't told anyone yet — I'm listening.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — info */}
          <motion.div
            className="flex flex-col gap-8"
            style={{ opacity: leftOpacity, x: leftX, filter: leftFilter }}
          >
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.32)' }}>
                Prefer a direct line?
              </p>
              <a
                href="mailto:kicoinkinoti@gmail.com"
                className="group flex items-center gap-3 font-bold"
                style={{ fontSize: 22, color: '#ededed', textDecoration: 'none' }}
              >
                <span className="group-hover:underline" style={{ textDecorationColor: '#7b2fbe' }}>
                  kicoinkinoti@gmail.com
                </span>
                <motion.span
                  className="text-xl"
                  style={{ color: '#7b2fbe' }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </a>
            </div>

            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full self-start"
              style={{
                background: 'rgba(104,160,99,0.1)',
                border: '1px solid rgba(104,160,99,0.25)',
              }}
            >
              <span
                className="block rounded-full animate-pulse"
                style={{ width: 8, height: 8, background: '#68A063' }}
              />
              <span className="text-sm font-medium" style={{ color: '#68A063' }}>
                Available for new projects
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Find me online
              </p>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium group"
                  style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#c77dff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)')}
                >
                  <span style={{ fontSize: 16, opacity: 0.5 }}>{s.icon}</span>
                  {s.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#7b2fbe' }}>→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            style={{ opacity: rightOpacity, x: rightX, filter: rightFilter }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-16 rounded-2xl"
                style={{ border: '1px solid rgba(123,47,190,0.25)', background: 'rgba(123,47,190,0.05)' }}
              >
                <span style={{ fontSize: 40 }}>✦</span>
                <h3 className="font-bold text-xl" style={{ color: '#ededed' }}>Message sent.</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                  I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Name" id="name" placeholder="Your name" required />
                  <FormField label="Email" id="email" type="email" placeholder="your@email.com" required />
                </div>
                <FormField label="Subject" id="subject" placeholder="What's this about?" />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                    className="rounded-xl px-4 py-3 text-sm resize-none outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      color: '#ededed',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(123,47,190,0.5)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="relative rounded-xl py-3.5 font-semibold text-sm overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #7b2fbe, #9d4edd)',
                    color: '#fff',
                    boxShadow: '0 0 24px rgba(123,47,190,0.35)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <span className="opacity-70">Sending...</span>
                  ) : (
                    'Send Message →'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: footerOpacity,
          }}
        >
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Ian Kinoti. Built with Next.js, Three.js & obsessive attention to detail.
          </span>
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.15)' }}>
            Made in Kenya 🇰🇪
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl px-4 py-3 text-sm outline-none"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          color: '#ededed',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(123,47,190,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
      />
    </div>
  );
}
