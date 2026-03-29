import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import type { DocStatus } from '../../types'

const borderColor: Record<DocStatus, string> = {
  'ready':        '#D4521A',
  'pending':      'rgba(26,21,16,0.1)',
  'needs-update': '#ef4444',
}
const statusLabel: Record<DocStatus, string> = {
  'ready':        'READY',
  'pending':      'PENDING',
  'needs-update': 'UPDATE',
}
const statusText: Record<DocStatus, string> = {
  'ready':        '#D4521A',
  'pending':      '#9A8C72',
  'needs-update': '#ef4444',
}
const allStatuses: DocStatus[] = ['ready', 'pending', 'needs-update']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function Slide5Docs() {
  const { state, dispatch } = useApp()

  const ready   = state.documents.filter(d => d.status === 'ready').length
  const total   = state.documents.length
  const pct     = Math.round((ready / total) * 100)

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between mb-6 flex-shrink-0"
      >
        <div>
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>05 — Documents</span>
          <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
            DOCUMENT <span style={{ color: '#D4521A' }}>CENTER</span>
          </h2>
        </div>
        <div className="text-right pb-1">
          <div className="font-display leading-none" style={{ fontSize: '4rem', color: '#D4521A' }}>{pct}%</div>
          <div className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>{ready} of {total}</div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="mb-6 flex-shrink-0"
        style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}
      >
        <motion.div
          style={{ height: '100%', background: '#D4521A', borderRadius: 1 }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </motion.div>

      {/* Doc list */}
      <div className="flex-1 overflow-y-auto">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-px">
          {state.documents.map(doc => {
            const bc = borderColor[doc.status]
            return (
              <motion.div
                key={doc.id}
                variants={item}
                className="flex items-center gap-4 py-3"
                style={{
                  borderBottom: '1px solid rgba(26,21,16,0.05)',
                  borderLeft: `2px solid ${bc}`,
                  paddingLeft: '1rem',
                  background: doc.status === 'ready' ? 'rgba(212,82,26,0.02)' : 'transparent',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm" style={{
                    color: doc.status === 'ready' ? '#1A1510' : doc.status === 'needs-update' ? '#ef4444' : '#6B5D4F',
                  }}>
                    {doc.name}
                  </span>
                  <span className="text-[9px] tracking-widest uppercase ml-3" style={{ color: '#9A8C72' }}>
                    {doc.category}
                  </span>
                  {doc.expiry && (
                    <span className="text-[10px] font-mono ml-3" style={{ color: '#C89B3C' }}>{doc.expiry}</span>
                  )}
                </div>

                {/* Status toggles */}
                <div className="flex gap-1.5 flex-shrink-0">
                  {allStatuses.map(s => (
                    <button
                      key={s}
                      onClick={() => dispatch({ type: 'SET_DOC_STATUS', docId: doc.id, status: s })}
                      className="text-[9px] tracking-widest uppercase px-2 py-1 transition-all duration-150"
                      style={{
                        background: doc.status === s ? statusText[s] : 'transparent',
                        color: doc.status === s ? 'white' : '#9A8C72',
                        border: `1px solid ${doc.status === s ? statusText[s] : 'rgba(26,21,16,0.1)'}`,
                      }}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
