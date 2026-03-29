import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import type { ScholarStatus } from '../../types'

const statusFill: Record<ScholarStatus, number> = {
  researching: 10,
  eligible:    35,
  applied:     70,
  awarded:    100,
  rejected:     0,
}
const statusColor: Record<ScholarStatus, string> = {
  researching: '#9A8C72',
  eligible:    '#1d4ed8',
  applied:     '#C89B3C',
  awarded:     '#D4521A',
  rejected:    '#ef4444',
}
const statusLabels: Record<ScholarStatus, string> = {
  researching: 'Researching',
  eligible:    'Eligible',
  applied:     'Applied',
  awarded:     'Awarded',
  rejected:    'Rejected',
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Slide4Scholar() {
  const { state, dispatch } = useApp()

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex-shrink-0">
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>04 — Funding</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
          SCHOLARSHIP <span style={{ color: '#D4521A' }}>HUNT</span>
        </h2>
      </motion.div>

      {/* 2×2 grid */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1"
      >
        {state.scholarships.map(s => {
          const fill = statusFill[s.status]
          const sc = statusColor[s.status]
          return (
            <motion.div
              key={s.id}
              variants={card}
              className="flex flex-col"
              style={{ background: 'rgba(255,255,255,0.7)', padding: '1.5rem' }}
            >
              {/* Type tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] tracking-widest uppercase px-2 py-0.5"
                  style={{ background: 'rgba(26,21,16,0.06)', color: '#6B5D4F' }}>
                  {s.type}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: sc }}>
                  {statusLabels[s.status]}
                </span>
              </div>

              {/* Name */}
              <div className="font-display leading-tight mb-1" style={{ fontSize: 'clamp(18px, 2.2vw, 28px)', color: '#1A1510' }}>
                {s.name}
              </div>
              <div className="text-xs mb-3" style={{ color: '#9A8C72' }}>{s.provider}</div>

              {/* Benefits */}
              <div className="text-sm flex-1" style={{ color: '#1A1510' }}>{s.benefitsDesc}</div>

              {/* Deadline */}
              <div className="flex items-center justify-between mt-4 mb-3">
                <div>
                  <div className="text-[9px] uppercase tracking-widest" style={{ color: '#9A8C72' }}>Deadline</div>
                  <div className="font-mono text-sm" style={{ color: '#C89B3C' }}>{s.deadline}</div>
                </div>
                <select
                  value={s.status}
                  onChange={e => dispatch({ type: 'SET_SCHOLAR_STATUS', scholarId: s.id, status: e.target.value as ScholarStatus })}
                  className="text-[10px] outline-none cursor-pointer"
                  style={{ background: 'rgba(26,21,16,0.06)', color: '#1A1510', border: 'none', padding: '4px 8px' }}
                >
                  {(Object.keys(statusLabels) as ScholarStatus[]).map(k => (
                    <option key={k} value={k}>{statusLabels[k]}</option>
                  ))}
                </select>
              </div>

              {/* Status fill bar */}
              <div style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}>
                <motion.div
                  style={{ height: '100%', background: sc, borderRadius: 1 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${fill}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
