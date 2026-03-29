import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

function ArcRing({ progress }: { progress: number }) {
  const r = 70
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ
  return (
    <div className="relative" style={{ width: 180, height: 180 }}>
      <svg viewBox="0 0 160 160" width="180" height="180" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(26,21,16,0.08)" strokeWidth="4" />
        <motion.circle
          cx="80" cy="80" r={r}
          fill="none" strokeWidth="4" strokeLinecap="round"
          stroke="#D4521A"
          strokeDasharray={circ}
          strokeDashoffset={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="font-display leading-none"
          style={{ fontSize: '3.5rem', color: '#D4521A' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
        <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#9A8C72' }}>overall</div>
      </div>
    </div>
  )
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}
const row = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Slide1Command() {
  const { state, getOverallProgress, getTotalTasksDone, getTotalTasks, getBudgetReadiness } = useApp()
  const overall = getOverallProgress()
  const done = getTotalTasksDone()
  const total = getTotalTasks()
  const budget = getBudgetReadiness()

  const nextTask = state.phases
    .flatMap(p => p.tasks)
    .filter(t => t.status === 'pending' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0]

  const miniStats = [
    { label: 'Done',    value: done,           color: '#1A1510' },
    { label: 'Pending', value: total - done,    color: '#C89B3C' },
    { label: 'Budget',  value: `${budget}%`,   color: '#D4521A' },
  ]

  return (
    <div className="flex flex-col justify-center h-full max-w-5xl mx-auto px-8 md:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>01 — Status</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(44px, 7vw, 90px)', color: '#1A1510' }}>
          COMMAND <span style={{ color: '#D4521A' }}>CENTER</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Left: ring + mini stats */}
        <motion.div
          className="flex flex-col items-start gap-8"
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <ArcRing progress={overall} />

          <div className="flex gap-10">
            {miniStats.map(s => (
              <div key={s.label}>
                <div className="font-display leading-none" style={{ fontSize: '2.5rem', color: s.color }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#9A8C72' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Next urgent task */}
          {nextTask && (
            <div style={{ borderLeft: '2px solid #D4521A', paddingLeft: '1rem' }}>
              <div className="text-xs tracking-widest uppercase mb-1" style={{ color: '#D4521A' }}>Next priority</div>
              <div className="text-sm" style={{ color: '#1A1510' }}>{nextTask.title}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: '#C89B3C' }}>{nextTask.dueDate}</div>
            </div>
          )}
        </motion.div>

        {/* Right: phase bars */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#9A8C72' }}>Phase Breakdown</div>
          <div className="space-y-4">
            {state.phases.map(p => {
              const d = p.tasks.filter(t => t.status === 'done').length
              const pct = p.tasks.length ? Math.round((d / p.tasks.length) * 100) : 0
              const statusColor = p.status === 'complete' ? '#059669' : p.status === 'in-progress' ? '#D4521A' : '#9A8C72'
              return (
                <motion.div key={p.id} variants={row}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-xs" style={{ color: '#D4521A', opacity: 0.5 }}>{p.arc}</span>
                      <span className="text-sm" style={{ color: '#1A1510' }}>{p.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: statusColor }}>{pct}%</span>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                    </div>
                  </div>
                  <div style={{ height: 2, background: 'rgba(26,21,16,0.08)', borderRadius: 1 }}>
                    <motion.div
                      style={{ height: '100%', background: statusColor === '#059669' ? '#059669' : '#D4521A', borderRadius: 1 }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
