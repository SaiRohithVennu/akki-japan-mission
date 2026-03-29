import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Clock, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const statusCfg = {
  done:     { icon: Check,   color: '#059669', label: 'Done' },
  today:    { icon: Circle,  color: '#D4521A', label: 'Today' },
  upcoming: { icon: Clock,   color: '#C89B3C', label: 'Upcoming' },
  future:   { icon: Circle,  color: '#9A8C72', label: 'Future' },
}

const categoryColors: Record<string, string> = {
  Document:    '#D4521A',
  Application: '#7c3aed',
  Scholarship: '#C89B3C',
  Language:    '#1d4ed8',
  Visa:        '#8B1A2A',
  Travel:      '#059669',
}

function group(events: ReturnType<typeof useApp>['state']['timeline']) {
  const now   = new Date()
  const in7   = new Date(now.getTime() + 7  * 86400000)
  const in30  = new Date(now.getTime() + 30 * 86400000)
  return {
    upcoming: events.filter(e => { const d = new Date(e.date); return e.status !== 'done' && d <= in7 }),
    month:    events.filter(e => { const d = new Date(e.date); return e.status !== 'done' && d > in7 && d <= in30 }),
    later:    events.filter(e => { const d = new Date(e.date); return e.status !== 'done' && d > in30 }),
    done:     events.filter(e => e.status === 'done'),
  }
}

export default function Timeline() {
  const { state } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const sorted = [...state.timeline].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  const groups = group(sorted)

  const sections = [
    { key: 'upcoming' as const, label: 'This Week',   sub: 'Next 7 days',  accent: '#D4521A' },
    { key: 'month'    as const, label: 'This Month',  sub: 'Next 30 days', accent: '#C89B3C' },
    { key: 'later'    as const, label: 'Later',       sub: 'Future',       accent: '#9A8C72' },
    { key: 'done'     as const, label: 'Completed',   sub: 'Done',         accent: '#059669' },
  ]

  return (
    <section id="timeline" style={{ background: '#F5E8D8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Chronology
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
          >
            MISSION<br />
            <span style={{ color: '#D4521A' }}>TIMELINE</span>
          </h2>
        </motion.div>

        {/* Destination bar */}
        <motion.div
          className="flex items-center gap-5 mb-14 bg-white px-6 py-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <div className="w-1 h-10 flex-shrink-0" style={{ background: '#D4521A' }} />
          <div>
            <div className="text-[10px] tracking-widest uppercase mb-0.5" style={{ color: '#D4521A' }}>
              Destination
            </div>
            <div className="text-sm" style={{ color: '#1A1510' }}>
              Japan — Target Arrival:{' '}
              <span className="font-mono font-bold" style={{ color: '#C89B3C' }}>April 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Event groups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {sections.map((sec, sIdx) => {
            const events = groups[sec.key]
            if (!events.length) return null

            return (
              <motion.div
                key={sec.key}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: sIdx * 0.1 + 0.2, duration: 0.6 }}
              >
                {/* Section heading */}
                <div className="flex items-baseline gap-3 mb-5">
                  <div
                    className="font-display leading-none"
                    style={{ fontSize: '2rem', color: sec.accent }}
                  >
                    {sec.label}
                  </div>
                  <div className="text-[10px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>
                    {sec.sub} · {events.length}
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-px">
                  {events.map((ev, i) => {
                    const cfg = statusCfg[ev.status]
                    const StatusIcon = cfg.icon
                    const catColor = categoryColors[ev.category] ?? '#D4521A'

                    return (
                      <motion.div
                        key={ev.id}
                        className="bg-white px-5 py-4 flex items-start gap-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: sIdx * 0.1 + i * 0.05 + 0.25 }}
                        style={{ borderBottom: '1px solid rgba(26,21,16,0.04)' }}
                      >
                        {/* Status icon */}
                        <StatusIcon
                          size={14}
                          style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              {/* Category tag */}
                              <span
                                className="text-[9px] tracking-widest uppercase font-semibold mr-2"
                                style={{ color: catColor }}
                              >
                                {ev.category}
                              </span>
                              <span className="text-sm" style={{ color: '#1A1510' }}>
                                {ev.title}
                              </span>
                            </div>
                            <span
                              className="text-[10px] font-mono flex-shrink-0"
                              style={{ color: '#C89B3C' }}
                            >
                              {ev.date}
                            </span>
                          </div>
                          <div className="text-xs mt-0.5 leading-relaxed" style={{ color: '#9A8C72' }}>
                            {ev.description}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
