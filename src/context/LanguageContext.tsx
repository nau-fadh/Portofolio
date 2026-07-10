'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Data terjemahan dari script.js asli
export const translations = {
  en: {
    nav_home: "Home",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_contact: "Contact",
    hero_top_left: "Fullstack/.NET Specialist",
    hero_description: "This portfolio showcases authentic enterprise software development experience without any fabrication, specialized in building scalable systems, web application architectures, and robust APIs.",
    hero_contact: "Contact Me",
    hero_work: "My Work",
    hero_resume: "Get My Resume",
    skills_title_1: "My",
    skills_title_2: "Skills",
    skills_description: "I've worked with a variety of technologies in web development. Here are some of my core competencies.",
    skills_programming: "Programming Languages",
    skills_others: "Others",
    projects_title_1: "Featured",
    projects_title_2: "Projects",
    projects_description: "Here are some of my notable projects I've worked on. Each project was built with a unique approach to solve specific problems.",
    project1_description: "Recording and managing student activities using RFID technology integrated with a web system.",
    project2_title: "Digitalisasi Form Inspection Quality Control Machining",
    project2_description: "Developing a website for product checking and component recording.",
    project3_description: "Developing a web-based health data management system for the Campus Health Unit, including student/employee data and drug inventory.",
    project4_description: "Digitizing a job application and approval where the work is done through a paper form then digitizing it by creating a website.",
    view_code: "View Code",
    view_all_projects: "View All Projects",
    exp_section_title_1: "My",
    exp_section_title_2: "Journey",
    exp_section_description: "My professional experience and educational background in the tech industry.",
    tab_work: "Work Experience",
    tab_edu: "Education & Organizations",
    expNew_period: "May 2026 - Present",
    expNew_role: ".NET Developer",
    expNew_company: "Agilis Solutions",
    expNew_type: "Contract Based",
    expNew_task1: "Develop and implement new application features and migrate legacy modules to modern .NET framework versions.",
    expNew_task2: "Collaborate closely with Business Analysts to analyze requirements and design solid software architectures.",
    expNew_task3: "Analyze user needs and translate them into robust backend system integrations.",
    expNew_task4: "Ensure high-quality standards and optimal performance of API services.",
    exp0_period: "Nov 2025 - April 2026",
    exp0_role: "Contract Based.",
    exp0_task1: "Analyze, fix bugs, and develop new features as needed by the CS team",
    exp0_task2: "Provide technical support for internal users and customers experiencing technical problems",
    exp0_task3: "Analyze customer needs and translate them into software solutions",
    exp0_task4: "Collaborate with IT Developer and Customer Experience teams in improving service systems",
    exp1_period: "Dec 2024 - Jun 2025",
    exp1_role: "Internship Fullstack Developer.",
    exp1_task1: "Migrating applications from VB.NET to ASP.NET",
    exp1_task2: "Creating websites using .NET and SQL Server with DevExpress UI components",
    exp1_task3: "Releasing MAUI applications to Android TV",
    exp1_task4: "Developing RESTful API",
    exp2_title: "Fullstack Developer - Project Based",
    exp2_period: "Sep 2024 - Nov 2024",
    exp2_role: "Migrating legacy applications, monitoring IP document uploads, ensuring part change information is monitored, supporting PQE decisions.",
    exp2_task1: "Migration results from the legacy system used by the PQE department to upload and monitor IP data from Excel documents.",
    exp3_title: "Waspang Staff",
    exp3_period: "Dec 2021 - Nov 2022",
    exp3_role: "Mapping new networks and moving old networks.",
    exp3_task1: "Making drawings of a building and layout of a network path in AutoCad.",
    exp3_task2: "Mapping points from network creation and external network mapping on Google Earth.",
    exp3_task3: "Supervision of network construction carried out by technicians in the field.",
    edu1_title: "D3 Informatics Management",
    edu1_period: "Sep 2022 – Jul 2025",
    edu1_gpa: "GPA: 3.44 / 4.00",
    edu1_desc: "Full Scholarship Recipient from Astra Group through AHEMCE Group Komatsu Reimanufacturing Asia.",
    edu1_cert1: "MikroTik Certified Network Associate (MTCNA) – 2024",
    edu1_cert2: "Data Science Fundamental Certification – 2024",
    edu1_cert3: "AI Ignition Certification – 2024",
    org1_title: "Jurnalistik Astratech",
    org1_period: "Jan 2023 – Jan 2024",
    org1_role: "Member – Campus Journalism Organization",
    org1_task1: "Covering and writing news related to campus activities and issues.",
    org1_task2: "Creating creative content such as photos, videos, and publication materials.",
    org1_task3: "Organizing journalism training and workshops.",
    org2_title: "Astra Gema Islami (AGI)",
    org2_period: "Jan 2024 – Present",
    org2_role: "Member – Islamic Organization",
    org2_task1: "Assist in the implementation of each event held by AGI each year.",
    org2_task2: "Coordinate with food vendors to ensure timely delivery.",
    org2_task3: "Manage and supervise culinary bazaar stands.",
    contact_title_main: "Let's work together",
    footer_copyright: "© 2026 Naufal Fadhlurrohman."
  },
  id: {
    nav_home: "Beranda",
    nav_skills: "Keahlian",
    nav_projects: "Projek",
    nav_experience: "Pengalaman",
    nav_contact: "Kontak",
    hero_top_left: "Spesialis Fullstack/.NET",
    hero_description: "Portofolio ini menampilkan pengalaman asli pengembangan perangkat lunak enterprise tanpa fabrikasi atau rekayasa, fokus pada arsitektur web & skalabilitas sistem.",
    hero_contact: "Hubungi Saya",
    hero_work: "Karya Saya",
    hero_resume: "Unduh CV Saya",
    skills_title_1: "Keahlian",
    skills_title_2: "Saya",
    skills_description: "Saya telah bekerja dengan berbagai teknologi dalam pengembangan web. Berikut adalah beberapa kompetensi inti saya.",
    skills_programming: "Bahasa Pemrograman",
    skills_others: "Lainnya",
    projects_title_1: "Projek",
    projects_title_2: "Unggulan",
    projects_description: "Berikut adalah beberapa proyek penting yang telah saya kerjakan. Setiap proyek dibangun dengan pendekatan unik untuk memecahkan masalah spesifik.",
    project1_description: "Merekam dan mengelola aktivitas siswa menggunakan teknologi RFID yang terintegrasi dengan sistem web.",
    project2_title: "Digitalisasi Form Inspeksi Quality Control Machining",
    project2_description: "Mengembangkan website untuk pengecekan produk dan pencatatan komponen.",
    project3_description: "Mengembangkan sistem manajemen data kesehatan berbasis web untuk Unit Kesehatan Kampus, termasuk data mahasiswa/karyawan dan inventaris obat.",
    project4_description: "Mendigitalisasikan sebuah pekerjaan permohonan dan persetujuan dari formulir kertas ke sistem website terpusat.",
    view_code: "Lihat Kode",
    view_all_projects: "Lihat Semua Projek",
    exp_section_title_1: "Perjalanan",
    exp_section_title_2: "Saya",
    exp_section_description: "Pengalaman profesional dan latar belakang pendidikan saya di industri teknologi.",
    tab_work: "Pengalaman Kerja",
    tab_edu: "Pendidikan & Organisasi",
    expNew_period: "Mei 2026 - Sekarang",
    expNew_role: ".NET Developer",
    expNew_company: "Agilis Solutions",
    expNew_type: "Berbasis Kontrak",
    expNew_task1: "Mengembangkan dan mengimplementasikan fitur aplikasi baru serta memigrasikan modul lama ke versi framework .NET modern.",
    expNew_task2: "Bekerja sama secara erat dengan Business Analyst untuk menganalisis kebutuhan dan merancang arsitektur perangkat lunak yang solid.",
    expNew_task3: "Menganalisis kebutuhan pengguna dan menerjemahkannya ke dalam integrasi sistem backend yang tangguh.",
    expNew_task4: "Memastikan standar kualitas tinggi dan performa optimal dari layanan API.",
    exp0_period: "Nov 2025 - April 2026",
    exp0_role: "Berbasis Kontrak.",
    exp0_task1: "Menganalisis, memperbaiki bug, dan mengembangkan fitur baru sesuai kebutuhan tim CS",
    exp0_task2: "Memberikan dukungan teknis untuk pengguna internal dan pelanggan yang mengalami masalah teknis",
    exp0_task3: "Menganalisis kebutuhan pelanggan dan menerjemahkannya ke dalam solusi perangkat lunak",
    exp0_task4: "Berkolaborasi dengan tim IT Developer dan Customer Experience dalam meningkatkan sistem layanan",
    exp1_period: "Des 2024 - Jun 2025",
    exp1_role: "Magang Fullstack Developer.",
    exp1_task1: "Migrasi aplikasi dari VB.NET ke ASP.NET",
    exp1_task2: "Membuat website menggunakan .NET dan SQL Server dengan komponen UI DevExpress",
    exp1_task3: "Merilis aplikasi MAUI ke Android TV",
    exp1_task4: "Mengembangkan RESTful API",
    exp2_title: "Fullstack Developer - Berbasis Projek",
    exp2_period: "Sep 2024 - Nov 2024",
    exp2_role: "Migrasi aplikasi lama, memantau unggahan dokumen IP, memastikan informasi perubahan part dipantau, mendukung keputusan PQE.",
    exp2_task1: "Hasil migrasi dari sistem lama yang digunakan oleh departemen PQE untuk mengunggah dan memantau data IP dari dokumen Excel.",
    exp3_title: "Staff Waspang",
    exp3_period: "Des 2021 - Nov 2022",
    exp3_role: "Pemetaan jaringan baru dan pemindahan jaringan lama.",
    exp3_task1: "Membuat gambar bangunan dan tata letak jalur jaringan di AutoCad.",
    exp3_task2: "Memetakan titik-titik dari pembuatan jaringan dan pemetaan jaringan eksternal di Google Earth.",
    exp3_task3: "Pengawasan pembangunan jaringan yang dilakukan oleh teknisi di lapangan.",
    edu1_title: "D3 Manajemen Informatika",
    edu1_period: "Sep 2022 – Jul 2025",
    edu1_gpa: "IPK: 3.44 / 4.00",
    edu1_desc: "Penerima Beasiswa Penuh dari Astra Group melalui AHEMCE Group Komatsu Reimanufacturing Asia.",
    edu1_cert1: "MikroTik Certified Network Associate (MTCNA) – 2024",
    edu1_cert2: "Sertifikasi Data Science Fundamental – 2024",
    edu1_cert3: "Sertifikasi AI Ignition – 2024",
    org1_title: "Jurnalistik Kampus",
    org1_period: "Jan 2023 – Jan 2024",
    org1_role: "Anggota – Organisasi Jurnalistik Kampus",
    org1_task1: "Meliput dan menulis berita terkait kegiatan dan isu kampus.",
    org1_task2: "Membuat konten kreatif seperti foto, video, dan materi publikasi.",
    org1_task3: "Menyelenggarakan pelatihan jurnalistik dan workshop.",
    org2_title: "Astra Gema Islami (AGI)",
    org2_period: "Jan 2024 – Sekarang",
    org2_role: "Anggota – Organisasi Keislaman",
    org2_task1: "Membantu pelaksanaan setiap acara yang diadakan oleh AGI setiap tahun.",
    org2_task2: "Berkoordinasi dengan vendor makanan untuk memastikan pengiriman tepat waktu.",
    org2_task3: "Mengelola dan mengawasi stand bazar kuliner.",
    contact_title_main: "Ayo bekerja sama",
    footer_copyright: "© 2026 Naufal Fadhlurrohman."
  }
} as const;

export type TranslationKeys = keyof typeof translations.en;
export type Language = 'en' | 'id';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'id') {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
