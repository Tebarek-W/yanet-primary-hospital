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
    console.log(`${page.id.toUpperCase()} Page content seeded successfully!`);
  }

  // 3. Seed Doctors
  const staticDoctors = [
    {
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

  const defaultStaffPassword = await bcrypt.hash('yanetstaff123', 10);

  for (const doc of staticDoctors) {
    const existing = await prisma.doctor.findUnique({ where: { email: doc.email } });
    const doctorData = { ...doc, password: defaultStaffPassword, branchSlugs: [] };
    if (!existing) {
      await prisma.doctor.create({ data: doctorData });
      console.log(`Doctor ${doc.name} seeded.`);
    } else {
      await prisma.doctor.update({ where: { email: doc.email }, data: doctorData });
      console.log(`Doctor ${doc.name} updated.`);
    }
  }

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

