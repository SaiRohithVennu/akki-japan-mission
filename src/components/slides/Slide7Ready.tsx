import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

function MiniRing({ value, label, color }: { value: number; label: string; color: string }) {
  const r    = 28
  const circ = 2 * Math.PI * r
  const off  = circ - (value / 100) * circ
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 70, height: 70 }}>
        <svg viewBox="0 0 64 64" width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(26,21,16,0.08)" strokeWidth="3" />
          <motion.circle
            cx="32" cy="32" r={r}
            fill="none" strokeWidth="3" strokeLinecap="round"
            stroke={color}
            strokeDasharray={circ}
            strokeDashoffset={circ}
            animate={{ strokeDashoffset: off }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display" style={{ fontSize: '1rem', color, lineHeight: 1 }}>{value}%</span>
        </div>
      </div>
      <span className="text-[9px] tracking-widest uppercase text-center" style={{ color: '#9A8C72', maxWidth: 64 }}>
        {label}
      </span>
    </div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }
const item    = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Slide7Ready() {
  const { state, getOverallProgress, getBudgetReadiness } = useApp()

  const overall   = getOverallProgress()
  const budget    = getBudgetReadiness()
  const docsReady = state.documents.filter(d => d.status === 'ready').length
  const docsPct   = Math.round((docsReady / state.documents.length) * 100)
  const phasePct  = Math.round(
    (state.phases.filter(p => p.status === 'complete').length / state.phases.length) * 100
  )

  const statusCfg =
    overall < 25 ? { label: 'MISSION INITIALIZING', color: '#9A8C72' } :
    overall < 50 ? { label: 'PREPARING FOR LAUNCH', color: '#D4521A' } :
    overall < 75 ? { label: 'MISSION IN PROGRESS',  color: '#C89B3C' } :
    overall < 90 ? { label: 'APPROACHING LAUNCH',   color: '#059669' } :
                   { label: 'LAUNCH READY',          color: '#D4521A' }

  const upcoming = [...state.timeline]
    .filter(e => e.status !== 'done')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4)

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex-shrink-0">
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>07 — Final Assessment</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
          LAUNCH <span style={{ color: '#D4521A' }}>READINESS</span>
        </h2>
      </motion.div>

      {/* Status banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
        className="mb-6 py-3 pl-4 flex-shrink-0"
        style={{ borderLeft: `3px solid ${statusCfg.color}`, background: `${statusCfg.color}0D` }}
      >
        <span className="font-display leading-none" style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', color: statusCfg.color }}>
          {statusCfg.label}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 overflow-hidden">

        {/* Left: rings + quote */}
        <div className="flex flex-col justify-between">
          {/* Rings */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex gap-6 flex-wrap"
          >
            <MiniRing value={overall}  label="Overall"   color="#D4521A" />
            <MiniRing value={docsPct}  label="Documents" color="#C89B3C" />
            <MiniRing value={budget}   label="Budget"    color="#059669" />
            <MiniRing value={phasePct} label="Phases"    color="#7c3aed" />
          </motion.div>

          {/* Overall bar */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="mt-6"
          >
            <div className="flex justify-between mb-1.5">
              <span className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>Mission progress</span>
              <span className="font-display text-2xl" style={{ color: '#D4521A' }}>{overall}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(26,21,16,0.08)', borderRadius: 2 }}>
              <motion.div
                style={{ height: '100%', background: '#D4521A', borderRadius: 2 }}
                initial={{ width: 0 }}
                animate={{ width: `${overall}%` }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div style={{ width: 24, height: 1, background: '#D4521A', marginBottom: '0.75rem' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#6B5D4F', fontStyle: 'italic' }}>
              "Japan isn't a destination — it's the next chapter."
            </p>
            <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: '#9A8C72' }}>
              Make it count, Akki.
            </p>
          </motion.div>
        </div>

        {/* Right: upcoming timeline */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col overflow-hidden">
          <div className="text-xs tracking-[0.3em] uppercase mb-4 flex-shrink-0" style={{ color: '#9A8C72' }}>
            Coming Up
          </div>
          <div className="space-y-px flex-1 overflow-y-auto">
            {upcoming.map(ev => (
              <motion.div
                key={ev.id}
                variants={item}
                className="flex items-start gap-4 py-3"
                style={{ borderBottom: '1px solid rgba(26,21,16,0.05)' }}
              >
                <div style={{ width: 2, height: 32, background: '#D4521A', flexShrink: 0, marginTop: 2 }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: '#1A1510' }}>{ev.title}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: '#9A8C72' }}>{ev.description}</div>
                </div>
                <div className="text-xs font-mono flex-shrink-0" style={{ color: '#C89B3C' }}>{ev.date}</div>
              </motion.div>
            ))}
            {upcoming.length === 0 && (
              <div className="text-sm py-4" style={{ color: '#9A8C72' }}>No upcoming events with dates.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
