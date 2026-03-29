import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { UniStatus } from '../types'

const statusColors: Record<UniStatus, { text: string; dot: string }> = {
  researching: { text: '#9A8C72', dot: '#9A8C72' },
  shortlisted:  { text: '#1d4ed8', dot: '#1d4ed8' },
  applied:      { text: '#C89B3C', dot: '#C89B3C' },
  admitted:     { text: '#059669', dot: '#059669' },
  rejected:     { text: '#ef4444', dot: '#ef4444' },
}

const statusLabels: Record<UniStatus, string> = {
  researching: 'Researching',
  shortlisted:  'Shortlisted',
  applied:      'Applied',
  admitted:     'Admitted',
  rejected:     'Rejected',
}

const allFilters: Array<{ key: UniStatus | 'all'; label: string }> = [
  { key: 'all',         label: 'All' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'researching', label: 'Researching' },
  { key: 'applied',     label: 'Applied' },
  { key: 'admitted',    label: 'Admitted' },
  { key: 'rejected',    label: 'Rejected' },
]

export default function UniversityTracker() {
  const { state, dispatch } = useApp()
  const [filter, setFilter] = useState<UniStatus | 'all'>('all')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered =
    filter === 'all' ? state.universities : state.universities.filter(u => u.status === filter)

  return (
    <section id="universities" style={{ background: '#FBF0E8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Target Institutions
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
          >
            UNIVERSITY<br />
            <span style={{ color: '#D4521A' }}>TRACKER</span>
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {allFilters.map(f => {
            const active = filter === f.key
            const count = f.key === 'all'
              ? state.universities.length
              : state.universities.filter(u => u.status === f.key).length
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  background: active ? '#1A1510' : 'transparent',
                  color:  active ? '#FBF0E8' : '#9A8C72',
                  border: `1px solid ${active ? '#1A1510' : 'rgba(26,21,16,0.15)'}`,
                }}
              >
                {f.label} <span style={{ opacity: 0.5 }}>({count})</span>
              </button>
            )
          })}
        </motion.div>

        {/* University rows */}
        <div className="space-y-px" style={{ borderTop: '1px solid rgba(26,21,16,0.08)' }}>
          {filtered.map((uni, i) => {
            const sc = statusColors[uni.status]
            return (
              <motion.div
                key={uni.id}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.6 }}
                style={{ borderBottom: '1px solid rgba(26,21,16,0.08)' }}
              >
                <div className="py-6 flex items-start gap-6">

                  {/* Rank */}
                  <div
                    className="font-display flex-shrink-0 w-10 text-right"
                    style={{ fontSize: '2rem', color: 'rgba(212,82,26,0.15)', lineHeight: 1 }}
                  >
                    {uni.ranking ?? '—'}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {/* Status dot + label */}
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 inline-block"
                            style={{ background: sc.dot }}
                          />
                          <span
                            className="text-[10px] tracking-widest uppercase font-semibold"
                            style={{ color: sc.text }}
                          >
                            {statusLabels[uni.status]}
                          </span>
                          <span className="text-[10px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>
                            — {uni.language} taught
                          </span>
                        </div>

                        <h3
                          className="font-display leading-tight mb-0.5 group-hover:opacity-70 transition-opacity"
                          style={{ fontSize: 'clamp(20px, 3vw, 28px)', color: '#1A1510' }}
                        >
                          {uni.name}
                        </h3>

                        <div className="flex items-center gap-1 text-xs" style={{ color: '#9A8C72' }}>
                          <MapPin size={10} />
                          {uni.location}, Japan
                        </div>

                        <div className="mt-2 text-xs" style={{ color: '#6B5D4F' }}>
                          {uni.program}
                        </div>
                      </div>

                      {/* Right col: deadline + tuition + scholarship */}
                      <div className="flex-shrink-0 text-right space-y-1">
                        <div>
                          <div className="text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>Deadline</div>
                          <div className="text-sm font-mono" style={{ color: '#1A1510' }}>{uni.deadline}</div>
                        </div>
                        <div>
                          <div className="text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>Tuition / yr</div>
                          <div className="text-sm font-mono" style={{ color: '#1A1510' }}>
                            ¥{(uni.tuitionJPY / 1000).toFixed(0)}K
                          </div>
                        </div>
                        {uni.scholarshipAvailable && (
                          <div
                            className="text-[10px] tracking-wider uppercase font-semibold"
                            style={{ color: '#059669' }}
                          >
                            ✓ Scholarship
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    {uni.notes && (
                      <p className="mt-3 text-xs leading-relaxed" style={{ color: '#9A8C72' }}>
                        {uni.notes}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-4">
                      <select
                        value={uni.status}
                        onChange={e =>
                          dispatch({ type: 'SET_UNI_STATUS', uniId: uni.id, status: e.target.value as UniStatus })
                        }
                        className="text-xs px-3 py-1.5 border-0 outline-none cursor-pointer"
                        style={{ background: 'rgba(26,21,16,0.06)', color: '#1A1510' }}
                      >
                        {allFilters.filter(f => f.key !== 'all').map(f => (
                          <option key={f.key} value={f.key}>{f.label}</option>
                        ))}
                      </select>

                      <a
                        href={uni.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:opacity-60"
                        style={{ color: '#D4521A' }}
                      >
                        Visit site <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: '#9A8C72' }}>
            No universities match this filter.
          </div>
        )}
      </div>
    </section>
  )
}
