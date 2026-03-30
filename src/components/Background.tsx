import { motion } from 'framer-motion'
import { useMemo } from 'react'

function SentinelFigure() {
  return (
    <svg viewBox="0 0 160 440" width="160" height="440" xmlns="http://www.w3.org/2000/svg">
      <g fill="#1A1510">
        <ellipse cx="80" cy="44" rx="26" ry="30" />
        <path d="M54,34 Q52,10 70,6 Q80,2 90,6 Q108,10 106,34 Z" />
        <path d="M68,8 Q66,-8 78,-14 Q80,4 82,8 Z" />
        <path d="M82,7 Q86,-10 96,-8 Q92,6 88,10 Z" />
        <path d="M58,18 Q52,2 62,-2 Q64,12 66,18 Z" />
        <rect x="73" y="70" width="14" height="16" rx="4" />
        <path d="M46,86 L36,190 L44,320 L62,360 L80,375 L98,360 L116,320 L124,190 L114,86 Z" />
        <path d="M46,120 Q14,165 10,255 Q7,310 30,355 L46,330 Q28,294 34,244 Q42,188 56,152 Z" />
        <path d="M114,120 Q146,165 150,255 Q153,310 130,355 L114,330 Q132,294 126,244 Q118,188 104,152 Z" />
        <path d="M46,92 Q18,135 16,195 L34,192 Q36,146 54,110 Z" />
        <path d="M114,92 Q142,135 144,195 L126,192 Q124,146 106,110 Z" />
        <rect x="60" y="368" width="18" height="72" rx="6" />
        <rect x="82" y="368" width="18" height="72" rx="6" />
        <path d="M62,80 Q72,94 80,88 Q88,94 98,80 Q92,73 80,71 Q68,73 62,80 Z" />
        <rect x="106" y="98" width="28" height="52" rx="7" />
        <rect x="110" y="104" width="20" height="14" rx="4" />
      </g>
    </svg>
  )
}

function ScoutFigure() {
  return (
    <svg viewBox="0 0 160 400" width="160" height="400" xmlns="http://www.w3.org/2000/svg">
      <g fill="#1A1510">
        <ellipse cx="78" cy="38" rx="24" ry="28" />
        <path d="M54,28 Q52,6 72,2 Q80,0 88,4 Q104,10 100,28 Z" />
        <path d="M70,4 Q68,-10 80,-14 Q82,2 80,6 Z" />
        <path d="M84,5 Q88,-8 98,-6 Q94,8 90,10 Z" />
        <rect x="72" y="62" width="12" height="14" rx="3" />
        <path d="M48,76 L38,178 L54,300 L76,328 L82,328 L104,300 L120,178 L110,76 Z" />
        <path d="M48,86 Q12,112 2,162 Q-4,188 6,202 L22,194 Q16,174 22,156 Q36,122 56,104 Z" />
        <ellipse cx="12" cy="200" rx="11" ry="9" />
        <path d="M110,86 Q138,118 140,168 L124,168 Q122,128 104,102 Z" />
        <path d="M108,98 Q152,134 158,200 Q162,252 142,298 L122,286 Q138,248 134,198 Q128,148 106,118 Z" />
        <path d="M68,322 L60,392 L78,392 L84,326 Z" />
        <path d="M88,322 L102,382 L118,376 L104,316 Z" />
      </g>
    </svg>
  )
}

// Cherry blossom petal SVG
function Petal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10,2 Q14,6 14,10 Q14,16 10,18 Q6,16 6,10 Q6,6 10,2 Z"
        fill="rgba(212,82,26,0.35)"
      />
      <path
        d="M10,2 Q16,4 17,9 Q16,14 10,18 Q8,12 8,8 Q8,4 10,2 Z"
        fill="rgba(200,155,60,0.2)"
      />
    </svg>
  )
}

const kanjiList = [
  { char: '旅', top: '8%',  left: '18%', size: '20vw', opacity: 0.04, duration: 22 },
  { char: '夢', top: '42%', right: '12%', size: '16vw', opacity: 0.035, duration: 28 },
  { char: '力', top: '4%',  right: '28%', size: '10vw', opacity: 0.028, duration: 18 },
  { char: '日', top: '58%', left: '6%',  size: '13vw', opacity: 0.03, duration: 24 },
  { char: '道', top: '25%', left: '42%', size: '8vw',  opacity: 0.022, duration: 32 },
  { char: '桜', top: '72%', right: '22%', size: '9vw', opacity: 0.025, duration: 20 },
]

export default function Background() {
  // Seeded random petals so they don't recalculate on re-render
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const seed = i * 137.508
    return {
      id: i,
      x: (seed % 100),
      size: 8 + (i % 5) * 3,
      delay: (i * 1.1) % 12,
      duration: 8 + (i % 6) * 2,
      drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 15),
      rotation: i % 2 === 0 ? 180 : -180,
      opacity: 0.4 + (i % 4) * 0.12,
    }
  }), [])

  // Floating orbs
  const orbs = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 10 + i * 15,
    y: 15 + (i % 3) * 25,
    size: 80 + i * 40,
    duration: 14 + i * 4,
    delay: i * 2.5,
    color: i % 2 === 0 ? 'rgba(212,82,26,0.04)' : 'rgba(200,155,60,0.03)',
  })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* Deep ambient gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,82,26,0.07) 0%, transparent 65%)'
      }} />

      {/* Animated aurora wave at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '35%' }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,82,26,0.06) 0%, transparent 70%)'
        }} />
      </motion.div>

      {/* Floating orbs */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Falling cherry blossom petals */}
      {petals.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: '-30px', opacity: p.opacity }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift, p.drift * 0.5, p.drift * 1.2],
            rotate: [0, p.rotation],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        >
          <Petal size={p.size} />
        </motion.div>
      ))}

      {/* Floating kanji */}
      {kanjiList.map((k, i) => (
        <motion.div
          key={i}
          className="absolute font-display select-none"
          style={{
            top: k.top,
            left: 'left' in k ? k.left : undefined,
            right: 'right' in k ? k.right : undefined,
            fontSize: k.size,
            color: '#1A1510',
            opacity: k.opacity,
            lineHeight: 1,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 10, 0],
            rotate: [0, 2, -1, 0],
          }}
          transition={{
            duration: k.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 3,
          }}
        >
          {k.char}
        </motion.div>
      ))}

      {/* Drifting dot particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: i % 2 === 0 ? 'rgba(212,82,26,0.25)' : 'rgba(200,155,60,0.2)',
          }}
          animate={{
            y: [0, -40, 20, 0],
            x: [0, 20, -10, 0],
            opacity: [0.2, 0.6, 0.1, 0.2],
          }}
          transition={{
            duration: 10 + (i % 5) * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Thin scan lines — editorial grid feel */}
      <div className="absolute left-0 right-0" style={{ top: '33%', height: '1px', background: 'rgba(26,21,16,0.03)' }} />
      <div className="absolute left-0 right-0" style={{ top: '66%', height: '1px', background: 'rgba(26,21,16,0.03)' }} />


      {/* Figure B — Levi (left, replacing sentinel) */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: '-80px', opacity: 1, height: '80vh', pointerEvents: 'none', zIndex: 5 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      >
        <img
          src="/levi.png"
          alt=""
          style={{ height: '100%', width: 'auto', objectFit: 'contain', display: 'block' }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
