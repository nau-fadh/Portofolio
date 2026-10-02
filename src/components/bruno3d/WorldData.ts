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
 * Utility to generate crisp 2D text canvas textures for 3D billboards & physical blocks
 */
export function createTextTexture(text: string, bgColor: string, textColor: string = '#ffffff', width = 512, height = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 56px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
