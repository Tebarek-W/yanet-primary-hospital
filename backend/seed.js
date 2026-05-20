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

