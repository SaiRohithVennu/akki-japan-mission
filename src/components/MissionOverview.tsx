import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useApp } from '../context/AppContext'

export default function MissionOverview() {
  const { state, getOverallProgress, getTotalTasksDone, getTotalTasks, getBudgetReadiness } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const totalTasksDone = getTotalTasksDone()
  const totalTasks = getTotalTasks()
  const overallProgress = getOverallProgress()
  const budgetReadiness = getBudgetReadiness()

  const tasksPending = totalTasks - totalTasksDone
  const tasksBlocked = state.phases.reduce(
    (sum, p) => sum + p.tasks.filter(t => t.status === 'blocked').length,
    0
  )
  const unisShortlisted = state.universities.filter(
    u => u.status === 'shortlisted' || u.status === 'applied' || u.status === 'admitted'
  ).length
  const docsReady = state.documents.filter(d => d.status === 'ready').length
  const docsPending = state.documents.filter(d => d.status !== 'ready').length

  const nextUrgentTask = state.phases
    .flatMap(p => p.tasks)
    .filter(t => t.status === 'pending' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())[0]

  const topStats = [
    { value: String(totalTasksDone), label: 'Tasks Done' },
    { value: String(tasksPending), label: 'Pending' },
    { value: String(tasksBlocked), label: 'Blocked' },
    { value: String(unisShortlisted), label: 'Unis Tracked' },
    { value: `${docsReady}/${state.documents.length}`, label: 'Docs Ready' },
    { value: `${budgetReadiness}%`, label: 'Budget' },
  ]

  return (
    <section
      id="mission"
      className="py-28"
      style={{ background: '#FBF0E8' }}
    >
      <div ref={ref} className="max-w-5xl mx-auto px-8">

        {/* ── Section title ──────────────────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: '#D4521A' }}
          >
            Mission Status
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{
              fontSize: 'clamp(52px, 8vw, 110px)',
              color: '#1A1510',
              letterSpacing: '-0.01em',
            }}
          >
            COMMAND<br />
            <span style={{ color: '#D4521A' }}>CENTER</span>
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed max-w-md"
            style={{ color: '#9A8C72' }}
          >
            Real-time view of the entire operation — what&apos;s done,
            what&apos;s pending, and what needs your attention.
          </p>
        </motion.div>

        {/* ── Horizontal stat row ────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-6 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {topStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
            >
              <div
                className="font-display leading-none mb-1"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: '#D4521A' }}
              >
                {s.value}
              </div>
              <div
                className="text-xs tracking-widest uppercase"
                style={{ color: '#9A8C72' }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Thin divider ──────────────────────────────────────────────── */}
        <div className="h-px mb-16" style={{ background: 'rgba(26,21,16,0.08)' }} />

        {/* ── Overall progress bar ──────────────────────────────────────── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-end justify-between mb-3">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: '#6B5D4F' }}
            >
              Overall Mission Progress
            </span>
            <span
              className="font-display"
              style={{ fontSize: '2.5rem', color: '#D4521A', lineHeight: 1 }}
            >
              {overallProgress}%
            </span>
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(26,21,16,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#D4521A' }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${overallProgress}%` } : {}}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <p
            className="mt-2 text-xs"
            style={{ color: '#9A8C72' }}
          >
            {overallProgress < 25 && 'The journey has just begun. Stay focused.'}
            {overallProgress >= 25 && overallProgress < 50 && 'Good momentum. Keep pushing through Phase 2.'}
            {overallProgress >= 50 && overallProgress < 75 && 'Halfway through. The hardest part is still ahead.'}
            {overallProgress >= 75 && 'Almost there. The gates of Japan are opening.'}
          </p>
        </motion.div>

        {/* ── Per-phase thin rows ────────────────────────────────────────── */}
        <motion.div
          className="space-y-5 mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div
            className="text-xs tracking-[0.3em] uppercase mb-5"
            style={{ color: '#9A8C72' }}
          >
            Phase Breakdown
          </div>
          {state.phases.map((phase, i) => {
            const done = phase.tasks.filter(t => t.status === 'done').length
            const pct = phase.tasks.length
              ? Math.round((done / phase.tasks.length) * 100)
              : 0
            return (
              <motion.div
                key={phase.id}
                className="flex items-center gap-5"
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.06 }}
              >
                <span
                  className="font-display w-14 flex-shrink-0 text-right"
                  style={{ fontSize: '0.7rem', color: '#D4521A', letterSpacing: '0.05em' }}
                >
                  {phase.arc}
                </span>
                <span
                  className="w-44 flex-shrink-0 text-sm truncate"
                  style={{ color: '#1A1510' }}
                >
                  {phase.title}
                </span>
                <div
                  className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: 'rgba(26,21,16,0.08)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: pct === 100 ? '#10b981' : '#D4521A',
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.06 }}
                  />
                </div>
                <span
                  className="w-8 text-right flex-shrink-0 text-xs font-mono"
                  style={{ color: '#9A8C72' }}
                >
                  {pct}%
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Thin divider ──────────────────────────────────────────────── */}
        <div className="h-px mb-12" style={{ background: 'rgba(26,21,16,0.08)' }} />

        {/* ── Next priority task ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: '#D4521A' }}
          >
            Next Priority Task
          </div>
          {nextUrgentTask ? (
            <div>
              <div
                className="text-base font-medium mb-1"
                style={{ color: '#1A1510' }}
              >
                {nextUrgentTask.title}
              </div>
              <div
                className="text-xs"
                style={{ color: '#9A8C72' }}
              >
                Due:{' '}
                <span style={{ color: '#C89B3C' }} className="font-mono">
                  {nextUrgentTask.dueDate}
                </span>
                {nextUrgentTask.notes && (
                  <span className="ml-3">{nextUrgentTask.notes}</span>
                )}
              </div>
            </div>
          ) : (
            <div
              className="text-sm"
              style={{ color: '#9A8C72' }}
            >
              No urgent tasks with deadlines. Add due dates to tasks to see them here.
            </div>
          )}
        </motion.div>

        {/* ── Docs + budget mini row ─────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {/* Documents */}
          <div>
            <div
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: '#9A8C72' }}
            >
              Document Status
            </div>
            <div
              className="w-full h-1 rounded-full overflow-hidden mb-2"
              style={{ background: 'rgba(26,21,16,0.08)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(docsReady / state.documents.length) * 100}%`,
                  background: '#10b981',
                }}
              />
            </div>
            <div className="flex gap-5 text-xs" style={{ color: '#9A8C72' }}>
              <span style={{ color: '#10b981' }}>{docsReady} ready</span>
              <span>{docsPending} pending</span>
            </div>
          </div>

          {/* Budget */}
          <div>
            <div
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: '#9A8C72' }}
            >
              Budget Health
            </div>
            <div
              className="w-full h-1 rounded-full overflow-hidden mb-2"
              style={{ background: 'rgba(26,21,16,0.08)' }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${budgetReadiness}%`, background: '#D4521A' }}
              />
            </div>
            <div className="text-xs" style={{ color: '#9A8C72' }}>
              {budgetReadiness < 30
                ? 'Critical — start saving immediately'
                : budgetReadiness < 60
                ? 'In progress — keep the momentum'
                : 'On track — excellent preparation'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
