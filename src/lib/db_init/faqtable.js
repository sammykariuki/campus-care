import db from '../db';

db.prepare(`
  CREATE TABLE IF NOT EXISTS faq (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
  )
`).run();

const dummyFAQ = [
  // 🎓 Academics (20)
  {
    question: 'What is the grading system used by the university?',
    answer: 'Most universities use a GPA system ranging from 0.0 to 4.0, where A = 4.0, B = 3.0, and so on.',
  },
  {
    question: 'How can I register for my courses?',
    answer: 'Course registration is done online through the university portal during the registration period.',
  },
  {
    question: 'What happens if I miss the registration deadline?',
    answer: 'Late registration may incur a fee or require special approval from the academic office.',
  },
  {
    question: 'How many credit hours do I need to graduate?',
    answer: 'Most undergraduate programs require between 120 and 140 credit hours to graduate.',
  },
  {
    question: 'Can I change my major?',
    answer: 'Yes, but you must meet the department requirements and apply through the academic registrar.',
  },
  {
    question: 'How do I get a transcript?',
    answer: 'You can request an official transcript from the registrar\'s office or through the student portal.',
  },
  {
    question: 'What is the academic calendar like?',
    answer: 'The academic year is typically divided into two semesters or three trimesters. Check the university website.',
  },
  {
    question: 'How do I apply for a leave of absence?',
    answer: 'Submit a formal request to your faculty advisor and the registrar’s office explaining your reason.',
  },
  {
    question: 'What is considered academic misconduct?',
    answer: 'Cheating, plagiarism, falsifying data, and unauthorized collaboration are all considered misconduct.',
  },
  {
    question: 'What should I do if I fail a course?',
    answer: 'You may be required to retake the course or attend remedial classes depending on university policy.',
  },
  {
    question: 'Can I retake a course for a better grade?',
    answer: 'Yes, most universities allow you to retake a course and replace the lower grade.',
  },
  {
    question: 'Are summer courses available?',
    answer: 'Yes, many universities offer optional summer courses for faster graduation or makeup work.',
  },
  {
    question: 'How can I access my grades?',
    answer: 'Grades are typically posted on the student portal after the examination period.',
  },
  {
    question: 'What is a prerequisite course?',
    answer: 'It is a course you must complete before enrolling in a more advanced course.',
  },
  {
    question: 'How can I meet with my academic advisor?',
    answer: 'You can book an appointment via email or through the department secretary.',
  },
  {
    question: 'What does it mean to be on academic probation?',
    answer: 'It means your GPA has dropped below the minimum and you’re at risk of dismissal if it doesn’t improve.',
  },
  {
    question: 'Are lectures compulsory to attend?',
    answer: 'Some courses require attendance. Check with your department’s policy.',
  },
  {
    question: 'How do I apply for graduation?',
    answer: 'Submit a graduation application form through the registrar’s office before the deadline.',
  },
  {
    question: 'What is the pass mark for most courses?',
    answer: 'Typically, 40% or 50% depending on the grading scale used by your institution.',
  },
  {
    question: 'Can I audit a class?',
    answer: 'Yes, auditing allows you to attend a class without earning credit, subject to approval.',
  },

  // 🏢 Admin & Services (20)
  {
    question: 'Where is the registrar’s office located?',
    answer: 'It\'s typically found in the main administration building. Check the campus map or website.',
  },
  {
    question: 'How do I get my student ID card?',
    answer: 'Visit the ID office with proof of admission to receive your student ID.',
  },
  {
    question: 'How do I update my contact information?',
    answer: 'Log in to the student portal and update your personal profile or visit the registrar\'s office.',
  },
  {
    question: 'Can I get a letter of enrollment?',
    answer: 'Yes, request it through the student portal or from the registrar\'s office.',
  },
  {
    question: 'How do I access my class schedule?',
    answer: 'Your class schedule is available on the student portal under your registered courses.',
  },
  {
    question: 'What is the process for academic appeals?',
    answer: 'Submit a formal written appeal to the academic board through your department.',
  },
  {
    question: 'Can I transfer to another university?',
    answer: 'Yes, if the receiving institution accepts your credits and you meet their transfer requirements.',
  },
  {
    question: 'How do I access IT support?',
    answer: 'Contact the university’s IT helpdesk via email or walk-in support center.',
  },
  {
    question: 'What do I do if I lose my student ID?',
    answer: 'Report it immediately and apply for a replacement at the ID office.',
  },
  {
    question: 'Where can I find the university’s policies?',
    answer: 'University policies are available in the student handbook or official website.',
  },
  {
    question: 'Is there a lost and found department?',
    answer: 'Yes, lost items are usually reported to the security or administration office.',
  },
  {
    question: 'Can I print or photocopy documents on campus?',
    answer: 'Yes, printing services are available at the library or student center.',
  },
  {
    question: 'How can I reserve a room or hall?',
    answer: 'Submit a request through the facilities management or student affairs office.',
  },
  {
    question: 'Where do I get my exam timetable?',
    answer: 'Exam timetables are released via the student portal or department notice boards.',
  },
  {
    question: 'How do I get proof of residence for a visa?',
    answer: 'You can request a housing confirmation letter from the student housing office.',
  },
  {
    question: 'Who do I contact for student affairs issues?',
    answer: 'Visit the student affairs office or contact them through email.',
  },
  {
    question: 'Can I submit forms online?',
    answer: 'Yes, many administrative forms are now submitted digitally via the student portal.',
  },
  {
    question: 'Where can I lodge a formal complaint?',
    answer: 'Use the university grievance system or contact the student ombuds office.',
  },
  {
    question: 'How do I know if I am eligible for Dean’s List?',
    answer: 'You must meet GPA and credit criteria. Check your department\'s guidelines.',
  },
  {
    question: 'What are the office hours for administration?',
    answer: 'Typically 9 AM to 5 PM on weekdays. Check your university calendar for updates.',
  },

  // 💰 Financial Aid & Fees (20)
  {
    question: 'How do I pay my tuition fees?',
    answer: 'Payments can be made through the university portal, bank deposit, or mobile banking services.',
  },
  {
    question: 'Are scholarships available?',
    answer: 'Yes, both merit-based and need-based scholarships are available. Check with the financial aid office.',
  },
  {
    question: 'What happens if I can’t pay my fees on time?',
    answer: 'Late payments may incur penalties or you may be blocked from exams. Contact finance office immediately.',
  },
  {
    question: 'How can I apply for a bursary?',
    answer: 'Complete a bursary application form and submit it with supporting documents during the open period.',
  },
  {
    question: 'Are there work-study opportunities?',
    answer: 'Some universities offer part-time work on campus. Check with the career or student services office.',
  },
  {
    question: 'Do international students pay higher fees?',
    answer: 'Yes, tuition for international students is usually higher than for local students.',
  },
  {
    question: 'How do I get a receipt for my payment?',
    answer: 'Receipts are available in your student portal or can be printed at the finance office.',
  },
  {
    question: 'What is covered by the tuition fees?',
    answer: 'Tuition fees generally cover instruction, lab access, library use, and some campus services.',
  },
  {
    question: 'Can I pay my fees in installments?',
    answer: 'Many universities allow installment plans. Contact the bursar’s office for details.',
  },
  {
    question: 'What is the refund policy if I withdraw?',
    answer: 'Partial refunds may be available based on how early you withdraw. Check the refund policy.',
  },
  {
    question: 'How can I track my financial aid status?',
    answer: 'Log in to the financial aid portal to check your application and disbursement status.',
  },
  {
    question: 'Are textbooks covered by tuition?',
    answer: 'No, students are usually responsible for purchasing their own textbooks.',
  },
  {
    question: 'Can I appeal a financial aid decision?',
    answer: 'Yes, submit a written appeal with additional supporting documentation.',
  },
  {
    question: 'How often do I need to reapply for aid?',
    answer: 'Usually once per academic year. Check the deadlines with the financial aid office.',
  },
  {
    question: 'Are there loans available for students?',
    answer: 'Yes, government and private student loans are available for eligible students.',
  },
  {
    question: 'Do I need a guarantor for student loans?',
    answer: 'Some loan programs require a guarantor, especially for private loans.',
  },
  {
    question: 'Can I use financial aid for housing?',
    answer: 'Yes, financial aid can often be used for approved housing and living expenses.',
  },
  {
    question: 'How do I apply for a fee waiver?',
    answer: 'Submit a fee waiver request form to the finance office with evidence of financial hardship.',
  },
  {
    question: 'Is there a penalty for bounced checks?',
    answer: 'Yes, returned payments may incur a service fee or hold on your account.',
  },
  {
    question: 'Can I receive financial aid as a part-time student?',
    answer: 'Yes, but aid amounts may be reduced depending on your enrollment status.',
  },

// 🏠 Campus Life (20)
{
  question: 'How do I apply for campus housing?',
  answer: 'You can apply online through the student portal or visit the housing office during working hours.',
},
{
  question: 'Can I choose my roommate?',
  answer: 'Some universities allow roommate requests. Include it during your housing application.',
},
{
  question: 'Are there curfews in the hostels?',
  answer: 'Some residence halls have curfews. Check your residence policy handbook.',
},
{
  question: 'Are guests allowed in student dorms?',
  answer: 'Most dorms allow guests but with time restrictions. Guests must register at the reception.',
},
{
  question: 'How do I report maintenance issues?',
  answer: 'Log the issue via the housing portal or inform the resident assistant or hall manager.',
},
{
  question: 'Is laundry service available on campus?',
  answer: 'Yes, most campuses provide self-service laundry or paid laundry services nearby.',
},
{
  question: 'Are there meal plans available?',
  answer: 'Yes, meal plans are available and often required for students living on campus.',
},
{
  question: 'What student clubs and societies are available?',
  answer: 'There are academic, cultural, sports, and special interest clubs. Check the student affairs office.',
},
{
  question: 'How do I join a student club?',
  answer: 'Attend the club fair or visit the student center to sign up for clubs and societies.',
},
{
  question: 'Are sports facilities available to all students?',
  answer: 'Yes, all enrolled students typically have access to gyms, courts, and fields.',
},
{
  question: 'Is medical care available on campus?',
  answer: 'Yes, the university health center provides basic medical and mental health services.',
},
{
  question: 'How do I report harassment or bullying?',
  answer: 'Contact the campus security or the student welfare office. There are confidential reporting channels.',
},
{
  question: 'Are religious services offered on campus?',
  answer: 'Yes, chaplaincy and other faith-based support are often available through student services.',
},
{
  question: 'Is campus safe at night?',
  answer: 'Most campuses have 24/7 security patrols and safe walk programs. Avoid isolated areas.',
},
{
  question: 'Where can I buy food on campus?',
  answer: 'Food courts, cafes, and vending machines are available at various campus locations.',
},
{
  question: 'How do I volunteer or do community service?',
  answer: 'Opportunities are shared by the student affairs or volunteer office. You can also join a club.',
},
{
  question: 'Can I bring a car or bike to campus?',
  answer: 'Yes, but you may need a parking permit. Check with the campus security office.',
},
{
  question: 'What events are held during orientation week?',
  answer: 'Orientation includes campus tours, welcome speeches, fun activities, and info sessions.',
},
{
  question: 'How can I rent a locker on campus?',
  answer: 'Lockers are managed by the student union or department offices. Sign up early to get one.',
},
{
  question: 'Are there places for students to relax or study outside class?',
  answer: 'Yes, lounges, gardens, libraries, and reading rooms are available for student use.',
},

// 🌍 Other: General / International / Technology (20)
{
  question: 'Do you have support for international students?',
  answer: 'Yes, there is an international office to help with visas, orientation, and cultural adjustment.',
},
{
  question: 'Can I work while studying?',
  answer: 'Local laws may limit work hours. International students often have restrictions. Check your visa terms.',
},
{
  question: 'What is the language of instruction?',
  answer: 'Most courses are taught in English unless otherwise specified in the course catalog.',
},
{
  question: 'Is there Wi-Fi on campus?',
  answer: 'Yes, high-speed Wi-Fi is available throughout campus. Login credentials are provided at registration.',
},
{
  question: 'How can I access the e-learning platform?',
  answer: 'Log in with your student email and password through the LMS portal like Moodle or Blackboard.',
},
{
  question: 'What should I do if I forget my portal password?',
  answer: 'Use the “forgot password” option on the login page or contact IT support for reset.',
},
{
  question: 'Is technical support available for online classes?',
  answer: 'Yes, IT support is available for students facing issues with Zoom, LMS, or email.',
},
{
  question: 'How do I access the university library online?',
  answer: 'Log in to the library portal using your student credentials to access e-books and journals.',
},
{
  question: 'Can I get a student email account?',
  answer: 'Yes, student email accounts are issued after registration and used for all official communication.',
},
{
  question: 'What should I do if I get locked out of my account?',
  answer: 'Contact the IT helpdesk to reset your account and confirm your identity.',
},
{
  question: 'How do I protect myself from phishing emails?',
  answer: 'Never click suspicious links. Use your university email only on trusted platforms.',
},
{
  question: 'Are there student exchange programs?',
  answer: 'Yes, many universities offer international exchange programs. Visit the international office for info.',
},
{
  question: 'What is a VPN and do I need it?',
  answer: 'A VPN lets you securely access university resources off-campus. Some universities require it.',
},
{
  question: 'Can I get a university email on my phone?',
  answer: 'Yes, use the Gmail/Outlook app with your student email and university login credentials.',
},
{
  question: 'What file formats are supported in the online submission portal?',
  answer: 'Common formats like PDF, DOCX, PPT, and ZIP are usually supported. Check course guidelines.',
},
{
  question: 'How can I check plagiarism in my assignment?',
  answer: 'Many universities provide Turnitin or similar tools through the LMS to check originality.',
},
{
  question: 'Can I access lecture recordings?',
  answer: 'Yes, if your lecturer uploads them to the LMS. Check your course module page.',
},
{
  question: 'How do I download my timetable as a PDF?',
  answer: 'Most portals have an “export” or “print” option in your course schedule section.',
},
{
  question: 'Where do I report cyberbullying or harassment?',
  answer: 'Use the IT incident report system or contact the student affairs office.',
},
{
  question: 'Do you offer training on digital tools?',
  answer: 'Yes, workshops are held on tools like Microsoft Office, Google Workspace, and research software.',
},
];

function clearFaqTable() {
  db.prepare('DELETE FROM faq').run();
  console.log('Existing FAQ table cleared.');
}

async function initData() {
  clearFaqTable(); // Clear existing entries first

  const insertStmt = db.prepare(`
    INSERT INTO faq (
      question,
      answer
    ) VALUES (
      @question,
      @answer
    )
  `);

  for (const FAQ of dummyFAQ) {
    insertStmt.run(FAQ);
  }

  console.log("100 Dummy FAQ inserted.");
}

initData();