import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navLinks = [
  { id: 'mission', label: 'Overview' },
  { id: 'journey', label: 'Journey' },
  { id: 'universities', label: 'Universities' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'documents', label: 'Docs' },
  { id: 'budget', label: 'Budget' },
  { id: 'timeline', label: 'Timeline' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { getOverallProgress } = useApp()
  const progress = getOverallProgress()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(251,240,232,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,21,16,0.08)' : '1px solid transparent',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-lg tracking-widest transition-colors duration-200"
            style={{ color: '#D4521A' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E8693A' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D4521A' }}
          >
            akki.
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
                style={{ color: scrolled ? '#6B5D4F' : '#9A8C72' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#1A1510' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = scrolled ? '#6B5D4F' : '#9A8C72' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Progress pill */}
          <div className="hidden sm:flex items-center gap-3">
            <div
              className="w-20 h-0.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(26,21,16,0.12)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: '#D4521A' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 2 }}
              />
            </div>
            <span
              className="text-[10px] font-mono font-bold"
              style={{ color: '#D4521A' }}
            >
              {progress}%
            </span>

            {/* Mobile menu button */}
            <button
              className="lg:hidden ml-2 transition-colors duration-200"
              style={{ color: '#6B5D4F' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile menu button — if progress pill not shown */}
          <button
            className="sm:hidden transition-colors duration-200"
            style={{ color: '#6B5D4F' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Thin progress line at bottom of nav */}
        <div className="h-px" style={{ background: 'rgba(26,21,16,0.06)' }}>
          <motion.div
            className="h-full"
            style={{ background: '#D4521A' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: 2 }}
          />
        </div>
      </motion.nav>

      {/* Mobile Menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 lg:hidden"
            style={{ background: 'rgba(251,240,232,0.97)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-display tracking-widest transition-colors"
                style={{ fontSize: 'clamp(28px, 7vw, 44px)', color: '#1A1510' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D4521A' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#1A1510' }}
              >
                {link.label}
              </motion.button>
            ))}
            <div
              className="mt-4 text-xs tracking-widest"
              style={{ color: '#9A8C72' }}
            >
              Mission:{' '}
              <span style={{ color: '#D4521A' }} className="font-bold">
                {progress}%
              </span>{' '}
              complete
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
