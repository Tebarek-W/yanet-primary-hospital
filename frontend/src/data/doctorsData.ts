export interface Doctor {
  id: string;
  name: string;
  nameAm: string;
  roleKey: string;
  specialty: string;
  image: string;
  desc: string;
  descAm: string;
  email: string;
  phone: string;
  location: string;
  education: string[];
  educationAm: string[];
  experience: string[];
  experienceAm: string[];
  skills: string[];
  skillsAm: string[];
  biography: string;
  biographyAm: string;
}

const staticDoctors: Doctor[] = [
  {
    id: '1',
    name: "Dr. Dawit Yilma",
    nameAm: "ዶ/ር ዳዊት ይልማ",
    roleKey: 'doctor_team.roles.cardiologist',
    specialty: 'Cardiology',
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    desc: "Senior cardiologist with over 15 years of experience in cardiac care.",
    descAm: "ከ15 ዓመት በላይ ልምድ ያለው ከፍተኛ የልብ ሐኪም",
    email: "dawit.yilma@yanet.com",
    phone: "+251 911 22 33 44",
    location: "Addis Ababa, Ethiopia",
    education: [
      "MD from Addis Ababa University",
      "Fellowship in Cardiology, UK",
      "Board Certified in Internal Medicine"
    ],
    educationAm: [
      "ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት",
      "በእንግሊዝ ሀገር የልብ ህክምና ስፔሻሊስት",
      "በውስጥ ደዌ ህክምና የተመሰከረላቸው"
    ],
    experience: [
      "Chief Cardiologist at Black Lion Hospital (5 years)",
      "Senior Resident at St. Paul's Hospital (4 years)",
      "Consultant at Yanet Cardiac Center (3 years)"
    ],
    experienceAm: [
      "በጥቁር አንበሳ ሆስፒታል ዋና የልብ ሐኪም (5 ዓመታት)",
      "በቅዱስ ጳውሎስ ሆስፒታል ከፍተኛ ረዳት (4 ዓመታት)",
      "በያኔት የልብ ማዕከል አማካሪ (3 ዓመታት)"
    ],
    skills: ["Cardiac Surgery", "Echocardiography", "Heart Failure Management", "Hypertension Treatment"],
    skillsAm: ["የልብ ቀዶ ጥገና", "ኢኮካርዲዮግራፊ", "የልብ ድካም አያያዝ", "የደም ግፊት ህክምና"],
    biography: "Dr. Dawit Yilma is a world-renowned cardiologist dedicated to providing the highest quality cardiac care in Ethiopia.",
    biographyAm: "ዶ/ር ዳዊት ይልማ በኢትዮጵያ ውስጥ ከፍተኛ ጥራት ያለው የልብ እንክብካቤ ለመስጠት የቆረጡ በዓለም አቀፍ ደረጃ የታወቁ የልብ ሐኪም ናቸው።"
  },
  {
    id: '2',
    name: "Dr. Selamawit Alemu",
    nameAm: "ዶ/ር ሰላማዊት አለሙ",
    roleKey: 'doctor_team.roles.necrologist',
    specialty: 'Neurology',
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop",
    desc: "Specializes in neurological disorders and brain conditions.",
    descAm: "በነርቭ ሕመም እና በአንጎል ሁኔታዎች ላይ ያተኩራል",
    email: "selamawit.alemu@yanet.com",
    phone: "+251 911 55 66 77",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from Jimma University", "Neurology Residency, Cairo University"],
    educationAm: ["ከጅማ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በካይሮ ዩኒቨርሲቲ የነርቭ ህክምና ስፔሻሊስት"],
    experience: ["Senior Neurologist at Tikur Anbessa (6 years)", "Neurology Consultant (4 years)"],
    experienceAm: ["በጥቁር አንበሳ ከፍተኛ የነርቭ ሐኪም (6 ዓመታት)", "የነርቭ ህክምና አማካሪ (4 ዓመታት)"],
    skills: ["Neurological Imaging", "Stroke Care", "Epilepsy Management"],
    skillsAm: ["የነርቭ ምስል (Imaging)", "የስትሮክ እንክብካቤ", "የሚጥል በሽታ አያያዝ"],
    biography: "Dr. Selamawit Alemu has a deep passion for understanding the complexities of the human brain.",
    biographyAm: "ዶ/ር ሰላማዊት አለሙ የሰውን አንጎል ውስብስብነት ለመረዳት ከፍተኛ ፍላጎት አላቸው።"
  },
  {
    id: '3',
    name: "Dr. Solomon Tadesse",
    nameAm: "ዶ/ር ሰለሞን ታደሰ",
    roleKey: 'doctor_team.roles.surgery',
    specialty: 'Surgery',
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    desc: "Highly skilled in various complex surgical procedures.",
    descAm: "በተለያዩ የቀዶ ጥገና ሂደቶች ከፍተኛ ችሎታ ያለው",
    email: "solomon.tadesse@yanet.com",
    phone: "+251 911 88 99 00",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from Gondar University", "General Surgery Fellowship, South Africa"],
    educationAm: ["ከጎንደር ዩኒቨርሲቲ የህክምና ዶክትሬት", "በደቡብ አፍሪካ ጠቅላላ ቀዶ ጥገና ስፔሻሊስት"],
    experience: ["Attending Surgeon at Yanet Hospital (7 years)"],
    experienceAm: ["በያኔት ሆስፒታል ቀዶ ጥገና ሐኪም (7 ዓመታት)"],
    skills: ["Laparoscopic Surgery", "Trauma Surgery", "Oncological Surgery"],
    skillsAm: ["ላፓሮስኮፒክ ቀዶ ጥገና", "የአደጋ ቀዶ ጥገና", "የካንሰር ቀዶ ጥገና"],
    biography: "Dr. Solomon Tadesse is known for his precision and care in the operating room.",
    biographyAm: "ዶ/ር ሰለሞን ታደሰ በቀዶ ጥገና ክፍል ውስጥ ባላቸው ትክክለኛነት እና ጥንቃቄ ይታወቃሉ።"
  },
  {
    id: '4',
    name: "Dr. Hana Gebre",
    nameAm: "ዶ/ር ሃና ገብሬ",
    roleKey: 'doctor_team.roles.pediatrician',
    specialty: 'Pediatrics',
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop",
    desc: "Dedicated to providing the best healthcare for children.",
    descAm: "ለህፃናት የተሻለ የጤና እንክብካቤ ለመስጠት የተሰጠ",
    email: "hana.gebre@yanet.com",
    phone: "+251 911 11 22 33",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from AAU", "Pediatrics Residency, India"],
    educationAm: ["ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በህንድ ሀገር የህፃናት ህክምና ስፔሻሊስት"],
    experience: ["Pediatrician at Yanet Hospital (5 years)"],
    experienceAm: ["በያኔት ሆስፒታል የህፃናት ሐኪም (5 ዓመታት)"],
    skills: ["Childhood Immunization", "Neonatal Care", "Pediatric Emergencies"],
    skillsAm: ["የህፃናት ክትባት", "የአራስ ህፃናት እንክብካቤ", "የህፃናት ድንገተኛ አደጋዎች"],
    biography: "Dr. Hana Gebre loves working with children and their families to ensure a healthy start in life.",
    biographyAm: "ዶ/ር ሃና ገብሬ ህጻናት ጤናማ ጅምር እንዲኖራቸው ከልጆች እና ከቤተሰቦቻቸው ጋር መስራት ይወዳሉ።"
  },
  {
    id: '5',
    name: "Dr. Yoseph Kebede",
    nameAm: "ዶ/ር ዮሴፍ ከበደ",
    roleKey: 'doctor_team.roles.ophthalmologist',
    specialty: 'Ophthalmology',
    image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop",
    desc: "Expert ophthalmologist and eye surgeon specializing in vision correction.",
    descAm: "ከፍተኛ የዓይን ሐኪም እና የቀዶ ጥገና ባለሙያ",
    email: "yoseph.kebede@yanet.com",
    phone: "+251 911 44 55 66",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from Addis Ababa University", "Fellowship in Ophthalmology, UK"],
    educationAm: ["ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በእንግሊዝ ሀገር የዓይን ህክምና ስፔሻሊስት"],
    experience: ["Senior Eye Surgeon at Menelik II Hospital (8 years)"],
    experienceAm: ["በዳግማዊ ምኒልክ ሆስፒታል ከፍተኛ የዓይን ቀዶ ጥገና ሐኪም (8 ዓመታት)"],
    skills: ["Cataract Surgery", "Glaucoma Treatment", "LASIK"],
    skillsAm: ["የዓይን ሞራ ቀዶ ጥገና", "የግላኮማ ህክምና", "ላሲክ (LASIK)"],
    biography: "Dr. Yoseph Kebede is one of the leading eye specialists in Ethiopia.",
    biographyAm: "ዶ/ር ዮሴፍ ከበደ በኢትዮጵያ ውስጥ ግንባር ቀደም ከሆኑ የዓይን ሐኪሞች አንዱ ናቸው።"
  },
  {
    id: '6',
    name: "Dr. Tigist Mulugeta",
    nameAm: "ዶ/ር ትዕግስት ሙሉጌታ",
    roleKey: 'doctor_team.roles.cardiologist',
    specialty: 'Cardiology',
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=2000&auto=format&fit=crop",
    desc: "Focuses on prevention and treatment of cardiovascular diseases.",
    descAm: "በልብ በሽታዎች መከላከል እና ህክምና ላይ ያተኩራል",
    email: "tigist.m@yanet.com",
    phone: "+251 911 77 88 99",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from AAU", "Cardiology Fellowship, USA"],
    educationAm: ["ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በአሜሪካ የልብ ህክምና ስፔሻሊስት"],
    experience: ["Cardiologist at Yanet Hospital (4 years)"],
    experienceAm: ["በያኔት ሆስፒታል የልብ ሐኪም (4 ዓመታት)"],
    skills: ["Preventive Cardiology", "Heart Health", "Diagnostic Testing"],
    skillsAm: ["የመከላከያ የልብ ህክምና", "የልብ ጤና", "የምርመራ ሙከራ"],
    biography: "Dr. Tigist Mulugeta is passionate about early detection and prevention of heart diseases.",
    biographyAm: "ዶ/ር ትዕግስት ሙሉጌታ የልብ በሽታዎችን ቀደም ብሎ ስለመለየት እና ስለመከላከል ከፍተኛ ፍላጎት አላቸው።"
  },
  {
    id: '7',
    name: "Dr. Azeb Girma",
    nameAm: "ዶ/ር አዜብ ግርማ",
    roleKey: 'doctor_team.roles.obstetrician',
    specialty: 'Surgery',
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=2000&auto=format&fit=crop",
    desc: "Experienced obstetrician providing comprehensive maternal care.",
    descAm: "የማህፀንና ፅንስ ሐኪም",
    email: "azeb.girma@yanet.com",
    phone: "+251 911 00 11 22",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from AAU", "Specialization in OB/GYN"],
    educationAm: ["ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በማህፀንና ፅንስ ህክምና ስፔሻሊስት"],
    experience: ["Senior OB/GYN at Black Lion Hospital (10 years)"],
    experienceAm: ["በጥቁር አንበሳ ሆስፒታል ከፍተኛ የማህፀንና ፅንስ ሐኪም (10 ዓመታት)"],
    skills: ["Maternal Health", "Prenatal Care", "Delivery"],
    skillsAm: ["የእናቶች ጤና", "የቅድመ ወሊድ ክትትል", "ወሊድ"],
    biography: "Dr. Azeb Girma has dedicated her career to improving maternal health outcomes in Ethiopia.",
    biographyAm: "ዶ/ር አዜብ ግርማ ስራቸውን በኢትዮጵያ የእናቶችን ጤና ለማሻሻል ሰጥተዋል።"
  },
  {
    id: '8',
    name: "Dr. Elias Haile",
    nameAm: "ዶ/ር ኤልያስ ሃይሌ",
    roleKey: 'doctor_team.roles.necrologist',
    specialty: 'Neurology',
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f0871?q=80&w=2000&auto=format&fit=crop",
    desc: "Expert in sleep disorders and neurological rehabilitation.",
    descAm: "በእንቅልፍ እና በነርቭ ችግሮች ላይ ባለሙያ",
    email: "elias.haile@yanet.com",
    phone: "+251 911 33 44 55",
    location: "Addis Ababa, Ethiopia",
    education: ["MD from AAU", "Neurology Residency, Germany"],
    educationAm: ["ከአዲስ አበባ ዩኒቨርሲቲ የህክምና ዶክትሬት", "በጀርመን ሀገር የነርቭ ህክምና ስፔሻሊስት"],
    experience: ["Neurology Specialist (5 years)"],
    experienceAm: ["የነርቭ ህክምና ስፔሻሊስት (5 ዓመታት)"],
    skills: ["Sleep Medicine", "Neuro-rehabilitation"],
    skillsAm: ["የእንቅልፍ ህክምና", "የነርቭ ተሃድሶ"],
    biography: "Dr. Elias Haile helps patients overcome complex neurological challenges.",
    biographyAm: "ዶ/ር ኤልያስ ሃይሌ ታካሚዎች ውስብስብ የነርቭ ችግሮችን እንዲያሸንፉ ይረዳሉ።"
  }
];

const getDoctors = (): Doctor[] => {
  if (typeof window === 'undefined') return staticDoctors;
  const stored = localStorage.getItem('yanet_doctors');
  if (!stored) {
    localStorage.setItem('yanet_doctors', JSON.stringify(staticDoctors));
    return staticDoctors;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return staticDoctors;
  }
};

export const doctorsData: Doctor[] = new Proxy([] as Doctor[], {
  get(target, prop, receiver) {
    const doctors = getDoctors();
    const value = Reflect.get(doctors, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(doctors);
    }
    return value;
  },
  set(target, prop, value, receiver) {
    const doctors = getDoctors();
    const result = Reflect.set(doctors, prop, value, receiver);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yanet_doctors', JSON.stringify(doctors));
    }
    return result;
  },
  getOwnPropertyDescriptor(target, prop) {
    const doctors = getDoctors();
    return Reflect.getOwnPropertyDescriptor(doctors, prop);
  },
  defineProperty(target, prop, descriptor) {
    const doctors = getDoctors();
    const result = Reflect.defineProperty(doctors, prop, descriptor);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yanet_doctors', JSON.stringify(doctors));
    }
    return result;
  },
  deleteProperty(target, prop) {
    const doctors = getDoctors();
    const result = Reflect.deleteProperty(doctors, prop);
    if (typeof window !== 'undefined') {
      localStorage.setItem('yanet_doctors', JSON.stringify(doctors));
    }
    return result;
  },
  ownKeys(target) {
    const doctors = getDoctors();
    return Reflect.ownKeys(doctors);
  },
  has(target, prop) {
    const doctors = getDoctors();
    return Reflect.has(doctors, prop);
  }
});

