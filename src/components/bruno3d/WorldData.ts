import * as THREE from 'three';

export interface Project3DData {
  id: string;
  title: string;
  tag: string;
  desc: string;
  techs: string[];
  image: string;
  githubUrl?: string;
  pos: [number, number, number];
}

export const PROJECTS_3D: Project3DData[] = [
  {
    id: 'rfid-student',
    title: 'Student Journey with RFID',
    tag: 'IoT & Web Platform',
    desc: 'Recording and managing student activities using RFID technology integrated with a high-throughput web system.',
    techs: ['.NET Core', 'C#', 'SQL Server', 'React', 'RFID API'],
    image: '/assets/img/portfolio/foto1.png',
    githubUrl: 'https://github.com/nau-fadh',
    pos: [18, 0, -14]
  },
  {
    id: 'qc-machining',
    title: 'Digitalisasi Form QC Machining',
    tag: 'Enterprise Manufacturing',
    desc: 'Developing a manufacturing website for real-time product quality checking and precision component tracking at PT GS Battery.',
    techs: ['ASP.NET', 'C#', 'DevExpress', 'SQL Server'],
    image: '/assets/img/portfolio/foto2.png',
    githubUrl: 'https://github.com/nau-fadh',
    pos: [28, 0, -14]
  },
  {
    id: 'astra-health',
    title: 'AstraHealth Clinic System',
    tag: 'Healthcare Management',
    desc: 'Web-based health records & medicines management system for campus health units, including student/staff medical logs and inventory.',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    image: '/assets/img/portfolio/foto3.png',
    githubUrl: 'https://github.com/nau-fadh',
    pos: [18, 0, -28]
  },
  {
    id: 'paperless-job',
    title: 'Paperless Job Applications',
    tag: 'Digital Transformation',
    desc: 'Digitizing manual job applications, multi-tier approvals, and workflows from paper forms into an automated modern web system.',
    techs: ['.NET Core', 'C#', 'PostgreSQL', 'Docker'],
    image: '/assets/img/portfolio/foto4.png',
    githubUrl: 'https://github.com/nau-fadh',
    pos: [28, 0, -28]
  }
];

export const SKILLS_LIST = [
  { name: '.NET 9', color: '#512bd4' },
  { name: 'C#', color: '#239120' },
  { name: 'ASP.NET', color: '#178600' },
  { name: 'React', color: '#0077b6' },
  { name: 'Next.js', color: '#111827' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'SQL Server', color: '#cc292b' },
  { name: 'Docker', color: '#0db7ed' },
  { name: 'DevExpress', color: '#ff8c00' },
  { name: 'Tailwind', color: '#06b6d4' },
  { name: 'REST API', color: '#6366f1' },
  { name: 'Git', color: '#f05032' },
  { name: 'Python', color: '#3776ab' },
  { name: 'Redis', color: '#dc2626' },
  { name: 'PostgreSQL', color: '#336791' }
];

export const CAREER_LIST = [
  {
    company: 'Agilis Solutions',
    role: 'Software Consultant / .NET Developer',
    period: 'May 2026 - Present',
    desc: 'Contract-based. Enterprise software architecture, legacy migrations to modern .NET, and robust API development.'
  },
  {
    company: 'PT GS Battery Indonesia',
    role: 'App Development Support',
    period: 'Nov 2025 - Apr 2026',
    desc: 'Customer Experience IT support, debugging enterprise systems, and custom feature implementations.'
  },
  {
    company: 'PT GS Battery Indonesia',
    role: 'Fullstack Developer Intern',
    period: 'Dec 2024 - Jun 2025',
    desc: 'VB.NET to ASP.NET migration, SQL Server optimization, and Android TV MAUI releases.'
  },
  {
    company: 'Astratech (Politeknik Astra)',
    role: 'D3 Informatics Management',
    period: '2022 - 2025',
    desc: 'Full Scholarship recipient from Astra Group. GPA: 3.44 / 4.00.'
  }
];

/**
 * Utility to generate crisp 2D text canvas textures with automatic font-size fitting
 */
export function createTextTexture(
  text: string,
  bgColor: string,
  textColor: string = '#ffffff',
  width = 1024,
  height = 256
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 14;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Auto-fit font size to ensure text never gets cut off
    let fontSize = Math.floor(height * 0.45);
    ctx.font = `bold ${fontSize}px Arial, -apple-system, sans-serif`;
    while (ctx.measureText(text).width > width - 60 && fontSize > 16) {
      fontSize -= 2;
      ctx.font = `bold ${fontSize}px Arial, -apple-system, sans-serif`;
    }

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates ultra-crisp highway signboards with distinct company header, role, and period
 */
export function createHighwaySignTexture(
  company: string,
  role: string,
  period: string,
  width = 2048,
  height = 512
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Rich highway overhead blue gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#0369a1');
    grad.addColorStop(1, '#075985');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // White highway sign border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 18;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Subtle inner accent line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 6;
    ctx.strokeRect(34, 34, width - 68, height - 68);

    // 1. Company Name (Top Line - Bold Vibrant Yellow)
    let compFont = 100;
    ctx.font = `black ${compFont}px Arial, sans-serif`;
    while (ctx.measureText(company).width > width - 120 && compFont > 30) {
      compFont -= 4;
      ctx.font = `black ${compFont}px Arial, sans-serif`;
    }
    ctx.fillStyle = '#fef08a'; // Vibrant yellow
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(company.toUpperCase(), width / 2, height * 0.35);

    // 2. Role & Period (Bottom Line - Crisp White)
    const subText = `${role}  •  ${period}`;
    let subFont = 58;
    ctx.font = `bold ${subFont}px Arial, sans-serif`;
    while (ctx.measureText(subText).width > width - 120 && subFont > 22) {
      subFont -= 2;
      ctx.font = `bold ${subFont}px Arial, sans-serif`;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillText(subText, width / 2, height * 0.72);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates high-resolution 3D digital electronic racing leaderboard texture
 */
export function createLeaderboardTexture(
  scores = [
    { rank: 1, name: 'NAUFAL FADHLURROHMAN', time: '00:24.82', badge: '🥇' },
    { rank: 2, name: 'SPEED DEMON (C# .NET)', time: '00:26.15', badge: '🥈' },
    { rank: 3, name: 'BRUNO GUEST RACER', time: '00:28.40', badge: '🥉' },
    { rank: 4, name: 'FULLSTACK DRIFTER', time: '00:31.95', badge: '⚡' },
    { rank: 5, name: 'ASP.NET TURBO DRIVER', time: '00:34.50', badge: '🏎️' },
  ],
  width = 2048,
  height = 1024
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark carbon fiber background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Glowing Neon Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 16;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 6;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Header Title
    ctx.fillStyle = '#fef08a';
    ctx.font = 'black 84px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏁 GRAND PRIX RACETRACK LEADERBOARD 🏁', width / 2, 110);

    // Header Divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 180);
    ctx.lineTo(width - 60, 180);
    ctx.stroke();

    // Table Column Headers
    ctx.font = 'bold 44px Arial, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText('POS', 90, 230);
    ctx.fillText('RACER NAME', 280, 230);
    ctx.textAlign = 'right';
    ctx.fillText('BEST LAP TIME', width - 100, 230);

    // Rows
    const rowYStart = 310;
    const rowHeight = 130;

    scores.forEach((s, idx) => {
      const y = rowYStart + idx * rowHeight;

      // Row background zebra stripe
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(60, y - 50, width - 120, 100);

      // Rank & Badge
      ctx.textAlign = 'left';
      ctx.font = 'bold 52px Arial, sans-serif';
      ctx.fillStyle = s.rank === 1 ? '#f59e0b' : s.rank === 2 ? '#e2e8f0' : s.rank === 3 ? '#b45309' : '#cbd5e1';
      ctx.fillText(`${s.badge} #${s.rank}`, 90, y);

      // Racer Name
      ctx.font = 'bold 50px Arial, sans-serif';
      ctx.fillStyle = s.rank === 1 ? '#ffffff' : '#e2e8f0';
      ctx.fillText(s.name, 280, y);

      // Lap Time (Digital Green / Amber)
      ctx.textAlign = 'right';
      ctx.font = 'black 54px monospace';
      ctx.fillStyle = s.rank === 1 ? '#10b981' : '#38bdf8';
      ctx.fillText(s.time, width - 100, y);
    });
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
