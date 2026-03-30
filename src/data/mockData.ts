import type { Phase, University, Scholarship, Document, BudgetItem, Resource, TimelineEvent } from '../types'

export const initialPhases: Phase[] = [
  {
    id: 'p1', number: 1, arc: 'Arc I',
    title: 'Getting Started',
    description: 'Every journey starts with a decision. Define your purpose, set your goals, and get clear on what studying in Japan means for you.',
    status: 'pending',
    tasks: [
      { id: 't1-1', title: 'Decide on field of study', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't1-2', title: 'Research life in Japan as an Indian student', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't1-3', title: 'Discuss with family and secure their support', status: 'pending', priority: 'high' },
      { id: 't1-4', title: 'Set target universities and define goals', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't1-5', title: 'Understand the full timeline and phases', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/' },
    ]
  },
  {
    id: 'p2', number: 2, arc: 'Arc II',
    title: 'Getting Documents Ready',
    description: 'Collect every document you need before applying. Transcripts, certificates, SOP, photos — get them all sorted early.',
    status: 'pending',
    tasks: [
      { id: 't2-1', title: 'Passport valid and ready (min. 2 years validity)', status: 'pending', priority: 'high', link: 'https://www.passportindia.gov.in/psp/Apply' },
      { id: 't2-2', title: 'Degree certificate collected from university', status: 'pending', priority: 'high' },
      { id: 't2-3', title: 'Transcripts collected (all semesters, sealed)', status: 'pending', priority: 'high', notes: 'Registrar sign + seal on each page' },
      { id: 't2-4', title: 'Recommendation letters requested (2 professors)', status: 'pending', priority: 'high' },
      { id: 't2-5', title: 'Statement of Purpose (SOP) drafted', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't2-6', title: 'Updated CV / Resume prepared', status: 'pending', priority: 'medium' },
      { id: 't2-7', title: 'Passport photos taken (Japan spec: 4.5×3.5cm, white bg)', status: 'pending', priority: 'low', link: 'https://www.in.emb-japan.go.jp/itpr_en/visa.html' },
      { id: 't2-8', title: 'Bank statements ready (6 months, min. ₹15L)', status: 'pending', priority: 'medium' },
      { id: 't2-9', title: 'Research proposal drafted (required for lab contact route)', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't2-10', title: 'Get degree certificate apostilled (MEA, Government of India)', status: 'pending', priority: 'high', link: 'https://www.mea.gov.in/apostille.htm', notes: 'Required by Japanese embassy. Takes 1–2 weeks. Apply via MEA India.' },
      { id: 't2-11', title: 'Get certified English translation of degree + transcripts', status: 'pending', priority: 'high', notes: 'Use a certified/notarised translator. Japanese universities require official English translations.' },
    ]
  },
  {
    id: 'p3', number: 3, arc: 'Arc III',
    title: 'Picking Universities',
    description: 'Research your options, compare programs, and narrow down to a list of universities worth applying to.',
    status: 'pending',
    tasks: [
      { id: 't3-1', title: 'Shortlist 5–8 universities', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't3-2', title: 'Verify English-taught programs available', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't3-3', title: 'Research faculty and research labs for each', status: 'pending', priority: 'medium' },
      { id: 't3-4', title: 'Send cold emails to target professors', status: 'pending', priority: 'high' },
      { id: 't3-5', title: 'Compare tuition fees and total cost of living', status: 'pending', priority: 'medium', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't3-6', title: 'Check admission requirements per university', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
    ]
  },
  {
    id: 'p4', number: 4, arc: 'Arc IV',
    title: 'Language Prep',
    description: 'Sort your English test scores and start learning Japanese basics. A little goes a long way when you arrive.',
    status: 'pending',
    tasks: [
      { id: 't4-1', title: 'IELTS Academic test registered and booked', status: 'pending', priority: 'high', link: 'https://ieltsidpindia.com/registration/reg1' },
      { id: 't4-2', title: 'IELTS score secured (min. Band 6.0)', status: 'pending', priority: 'high', link: 'https://ieltsidpindia.com/registration/reg1' },
      { id: 't4-3', title: 'TOEFL iBT as backup (if required by any university)', status: 'pending', priority: 'low', link: 'https://www.ets.org/toefl.html' },
      { id: 't4-4', title: 'Learn Hiragana and Katakana (basics)', status: 'pending', priority: 'medium', link: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/' },
      { id: 't4-5', title: 'Set up Anki deck for Japanese vocabulary', status: 'pending', priority: 'low', link: 'https://ankiweb.net/' },
      { id: 't4-6', title: 'Register for JLPT N5 or N4 (July 2026 session)', status: 'pending', priority: 'medium', dueDate: '2026-05-01', link: 'https://www.jlpt.jp/sp/e/application/overseas_list.html', notes: 'JLPT exam confirmed July 5, 2026. Registration deadline ~May — verify on JLPT site.' },
      { id: 't4-7', title: 'Check EJU requirements for target universities', status: 'pending', priority: 'medium', link: 'https://www.jasso.go.jp/en/ryugaku/eju/index.html' },
      { id: 't4-8', title: 'Complete beginner Japanese course (N5 level)', status: 'pending', priority: 'medium', link: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/' },
    ]
  },
  {
    id: 'p5', number: 5, arc: 'Arc V',
    title: 'Finding Scholarships',
    description: 'Research every scholarship you can apply for. MEXT, JASSO, university grants — check them all and apply early.',
    status: 'pending',
    tasks: [
      { id: 't5-1', title: 'MEXT Scholarship — Embassy route (opens Apr 2026)', status: 'pending', priority: 'high', link: 'https://www.in.emb-japan.go.jp/Education/Research_Student.html', dueDate: '2026-05-13', notes: '2026 date not announced. Last year was May 13. Check Embassy site from April 2026.' },
      { id: 't5-2', title: 'JASSO Scholarship — check eligibility', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/planning/scholarships/jasso-scholarships/' },
      { id: 't5-3', title: 'ADB-Japan Scholarship — review requirements', status: 'pending', priority: 'medium', link: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program' },
      { id: 't5-4', title: 'UTokyo Fellowship — check eligibility after admission', status: 'pending', priority: 'medium', link: 'https://www.u-tokyo.ac.jp/en/prospective-students/scholarships.html' },
      { id: 't5-5', title: 'Rotary Peace Fellowship — check eligibility', status: 'pending', priority: 'low', link: 'https://www.rotary.org/en/our-programs/peace-fellowships' },
      { id: 't5-6', title: 'JICA Innovative Asia Scholarship — check eligibility', status: 'pending', priority: 'low', link: 'https://www.jica.go.jp/english/overseas/asia/innovative_asia.html' },
    ]
  },
  {
    id: 'p6', number: 6, arc: 'Arc VI',
    title: 'Applying',
    description: 'Submit your applications, pay fees where needed, and track the status of each one as you wait for replies.',
    status: 'pending',
    tasks: [
      { id: 't6-1', title: 'Apply to University of Tokyo', status: 'pending', priority: 'high', link: 'https://www.u-tokyo.ac.jp/en/prospective-students/grad_admissions.html' },
      { id: 't6-2', title: 'Apply to Osaka University', status: 'pending', priority: 'high', link: 'https://www.osaka-u.ac.jp/en/admissions/intl-students' },
      { id: 't6-3', title: 'Apply to Institute of Science Tokyo (Tokyo Tech)', status: 'pending', priority: 'high', link: 'https://admissions.isct.ac.jp/en/013/graduate/programs/science-and-engineering' },
      { id: 't6-4', title: 'Apply to Kyoto University', status: 'pending', priority: 'high', link: 'https://www.kyoto-u.ac.jp/en/education-campus/education-and-admissions/intl-admissions' },
      { id: 't6-5', title: 'Apply to Waseda University', status: 'pending', priority: 'medium', link: 'https://www.waseda.jp/inst/admission/en/graduate/' },
      { id: 't6-6', title: 'Pay application fees where required', status: 'pending', priority: 'medium' },
      { id: 't6-7', title: 'Track all application statuses and follow up', status: 'pending', priority: 'medium' },
    ]
  },
  {
    id: 'p7', number: 7, arc: 'Arc VII',
    title: 'Visa & COE',
    description: 'Get your Certificate of Eligibility from the university, then apply for your student visa at the Japanese Embassy.',
    status: 'pending',
    tasks: [
      { id: 't7-1', title: 'Receive official admission letter from university', status: 'pending', priority: 'high' },
      { id: 't7-2', title: 'University files COE application to Immigration Japan', status: 'pending', priority: 'high', link: 'https://www.us.emb-japan.go.jp/itpr_en/visa-coe.html' },
      { id: 't7-3', title: 'COE received (processing takes 1–3 months)', status: 'pending', priority: 'high', link: 'https://www.us.emb-japan.go.jp/itpr_en/visa-coe.html' },
      { id: 't7-4', title: 'Student visa applied at Embassy of Japan in India', status: 'pending', priority: 'high', link: 'https://www.in.emb-japan.go.jp/itpr_en/visa.html' },
      { id: 't7-5', title: 'Visa stamped and passport returned', status: 'pending', priority: 'high' },
      { id: 't7-6', title: 'Pre-departure orientation attended (if any)', status: 'pending', priority: 'low', link: 'https://www.studyinjapan.go.jp/en/' },
    ]
  },
  {
    id: 'p8', number: 8, arc: 'Arc VIII',
    title: 'Moving to Japan',
    description: 'Book your flight, sort accommodation, set up your phone and bank account. Time to actually go.',
    status: 'pending',
    tasks: [
      { id: 't8-1', title: 'Book flight to Japan (book 2–3 months early)', status: 'pending', priority: 'high', link: 'https://www.skyscanner.co.in/flights-to/jp/cheap-flights-to-japan.html' },
      { id: 't8-2', title: 'Accommodation confirmed (dorm, share house, or apartment)', status: 'pending', priority: 'high', link: 'https://www.studyinjapan.go.jp/en/' },
      { id: 't8-3', title: 'Japan national health insurance registered (within 14 days)', status: 'pending', priority: 'high' },
      { id: 't8-4', title: 'Japan Post Bank account opened after arrival', status: 'pending', priority: 'medium', link: 'https://www.jp-bank.japanpost.jp/en_index.html' },
      { id: 't8-5', title: 'SIM card / pocket WiFi plan sorted for Japan', status: 'pending', priority: 'medium', link: 'https://www.iijmio.jp/hdc/visitors/en/' },
      { id: 't8-6', title: 'Residence card registered at city hall (within 14 days)', status: 'pending', priority: 'high' },
      { id: 't8-7', title: 'My Number card applied for', status: 'pending', priority: 'medium', link: 'https://www.kojinbango-card.go.jp/en/' },
      { id: 't8-8', title: 'Emergency contacts list and embassy contacts saved', status: 'pending', priority: 'low', link: 'https://www.in.emb-japan.go.jp/itpr_en/visa.html' },
    ]
  },
]

export const initialUniversities: University[] = [
  {
    id: 'u1', name: 'The University of Tokyo', location: 'Tokyo', ranking: 1,
    program: 'Graduate School of Engineering — M.Eng',
    language: 'English', deadline: '2026-09-17',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.u-tokyo.ac.jp/en/prospective-students/grad_admissions.html',
    status: 'researching',
    notes: 'October 2026 entry deadline: Sep 17, 2026 (tentative). April 2027 entry deadline not yet announced (~Mar 2027). Contact professor first.'
  },
  {
    id: 'u2', name: 'Institute of Science Tokyo', location: 'Tokyo', ranking: 3,
    program: 'School of Computing — Master\'s Program',
    language: 'English', deadline: '2026-12-01',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://admissions.isct.ac.jp/en/013/graduate/programs/science-and-engineering',
    status: 'researching',
    notes: '⚠ Dec 2025–Jan 2026 round already closed. Next intake (Apr 2027) deadline not yet announced. Monitor site from Sep 2026.'
  },
  {
    id: 'u3', name: 'Osaka University', location: 'Osaka', ranking: 4,
    program: 'Graduate School of Information Science and Technology',
    language: 'English', deadline: '2026-11-06',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.osaka-u.ac.jp/en/admissions/intl-students',
    status: 'researching',
    notes: 'Summer exam (Oct entry): apply by Jul 17, 2026. Winter exam (Apr 2027 entry): apply by Nov 6, 2026. App fee: ¥30,000.'
  },
  {
    id: 'u4', name: 'Waseda University', location: 'Tokyo', ranking: 8,
    program: 'Graduate School of Information, Production and Systems',
    language: 'English', deadline: '2026-07-01',
    tuitionJPY: 1350000, scholarshipAvailable: true,
    applicationLink: 'https://www.waseda.jp/inst/admission/en/graduate/',
    status: 'researching',
    notes: '⚠ 2025 window was Jul 7–25 (closed). 2026 window not yet announced — check site from May 2026. Private university, higher tuition.'
  },
  {
    id: 'u5', name: 'Kyoto University', location: 'Kyoto', ranking: 2,
    program: 'Graduate School of Informatics',
    language: 'English', deadline: '2026-11-30',
    tuitionJPY: 535800, scholarshipAvailable: true,
    applicationLink: 'https://www.kyoto-u.ac.jp/en/education-campus/education-and-admissions/intl-admissions',
    status: 'researching',
    notes: 'MEXT university route: apply Nov–Dec, result ~Jun. Direct admissions deadline not published — verify on graduate school page.'
  },
]

export const initialScholarships: Scholarship[] = [
  {
    id: 's1', name: 'MEXT Scholarship 2026', provider: 'Government of Japan',
    type: 'government',
    eligibility: 'Indian nationals with bachelor\'s degree, under 35. Embassy-recommended route opens April 2026.',
    deadline: '2026-05-13',
    benefitsJPY: 1716000,
    benefitsDesc: 'Full tuition waiver + ¥143,000/month stipend + round-trip airfare',
    officialLink: 'https://www.in.emb-japan.go.jp/Education/Research_Student.html',
    status: 'researching',
    notes: '⚠ 2026 date not announced yet. 2025 deadline was May 13. Check Embassy website from April 2026 — likely same window.'
  },
  {
    id: 's2', name: 'JASSO Honors Scholarship', provider: 'Japan Student Services Organisation',
    type: 'government',
    eligibility: 'Enrolled international students. Nominated by university based on academic performance.',
    deadline: '2026-09-30',
    benefitsJPY: 576000,
    benefitsDesc: '¥48,000/month for up to 12 months',
    officialLink: 'https://www.studyinjapan.go.jp/en/planning/scholarships/jasso-scholarships/',
    status: 'researching',
    notes: 'Applied through university after enrollment. Merit-based. No direct application.'
  },
  {
    id: 's3', name: 'ADB-Japan Scholarship Program', provider: 'Asian Development Bank',
    type: 'ngo',
    eligibility: 'Indian citizens under 35, min. 2 years work experience, admitted to an ADB-designated program.',
    deadline: '2026-06-30',
    benefitsJPY: 0,
    benefitsDesc: 'Full tuition + living allowance + health insurance + travel allowance',
    officialLink: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program',
    status: 'researching',
    notes: '⚠ Deadline estimated — verify on ADB website. Check if your program is ADB-designated.'
  },
  {
    id: 's4', name: 'UTokyo International Graduate Fellowship', provider: 'University of Tokyo',
    type: 'university',
    eligibility: 'Admitted UTokyo graduate students in eligible programs. Applied after receiving admission.',
    deadline: '2026-12-01',
    benefitsJPY: 535800,
    benefitsDesc: 'Partial to full tuition waiver + monthly stipend depending on program',
    officialLink: 'https://www.u-tokyo.ac.jp/en/prospective-students/scholarships.html',
    status: 'researching',
    notes: 'Only accessible after admission offer. Ask your supervisor directly.'
  },
]

export const initialDocuments: Document[] = [
  { id: 'd1', name: 'Passport', category: 'Identity', status: 'pending', required: true, notes: 'Must be valid for at least 2 years beyond your planned stay.' },
  { id: 'd2', name: 'Degree Certificate', category: 'Academic', status: 'pending', required: true, notes: 'Collect from university registry. Get 2 notarised copies.' },
  { id: 'd3', name: 'Academic Transcripts', category: 'Academic', status: 'pending', required: true, notes: 'All semesters, official seal + registrar signature on each page.' },
  { id: 'd4', name: 'Passport Photos', category: 'Identity', status: 'pending', required: true, notes: '6 photos — Japan spec: 4.5cm × 3.5cm, white background.' },
  { id: 'd5', name: 'Bank Statements', category: 'Financial', status: 'pending', required: true, notes: '6-month statements showing min. ₹15 lakhs liquid balance.' },
  { id: 'd6', name: 'Statement of Purpose (SOP)', category: 'Application', status: 'pending', required: true, notes: '800–1200 words. Research fit, goals, why Japan, why this lab.' },
  { id: 'd7', name: 'Recommendation Letters', category: 'Application', status: 'pending', required: true, notes: '2 letters from professors. Give them at least 3 weeks notice.' },
  { id: 'd8', name: 'CV / Resume', category: 'Application', status: 'pending', required: true, notes: 'Academic CV — education, projects, publications if any, skills.' },
  { id: 'd9', name: 'IELTS Certificate', category: 'Language', status: 'pending', required: true, notes: 'Min. Band 6.0 required. IELTS Academic only — valid for 2 years.' },
  { id: 'd10', name: 'Research Proposal', category: 'Application', status: 'pending', required: false, notes: '2–3 pages. Required if contacting professors directly.' },
  { id: 'd11', name: 'Medical Certificate', category: 'Health', status: 'pending', required: false, notes: 'May be required by some universities post-admission.' },
  { id: 'd12', name: 'JLPT Certificate', category: 'Language', status: 'pending', required: false, notes: 'N5/N4 minimum. N2 strongly preferred for some labs. Take July 2026 session.' },
  { id: 'd13', name: 'Certified English Translations', category: 'Academic', status: 'pending', required: true, notes: 'Certified English translation of degree certificate + all transcripts. Required by Japanese universities and embassy.' },
  { id: 'd14', name: 'Apostilled Degree Certificate', category: 'Academic', status: 'pending', required: true, notes: 'MEA apostille required for Japanese embassy visa submission. Apply at MEA India.' },
]

export const initialBudget: BudgetItem[] = [
  { id: 'b1', category: 'University Tuition (Year 1)', icon: '🎓', estimatedJPY: 535800, estimatedINR: 321480, savedINR: 0, notes: 'National university rate. Waseda/Keio ≈ ¥1.35M/year.' },
  { id: 'b2', category: 'Visa + COE Fees', icon: '📋', estimatedJPY: 6000, estimatedINR: 3600, savedINR: 0, notes: 'Student visa ¥3,000 (₹1,800). COE is free — university files it.' },
  { id: 'b3', category: 'English Test Fees (IELTS)', icon: '📝', estimatedJPY: 0, estimatedINR: 17000, savedINR: 0, notes: 'IELTS Academic test fee in India ≈ ₹17,000.' },
  { id: 'b4', category: 'Flight (India → Japan)', icon: '✈️', estimatedJPY: 120000, estimatedINR: 72000, savedINR: 0, notes: 'Book 3 months early. Mumbai/Delhi to Tokyo. Direct or via SE Asia.' },
  { id: 'b5', category: 'Accommodation (First 6 months)', icon: '🏠', estimatedJPY: 420000, estimatedINR: 252000, savedINR: 0, notes: 'University dorm ¥30–50K/mo. Share house slightly cheaper.' },
  { id: 'b6', category: 'Monthly Living Expenses', icon: '🍜', estimatedJPY: 100000, estimatedINR: 60000, savedINR: 0, notes: 'Food, transport, utilities, phone. Budget ¥80–120K/month.' },
  { id: 'b7', category: 'Emergency Fund Buffer', icon: '🛡️', estimatedJPY: 200000, estimatedINR: 120000, savedINR: 0, notes: 'Keep ¥200K untouched. Medical, urgent travel, surprise costs.' },
  { id: 'b8', category: 'JLPT Exam Fee', icon: '📖', estimatedJPY: 0, estimatedINR: 3500, savedINR: 0, notes: 'JLPT registration fee for July 2026 session (India). ~₹3,500.' },
  { id: 'b9', category: 'University Application Fees', icon: '📨', estimatedJPY: 60000, estimatedINR: 36000, savedINR: 0, notes: 'Some Japanese universities charge ¥30,000 per application. Budget for 2 paid apps.' },
  { id: 'b10', category: 'Document Apostille + Translations', icon: '📜', estimatedJPY: 0, estimatedINR: 8000, savedINR: 0, notes: 'MEA apostille (~₹500/doc) + certified English translation fees (~₹5,000–₹7,000 total).' },
]

export const initialResources: Resource[] = [
  { id: 'r1', title: 'Study in Japan Official Portal', category: 'official', description: 'Japan\'s government portal for international students — programs, scholarships, life guides.', url: 'https://www.studyinjapan.go.jp/en/' },
  { id: 'r2', title: 'MEXT Scholarship 2026 — Embassy of Japan India', category: 'scholarship', description: 'Embassy route applications open April 2026. Most prestigious scholarship available.', url: 'https://www.in.emb-japan.go.jp/Education/Research_Student.html' },
  { id: 'r3', title: 'JASSO — Scholarships for International Students', category: 'scholarship', description: 'JASSO scholarships, housing support, and guidance for students in Japan.', url: 'https://www.studyinjapan.go.jp/en/planning/scholarships/jasso-scholarships/' },
  { id: 'r4', title: 'Embassy of Japan in India — Student Visa', category: 'visa', description: 'Student visa applications, COE requirements, and consular services.', url: 'https://www.in.emb-japan.go.jp/itpr_en/visa.html' },
  { id: 'r5', title: 'JLPT — Register Overseas (India)', category: 'language', description: 'Japanese Language Proficiency Test — July 2026 session registration opens ~April 2026.', url: 'https://www.jlpt.jp/sp/e/application/overseas_list.html' },
  { id: 'r6', title: 'EJU — Exam for Japanese University Admission', category: 'exam', description: 'Required for some Japanese-taught programs. Check if your target university needs it.', url: 'https://www.jasso.go.jp/en/ryugaku/eju/index.html' },
  { id: 'r7', title: 'IELTS — Book Your Test in India (IDP)', category: 'exam', description: 'Book IELTS Academic test in India. Required by most English-taught programs in Japan.', url: 'https://ieltsidpindia.com/registration/reg1' },
  { id: 'r8', title: 'COE — Embassy of Japan Guide', category: 'visa', description: 'How the Certificate of Eligibility works — what your university files before your visa.', url: 'https://www.us.emb-japan.go.jp/itpr_en/visa-coe.html' },
  { id: 'r9', title: 'ADB-Japan Scholarship Program', category: 'scholarship', description: 'Full funding for eligible programs. For Indian citizens with min. 2 years work experience.', url: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program' },
  { id: 'r10', title: 'Japan Post Bank (Yucho) — For New Arrivals', category: 'official', description: 'Most accessible bank for new international students. No Japanese needed to open.', url: 'https://www.jp-bank.japanpost.jp/en_index.html' },
  { id: 'r11', title: 'University of Tokyo — Graduate Admissions', category: 'university', description: 'Graduate school admissions portal — programs, deadlines, application requirements.', url: 'https://www.u-tokyo.ac.jp/en/prospective-students/grad_admissions.html' },
  { id: 'r12', title: 'Institute of Science Tokyo — Graduate Admissions', category: 'university', description: 'Formerly Tokyo Tech (rebranded Oct 2024). Graduate admissions for science & engineering.', url: 'https://admissions.isct.ac.jp/en/013/graduate/programs/science-and-engineering' },
  { id: 'r13', title: 'NHK World — Learn Japanese', category: 'language', description: 'Free beginner Japanese lessons by NHK. Great for learning hiragana, katakana, and basics.', url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/' },
  { id: 'r14', title: 'JICA Innovative Asia Scholarship', category: 'scholarship', description: 'JICA scholarship for Asian students. Check eligibility for India.', url: 'https://www.jica.go.jp/english/overseas/asia/innovative_asia.html' },
  { id: 'r15', title: 'Passport Seva — Apply / Renew Passport', category: 'official', description: 'Indian passport application and renewal portal.', url: 'https://www.passportindia.gov.in/psp/Apply' },
]

export const initialTimeline: TimelineEvent[] = [
  { id: 'tl1', title: 'Start cold emailing target professors', date: '2026-04-01', description: 'Send CV + research interest statement to 5–10 professors', status: 'upcoming', category: 'Application' },
  { id: 'tl2', title: 'MEXT Embassy applications open', date: '2026-04-01', description: 'Embassy of Japan in India opens MEXT application window', status: 'upcoming', category: 'Scholarship' },
  { id: 'tl3', title: 'JLPT July session registration opens', date: '2026-04-15', description: 'Register for JLPT N5/N4 July 2026 session', status: 'upcoming', category: 'Language' },
  { id: 'tl4', title: 'Collect sealed academic transcripts', date: '2026-05-01', description: 'All semesters, registrar seal on each page', status: 'upcoming', category: 'Document' },
  { id: 'tl5', title: 'Request recommendation letters', date: '2026-05-01', description: 'Ask both professors — give 3+ weeks lead time', status: 'upcoming', category: 'Document' },
  { id: 'tl6', title: 'MEXT Embassy application deadline', date: '2026-05-13', description: '2026 date not announced. 2025 was May 13 — check Embassy site from April.', status: 'future', category: 'Scholarship' },
  { id: 'tl7', title: 'ADB-Japan Scholarship deadline', date: '2026-06-30', description: '⚠ Estimated — verify exact date on ADB website before applying.', status: 'future', category: 'Scholarship' },
  { id: 'tl8', title: 'JLPT July 2026 exam', date: '2026-07-05', description: 'Confirmed: JLPT exam July 5, 2026. Register ~April–May.', status: 'future', category: 'Language' },
  { id: 'tl9', title: 'Osaka University — Summer exam deadline', date: '2026-07-17', description: 'Summer exam (Oct 2026 entry): application payment deadline Jul 17, 2026.', status: 'future', category: 'Application' },
  { id: 'tl10', title: 'UTokyo — October entry deadline', date: '2026-09-17', description: 'October 2026 entry deadline: Sep 17, 2026 (tentative). Verify on UTokyo site.', status: 'future', category: 'Application' },
  { id: 'tl11', title: 'Waseda 2026 application window', date: '2026-07-01', description: '⚠ 2025 window was Jul 7–25. 2026 not announced — check from May 2026.', status: 'future', category: 'Application' },
  { id: 'tl12', title: 'Osaka University — Winter exam deadline', date: '2026-11-06', description: 'Winter exam (Apr 2027 entry): application payment deadline Nov 6, 2026.', status: 'future', category: 'Application' },
  { id: 'tl13', title: 'Kyoto / IST / UTokyo (Apr 2027 entry) deadlines', date: '2026-12-01', description: '⚠ Apr 2027 entry deadlines not yet announced for these universities. Monitor from Sep 2026.', status: 'future', category: 'Application' },
  { id: 'tl14', title: 'Target: COE received from university', date: '2027-03-01', description: 'Certificate of Eligibility issued by Immigration Japan', status: 'future', category: 'Visa' },
  { id: 'tl15', title: 'Target: Student visa filed at Embassy', date: '2027-03-15', description: 'Submit student visa application in New Delhi', status: 'future', category: 'Visa' },
  { id: 'tl16', title: 'Target: Depart India — Japan', date: '2027-04-01', description: 'Flight booked. The mission goes live.', status: 'future', category: 'Travel' },
]
