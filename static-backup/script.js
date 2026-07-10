// Translation data diperbarui untuk komponen baru sesuai referensi gambar
const translations = {
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
        org1_title: "Jurnalistik Astratech",
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
};

let currentLanguage = localStorage.getItem('language') || 'en';
let currentSlide = 0;
let totalSlides = 4;
let slidesToShow = 1;
let carouselAutoPlay;

// ======================== ONE SINGLE INITIALIZER DOOR ========================
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLanguage);
    initCarousel();
    initHeroSlideshow();
    initSkillsBento();
    initCanvasParticles();
});

// ======================== LANGUAGE MANAGEMENT ========================
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    const enBtn = document.getElementById('lang-en');
    const idBtn = document.getElementById('lang-id');
    if (enBtn && idBtn) {
        enBtn.classList.toggle('active', lang === 'en');
        idBtn.classList.toggle('active', lang === 'id');
    }

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.documentElement.lang = lang;
}

document.getElementById('lang-en')?.addEventListener('click', () => switchLanguage('en'));
document.getElementById('lang-id')?.addEventListener('click', () => switchLanguage('id'));

// ======================== HERO SLIDESHOW ========================
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 4000);
}

// ======================== INTEGRATED CAROUSEL (Panah + Touch Support) ========================
function initCarousel() {
    const carousel = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');

    if (!carousel || !prevBtn || !nextBtn) return;

    function getSlidesToShow() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        slidesToShow = getSlidesToShow();
        const slideWidth = 100 / slidesToShow;
        carousel.style.transform = `translateX(${-(currentSlide * slideWidth)}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        const maxSlide = totalSlides - getSlidesToShow();
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateCarousel();
    }

    function prevSlide() {
        const maxSlide = totalSlides - getSlidesToShow();
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateCarousel();
    }

    carouselAutoPlay = setInterval(nextSlide, 5000);

    function resetAutoplay() {
        clearInterval(carouselAutoPlay);
        carouselAutoPlay = setInterval(nextSlide, 5000);
    }

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

    // Swipe Touch Support Terintegrasi
    let startX = 0, diffX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; clearInterval(carouselAutoPlay); }, { passive: true });
    carousel.addEventListener('touchmove', (e) => { diffX = startX - e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', () => {
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) nextSlide(); else prevSlide();
        }
        diffX = 0;
        resetAutoplay();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// ======================== CANVAS BACKGROUND ENGINE (Optimized) ========================
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: Math.random() * 1.5 + 0.5,
            size: Math.random() * 1.5 + 0.5
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(76, 201, 240, 0.15)"; /* Disesuaikan dengan warna primer dark mode */

        particles.forEach(p => {
            p.y += p.z * 0.5;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ======================== TILT CARD ENGINE (Smooth Transition) ========================
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width / 2;
        const y = (e.clientY - rect.top) - rect.height / 2;
        card.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0,0) scale(1)';
    });
});

// ======================== UTILITIES (Tab, Scroll, Resume) ========================
function switchTab(tab) {
    const workPanel = document.getElementById('panel-work');
    const eduPanel = document.getElementById('panel-edu');
    document.getElementById('tab-work')?.classList.toggle('tab-active', tab === 'work');
    document.getElementById('tab-edu')?.classList.toggle('tab-active', tab === 'edu');

    if (tab === 'work') {
        workPanel?.classList.remove('hidden');
        eduPanel?.classList.add('hidden');
    } else {
        eduPanel?.classList.remove('hidden');
        workPanel?.classList.add('hidden');
    }
}

function initSkillsBento() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        const glow = card.querySelector('.bento-glow');
        card.addEventListener('mousemove', (e) => {
            if (!glow) return;
            const rect = card.getBoundingClientRect();
            glow.style.left = (e.clientX - rect.left) + 'px';
            glow.style.top = (e.clientY - rect.top) + 'px';
        });
    });
}

// Mobile menu toggler
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));

// Global Anchor Links Smooth Scroll Engine (Compact Mode)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            // Diubah ke 78 agar pas mepet di bawah batas navbar tanpa memotong teks judul
            window.scrollTo({ top: targetElement.offsetTop - 78, behavior: 'smooth' });
            mobileMenu?.classList.add('hidden');
        }
    });
});

// Intersection Observer for General Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    observer.observe(element);
});

// Back to Top Button Behavior
const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Dynamic Resume File Downloader Engine
document.getElementById('download-resume')?.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = currentLanguage === 'id' ? "./assets/CV ATS NAUFAL FADHLURROHMAn V.IND.pdf" : "./assets/CV ATS NAUFAL FADHLURROHMAN  V.ENG.pdf";
    link.download = `CV_NAUFAL_FADHLURROHMAN_(${currentLanguage === 'id' ? 'Indonesia' : 'English'}).pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

function initSkillsBento() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        const glow = card.querySelector('.bento-glow');
        card.addEventListener('mousemove', (e) => {
            if (!glow) return;
            const rect = card.getBoundingClientRect();
            glow.style.left = (e.clientX - rect.left) + 'px';
            glow.style.top = (e.clientY - rect.top) + 'px';
        });
    });

    document.querySelectorAll('.bento-card').forEach(card => {
        card.classList.add('pills-visible');
    });
}

// ======================== SMART HEADER SCROLL DETECTOR ========================
const headerElement = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        headerElement?.classList.add('scrolled');
    } else {
        headerElement?.classList.remove('scrolled');
    }
});

// ======================== SCROLL-DRIVEN TEXT REVEAL ENGINE ========================
function initScrollTextReveal() {
    const container = document.querySelector('.scroll-reveal-container');
    const words = document.querySelectorAll('.reveal-word');

    if (!container || words.length === 0) return;

    window.addEventListener('scroll', () => {
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // Hitung seberapa jauh user telah men-scroll container ini (0 sampai 1)
        const scrollPercent = (scrollTop - containerTop) / (containerHeight - windowHeight);

        // Batasi nilai agar tetap di dalam range 0.0 - 1.0
        const clampedProgress = Math.max(0, Math.min(1, scrollPercent));

        // Bagi progress ke dalam 3 zona index kata
        const totalWords = words.length;
        const activeIndex = Math.floor(clampedProgress * totalWords);

        words.forEach((word, index) => {
            word.classList.remove('word-active', 'word-exit', 'word-upcoming');

            if (index === activeIndex && clampedProgress > 0 && clampedProgress < 1) {
                word.classList.add('word-active');
            } else if (index < activeIndex) {
                word.classList.add('word-exit');
            } else {
                word.classList.add('word-upcoming');
            }
        });
    });
}

// Pastikan fungsi ini dipanggil saat DOM dimuat
document.addEventListener('DOMContentLoaded', () => {
    initScrollTextReveal();
});

// ======================== API TERMINAL SIMULATOR DATA MATRIX ========================
const apiMockDatabase = {
    'get-profile': {
        status: "HTTP 200 OK",
        statusClass: ["bg-emerald-500/10", "text-emerald-400", "border-emerald-500/20"],
        data: {
            developer: "Naufal Fadhlurrohman",
            role: "Fullstack Developer / .NET Specialist",
            experience_sectors: ["Manufacturing Systems", "Enterprise Architecture", "IoT Logics"],
            core_runtime: ".NET Core 8.0 & ASP.NET WebAPI",
            architecture_pattern: "Clean Architecture / CQRS Pattern",
            status: "Ready_For_Deployment"
        }
    },
    'post-qc': {
        status: "HTTP 201 CREATED",
        statusClass: ["bg-amber-500/10", "text-amber-400", "border-amber-500/20"],
        data: {
            transaction: "Digitalisasi Form Inspection Quality Control",
            target_infrastructure: "PT GS Battery Indonesia / Machining Line",
            payload_received: {
                component_checking: "Product Verified",
                migration_source: "Legacy Excel / Paper Form Data",
                target_framework: "React.js client joined with Spring Boot server"
            },
            database_sync: "SSMS SQL Server - Execution Time: 14ms"
        }
    },
    'get-iot': {
        status: "HTTP 200 OK",
        statusClass: ["bg-emerald-500/10", "text-emerald-400", "border-emerald-500/20"],
        data: {
            module: "Student Journey Management Module",
            hardware_protocol: "RFID Card Identifier Reader Integration",
            system_bridge: "ASP.NET Backend & Laravel Core Interface Mapping",
            logs: [
                { timestamp: "2026-06-06T01:51:00Z", scan_status: "Identity_Authorized" },
                { database: "MySQL Data Storage State synchronized successfully" }
            ]
        }
    },
    'patch-infra': {
        status: "HTTP 200 OK",
        statusClass: ["bg-purple-500/10", "text-purple-400", "border-purple-500/20"],
        data: {
            devops_tooling: "Azure DevOps Pipelines Management",
            pipeline_state: "Continuous Integration / Continuous Deployment Enabled",
            source_control: "Git & GitHub Enterprise Organization Mapping",
            automated_tasks: ["Bug Analysis Fixes", "Feature Deployment Support", "CS Team Request Automation"]
        }
    }
};

function triggerApiSim(endpointKey, buttonElement) {
    const jsonOutput = document.getElementById('json-output');
    const statusBadge = document.getElementById('api-status');

    if (!jsonOutput || !apiMockDatabase[endpointKey]) return;

    // 1. Ubah status visual keaktifan tombol pengontrol
    document.querySelectorAll('.api-btn').forEach(btn => btn.classList.remove('active-btn'));
    buttonElement.classList.add('active-btn');

    // 2. Animasi Loading - Membuat efek simulasi jaringan tertunda sejenak
    jsonOutput.innerHTML = `<span class="text-gray-500">// Executing dotnet run pipeline...\n// Fetching from secure internal server...\n</span><span class="inline-block animate-spin text-cyan-400 mt-2"><i class="fas fa-spinner"></i></span>`;

    setTimeout(() => {
        const currentMock = apiMockDatabase[endpointKey];

        // 3. Update Status Badge HTTP (200 OK / 201 Created)
        if (statusBadge) {
            statusBadge.textContent = currentMock.status;
            statusBadge.className = "text-[10px] px-2 py-0.5 rounded border font-mono uppercase tracking-widest " + currentMock.statusClass.join(" ");
        }

        // 4. Cetak Data Objek JSON Terformat dengan Indentasi Rapi
        jsonOutput.textContent = JSON.stringify(currentMock.data, null, 4);
    }, 450); // Delay 450ms untuk feel simulasi aslinya
}

// Jalankan simulasi default pertama kali saat halaman terbuka
document.addEventListener('DOMContentLoaded', () => {
    const defaultBtn = document.querySelector('.api-btn');
    if (defaultBtn) triggerApiSim('get-profile', defaultBtn);
});

// ======================== RETRO CYBERPUNK DINO ARCADE ENGINE ========================
function initDinoGame() {
    const canvas = document.getElementById('dinoCanvas');
    const stage = document.getElementById('game-stage');
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDesc = document.getElementById('overlay-desc');
    const scoreDisplay = document.getElementById('dino-score');
    const highscoreDisplay = document.getElementById('dino-highscore');
    const mobileJumpBtn = document.getElementById('mobile-jump-btn');

    if (!canvas || !stage) return;
    const ctx = canvas.getContext('2d');

    // Atur dimensi resolusi internal canvas asli agar tajam
    canvas.width = 600;
    canvas.height = 150;

    // Game State Variables
    let isPlaying = false;
    let score = 0;
    let highscore = parseInt(localStorage.getItem('dino-highscore')) || 0;
    highscoreDisplay.textContent = String(highscore).padStart(5, '0');

    let animationId;
    let gameSpeed = 4.5;
    let obstacles = [];
    let nextObstacleTimer = 0;

    // Physics Settings
    const gravity = 0.55;

    // Entity Object: Dino Racer
    const dino = {
        x: 40,
        y: canvas.height - 35,
        width: 22,
        height: 28,
        vy: 0,
        isJumping: false,
        color: '#4cc9f0', // Cyan primary match

        draw() {
            ctx.fillStyle = this.color;
            // Badan & Kepala Dino Minimalis Vektor
            ctx.fillRect(this.x, this.y, this.width, this.height - 6);
            ctx.fillRect(this.x + 8, this.y - 6, 16, 10); // Kepala/Moncong
            ctx.fillStyle = '#10111a'; // Mata
            ctx.fillRect(this.x + 18, this.y - 3, 2, 2);
            // Kaki Depan & Belakang
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + 2, this.y + this.height - 6, 5, 6);
            ctx.fillRect(this.x + 14, this.y + this.height - 6, 5, 6);
        },
        jump() {
            if (!this.isJumping) {
                this.vy = -8.5;
                this.isJumping = true;
            }
        },
        update() {
            this.vy += gravity;
            this.y += this.vy;

            // Batas pijakan tanah canvas (Ground Level clamping)
            if (this.y > canvas.height - 34) {
                this.y = canvas.height - 34;
                this.vy = 0;
                this.isJumping = false;
            }
        }
    };

    // Obstacle Blueprint Class: Cyber Cactus
    class Cactus {
        constructor() {
            this.x = canvas.width;
            this.width = Math.random() > 0.6 ? 18 : 10; // Acak rintangan tunggal/ganda
            this.height = Math.random() * 15 + 20; // Acak tinggi kaktus
            this.y = canvas.height - this.height - 6;
            this.color = '#4361ee'; // Neon Blue secondary match
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            // Garis aksen siber kaktus agar terlihat futuristik
            ctx.fillStyle = '#ff006e';
            ctx.fillRect(this.x + (this.width / 2) - 1, this.y, 2, this.height);
        }
        update() {
            this.x -= gameSpeed;
        }
    }

    // Input Handling Engine
    function triggerJumpAction() {
        if (!isPlaying) {
            startGame();
        } else {
            dino.jump();
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            // Cegah halaman bergulir ke bawah saat menekan tombol spacebar di game area
            e.preventDefault();
            triggerJumpAction();
        }
    });

    stage.addEventListener('touchstart', (e) => {
        e.preventDefault();
        triggerJumpAction();
    }, { passive: false });

    stage.addEventListener('mousedown', () => {
        triggerJumpAction();
    });

    mobileJumpBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerJumpAction();
    });

    // Game Loops Controller
    function startGame() {
        isPlaying = true;
        score = 0;
        gameSpeed = 4.5;
        obstacles = [];
        nextObstacleTimer = 0;
        dino.y = canvas.height - 34;
        dino.vy = 0;
        overlay.classList.add('opacity-0', 'pointer-events-none');

        if (animationId) cancelAnimationFrame(animationId);
        runGameLoop();
    }

    function gameOver() {
        isPlaying = false;
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlayTitle.textContent = "GAME OVER";
        overlayDesc.textContent = "Press SPACE or TAP to retry";

        if (score > highscore) {
            highscore = score;
            localStorage.setItem('dino-highscore', highscore);
            highscoreDisplay.textContent = String(highscore).padStart(5, '0');
        }
        cancelAnimationFrame(animationId);
    }

    function runGameLoop() {
        if (!isPlaying) return;

        // Clear Canvas Stage Grid
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Minimalist Virtual Grid Line Horizon (Tanah Cyber)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - 6);
        ctx.lineTo(canvas.width, canvas.height - 6);
        ctx.stroke();

        // Dino Logic Update
        dino.update();
        dino.draw();

        // Spawn & Logic Obstacles
        if (nextObstacleTimer <= 0) {
            obstacles.push(new Cactus());
            // Berikan rentang waktu acak antar rintangan agar menantang
            nextObstacleTimer = Math.random() * 45 + 50;
        } else {
            nextObstacleTimer--;
        }

        for (let i = obstacles.length - 1; i >= 0; i--) {
            let obs = obstacles[i];
            obs.update();
            obs.draw();

            // Hitbox Collision Check (AABB Collision Matrix Box)
            if (dino.x < obs.x + obs.width &&
                dino.x + dino.width > obs.x &&
                dino.y < obs.y + obs.height &&
                dino.y + dino.height > obs.y) {
                gameOver();
                return;
            }

            // Hapus rintangan yang sudah lolos dari layar kiri agar hemat memori RAM
            if (obs.x + obs.width < 0) {
                obstacles.splice(i, 1);
            }
        }

        // Score Progression Mechanics
        score++;
        scoreDisplay.textContent = String(score).padStart(5, '0');

        // Tingkatkan kecepatan game secara berkala agar makin seru
        if (score % 400 === 0 && gameSpeed < 10) {
            gameSpeed += 0.5;
        }

        animationId = requestAnimationFrame(runGameLoop);
    }

    // Reset rendering kondisi awal canvas di menu layar pembuka
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw();
}

// Daftarkan fungsi pemicu ke pintu inisialisasi utama
document.addEventListener('DOMContentLoaded', () => {
    initDinoGame();
});

// ======================== PHYSICS-BASED 3D FLIP ID CARD ENGINE ========================
function initPhysicsIDCard() {
    const card = document.getElementById('interactive-id-card');
    const string = document.querySelector('.id-card-lanyard-string');

    if (!card) return;

    let rotation = 0;
    let rotationVelocity = 0;
    let targetRotation = 0;

    let isDragging = false;
    let startX = 0;
    let clickStartTime = 0;
    let isFlipped = false;

    const springStiffness = 0.035;
    const damping = 0.94;

    function onDragStart(e) {
        isDragging = true;
        clickStartTime = Date.now(); // Catat waktu awal klik untuk membedakan dengan drag
        startX = e.touches ? e.touches[0].clientX : e.clientX;
    }

    function onDragMove(e) {
        if (!isDragging) return;
        const currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;

        // Membatasi ayunan kemiringan saat diseret
        targetRotation = Math.max(-40, Math.min(40, deltaX * 0.15));
        rotation = targetRotation;

        applyPhysicsTransforms(rotation);
    }

    function onDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        targetRotation = 0;

        // JIKA DURASI KLIK CEPAT (Kurang dari 200 milidetik): Picu efek 3D Flip bolak-balik
        const clickDuration = Date.now() - clickStartTime;
        if (clickDuration < 200) {
            isFlipped = !isFlipped;
            card.classList.toggle('is-flipped', isFlipped);

            // Tambahkan sedikit hentakan efek kejut ayunan saat kartu dibalik
            rotationVelocity += isFlipped ? 8 : -8;
        }
    }

    function applyPhysicsTransforms(angle) {
        // Menggabungkan rotasi ayunan sumbu Z (Pegas) dengan rotasi sumbu Y (Flip 3D dihandle oleh kelas CSS)
        card.style.transform = `rotate(${angle}deg) translateY(${Math.abs(angle) * 0.1}px)`;
        if (string) {
            string.style.transform = `rotate(${angle * 0.5}deg)`;
        }
    }

    function updatePhysicsTick() {
        if (!isDragging) {
            const force = (targetRotation - rotation) * springStiffness;
            rotationVelocity += force;
            rotationVelocity *= damping;
            rotation += rotationVelocity;

            applyPhysicsTransforms(rotation);
        }
        requestAnimationFrame(updatePhysicsTick);
    }

    // Pasang Event Listeners
    card.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', (e) => isDragging && onDragMove(e));
    window.addEventListener('mouseup', onDragEnd);

    card.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', (e) => isDragging && onDragMove(e), { passive: true });
    window.addEventListener('touchend', onDragEnd);

    // Efek goyang halus saat kursor melintas (Hovering)
    window.addEventListener('mousemove', (e) => {
        if (isDragging) return;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        if (e.clientY > rect.top && e.clientY < rect.bottom && Math.abs(mouseX) < rect.width) {
            rotationVelocity += mouseX * 0.0008;
        }
    });

    updatePhysicsTick();
}

// Jalankan sistem saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    initPhysicsIDCard();
});

// Blokir Klik Kanan
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Blokir Shortcuts Inspect Element
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
    ) {
        e.preventDefault();
        return false;
    }
});