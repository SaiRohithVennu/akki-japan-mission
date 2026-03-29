import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, Minus, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useApp } from '../context/AppContext'
import type { Phase, TaskStatus } from '../types'

/* ─── Single task row ──────────────────────────────────────────────────────── */
function TaskRow({ task, phaseId }: { task: Phase['tasks'][0]; phaseId: string }) {
  const { dispatch } = useApp()

  const cycleStatus = () => {
    const next: TaskStatus =
      task.status === 'pending' ? 'done' : task.status === 'done' ? 'blocked' : 'pending'
    dispatch({ type: 'TOGGLE_TASK', phaseId, taskId: task.id, status: next })
  }

  const checkboxBg =
    task.status === 'done'
      ? '#10b981'
      : task.status === 'blocked'
      ? '#ef4444'
      : 'transparent'

  const checkboxBorder =
    task.status === 'done'
      ? '#10b981'
      : task.status === 'blocked'
      ? '#ef4444'
      : 'rgba(26,21,16,0.2)'

  return (
    <div
      className="flex items-start gap-3 py-2.5 cursor-pointer group"
      onClick={cycleStatus}
      style={{ borderBottom: '1px solid rgba(26,21,16,0.06)' }}
    >
      {/* Checkbox */}
      <div
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
        style={{ background: checkboxBg, border: `1.5px solid ${checkboxBorder}` }}
      >
        {task.status === 'done' && <Check size={10} color="white" strokeWidth={3} />}
        {task.status === 'blocked' && <Minus size={10} color="white" strokeWidth={3} />}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span
          className="text-sm leading-relaxed"
          style={{
            color:
              task.status === 'done'
                ? '#9A8C72'
                : task.status === 'blocked'
                ? '#ef4444'
                : '#1A1510',
            textDecoration: task.status === 'done' ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </span>
        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
          {task.dueDate && (
            <span className="text-[10px] font-mono" style={{ color: '#C89B3C' }}>
              Due {task.dueDate}
            </span>
          )}
          {task.notes && (
            <span className="text-[10px] truncate max-w-xs" style={{ color: '#9A8C72' }}>
              {task.notes}
            </span>
          )}
          {task.link && (
            <a
              href={task.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] flex items-center gap-1 hover:underline"
              style={{ color: '#D4521A' }}
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={9} />
              Link
            </a>
          )}
        </div>
      </div>

      {/* Priority dot */}
      <span
        className="text-[9px] tracking-widest uppercase flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded"
        style={{
          color:
            task.priority === 'high'
              ? '#ef4444'
              : task.priority === 'medium'
              ? '#C89B3C'
              : '#9A8C72',
          background:
            task.priority === 'high'
              ? 'rgba(239,68,68,0.1)'
              : task.priority === 'medium'
              ? 'rgba(200,155,60,0.1)'
              : 'rgba(154,140,114,0.1)',
        }}
      >
        {task.priority}
      </span>
    </div>
  )
}

/* ─── Phase card ───────────────────────────────────────────────────────────── */
function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const [expanded, setExpanded] = useState(phase.status === 'in-progress')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const doneTasks = phase.tasks.filter(t => t.status === 'done').length
  const totalTasks = phase.tasks.length
  const pct = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0

  const statusLabel =
    phase.status === 'complete'
      ? 'Complete'
      : phase.status === 'in-progress'
      ? 'In Progress'
      : 'Locked'

  const statusColor =
    phase.status === 'complete'
      ? '#10b981'
      : phase.status === 'in-progress'
      ? '#D4521A'
      : '#9A8C72'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-sm overflow-hidden"
      style={{
        background: '#FFFFFF',
        opacity: phase.status === 'locked' ? 0.55 : 1,
      }}
    >
      {/* Card header */}
      <button
        className="w-full text-left p-6 relative"
        onClick={() => phase.status !== 'locked' && setExpanded(!expanded)}
        style={{ cursor: phase.status === 'locked' ? 'default' : 'pointer' }}
      >
        {/* Big arc number watermark */}
        <div
          className="absolute top-4 right-5 font-display leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(60px, 8vw, 100px)',
            color: '#D4521A',
            opacity: 0.07,
          }}
        >
          {phase.number}
        </div>

        <div className="flex items-start gap-4">
          {/* Number badge */}
          <div
            className="w-10 h-10 rounded flex items-center justify-center font-display text-xl flex-shrink-0"
            style={{ background: '#FBF0E8', color: '#D4521A' }}
          >
            {phase.number}
          </div>

          <div className="flex-1 min-w-0">
            {/* Arc + status */}
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="text-[10px] font-mono tracking-widest uppercase"
                style={{ color: '#9A8C72' }}
              >
                {phase.arc}
              </span>
              <span
                className="text-[10px] tracking-widest uppercase font-semibold"
                style={{ color: statusColor }}
              >
                {statusLabel}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display leading-tight mb-2"
              style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#1A1510' }}
            >
              {phase.title}
            </h3>

            {/* Description */}
            <p className="text-xs leading-relaxed max-w-sm" style={{ color: '#9A8C72' }}>
              {phase.description}
            </p>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mt-4">
              <div
                className="flex-1 h-0.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(26,21,16,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: pct === 100 ? '#10b981' : '#D4521A' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.07 + 0.25 }}
                />
              </div>
              <span
                className="text-xs font-mono flex-shrink-0"
                style={{ color: '#9A8C72' }}
              >
                {doneTasks}/{totalTasks}
              </span>
              {phase.status !== 'locked' && (
                <span style={{ color: '#9A8C72' }}>
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded task list */}
      <AnimatePresence>
        {expanded && phase.status !== 'locked' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 pt-0"
              style={{ borderTop: '1px solid rgba(26,21,16,0.07)' }}
            >
              <div
                className="text-[9px] tracking-[0.3em] uppercase pt-4 mb-2"
                style={{ color: '#9A8C72' }}
              >
                Tasks — click to toggle status
              </div>
              {phase.tasks.map(task => (
                <TaskRow key={task.id} task={task} phaseId={phase.id} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Section ──────────────────────────────────────────────────────────────── */
export default function JourneyChapters() {
  const { state } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="journey"
      className="py-28"
      style={{ background: '#F5E8D8' }}
    >
      <div className="max-w-5xl mx-auto px-8">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          ref={ref}
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: '#D4521A' }}
          >
            The Story
          </span>
          <h2
            className="font-display mt-2 leading-none"
            style={{
              fontSize: 'clamp(52px, 8vw, 110px)',
              color: '#1A1510',
              letterSpacing: '-0.01em',
            }}
          >
            JOURNEY<br />
            <span style={{ color: '#D4521A' }}>CHAPTERS</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: '#9A8C72' }}>
            Eight arcs. Each one a chapter in the mission. Click any phase to
            expand tasks — tap a task to mark it done.
          </p>
        </motion.div>

        {/* ── Phase grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {state.phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}
        </div>

        {/* ── Legend ─────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 flex items-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <span
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: '#9A8C72' }}
          >
            Task status:
          </span>
          {[
            { color: '#10b981', label: 'Done' },
            { color: 'rgba(26,21,16,0.2)', label: 'Pending', border: true },
            { color: '#ef4444', label: 'Blocked' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded"
                style={{
                  background: s.color,
                  border: s.border ? `1.5px solid ${s.color}` : 'none',
                }}
              />
              <span className="text-[10px]" style={{ color: '#6B5D4F' }}>
                {s.label}
              </span>
            </div>
          ))}
          <span className="text-[9px] italic" style={{ color: '#9A8C72' }}>
            Click any task to cycle its status
          </span>
        </motion.div>
      </div>
    </section>
  )
}
