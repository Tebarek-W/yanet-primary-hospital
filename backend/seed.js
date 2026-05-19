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

  // 2. Seed Home Page Content
  const homePageContent = {
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
  };

  await prisma.page.upsert({
    where: { id: 'home' },
    update: { content: homePageContent },
    create: { id: 'home', content: homePageContent }
  });
  console.log('Home Page content seeded successfully!');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Adapter doesn't need custom disconnect if not required, but prisma.$disconnect is standard
    await prisma.$disconnect();
  });
