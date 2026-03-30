import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import type { AppState, Phase, University, Scholarship, Document, BudgetItem, TaskStatus, DocStatus, UniStatus, ScholarStatus } from '../types'
import { initialPhases, initialUniversities, initialScholarships, initialDocuments, initialBudget, initialResources, initialTimeline } from '../data/mockData'

const FIRESTORE_DOC = 'shared/state'

const defaultState: AppState = {
  phases: initialPhases,
  universities: initialUniversities,
  scholarships: initialScholarships,
  documents: initialDocuments,
  budget: initialBudget,
  resources: initialResources,
  timeline: initialTimeline,
}

type Action =
  | { type: 'TOGGLE_TASK'; phaseId: string; taskId: string; status: TaskStatus }
  | { type: 'UPDATE_TASK_NOTE'; phaseId: string; taskId: string; notes: string }
  | { type: 'SET_DOC_STATUS'; docId: string; status: DocStatus }
  | { type: 'SET_UNI_STATUS'; uniId: string; status: UniStatus }
  | { type: 'SET_SCHOLAR_STATUS'; scholarId: string; status: ScholarStatus }
  | { type: 'UPDATE_BUDGET_SAVED'; itemId: string; savedINR: number }
  | { type: 'SET_STATE'; state: AppState }
  | { type: 'RESET_ALL' }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_TASK':
      return {
        ...state,
        phases: state.phases.map(p =>
          p.id === action.phaseId
            ? { ...p, tasks: p.tasks.map(t => t.id === action.taskId ? { ...t, status: action.status } : t) }
            : p
        )
      }
    case 'UPDATE_TASK_NOTE':
      return {
        ...state,
        phases: state.phases.map(p =>
          p.id === action.phaseId
            ? { ...p, tasks: p.tasks.map(t => t.id === action.taskId ? { ...t, notes: action.notes } : t) }
            : p
        )
      }
    case 'SET_DOC_STATUS':
      return {
        ...state,
        documents: state.documents.map(d => d.id === action.docId ? { ...d, status: action.status } : d)
      }
    case 'SET_UNI_STATUS':
      return {
        ...state,
        universities: state.universities.map(u => u.id === action.uniId ? { ...u, status: action.status } : u)
      }
    case 'SET_SCHOLAR_STATUS':
      return {
        ...state,
        scholarships: state.scholarships.map(s => s.id === action.scholarId ? { ...s, status: action.status } : s)
      }
    case 'UPDATE_BUDGET_SAVED':
      return {
        ...state,
        budget: state.budget.map(b => b.id === action.itemId ? { ...b, savedINR: action.savedINR } : b)
      }
    case 'SET_STATE':
      return action.state
    case 'RESET_ALL':
      return defaultState
    default:
      return state
  }
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
  getOverallProgress: () => number
  getTotalTasksDone: () => number
  getTotalTasks: () => number
  getBudgetReadiness: () => number
  syncing: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [syncing, setSyncing] = useState(true)
  const [remoteWrite, setRemoteWrite] = useState(false)

  // Listen to Firestore in real-time
  useEffect(() => {
    const ref = doc(db, 'shared', 'state')
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) {
        const data = snap.data() as AppState
        setRemoteWrite(true)
        dispatch({ type: 'SET_STATE', state: data })
      } else {
        // First time — write default state to Firestore
        setDoc(ref, defaultState)
      }
      setSyncing(false)
    }, () => {
      // Firestore failed (offline?) — just use default state
      setSyncing(false)
    })
    return unsub
  }, [])

  // Push local changes to Firestore (skip when we just received from remote)
  useEffect(() => {
    if (syncing) return
    if (remoteWrite) {
      setRemoteWrite(false)
      return
    }
    const ref = doc(db, 'shared', 'state')
    setDoc(ref, state).catch(() => {})
  }, [state])

  const getTotalTasks = () => state.phases.reduce((sum, p) => sum + p.tasks.length, 0)
  const getTotalTasksDone = () => state.phases.reduce((sum, p) => sum + p.tasks.filter(t => t.status === 'done').length, 0)
  const getOverallProgress = () => {
    const total = getTotalTasks()
    if (total === 0) return 0
    return Math.round((getTotalTasksDone() / total) * 100)
  }
  const getBudgetReadiness = () => {
    const totalNeeded = state.budget.reduce((sum, b) => sum + b.estimatedINR, 0)
    const totalSaved = state.budget.reduce((sum, b) => sum + b.savedINR, 0)
    if (totalNeeded === 0) return 0
    return Math.min(100, Math.round((totalSaved / totalNeeded) * 100))
  }

  return (
    <AppContext.Provider value={{ state, dispatch, getOverallProgress, getTotalTasksDone, getTotalTasks, getBudgetReadiness, syncing }}>
      {syncing ? (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#FBF0E8', zIndex: 100 }}>
          <div className="text-center">
            <div className="font-display text-4xl mb-3" style={{ color: '#D4521A' }}>akki.</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: '#9A8C72' }}>Syncing...</div>
          </div>
        </div>
      ) : children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export type { Phase, University, Scholarship, Document, BudgetItem }
