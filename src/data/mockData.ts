import type { Phase, University, Scholarship, Document, BudgetItem, Resource, TimelineEvent } from '../types'

export const initialPhases: Phase[] = [
  {
    id: 'p1', number: 1, arc: 'Arc I',
    title: 'Getting Started',
    description: 'Every journey starts with a decision. Define your purpose, set your goals, and get clear on what studying in Japan means for you.',
    status: 'complete',
    tasks: [
      { id: 't1-1', title: 'Decide on field of study', status: 'done', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/planning/field/' },
      { id: 't1-2', title: 'Research life in Japan as an Indian student', status: 'done', priority: 'high', link: 'https://www.jasso.or.jp/en/study_j/sguide/index.html' },
      { id: 't1-3', title: 'Discuss with family and secure their support', status: 'done', priority: 'high' },
      { id: 't1-4', title: 'Set target universities and define goals', status: 'done', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/planning/university/' },
      { id: 't1-5', title: 'Understand the full timeline and phases', status: 'done', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/planning/schedule/' },
    ]
  },
  {
    id: 'p2', number: 2, arc: 'Arc II',
    title: 'Getting Documents Ready',
    description: 'Collect every document you need before applying. Transcripts, certificates, SOP, photos — get them all sorted early.',
    status: 'in-progress',
    tasks: [
      { id: 't2-1', title: 'Passport valid and ready (min. 2 years)', status: 'done', priority: 'high', link: 'https://www.passportindia.gov.in/' },
      { id: 't2-2', title: 'Degree certificate collected from university', status: 'done', priority: 'high' },
      { id: 't2-3', title: 'Transcripts collected (all semesters, sealed)', status: 'pending', priority: 'high', dueDate: '2025-04-15', notes: 'Registrar sign + seal on each page' },
      { id: 't2-4', title: 'Recommendation letters requested (2 professors)', status: 'pending', priority: 'high', dueDate: '2025-04-20', link: 'https://www.studyinjapan.go.jp/en/planning/application/recommendation/' },
      { id: 't2-5', title: 'Statement of Purpose (SOP) drafted', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/planning/application/statement/' },
      { id: 't2-6', title: 'Updated CV / Resume prepared', status: 'done', priority: 'medium' },
      { id: 't2-7', title: 'Passport photos taken (Japan spec: 4.5×3.5cm)', status: 'done', priority: 'low', link: 'https://www.in.emb-japan.go.jp/itpr_en/visa_requirements.html' },
      { id: 't2-8', title: 'Bank statements ready (6 months, min. ₹15L)', status: 'pending', priority: 'medium', dueDate: '2025-05-01' },
      { id: 't2-9', title: 'Research proposal drafted (if required)', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/planning/application/research/' },
    ]
  },
  {
    id: 'p3', number: 3, arc: 'Arc III',
    title: 'Picking Universities',
    description: 'Research your options, compare programs, and narrow down to a list of universities worth applying to.',
    status: 'in-progress',
    tasks: [
      { id: 't3-1', title: 'Shortlist 5–8 universities', status: 'done', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/planning/university/search/' },
      { id: 't3-2', title: 'Verify English-taught programs available', status: 'done', priority: 'high', link: 'https://www.jasso.or.jp/en/study_j/search/index.html' },
      { id: 't3-3', title: 'Research faculty and research labs for each', status: 'pending', priority: 'medium' },
      { id: 't3-4', title: 'Send cold emails to target professors', status: 'pending', priority: 'high', dueDate: '2025-04-10', link: 'https://www.studyinjapan.go.jp/en/planning/contact/' },
      { id: 't3-5', title: 'Compare tuition fees and total cost of living', status: 'done', priority: 'medium', link: 'https://www.jasso.or.jp/en/study_j/sguide/cost.html' },
      { id: 't3-6', title: 'Check admission requirements per university', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/planning/application/' },
    ]
  },
  {
    id: 'p4', number: 4, arc: 'Arc IV',
    title: 'Language Prep',
    description: 'Sort your English test scores and start learning Japanese basics. A little goes a long way when you arrive.',
    status: 'in-progress',
    tasks: [
      { id: 't4-1', title: 'IELTS score secured (min. 6.0 Band)', status: 'done', priority: 'high', notes: 'IELTS 7.0 Band', link: 'https://www.ielts.org/book-a-test' },
      { id: 't4-2', title: 'TOEFL as backup if any university requires it', status: 'pending', priority: 'low', link: 'https://www.ets.org/toefl/test-takers/ibt/register/' },
      { id: 't4-3', title: 'Learn Hiragana and Katakana (basics)', status: 'done', priority: 'medium', link: 'https://www.nhk.or.jp/lesson/en/' },
      { id: 't4-4', title: 'Set up Anki deck for Japanese vocabulary', status: 'done', priority: 'low', link: 'https://apps.ankiweb.net/' },
      { id: 't4-5', title: 'Register for JLPT N5 or N4', status: 'pending', priority: 'medium', dueDate: '2025-06-01', link: 'https://www.jlpt.jp/e/application/overseas/index.html' },
      { id: 't4-6', title: 'Check EJU requirements for target universities', status: 'pending', priority: 'medium', link: 'https://www.jasso.or.jp/en/eju/about/index.html' },
      { id: 't4-7', title: 'Complete beginner Japanese course (N5 level)', status: 'pending', priority: 'medium', link: 'https://www.japanesepod101.com/' },
    ]
  },
  {
    id: 'p5', number: 5, arc: 'Arc V',
    title: 'Finding Scholarships',
    description: 'Research every scholarship you can apply for. MEXT, JASSO, university grants — check them all and apply early.',
    status: 'in-progress',
    tasks: [
      { id: 't5-1', title: 'MEXT Scholarship — track Embassy route', status: 'pending', priority: 'high', link: 'https://www.in.emb-japan.go.jp/itpr_en/scholarship.html', dueDate: '2025-05-31' },
      { id: 't5-2', title: 'JASSO Scholarship — check eligibility', status: 'pending', priority: 'high', link: 'https://www.jasso.or.jp/en/study_j/scholarship/index.html' },
      { id: 't5-3', title: 'ADB-Japan Scholarship — review requirements', status: 'pending', priority: 'medium', link: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program' },
      { id: 't5-4', title: 'University-specific scholarships researched', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/planning/scholarship/' },
      { id: 't5-5', title: 'JICA Scholarship — check eligibility', status: 'pending', priority: 'low', link: 'https://www.jica.go.jp/english/our_work/human_dev/scholarship.html' },
    ]
  },
  {
    id: 'p6', number: 6, arc: 'Arc VI',
    title: 'Applying',
    description: 'Submit your applications, pay fees where needed, and track the status of each one as you wait for replies.',
    status: 'pending',
    tasks: [
      { id: 't6-1', title: 'Apply to University of Tokyo', status: 'pending', priority: 'high', link: 'https://www.u-tokyo.ac.jp/en/admissions/graduate/index.html' },
      { id: 't6-2', title: 'Apply to Osaka University', status: 'pending', priority: 'high', link: 'https://www.osaka-u.ac.jp/en/admissions' },
      { id: 't6-3', title: 'Apply to Tokyo Institute of Technology', status: 'pending', priority: 'high', link: 'https://admissions.titech.ac.jp/en/' },
      { id: 't6-4', title: 'Apply to Kyoto University', status: 'pending', priority: 'high', link: 'https://www.kyoto-u.ac.jp/en/education-campus/graduate/how-to-apply' },
      { id: 't6-5', title: 'Apply to Waseda University', status: 'pending', priority: 'medium', link: 'https://www.waseda.jp/top/en/admissions/g-admissions' },
      { id: 't6-6', title: 'Pay application fees where required', status: 'pending', priority: 'medium' },
      { id: 't6-7', title: 'Track all application statuses', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/planning/application/checklist/' },
    ]
  },
  {
    id: 'p7', number: 7, arc: 'Arc VII',
    title: 'Visa & COE',
    description: 'Get your Certificate of Eligibility from the university, then apply for your student visa at the Japanese Embassy.',
    status: 'pending',
    tasks: [
      { id: 't7-1', title: 'Receive official admission letter', status: 'pending', priority: 'high' },
      { id: 't7-2', title: 'University files COE application on your behalf', status: 'pending', priority: 'high', link: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html' },
      { id: 't7-3', title: 'COE received (allow 1–3 months)', status: 'pending', priority: 'high', link: 'https://www.moj.go.jp/isa/applications/procedures/16-3_1.html' },
      { id: 't7-4', title: 'Student visa application at Embassy of Japan', status: 'pending', priority: 'high', link: 'https://www.in.emb-japan.go.jp/itpr_en/visa_student.html' },
      { id: 't7-5', title: 'Visa stamped and received', status: 'pending', priority: 'high' },
      { id: 't7-6', title: 'Pre-departure briefing attended', status: 'pending', priority: 'low', link: 'https://www.studyinjapan.go.jp/en/before/predeparture/' },
    ]
  },
  {
    id: 'p8', number: 8, arc: 'Arc VIII',
    title: 'Moving to Japan',
    description: 'Book your flight, sort accommodation, set up your phone and bank account. Time to actually go.',
    status: 'pending',
    tasks: [
      { id: 't8-1', title: 'Book flight (1 week before enrollment)', status: 'pending', priority: 'high', link: 'https://www.skyscanner.co.in/flights/in/jp/' },
      { id: 't8-2', title: 'Accommodation finalized (dorm or share house)', status: 'pending', priority: 'high', link: 'https://www.jasso.or.jp/en/study_j/sguide/accommodation.html' },
      { id: 't8-3', title: 'Japan national health insurance arranged', status: 'pending', priority: 'high', link: 'https://www.mhlw.go.jp/english/policy/health-medical/health-insurance/index.html' },
      { id: 't8-4', title: 'Japan bank account — Japan Post Bank', status: 'pending', priority: 'medium', link: 'https://www.jp-bank.japanpost.jp/en/index.html' },
      { id: 't8-5', title: 'SIM card plan for Japan researched', status: 'pending', priority: 'medium', link: 'https://www.iijmio.jp/en/' },
      { id: 't8-6', title: 'Register at city hall (within 14 days of arrival)', status: 'pending', priority: 'high', link: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/zairyu.html' },
      { id: 't8-7', title: 'Emergency contacts list prepared', status: 'pending', priority: 'low' },
    ]
  },
]

export const initialUniversities: University[] = [
  {
    id: 'u1', name: 'The University of Tokyo', location: 'Tokyo', ranking: 1,
    program: 'Graduate School of Engineering — M.Eng',
    language: 'English', deadline: '2025-11-30',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.u-tokyo.ac.jp/en/admissions/graduate/index.html',
    status: 'shortlisted',
    notes: 'Top-ranked in Asia. Contact professor first. Strong MEXT support.'
  },
  {
    id: 'u2', name: 'Tokyo Institute of Technology', location: 'Tokyo', ranking: 3,
    program: 'School of Computing — Master\'s Program',
    language: 'English', deadline: '2025-12-15',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://admissions.titech.ac.jp/en/',
    status: 'shortlisted',
    notes: 'Now Institute of Science Tokyo. Exceptional for CS & engineering.'
  },
  {
    id: 'u3', name: 'Osaka University', location: 'Osaka', ranking: 4,
    program: 'Graduate School of Information Science and Technology',
    language: 'English', deadline: '2025-10-31',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.osaka-u.ac.jp/en/admissions',
    status: 'shortlisted',
    notes: 'Strong research environment. Good international student community.'
  },
  {
    id: 'u4', name: 'Waseda University', location: 'Tokyo', ranking: 8,
    program: 'Graduate School of Information, Production and Systems',
    language: 'English', deadline: '2025-09-30',
    tuitionJPY: 1350000, scholarshipAvailable: true,
    applicationLink: 'https://www.waseda.jp/top/en/admissions/g-admissions',
    status: 'researching',
    notes: 'Private university. Higher tuition but active scholarship programs.'
  },
  {
    id: 'u5', name: 'Kyoto University', location: 'Kyoto', ranking: 2,
    program: 'Graduate School of Informatics',
    language: 'English', deadline: '2025-11-15',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.kyoto-u.ac.jp/en/education-campus/graduate/how-to-apply',
    status: 'researching',
    notes: 'Historic campus, research-focused culture. Very selective.'
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
    officialLink: 'https://www.in.emb-japan.go.jp/itpr_en/scholarship.html',
    status: 'researching',
    notes: 'Most prestigious Japanese govt scholarship. Apply via Embassy of Japan in India in April–May.'
  },
  {
    id: 's2', name: 'JASSO Honors Scholarship', provider: 'Japan Student Services Organisation',
    type: 'government',
    eligibility: 'Enrolled international students at Japanese universities. Selected after enrollment based on grades.',
    deadline: '2025-07-31',
    benefitsJPY: 576000,
    benefitsDesc: '¥48,000/month for up to 12 months',
    officialLink: 'https://www.jasso.or.jp/en/study_j/scholarship/index.html',
    status: 'researching',
    notes: 'Applied through university after enrollment. Merit-based nomination.'
  },
  {
    id: 's3', name: 'ADB-Japan Scholarship Program', provider: 'Asian Development Bank',
    type: 'ngo',
    eligibility: 'Indian citizens, under 35, min. 2 years work experience, admitted to ADB-designated program.',
    deadline: '2025-06-30',
    benefitsJPY: 0,
    benefitsDesc: 'Full tuition + living allowance + health insurance + travel',
    officialLink: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program',
    status: 'researching',
    notes: 'For specific programs at designated universities. Check if your program qualifies.'
  },
  {
    id: 's4', name: 'UTokyo International Graduate Fellowship', provider: 'University of Tokyo',
    type: 'university',
    eligibility: 'Admitted students to specific graduate programs. Applied after acceptance.',
    deadline: '2025-12-01',
    benefitsJPY: 535800,
    benefitsDesc: 'Partial–full tuition waiver + monthly stipend',
    officialLink: 'https://www.u-tokyo.ac.jp/en/prospective-students/graduate_school.html',
    status: 'researching',
    notes: 'Only accessible after admission. Check specific program details.'
  },
]

export const initialDocuments: Document[] = [
  { id: 'd1', name: 'Passport', category: 'Identity', status: 'ready', required: true, notes: 'Valid until 2030. Keep digital copy.', expiry: '2030-03-15' },
  { id: 'd2', name: 'Degree Certificate', category: 'Academic', status: 'ready', required: true, notes: 'Collected from university registry.' },
  { id: 'd3', name: 'Academic Transcripts', category: 'Academic', status: 'pending', required: true, notes: 'All semesters, official seal + registrar signature.' },
  { id: 'd4', name: 'Passport Photos', category: 'Identity', status: 'ready', required: true, notes: '6 photos, Japan spec (4.5cm × 3.5cm, white bg).' },
  { id: 'd5', name: 'Bank Statements', category: 'Financial', status: 'pending', required: true, notes: '6-month statements. Show min. ₹15 lakhs liquid.' },
  { id: 'd6', name: 'Statement of Purpose (SOP)', category: 'Application', status: 'pending', required: true, notes: 'Draft in progress. 1000 words. Research fit + goals.' },
  { id: 'd7', name: 'Recommendation Letters', category: 'Application', status: 'pending', required: true, notes: 'Requested from 2 professors. Allow 3 weeks.' },
  { id: 'd8', name: 'CV / Resume', category: 'Application', status: 'ready', required: true, notes: 'Academic CV updated.' },
  { id: 'd9', name: 'IELTS Certificate', category: 'Language', status: 'ready', required: true, notes: 'IELTS 7.0 Band. Valid 2 years.', expiry: '2026-08-01' },
  { id: 'd10', name: 'Research Proposal', category: 'Application', status: 'pending', required: false, notes: 'Required for professor-contact route.' },
  { id: 'd11', name: 'Medical Certificate', category: 'Health', status: 'pending', required: false, notes: 'May be required post-admission.' },
]

export const initialBudget: BudgetItem[] = [
  { id: 'b1', category: 'University Tuition (Year 1)', icon: '🎓', estimatedJPY: 535800, estimatedINR: 321480, savedINR: 0, notes: 'National university rate. Waseda ≈ ¥1.35M/year.' },
  { id: 'b2', category: 'Visa + COE Fees', icon: '📋', estimatedJPY: 6000, estimatedINR: 3600, savedINR: 3600, notes: 'Student visa ¥3,000. COE is free (university files).' },
  { id: 'b3', category: 'English Test Fees (IELTS)', icon: '📝', estimatedJPY: 0, estimatedINR: 16500, savedINR: 16500, notes: 'Already paid. IELTS done ₹16,500.' },
  { id: 'b4', category: 'Flight (India → Japan)', icon: '✈️', estimatedJPY: 120000, estimatedINR: 72000, savedINR: 30000, notes: 'Book 3 months early. Mumbai/Delhi to Tokyo.' },
  { id: 'b5', category: 'Accommodation (First 6 months)', icon: '🏠', estimatedJPY: 420000, estimatedINR: 252000, savedINR: 0, notes: 'University dorm ¥30–50K/mo or share house.' },
  { id: 'b6', category: 'Monthly Living Expenses', icon: '🍜', estimatedJPY: 100000, estimatedINR: 60000, savedINR: 0, notes: 'Food, transport, utilities. Budget ¥80–120K/month.' },
  { id: 'b7', category: 'Emergency Fund Buffer', icon: '🛡️', estimatedJPY: 200000, estimatedINR: 120000, savedINR: 50000, notes: 'Keep ¥200K untouched. For medical, urgent travel.' },
]

export const initialResources: Resource[] = [
  { id: 'r1', title: 'Study in Japan Official Portal', category: 'official', description: 'Japan\'s government portal for international students — programs, scholarships, life guides.', url: 'https://www.studyinjapan.go.jp/en/' },
  { id: 'r2', title: 'MEXT Scholarship (Embassy Route)', category: 'scholarship', description: 'Apply via Embassy of Japan in India. Opens April–May each year.', url: 'https://www.in.emb-japan.go.jp/itpr_en/scholarship.html' },
  { id: 'r3', title: 'JASSO — Scholarships & Student Life', category: 'scholarship', description: 'Scholarships, housing support, and guidance for international students in Japan.', url: 'https://www.jasso.or.jp/en/study_j/scholarship/index.html' },
  { id: 'r4', title: 'Embassy of Japan in India', category: 'visa', description: 'Student visa applications, MEXT Embassy track, consular services.', url: 'https://www.in.emb-japan.go.jp/itpr_en/visa_student.html' },
  { id: 'r5', title: 'JLPT — Register for N5/N4/N3', category: 'language', description: 'Japanese Language Proficiency Test. Register here. N5 → N1 levels.', url: 'https://www.jlpt.jp/e/application/overseas/index.html' },
  { id: 'r6', title: 'EJU — Exam for Japanese University Admission', category: 'exam', description: 'Required for some Japanese-taught programs. Check if your university needs it.', url: 'https://www.jasso.or.jp/en/eju/index.html' },
  { id: 'r7', title: 'IELTS — Book Your Test', category: 'exam', description: 'Book IELTS Academic test in India. Required by most English-taught programs.', url: 'https://www.ielts.org/book-a-test' },
  { id: 'r8', title: 'COE Application — Immigration Japan', category: 'visa', description: 'Certificate of Eligibility — your university files this for you before the visa.', url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html' },
  { id: 'r9', title: 'ADB-Japan Scholarship Program', category: 'scholarship', description: 'Full funding for development studies. For Indian citizens with work experience.', url: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program' },
  { id: 'r10', title: 'Japan Post Bank (Yucho)', category: 'official', description: 'Most accessible bank for new international students. Open within weeks of arrival.', url: 'https://www.jp-bank.japanpost.jp/en/index.html' },
  { id: 'r11', title: 'University of Tokyo Admissions', category: 'university', description: 'Graduate school admissions portal for UTokyo — programs, deadlines, requirements.', url: 'https://www.u-tokyo.ac.jp/en/admissions/graduate/index.html' },
  { id: 'r12', title: 'Kyoto University Admissions', category: 'university', description: 'Graduate admissions info for Kyoto University.', url: 'https://www.kyoto-u.ac.jp/en/education-campus/graduate/how-to-apply' },
]

export const initialTimeline: TimelineEvent[] = [
  { id: 'tl1', title: 'Email target professors in Japan', date: '2025-04-10', description: 'Cold email with CV + research interest statement', status: 'upcoming', category: 'Application' },
  { id: 'tl2', title: 'Collect all semester transcripts', date: '2025-04-15', description: 'Official sealed transcripts from registrar', status: 'upcoming', category: 'Document' },
  { id: 'tl3', title: 'Request recommendation letters', date: '2025-04-20', description: 'Ask both professors — allow 3 weeks lead time', status: 'upcoming', category: 'Document' },
  { id: 'tl4', title: 'Bank statements ready', date: '2025-05-01', description: '6-month statements with min ₹15L balance', status: 'upcoming', category: 'Document' },
  { id: 'tl5', title: 'MEXT Embassy application deadline', date: '2025-05-31', description: 'Submit complete MEXT package to Embassy of Japan', status: 'future', category: 'Scholarship' },
  { id: 'tl6', title: 'JLPT N5 registration opens', date: '2025-06-01', description: 'Register for July/December JLPT exam', status: 'future', category: 'Language' },
  { id: 'tl7', title: 'ADB-Japan Scholarship deadline', date: '2025-06-30', description: 'Submit ADB scholarship application', status: 'future', category: 'Scholarship' },
  { id: 'tl8', title: 'Waseda University deadline', date: '2025-09-30', description: 'Earliest application deadline — do not miss', status: 'future', category: 'Application' },
  { id: 'tl9', title: 'Osaka University deadline', date: '2025-10-31', description: 'Submit complete application package', status: 'future', category: 'Application' },
  { id: 'tl10', title: 'Kyoto University deadline', date: '2025-11-15', description: 'Submit graduate school application', status: 'future', category: 'Application' },
  { id: 'tl11', title: 'UTokyo deadline', date: '2025-11-30', description: 'Submit University of Tokyo application', status: 'future', category: 'Application' },
  { id: 'tl12', title: 'Tokyo Tech deadline', date: '2025-12-15', description: 'Submit Institute of Science Tokyo application', status: 'future', category: 'Application' },
  { id: 'tl13', title: 'Target: COE received', date: '2026-03-01', description: 'Certificate of Eligibility from immigration', status: 'future', category: 'Visa' },
  { id: 'tl14', title: 'Target: Visa application filed', date: '2026-03-15', description: 'Submit student visa at Embassy of Japan', status: 'future', category: 'Visa' },
  { id: 'tl15', title: 'Target: Flight to Japan', date: '2026-04-01', description: 'Depart India — the mission goes live', status: 'future', category: 'Travel' },
]
