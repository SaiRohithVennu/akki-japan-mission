import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext'

const categoryLabels: Record<string, string> = {
  official:    'Official Portal',
  scholarship: 'Scholarship',
  visa:        'Visa / Embassy',
  language:    'Language Test',
  exam:        'Entrance Exam',
  university:  'University',
}

export default function UsefulLinks() {
  const { state } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const grouped = state.resources.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {} as Record<string, typeof state.resources>)

  return (
    <section id="resources" style={{ background: '#FBF0E8' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Official Sources
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#1A1510' }}
          >
            RESOURCES<br />
            <span style={{ color: '#D4521A' }}>HUB</span>
          </h2>
          <p className="mt-4 text-sm max-w-sm leading-relaxed" style={{ color: '#9A8C72' }}>
            Every official link you'll need — vetted, essential, bookmarked.
          </p>
        </motion.div>

        {/* Grouped link rows */}
        <div className="space-y-12">
          {Object.entries(grouped).map(([cat, resources], catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIdx * 0.1 + 0.2, duration: 0.6 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-4 mb-3">
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: '#D4521A' }}
                >
                  {categoryLabels[cat] ?? cat}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(26,21,16,0.08)' }} />
              </div>

              <div className="space-y-px">
                {resources.map((r, i) => (
                  <motion.a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-6 bg-white px-5 py-4 group block"
                    style={{ borderBottom: '1px solid rgba(26,21,16,0.04)' }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIdx * 0.1 + i * 0.06 + 0.25 }}
                  >
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-sm font-medium mb-0.5 group-hover:opacity-60 transition-opacity"
                        style={{ color: '#1A1510' }}
                      >
                        {r.title}
                      </div>
                      <div className="text-xs leading-relaxed" style={{ color: '#9A8C72' }}>
                        {r.description}
                      </div>
                    </div>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 mt-0.5 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: '#D4521A' }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          className="mt-12 flex items-start gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="w-px h-10 flex-shrink-0" style={{ background: 'rgba(26,21,16,0.15)' }} />
          <p className="text-xs leading-relaxed" style={{ color: '#9A8C72' }}>
            Japanese government and university websites occasionally change their structure.
            Always verify links are current — when in doubt, search the institution directly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
