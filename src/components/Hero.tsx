import { motion } from 'framer-motion'
import { useRef } from 'react'

/* ─── Original anime-style SVG character ─────────────────────────────────── */
function AnimeCharacter() {
  return (
    <svg
      viewBox="0 0 280 480"
      width="280"
      height="480"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Original anime student character"
    >
      {/* ── Backpack ── */}
      <rect x="168" y="190" width="46" height="64" rx="8" fill="#2A2010" />
      <rect x="172" y="196" width="38" height="20" rx="4" fill="#1A1510" />
      <rect x="175" y="200" width="32" height="12" rx="2" fill="#D4521A" opacity="0.7" />
      <rect x="172" y="220" width="38" height="6" rx="2" fill="#3A3020" />
      <line x1="182" y1="190" x2="178" y2="178" stroke="#2A2010" strokeWidth="4" strokeLinecap="round"/>
      <line x1="202" y1="190" x2="206" y2="178" stroke="#2A2010" strokeWidth="4" strokeLinecap="round"/>

      {/* ── Legs ── */}
      {/* Left leg */}
      <rect x="118" y="340" width="28" height="90" rx="6" fill="#2A2010" />
      {/* Right leg */}
      <rect x="152" y="340" width="28" height="90" rx="6" fill="#2A2010" />
      {/* Left shoe */}
      <ellipse cx="132" cy="430" rx="18" ry="8" fill="#1A1510" />
      <rect x="114" y="424" width="36" height="10" rx="5" fill="#1A1510" />
      {/* Right shoe */}
      <ellipse cx="166" cy="430" rx="18" ry="8" fill="#1A1510" />
      <rect x="148" y="424" width="36" height="10" rx="5" fill="#1A1510" />

      {/* ── Jacket body ── */}
      {/* Main body */}
      <path d="M108,200 L90,210 L86,340 L214,340 L210,210 L192,200 Z" fill="#2A2010" />
      {/* Jacket lapels */}
      <path d="M140,202 L128,220 L150,240 Z" fill="#1A1510" />
      <path d="M160,202 L172,220 L150,240 Z" fill="#1A1510" />
      {/* Center seam */}
      <line x1="150" y1="240" x2="150" y2="340" stroke="#1A1510" strokeWidth="2" />
      {/* Jacket pockets */}
      <rect x="98" y="280" width="26" height="18" rx="3" fill="#1A1510" opacity="0.5" />
      <rect x="176" y="280" width="26" height="18" rx="3" fill="#1A1510" opacity="0.5" />

      {/* ── Shirt / inner ── */}
      <path d="M128,202 L150,240 L172,202 L163,198 L150,215 L137,198 Z" fill="#F4EDD8" />

      {/* ── Arms ── */}
      {/* Left arm — raised/reaching forward */}
      <path d="M108,210 Q80,230 68,260 Q60,280 64,295 L78,290 Q76,275 84,255 Q96,228 118,220 Z" fill="#2A2010" />
      {/* Left hand */}
      <ellipse cx="70" cy="298" rx="10" ry="12" fill="#F4EDD8" />
      {/* Right arm — slightly angled */}
      <path d="M192,210 Q214,232 220,265 Q224,285 218,300 L204,295 Q208,280 204,260 Q198,232 180,218 Z" fill="#2A2010" />
      {/* Right hand */}
      <ellipse cx="212" cy="303" rx="10" ry="12" fill="#F4EDD8" />

      {/* ── Neck ── */}
      <rect x="142" y="158" width="16" height="20" rx="4" fill="#F4EDD8" />

      {/* ── Head ── */}
      {/* Head shape */}
      <ellipse cx="150" cy="128" rx="46" ry="52" fill="#F4EDD8" />
      {/* Chin / jaw taper */}
      <path d="M116,145 Q118,175 150,180 Q182,175 184,145 Z" fill="#F4EDD8" />

      {/* ── Hair ── */}
      {/* Base hair */}
      <path d="M104,120 Q100,80 126,68 Q140,60 152,62 Q170,58 180,70 Q200,82 196,120 Z" fill="#1A1510" />
      {/* Forehead hair fall */}
      <path d="M104,118 Q96,100 104,88 L112,105 Z" fill="#1A1510" />
      {/* Spiky top strand 1 */}
      <path d="M130,68 Q128,44 140,36 Q142,56 144,66 Z" fill="#1A1510" />
      {/* Spiky top strand 2 */}
      <path d="M144,65 Q148,40 158,32 Q158,52 156,66 Z" fill="#1A1510" />
      {/* Spiky top strand 3 */}
      <path d="M156,67 Q162,44 172,42 Q168,58 164,70 Z" fill="#1A1510" />
      {/* Side hair right */}
      <path d="M196,112 Q204,100 200,120 Q198,132 192,138 Z" fill="#1A1510" />
      {/* Side hair left */}
      <path d="M104,112 Q96,100 100,120 Q102,132 108,138 Z" fill="#1A1510" />
      {/* Back hair left fringe */}
      <path d="M106,118 Q104,130 108,142 L116,130 Z" fill="#1A1510" />

      {/* ── Face features ── */}
      {/* Eyebrows — sharp determined */}
      <path d="M122,108 Q130,104 138,107" stroke="#1A1510" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M163,107 Q170,104 178,108" stroke="#1A1510" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Left eye */}
      <ellipse cx="130" cy="118" rx="9" ry="10" fill="white" />
      <ellipse cx="131" cy="119" rx="6" ry="7" fill="#1A1510" />
      <ellipse cx="133" cy="117" rx="2" ry="2" fill="white" />
      {/* Left eye line */}
      <path d="M121,114 Q130,110 139,114" stroke="#1A1510" strokeWidth="1.5" fill="none"/>
      <path d="M121,122 Q130,127 139,122" stroke="#1A1510" strokeWidth="1.5" fill="none"/>

      {/* Right eye */}
      <ellipse cx="170" cy="118" rx="9" ry="10" fill="white" />
      <ellipse cx="171" cy="119" rx="6" ry="7" fill="#1A1510" />
      <ellipse cx="173" cy="117" rx="2" ry="2" fill="white" />
      {/* Right eye line */}
      <path d="M161,114 Q170,110 179,114" stroke="#1A1510" strokeWidth="1.5" fill="none"/>
      <path d="M161,122 Q170,127 179,122" stroke="#1A1510" strokeWidth="1.5" fill="none"/>

      {/* Nose */}
      <path d="M148,135 Q150,142 155,140" stroke="#C4A882" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Mouth — determined half-smile */}
      <path d="M138,153 Q150,160 162,153" stroke="#1A1510" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M138,153 Q136,148 139,146" stroke="#1A1510" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* ── Scarf/necktie ── */}
      <path d="M138,175 L144,198 L150,210 L156,198 L162,175 Q156,172 150,172 Q144,172 138,175 Z" fill="#D4521A" />
      <path d="M142,185 L150,200 L158,185 Q154,182 150,182 Q146,182 142,185 Z" fill="#A83A10" />

      {/* ── Badge/pin on jacket ── */}
      <circle cx="108" cy="244" r="7" fill="#D4521A" />
      <text x="108" y="247" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">JP</text>
    </svg>
  )
}

/* ─── Floating scattered letters ─────────────────────────────────────────── */
const floatingLetters = [
  { letter: 'A', top: '12%', left: '7%', size: '5vw', rotate: '-12deg', animClass: 'float-a', opacity: 0.35, delay: 0 },
  { letter: 'J', top: '25%', left: '3%', size: '3.5vw', rotate: '8deg', animClass: 'float-b', opacity: 0.25, delay: 0.3 },
  { letter: 'P', top: '68%', left: '6%', size: '4.5vw', rotate: '20deg', animClass: 'float-c', opacity: 0.3, delay: 0.6 },
  { letter: 'N', top: '80%', left: '14%', size: '3vw', rotate: '-5deg', animClass: 'float-d', opacity: 0.2, delay: 0.4 },
  { letter: 'I', top: '18%', right: '8%', size: '4vw', rotate: '15deg', animClass: 'float-e', opacity: 0.28, delay: 0.2 },
  { letter: 'A', top: '55%', right: '5%', size: '5.5vw', rotate: '-18deg', animClass: 'float-a', opacity: 0.22, delay: 0.7 },
  { letter: 'K', top: '74%', right: '10%', size: '3.8vw', rotate: '10deg', animClass: 'float-b', opacity: 0.3, delay: 0.5 },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[700px] overflow-hidden flex flex-col"
      style={{ background: '#FBF0E8' }}
    >
      {/* ── Minimal top nav ─────────────────────────────────────────────── */}
      <nav className="relative z-30 flex items-center justify-between px-8 pt-6">
        <span
          className="font-display text-2xl tracking-widest"
          style={{ color: '#D4521A' }}
        >
          akki.
        </span>
        <span
          className="hidden md:block text-xs tracking-[0.25em] uppercase"
          style={{ color: '#9A8C72' }}
        >
          Japan Mission Portal
        </span>
        <span
          className="text-sm tracking-widest"
          style={{ color: '#9A8C72' }}
        >
          ···
        </span>
      </nav>

      {/* ── Giant background typography ─────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center leading-none pointer-events-none select-none overflow-hidden"
        style={{ paddingTop: '48px' }}
      >
        <motion.div
          className="font-display text-center"
          style={{
            fontSize: 'clamp(80px, 18vw, 260px)',
            color: '#D4521A',
            lineHeight: 0.88,
            opacity: 0.18,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.18, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          AKKI
        </motion.div>
        <motion.div
          className="font-display text-center"
          style={{
            fontSize: 'clamp(80px, 18vw, 260px)',
            color: '#D4521A',
            lineHeight: 0.88,
            opacity: 0.15,
            letterSpacing: '-0.02em',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          JAPAN
        </motion.div>
        <motion.div
          className="font-display text-center"
          style={{
            fontSize: 'clamp(60px, 14vw, 200px)',
            color: '#D4521A',
            lineHeight: 0.88,
            opacity: 0.13,
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.13, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          MISSION
        </motion.div>
      </div>

      {/* ── Floating scattered letters ────────────────────────────────────── */}
      {floatingLetters.map((l, i) => (
        <motion.span
          key={i}
          className={`absolute font-display pointer-events-none select-none ${l.animClass}`}
          style={{
            top: l.top,
            left: 'left' in l ? (l as { left: string }).left : undefined,
            right: 'right' in l ? (l as { right: string }).right : undefined,
            fontSize: l.size,
            color: '#D4521A',
            opacity: l.opacity,
            transform: `rotate(${l.rotate})`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: l.opacity }}
          transition={{ duration: 0.8, delay: 0.6 + l.delay }}
        >
          {l.letter}
        </motion.span>
      ))}

      {/* ── Vertical side text ───────────────────────────────────────────── */}
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex items-center"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        <motion.span
          className="font-display text-xs tracking-[0.35em] uppercase"
          style={{ color: '#9A8C72' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          MISSION 2026
        </motion.span>
      </div>

      <div
        className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex items-center"
        style={{
          writingMode: 'vertical-rl',
        }}
      >
        <motion.span
          className="font-display text-xs tracking-[0.35em] uppercase"
          style={{ color: '#9A8C72' }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          INDIA → JAPAN
        </motion.span>
      </div>

      {/* ── Warm orange glow circle behind character ──────────────────────── */}
      <motion.div
        className="absolute"
        style={{
          width: 'clamp(240px, 38vw, 520px)',
          height: 'clamp(240px, 38vw, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,82,26,0.22) 0%, rgba(232,105,58,0.10) 45%, transparent 72%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-20%, -50%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Left text block ───────────────────────────────────────────────── */}
      <motion.div
        className="absolute z-20 hidden lg:block"
        style={{ left: '10%', top: '50%', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="font-display leading-none mb-3"
          style={{
            fontSize: 'clamp(48px, 6vw, 90px)',
            color: '#1A1510',
            letterSpacing: '-0.01em',
          }}
        >
          AKKI
        </div>
        <div
          className="font-display leading-none mb-3"
          style={{
            fontSize: 'clamp(48px, 6vw, 90px)',
            color: '#D4521A',
            letterSpacing: '-0.01em',
          }}
        >
          JAPAN
        </div>
        <div
          className="font-display leading-none mb-6"
          style={{
            fontSize: 'clamp(32px, 4vw, 60px)',
            color: '#1A1510',
            letterSpacing: '-0.01em',
            opacity: 0.7,
          }}
        >
          MISSION
        </div>
        <p
          className="text-xs tracking-widest uppercase mb-6 max-w-xs"
          style={{ color: '#9A8C72', lineHeight: 2 }}
        >
          From India. To Japan.<br />Every step tracked.
        </p>
        <button
          onClick={scrollToContent}
          className="text-xs tracking-[0.25em] uppercase font-semibold px-6 py-3 transition-all duration-300"
          style={{
            background: '#D4521A',
            color: '#FBF0E8',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E8693A' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#D4521A' }}
        >
          Enter Mission
        </button>
      </motion.div>

      {/* Mobile text block (visible on mobile only) */}
      <motion.div
        className="absolute z-20 lg:hidden text-center"
        style={{ top: '22%', left: '50%', transform: 'translateX(-50%)', width: '80%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
      >
        <div
          className="font-display leading-none"
          style={{ fontSize: 'clamp(42px, 14vw, 80px)', color: '#1A1510' }}
        >
          AKKI
        </div>
        <div
          className="font-display leading-none"
          style={{ fontSize: 'clamp(42px, 14vw, 80px)', color: '#D4521A' }}
        >
          JAPAN
        </div>
        <button
          onClick={scrollToContent}
          className="mt-6 text-xs tracking-[0.25em] uppercase font-semibold px-6 py-3 transition-all duration-300"
          style={{ background: '#D4521A', color: '#FBF0E8' }}
        >
          Enter Mission
        </button>
      </motion.div>

      {/* ── Anime character ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute z-20"
        style={{
          right: '12%',
          bottom: '8%',
          width: 'clamp(160px, 22vw, 300px)',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimeCharacter />
      </motion.div>

      {/* ── Stats row (bottom center) ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-16 left-0 right-0 hidden md:flex items-center justify-center gap-12 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        {[
          { value: '8', label: 'Phases' },
          { value: '5', label: 'Universities' },
          { value: '4', label: 'Scholarships' },
          { value: '11', label: 'Documents' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.08 }}
          >
            <div
              className="font-display"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#D4521A', lineHeight: 1 }}
            >
              {stat.value}
            </div>
            <div
              className="text-xs tracking-widest uppercase mt-1"
              style={{ color: '#9A8C72' }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Bottom pagination dots ────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        <div
          className="w-6 h-1.5 rounded-full"
          style={{ background: '#D4521A' }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#D4521A', opacity: 0.3 }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#D4521A', opacity: 0.3 }}
        />
      </div>
    </section>
  )
}
