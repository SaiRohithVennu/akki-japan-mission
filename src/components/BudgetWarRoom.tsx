import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '../context/AppContext'

function fmt(n: number, cur: 'INR' | 'JPY') {
  const v = cur === 'JPY' ? Math.round(n / 0.6) : n
  const sym = cur === 'JPY' ? '¥' : '₹'
  if (v >= 100000) return `${sym}${(v / 100000).toFixed(1)}L`
  if (v >= 1000)   return `${sym}${(v / 1000).toFixed(0)}K`
  return `${sym}${v}`
}

export default function BudgetWarRoom() {
  const { state, dispatch } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [currency, setCurrency] = useState<'INR' | 'JPY'>('INR')

  const totalNeeded = state.budget.reduce((s, b) => s + b.estimatedINR, 0)
  const totalSaved  = state.budget.reduce((s, b) => s + b.savedINR, 0)
  const totalGap    = totalNeeded - totalSaved
  const pct         = Math.min(100, Math.round((totalSaved / totalNeeded) * 100))

  const healthColor =
    pct >= 70 ? '#059669' :
    pct >= 40 ? '#C89B3C' : '#ef4444'

  const healthLabel =
    pct >= 70 ? 'On Track' :
    pct >= 40 ? 'In Progress' : 'Critical'

  return (
    <section id="budget" style={{ background: '#F5E8D8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Financial Intelligence
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
          >
            BUDGET<br />
            <span style={{ color: '#D4521A' }}>WAR ROOM</span>
          </h2>
        </motion.div>

        {/* Summary row */}
        <motion.div
          className="grid grid-cols-3 gap-8 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {[
            { label: 'Total Cost',  value: fmt(totalNeeded, currency), color: '#1A1510' },
            { label: 'Saved',       value: fmt(totalSaved,  currency), color: '#059669' },
            { label: 'Gap',         value: fmt(totalGap,    currency), color: totalGap > 0 ? '#C89B3C' : '#059669' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: '#9A8C72' }}>
                {s.label}
              </div>
              <div
                className="font-display leading-none"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: s.color }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Overall progress + currency toggle */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span
                className="font-display"
                style={{ fontSize: '3rem', color: healthColor, lineHeight: 1 }}
              >
                {pct}%
              </span>
              <span
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: healthColor }}
              >
                {healthLabel}
              </span>
            </div>

            {/* Currency toggle */}
            <div
              className="flex items-center gap-1 p-1"
              style={{ background: 'rgba(26,21,16,0.06)' }}
            >
              {(['INR', 'JPY'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className="px-3 py-1 text-xs font-mono tracking-widest transition-all duration-200"
                  style={{
                    background: currency === c ? '#1A1510' : 'transparent',
                    color: currency === c ? '#FBF0E8' : '#9A8C72',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(26,21,16,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: healthColor }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>

        {/* Line items */}
        <div className="space-y-px" style={{ borderTop: '1px solid rgba(26,21,16,0.08)' }}>
          {state.budget.map((item, i) => {
            const itemPct = item.estimatedINR > 0
              ? Math.min(100, Math.round((item.savedINR / item.estimatedINR) * 100))
              : 0
            const barColor = itemPct >= 100 ? '#059669' : itemPct >= 50 ? '#C89B3C' : '#D4521A'

            return (
              <motion.div
                key={item.id}
                className="bg-white px-5 py-4"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.5 }}
                style={{ borderBottom: '1px solid rgba(26,21,16,0.06)' }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-xl flex-shrink-0" style={{ lineHeight: 1.4 }}>{item.icon}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm" style={{ color: '#1A1510' }}>{item.category}</span>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-mono font-bold" style={{ color: '#1A1510' }}>
                          {fmt(item.estimatedINR, currency)}
                        </div>
                        <div className="text-xs font-mono" style={{ color: '#059669' }}>
                          {fmt(item.savedINR, currency)} saved
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex-1 h-1 rounded-full overflow-hidden"
                        style={{ background: 'rgba(26,21,16,0.08)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${itemPct}%`, background: barColor }}
                        />
                      </div>
                      <span className="text-[10px] font-mono w-8 text-right" style={{ color: '#9A8C72' }}>
                        {itemPct}%
                      </span>

                      {/* Inline saved input */}
                      <input
                        type="number"
                        placeholder="₹ saved"
                        defaultValue={item.savedINR || ''}
                        onBlur={e => dispatch({
                          type: 'UPDATE_BUDGET_SAVED',
                          itemId: item.id,
                          savedINR: parseInt(e.target.value) || 0,
                        })}
                        className="w-24 text-xs px-2 py-1 outline-none font-mono"
                        style={{
                          background: 'rgba(26,21,16,0.05)',
                          color: '#1A1510',
                          border: '1px solid rgba(26,21,16,0.1)',
                        }}
                      />
                    </div>

                    {item.notes && (
                      <div className="text-[10px] mt-1.5 leading-relaxed" style={{ color: '#9A8C72' }}>
                        {item.notes}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Total row */}
        <div
          className="px-5 py-4 flex items-center justify-between mt-px"
          style={{ background: '#1A1510' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>Total</span>
          <div className="text-right">
            <div className="font-mono font-bold" style={{ color: '#FBF0E8' }}>
              {fmt(totalNeeded, currency)}
            </div>
            <div className="text-xs font-mono" style={{ color: '#059669' }}>
              {fmt(totalSaved, currency)} saved · {pct}%
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
