import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { ScholarStatus } from '../types'

const statusColors: Record<ScholarStatus, string> = {
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
  awarded:     'Awarded ★',
  rejected:    'Rejected',
}

const typeLabels: Record<string, string> = {
  government: 'Government',
  university: 'University',
  private:    'Private',
  ngo:        'Intl / NGO',
}

export default function ScholarshipTracker() {
  const { state, dispatch } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="scholarships" style={{ background: '#F5E8D8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Funding the Mission
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
          >
            SCHOLARSHIP<br />
            <span style={{ color: '#D4521A' }}>HUNT</span>
          </h2>
          <p className="mt-4 text-sm max-w-sm leading-relaxed" style={{ color: '#9A8C72' }}>
            No scholarship left unchecked. Research every opportunity, track every deadline.
          </p>
        </motion.div>

        {/* Cards — horizontal list */}
        <div className="space-y-4">
          {state.scholarships.map((s, i) => {
            const statusColor = statusColors[s.status]
            return (
              <motion.div
                key={s.id}
                className="bg-white p-7"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">

                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    {/* Type + status */}
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span
                        className="text-[9px] tracking-widest uppercase px-2 py-0.5"
                        style={{ background: 'rgba(26,21,16,0.06)', color: '#6B5D4F' }}
                      >
                        {typeLabels[s.type] ?? s.type}
                      </span>
                      <span
                        className="text-[9px] tracking-widest uppercase font-semibold"
                        style={{ color: statusColor }}
                      >
                        {statusLabels[s.status]}
                      </span>
                    </div>

                    <h3
                      className="font-display leading-tight mb-0.5"
                      style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#1A1510' }}
                    >
                      {s.name}
                    </h3>
                    <div className="text-xs mb-4" style={{ color: '#9A8C72' }}>{s.provider}</div>

                    {/* Benefits */}
                    <div className="text-sm font-medium mb-1" style={{ color: '#1A1510' }}>
                      {s.benefitsDesc}
                    </div>
                    <div className="text-xs" style={{ color: '#9A8C72' }}>
                      Eligibility: {s.eligibility}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex-shrink-0 text-right space-y-3">
                    <div>
                      <div className="text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>Deadline</div>
                      <div className="font-mono text-sm" style={{ color: '#C89B3C' }}>{s.deadline}</div>
                    </div>

                    <select
                      value={s.status}
                      onChange={e =>
                        dispatch({ type: 'SET_SCHOLAR_STATUS', scholarId: s.id, status: e.target.value as ScholarStatus })
                      }
                      className="text-xs px-3 py-1.5 outline-none cursor-pointer block w-full"
                      style={{ background: 'rgba(26,21,16,0.06)', color: '#1A1510', border: 'none' }}
                    >
                      {(Object.keys(statusLabels) as ScholarStatus[]).map(k => (
                        <option key={k} value={k}>{statusLabels[k]}</option>
                      ))}
                    </select>

                    <a
                      href={s.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-end gap-1.5 text-xs hover:opacity-60 transition-opacity"
                      style={{ color: '#D4521A' }}
                    >
                      Official link <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {/* Notes */}
                {s.notes && (
                  <div
                    className="mt-4 pt-4 text-xs leading-relaxed"
                    style={{ color: '#9A8C72', borderTop: '1px solid rgba(26,21,16,0.06)' }}
                  >
                    {s.notes}
                  </div>
                )}

                {/* Bottom color bar — status indicator */}
                <div
                  className="mt-5 h-0.5 w-full rounded-full"
                  style={{ background: 'rgba(26,21,16,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      background: statusColor,
                      width:
                        s.status === 'researching' ? '10%' :
                        s.status === 'eligible'    ? '30%' :
                        s.status === 'applied'     ? '65%' :
                        s.status === 'awarded'     ? '100%' : '0%',
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tip */}
        <motion.div
          className="mt-10 flex items-start gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="w-px h-12 flex-shrink-0" style={{ background: '#D4521A' }} />
          <p className="text-xs leading-relaxed" style={{ color: '#9A8C72' }}>
            <strong style={{ color: '#1A1510' }}>Strategy:</strong> Apply for MEXT first — it's the most
            prestigious and fully funds your studies. Most university scholarships open <em>after</em> admission,
            so focus on getting accepted first.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
