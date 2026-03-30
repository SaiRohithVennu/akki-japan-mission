import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { TaskStatus } from '../../types'

function TaskCheckbox({ status, onClick }: { status: TaskStatus; onClick: (e: React.MouseEvent) => void }) {
  const done = status === 'done'
  const blocked = status === 'blocked'
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center flex-shrink-0"
      style={{
        width: 22, height: 22,
        borderRadius: 4,
        background: done ? '#D4521A' : blocked ? '#ef444420' : 'transparent',
        border: `1.5px solid ${done ? '#D4521A' : blocked ? '#ef4444' : 'rgba(26,21,16,0.2)'}`,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
      title={done ? 'Mark as pending' : blocked ? 'Mark as pending' : 'Mark as done'}
    >
      {done && <Check size={13} color="white" strokeWidth={3} />}
      {blocked && <span style={{ fontSize: 10, color: '#ef4444', lineHeight: 1 }}>!</span>}
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
    <div className="flex flex-col h-full max-w-5xl mx-auto px-8 md:px-16 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex-shrink-0">
        <span className="text-xs tracking-[0.35em] uppercase" style={{ color: '#D4521A' }}>02 — Journey</span>
        <h2 className="font-display leading-none mt-1" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', color: '#1A1510' }}>
          THE <span style={{ color: '#D4521A' }}>JOURNEY</span>
        </h2>
      </motion.div>

      {/* Scrollable phase list */}
      <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D4521A transparent' }}>
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-px">
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
                  <div className="flex items-center gap-5 py-3"
                    style={{ borderBottom: `1px solid rgba(26,21,16,${isOpen ? '0' : '0.07'})` }}>
                    <span className="font-display w-12 text-right flex-shrink-0"
                      style={{ fontSize: '1.6rem', color: '#D4521A', opacity: 0.2 }}>
                      {String(phase.number).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-sm font-medium" style={{ color: '#1A1510' }}>{phase.title}</span>
                    <div style={{ width: 80, height: 2, background: 'rgba(26,21,16,0.08)', flexShrink: 0, borderRadius: 1 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: statusColor, borderRadius: 1, transition: 'width 0.8s' }} />
                    </div>
                    <span className="text-xs font-mono w-8 text-right flex-shrink-0" style={{ color: '#9A8C72' }}>
                      {pct}%
                    </span>
                    <span className="text-[10px] flex-shrink-0" style={{ color: '#9A8C72' }}>
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
                      <div className="py-2 pl-16 pr-2 space-y-1"
                        style={{ borderBottom: '1px solid rgba(26,21,16,0.07)', background: 'rgba(26,21,16,0.02)' }}>

                        {/* Column headers */}
                        <div className="flex items-center gap-3 pb-1 mb-1"
                          style={{ borderBottom: '1px solid rgba(26,21,16,0.06)' }}>
                          <div style={{ width: 22, flexShrink: 0 }} />
                          <span className="flex-1 text-[9px] tracking-widest uppercase" style={{ color: '#9A8C72' }}>Task</span>
                          <span className="text-[9px] tracking-widest uppercase w-16 text-center" style={{ color: '#9A8C72' }}>Priority</span>
                          <span className="text-[9px] tracking-widest uppercase w-8 text-center" style={{ color: '#9A8C72' }}>Link</span>
                        </div>

                        {phase.tasks.map(task => {
                          const toggleDone = (e: React.MouseEvent) => {
                            e.stopPropagation()
                            const next: TaskStatus = task.status === 'pending' ? 'done' : 'pending'
                            dispatch({ type: 'TOGGLE_TASK', phaseId: phase.id, taskId: task.id, status: next })
                          }

                          return (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 group/task"
                              style={{
                                borderRadius: 4,
                                padding: '5px 6px',
                                transition: 'background 0.15s',
                                background: task.status === 'done' ? 'rgba(212,82,26,0.04)' : 'transparent',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(26,21,16,0.05)')}
                              onMouseLeave={e => (e.currentTarget.style.background = task.status === 'done' ? 'rgba(212,82,26,0.04)' : 'transparent')}
                            >
                              {/* Checkbox */}
                              <TaskCheckbox status={task.status} onClick={toggleDone} />

                              {/* Title + meta */}
                              <div className="flex-1 min-w-0">
                                <span className="text-xs leading-relaxed"
                                  style={{
                                    color: task.status === 'done' ? '#9A8C72' : '#1A1510',
                                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                  }}>
                                  {task.title}
                                </span>
                                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                  {task.dueDate && (
                                    <span className="text-[10px] font-mono" style={{ color: '#C89B3C' }}>Due: {task.dueDate}</span>
                                  )}
                                  {task.notes && (
                                    <span className="text-[10px]" style={{ color: '#9A8C72' }}>{task.notes}</span>
                                  )}
                                </div>
                              </div>

                              {/* Priority */}
                              <span className="text-[9px] uppercase tracking-wider w-16 text-center flex-shrink-0" style={{
                                color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#C89B3C' : '#9A8C72'
                              }}>
                                {task.priority}
                              </span>

                              {/* Link */}
                              <div className="w-8 text-center flex-shrink-0">
                                {task.link ? (
                                  <a
                                    href={task.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={e => e.stopPropagation()}
                                    className="text-sm transition-opacity hover:opacity-60"
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

                        <div className="text-[9px] tracking-widest uppercase pt-2 pb-1 flex items-center gap-2" style={{ color: '#9A8C72', opacity: 0.4 }}>
                          <span>☑ checkbox = mark done</span>
                          <span>·</span>
                          <span>↗ = open official link</span>
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
