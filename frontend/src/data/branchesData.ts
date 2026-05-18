export interface BranchWorkingHours {
  weekdays: string;
  weekdaysAm: string;
  saturdays: string;
  saturdaysAm: string;
  sundays: string;
  sundaysAm: string;
  holidays: string;
  holidaysAm: string;
}

export interface BranchTheme {
  gradientClass: string;
  accentHex: string;
  secondaryHex: string;
  badgeBg: string;
  tagline: string;
  taglineAm: string;
  specialCardBg: string;
}

export interface Branch {
  slug: string;
  name: string;
  nameAm: string;
  city: string;
  cityAm: string;
  address: string;
  addressAm: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  workingHours: BranchWorkingHours;
  serviceSlugs: string[];
  doctorIds: string[];
  image: string;
  featuredServices: string[];
  featuredServicesAm: string[];
  theme: BranchTheme;
}

export const branchesData: Branch[] = [
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
