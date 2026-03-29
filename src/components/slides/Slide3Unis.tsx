import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import type { UniStatus } from '../../types'

const statusFill: Record<UniStatus, number> = {
  researching: 15,
  shortlisted:  45,
  applied:      70,
  admitted:    100,
  rejected:      0,
}
const statusLabels: Record<UniStatus, string> = {
  researching: 'Researching',
  shortlisted: 'Shortlisted',
  applied:     'Applied',
  admitted:    'Admitted',
  rejected:    'Rejected',
}
const statusColor: Record<UniStatus, string> = {
  researching: '#9A8C72',
  shortlisted: '#1d4ed8',
  applied:     '#C89B3C',
  admitted:    '#059669',
  rejected:    '#ef4444',
}
const allStatuses: UniStatus[] = ['researching', 'shortlisted', 'applied', 'admitted', 'rejected']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}
const rowAnim = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Slide3Unis() {
  const { state, dispatch } = useApp()

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex-shrink-0">
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>03 — Institutions</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
          UNIVERSITY <span style={{ color: '#D4521A' }}>TRACKER</span>
        </h2>
      </motion.div>

      {/* Table header */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-5 pb-3 mb-1 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(26,21,16,0.12)' }}
      >
        <span className="w-8 text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>#</span>
        <span className="flex-1 text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>University</span>
        <span className="w-28 text-[9px] tracking-widest uppercase hidden md:block" style={{ color: '#9A8C72' }}>Deadline</span>
        <span className="w-32 text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>Status</span>
        <span className="w-20 text-[9px] tracking-widest uppercase hidden md:block" style={{ color: '#9A8C72' }}>Scholarship</span>
      </motion.div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-px">
          {state.universities.map(uni => {
            const fill = statusFill[uni.status]
            const sc = statusColor[uni.status]
            return (
              <motion.div
                key={uni.id}
                variants={rowAnim}
                className="flex items-center gap-5 py-4 group"
                style={{ borderBottom: '1px solid rgba(26,21,16,0.05)' }}
              >
                {/* Rank */}
                <span className="font-display w-8 text-right flex-shrink-0"
                  style={{ fontSize: '1.8rem', color: '#D4521A', opacity: 0.15, lineHeight: 1 }}>
                  {uni.ranking ?? '—'}
                </span>

                {/* Name + location */}
                <div className="flex-1 min-w-0">
                  <a
                    href={uni.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium leading-tight hover:underline"
                    style={{ color: '#1A1510' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {uni.name} ↗
                  </a>
                  <div className="text-xs mt-0.5" style={{ color: '#9A8C72' }}>{uni.location} · {uni.language} taught</div>
                </div>

                {/* Deadline */}
                <div className="w-28 font-mono text-xs flex-shrink-0 hidden md:block" style={{ color: '#C89B3C' }}>
                  {uni.deadline}
                </div>

                {/* Status fill bar + label + select */}
                <div className="w-32 flex-shrink-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: sc }}>
                      {statusLabels[uni.status]}
                    </span>
                  </div>
                  <div style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}>
                    <motion.div
                      style={{ height: '100%', background: sc, borderRadius: 1 }}
                      initial={{ width: 0 }}
                      animate={{ width: `${fill}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <select
                    value={uni.status}
                    onChange={e => dispatch({ type: 'SET_UNI_STATUS', uniId: uni.id, status: e.target.value as UniStatus })}
                    className="mt-1.5 text-[10px] w-full outline-none cursor-pointer"
                    style={{ background: 'rgba(26,21,16,0.05)', color: '#6B5D4F', border: 'none', padding: '2px 4px' }}
                  >
                    {allStatuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                  </select>
                </div>

                {/* Scholarship */}
                <div className="w-20 flex-shrink-0 hidden md:block">
                  {uni.scholarshipAvailable
                    ? <span className="text-[10px] tracking-wider uppercase font-semibold" style={{ color: '#D4521A' }}>Available</span>
                    : <span className="text-[10px] tracking-wider uppercase" style={{ color: '#9A8C72' }}>None</span>
                  }
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
