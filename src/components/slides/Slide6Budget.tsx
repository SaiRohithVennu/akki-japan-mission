import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

function fmt(n: number, cur: 'INR' | 'JPY') {
  const v   = cur === 'JPY' ? Math.round(n / 0.6) : n
  const sym = cur === 'JPY' ? '¥' : '₹'
  if (v >= 100000) return `${sym}${(v / 100000).toFixed(1)}L`
  if (v >= 1000)   return `${sym}${(v / 1000).toFixed(0)}K`
  return `${sym}${v}`
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const row = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45 } },
}

export default function Slide6Budget() {
  const { state, dispatch } = useApp()
  const [cur, setCur] = useState<'INR' | 'JPY'>('INR')

  const needed = state.budget.reduce((s, b) => s + b.estimatedINR, 0)
  const saved  = state.budget.reduce((s, b) => s + b.savedINR,    0)
  const gap    = needed - saved
  const pct    = Math.min(100, Math.round((saved / needed) * 100))

  const healthColor = pct >= 70 ? '#059669' : pct >= 40 ? '#C89B3C' : '#ef4444'

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between mb-6 flex-shrink-0"
      >
        <div>
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>06 — Budget</span>
          <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
            BUDGET <span style={{ color: '#D4521A' }}>WAR ROOM</span>
          </h2>
        </div>
        {/* Currency toggle */}
        <div className="flex gap-1 pb-2 flex-shrink-0"
          style={{ background: 'rgba(26,21,16,0.06)', padding: '4px' }}>
          {(['INR', 'JPY'] as const).map(c => (
            <button
              key={c}
              onClick={() => setCur(c)}
              className="text-xs font-mono px-3 py-1 transition-all duration-200"
              style={{
                background: cur === c ? '#1A1510' : 'transparent',
                color: cur === c ? '#FBF0E8' : '#9A8C72',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Summary 3 numbers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-6 mb-6 flex-shrink-0"
      >
        {[
          { label: 'Needed', val: needed, c: '#1A1510' },
          { label: 'Saved',  val: saved,  c: '#D4521A'  },
          { label: 'Gap',    val: gap,    c: healthColor },
        ].map(s => (
          <div key={s.label}>
            <div className="text-[9px] tracking-widest uppercase mb-0.5" style={{ color: '#9A8C72' }}>{s.label}</div>
            <div className="font-display leading-none" style={{ fontSize: 'clamp(22px, 3vw, 40px)', color: s.c }}>
              {fmt(s.val, cur)}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Overall bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        className="mb-5 flex-shrink-0"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>Budget readiness</span>
          <span className="font-display text-2xl" style={{ color: healthColor }}>{pct}%</span>
        </div>
        <div style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}>
          <motion.div
            style={{ height: '100%', background: healthColor, borderRadius: 1 }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Line items */}
      <div className="flex-1 overflow-y-auto">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-px">
          {state.budget.map((item) => {
            const iPct = item.estimatedINR > 0
              ? Math.min(100, Math.round((item.savedINR / item.estimatedINR) * 100)) : 0
            const barC = iPct >= 100 ? '#059669' : iPct >= 50 ? '#C89B3C' : '#D4521A'
            return (
              <motion.div key={item.id} variants={row}
                className="py-3" style={{ borderBottom: '1px solid rgba(26,21,16,0.05)' }}>
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, lineHeight: 1.4 }}>{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs" style={{ color: '#1A1510' }}>{item.category}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold font-mono" style={{ color: '#D4521A' }}>
                          {fmt(item.savedINR, cur)} saved
                        </span>
                        <span className="text-xs font-mono" style={{ color: '#9A8C72' }}>
                          / {fmt(item.estimatedINR, cur)}
                        </span>
                      </div>
                    </div>
                    <div style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}>
                      <div style={{ height: '100%', width: `${iPct}%`, background: barC, borderRadius: 1, transition: 'width 0.8s' }} />
                    </div>
                  </div>
                  {/* Input */}
                  <input
                    type="number"
                    placeholder="₹ saved"
                    defaultValue={item.savedINR || ''}
                    onBlur={e => dispatch({ type: 'UPDATE_BUDGET_SAVED', itemId: item.id, savedINR: parseInt(e.target.value) || 0 })}
                    className="text-[10px] font-mono outline-none w-20 flex-shrink-0 text-right"
                    style={{ background: 'rgba(26,21,16,0.05)', color: '#1A1510', border: 'none', padding: '4px 6px' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
