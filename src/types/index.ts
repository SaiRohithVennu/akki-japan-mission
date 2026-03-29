export type TaskStatus = 'done' | 'pending' | 'blocked'
export type PhaseStatus = 'locked' | 'pending' | 'in-progress' | 'complete'
export type DocStatus = 'ready' | 'pending' | 'needs-update'
export type UniStatus = 'researching' | 'shortlisted' | 'applied' | 'admitted' | 'rejected'
export type ScholarStatus = 'researching' | 'eligible' | 'applied' | 'awarded' | 'rejected'
export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  status: TaskStatus
  dueDate?: string
  notes?: string
  link?: string
  priority: Priority
}

export interface Phase {
  id: string
  number: number
  arc: string
  title: string
  description: string
  status: PhaseStatus
  tasks: Task[]
}

export interface University {
  id: string
  name: string
  location: string
  program: string
  language: 'English' | 'Japanese' | 'Both'
  deadline: string
  tuitionJPY: number
  scholarshipAvailable: boolean
  applicationLink: string
  status: UniStatus
  notes: string
  ranking?: number
}

export interface Scholarship {
  id: string
  name: string
  provider: string
  eligibility: string
  deadline: string
  benefitsJPY: number
  benefitsDesc: string
  officialLink: string
  status: ScholarStatus
  notes: string
  type: 'government' | 'university' | 'private' | 'ngo'
}

export interface Document {
  id: string
  name: string
  category: string
  status: DocStatus
  notes: string
  expiry?: string
  required: boolean
}

export interface BudgetItem {
  id: string
  category: string
  icon: string
  estimatedJPY: number
  estimatedINR: number
  savedINR: number
  notes: string
}

export interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: 'official' | 'scholarship' | 'visa' | 'language' | 'exam' | 'university'
}

export interface TimelineEvent {
  id: string
  title: string
  date: string
  description: string
  status: 'done' | 'today' | 'upcoming' | 'future'
  category: string
}

export interface AppState {
  phases: Phase[]
  universities: University[]
  scholarships: Scholarship[]
  documents: Document[]
  budget: BudgetItem[]
  resources: Resource[]
  timeline: TimelineEvent[]
}
