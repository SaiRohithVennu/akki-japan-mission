import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import type { TaskStatus } from '../../types'

function StatusDot({ status, onClick }: { status: TaskStatus; onClick: () => void }) {
  const color = status === 'done' ? '#D4521A' : status === 'blocked' ? '#ef4444' : 'transparent'
  const border = status === 'done' ? '#D4521A' : status === 'blocked' ? '#ef4444' : 'rgba(26,21,16,0.25)'
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 1.5 }}
      whileHover={{ scale: 1.2 }}
      style={{
        width: 10, height: 10, borderRadius: '50%',
        background: color, border: `1.5px solid ${border}`,
        flexShrink: 0, cursor: 'pointer',
      }}
      animate={{ scale: [1, status === 'done' ? 1.15 : 1, 1] }}
      transition={{ duration: 0.3 }}
    />
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
    state.phases.find(p => p.status === 'in-progress')?.id ?? null
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
            const statusColor = phase.status === 'complete' ? '#059669' : phase.status === 'in-progress' ? '#D4521A' : '#9A8C72'

            return (
              <motion.div key={phase.id} variants={rowAnim}>
                {/* Phase row */}
                <button
                  className="w-full text-left"
                  style={{ opacity: phase.status === 'locked' ? 0.45 : 1 }}
                  onClick={() => phase.status !== 'locked' && setExpanded(isOpen ? null : phase.id)}
                >
                  <div className="flex items-center gap-5 py-3"
                    style={{ borderBottom: `1px solid rgba(26,21,16,${isOpen ? '0' : '0.07'})` }}>
                    {/* Arc number */}
                    <span className="font-display w-12 text-right flex-shrink-0"
                      style={{ fontSize: '1.6rem', color: '#D4521A', opacity: 0.2 }}>
                      {String(phase.number).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-sm font-medium" style={{ color: '#1A1510' }}>{phase.title}</span>

                    {/* Progress bar */}
                    <div style={{ width: 80, height: 2, background: 'rgba(26,21,16,0.08)', flexShrink: 0, borderRadius: 1 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: statusColor, borderRadius: 1, transition: 'width 0.8s' }} />
                    </div>

                    {/* Status dot */}
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />

                    {/* % */}
                    <span className="text-xs font-mono w-8 text-right flex-shrink-0" style={{ color: '#9A8C72' }}>
                      {pct}%
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
                      <div className="py-3 pl-16 pr-4 space-y-2.5"
                        style={{ borderBottom: '1px solid rgba(26,21,16,0.07)', background: 'rgba(26,21,16,0.02)' }}>
                        {phase.tasks.map(task => (
                          <div key={task.id} className="flex items-start gap-3">
                            <StatusDot
                              status={task.status}
                              onClick={() => {
                                const next: TaskStatus = task.status === 'pending' ? 'done' : task.status === 'done' ? 'blocked' : 'pending'
                                dispatch({ type: 'TOGGLE_TASK', phaseId: phase.id, taskId: task.id, status: next })
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-xs leading-relaxed"
                                style={{
                                  color: task.status === 'done' ? '#9A8C72' : task.status === 'blocked' ? '#ef4444' : '#1A1510',
                                  textDecoration: task.status === 'done' ? 'line-through' : 'none',
                                }}>
                                {task.title}
                              </span>
                              {task.dueDate && (
                                <span className="text-[10px] font-mono ml-3" style={{ color: '#C89B3C' }}>{task.dueDate}</span>
                              )}
                            </div>
                            <span className="text-[9px] uppercase tracking-wider flex-shrink-0" style={{
                              color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#C89B3C' : '#9A8C72'
                            }}>
                              {task.priority}
                            </span>
                          </div>
                        ))}
                        <div className="text-[9px] tracking-widest uppercase pt-1" style={{ color: '#9A8C72', opacity: 0.6 }}>
                          tap dot to cycle: pending → done → blocked
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
