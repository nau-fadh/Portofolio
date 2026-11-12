'use client';

import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { IntroTheme, REMOTION_PALETTES, RemotionPalette } from './remotionTheme';

export interface ShowreelProjectItem {
  id: number;
  tag: string;
  title: { en: string; id: string };
  description: { en: string; id: string };
  image: string;
  techs: string[];
  pipeline: [string, string, string];
  impact: { en: string; id: string };
}

export const SHOWREEL_PROJECTS: ShowreelProjectItem[] = [
  {
    id: 1,
    tag: 'IoT Integration',
    title: {
      en: 'Student Journey',
      id: 'Student Journey',
    },
    description: {
      en: 'Real-time student activity tracking powered by RFID hardware and dual-stack web APIs.',
      id: 'Pelacakan aktivitas mahasiswa real-time berbasis perangkat RFID dan API web terintegrasi.',
    },
    image: '/assets/img/portfolio/Picture1.png',
    techs: ['Laravel', 'ASP.NET', 'MySQL', 'RFID'],
    pipeline: ['RFID Tap', 'Laravel & .NET API', 'MySQL Logs'],
    impact: {
      en: 'Automated campus attendance & activity telemetry',
      id: 'Otomatisasi presensi & telemetri aktivitas kampus',
    },
  },
  {
    id: 2,
    tag: 'Manufacturing',
    title: {
      en: 'QC Machining Inspection',
      id: 'Digitalisasi QC Machining',
    },
    description: {
      en: 'End-to-end digital inspection & component traceability across web and native Android.',
      id: 'Inspeksi kualitas produk dan pelacakan komponen digital di web serta Android native.',
    },
    image: '/assets/img/portfolio/portfolio-4.jpg',
    techs: ['React.js', 'Spring', 'SSMS', 'Android Native'],
    pipeline: ['Android / React', 'Spring Boot API', 'SSMS Audit'],
    impact: {
      en: 'Zero-paper factory floor QC inspection workflow',
      id: 'Alur inspeksi QC lini produksi tanpa kertas',
    },
  },
  {
    id: 3,
    tag: 'Enterprise App',
    title: {
      en: 'AstraHealth',
      id: 'AstraHealth',
    },
    description: {
      en: 'Centralized campus clinic medical records, patient queue, and pharmacy inventory system.',
      id: 'Sistem terpusat rekam medis klinik kampus, data mahasiswa/karyawan, & stok obat.',
    },
    image: '/assets/img/portfolio/astrahealth.png',
    techs: ['ASP.NET', 'SSMS'],
    pipeline: ['Clinic Intake', 'ASP.NET Core', 'SSMS Medical DB'],
    impact: {
      en: 'Unified patient & drug inventory management',
      id: 'Manajemen pasien & inventaris obat terpadu',
    },
  },
  {
    id: 4,
    tag: 'Internal Tools',
    title: {
      en: 'Digitalisasi IT',
      id: 'Digitalisasi IT',
    },
    description: {
      en: 'Transforming manual paper IT request & approval workflows into a tracked web platform.',
      id: 'Transformasi formulir permohonan & persetujuan IT dari kertas ke sistem web terpusat.',
    },
    image: '/assets/img/portfolio/DigitalisasiIT.png',
    techs: ['ASP.NET', 'SSMS'],
    pipeline: ['Request Form', 'Approval Engine', 'SSMS Archive'],
    impact: {
      en: 'Traceable multi-stage IT request approvals',
      id: 'Persetujuan layanan IT multi-tahap yang terlacak',
    },
  },
];

export const PROJECT_SCENE_DURATION = 135; // 4.5s @ 30fps

export interface ProjectShowreelProps {
  theme: IntroTheme;
  language: 'id' | 'en';
  projectIndex?: number | null;
}

const ProjectScene: React.FC<{
  project: ShowreelProjectItem;
  sceneIndex: number;
  totalScenes: number;
  palette: RemotionPalette;
  language: 'id' | 'en';
}> = ({ project, sceneIndex, totalScenes, palette, language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene enter & exit transitions
  const enterOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(
    frame,
    [PROJECT_SCENE_DURATION - 14, PROJECT_SCENE_DURATION],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Screenshot Ken-Burns zoom & subtle float
  const imgScale = interpolate(frame, [0, PROJECT_SCENE_DURATION], [1.0, 1.09], {
    easing: Easing.out(Easing.quad),
  });
  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const textSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 18, stiffness: 130 },
  });

  // Animated data packet traveling across the 3-node architecture pipeline
  const packetProgress = interpolate(frame, [28, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity: enterOpacity * exitOpacity,
        padding: '44px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'monospace',
          fontSize: 14,
          letterSpacing: '0.16em',
          color: palette.muted,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: 999,
              backgroundColor: `${palette.primary}18`,
              border: `1px solid ${palette.primary}50`,
              color: palette.primary,
              fontWeight: 800,
              fontSize: 12,
            }}
          >
            {project.tag.toUpperCase()}
          </span>
          <span>ARCHITECTURE &amp; UI REEL</span>
        </div>
        <span>
          PROJECT 0{sceneIndex + 1} / 0{totalScenes}
        </span>
      </div>

      {/* Main 2-Column Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 44,
          alignItems: 'center',
        }}
      >
        {/* Left: Browser Mockup with Ken-Burns Screenshot */}
        <div
          style={{
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: palette.surface,
            border: `1px solid ${palette.border}`,
            boxShadow: `0 24px 60px rgba(0, 0, 0, 0.35), 0 0 36px ${palette.primary}18`,
            transform: `translateY(${interpolate(cardSpring, [0, 1], [32, 0])}px) scale(${interpolate(cardSpring, [0, 1], [0.95, 1])})`,
          }}
        >
          {/* Browser Chrome Dots */}
          <div
            style={{
              height: 34,
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: palette.surfaceElevated,
              borderBottom: `1px solid ${palette.border}`,
            }}
          >
            <div style={{ display: 'flex', gap: 7 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
            </div>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                color: palette.muted,
              }}
            >
              preview://naufal.dev/projects/{project.id}
            </span>
          </div>

          {/* Screenshot Stage */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 360,
              overflow: 'hidden',
              backgroundColor: '#0b1020',
            }}
          >
            <Img
              src={project.image}
              alt={project.title[language]}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${imgScale})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${palette.surface}cc 0%, transparent 42%)`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                left: 18,
                right: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: palette.primary,
                  boxShadow: `0 0 10px ${palette.primary}`,
                }}
              />
              <span>{project.impact[language]}</span>
            </div>
          </div>
        </div>

        {/* Right: Title, Description, Animated Pipeline, Tech Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            transform: `translateX(${interpolate(textSpring, [0, 1], [28, 0])}px)`,
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                margin: 0,
                color: palette.text,
              }}
            >
              {project.title[language]}
            </h2>
            <p
              style={{
                marginTop: 12,
                fontSize: 18,
                lineHeight: 1.55,
                color: palette.muted,
              }}
            >
              {project.description[language]}
            </p>
          </div>

          {/* Animated System Architecture Flow */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 16,
              backgroundColor: palette.surface,
              border: `1px solid ${palette.border}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: palette.primary,
              }}
            >
              SYSTEM DATA FLOW
            </span>

            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              {/* Connecting Track */}
              <div
                style={{
                  position: 'absolute',
                  left: '12%',
                  right: '12%',
                  top: '50%',
                  height: 2,
                  backgroundColor: `${palette.muted}35`,
                  transform: 'translateY(-50%)',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    width: `${packetProgress * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
                    boxShadow: `0 0 10px ${palette.primary}`,
                  }}
                />
              </div>

              {project.pipeline.map((node, idx) => {
                const nodeThreshold = idx * 0.38;
                const isActive = packetProgress >= nodeThreshold;
                return (
                  <div
                    key={node}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      padding: '10px 14px',
                      borderRadius: 12,
                      backgroundColor: isActive
                        ? palette.surfaceElevated
                        : palette.surface,
                      border: `1.5px solid ${
                        isActive ? palette.primary : `${palette.muted}40`
                      }`,
                      color: isActive ? palette.text : palette.muted,
                      fontSize: 13,
                      fontWeight: 700,
                      textAlign: 'center',
                      boxShadow: isActive ? `0 0 18px ${palette.primary}28` : 'none',
                    }}
                  >
                    {node}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Staggered Tech Stack Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {project.techs.map((tech, idx) => {
              const pillScale = spring({
                frame: Math.max(0, frame - 22 - idx * 5),
                fps,
                config: { damping: 14, stiffness: 160 },
              });
              return (
                <div
                  key={tech}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    backgroundColor: `${palette.primary}14`,
                    border: `1px solid ${palette.primary}40`,
                    color: palette.primary,
                    fontSize: 14,
                    fontWeight: 700,
                    transform: `scale(${pillScale})`,
                  }}
                >
                  {tech}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          width: '100%',
          height: 4,
          borderRadius: 999,
          backgroundColor: `${palette.muted}25`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, PROJECT_SCENE_DURATION], [0, 100])}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const ProjectShowreelComposition: React.FC<ProjectShowreelProps> = ({
  theme,
  language,
  projectIndex = null,
}) => {
  const palette = REMOTION_PALETTES[theme] || REMOTION_PALETTES.dark;
  const isSingle =
    typeof projectIndex === 'number' &&
    projectIndex >= 0 &&
    projectIndex < SHOWREEL_PROJECTS.length;

  const items = isSingle
    ? [SHOWREEL_PROJECTS[projectIndex]]
    : SHOWREEL_PROJECTS;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: palette.text,
      }}
    >
      {/* Blueprint Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(to right, ${palette.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${palette.grid} 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {items.map((proj, idx) => (
        <Sequence
          key={proj.id}
          from={idx * PROJECT_SCENE_DURATION}
          durationInFrames={PROJECT_SCENE_DURATION}
        >
          <ProjectScene
            project={proj}
            sceneIndex={isSingle ? projectIndex : idx}
            totalScenes={SHOWREEL_PROJECTS.length}
            palette={palette}
            language={language}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
