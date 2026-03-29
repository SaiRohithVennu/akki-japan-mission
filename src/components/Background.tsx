import { motion } from 'framer-motion'

function SentinelFigure() {
  return (
    <svg viewBox="0 0 160 440" width="160" height="440" xmlns="http://www.w3.org/2000/svg">
      <g fill="#1A1510">
        {/* Head */}
        <ellipse cx="80" cy="44" rx="26" ry="30" />
        {/* Spiky hair */}
        <path d="M54,34 Q52,10 70,6 Q80,2 90,6 Q108,10 106,34 Z" />
        <path d="M68,8 Q66,-8 78,-14 Q80,4 82,8 Z" />
        <path d="M82,7 Q86,-10 96,-8 Q92,6 88,10 Z" />
        <path d="M58,18 Q52,2 62,-2 Q64,12 66,18 Z" />
        {/* Neck */}
        <rect x="73" y="70" width="14" height="16" rx="4" />
        {/* Body / long coat */}
        <path d="M46,86 L36,190 L44,320 L62,360 L80,375 L98,360 L116,320 L124,190 L114,86 Z" />
        {/* Coat flare left */}
        <path d="M46,120 Q14,165 10,255 Q7,310 30,355 L46,330 Q28,294 34,244 Q42,188 56,152 Z" />
        {/* Coat flare right */}
        <path d="M114,120 Q146,165 150,255 Q153,310 130,355 L114,330 Q132,294 126,244 Q118,188 104,152 Z" />
        {/* Left arm */}
        <path d="M46,92 Q18,135 16,195 L34,192 Q36,146 54,110 Z" />
        {/* Right arm */}
        <path d="M114,92 Q142,135 144,195 L126,192 Q124,146 106,110 Z" />
        {/* Legs */}
        <rect x="60" y="368" width="18" height="72" rx="6" />
        <rect x="82" y="368" width="18" height="72" rx="6" />
        {/* Scarf */}
        <path d="M62,80 Q72,94 80,88 Q88,94 98,80 Q92,73 80,71 Q68,73 62,80 Z" />
        {/* Backpack */}
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
        {/* Head */}
        <ellipse cx="78" cy="38" rx="24" ry="28" />
        {/* Hair */}
        <path d="M54,28 Q52,6 72,2 Q80,0 88,4 Q104,10 100,28 Z" />
        <path d="M70,4 Q68,-10 80,-14 Q82,2 80,6 Z" />
        <path d="M84,5 Q88,-8 98,-6 Q94,8 90,10 Z" />
        {/* Neck */}
        <rect x="72" y="62" width="12" height="14" rx="3" />
        {/* Leaning body */}
        <path d="M48,76 L38,178 L54,300 L76,328 L82,328 L104,300 L120,178 L110,76 Z" />
        {/* Forward-pointing arm */}
        <path d="M48,86 Q12,112 2,162 Q-4,188 6,202 L22,194 Q16,174 22,156 Q36,122 56,104 Z" />
        {/* Pointing hand */}
        <ellipse cx="12" cy="200" rx="11" ry="9" />
        {/* Back arm */}
        <path d="M110,86 Q138,118 140,168 L124,168 Q122,128 104,102 Z" />
        {/* Flowing cape behind */}
        <path d="M108,98 Q152,134 158,200 Q162,252 142,298 L122,286 Q138,248 134,198 Q128,148 106,118 Z" />
        {/* Legs in mid-stride */}
        <path d="M68,322 L60,392 L78,392 L84,326 Z" />
        <path d="M88,322 L102,382 L118,376 L104,316 Z" />
      </g>
    </svg>
  )
}

const kanji = [
  { char: '旅', top: '10%', left: '20%', size: '22vw', opacity: 0.035, duration: 22 },
  { char: '夢', top: '45%', right: '15%', size: '18vw', opacity: 0.03, duration: 28 },
  { char: '力', top: '5%',  right: '30%', size: '12vw', opacity: 0.025, duration: 18 },
  { char: '日', top: '60%', left: '8%',  size: '15vw', opacity: 0.03, duration: 24 },
]

export default function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* Ambient gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,82,26,0.06) 0%, transparent 70%)'
      }} />

      {/* Floating kanji */}
      {kanji.map((k, i) => (
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
            y: [0, -20, 0],
            x: [0, 8, 0],
            rotate: [0, 2, 0],
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

      {/* Figure A — Sentinel (left) */}
      <motion.div
        className="absolute bottom-0"
        style={{ left: '-40px', opacity: 0.55 }}
        animate={{ y: [0, -14, 0], x: [0, 4, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <SentinelFigure />
      </motion.div>

      {/* Figure B — Scout (right) */}
      <motion.div
        className="absolute bottom-0"
        style={{ right: '-30px', opacity: 0.5 }}
        animate={{ y: [0, -18, 0], x: [0, -5, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      >
        <ScoutFigure />
      </motion.div>

      {/* Thin horizontal lines — editorial grid feel */}
      <div className="absolute left-0 right-0" style={{ top: '50%', height: '1px', background: 'rgba(26,21,16,0.04)' }} />
    </div>
  )
}
