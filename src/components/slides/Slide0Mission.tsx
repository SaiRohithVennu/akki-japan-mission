import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Slide0Mission() {
  const { state, getOverallProgress } = useApp()
  const progress = getOverallProgress()

  const stats = [
    { value: `${progress}%`,              label: 'Mission Complete' },
    { value: '8',                          label: 'Phases' },
    { value: String(state.universities.length), label: 'Target Unis' },
    { value: String(state.scholarships.length), label: 'Scholarships' },
  ]

  return (
    <div className="flex flex-col justify-center h-full max-w-5xl mx-auto px-8 md:px-16">
      <motion.div variants={container} initial="hidden" animate="show">

        {/* Label */}
        <motion.div variants={item} className="flex items-center gap-4 mb-6">
          <div style={{ width: 32, height: 1, background: '#D4521A' }} />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#D4521A' }}>
            Mission Briefing · 2025–2026
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={item}
          className="font-display leading-none mb-2"
          style={{ fontSize: 'clamp(80px, 15vw, 200px)', color: '#1A1510', letterSpacing: '-0.02em' }}
        >
          AKKI
        </motion.h1>

        <motion.div
          variants={item}
          className="font-display leading-none mb-10"
          style={{ fontSize: 'clamp(32px, 6vw, 80px)', color: '#D4521A', letterSpacing: '0.05em' }}
        >
          JAPAN
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} style={{ height: 1, background: 'rgba(26,21,16,0.1)', marginBottom: '2.5rem' }} />

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display leading-none mb-1" style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: '#D4521A' }}>
                {s.value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          className="flex items-center gap-3 mt-16"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: '#9A8C72' }}>
            Scroll to begin
          </span>
          <span style={{ color: '#D4521A' }}>↓</span>
        </motion.div>

      </motion.div>
    </div>
  )
}
