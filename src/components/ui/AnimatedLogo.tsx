'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedLogoProps {
  size?: number;       // width in px
  showText?: boolean;  // show "CREATIVE" label below
  className?: string;
}

export default function AnimatedLogo({ size = 56, showText = false, className = '' }: AnimatedLogoProps) {
  return (
    <motion.div
      className={`relative flex flex-col items-center ${className}`}
      initial={{ opacity: 0, scale: 0.7, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
    >
      {/* Glow behind logo — animates on hover */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(123,47,190,0.5) 0%, rgba(244,162,97,0.2) 50%, transparent 70%)',
          filter: 'blur(12px)',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />

      {/* Logo image — mix-blend-mode:screen makes black bg transparent */}
      <motion.div
        style={{
          width: size,
          height: size,
          position: 'relative',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/iancreative.png"
          alt="Ian Creative logo"
          fill
          sizes={`${size}px`}
          style={{
            objectFit: 'contain',
            filter: 'brightness(1.1) contrast(1.05)',
          }}
          priority
        />

        {/* Purple shimmer sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(199,125,255,0.35) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          initial={{ backgroundPosition: '-100% 0' }}
          whileHover={{ backgroundPosition: '200% 0' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </motion.div>

      {showText && (
        <motion.span
          className="text-xs font-semibold tracking-[0.25em] mt-1 uppercase"
          style={{ color: 'rgba(199,125,255,0.7)' }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Creative
        </motion.span>
      )}
    </motion.div>
  );
}
