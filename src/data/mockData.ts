import type { Phase, University, Scholarship, Document, BudgetItem, Resource, TimelineEvent } from '../types'

export const initialPhases: Phase[] = [
  {
    id: 'p1', number: 1, arc: 'Arc I',
    title: 'The Calling',
    description: 'Every great journey begins with a decision. Define your purpose, your goals, and the course that will shape your future in Japan.',
    status: 'complete',
    tasks: [
      { id: 't1-1', title: 'Decide on field of study', status: 'done', priority: 'high' },
      { id: 't1-2', title: 'Research life in Japan as an Indian student', status: 'done', priority: 'high' },
      { id: 't1-3', title: 'Discuss with family and secure their support', status: 'done', priority: 'high' },
      { id: 't1-4', title: 'Set target universities and define goals', status: 'done', priority: 'medium' },
      { id: 't1-5', title: 'Understand the full timeline and phases', status: 'done', priority: 'medium' },
    ]
  },
  {
    id: 'p2', number: 2, arc: 'Arc II',
    title: 'Preparing the Arsenal',
    description: 'Before the gates open, the papers must be ready. Collect every document, verify every seal, and build your fortress of credentials.',
    status: 'in-progress',
    tasks: [
      { id: 't2-1', title: 'Passport valid and ready (min. 2 years)', status: 'done', priority: 'high' },
      { id: 't2-2', title: 'Degree certificate collected from university', status: 'done', priority: 'high' },
      { id: 't2-3', title: 'Transcripts collected (all semesters)', status: 'pending', priority: 'high', dueDate: '2025-04-15', notes: 'Need registrar sign + seal on each page' },
      { id: 't2-4', title: 'Recommendation letters requested (2 professors)', status: 'pending', priority: 'high', dueDate: '2025-04-20' },
      { id: 't2-5', title: 'Statement of Purpose (SOP) drafted', status: 'pending', priority: 'high' },
      { id: 't2-6', title: 'Updated CV / Resume prepared', status: 'done', priority: 'medium' },
      { id: 't2-7', title: 'Passport photos taken (Japan spec: 4.5×3.5cm)', status: 'done', priority: 'low' },
      { id: 't2-8', title: 'Bank statements ready (6 months, min. ₹15L)', status: 'pending', priority: 'medium', dueDate: '2025-05-01' },
      { id: 't2-9', title: 'Research proposal drafted (if required)', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 'p3', number: 3, arc: 'Arc III',
    title: 'Choosing the Path',
    description: 'The map is vast. Research your universities, narrow your choices, and select the paths worth walking.',
    status: 'in-progress',
    tasks: [
      { id: 't3-1', title: 'Shortlist 5–8 universities', status: 'done', priority: 'high' },
      { id: 't3-2', title: 'Verify English-taught programs available', status: 'done', priority: 'high' },
      { id: 't3-3', title: 'Research faculty and research labs for each', status: 'pending', priority: 'medium' },
      { id: 't3-4', title: 'Send cold emails to target professors', status: 'pending', priority: 'high', dueDate: '2025-04-10' },
      { id: 't3-5', title: 'Compare tuition fees and total cost of living', status: 'done', priority: 'medium' },
      { id: 't3-6', title: 'Check admission requirements per university', status: 'pending', priority: 'high' },
    ]
  },
  {
    id: 'p4', number: 4, arc: 'Arc IV',
    title: 'Language Forging',
    description: 'Language is your sword in a foreign land. Secure your English scores, begin Japanese basics, and prepare for JLPT.',
    status: 'in-progress',
    tasks: [
      { id: 't4-1', title: 'IELTS / TOEFL score secured', status: 'done', priority: 'high', notes: 'IELTS 7.0 Band' },
      { id: 't4-2', title: 'Learn Hiragana and Katakana (basics)', status: 'done', priority: 'medium' },
      { id: 't4-3', title: 'Set up Anki deck for Japanese vocabulary', status: 'done', priority: 'low' },
      { id: 't4-4', title: 'Register for JLPT N5 or N4', status: 'pending', priority: 'medium', dueDate: '2025-06-01' },
      { id: 't4-5', title: 'Check EJU requirements for target universities', status: 'pending', priority: 'medium' },
      { id: 't4-6', title: 'Complete beginner Japanese course (N5 level)', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 'p5', number: 5, arc: 'Arc V',
    title: 'Scholarship Hunt',
    description: 'No scholarship left unchecked. Research, apply, and chase every opportunity to fund the mission.',
    status: 'in-progress',
    tasks: [
      { id: 't5-1', title: 'MEXT Scholarship — track Embassy route', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/', dueDate: '2025-05-31' },
      { id: 't5-2', title: 'JASSO Scholarship — check eligibility', status: 'pending', priority: 'high' },
      { id: 't5-3', title: 'ADB-Japan Scholarship — review requirements', status: 'pending', priority: 'medium' },
      { id: 't5-4', title: 'University-specific scholarships researched', status: 'pending', priority: 'medium' },
      { id: 't5-5', title: 'Create a spreadsheet of all deadlines', status: 'pending', priority: 'low' },
    ]
  },
  {
    id: 'p6', number: 6, arc: 'Arc VI',
    title: 'University Applications',
    description: 'The moment of commitment. Applications filed, essays submitted — the waiting begins.',
    status: 'locked',
    tasks: [
      { id: 't6-1', title: 'Submit application to University #1 (UTokyo)', status: 'pending', priority: 'high' },
      { id: 't6-2', title: 'Submit application to University #2 (Osaka)', status: 'pending', priority: 'high' },
      { id: 't6-3', title: 'Submit application to University #3 (TokyoTech)', status: 'pending', priority: 'high' },
      { id: 't6-4', title: 'Pay application fees where required', status: 'pending', priority: 'medium' },
      { id: 't6-5', title: 'Track all application statuses', status: 'pending', priority: 'medium' },
      { id: 't6-6', title: 'Prepare for interviews if invited', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 'p7', number: 7, arc: 'Arc VII',
    title: 'COE + Visa',
    description: 'The final administrative battle. Certificate of Eligibility, Student Visa — the last official gates before Japan.',
    status: 'locked',
    tasks: [
      { id: 't7-1', title: 'Receive official admission letter', status: 'pending', priority: 'high' },
      { id: 't7-2', title: 'University files COE application on your behalf', status: 'pending', priority: 'high' },
      { id: 't7-3', title: 'COE received (allow 1–3 months)', status: 'pending', priority: 'high' },
      { id: 't7-4', title: 'Student visa application submitted at Embassy', status: 'pending', priority: 'high' },
      { id: 't7-5', title: 'Visa stamped and received', status: 'pending', priority: 'high' },
      { id: 't7-6', title: 'Pre-departure briefing attended', status: 'pending', priority: 'low' },
    ]
  },
  {
    id: 'p8', number: 8, arc: 'Arc VIII',
    title: 'Flight + New Life',
    description: 'The gate opens. The flight is booked. Japan awaits. This is where the mission becomes reality.',
    status: 'locked',
    tasks: [
      { id: 't8-1', title: 'Flight booked (aim for 1 week before enrollment)', status: 'pending', priority: 'high' },
      { id: 't8-2', title: 'Accommodation finalized (dorm or share house)', status: 'pending', priority: 'high' },
      { id: 't8-3', title: 'Japanese national health insurance arranged', status: 'pending', priority: 'high' },
      { id: 't8-4', title: 'Japan bank account research done (Japan Post)', status: 'pending', priority: 'medium' },
      { id: 't8-5', title: 'SIM card plan for Japan researched', status: 'pending', priority: 'medium' },
      { id: 't8-6', title: 'Emergency contacts list prepared', status: 'pending', priority: 'low' },
      { id: 't8-7', title: 'Packing list completed and bags packed', status: 'pending', priority: 'low' },
    ]
  },
]

export const initialUniversities: University[] = [
  {
    id: 'u1', name: 'The University of Tokyo', location: 'Tokyo', ranking: 1,
    program: 'Graduate School of Engineering — M.Eng',
    language: 'English', deadline: '2025-11-30',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.u-tokyo.ac.jp/en/',
    status: 'shortlisted',
    notes: 'Top-ranked in Asia. Highly competitive. Must contact professor first. Strong MEXT support.'
  },
  {
    id: 'u2', name: 'Tokyo Institute of Technology', location: 'Tokyo', ranking: 3,
    program: 'School of Computing — Master\'s Program',
    language: 'English', deadline: '2025-12-15',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.titech.ac.jp/english/',
    status: 'shortlisted',
    notes: 'Now part of Institute of Science Tokyo. Exceptional for engineering & CS. MEXT-eligible.'
  },
  {
    id: 'u3', name: 'Osaka University', location: 'Osaka', ranking: 4,
    program: 'Graduate School of Information Science and Technology',
    language: 'English', deadline: '2025-10-31',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.osaka-u.ac.jp/en',
    status: 'shortlisted',
    notes: 'Strong research environment. More approachable than UTokyo. Good international community.'
  },
  {
    id: 'u4', name: 'Waseda University', location: 'Tokyo', ranking: 8,
    program: 'Graduate School of Information, Production and Systems',
    language: 'English', deadline: '2025-09-30',
    tuitionJPY: 1350000, scholarshipAvailable: true,
    applicationLink: 'https://www.waseda.jp/top/en',
    status: 'researching',
    notes: 'Private university. Strong global reputation. Higher tuition but active scholarship programs.'
  },
  {
    id: 'u5', name: 'Kyoto University', location: 'Kyoto', ranking: 2,
    program: 'Graduate School of Informatics',
    language: 'English', deadline: '2025-11-15',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.kyoto-u.ac.jp/en',
    status: 'researching',
    notes: 'Historic campus. Research-focused culture. Excellent for academic path. Very selective.'
  },
]

export const initialScholarships: Scholarship[] = [
  {
    id: 's1', name: 'MEXT Scholarship', provider: 'Japanese Government',
    type: 'government',
    eligibility: 'Indian nationals with bachelor\'s degree, under 35. Embassy-recommended or university-recommended routes.',
    deadline: '2025-05-31',
    benefitsJPY: 1716000,
    benefitsDesc: 'Full tuition waiver + ¥143,000/month + round-trip airfare',
    officialLink: 'https://www.studyinjapan.go.jp/en/smap-stopj-applications-undergraduate.html',
    status: 'researching',
    notes: 'Most prestigious Japanese govt scholarship. Apply via Embassy of Japan in India in April–May each year.'
  },
  {
    id: 's2', name: 'JASSO Honors Scholarship', provider: 'Japan Student Services Organisation',
    type: 'government',
    eligibility: 'Enrolled international students at Japanese universities. Selected after enrollment based on grades.',
    deadline: '2025-07-31',
    benefitsJPY: 576000,
    benefitsDesc: '¥48,000/month for up to 12 months',
    officialLink: 'https://www.jasso.or.jp/en/study_j/scholarship/',
    status: 'researching',
    notes: 'Applied through university after enrollment. Not competitive — merit-based nomination.'
  },
  {
    id: 's3', name: 'ADB-Japan Scholarship Program', provider: 'Asian Development Bank',
    type: 'ngo',
    eligibility: 'Indian citizens, under 35, min. 2 years professional work experience, admitted to ADB-designated program.',
    deadline: '2025-06-30',
    benefitsJPY: 0,
    benefitsDesc: 'Full tuition + living allowance + health insurance + travel + thesis research allowance',
    officialLink: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program',
    status: 'researching',
    notes: 'For specific programs at designated universities. Check if your target program qualifies.'
  },
  {
    id: 's4', name: 'UTokyo International Graduate Fellowship', provider: 'University of Tokyo',
    type: 'university',
    eligibility: 'Admitted students to specific graduate programs. Applied after acceptance.',
    deadline: '2025-12-01',
    benefitsJPY: 535800,
    benefitsDesc: 'Partial–full tuition waiver + monthly stipend varies by program',
    officialLink: 'https://www.u-tokyo.ac.jp/en/prospective-students/graduate_school.html',
    status: 'researching',
    notes: 'Only accessible after admission. Check specific program details when applying.'
  },
]

export const initialDocuments: Document[] = [
  { id: 'd1', name: 'Passport', category: 'Identity', status: 'ready', required: true, notes: 'Valid until 2030. Keep digital copy safe.', expiry: '2030-03-15' },
  { id: 'd2', name: 'Degree Certificate', category: 'Academic', status: 'ready', required: true, notes: 'Collected from university registry office.' },
  { id: 'd3', name: 'Academic Transcripts', category: 'Academic', status: 'pending', required: true, notes: 'Need all semester marksheets with official seal and registrar signature.' },
  { id: 'd4', name: 'Passport Photos', category: 'Identity', status: 'ready', required: true, notes: '6 photos taken in Japan spec (4.5cm × 3.5cm, white bg).' },
  { id: 'd5', name: 'Bank Statements', category: 'Financial', status: 'pending', required: true, notes: '6-month statements required. Show min. ₹15 lakhs liquid.' },
  { id: 'd6', name: 'Statement of Purpose (SOP)', category: 'Application', status: 'pending', required: true, notes: 'Draft in progress. Target: 1000 words. Research fit + goals.' },
  { id: 'd7', name: 'Recommendation Letters', category: 'Application', status: 'pending', required: true, notes: 'Requested from 2 professors. Allow 3 weeks response time.' },
  { id: 'd8', name: 'CV / Resume', category: 'Application', status: 'ready', required: true, notes: 'Academic CV updated. Japanese-style Rirekisho needed later.' },
  { id: 'd9', name: 'IELTS Certificate', category: 'Language', status: 'ready', required: true, notes: 'IELTS 7.0 Band Overall. Valid for 2 years from test date.', expiry: '2026-08-01' },
  { id: 'd10', name: 'Research Proposal', category: 'Application', status: 'pending', required: false, notes: 'Required for professor-contact route and some graduate programs. Not started yet.' },
  { id: 'd11', name: 'Medical Certificate', category: 'Health', status: 'pending', required: false, notes: 'May be required post-admission. Check with university.' },
]

export const initialBudget: BudgetItem[] = [
  {
    id: 'b1', category: 'University Tuition (Year 1)', icon: '🎓',
    estimatedJPY: 535800, estimatedINR: 321480, savedINR: 0,
    notes: 'National university standard rate. Private (Waseda) is ≈ ¥1.35M/year.'
  },
  {
    id: 'b2', category: 'Visa + COE Fees', icon: '📋',
    estimatedJPY: 6000, estimatedINR: 3600, savedINR: 3600,
    notes: 'Student visa: ¥3,000. COE is free (university files on your behalf).'
  },
  {
    id: 'b3', category: 'English Test Fees (IELTS)', icon: '📝',
    estimatedJPY: 0, estimatedINR: 16500, savedINR: 16500,
    notes: 'Already paid. IELTS done at ₹16,500.'
  },
  {
    id: 'b4', category: 'Flight (India → Japan)', icon: '✈️',
    estimatedJPY: 120000, estimatedINR: 72000, savedINR: 30000,
    notes: 'Book at least 3 months early for ₹50–70K rates. Mumbai/Delhi to Tokyo.'
  },
  {
    id: 'b5', category: 'Accommodation (First 6 months)', icon: '🏠',
    estimatedJPY: 420000, estimatedINR: 252000, savedINR: 0,
    notes: 'University dorm (¥30–50K/mo) or share house (¥60–80K/mo in Tokyo).'
  },
  {
    id: 'b6', category: 'Monthly Living Expenses', icon: '🍜',
    estimatedJPY: 100000, estimatedINR: 60000, savedINR: 0,
    notes: 'Food, transport, utilities, daily needs. Budget ¥80–120K/month in Tokyo.'
  },
  {
    id: 'b7', category: 'Emergency Fund Buffer', icon: '🛡️',
    estimatedJPY: 200000, estimatedINR: 120000, savedINR: 50000,
    notes: 'Keep at minimum ¥200K untouched. For medical, urgent travel, etc.'
  },
]

export const initialResources: Resource[] = [
  {
    id: 'r1', title: 'Study in Japan Official Portal', category: 'official',
    description: 'Japan\'s government portal for international students. Programs, scholarships, life guides — everything official.',
    url: 'https://www.studyinjapan.go.jp/en/',
  },
  {
    id: 'r2', title: 'MEXT (Ministry of Education)', category: 'scholarship',
    description: 'Source of truth for MEXT scholarships. Check the Embassy-recommended route for Indian students.',
    url: 'https://www.mext.go.jp/en/',
  },
  {
    id: 'r3', title: 'JASSO — Japan Student Services', category: 'scholarship',
    description: 'Scholarships, student loans, housing support, and guidance for international students in Japan.',
    url: 'https://www.jasso.or.jp/en/',
  },
  {
    id: 'r4', title: 'Embassy of Japan in India', category: 'visa',
    description: 'Official Embassy for visa applications, MEXT scholarship Embassy track, and consular services.',
    url: 'https://www.in.emb-japan.go.jp/itprtop_en/',
  },
  {
    id: 'r5', title: 'JLPT Official Site', category: 'language',
    description: 'Japanese Language Proficiency Test — N5 to N1. Register here. Essential for life and work in Japan.',
    url: 'https://www.jlpt.jp/e/',
  },
  {
    id: 'r6', title: 'EJU (Exam for Japanese University Admission)', category: 'exam',
    description: 'Required for some Japanese-taught programs. Check whether your target university requires it.',
    url: 'https://www.jasso.or.jp/en/eju/',
  },
]

export const initialTimeline: TimelineEvent[] = [
  { id: 'tl1', title: 'Collect all semester transcripts', date: '2025-04-15', description: 'Get official sealed transcripts from registrar', status: 'upcoming', category: 'Document' },
  { id: 'tl2', title: 'Request recommendation letters', date: '2025-04-20', description: 'Ask both professors — allow 3 weeks lead time', status: 'upcoming', category: 'Document' },
  { id: 'tl3', title: 'Email target professors in Japan', date: '2025-04-10', description: 'Cold email with CV + research interest statement', status: 'upcoming', category: 'Application' },
  { id: 'tl4', title: 'MEXT Embassy application deadline', date: '2025-05-31', description: 'Submit complete MEXT package to Embassy of Japan', status: 'future', category: 'Scholarship' },
  { id: 'tl5', title: 'Bank statements ready', date: '2025-05-01', description: '6-month statements with min ₹15L balance', status: 'upcoming', category: 'Document' },
  { id: 'tl6', title: 'JLPT N5 registration opens', date: '2025-06-01', description: 'Register for July/December JLPT exam', status: 'future', category: 'Language' },
  { id: 'tl7', title: 'Waseda University deadline', date: '2025-09-30', description: 'Earliest application deadline — do not miss', status: 'future', category: 'Application' },
  { id: 'tl8', title: 'Osaka University deadline', date: '2025-10-31', description: 'Submit complete application package', status: 'future', category: 'Application' },
  { id: 'tl9', title: 'Kyoto University deadline', date: '2025-11-15', description: 'Submit graduate school application', status: 'future', category: 'Application' },
  { id: 'tl10', title: 'UTokyo deadline', date: '2025-11-30', description: 'Submit University of Tokyo application', status: 'future', category: 'Application' },
  { id: 'tl11', title: 'Tokyo Tech deadline', date: '2025-12-15', description: 'Submit Institute of Science Tokyo application', status: 'future', category: 'Application' },
  { id: 'tl12', title: 'Target: COE received', date: '2026-03-01', description: 'Certificate of Eligibility from immigration', status: 'future', category: 'Visa' },
  { id: 'tl13', title: 'Target: Visa application filed', date: '2026-03-15', description: 'Submit student visa at Embassy of Japan', status: 'future', category: 'Visa' },
  { id: 'tl14', title: 'Target: Flight to Japan', date: '2026-04-01', description: 'Depart for Japan — the mission goes live', status: 'future', category: 'Travel' },
]
