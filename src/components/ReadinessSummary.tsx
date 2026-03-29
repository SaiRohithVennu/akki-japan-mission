import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowUp } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Ring({ value, color, label }: { value: number; color: string; label: string }) {
  const ref = useRef<SVGCircleElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })
  const r    = 38
  const circ = 2 * Math.PI * r
  const off  = circ - (value / 100) * circ

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 84 84" className="w-full h-full -rotate-90">
          <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(26,21,16,0.08)" strokeWidth="3" />
          <motion.circle
            ref={ref}
            cx="42" cy="42" r={r}
            fill="none" strokeWidth="3" strokeLinecap="round"
            stroke={color}
            strokeDasharray={circ}
            strokeDashoffset={circ}
            animate={inView ? { strokeDashoffset: off } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl" style={{ color, lineHeight: 1 }}>{value}%</span>
        </div>
      </div>
      <span className="text-[10px] tracking-widest uppercase text-center max-w-[80px] leading-tight"
        style={{ color: '#9A8C72' }}>
        {label}
      </span>
    </div>
  )
}

export default function ReadinessSummary() {
  const { state, getOverallProgress, getTotalTasksDone, getTotalTasks, getBudgetReadiness } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const overall  = getOverallProgress()
  const tasksDone = getTotalTasksDone()
  const totalTasks = getTotalTasks()
  const budget   = getBudgetReadiness()

  const docsReady  = state.documents.filter(d => d.status === 'ready').length
  const docsPct    = Math.round((docsReady / state.documents.length) * 100)
  const phasePct   = Math.round((state.phases.filter(p => p.status === 'complete').length / state.phases.length) * 100)

  const statusText =
    overall < 25 ? { label: 'MISSION INITIALIZING', color: '#9A8C72' } :
    overall < 50 ? { label: 'PREPARING FOR LAUNCH', color: '#D4521A' } :
    overall < 75 ? { label: 'MISSION IN PROGRESS',  color: '#C89B3C' } :
    overall < 90 ? { label: 'APPROACHING LAUNCH',   color: '#059669' } :
                   { label: 'LAUNCH READY',          color: '#059669' }

  const checks = [
    { label: 'Tasks Completed',      value: `${tasksDone}/${totalTasks}`,                        done: tasksDone === totalTasks },
    { label: 'Documents Ready',      value: `${docsReady}/${state.documents.length}`,            done: docsReady === state.documents.length },
    { label: 'Scholarships Applied', value: `${state.scholarships.filter(s => s.status === 'applied' || s.status === 'awarded').length}/${state.scholarships.length}`, done: state.scholarships.filter(s => s.status === 'applied' || s.status === 'awarded').length >= 2 },
    { label: 'Universities Applied', value: `${state.universities.filter(u => u.status === 'applied' || u.status === 'admitted').length}/${state.universities.length}`, done: state.universities.filter(u => u.status === 'applied' || u.status === 'admitted').length >= 3 },
    { label: 'Budget Secured',       value: `${budget}%`,                                        done: budget >= 70 },
    { label: 'Phases Unlocked',      value: `${state.phases.filter(p => p.status !== 'locked').length}/8`, done: state.phases.every(p => p.status !== 'locked') },
  ]

  return (
    <section id="readiness" style={{ background: '#1A1510' }} className="py-28">
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>
            Final Assessment
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{ fontSize: 'clamp(52px, 8vw, 110px)', color: '#FBF0E8' }}
          >
            LAUNCH<br />
            <span style={{ color: '#D4521A' }}>READINESS</span>
          </h2>
        </motion.div>

        {/* Status banner */}
        <motion.div
          className="mb-16 px-6 py-5 border-l-4"
          style={{ borderColor: statusText.color, background: `${statusText.color}10` }}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div
            className="font-display leading-none"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)', color: statusText.color }}
          >
            {statusText.label}
          </div>
        </motion.div>

        {/* Rings */}
        <motion.div
          className="flex flex-wrap justify-center gap-10 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Ring value={overall}  color="#D4521A" label="Overall Mission" />
          <Ring value={docsPct}  color="#C89B3C" label="Docs Ready" />
          <Ring value={budget}   color="#059669" label="Budget Funded" />
          <Ring value={phasePct} color="#7c3aed" label="Phases Done" />
        </motion.div>

        {/* Checklist */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-5"
            style={{ color: '#6B5D4F' }}
          >
            Mission Checklist
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: 'rgba(244,237,216,0.06)' }}>
            {checks.map((c, i) => (
              <motion.div
                key={c.label}
                className="flex items-center justify-between px-5 py-4"
                style={{ background: '#1A1510' }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: c.done ? '#059669' : 'transparent',
                      border: `1.5px solid ${c.done ? '#059669' : 'rgba(244,237,216,0.15)'}`,
                    }}
                  >
                    {c.done && <Check size={11} color="white" strokeWidth={3} />}
                  </div>
                  <span className="text-sm" style={{ color: c.done ? '#F4EDD8' : '#6B5D4F' }}>
                    {c.label}
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: c.done ? '#059669' : '#6B5D4F' }}
                >
                  {c.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div
            className="font-display leading-tight max-w-2xl mx-auto mb-4"
            style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#F4EDD8', opacity: 0.7 }}
          >
            "Every great journey begins with a single step taken in complete preparation."
          </div>
          <p className="text-sm" style={{ color: '#6B5D4F' }}>
            Japan isn't a destination — it's the next chapter. Make it count, Akki.
          </p>
        </motion.div>

        {/* Back to top */}
        <div className="flex items-center justify-between" style={{ borderTop: '1px solid rgba(244,237,216,0.08)', paddingTop: '2rem' }}>
          <div>
            <span className="font-display text-xl tracking-widest" style={{ color: '#D4521A' }}>akki.</span>
            <span className="text-xs tracking-widest ml-3" style={{ color: '#3A3028' }}>Japan Mission Portal</span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-xs group transition-colors duration-200"
            style={{ color: '#6B5D4F' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D4521A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B5D4F')}
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </div>
      </div>
    </section>
  )
}
