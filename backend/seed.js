const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = require('./prismaClient');

async function main() {
  console.log('Seeding database...');

  // 1. Seed Admin User
  const adminEmail = 'admin@yanethospital.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      }
    });
    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Seed All Pages Contents
  const pagesData = [
    {
      id: 'home',
      content: {
        hero_title: "Advanced Healthcare Made Personal",
        hero_subtitle: "Providing world-class medical care with compassion and excellence.",
        hero_bg_image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        hero_cta_text: "Book Appointment",
        hero_cta_link: "/appointment",
        qa_emergency_title: "Emergency Cases",
        qa_emergency_desc: "We are available 24/7 for emergency medical services.",
        qa_emergency_phone: "8181",
        qa_hours_title: "Opening Hours",
        qa_hours_desc: "Open 24 hours every day, including holidays.",
        qa_booking_title: "Book Appointment",
        qa_booking_desc: "Easily schedule your visit online.",
        about_preview_title: "About Yanet Hospital",
        about_preview_desc: "Yanet Primary Hospital is a state-of-the-art facility offering comprehensive healthcare services with exceptional customer care, specialized medical units, and diagnostic imaging.",
        about_preview_image: "https://images.unsplash.com/photo-1538108149393-cebb60368140",
        stat_1_value: "50+",
        stat_1_label: "Specialist Doctors",
        stat_2_value: "10k+",
        stat_2_label: "Happy Patients",
        srv_preview_title: "Our Medical Services",
        srv_preview_desc: "Comprehensive healthcare solutions for your family.",
        srv_max_items: "6",
        testi_title: "Patient Stories",
        testi_subtitle: "What our patients say about us",
        testi_data: "[\n  {\n    \"name\": \"Sarah J.\",\n    \"role\": \"Mother & Business Owner\",\n    \"text\": \"The best hospital experience! The staff was incredibly caring.\",\n    \"stars\": 5\n  },\n  {\n    \"name\": \"Dr. Thomas B.\",\n    \"role\": \"Health Researcher\",\n    \"text\": \"Very professional staff, clean environment and excellent customer care.\",\n    \"stars\": 5\n  }\n]",
        doc_preview_title: "Meet Our Specialists",
        doc_max_items: "4",
        news_preview_title: "Latest Health News",
        news_max_items: "3",
        meta_title: "Yanet Primary Hospital - Home",
        meta_desc: "Welcome to Yanet Primary Hospital. We provide world-class medical care."
      }
    },
    {
      id: 'about',
      content: {
        about_hero_title: "About Yanet Hospital",
        about_hero_image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        overview_title: "Who We Are",
        overview_content: "Yanet Primary Hospital was established with the vision of providing accessible, high-quality, and modern medical care in Ethiopia.",
        overview_image: "https://images.unsplash.com/photo-1538108149393-cebb60368140",
        mission_statement: "To provide accessible, compassionate, and high-quality healthcare using modern medical practices and diagnostics.",
        vision_statement: "To be the leading and most trusted healthcare provider in Ethiopia by driving clinical excellence and patient happiness.",
        values_title: "Our Core Values",
        value_1_title: "Compassion",
        value_1_desc: "We treat every patient with empathy, respect, and maximum personal care.",
        value_2_title: "Excellence",
        value_2_desc: "We strive for the highest standards in clinical treatments and medical diagnostics.",
        value_3_title: "Integrity",
        value_3_desc: "We maintain transparency, strict medical ethics, and honest practices.",
        timeline_title: "Our History",
        timeline_json: "[\n  {\n    \"year\": \"2020\",\n    \"event\": \"Yanet Primary Hospital Founded in Addis Ababa\"\n  }\n]",
        leadership_title: "Our Management Team",
        leadership_desc: "Guided by highly experienced medical experts and healthcare directors.",
        meta_title: "About Us | Yanet Primary Hospital",
        meta_desc: "Learn about the history, mission, vision and expert leadership of Yanet Primary Hospital."
      }
    },
    {
      id: 'services',
      content: {
        srv_hero_title: "Our Medical Services",
        srv_hero_desc: "Comprehensive healthcare and specialized units for you and your family.",
        srv_hero_image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        srv_grid_title: "Departments & Specialties",
        pricing_title: "Insurance Partners",
        pricing_desc: "We accept major health insurance providers and medical insurance plans in Ethiopia.",
        faq_title: "Frequently Asked Questions",
        faq_json: "[\n  {\n    \"q\": \"How do I book an appointment?\",\n    \"a\": \"You can book an appointment online via our patient portal or by calling our hotline 8181.\"\n  }\n]",
        meta_title: "Services | Yanet Primary Hospital"
      }
    },
    {
      id: 'branches',
      content: {
        br_title: "Our Hospital Branches",
        br_desc: "Find a Yanet hospital branch near you for accessible and modern care.",
        br_hero_image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        map_api_key: "AIzaSy...",
        map_def_lat: "8.9806",
        map_def_lng: "38.7578",
        map_zoom: "12",
        br_list_title: "All Locations",
        reg_contact_title: "Need help finding us?",
        reg_contact_phone: "8181",
        meta_title: "Locations & Branches | Yanet Hospital"
      }
    },
    {
      id: 'contact',
      content: {
        cont_title: "Get in Touch",
        cont_sub: "We are here to answer your questions, schedule visits, and provide patient support.",
        cont_img: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        email_general: "info@yanethospital.com",
        email_support: "support@yanethospital.com",
        phone_main: "+251 11 123 4567",
        phone_emergency: "8181",
        address_hq: "Bole Road, Addis Ababa, Ethiopia",
        form_title: "Send us a Message",
        form_recipient: "inbox@yanethospital.com",
        form_success_msg: "Thank you! Your message has been sent. We will respond shortly.",
        hours_title: "Working Hours",
        hours_weekdays: "24 Hours",
        hours_weekends: "24 Hours",
        hours_holidays: "Open for Emergencies",
        meta_title: "Contact Us | Yanet Primary Hospital"
      }
    },
    {
      id: 'blog',
      content: {
        blog_title: "Health News & Articles",
        blog_desc: "Stay updated with the latest health tips, medical guidelines, and hospital announcements.",
        blog_hero_img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
        featured_enabled: "true",
        featured_post_id: "",
        categories_list: "Health Tips, Hospital News, Events, Research",
        posts_per_page: "9",
        meta_title: "Blog & News | Yanet Hospital"
      }
    },
    {
      id: 'doctors',
      content: {
        doc_title: "Our Medical Specialists",
        doc_desc: "Meet our dedicated team of expert doctors and specialists in clinical medicine.",
        doc_hero_img: "https://images.unsplash.com/photo-1551076805-e1869033e561",
        doc_departments: "Cardiology, Neurology, Pediatrics, Surgery, Ophthalmology",
        doc_sort_by: "Experience",
        booking_enabled: "true",
        booking_url: "",
        meta_title: "Our Doctors | Yanet Primary Hospital"
      }
    },
    {
      id: 'virtual-tour',
      content: {
        vt_title: "Take a 360° Virtual Tour",
        vt_desc: "Explore our state-of-the-art facilities, patient rooms, and ICU online.",
        vt_embed_url: "https://my.matterport.com/show/?m=xxx",
        vt_autoplay: "false",
        vt_highlights_title: "Key Areas to Explore",
        vt_areas: "[\n  {\n    \"name\": \"ICU Unit\",\n    \"time\": \"0:45\"\n  }\n]",
        meta_title: "Virtual Tour | Yanet Primary Hospital"
      }
    },
    {
      id: 'careers',
      content: {
        car_title: "Join Our Medical Team",
        car_desc: "Build a highly rewarding career at Yanet Primary Hospital.",
        car_hero_img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
        ben_title: "Why Work With Us?",
        ben_1: "Competitive Salary",
        ben_1_desc: "We offer industry-leading compensation packages and premium bonuses.",
        ben_2: "Health Insurance",
        ben_2_desc: "Comprehensive health coverage and clinical benefits for you and your family.",
        ben_3: "Continuous Training",
        ben_3_desc: "Regular clinical workshops, research resources, and growth opportunities.",
        jobs_title: "Open Positions",
        app_email: "hr@yanethospital.com",
        app_success_msg: "Your application has been received. We will contact you soon.",
        meta_title: "Careers & Jobs | Yanet Primary Hospital"
      }
    }
  ];

  for (const page of pagesData) {
    await prisma.page.upsert({
      where: { id: page.id },
      update: { content: page.content },
      create: { id: page.id, content: page.content }
    });
  }
  console.log('Page contents seeded successfully!');

  // 3. Seed Doctors
  const doctorsData = [
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

  await prisma.doctor.deleteMany();
  for (const doc of doctorsData) {
    await prisma.doctor.create({ data: doc });
  }
  console.log('Doctors seeded successfully!');

  // 4. Seed Services
  const servicesData = [
    {
      slug: 'emergency-care',
      category: 'department',
      iconName: 'AlertCircle',
      title: 'Emergency Care',
      titleAm: 'የድንገተኛ አደጋ እንክብካቤ',
      desc: '24/7 rapid response emergency medical services with fully equipped ambulances and trauma care specialists.',
      descAm: 'የ24/7 ፈጣን የድንገተኛ አደጋ ህክምና አገልግሎቶች ሙሉ በሙሉ ከተሟሉ አምቡላንሶች እና የትራማ እንክብካቤ ስፔሻሊስቶች ጋር።',
      fullDesc: 'The Emergency Care Department at Yanet Primary Hospital operates 24 hours a day, 7 days a week, providing immediate critical care for life-threatening conditions. Our facility is equipped with state-of-the-art resuscitation bays, trauma rooms, and a dedicated fleet of GPS-tracked advanced life support ambulances. Our specialized emergency physicians, trauma surgeons, and triage nurses are trained to deliver rapid, life-saving interventions with response times among the fastest in the city.',
      fullDescAm: 'በያኔት የመጀመሪያ ደረጃ ሆስፒታል የድንገተኛ አደጋ እንክብካቤ ክፍል በሳምንት 7 ቀናት ለ24 ሰዓታት የሚሰራ ሲሆን፣ ለሕይወት አስጊ ለሆኑ ሁኔታዎች ፈጣን እና ወሳኝ እንክብካቤ ይሰጣል። የእኛ ተቋም ዘመናዊ የመነቃቂያ ክፍሎች፣ የትራማ ክፍሎች፣ እና የጂፒኤስ ክትትል ያላቸው የላቀ የህይወት ድጋፍ አምቡላንሶች አሉት። ልዩ የድንገተኛ አደጋ ሀኪሞቻችን፣ የትራማ ቀዶ ህክምና ባለሙያዎች እና ትራያጅ ነርሶች በከተማው ውስጥ በጣም ፈጣን በሆነ ምላሽ ህይወት አድን ጣልቃ ገብነቶችን ለመስጠት የሰለጠኑ ናቸው።',
      specialty: 'Emergency',
      treatments: [
        'Advanced Trauma Life Support (ATLS)',
        'Cardiac Arrest & Stroke Rapid Response Protocol',
        'Acute Respiratory Failure Management',
        'Emergency Minor & Major Surgical Interventions',
        '24/7 Ambulance Dispatch & Paramedic Evacuation',
        'Poisoning and Toxicity Management'
      ],
      treatmentsAm: [
        'የላቀ የትራማ ህይወት ድጋፍ (ATLS)',
        'የልብ ድካም እና ስትሮክ ፈጣን ምላሽ ፕሮቶኮል',
        'አጣዳፊ የመተንፈሻ አካላት ውድቀት አያያዝ',
        'የድንገተኛ አነስተኛ እና ዋና የቀዶ ጥገና ጣልቃ ገብነቶች',
        'የ24/7 አምቡላንስ ስምሪት እና የፓራሜዲክ ማስወጣት',
        'የመርዝ እና ቶክሲሲቲ አያያዝ'
      ],
      equipment: [
        'Advanced Life Support (ALS) Ambulances',
        'Defibrillators & Automated External Defibrillators (AED)',
        'Portable Mechanical Ventilators',
        'Continuous Vital Sign Monitors',
        'Emergency Ultrasound (POCUS) & Mobile X-Ray',
        'Fully Stocked Resuscitation Crash Carts'
      ],
      equipmentAm: [
        'የላቀ የህይወት ድጋፍ (ALS) አምቡላንሶች',
        'ዲፊብሪሌተሮች እና አውቶሜትድ ኤክስተርናል ዲፊብሪሌተሮች (AED)',
        'ተንቀሳቃሽ ሜካኒካል ቬንቲሌተሮች',
        'ተከታታይ የህይወት ምልክት መቆጣጠሪያዎች',
        'የድንገተኛ አልትራሳውንድ (POCUS) እና ተንቀሳቃሽ ኤክስሬይ',
        'Keep-to-Date Resuscitation Crash Carts'
      ]
    },
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
      fullDescAm: 'የእኛ የልብ ህክምና ክፍል ግንባር ቀደም ስፔሻሊስቶችን እና ዘመናዊ የምርመራ መሳሪያዎችን በማቀናጀት ሰፊ የልብና የደም ቧንቧ ችግሮችን ይፈታል። ከደረት ህመም እና የልብ ምት መዛባት ግምገማ ጀምሮ የልብ ድካም እና ከፍተኛ የደም ግፊትን እስከ መቆጣጠር ድረስ ልብዎን ለመጠበቅ ጥብቅ አለም አቀማዊ መመሪያዎችን እንተገብራለን። ቡድናችን የህክምና ህክምናዎችን፣ የአኗኗር ዘይቤ ለውጦችን እና መደበኛ ክሊኒካዊ ክትትልን የሚያጣምሩ ግላዊ የህክምና መንገዶችን ያዘጋጃል።',
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
      descAm: 'በትንሹ ወራሪ ቴክኒኮችን and ፈጣን ማገገሚያ ሞዴሎችን በመጠቀም የሚሰጡ የባለሙያ ጠቅላላ ቀዶ ጥገና ሂደቶች።',
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
        '디ጂታል Centrifuges, ኢንኩቤተሮች እና በባርኮድ የተደገፉ የስራ ፍሰቶች'
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

  await prisma.service.deleteMany();
  for (const srv of servicesData) {
    await prisma.service.create({ data: srv });
  }
  console.log('Services seeded successfully!');

  // 5. Seed Branches
  const branchesData = [
    {
      slug: 'hawassa',
      name: 'Hawassa Branch (HQ)',
      nameAm: 'ሀዋሳ ቅርንጫፍ (ዋናው መሥሪያ ቤት)',
      city: 'Hawassa',
      cityAm: 'ሀዋሳ',
      address: 'HQ Building, Near Lake Hawassa, Hawassa, Ethiopia',
      addressAm: 'ዋና መሥሪያ ቤት ሕንፃ፣ ከሐዋሳ ሐይቅ አጠገብ፣ ሐዋሳ፣ ኢትዮጵያ',
      phone: '+251 46 220 1234',
      email: 'hawassa@yanethospital.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126484.28189871143!2d38.40698188173456!3d7.027429111456291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b14514782bb035%3A0xe50e0f3161099611!2sHawassa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
      workingHours: {
        weekdays: '24 Hours / 7 Days',
        weekdaysAm: '24 ሰዓት / 7 ቀናት',
        saturdays: '24 Hours / 7 Days',
        saturdaysAm: '24 ሰዓት / 7 ቀናት',
        sundays: '24 Hours / 7 Days',
        sundaysAm: '24 ሰዓት / 7 ቀናት',
        holidays: '24 Hours / 7 Days',
        holidaysAm: '24 ሰዓት / 7 ቀናት'
      },
      serviceSlugs: [
        'general-medicine',
        'cardiology',
        'pediatrics',
        'surgery',
        'imaging-diagnostics',
        'neurology',
        'ophthalmology',
        'laboratory',
        'pharmacy',
        'preventive-healthcare',
        'ambulance-services'
      ],
      doctorIds: ['1', '2', '3', '4', '5', '6', '7', '8'],
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2000&auto=format&fit=crop',
      featuredServices: ['Cardiology', 'General Surgery', '24/7 Emergency Care', 'Pediatrics'],
      featuredServicesAm: ['የልብ ሕክምና', 'ጠቅላላ ቀዶ ጥገና', 'የ24 ሰዓት ድንገተኛ ሕክምና', 'የህፃናት ሕክምና'],
      theme: {
        gradientClass: 'from-secondary via-secondary/70 to-primary/30',
        accentHex: '#0f47af',
        secondaryHex: '#078930',
        badgeBg: 'bg-primary',
        tagline: 'The Central Hub of Multi-Specialty Medical Excellence in Ethiopia',
        taglineAm: 'በኢትዮጵያ ውስጥ የአጠቃላይ የሕክምና የላቀ ደረጃ ማዕከል',
        specialCardBg: 'bg-primary/5 border-primary/20'
      }
    },
    {
      slug: 'bole',
      name: 'Bole Branch (Addis Ababa)',
      nameAm: 'ቦሌ ቅርንጫፍ (አዲስ አበባ)',
      city: 'Addis Ababa',
      cityAm: 'አዲስ አበባ',
      address: 'Bole Road, Opposite Edna Mall, Addis Ababa, Ethiopia',
      addressAm: 'ቦሌ መንገድ፣ ከኤድና ሞል ፊት ለፊት፣ አዲስ አበባ፣ ኢትዮጵያ',
      phone: '+251 11 661 5678',
      email: 'bole@yanethospital.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5471694662497!2d38.78474241534346!3d9.013898191494576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85aaf55ba2cf%3A0x6bcfd4d8ef5ba814!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2sus!4v1700000000001!5m2!1sen!2sus',
      workingHours: {
        weekdays: '8:00 AM - 10:00 PM',
        weekdaysAm: 'ከጠዋቱ 2:00 - ከምሽቱ 4:00',
        saturdays: '8:00 AM - 8:00 PM',
        saturdaysAm: 'ከጠዋቱ 2:00 - ከምሽቱ 2:00',
        sundays: '9:00 AM - 2:00 PM',
        sundaysAm: 'ከጠዋቱ 3:00 - ከሰዓት 8:00',
        holidays: 'Closed (Emergency Only)',
        holidaysAm: 'ዝግ ነው (ለድንገተኛ ብቻ)'
      },
      serviceSlugs: [
        'general-medicine',
        'cardiology',
        'pediatrics',
        'neurology',
        'ophthalmology',
        'laboratory',
        'pharmacy',
        'preventive-healthcare'
      ],
      doctorIds: ['1', '2', '4', '5', '6', '8'],
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop',
      featuredServices: ['Neurology', 'Pediatrics', 'Ophthalmology', 'Digital Laboratory'],
      featuredServicesAm: ['የነርቭ ሕክምና', 'የህፃናት ሕክምና', 'የዓይን ሕክምና', 'ዲጂታል ላቦራቶሪ'],
      theme: {
        gradientClass: 'from-[#1e1b4b] via-[#312e81]/80 to-[#7c3aed]/20',
        accentHex: '#7c3aed',
        secondaryHex: '#4f46e5',
        badgeBg: 'bg-violet-600',
        tagline: 'Ultra-Modern Specialized Diagnostics & Advanced Pediatrics Hub',
        taglineAm: 'ዘመናዊ የላቀ ምርመራ እና የሕፃናት ሕክምና ማዕከል',
        specialCardBg: 'bg-violet-50/70 border-violet-100'
      }
    },
    {
      slug: 'adama',
      name: 'Adama Branch',
      nameAm: 'አዳማ ቅርንጫፍ',
      city: 'Adama',
      cityAm: 'አዳማ',
      address: 'Main Commercial Ave, Near Adama University, Adama, Ethiopia',
      addressAm: 'ዋና የንግድ መንገድ፣ ከአዳማ ዩኒቨርሲቲ አጠገብ፣ አዳማ፣ ኢትዮጵያ',
      phone: '+251 22 111 9876',
      email: 'adama@yanethospital.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0682136279183!2d39.266205715340816!3d8.541315893860086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164c489ad3f237ef%3A0xc078832cb5e09f87!2sAdama!5e0!3m2!1sen!2sus!4v1700000000002!5m2!1sen!2sus',
      workingHours: {
        weekdays: '8:00 AM - 7:00 PM',
        weekdaysAm: 'ከጠዋቱ 2:00 - ከምሽቱ 1:00',
        saturdays: '8:00 AM - 4:00 PM',
        saturdaysAm: 'ከጠዋቱ 2:00 - ከሰዓት 10:00',
        sundays: 'Closed',
        sundaysAm: 'ዝግ ነው',
        holidays: 'Closed',
        holidaysAm: 'ዝግ ነው'
      },
      serviceSlugs: [
        'general-medicine',
        'pediatrics',
        'imaging-diagnostics',
        'laboratory',
        'pharmacy'
      ],
      doctorIds: ['1', '3', '4', '7'],
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2000&auto=format&fit=crop',
      featuredServices: ['General Medicine', 'Pediatrics', 'Imaging Diagnostics', '24/7 Pharmacy'],
      featuredServicesAm: ['ጠቅላላ ሕክምና', 'የህፃናት ሕክምና', 'የምስል ምርመራ', 'የ24 ሰዓት ፋርማሲ'],
      theme: {
        gradientClass: 'from-[#451a03] via-[#78350f]/80 to-[#d97706]/20',
        accentHex: '#d97706',
        secondaryHex: '#ea580c',
        badgeBg: 'bg-amber-600',
        tagline: 'Rapid Community Diagnostics, Preventive Care & Family Wellness',
        taglineAm: 'ፈጣን የቤተሰብ ምርመራ፣ መከላከያ እንክብካቤ እና ሕክምና',
        specialCardBg: 'bg-amber-50/70 border-amber-100'
      }
    },
    {
      slug: 'bahirdar',
      name: 'Bahir Dar Branch',
      nameAm: 'ባሕር ዳር ቅርንጫፍ',
      city: 'Bahir Dar',
      cityAm: 'ባሕር ዳር',
      address: 'Lakefront Ave, Near Kebele 03, Bahir Dar, Ethiopia',
      addressAm: 'የሐይቅ ዳር መንገድ፣ ከቀበሌ 03 አጠገብ፣ ባሕር ዳር፣ ኢትዮጵያ',
      phone: '+251 58 226 5432',
      email: 'bahirdar@yanethospital.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.8942232938166!2d37.39129531536341!3d11.595460591768804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1640c3132e093fb1%3A0xe108d4b31f0cfb3f!2sBahir%20Dar!5e0!3m2!1sen!2sus!4v1700000000003!5m2!1sen!2sus',
      workingHours: {
        weekdays: '8:00 AM - 6:00 PM',
        weekdaysAm: 'ከጠዋቱ 2:00 - ከሰዓት 12:00',
        saturdays: '8:00 AM - 4:00 PM',
        saturdaysAm: 'ከጠዋቱ 2:00 - ከሰዓት 10:00',
        sundays: 'Closed',
        sundaysAm: 'ዝግ ነው',
        holidays: 'Closed',
        holidaysAm: 'ዝግ ነው'
      },
      serviceSlugs: [
        'general-medicine',
        'ophthalmology',
        'laboratory',
        'pharmacy',
        'ambulance-services'
      ],
      doctorIds: ['4', '5', '8'],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop',
      featuredServices: ['Ophthalmology', 'Digital Laboratory', 'Ambulance Support', 'Wellness Programs'],
      featuredServicesAm: ['የዓይን ሕክምና', 'ዲጂታል ላቦራቶሪ', 'የአምቡላንስ ድጋፍ', 'የጤና ፕሮግራሞች'],
      theme: {
        gradientClass: 'from-[#064e3b] via-[#0f766e]/85 to-[#0d9488]/20',
        accentHex: '#0d9488',
        secondaryHex: '#0f766e',
        badgeBg: 'bg-teal-600',
        tagline: 'Lakefront Medical Care, Leading Ophthalmology & Emergency Dispatch',
        taglineAm: 'የዓይን ሕክምና እና የአምቡላንስ ድንገተኛ አገልግሎት',
        specialCardBg: 'bg-teal-50/70 border-teal-100'
      }
    },
    {
      slug: 'mekelle',
      name: 'Mekelle Branch',
      nameAm: 'መቀሌ ቅርንጫፍ',
      city: 'Mekelle',
      cityAm: 'መቀሌ',
      address: 'Adi Haki, Near Mekelle University, Mekelle, Ethiopia',
      addressAm: 'ዓዲ ሓቂ፣ ከመቀሌ ዩኒቨርሲቲ አጠገብ፣ መቀሌ፣ ኢትዮጵያ',
      phone: '+251 34 440 8765',
      email: 'mekelle@yanethospital.com',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3789423689437!2d39.467465315366!3d13.496924590509617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164ec34a9b6c00d5%3A0xc3faeb845a7a8f90!2sMekelle!5e0!3m2!1sen!2sus!4v1700000000004!5m2!1sen!2sus',
      workingHours: {
        weekdays: '8:00 AM - 6:00 PM',
        weekdaysAm: 'ከጠዋቱ 2:00 - ከሰዓት 12:00',
        saturdays: '8:00 AM - 4:00 PM',
        saturdaysAm: 'ከጠዋቱ 2:00 - ከሰዓት 10:00',
        sundays: 'Closed',
        sundaysAm: 'ዝግ ነው',
        holidays: 'Closed',
        holidaysAm: 'ዝግ ነው'
      },
      serviceSlugs: [
        'general-medicine',
        'surgery',
        'imaging-diagnostics',
        'laboratory',
        'pharmacy'
      ],
      doctorIds: ['3', '5', '7'],
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop',
      featuredServices: ['General Surgery', 'Imaging & Diagnostics', 'Integrated Laboratory', 'Pharmacy'],
      featuredServicesAm: ['ጠቅላላ ቀዶ ጥገና', 'የምስል ምርመራ', 'የተቀናጀ ላቦራቶሪ', 'ፋርማሲ'],
      theme: {
        gradientClass: 'from-[#4c0519] via-[#881337]/80 to-[#e11d48]/20',
        accentHex: '#e11d48',
        secondaryHex: '#be123c',
        badgeBg: 'bg-rose-600',
        tagline: 'Specialized Surgical Interventions & Integrated Laboratory Diagnostics',
        taglineAm: 'ልዩ ቀዶ ጥገና እና የተቀናጀ የላቦራቶሪ ምርመራ',
        specialCardBg: 'bg-rose-50/70 border-rose-100'
      }
    }
  ];

  await prisma.branch.deleteMany();
  for (const br of branchesData) {
    await prisma.branch.create({ data: br });
  }
  console.log('Branches seeded successfully!');

  // 6. Seed BlogPosts
  const blogArticles = [
    {
      id: '1',
      categoryEn: 'Cardiology',
      categoryAm: 'ልብ',
      titleEn: 'Understanding Heart Disease: Prevention & Early Detection',
      titleAm: 'የልብ ህመምን መረዳት፦ መከላከልና ቀደምት ምርመራ',
      excerptEn: 'Cardiovascular disease remains the leading cause of death globally. Learn the key signs and proactive steps to protect your heart.',
      excerptAm: 'የልብና የደም ቧንቧ ህመም ዓለም አቀፍ የሞት ዋና ምክንያት ሆኖ ይቀጥላል። ልብዎን ለመጠበቅ ቁልፍ ምልክቶችን እና ንቁ እርምጃዎችን ይወቁ።',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      dateEn: 'May 15, 2026',
      dateAm: 'ግንቦት 15, 2026',
      authorId: '1',
      authorNameEn: 'Dr. Dawit Yilma',
      authorNameAm: 'ዶ/ር ዳዊት ይልማ',
      readMin: 5,
      contentEn: `# Preventing Heart Disease\nCardiovascular health is key to general wellness. In this guide, we break down actionable steps to keep your heart in top condition.\n\n## Key Risk Factors\nUnderstanding risk factors is the first step in protecting your cardiovascular system:\n* High blood pressure (Hypertension)\n* Elevated LDL cholesterol levels\n* Lack of regular physical exercise\n* Inconsistent diet high in sodium and trans fats\n\n## Early Symptoms to Monitor\nDo not wait for a critical cardiac event to seek medical help:\n* Shortness of breath during low-intensity tasks\n* Unexplained fatigue or lightheadedness\n* Mild discomfort in the chest or arm during exercise\n\n**Doctor's Advice** Always consult a doctor immediately if you experience persistent chest pain, tightness, or shortness of breath. Prevention through regular cardiovascular screening is your strongest shield against long-term heart conditions. Let's make heart care a daily habit!`,
      contentAm: `# የልብ በሽታን መከላከል\nየልብና የደም ቧንቧ ጤና ለአጠቃላይ ደህንነት ወሳኝ ነው። በዚህ መመሪያ ውስጥ ልብዎን በጥሩ ሁኔታ ለመጠበቅ የሚረዱ ተግባራዊ እርምጃዎችን እንዘረዝራለን።\n\n## ዋና ዋና ለአደጋ የሚያጋልጡ ሁኔታዎች\nየልብና የደም ቧንቧ ስርዓትዎን ለመጠበቅ ለአደጋ የሚያጋልጡ ሁኔታዎችን መረዳት የመጀመሪያው እርምጃ ነው፦\n* ከፍተኛ የደም ግፊት (Hypertension)\n* ከፍተኛ የኮሌስትሮል መጠን\n* መደበኛ የአካል ብቃት እንቅስቃሴ አለማድረግ\n* ጨው እና ቅባት የበዛበት አመጋገብ\n\n## ክትትል ሊደረግባቸው የሚገቡ የጥንቃቄ ምልክቶች\nየህክምና እርዳታ ለማግኘት ከባድ የልብ ህመም እስኪያጋጥምዎ ድረስ አይጠብቁ፦\n* በቀላል ስራዎች ወቅት የትንፋሽ ማጠር\n* ያለምክንያት መዳከም ወይም ራስን ማዞር\n* የአካል ብቃት እንቅስቃሴ በሚያደርጉበት ወቅት በደረት ወይም በክንድ አካባቢ የሚሰማ ምቾት ማጣት\n\n**Doctor's Advice** የማያቋርጥ የደረት ህመም፣ መውጋት ወይም የትንፋሽ ማጠር ካጋጠመዎት ወዲያውኑ ሐኪም ያማክሩ። በመደበኛ የልብ ምርመራዎች አማካኝነት ቅድመ-መከላከል ከረጅም ጊዜ የልብ በሽታዎች ለመጠበቅ ጠንካራ መከላከያዎ ነው። የልብ እንክብካቤን የዕለት ተዕለት ልምዳችን እናድርግ!`
    },
    {
      id: '2',
      categoryEn: 'Nutrition',
      categoryAm: 'አመጋገብ',
      titleEn: "Eating for Longevity: A Clinical Dietician's Guide",
      titleAm: 'ለረዥም ዕድሜ መብላት፦ የክሊኒካዊ አመጋጊ መመሪያ',
      excerptEn: 'A well-balanced diet can reduce risks of chronic diseases by up to 40%. Our dietician outlines the top foods to include daily.',
      excerptAm: 'ሚዛናዊ ምግብ ስር የሰደዱ በሽታዎችን እስከ 40% ሊቀንስ ይችላል። አመጋጊያቸው ዕለታዊ ምርጥ ምግቦችን ይዘርዝራሉ።',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
      dateEn: 'May 12, 2026',
      dateAm: 'ግንቦት 12, 2026',
      authorId: '2',
      authorNameEn: 'Dr. Birhanu Mengiste',
      authorNameAm: 'ዶ/ር ብርሃኑ መንግስቴ',
      readMin: 4,
      contentEn: `# Nutrition for a Healthier Life\nA well-balanced diet plays an irreplaceable role in boosting immune functions, increasing mental sharpness, and delaying overall cellular aging.\n\n## Core Pillars of Balanced Nutrition\nTo maintain vibrant energy and prevent systemic inflammation:\n* Incorporate complex carbohydrates like oats, barley, and brown teff\n* Prioritize high-quality lean proteins and legumes\n* Keep daily sugar and sodium intake minimal\n\n## Top Foods to Include Daily\nConsistently add these nutrient-dense ingredients to your plate:\n* Dark green leafy vegetables (e.g., Gomen/Kale)\n* Antioxidant-rich seasonal fruits\n* Nuts, seeds, and healthy monounsaturated fats like olive oil or avocado\n\n**Doctor's Advice** Let food be your medicine! Small, sustainable changes to your daily meals are much more effective than extreme temporary diets. Drinking plenty of water and including fiber-rich whole grains in every meal will transform your digestive health and keep your energy levels steady throughout the day.`,
      contentAm: `# ለተሻለ ሕይወት አመጋገብ\nሚዛናዊ የሆነ የአመጋገብ ስርዓት የሰውነት በሽታ የመከላከል አቅምን ለማሳደግ፣ የአእምሮ ንቃትን ለመጨመር እና አጠቃላይ የሴሎች እርጅናን ለመከላከል የማይተካ ሚና ይጫወታል።\n\n## የባላንስድ አመጋገብ ዋና መሰረቶች\nጉልበትን ለመጠበቅ እና በሰውነት ውስጥ እብጠትን ለመከላከል፦\n* እንደ አጃ፣ ገብስ እና ቡናማ ጤፍ ያሉ ውስብስብ ካርቦሃይድሬቶችን ይመገቡ\n* ጥራት ያላቸውን ፕሮቲኖች እና ጥራጥሬዎችን ያስቀድሙ\n* ዕለታዊ የስኳር እና የጨው ፍጆታዎን ይቀንሱ\n\n## በየቀኑ መካተት ያለባቸው ምርጥ ምግቦች\nእነዚህን በንጥረ-ነገር የበለጸጉ ምግቦች በየቀኑ በምግብዎ ውስጥ ያካትቱ፦\n* ጥቁር አረንጓዴ ቅጠላቅጠል (ለምሳሌ፦ ጎመን)\n* አንቲኦክሲዳንት የበለጸጉ ወቅታዊ ፍራፍሬዎች\n* ለውዝ፣ ፍሬዎች እና እንደ አቮካዶ ያሉ ጤናማ ቅባቶች\n\n**Doctor's Advice** ምግብዎ መድሃኒትዎ ይሁን! በዕለት ተዕለት ምግቦችዎ ላይ የሚያደርጓቸው አነስተኛ እና ቀጣይነት ያላቸው ለውጦች ከአጭር ጊዜ ከባድ የአመጋገብ ስርዓቶች የበለጠ ውጤታማ ናቸው። በቂ ውሃ መጠጣት እና በፋይበር የበለጸጉ ጥራጥሬዎችን በምግብ ውስጥ ማካተት የምግብ መፈጨትን ያሻሽላል እንዲሁም ቀኑን ሙሉ ንቁ ሆነው እንዲቆዩ ያደርጋል።`
    },
    {
      id: '3',
      categoryEn: 'Pediatrics',
      categoryAm: 'ህፃናት',
      titleEn: 'Childhood Vaccinations: A Complete Guide for Parents',
      titleAm: 'የህፃናት ክትባቶች፦ ለወላጆች ሙሉ መመሪያ',
      excerptEn: 'Immunization protects children from life-threatening diseases. Here is the complete guide recommended by our pediatric team.',
      excerptAm: 'ክትባት ህፃናትን ከሕይወት አስጊ በሽታዎች ይጠብቃቸዋል። የህፃናት ሕክምና ቡድናችን የሚመክረው ሙሉ መመሪያ ይህ ነው።',
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80',
      dateEn: 'May 10, 2026',
      dateAm: 'ግንቦት 10, 2026',
      authorId: '3',
      authorNameEn: 'Sister Tigist Hailu',
      authorNameAm: 'ሲስተር ትዕግስት ኃይሉ',
      readMin: 6,
      contentEn: `# Pediatric Immunization Guide\nProtecting your child from preventable infectious diseases is one of the most critical responsibilities of early parenting. \n\n## Why Immunization Matters\nVaccines teach your child's developing immune system to recognize and defend against dangerous pathogens:\n* Significantly reduces child mortality rate\n* Eradicates highly contagious diseases like polio\n* Creates herd immunity to shield vulnerable children\n\n## Essential Milestones\nKeep track of these vital vaccination milestones:\n* Birth: BCG and Oral Polio Vaccine (OPV-0)\n* 6 Weeks & 10 Weeks: Pentavalent vaccine, Rotavirus, and Pneumococcal (PCV)\n* 9 Months & 18 Months: Measles and Rubella protection\n\n**Doctor's Advice** Never delay your child's vaccination schedule due to mild side effects like a low-grade fever or minor soreness at the injection site. These reactions are normal signs that the immune system is responding. Keep a clean copy of your child's immunization card and bring it to every clinical visit.`,
      contentAm: `# የህፃናት ክትባት መመሪያ\nልጅዎን አስቀድሞ መከላከል ከሚቻል ተላላፊ በሽታዎች መጠበቅ በልጅነት አስተዳደግ ውስጥ ትልቁ እና ዋናኛው ኃላፊነት ነው።\n\n## የክትባት አስፈላጊነት\nክትባቶች የልጅዎን በሽታ የመከላከል አቅም አደገኛ ተህዋስያንን እንዲለይ እና እንዲከላከል ያስተምራሉ፦\n* የህፃናትን ሞት መጠን በከፍተኛ ሁኔታ ይቀንሳል\n* እንደ ፖሊዮ ያሉ ተላላፊ በሽታዎችን ሙሉ በሙሉ ያጠፋል\n* በማህበረሰብ ደረጃ ጠንካራ የመከላከያ አቅም ይፈጥራል\n\n## ዋና ዋና የክትባት ወቅቶች\nእነዚህን ወሳኝ የክትባት ወቅቶች ይከታተሉ፦\n* ሲወለዱ፦ BCG እና የፖሊዮ ጠብታ (OPV-0)\n* በ6ኛው እና በ10ኛው ሳምንት፦ ፔንታቫለንት፣ ሮታቫይረስ እና ፒሲቪ (PCV) ክትባቶች\n* በ9ኛው እና በ18ኛው ወር፦ የኩፍኝ እና የሩቤላ መከላከያ ክትባቶች\n\n**Doctor's Advice** እንደ ትንሽ ትኩሳት ወይም የክትባት ቦታ መቅላት ያሉ ቀላል የጎንዮሽ ጉዳቶችን በመፍራት የልጅዎን ክትባት አያስተጓጉሉ። እነዚህ ምልክቶች የበሽታ መከላከያ ስርዓቱ እየሰራ መሆኑን የሚያሳዩ መደበኛ ሁኔታዎች ናቸው። የልጅዎን የክትባት ካርድ በጥንቃቄ ይያዙ እና ወደ ሆስፒታል ሲመጡ ሁልጊዜ ይዘው መምጣትዎን አይርሱ።`
    },
    {
      id: '4',
      categoryEn: 'Mental Health',
      categoryAm: 'አዕምሮ ጤና',
      titleEn: 'Managing Anxiety: Clinical Strategies That Actually Work',
      titleAm: 'ጭንቀትን ማስተዳደር፦ ውጤታማ ክሊኒካዊ ስትራቴጂዎች',
      excerptEn: 'Mental health is as vital as physical health. Learn evidence-based techniques to manage day-to-day anxiety and chronic stress.',
      excerptAm: 'የአዕምሮ ጤና ልክ እንደ አካላዊ ጤና አስፈላጊ ነው። ዕለታዊ ጭንቀትን እና ስር የሰደደ ጭንቀትን ለማስተዳደር ማስረጃ ያለው ቴክኒኮችን ይወቁ።',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
      dateEn: 'May 8, 2026',
      dateAm: 'ግንቦት 8, 2026',
      authorId: '4',
      authorNameEn: 'Dr. Tebarek Liyana',
      authorNameAm: 'ዶ/ር ተባረክ ሊያና',
      readMin: 7,
      contentEn: `# Reclaiming Calm: Managing Anxiety\nAnxiety is a natural biological response to threat, but when it becomes chronic, it disrupts sleep, focus, and physical immunity. \n\n## Scientific Coping Techniques\nRather than struggling against anxious thoughts, practice these evidence-based clinical techniques:\n* **Deep Diaphragmatic Breathing**: Slow down your heart rate by breathing in for 4 seconds, holding for 4, and exhaling for 6.\n* **Progressive Muscle Relaxation**: Systematically tense and release muscle groups from toe to forehead.\n* **Cognitive Reframing**: Write down catastrophic predictions and actively challenge their probability and facts.\n\n## When to Seek Professional Consultation\nIt is crucial to partner with a therapist if:\n* Anxiety interferes with your performance at work or school\n* You experience frequent panic attacks without direct triggers\n* Insomnia and muscle tension become daily occurrences\n\n**Doctor's Advice** Seeking therapy is a sign of strength and self-awareness, not weakness. Your brain requires care just like your heart or lungs. Building a regular routine of mindfulness, consistent sleep hygiene, and reducing caffeine intake will establish a strong baseline for stress resilience.`,
      contentAm: `# ጭንቀትን ማስተዳደር እና አእምሮን ማረጋጋት\nጭንቀት ለአደጋዎች የምንሰጠው የተፈጥሮ ምላሽ ቢሆንም፣ የማያቋርጥ እና ስር የሰደደ ሲሆን ግን እንቅልፍን፣ ትኩረትን እና የአካል በሽታ የመከላከል አቅምን ያናጋል።\n\n## ሳይንሳዊ የመቋቋሚያ ዘዴዎች\nከጭንቀት ሀሳቦች ጋር ከመታገል ይልቅ እነዚህን በሳይንስ የተረጋገጡ ዘዴዎችን ይለማመዱ፦\n* **ረዥም የደረት መተንፈስ (Diaphragmatic Breathing)**፦ ለ4 ሰከንድ ወደ ውስጥ መተንፈስ፣ ለ4 ሰከንድ መያዝ፣ እና ለ6 ሰከንድ ቀስ ብሎ ወደ ውጭ መተንፈስ የልብ ምትን ያረጋጋል።\n* **ጡንቻዎችን ማዝናናት (Progressive Muscle Relaxation)**፦ ከእግር ጣት እስከ ግንባር ያሉ ጡንቻዎችን በየተራ እያጠነከሩ ማዝናናት።\n* **ሀሳብን በበጎ መለወጥ (Cognitive Reframing)**፦ አስፈሪ የጭንቀት ሀሳቦችን በጽሁፍ በማስፈር ትክክለኛነታቸውን በተጨባጭ ማስረጃ መፈተሽ።\n\n## የባለሙያ ድጋፍ መቼ ማግኘት ይገባል?\nእነዚህ ሁኔታዎች ካጋጠሙዎት የባለሙያ አማካሪ ማግኘት ወሳኝ ነው፦\n* ጭንቀት በስራዎ ወይም በትምህርትዎ ላይ ተፅዕኖ ሲያሳድር\n* ያለ ምንም ምክንያት ተደጋጋሚ ድንገተኛ የፍርሃት ስሜት (Panic Attacks) ሲከሰት\n* እንቅልፍ ማጣት እና የሰውነት መወጠር የዕለት ተዕለት ችግር ሲሆኑ\n\n**Doctor's Advice** የስነ-ልቦና ምክር ማግኘት የጥንካሬ እና ራስን የመውደድ ምልክት እንጂ የድክመት አይደለም። አእምሮዎ ልክ እንደ ልብዎ ወይም ሳንባዎ እንክብካቤ ያስፈልገዋል። በቂ እንቅልፍ ማግኘት፣ ካፌይን መቀነስ እና መደበኛ የአካል ብቃት እንቅስቃሴ ማድረግ ጭንቀትን ለመቋቋም ትልቅ መሰረት ይጥላሉ።`
    },
    {
      id: '5',
      categoryEn: 'Preventive Care',
      categoryAm: 'ፕሪቬንቲቭ',
      titleEn: 'Annual Health Checkups: What to Expect at Every Age',
      titleAm: 'ዓመታዊ የጤና ምርመራ፦ ከእያንዳንዱ ዕድሜ ምን ይጠበቃሉ',
      excerptEn: 'Regular screenings catch problems before they become serious. Here is your age-by-age guide to staying ahead of illness.',
      excerptAm: 'መደበኛ ምርምራዎች ችግሮችን ከባሱ በፊት ይይዛሉ። ከህመም ቀድሞ ለመቆየት ዕድሜ ብዕድሜ መመሪያዎ ይህ ነው።',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      dateEn: 'May 5, 2026',
      dateAm: 'ግንቦት 5, 2026',
      authorId: '1',
      authorNameEn: 'Dr. Dawit Yilma',
      authorNameAm: 'ዶ/ር ዳዊት ይልማ',
      readMin: 5,
      contentEn: `# The Power of Preventive Screenings\nThe best time to see a doctor is when you are feeling perfectly healthy. Preventive screenings are designed to identify silent diseases like hypertension, pre-diabetes, and early cancers before symptoms display.\n\n## Screenings by Age Group\nAdd these baseline screenings to your health itinerary:\n* **20s & 30s**: Baseline blood pressure check, lipid profile, and annual dental checkups.\n* **40s & 50s**: Annual blood glucose, mammogram screening for women, and colonoscopy assessment.\n* **60s and Above**: Bone density scan, cardiovascular stress tests, and regular vision and hearing evaluations.\n\n## Preparing for Your Checkup\nTo maximize the value of your annual checkup:\n* Prepare a written list of any minor symptoms or recent changes\n* Document all medications, vitamins, and dosages you currently take\n* Request copies of your lab work to keep in a secure health folder\n\n**Doctor's Advice** Early detection saves lives! Many serious conditions can be successfully managed or completely reversed if caught in their earliest stages. Schedule your annual checkup on your birth month to ensure you never forget this critical health milestone.`,
      contentAm: `# የቅድመ-መከላከል ምርመራዎች ኃይል\nሐኪም ለማየት ምርጡ ጊዜ ሙሉ በሙሉ ጤነኛ ሆነው በሚሰማዎት ወቅት ነው። የቅድመ-መከላከል ምርመራዎች እንደ ደም ግፊት፣ የስኳር በሽታ እና መጀመሪያ ደረጃ ካንሰር ያሉ ምልክት ሳያሳዩ በጸጥታ የሚከሰቱ በሽታዎችን ቀድሞ ለመለየት ይረዳሉ።\n\n## የእድሜ-ተኮር ምርመራዎች\nእነዚህን መሰረታዊ ምርመራዎች በጤና ሰሌዳዎ ውስጥ ያካትቱ፦\n* **በ20ዎቹ እና 30ዎቹ እድሜ**፦ መሰረታዊ የደም ግፊት ምርመራ፣ የኮሌስትሮል መጠን፣ እና ዓመታዊ የጥርስ ምርመራ።\n* **በ40ዎቹ እና 50ዎቹ እድሜ**፦ ዓመታዊ የደም ስኳር ምርመራ፣ ለሴቶች የጡት ራጅ (Mammogram)፣ እና የአንጀት ካንሰር ምርመራ።\n* **በ60ዎቹ እና ከዚያ በላይ**፦ የአጥንት ጥንካሬ ምርመራ፣ የልብ ብቃት እና የዓይንና የጆሮ ምርመራዎች።\n\n## ለምርመራ እንዴት መዘጋጀት ይቻላል?\nዓመታዊ ምርመራዎን የበለጠ ውጤታማ ለማድረግ፦\n* የሚሰማዎትን ጥቃቅን የሰውነት ለውጦች በወረቀት ላይ ይጻፉ\n* በአሁን ሰዓት የሚወስዷቸውን ማናቸውንም መድሃኒቶች እና ቫይታሚኖች ዝርዝር ይያዙ\n* የላቦራቶሪ ውጤቶችን ኮፒ ወስደው በጤና ማህደርዎ ውስጥ ያስቀምጡ\n\n**Doctor's Advice** ቅድመ-ምርመራ ህይወትን ያድናል! ብዙ ከባድ የጤና እክሎች በመጀመሪያዎቹ ደረጃዎች ከተገኙ በተሳካ ሁኔታ መቆጣጠር ወይም ሙሉ በሙሉ መፈወስ ይቻላል። ዓመታዊ ምርመራዎን በልደትዎ ወር ላይ በማድረግ ሁልጊዜ ይህንን ወሳኝ የጤና ቀጠሮ ማክበርዎን ያረጋግጡ።`
    },
    {
      id: '6',
      categoryEn: 'Surgery',
      categoryAm: 'ቀዶ ጥገና',
      titleEn: 'Laparoscopic Surgery: Faster Recovery, Less Pain',
      titleAm: 'ላፓሮስኮፒክ ቀዶ ጥገና፦ ፈጣን ማገገም፣ ቀነስ ያለ ህመም',
      excerptEn: 'Minimally invasive surgery has transformed modern medicine. Discover how our surgical team uses it to improve patient outcomes.',
      excerptAm: 'ዝቅተኛ ወረራ ቀዶ ጥገና ዘመናዊ ህክምናን ቀይሮታል። ለታካሚ ውጤቶችን ለማሻሻል የቀዶ ጥገና ቡድናችን እንዴት እንደሚጠቀምበት ይወቁ።',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
      dateEn: 'May 3, 2026',
      dateAm: 'ግንቦት 3, 2026',
      authorId: '2',
      authorNameEn: 'Dr. Birhanu Mengiste',
      authorNameAm: 'ዶ/ር ብርሃኑ መንግስቴ',
      readMin: 6,
      contentEn: `# The Revolution of Minimally Invasive Surgery\nLaparoscopic surgery, often termed "keyhole surgery," has replaced large open abdominal incisions with high-definition cameras and tiny instruments. \n\n## Key Advantages\nCompared to traditional open procedures, laparoscopic surgery offers remarkable patient benefits:\n* Considerably smaller scars and higher aesthetic preservation\n* Significantly lower post-operative pain and reliance on heavy analgesics\n* Shorter hospital stays, frequently enabling same-day discharge\n* Accelerated return to normal work and physical activity\n\n## Common Applications\nOur experienced surgical wing utilizes laparoscopy for:\n* Gallbladder removal (Cholecystectomy)\n* Appendix removal (Appendectomy)\n* Hernia repairs and diagnostic abdominal explorations\n\n**Doctor's Advice** If you are scheduled for an abdominal procedure, ask your surgeon if a laparoscopic option is suitable for you. Minimizing surgical trauma to the body is always our priority, allowing you to heal faster and return to your loved ones with absolute peace of mind.`,
      contentAm: `# የላፓሮስኮፒክ ቀዶ ጥገና ጥቅሞች\nየላፓሮስኮፒክ ቀዶ ጥገና (በካሜራ የሚደረግ ቀዶ ጥገና) ትላልቅ ክፍተቶችን በመተው በትንንሽ ቀዳዳዎች ውስጥ በሚገቡ ጥቃቅን የህክምና መሳሪያዎች እና ካሜራዎች የሚከናወን ዘመናዊ የቀዶ ጥገና ጥበብ ነው።\n\n## ዋና ዋና ጥቅሞች\nከተለመደው የቀዶ ጥገና አሰራር በተለየ መልኩ ላፓሮስኮፒክ ቀዶ ጥገና የሚከተሉትን የላቁ ጥቅሞች ይሰጣል፦\n* በጣም አነስተኛ ጠባሳ እና ፈጣን የመቁሰል መዳን\n* የቀዶ ጥገና ህመም በከፍተኛ ሁኔታ መቀነስ\n* በሆስፒታል ውስጥ የሚቆዩበትን ቀናት መቀነስ (በአብዛኛው በዕለቱ መውጣት ይቻላል)\n* በፍጥነት ወደ መደበኛ ስራ እና የዕለት ተዕለት እንቅስቃሴ መመለስ\n\n## በብዛት የሚተገበርባቸው ሁኔታዎች\nየእኛ ልምድ ያለው የቀዶ ጥገና ቡድን ላፓሮስኮፒን ለእነዚህ ህክምናዎች ይጠቀማል፦\n* የሐሞት ከረጢት ማስወገድ (Cholecystectomy)\n* የትርፍ አንጀት ማስወገድ (Appendectomy)\n* የእንቅርት (Hernia) ህክምና እና አጠቃላይ የሆድ ምርመራዎች\n\n**Doctor's Advice** ቀዶ ጥገና ከመደረግዎ በፊት በካሜራ (Laparoscopy) ሊደረግ የሚችል መሆን አለመሆኑን የቀዶ ጥገና ሐኪምዎን ይጠይቁ። በሰውነትዎ ላይ የሚደርሰውን የመቁረጥ ጉዳት መቀነስ ሁልጊዜ ቅድሚያ የምንሰጠው ጉዳይ ነው፤ ይህም በፍጥነት እንዲያገግሙ እና ሙሉ በሙሉ በሰላም ወደ ቤተሰብዎ እንዲመለሱ ይረዳል።`
    }
  ];

  await prisma.blogPost.deleteMany();
  for (const post of blogArticles) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('Blog posts seeded successfully!');

  // 7. Seed JobVacancies
  const careersData = [
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

  await prisma.jobVacancy.deleteMany();
  for (const job of careersData) {
    await prisma.jobVacancy.create({ data: job });
  }
  console.log('Job vacancies seeded successfully!');

  // 8. Seed InternshipPrograms
  const internshipPrograms = [
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

  await prisma.internshipProgram.deleteMany();
  for (const prog of internshipPrograms) {
    await prisma.internshipProgram.create({ data: prog });
  }
  console.log('Internship programs seeded successfully!');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
