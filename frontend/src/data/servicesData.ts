export interface ServiceDetails {
  slug: string;
  category: 'department' | 'service';
  iconName: string;
  title: string;
  titleAm: string;
  desc: string;
  descAm: string;
  fullDesc: string;
  fullDescAm: string;
  specialty: string;
  treatments: string[];
  treatmentsAm: string[];
  equipment: string[];
  equipmentAm: string[];
}

export const servicesData: ServiceDetails[] = [
  {
    slug: 'general-medicine',
    category: 'department',
    iconName: 'Stethoscope',
    title: 'General Medicine',
    titleAm: 'ጠቅላላ ሕክምና',
    desc: 'Comprehensive primary healthcare including wellness checks, chronic disease care, and common illness treatment.',
    descAm: 'የዓመታዊ ጤና ምርመራዎችን፣ ስር የሰደዱ በሽታዎች እንክብካቤን እና የተለመዱ በሽታዎች ህክምናን ጨምሮ አጠቃላይ የመጀመሪያ ደረጃ የጤና እንክብካቤ።',
    fullDesc: 'The General Medicine Department at Yanet Primary Hospital is the first line of defense for your family’s health. We provide holistic primary care for adults and children, focusing on preventive screenings, chronic condition management (such as diabetes and hypertension), acute infectious disease care, and comprehensive physical check-ups. Our medical staff is dedicated to delivering evidence-based primary treatment with a warm, patient-centered focus.',
    fullDescAm: 'በያኔት የመጀመሪያ ደረጃ ሆስፒታል የጠቅላላ ህክምና ክፍል ለቤተሰብዎ ጤና የመጀመሪያው የድንበር ጠባቂ ነው። በበሽታ መከላከል ምርመራዎች፣ በስኳር እና የደም ግፊት በመሳሰሉ ስር የሰደዱ በሽታዎች አያያዝ፣ በድንገተኛ ተላላፊ በሽታዎች እንክብካቤ እና በተሟላ የአካል ምርመራዎች ላይ በማተኮር ለአዋቂዎችና ለህፃናት አጠቃላይ የጤና እንክብካቤ እንሰጣለን። የእኛ የህክምና ባለሙያዎች ሞቅ ያለ እና ታካሚን ማእከል ባደረገ አቀራረብ የመጀመሪያ ደረጃ ህክምና ለመስጠት ቁርጠኛ ናቸው።',
    specialty: 'General',
    treatments: [
      'Chronic Disease Management (Diabetes, Hypertension, Asthma)',
      'Annual Wellness Physicals & Health Risk Assessments',
      'Acute Infectious Illness Treatment (Malaria, Typhoid, Respiratory Infections)',
      'Preventive Healthcare Counseling & Vaccination Programs',
      'Geriatric (Elderly) Patient Care & Management',
      'Minor Wound Care & Outpatient Surgeries'
    ],
    treatmentsAm: [
      'ስር የሰደዱ በሽታዎች አያያዝ (የስኳር በሽታ፣ የደም ግፊት፣ አስም)',
      'የዓመታዊ ጤና ምርመራዎች እና የጤና አደጋ ግምገማዎች',
      'የድንገተኛ ተላላፊ በሽታዎች ህክምና (ወባ፣ ታይፎይድ፣ የሳንባ ኢንፌክሽኖች)',
      'የመከላከያ ጤና ምክር እና የክትባት ፕሮግራሞች',
      'የአረጋውያን ታካሚዎች የጤና እንክብካቤ እና አያያዝ',
      'ቀላል የቁስል ህክምና እና የተመላላሽ ታካሚ ቀዶ ጥገናዎች'
    ],
    equipment: [
      'Automated Digital Sphygmomanometers & ECG Monitors',
      'Point-of-Care Rapid Diagnostic Testing Kits',
      'High-Definition Welch Allyn Otoscopes & Ophthalmoscopes',
      'Oxygen Concentrators & Advanced Nebulizer Systems'
    ],
    equipmentAm: [
      'አውቶማቲክ ዲጂታል የደም ግፊት መለኪያ እና የECG መቆጣጠሪያዎች',
      'ፈጣን የምርመራ መፈተኛ ኪቶች (Point-of-Care)',
      'ከፍተኛ ጥራት ያላቸው የጆሮ እና የዓይን ምርመራ መሳሪያዎች',
      'የኦክስጂን ኮንሴንትሬተሮች እና የላቁ የነቡላይዘር ማሽኖች'
    ]
  },
  {
    slug: 'cardiology',
    category: 'department',
    iconName: 'HeartPulse',
    title: 'Cardiology',
    titleAm: 'የልብ ሕክምና',
    desc: 'Advanced cardiovascular care specializing in diagnostic testing, heart health, and hypertension management.',
    descAm: 'በምርመራ ምርመራዎች፣ በልብ ጤና እና በደም ግፊት አያያዝ ላይ የተሰማራ የላቀ የልብና የደም ዝውውር እንክብካቤ።',
    fullDesc: 'Our Cardiology Department features leading specialists and cutting-edge non-invasive diagnostic capabilities to address the full spectrum of cardiovascular conditions. From evaluating chest pain and arrhythmias to handling heart failure and severe chronic hypertension, we apply strict international guidelines to protect your heart. Our team designs personalized care pathways combining medical therapies, lifestyle shifts, and regular clinical monitoring.',
    fullDescAm: 'የእኛ የልብ ህክምና ክፍል ግንባር ቀደም ስፔሻሊስቶችን እና ዘመናዊ የምርመራ መሳሪያዎችን በማቀናጀት ሰፊ የልብና የደም ቧንቧ ችግሮችን ይፈታል። ከደረት ህመም እና የልብ ምት መዛባት ግምገማ ጀምሮ የልብ ድካም እና ከፍተኛ የደም ግፊትን እስከ መቆጣጠር ድረስ ልብዎን ለመጠበቅ ጥብቅ አለም አቀፍ መመሪያዎችን እንተገብራለን። ቡድናችን የህክምና ህክምናዎችን፣ የአኗኗር ዘይቤ ለውጦችን እና መደበኛ ክሊኒካዊ ክትትልን የሚያጣምሩ ግላዊ የህክምና መንገዶችን ያዘጋጃል።',
    specialty: 'Cardiology',
    treatments: [
      'Comprehensive Echocardiography (Echo) Testing',
      '12-Lead Electrocardiogram (ECG/EKG) Diagnostics',
      '24/48-Hour Holter Ambulatory Cardiac Monitoring',
      'Treadmill Cardiac Stress Testing & Evaluation',
      'Hypertension & Coronary Artery Disease Management',
      'Heart Failure & Valve Disease Specialty Care'
    ],
    treatmentsAm: [
      'የተሟላ የልብ አልትራሳውንድ (Echocardiography) ምርመራ',
      'ባለ 12-ቻናል የልብ ምት መለኪያ (ECG/EKG) ምርመራ',
      'የ24/48-ሰዓት ተንቀሳቃሽ የልብ ክትትል (Holter Monitoring)',
      'የትሬድሚል የጭንቀት የልብ ምርመራ እና ግምገማ',
      'የደም ግፊት እና የልብ የደም ቧንቧ በሽታዎች አያያዝ',
      'የልብ ድካም እና የልብ ቫልቭ በሽታዎች ልዩ እንክብካቤ'
    ],
    equipment: [
      'Philips Epiq Premium Echocardiography Machine',
      'GE MAC 2000 12-Channel ECG Systems',
      'Schiller Cardiovit Exercise Stress Testing Workstation',
      'Aero-V Ambulatory Blood Pressure & Holter Systems'
    ],
    equipmentAm: [
      'ፊሊፕስ ኤፒክ ከፍተኛ ደረጃ የልብ አልትራሳውንድ ማሽን',
      'ጂኢ ማክ ባለ 12-ቻናል የECG ስርዓቶች',
      'ሺለር ካርዲዮቪት የአካል ብቃት እንቅስቃሴ ጭንቀት መፈተኛ የስራ ጣቢያ',
      'ኤሮ-ቪ ተንቀሳቃሽ የደም ግፊት እና የሆልተር ክትትል ስርዓቶች'
    ]
  },
  {
    slug: 'pediatrics',
    category: 'department',
    iconName: 'Baby',
    title: 'Pediatrics',
    titleAm: 'የህፃናት ሕክምና',
    desc: 'Compassionate medical care for newborns, infants, children, and adolescents in a warm, child-friendly environment.',
    descAm: 'ለአራስ ሕፃናት፣ ለታዳጊዎች እና ለህፃናት ሞቅ ያለ እና ምቹ በሆነ አካባቢ ውስጥ የሚሰጥ አዛኝ የህክምና እንክብካቤ።',
    fullDesc: 'At Yanet Primary Hospital, we treat children as special patients who deserve a compassionate and stress-free healing environment. Our Pediatrics Department provides comprehensive outpatient and inpatient medical services, ranging from newborn clinical support and routine developmental assessments to handling emergency childhood infections, respiratory issues, and pediatric asthma. We work hand-in-hand with parents to ensure each child receives a healthy start in life.',
    fullDescAm: 'በያኔት የመጀመሪያ ደረጃ ሆስፒታል ህፃናትን ርህራሄ የተሞላበት እና ከጭንቀት ነጻ የሆነ የህክምና አካባቢ የሚገባቸው ልዩ ታካሚዎች አድርገን እንይዛቸዋለን። የህፃናት ህክምና ክፍላችን ከአራስ ህፃናት ክሊኒካዊ ድጋፍ እና ከመደበኛ የእድገት ክትትል ጀምሮ የህፃናት ኢንፌክሽኖችን፣ የሳምባ ችግሮችን እና አስምን እስከ መቆጣጠር ድረስ አጠቃላይ የተመላላሽ እና የውስጥ ታካሚ የህክምና አገልግሎቶችን ይሰጣል። እያንዳንዱ ህጻን ጤናማ ጅምር እንዲኖረው ከወላጆች ጋር በቅርበት እንሰራለን።',
    specialty: 'Pediatrics',
    treatments: [
      'Newborn Clinical Assessments & Neonatal Care Support',
      'Routine Growth, Development & Nutrition Check-Ups',
      'Comprehensive Childhood Immunization & Vaccine Plans',
      'Pediatric Respiratory Care & Asthma Management',
      'Childhood Infectious Disease Care (Measles, Pneumonia, Diarrhea)',
      'Pediatric Emergency Care & Short-Stay Observation'
    ],
    treatmentsAm: [
      'የአራስ ህፃናት ክሊኒካዊ ግምገማዎች እና እንክብካቤ ድጋፍ',
      'መደበኛ የእድገት፣ የልማት እና የአመጋገብ ክትትል ምርመራዎች',
      'የተሟላ የህፃናት መደበኛ ክትባት እና የክትባት እቅዶች',
      'የህፃናት የመተንፈሻ አካላት እንክብካቤ እና የአስም አያያዝ',
      'የህፃናት ተላላፊ በሽታዎች ህክምና (ኩፍኝ፣ የሳንባ ምች፣ ተቅማጥ)',
      'የህፃናት ድንገተኛ አደጋ ህክምና እና የአጭር ጊዜ ክትትል'
    ],
    equipment: [
      'Advanced Temperature-Controlled Infant Incubators',
      'Neonatal Phototherapy Units for Hyperbilirubinemia',
      'Pediatric Micro-Volume Infusion Pumps & Warmers',
      'Child-Friendly Pulse Oximeters & Nebulization Stations'
    ],
    equipmentAm: [
      'የላቁ የሙቀት መጠን ቁጥጥር ያላቸው የህፃናት ማቀፊያዎች (Incubators)',
      'ለጃንዲስ ህክምና የሚሆኑ የአራስ ህፃናት ፎቶቴራፒ ማሽኖች',
      'የህፃናት ማይክሮ-ቮልዩም ኢንፊዩዥን ፓምፖች እና ማሞቂያዎች',
      'ለህፃናት ምቹ የሆኑ የልብ ምት መለኪያዎች እና የነቡላይዘር ጣቢያዎች'
    ]
  },
  {
    slug: 'surgery',
    category: 'department',
    iconName: 'Stethoscope',
    title: 'General Surgery',
    titleAm: 'ጠቅላላ ቀዶ ጥገና',
    desc: 'Expert general surgical procedures utilizing minimally invasive techniques and rapid recovery models.',
    descAm: 'በትንሹ ወራሪ ቴክኒኮችን እና ፈጣን ማገገሚያ ሞዴሎችን በመጠቀም የሚሰጡ የባለሙያ ጠቅላላ ቀዶ ጥገና ሂደቶች።',
    fullDesc: 'Our General Surgery Department combines advanced surgical skill with highly controlled sterile environments. We perform a wide range of emergency and elective general surgeries including abdominal surgeries (appendectomy, hernia repairs, gallbladder removals), trauma interventions, and excision of cysts/tumors. With a heavy focus on minimally invasive laparoscopic surgery, we minimize tissue trauma, reduce pain, and facilitate accelerated discharge times so you can return to normal life faster.',
    fullDescAm: 'የእኛ ጠቅላላ ቀዶ ጥገና ክፍል የላቀ የቀዶ ጥገና ክህሎትን እና በጥብቅ ቁጥጥር ስር ያሉ ንጹህ አካባቢዎችን ያጣምራል። የሆድ ቀዶ ጥገናዎችን (የትርፍ አንጀት፣ የእምብርት እብጠት፣ የሐሞት ከረጢት ማስወገድ)፣ የአደጋ ጊዜ ጣልቃገብነቶችን እና የዕጢዎችን ማስወገድን ጨምሮ ሰፊ ድንገተኛ እና የታቀዱ ጠቅላላ ቀዶ ጥገናዎችን እናከናውናለን። ትኩረታችን በላፓሮስኮፒክ (በትንሹ ወራሪ) ቀዶ ጥገና ላይ በመሆኑ፣ የቁስል ህመምን እንቀንሳለን፣ ማገገምን እናፋጥናለን እንዲሁም በፍጥነት ወደ መደበኛ ህይወትዎ እንዲመለሱ እናደርጋለን።',
    specialty: 'Surgery',
    treatments: [
      'Laparoscopic Cholecystectomy (Gallbladder Removal)',
      'Hernia Repairs (Inguinal, Umbilical, Incisional)',
      'Appendectomy (Open and Laparoscopic Techniques)',
      'Trauma Surgery & Acute Abdomen Emergencies',
      'Excision of Lipomas, Cysts, and Subcutaneous Tumors',
      'Comprehensive Pre-Surgical Consultations & Post-Op Rehab'
    ],
    treatmentsAm: [
      'ላፓሮስኮፒክ ኮሌሲስቴክቶሚ (የሐሞት ከረጢት ማስወገድ ቀዶ ጥገና)',
      'የእምብርት እና የእንግሊና የሄርኒያ (እብጠት) ቀዶ ጥገና ህክምና',
      'የትርፍ አንጀት ቀዶ ጥገና (በቀላል እና በላፓሮስኮፒክ ቴክኒኮች)',
      'የአደጋ ቀዶ ጥገና እና የድንገተኛ የሆድ ህመም ቀዶ ጥገናዎች',
      'ዕጢዎች፣ ኪስቶች እና የቆዳ ስር እብጠቶችን በቀዶ ጥገና ማስወገድ',
      'የተሟላ ከቀዶ ጥገና በፊት ምክክር እና ከቀዶ ጥገና በኋላ ክትትል'
    ],
    equipment: [
      'Storz High-Definition Laparoscopic Surgery Tower',
      'Mindray Wato EX-35 Advanced Anesthesia Workstations',
      'Sterile Operating Theaters with HEPA Air Flow Systems',
      'ValleyLab Electrosurgical Diathermy Units'
    ],
    equipmentAm: [
      'ስቶርዝ ከፍተኛ ጥራት ያለው የላፓሮስኮፒክ ቀዶ ጥገና ማሽን',
      'ሚንድሬይ ዋቶ የላቀ ማደንዘዣ የስራ ጣቢያዎች',
      'የሄፓ አየር ማጣሪያ ስርዓት ያላቸው ንጹህ የቀዶ ጥገና ክፍሎች',
      'ቫሊላብ የኤሌክትሮ ቀዶ ጥገና ዳያተርሚ መሳሪያዎች'
    ]
  },
  {
    slug: 'imaging-diagnostics',
    category: 'department',
    iconName: 'Activity',
    title: 'Imaging & Diagnostics',
    titleAm: 'የምስል ምርመራ',
    desc: 'High-definition digital X-rays and multi-dimensional ultrasound systems for accurate clinical evaluations.',
    descAm: 'ለትክክለኛ ክሊኒካዊ ግምገማዎች የሚረዱ ከፍተኛ ጥራት ያላቸው ዲጂታል ኤክስሬይ እና ባለብዙ-ልኬት አልትራሳውንድ ስርዓቶች።',
    fullDesc: 'Accurate treatment begins with precise diagnostics. The Imaging Department at Yanet Primary Hospital is staffed by dedicated radiologists and imaging technicians using state-of-the-art diagnostic machinery. We provide low-dose digital X-rays and high-resolution multi-dimensional ultrasound scans covering abdominal, cardiac, obstetric, and vascular assessments. We deliver rapid, reliable scan results to guide clinical interventions without delay.',
    fullDescAm: 'ትክክለኛ ህክምና የሚጀምረው በትክክለኛ ምርመራ ነው። በያኔት የመጀመሪያ ደረጃ ሆስፒታል የምስል ህክምና ክፍል በራዲዮሎጂስቶች እና በምስል ቴክኒሻኖች የተመራ ሲሆን ዘመናዊ የምርመራ ማሽኖችን ይጠቀማል። ዝቅተኛ የጨረር መጠን ያላቸውን ዲጂታል ኤክስሬይ እና ከፍተኛ ጥራት ያላቸውን አልትራሳውንድ ምርመራዎች (የሆድ፣ የልብ፣ የእርግዝና እና የደም ቧንቧ ግምገማዎች) እንሰጣለን። ክሊኒካዊ ጣልቃገብነቶችን ያለ ምንም መዘግየት ለመምራት ፈጣን እና አስተማማኝ የምርመራ ውጤቶችን እናቀርባለን።',
    specialty: 'Diagnostics',
    treatments: [
      'Digital X-Ray Radiography (Chest, Bones, Spine)',
      'High-Resolution Abdominal & Pelvic Ultrasounds',
      'Obstetric 3D/4D Ultrasound Screening & Fetal Tracking',
      'Thyroid, Breast, & Soft-Tissue Diagnostic Scans',
      'Echocardiography (Cardiac Ultrasound) Scans',
      'Contrast-Enhanced Diagnostic Examinations'
    ],
    treatmentsAm: [
      'ዲጂታል ኤክስሬይ (የደረት፣ የአጥንት፣ የጀርባ አጥንት)',
      'ከፍተኛ ጥራት ያለው የሆድ እና የዳሌ አልትራሳውንድ ምርመራዎች',
      'የፅንስ 3ዲ/4ዲ አልትራሳውንድ ምርመራ እና የፅንስ ክትትል',
      'የታይሮይድ፣ የጡት እና የለስላሳ ቲሹ የምርመራ ስካኖች',
      'ኢኮካርዲዮግራፊ (የልብ አልትራሳውንድ ምርመራ)',
      'የንፅፅር ምስል የምርመራ ምርመራዎች (Contrast Scans)'
    ],
    equipment: [
      'Siemens Multix Impact Digital Radiography (X-Ray) System',
      'GE Voluson E8 Expert 4D OB/GYN Ultrasound Machine',
      'Mindray DC-70 Diagnostic Ultrasound Workstations',
      'Low-Dose Imaging Protocols & Automated PACS Systems'
    ],
    equipmentAm: [
      'ሲመንስ መልቲከስ ዲጂታል ኤክስሬይ (X-Ray) ሲስተም',
      'ጂኢ ቮሉሰን እጅግ ዘመናዊ ባለ 4ዲ የእርግዝና አልትራሳውንድ ማሽን',
      'ሚንድሬይ ዲሲ-70 የምርመራ አልትራሳውንድ የስራ ጣቢያዎች',
      'ዝቅተኛ የጨረር መጠን ምስል ፕሮቶኮሎች እና አውቶማቲክ የPACS ማከማቻ'
    ]
  },
  {
    slug: 'neurology',
    category: 'department',
    iconName: 'Brain',
    title: 'Neurology',
    titleAm: 'የነርቭ ሕክምና',
    desc: 'Specialized diagnostic and clinical care for neurological disorders, epilepsy, stroke, and nerve conditions.',
    descAm: 'ለነርቭ መታወክ፣ ለሚጥል በሽታ፣ ለስትሮክ እና ለነርቭ ችግሮች የሚሰጥ ልዩ የምርመራ እና ክሊኒካዊ እንክብካቤ።',
    fullDesc: 'Our Neurology Department delivers top-tier clinical diagnostics and disease management for disorders of the nervous system. Our highly trained clinical experts treat complex conditions such as epilepsy, strokes, peripheral neuropathies, neuropathic pain, migraine disorders, and degenerative diseases. We focus on establishing precise diagnoses via advanced neuro-imaging, nerve conduction studies, and EEG testing to create highly personalized rehabilitation and medication protocols.',
    fullDescAm: 'የእኛ የነርቭ ህክምና ክፍል ለነርቭ ሥርዓት መታወክ ከፍተኛ ደረጃ ክሊኒካዊ ምርመራዎችን እና የበሽታ አያያዝን ያቀርባል። የሰለጠኑ ክሊኒካዊ ባለሙያዎቻችን እንደ የሚጥል በሽታ፣ ስትሮክ፣ የነርቭ ህመም፣ ማይግሬን እና የነርቭ መበስበስ በሽታዎችን የመሳሰሉ ውስብስብ ሁኔታዎችን ያክማሉ። ከፍተኛ ግላዊ የሆኑ የተሃድሶ እና የመድኃኒት ፕሮቶኮሎችን ለመንደፍ በላቁ የነርቭ ምስሎች (Imaging) እና በEEG ምርመራዎች አማካኝነት ትክክለኛ ምርመራዎችን በማቋቋም ላይ እናተኩራለን።',
    specialty: 'Neurology',
    treatments: [
      'Comprehensive Stroke Care & Post-Stroke Rehabilitation',
      'Epilepsy & Seizure Disorder Diagnosis & Medical Therapy',
      'Chronic Migraine & Cluster Headache Specialty Care',
      'Peripheral Neuropathy & Diabetic Nerve Pain Management',
      'Neuromuscular Disorder Clinical Evaluation',
      'Sleep Apnea & Sleep Disorder Consultations'
    ],
    treatmentsAm: [
      'የተሟላ የስትሮክ ህክምና እና ከስትሮክ በኋላ የተሃድሶ ህክምና',
      'የሚጥል በሽታ ምርመራ እና የረጅም ጊዜ ህክምና',
      'ስር የሰደደ የሚግሬን እና የራስ ምታት በሽታ ልዩ እንክብካቤ',
      'የነርቭ መጎዳት (Neuropathy) እና የስኳር ህመም የነርቭ ህመም አያያዝ',
      'የነርቭ ጡንቻዎች (Neuromuscular) መታወክ ክሊኒካዊ ግምገማ',
      'የእንቅልፍ እጥረት እና የእንቅልፍ መታወክ ምክክሮች'
    ],
    equipment: [
      'Nihon Kohden Digital Electroencephalography (EEG) System',
      'Cadwell Sierra Summit Nerve Conduction Velocity (NCV) Unit',
      'Advanced Electromyography (EMG) Assessment Systems'
    ],
    equipmentAm: [
      'ኒሆን ኮህደን ዲጂታል የEEG (የአንጎል ነርቭ ሞገድ መለኪያ) ስርዓት',
      'ካድዌል ሲየራ የነርቭ አስተላላፊ ፍጥነት (NCV) መለኪያ',
      'የላቀ የኤሌክትሮሚዮግራፊ (EMG) ግምገማ ስርዓቶች'
    ]
  },
  {
    slug: 'ophthalmology',
    category: 'department',
    iconName: 'Eye',
    title: 'Ophthalmology',
    titleAm: 'የዓይን ሕክምና',
    desc: 'Expert clinical eye care, vision correction, glaucoma management, and advanced microsurgery.',
    descAm: 'የባለሙያ ክሊኒካዊ የዓይን እንክብካቤ፣ የእይታ ማስተካከያ፣ የግላኮማ ህክምና እና የላቀ ረቂቅ ቀዶ ጥገና።',
    fullDesc: 'Your vision is our focus. The Ophthalmology Department at Yanet Primary Hospital combines clinical eye assessments with advanced surgical capabilities. We evaluate and treat vision defects, glaucoma, diabetic retinopathy, and ocular infections. Our surgeon performs high-precision cataract surgeries and microscopic repairs in dedicated operating suites, ensuring optimal outcomes and a rapid return to visual clarity.',
    fullDescAm: 'እይታዎ የእኛ ትኩረት ነው። በያኔት የመጀመሪያ ደረጃ ሆስፒታል የዓይን ህክምና ክፍል ክሊኒካዊ የዓይን ግምገማዎችን ከላቁ የቀዶ ጥገና ችሎታዎች ጋር ያጣምራል። የእይታ ጉድለቶችን፣ ግላኮማን፣ የስኳር ህመም የዓይን በሽታዎችን እና የዓይን ኢንፌክሽኖችን እንገመግማለን እንዲሁም እናክማለን። የእኛ የቀዶ ጥገና ሐኪም በተለዩ የቀዶ ጥገና ክፍሎች ውስጥ ከፍተኛ ትክክለኛነት ያለው የዓይን ሞራ ቀዶ ጥገናዎችን እና ጥቃቅን ጥገናዎችን ያከናውናል፣ ይህም የተሻለ ውጤት እና ፈጣን የእይታ ግልጽነትን ያረጋግጣል።',
    specialty: 'Ophthalmology',
    treatments: [
      'Advanced Cataract Surgery (Phacoemulsification)',
      'Glaucoma Screening, Medical Therapy, & Laser Management',
      'Comprehensive Refractive Error Assessment & Vision Correction',
      'Diabetic Retinopathy Screening & Retinal Health Tracking',
      'Pediatric Vision Screenings & Strabismus (Squint) Care',
      'Ocular Infection, Allergy, & Dry Eye Specialist Treatment'
    ],
    treatmentsAm: [
      'የላቀ የዓይን ሞራ ቀዶ ጥገና (Phacoemulsification)',
      'የግላኮማ ምርመራ፣ የህክምና ህክምና እና የሌዘር ቁጥጥር',
      'የተሟላ የእይታ ጉድለት ግምገማ እና የዓይን መነጽር ማዘዝ',
      'የስኳር ህመም የዓይን ህዋሳት ምርመራ እና የክትትል ህክምና',
      'የህፃናት እይታ ምርመራዎች እና የዓይን መሸሽ (Strabismus) ህክምና',
      'የዓይን ኢንፌክሽን፣ አለርጂ እና ደረቅ ዓይን ልዩ ህክምና'
    ],
    equipment: [
      'Zeiss Lumera Premium Ophthalmic Surgical Microscope',
      'Topcon SL-2G High-Performance Slit Lamp Systems',
      'Nidek Autorefractor/Keratometer for Precise Vision Refraction',
      'Applanation Goldmann Tonometers for Eye Pressure Measurement'
    ],
    equipmentAm: [
      'ዛይስ ሉሜራ ከፍተኛ ደረጃ የዓይን ቀዶ ጥገና ማይክሮስኮፕ',
      'ቶፕኮን ከፍተኛ አፈጻጸም ያላቸው የስሊት ላምፕ (የዓይን ምርመራ) ስርዓቶች',
      'ኒዴክ አውቶሪፍራክተር/ኬራቶሜትር ለትክክለኛ እይታ መለኪያ',
      'የዓይን ውስጥ ግፊት መለኪያ መሳሪያዎች (Goldmann Tonometers)'
    ]
  },
  {
    slug: 'laboratory',
    category: 'service',
    iconName: 'FlaskConical',
    title: 'Digital Laboratory',
    titleAm: 'ዲጂታል ላቦራቶሪ',
    desc: 'Fully automated biochemistry, pathology, and microbiology diagnostics with rapid, precise digital reporting.',
    descAm: 'ፈጣን እና ትክክለኛ ዲጂታል ሪፖርት ያላቸው ሙሉ በሙሉ አውቶማቲክ ባዮኬሚስትሪ፣ ፓቶሎጂ እና ማይክሮባዮሎጂ ምርመራዎች።',
    fullDesc: 'Clinical decisions are driven by laboratory test results. The 24/7 Digital Laboratory at Yanet Primary Hospital operates under strict quality control standards. We utilize highly automated chemistry and hematology analyzers to examine blood chemistry, hematological profiles, thyroid/hormonal configurations, urine composition, and microbial cultures. Our barcoded specimen systems and computerized workflows eliminate diagnostic errors, securing fast, precise, and digital results.',
    fullDescAm: 'ክሊኒካዊ ውሳኔዎች በቤተ ሙከራ ምርመራ ውጤቶች ላይ ይመረኮዛሉ። በያኔት የመጀመሪያ ደረጃ ሆስፒታል የ24 ሰዓት ዲጂታል ላቦራቶሪ በጥብቅ የጥራት ቁጥጥር ደረጃዎች ስር ይሰራል። የደም ኬሚስትሪን፣ የደም ህዋሳትን፣ የታይሮይድ እና የሆርሞን ሁኔታዎችን፣ የሽንት ስብጥርን እና የባክቴሪያ ባህሎችን ለመመርመር ሙሉ በሙሉ አውቶማቲክ ኬሚስትሪ እና ሄማቶሎጂ ማሽኖችን እንጠቀማለን። የእኛ የባርኮድ ናሙና ስርዓቶች እና በኮምፒዩተር የተደገፉ አሰራሮች የምርመራ ስህተቶችን ያስወግዳሉ፣ ፈጣን እና ትክክለኛ ዲጂታል ውጤቶችን ያረጋግጣሉ።',
    specialty: 'Diagnostics',
    treatments: [
      'Comprehensive Hematology Studies (Complete Blood Count - CBC)',
      'Clinical Biochemistry Panel (Kidney, Liver, & Lipid Profiles)',
      'Hormonal Configurations (Thyroid Profiles, Pregnancy Hormones)',
      'Microbiological Culture, Sensitivity, & Identification Studies',
      'Serology & Immunology Diagnostics (Hepatitis, HIV, Widal Tests)',
      'Urinalysis, Renal Function, & Stool Parasitology Screens'
    ],
    treatmentsAm: [
      'የተሟላ የደም ምርመራዎች (Complete Blood Count - CBC)',
      'ክሊኒካዊ ባዮኬሚስትሪ (የኩላሊት፣ የጉበት እና የስብ መጠን ምርመራዎች)',
      'የሆርሞን ምርመራዎች (የታይሮይድ እጢ፣ የእርግዝና ሆርሞኖች)',
      'የማይክሮባዮሎጂ የባክቴሪያ ባህል እና የመድኃኒት ተስማሚነት ምርመራዎች',
      'ሴሮሎጂ እና ኢሚውኖሎጂ ምርመራዎች (የጃንዲስ፣ ኤችአይቪ፣ ዊዳል ምርመራዎች)',
      'የሽንት፣ የኩላሊት ስራ እና የሰገራ ጥገኛ ተህዋስያን ምርመራዎች'
    ],
    equipment: [
      'Mindray BS-240 Fully Automated Chemistry Analyzer',
      'Sysmex Automated 5-Part Differential Hematology Analyzer',
      'Roche Cobas Automated Immunoassay Configuration Systems',
      'Digital Centrifuges, Incubators, & Specimen Barcoding Workflows'
    ],
    equipmentAm: [
      'ሚንድሬይ ሙሉ በሙሉ አውቶማቲክ ኬሚስትሪ አናላይዘር',
      'ሲስሜክስ አውቶማቲክ ባለ 5-ክፍል የደም ህዋሳት ቆጣሪ',
      'ሮሽ ኮባስ አውቶማቲክ የሆርሞን እና የኢሚውኖሎጂ ምርመራ ማሽኖች',
      'ዲጂታል ሴንትሪፊውጅ፣ ኢንኩቤተሮች እና በባርኮድ የተደገፉ የስራ ፍሰቶች'
    ]
  },
  {
    slug: 'pharmacy',
    category: 'service',
    iconName: 'Pill',
    title: '24/7 In-House Pharmacy',
    titleAm: 'የ24 ሰዓት ፋርማሲ',
    desc: 'Fully stocked hospital pharmacy providing quality-certified medications and expert counseling around the clock.',
    descAm: 'ጥራት ያላቸው የተረጋገጡ መድሃኒቶችን እና የባለሙያ ምክሮችን በቀን 24 ሰዓት ሙሉ በሙሉ የሚያቀርብ የሆስፒታሉ ፋርማሲ።',
    fullDesc: 'Our 24/7 In-House Pharmacy ensures that essential, high-quality medications are always within arm’s reach. Operating strictly under regulatory guidelines, we procure only certified pharmaceuticals from verified distributors. Our pharmacists deliver expert medication counseling, ensuring you understand dosages, side effects, and drug interactions. We also run a dedicated cold-chain storage unit to maintain the absolute potency of vaccines and sensitive injectables.',
    fullDescAm: 'የእኛ የ24 ሰዓት ፋርማሲ አስፈላጊ እና ከፍተኛ ጥራት ያላቸው መድሃኒቶች ሁልጊዜም በአቅራቢያዎ መኖራቸውን ያረጋግጣል። በጥብቅ ቁጥጥር ስር በመስራት እውቅና ካላቸው አከፋፋዮች የተረጋገጡ መድሃኒቶችን ብቻ እናቀርባለን። ፋርማሲስቶቻችን ስለ መድሃኒት አጠቃቀም፣ ሊኖሩ ስለሚችሉ የጎንዮሽ ጉዳቶች እና የመድሃኒት መስተጋብሮች የባለሙያ ምክክር ይሰጣሉ። እንዲሁም የክትባቶችን እና ስሜታዊ የሆኑ መድሃኒቶችን ሙሉ ጥራት ለመጠበቅ ልዩ የቀዝቃዛ ማከማቻ (Cold-Chain) ክፍል እናስኬዳለን።',
    specialty: 'General',
    treatments: [
      'Fast, Computerized Prescription Medication Dispensing',
      'Expert Medication Counseling & Dosage Explanations',
      'Management of Chronic Disease Medication Refills',
      'Safe Storage & Dispensing of Cold-Chain Vaccines & Insulins',
      'Over-the-Counter Healthcare Products & Essential Supplies',
      'Direct Drug Interaction Screenings & Patient Safety Checks'
    ],
    treatmentsAm: [
      'ፈጣን እና በኮምፒዩተር የተደገፈ የመድኃኒት እደላ',
      'የመድኃኒት አጠቃቀም እና የመጠን መጠን የባለሙያ ምክክር',
      'ለስር የሰደዱ በሽታዎች መደበኛ የመድኃኒት አቅርቦት አያያዝ',
      'ቀዝቃዛ ማከማቻ የሚፈልጉ ክትባቶችን እና ኢንሱሊንን በደህና መያዝ',
      'ያለ ማዘዣ የሚሸጡ የጤና ምርቶች እና አስፈላጊ የህክምና ቁሶች',
      'ቀጥተኛ የመድሃኒት መስተጋብር ፍተሻ እና የታካሚ ደህንነት ምርመራዎች'
    ],
    equipment: [
      'WHO-Compliant Advanced Vaccine Refrigerator & Cold Chain Monitor',
      'Automated Computerized Pharmacy Inventory & Refill Alert System',
      'Clean room compounding and dispensing counters'
    ],
    equipmentAm: [
      'በአለም ጤና ድርጅት ደረጃ የተረጋገጠ የክትባት ማቀዝቀዣ እና የቀዝቃዛ ሰንሰለት መቆጣጠሪያ',
      'አውቶማቲክ የመድኃኒት ክምችት እና መደበኛ አቅርቦት ማንቂያ ስርዓት',
      'ንጹህ የመድኃኒት ማደያ እና ማሸጊያ ካቢኔቶች'
    ]
  },
  {
    slug: 'preventive-healthcare',
    category: 'service',
    iconName: 'ShieldCheck',
    title: 'Preventive Healthcare',
    titleAm: 'የመከላከያ ጤና ፕሮግራሞች',
    desc: 'Structured wellness programs, metabolic screenings, cardiovascular checks, and lifestyle counseling.',
    descAm: 'የተዋቀሩ የጤና ፕሮግራሞች፣ ሜታቦሊክ ምርመራዎች፣ የልብ ምርመራዎች እና የአኗኗር ዘይቤ ምክሮች።',
    fullDesc: 'Prevention is better than cure. At Yanet Primary Hospital, we design targeted Preventive Healthcare Programs to detect potential health conditions before they advance. We offer metabolic panels, cardiovascular assessments, diabetes risk screenings, and elder-care checkups. Our practitioners analyze biological markers and supply practical lifestyle, dietary, and fitness counseling to protect your longevity and secure a healthier, active future.',
    fullDescAm: 'መከላከል ከህክምና ይሻላል። በያኔት የመጀመሪያ ደረጃ ሆስፒታል ሊከሰቱ የሚችሉ የጤና እክሎችን አስቀድሞ ለመለየት የታለሙ የመከላከያ የጤና ፕሮግራሞችን እንነድፋለን። ሜታቦሊክ ምርመራዎችን፣ የልብና የደም ቧንቧ ምርመራዎችን፣ የስኳር በሽታ ስጋት ምርመራዎችን እና የአረጋውያን ጤና ክትትልን እናቀርባለን። የህክምና ባለሙያዎቻችን ባዮሎጂያዊ ምልክቶችን በመተንተን ተግባራዊ የአኗኗር ዘይቤ፣ የአመጋገብ እና የአካል ብቃት ምክሮችን በመስጠት ጤናማ እና ንቁ የወደፊት ህይወትን ያረጋግጣሉ።',
    specialty: 'General',
    treatments: [
      'Comprehensive Annual Executive Health Checkups',
      'Cardiovascular Disease Risk Evaluation & Lipids Panels',
      'Diabetes Mellitus Early Screening & Glycated Hemoglobin (HbA1c) Tests',
      'Corporate Employee Wellness Screenings & Health Audits',
      'Personalized Nutritional Assessment & Dietician Counseling',
      'Geriatric Wellness Evaluations & Preventive Action Plans'
    ],
    treatmentsAm: [
      'የተሟላ ዓመታዊ የስራ አስፈፃሚዎች የጤና ምርመራዎች',
      'የልብና የደም ዝውውር በሽታዎች አደጋ ግምገማ እና የስብ መጠን ምርመራ',
      'የስኳር በሽታ ቀድሞ መለየት እና የ HbA1c ምርመራዎች',
      'የድርጅት ሰራተኞች የጤና ምርመራዎች እና ኦዲቶች',
      'ግላዊ የሆኑ የአመጋገብ ግምገማዎች እና የባለሙያ ምክሮች',
      'የአረጋውያን ጤና ግምገማዎች እና የመከላከያ የጤና እቅዶች'
    ],
    equipment: [
      'Multi-Frequency Segmental Body Composition Analyzers',
      'Point-of-Care Handheld Diagnostic Glucometers & Analyzers',
      'Interactive Health Evaluation Software & Digital Counseling Suites'
    ],
    equipmentAm: [
      'ባለብዙ-ድግግሞሽ የሰውነት ስብጥር አናላይዘር',
      'ተንቀሳቃሽ ፈጣን የስኳር እና የስብ መጠን መፈተኛ መሳሪያዎች',
      'በይነተገናኝ የጤና ግምገማ ሶፍትዌር እና የዲጂታል ምክር ቤቶች'
    ]
  },
  {
    slug: 'ambulance-services',
    category: 'service',
    iconName: 'Activity',
    title: 'Ambulance Services',
    titleAm: 'የአምቡላንስ አገልግሎት',
    desc: '24/7 Advanced Life Support emergency ambulance transport and trauma response team.',
    descAm: 'የ24 ሰዓት የላቀ የህይወት ድጋፍ (ALS) ድንገተኛ አምቡላንስ መጓጓዣ እና የአደጋ ምላሽ ሰጪ ቡድን።',
    fullDesc: 'When seconds count, Yanet Primary Hospital stands ready. Our 24/7 Emergency Ambulance Services deliver professional Advanced Life Support (ALS) transport directly to your doorstep. Equipped with modern cardiac monitors, portable ventilators, oxygen delivery systems, and emergency medicines, our ambulances act as mobile intensive care units. Staffed by certified emergency paramedics and nurses, we secure clinical stability and safety during transit.',
    fullDescAm: 'እያንዳንዱ ሰከንድ ዋጋ በሚኖረው ጊዜ ያኔት የመጀመሪያ ደረጃ ሆስፒታል ሁል ጊዜ ዝግጁ ነው። የእኛ የ24 ሰዓት ድንገተኛ አምቡላንስ አገልግሎት የባለሙያ የላቀ የህይወት ድጋፍ (ALS) መጓጓዣን ወደ ደጃፍዎ ያቀርባል። በዘመናዊ የልብ መቆጣጠሪያዎች፣ በተንቀሳቃሽ የሳንባ መተንፈሻዎች፣ በኦክስጂን ሲሊንደሮች እና በድንገተኛ መድሃኒቶች የተገጠሙ አምቡላንሶቻችን እንደ ተንቀሳቃሽ ከፍተኛ እንክብካቤ ክፍሎች ያገለግላሉ። የተመሰከረላቸው የድንገተኛ አደጋ ረዳቶች (Paramedics) እና ነርሶች ያሉበት በመሆኑ በጉዞው ወቅት ታካሚውን ያረጋጋሉ።',
    specialty: 'General',
    treatments: [
      '24/7 Advanced Life Support Emergency Patient Transit',
      'Immediate Trauma, Accident, & Cardiac Arrest Response',
      'Pre-Hospital Stabilizing Emergency Medical Interventions',
      'Rapid Inter-Hospital Referral Transport & Coordination',
      'Emergency Oxygen Administration & On-Board Nebulization',
      'Certified Paramedic and Emergency Nurse Medical Escort'
    ],
    treatmentsAm: [
      'የ24 ሰዓት የላቀ የህይወት ድጋፍ (ALS) የድንገተኛ ታካሚዎች ትራንዚት',
      'ፈጣን የአደጋ፣ የጉዳት እና የልብ ድካም ምላሽ መስጠት',
      'ከሆስፒታል በፊት ታካሚን የማረጋጋት ድንገተኛ የህክምና ጣልቃገብነቶች',
      'ፈጣን ከሆስፒታል ወደ ሆስፒታል ሪፈራል መጓጓዣ እና ማስተባበር',
      'ድንገተኛ የኦክስጂን አቅርቦት እና በአምቡላንስ ውስጥ የሚሰጡ ህክምናዎች',
      'የተመሰከረላቸው የፓራሜዲክ እና የድንገተኛ አደጋ ነርሶች የህክምና አጃቢ'
    ],
    equipment: [
      'Cardiac Monitor Defibrillator (Zoll Series)',
      'Portable Emergency Transport Ventilators & Resuscitators',
      'WHO-Grade Advanced Splints, Traction, & Immobilization Spine Boards',
      'Centralized Emergency Ambulance Communication & GPS Radio Link'
    ],
    equipmentAm: [
      'የልብ ሞኒተር እና ዲፊብሪሌተር ማሽን (Zoll Series)',
      'ተንቀሳቃሽ የድንገተኛ አደጋ መተንፈሻ ማሽኖች እና መተንፈሻዎች',
      'የላቀ የጀርባ አጥንት መደገፊያ ሰሌዳዎች እና አንገት መያዣዎች',
      'ማዕከላዊ የድንገተኛ አምቡላንስ መገናኛ እና የጂፒኤስ ሬዲዮ ግንኙነት'
    ]
  }
];
