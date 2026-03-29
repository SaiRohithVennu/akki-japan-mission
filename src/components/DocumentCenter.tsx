import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Clock, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { DocStatus } from '../types'

const statusConfig: Record<DocStatus, { label: string; color: string; icon: React.ElementType }> = {
  'ready':        { label: 'Ready',        color: '#059669', icon: Check },
  'pending':      { label: 'Pending',      color: '#C89B3C', icon: Clock },
  'needs-update': { label: 'Needs Update', color: '#ef4444', icon: AlertTriangle },
}

export default function DocumentCenter() {
  const { state, dispatch } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const docsReady = state.documents.filter(d => d.status === 'ready').length
  const total = state.documents.length
  const pct = Math.round((docsReady / total) * 100)

  const byCategory = state.documents.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = []
    acc[doc.category].push(doc)
    return acc
  }, {} as Record<string, typeof state.documents>)

  return (
    <section id="documents" style={{ background: '#FBF0E8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Pre-departure Arsenal
          </span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2
              className="font-display mt-2 leading-none"
              style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
            >
              DOCUMENT<br />
              <span style={{ color: '#D4521A' }}>CENTER</span>
            </h2>
            <div className="text-right pb-2">
              <div
                className="font-display leading-none"
                style={{ fontSize: '5rem', color: '#D4521A' }}
              >
                {pct}%
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>
                {docsReady}/{total} ready
              </div>
            </div>
          </div>

          {/* Single progress bar */}
          <div className="mt-6 h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(26,21,16,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#D4521A' }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>

        {/* Documents by category */}
        <div className="space-y-12">
          {Object.entries(byCategory).map(([category, docs], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 + 0.2, duration: 0.6 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: '#9A8C72' }}
                >
                  {category}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(26,21,16,0.08)' }} />
                <span className="text-[10px] font-mono" style={{ color: '#9A8C72' }}>
                  {docs.filter(d => d.status === 'ready').length}/{docs.length}
                </span>
              </div>

              {/* Doc rows */}
              <div className="space-y-px">
                {docs.map((doc) => {
                  const cfg = statusConfig[doc.status]
                  const StatusIcon = cfg.icon
                  return (
                    <div
                      key={doc.id}
                      className="bg-white px-5 py-4 flex items-center gap-4 group"
                    >
                      {/* Status icon */}
                      <StatusIcon size={14} style={{ color: cfg.color, flexShrink: 0 }} />

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: '#1A1510' }}>{doc.name}</span>
                          {doc.required && (
                            <span
                              className="text-[9px] tracking-widest uppercase"
                              style={{ color: '#ef4444' }}
                            >
                              Required
                            </span>
                          )}
                        </div>
                        {doc.notes && (
                          <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#9A8C72' }}>
                            {doc.notes}
                          </div>
                        )}
                        {doc.expiry && (
                          <div className="text-[10px] font-mono mt-0.5" style={{ color: '#C89B3C' }}>
                            Expires {doc.expiry}
                          </div>
                        )}
                      </div>

                      {/* Toggle buttons */}
                      <div className="flex gap-1.5 flex-shrink-0">
                        {(['ready', 'pending', 'needs-update'] as DocStatus[]).map(s => {
                          const active = doc.status === s
                          const c = statusConfig[s]
                          return (
                            <button
                              key={s}
                              onClick={() => dispatch({ type: 'SET_DOC_STATUS', docId: doc.id, status: s })}
                              className="px-2.5 py-1 text-[9px] tracking-widest uppercase transition-all duration-150"
                              style={{
                                background: active ? c.color : 'transparent',
                                color: active ? 'white' : '#9A8C72',
                                border: `1px solid ${active ? c.color : 'rgba(26,21,16,0.12)'}`,
                              }}
                            >
                              {s === 'needs-update' ? 'Update' : s}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
