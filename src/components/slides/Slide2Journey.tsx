import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { TaskStatus } from '../../types'

function TaskCheckbox({ status, onClick }: { status: TaskStatus; onClick: (e: React.MouseEvent) => void }) {
  const done = status === 'done'
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 26, height: 26,
        borderRadius: 5,
        background: done ? '#D4521A' : 'transparent',
        border: `2px solid ${done ? '#D4521A' : 'rgba(26,21,16,0.2)'}`,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      title={done ? 'Mark as pending' : 'Mark as done'}
    >
      {done && <Check size={14} color="white" strokeWidth={3} />}
    </motion.button>
  )
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}
const rowAnim = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45 } },
}

export default function Slide2Journey() {
  const { state, dispatch } = useApp()
  const [expanded, setExpanded] = useState<string | null>(
    state.phases[0]?.id ?? null
  )

  return (
    <div className="flex flex-col h-full py-8" style={{ paddingLeft: '22%', paddingRight: '3rem' }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex-shrink-0">
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>02 — Journey</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: '#1A1510' }}>
          THE <span style={{ color: '#D4521A' }}>JOURNEY</span>
        </h2>
      </motion.div>

      {/* Scrollable phase list */}
      <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4521A transparent' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-1">
          {state.phases.map(phase => {
            const done = phase.tasks.filter(t => t.status === 'done').length
            const pct = phase.tasks.length ? Math.round((done / phase.tasks.length) * 100) : 0
            const isOpen = expanded === phase.id
            const statusColor = pct === 100 ? '#059669' : pct > 0 ? '#D4521A' : '#9A8C72'

            return (
              <motion.div key={phase.id} variants={rowAnim}>
                {/* Phase row */}
                <button
                  className="w-full text-left"
                  onClick={() => setExpanded(isOpen ? null : phase.id)}
                >
                  <div className="flex items-center gap-5 py-4"
                    style={{ borderBottom: `1px solid rgba(26,21,16,${isOpen ? '0' : '0.08'})` }}>
                    {/* Number */}
                    <span className="font-display w-10 text-right flex-shrink-0"
                      style={{ fontSize: '1.4rem', color: '#D4521A', opacity: 0.4 }}>
                      {String(phase.number).padStart(2, '0')}
                    </span>
                    {/* Title */}
                    <span className="flex-1 font-medium" style={{ fontSize: '1rem', color: '#1A1510' }}>{phase.title}</span>
                    {/* Progress bar */}
                    <div style={{ width: 100, height: 3, background: 'rgba(26,21,16,0.08)', flexShrink: 0, borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: statusColor, borderRadius: 2, transition: 'width 0.8s' }} />
                    </div>
                    <span className="font-mono w-10 text-right flex-shrink-0" style={{ fontSize: '0.8rem', color: '#9A8C72' }}>
                      {pct}%
                    </span>
                    <span className="flex-shrink-0 text-xs" style={{ color: '#9A8C72' }}>
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {/* Expanded tasks */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="py-3 pl-14 pr-2"
                        style={{ borderBottom: '1px solid rgba(26,21,16,0.08)', background: 'rgba(26,21,16,0.02)' }}>

                        {/* Column headers */}
                        <div className="flex items-center gap-4 pb-2 mb-2"
                          style={{ borderBottom: '1px solid rgba(26,21,16,0.06)' }}>
                          <div style={{ width: 26, flexShrink: 0 }} />
                          <span className="flex-1 text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>Task</span>
                          <span className="text-xs tracking-widest uppercase w-20 text-center" style={{ color: '#9A8C72' }}>Priority</span>
                          <span className="text-xs tracking-widest uppercase w-10 text-center" style={{ color: '#9A8C72' }}>Link</span>
                        </div>

                        <div className="space-y-1">
                          {phase.tasks.map(task => {
                            const toggleDone = (e: React.MouseEvent) => {
                              e.stopPropagation()
                              const next: TaskStatus = task.status === 'pending' ? 'done' : 'pending'
                              dispatch({ type: 'TOGGLE_TASK', phaseId: phase.id, taskId: task.id, status: next })
                            }

                            return (
                              <div
                                key={task.id}
                                className="flex items-center gap-4"
                                style={{
                                  borderRadius: 6,
                                  padding: '10px 8px',
                                  transition: 'background 0.15s',
                                  background: task.status === 'done' ? 'rgba(212,82,26,0.05)' : 'transparent',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,21,16,0.05)')}
                                onMouseLeave={e => (e.currentTarget.style.background = task.status === 'done' ? 'rgba(212,82,26,0.05)' : 'transparent')}
                              >
                                {/* Checkbox */}
                                <TaskCheckbox status={task.status} onClick={toggleDone} />

                                {/* Title + meta */}
                                <div className="flex-1 min-w-0">
                                  <div style={{
                                    fontSize: '0.875rem',
                                    color: task.status === 'done' ? '#9A8C72' : '#1A1510',
                                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                    lineHeight: 1.4,
                                  }}>
                                    {task.title}
                                  </div>
                                  <div className="flex items-center gap-3 flex-wrap mt-1">
                                    {task.dueDate && (
                                      <span className="text-xs font-mono" style={{ color: '#C89B3C' }}>Due: {task.dueDate}</span>
                                    )}
                                    {task.notes && (
                                      <span className="text-xs" style={{ color: '#9A8C72' }}>{task.notes}</span>
                                    )}
                                  </div>
                                </div>

                                {/* Priority */}
                                <span className="text-xs uppercase tracking-wider w-20 text-center flex-shrink-0 font-medium" style={{
                                  color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#C89B3C' : '#9A8C72'
                                }}>
                                  {task.priority}
                                </span>

                                {/* Link */}
                                <div className="w-10 text-center flex-shrink-0">
                                  {task.link ? (
                                    <a
                                      href={task.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="text-base transition-opacity hover:opacity-60"
                                      style={{ color: '#D4521A' }}
                                      title="Open official link"
                                    >
                                      ↗
                                    </a>
                                  ) : (
                                    <span style={{ color: 'rgba(26,21,16,0.15)' }}>—</span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        <div className="text-xs pt-3 pb-1 flex items-center gap-2" style={{ color: '#9A8C72', opacity: 0.5 }}>
                          <span>☑ = mark done</span>
                          <span>·</span>
                          <span>↗ = open link</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
