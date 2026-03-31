import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Background from './components/Background'
import Slide0Mission  from './components/slides/Slide0Mission'
import Slide1Command  from './components/slides/Slide1Command'
import Slide2Journey  from './components/slides/Slide2Journey'
import Slide3Unis     from './components/slides/Slide3Unis'
import Slide4Scholar  from './components/slides/Slide4Scholar'
import Slide5Docs     from './components/slides/Slide5Docs'
import Slide6Budget   from './components/slides/Slide6Budget'
import Slide7Ready    from './components/slides/Slide7Ready'

const SLIDES = [
  { id: 'mission',      label: 'Mission',       component: Slide0Mission  },
  { id: 'command',      label: 'Command',       component: Slide1Command  },
  { id: 'journey',      label: 'Journey',       component: Slide2Journey  },
  { id: 'universities', label: 'Universities',  component: Slide3Unis     },
  { id: 'scholarships', label: 'Scholarships',  component: Slide4Scholar  },
  { id: 'documents',    label: 'Documents',     component: Slide5Docs     },
  { id: 'budget',       label: 'Budget',        component: Slide6Budget   },
  { id: 'readiness',    label: 'Readiness',     component: Slide7Ready    },
]

const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 70 : -70,
    opacity: 0,
    filter: 'blur(8px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -70 : 70,
    opacity: 0,
    filter: 'blur(8px)',
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
}

function SlideNav({ current, total, onChange }: {
  current: number
  total: number
  onChange: (i: number) => void
}) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="group relative flex items-center justify-end gap-2"
          title={SLIDES[i].label}
        >
          {/* Label on hover */}
          <span
            className="absolute right-5 text-[9px] tracking-widest uppercase whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ color: '#6B5D4F' }}
          >
            {SLIDES[i].label}
          </span>

          {/* Dot */}
          <motion.div
            animate={{
              width:  i === current ? 20 : 6,
              height: i === current ? 6  : 6,
              background: i === current ? '#D4521A' : 'rgba(26,21,16,0.2)',
              borderRadius: i === current ? 3 : '50%',
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      ))}
    </div>
  )
}

function AppInner() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const cooldown = useRef(false)
  const touchStart = useRef<number | null>(null)

  const go = useCallback((next: number) => {
    if (next < 0 || next >= SLIDES.length || cooldown.current) return
    setDir(next > current ? 1 : -1)
    setCurrent(next)
    cooldown.current = true
    setTimeout(() => { cooldown.current = false }, 900)
  }, [current])

  // Wheel — respect inner scrollable containers
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Walk up the DOM to find a scrollable ancestor
      let el = e.target as HTMLElement | null
      while (el && el !== document.body) {
        const { overflowY } = window.getComputedStyle(el)
        const scrollable = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight
        if (scrollable) {
          const atTop    = el.scrollTop <= 0
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
          // Only navigate slides when the inner container hit its boundary
          if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
            e.preventDefault()
            if (Math.abs(e.deltaY) >= 20) go(current + (e.deltaY > 0 ? 1 : -1))
          }
          return
        }
        el = el.parentElement
      }
      // No inner scrollable — navigate slides directly
      e.preventDefault()
      if (Math.abs(e.deltaY) < 30) return
      go(current + (e.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [current, go])

  // Keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') go(current + 1)
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  go(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, go])

  // Touch
  const touchTarget = useRef<EventTarget | null>(null)
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY
      touchTarget.current = e.target
    }
    const onEnd = (e: TouchEvent) => {
      if (touchStart.current === null) return
      const delta = touchStart.current - e.changedTouches[0].clientY
      touchStart.current = null

      if (Math.abs(delta) < 50) return

      // Walk up DOM from touch target — if inside a scrollable container,
      // only navigate when that container is at its boundary
      let el = touchTarget.current as HTMLElement | null
      while (el && el !== document.body) {
        const { overflowY } = window.getComputedStyle(el)
        const scrollable = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight
        if (scrollable) {
          const atTop    = el.scrollTop <= 2
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
          if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
            go(current + (delta > 0 ? 1 : -1))
          }
          return
        }
        el = el.parentElement
      }
      // No inner scrollable — navigate slide
      go(current + (delta > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd)
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd) }
  }, [current, go])

  const Slide = SLIDES[current].component

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#FBF0E8' }}>

      {/* Persistent animated background */}
      <Background />

      {/* Slide content */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right nav dots */}
      <SlideNav current={current} total={SLIDES.length} onChange={i => go(i)} />

      {/* Bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8"
        style={{ height: 44, borderTop: '1px solid rgba(26,21,16,0.07)', background: 'rgba(251,240,232,0.85)', backdropFilter: 'blur(12px)' }}
      >
        {/* Logo */}
        <span className="font-display text-lg tracking-widest" style={{ color: '#D4521A' }}>akki.</span>

        {/* Slide counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase hidden sm:block" style={{ color: '#9A8C72' }}>
            {SLIDES[current].label}
          </span>
          <span className="font-mono text-xs" style={{ color: '#6B5D4F' }}>
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="text-xs transition-opacity duration-200"
            style={{ color: '#9A8C72', opacity: current === 0 ? 0.3 : 1 }}
          >
            ↑
          </button>
          <button
            onClick={() => go(current + 1)}
            disabled={current === SLIDES.length - 1}
            className="text-xs transition-opacity duration-200"
            style={{ color: '#9A8C72', opacity: current === SLIDES.length - 1 ? 0.3 : 1 }}
          >
            ↓
          </button>
        </div>
      </div>

      {/* Top progress line */}
      <motion.div
        className="fixed top-0 left-0 z-50"
        style={{ height: 2, background: '#D4521A' }}
        animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
