export interface JobVacancy {
  id: string;
  title: string;
  titleAm: string;
  department: string;
  departmentAm: string;
  location: string;
  locationAm: string;
  type: string;
  typeAm: string;
  experience: string;
  experienceAm: string;
  desc: string;
  descAm: string;
  reqs: string[];
  reqsAm: string[];
  postedDate: string;
}

export const careersData: JobVacancy[] = [
  {
    id: 'job-1',
    title: 'Senior Cardiologist',
    titleAm: 'ሲኒየር የልብ ህክምና ስፔሻሊስት',
    department: 'Cardiology',
    departmentAm: 'የልብ ህክምና',
    location: 'Main Branch (Addis Ababa)',
    locationAm: 'ዋና ቅርንጫፍ (አዲስ አበባ)',
    type: 'Full-time',
    typeAm: 'ሙሉ ሰዓት',
    experience: '5+ Years',
    experienceAm: '5+ ዓመታት',
    desc: 'Seeking an experienced cardiologist to lead clinical cardiology consultations, echocardiograms, and inpatient cardiac care protocols.',
    descAm: 'የክሊኒካል የልብ ህክምና ምክክሮችን፣ ኢኮካርዲዮግራሞችን እና የተመላላሽ የልብ እንክብካቤ ፕሮቶኮሎችን የሚመራ ልምድ ያለው የልብ ሐኪም እንፈልጋለን።',
    reqs: [
      'MD with Specialization in Cardiology from a recognized medical school.',
      'Active medical practice license in Ethiopia.',
      'Proven expertise in managing acute coronary syndromes and heart failure.',
      'Excellent leadership and patient communication skills in Amharic and English.'
    ],
    reqsAm: [
      'ከትምህርት ሚኒስቴር እውቅና ካለው የህክምና ትምህርት ቤት በልብ ህክምና ስፔሻላይዝድ ያደረገ።',
      'በኢትዮጵያ ውስጥ የታደሰ የህክምና ባለሙያ ፈቃድ ያለው።',
      'በአጣዳፊ የልብ ህመም እና የልብ ድካም አያያዝ የተረጋገጠ ልምድ ያለው።',
      'በአማርኛ እና በእንግሊዝኛ ጥሩ የመግባባት እና የመምራት ችሎታ ያለው።'
    ],
    postedDate: '2026-05-10'
  },
  {
    id: 'job-2',
    title: 'Emergency Room (ER) Nurse',
    titleAm: 'የድንገተኛ ክፍል (ER) ነርስ',
    department: 'Emergency',
    departmentAm: 'ድንገተኛ',
    location: 'Main Branch (Addis Ababa)',
    locationAm: 'ዋና ቅርንጫፍ (አዲስ አበባ)',
    type: 'Full-time',
    typeAm: 'ሙሉ ሰዓት',
    experience: '2+ Years',
    experienceAm: '2+ ዓመታት',
    desc: 'Join our rapid response team delivering critical emergency care, patient triage, and immediate life support interventions.',
    descAm: 'ወሳኝ የድንገተኛ አደጋ እንክብካቤን፣ የታካሚዎችን ትራያጅ እና ፈጣን የህይወት ድጋፍ ጣልቃ ገብነቶችን የሚሰጠውን ፈጣን ምላሽ ሰጪ ቡድናችንን ይቀላቀሉ።',
    reqs: [
      'BSc in Nursing from an accredited institution.',
      'BLS and ACLS certification required.',
      'Ability to thrive in a high-pressure 24/7 emergency environment.',
      'Compassionate patient care and excellent teamwork skills.'
    ],
    reqsAm: [
      'በነርሲንግ የባችለር ዲግሪ ያለው።',
      'የ BLS እና ACLS ሰርተፍኬት ያለው።',
      'በከፍተኛ ጫና እና በ24/7 የድንገተኛ አደጋ አካባቢ ውስጥ የመስራት ችሎታ ያለው።',
      'ለታካሚዎች ሩህሩህ እና ጥሩ የቡድን ስራ ችሎታ ያለው።'
    ],
    postedDate: '2026-05-14'
  },
  {
    id: 'job-3',
    title: 'Pediatric Specialist',
    titleAm: 'የህፃናት ህክምና ስፔሻሊስት',
    department: 'Pediatrics',
    departmentAm: 'የህፃናት ህክምና',
    location: 'Ayat Branch (Addis Ababa)',
    locationAm: 'አያት ቅርንጫፍ (አዲስ አበባ)',
    type: 'Full-time',
    typeAm: 'ሙሉ ሰዓት',
    experience: '3+ Years',
    experienceAm: '3+ ዓመታት',
    desc: 'Dedicated pediatrician required for outpatient consultations, routine child wellness examinations, and pediatric ward oversight.',
    descAm: 'ለተመላላሽ ታካሚዎች ምክክር፣ ለመደበኛ የህፃናት ጤና ምርመራዎች እና የህፃናት ክፍል ክትትል ራሱን የሰጠ የህፃናት ሀኪም እንፈልጋለን።',
    reqs: [
      'MD with residency completed in Pediatrics.',
      'Strong diagnostic skills for childhood illnesses and developmental milestones.',
      'Empathetic approach towards young patients and their families.'
    ],
    reqsAm: [
      'በህፃናት ህክምና ስፔሻላይዝድ ያደረገ የህክምና ዶክተር።',
      'ለህፃናት በሽታዎች እና የእድገት ደረጃዎች ጠንካራ የምርመራ ችሎታ ያለው።',
      'ለወጣት ታካሚዎች እና ለቤተሰቦቻቸው ሩህሩህ አቀራረብ ያለው።'
    ],
    postedDate: '2026-05-12'
  },
  {
    id: 'job-4',
    title: 'Medical Laboratory Technologist',
    titleAm: 'የህክምና ላቦራቶሪ ቴክኖሎጂስት',
    department: 'Laboratory',
    departmentAm: 'ላቦራቶሪ',
    location: 'Main Branch (Addis Ababa)',
    locationAm: 'ዋና ቅርንጫፍ (አዲስ አበባ)',
    type: 'Full-time',
    typeAm: 'ሙሉ ሰዓት',
    experience: '1+ Years',
    experienceAm: '1+ ዓመታት',
    desc: 'Conduct advanced diagnostic tests, hematology, clinical chemistry analyses, and ensure rigorous quality control standards.',
    descAm: 'የላቁ የምርመራ ፈተናዎችን፣ ሄማቶሎጂን፣ ክሊኒካል ኬሚስትሪ ትንታኔዎችን ማካሄድ እና ጥብቅ የጥራት ቁጥጥር ደረጃዎችን ማረጋገጥ።',
    reqs: [
      'BSc in Medical Laboratory Science.',
      'Proficient in operating modern automated analyzers.',
      'Strict adherence to laboratory safety protocols.'
    ],
    reqsAm: [
      'በህክምና ላቦራቶሪ ሳይንስ የባችለር ዲግሪ።',
      'ዘመናዊ አውቶሜትድ ማሽኖችን የመስራት ብቃት ያለው።',
      'የላቦራቶሪ ደህንነት ፕሮቶኮሎችን በጥብቅ የሚከተል።'
    ],
    postedDate: '2026-05-16'
  },
  {
    id: 'job-5',
    title: 'Senior IT Systems Administrator',
    titleAm: 'ሲኒየር የ IT ሲስተም አስተዳዳሪ',
    department: 'Administration',
    departmentAm: 'አስተዳደር',
    location: 'Main Branch (Addis Ababa)',
    locationAm: 'ዋና ቅርንጫፍ (አዲስ አበባ)',
    type: 'Full-time',
    typeAm: 'ሙሉ ሰዓት',
    experience: '4+ Years',
    experienceAm: '4+ ዓመታት',
    desc: 'Manage hospital network infrastructure, Electronic Medical Records (EMR) uptime, database backups, and network security.',
    descAm: 'የሆስፒታሉን ኔትወርክ፣ የኤሌክትሮኒክ የህክምና መዛግብት (EMR) ደህንነት እና የዳታቤዝ ባክአፕ ማስተዳደር።',
    reqs: [
      'BSc in Computer Science or Information Technology.',
      'Experience managing hospital EMR/EHR systems is highly preferred.',
      'Strong knowledge of network security and cloud backups.'
    ],
    reqsAm: [
      'በኮምፒውተር ሳይንስ ወይም IT የባችለር ዲግሪ።',
      'የሆስፒታል EMR ሲስተሞችን በማስተዳደር ልምድ ያለው ይመረጣል።',
      'በኔትወርክ ደህንነት እና ክላውድ ባክአፕ ላይ ጠንካራ እውቀት ያለው።'
    ],
    postedDate: '2026-05-17'
  }
];

export const hrContactData = {
  email: 'hr@yanetprimaryhospital.com',
  phone: '+251 11 123 4568',
  address: 'Main Branch, 3rd Floor, HR & Administration Suite, Addis Ababa, Ethiopia',
  addressAm: 'ዋና ቅርንጫፍ፣ 3ኛ ፎቅ፣ የሰው ሀብት እና አስተዳደር ቢሮ፣ አዲስ አበባ፣ ኢትዮጵያ',
  workingHours: 'Mon - Fri: 8:30 AM - 5:00 PM',
  workingHoursAm: 'ሰኞ - አርብ: 2:30 ሰዓት - 11:00 ሰዓት'
};

export const internshipPrograms = [
  {
    id: 'prog-1',
    title: 'Medical Internship & Clinical Rotations',
    titleAm: 'የህክምና ኢንተርንሺፕ እና ክሊኒካል ሮቴሽን',
    duration: '6 - 12 Months',
    durationAm: '6 - 12 ወራት',
    desc: 'Hands-on clinical experience for final-year medical students across internal medicine, pediatrics, surgery, and OB/GYN under senior consultant mentorship.',
    descAm: 'በመጨረሻ ዓመት የህክምና ተማሪዎች በሲኒየር ዶክተሮች ክትትል ስር በጠቅላላ ህክምና፣ ህፃናት፣ ቀዶ ጥገና እና ማህፀን ህክምና ውስጥ ተግባራዊ ክሊኒካል ልምድ።',
    icon: 'Stethoscope'
  },
  {
    id: 'prog-2',
    title: 'Nursing Attachment Program',
    titleAm: 'የነርሲንግ ልምምድ ፕሮግራም',
    duration: '3 - 6 Months',
    durationAm: '3 - 6 ወራት',
    desc: 'Structured clinical attachments for nursing students focusing on emergency care, ICU protocols, patient communication, and medication administration.',
    descAm: 'በድንገተኛ አደጋ እንክብካቤ፣ በ ICU ፕሮቶኮሎች፣ በታካሚ ግንኙነት እና በመድሀኒት አሰጣጥ ላይ ለሚያተኩሩ የነርሲንግ ተማሪዎች የተዋቀረ ክሊኒካዊ ልምምድ።',
    icon: 'HeartPulse'
  },
  {
    id: 'prog-3',
    title: 'Healthcare Administration Internship',
    titleAm: 'የጤና እንክብካቤ አስተዳደር ኢንተርንሺፕ',
    duration: '3 Months',
    durationAm: '3 ወራት',
    desc: 'Designed for graduates in healthcare management or business administration to learn hospital operations, medical billing, HR, and patient experience workflows.',
    descAm: 'በጤና እንክብካቤ አስተዳደር ወይም ቢዝነስ ምሩቃን የሆስፒታል ስራዎችን፣ የህክምና ሂሳብ አከፋፈልን እና የሰው ሀብት ስራዎችን እንዲማሩ የተዘጋጀ።',
    icon: 'Briefcase'
  }
];
