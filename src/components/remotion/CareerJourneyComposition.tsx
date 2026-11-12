'use client';

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { IntroTheme, REMOTION_PALETTES, RemotionPalette } from './remotionTheme';

export const CAREER_CHAPTER_DURATION = 90; // 3s per chapter -> 4 chapters = 360 frames (12s @ 30fps)

interface CareerChapter {
  year: string;
  company: string;
  role: { en: string; id: string };
  badge: string;
  highlights: { en: string[]; id: string[] };
  colorKey: 'primary' | 'secondary' | 'accent';
}

const CHAPTERS: CareerChapter[] = [
  {
    year: '2021 – 2022',
    company: 'PT Telkom Akses Indonesia',
    role: {
      en: 'Waspang Staff • Infrastructure Division',
      id: 'Staff Waspang • Divisi Infrastruktur',
    },
    badge: 'CHAPTER 01 // NETWORK FOUNDATION',
    highlights: {
      en: [
        'AutoCAD building & network path blueprints',
        'External network point mapping on Google Earth',
        'Field supervision of technician deployments',
      ],
      id: [
        'Gambar tata letak jalur jaringan di AutoCAD',
        'Pemetaan titik jaringan di Google Earth',
        'Pengawasan konstruksi teknisi lapangan',
      ],
    },
    colorKey: 'secondary',
  },
  {
    year: '2022 – 2025',
    company: 'Astratech (Politeknik Astra)',
    role: {
      en: 'D3 Informatics Management • Full Astra Scholarship',
      id: 'D3 Manajemen Informatika • Beasiswa Penuh Astra',
    },
    badge: 'CHAPTER 02 // ACADEMIC & CERTIFICATIONS',
    highlights: {
      en: [
        'AHEMCE Group Komatsu Full Scholarship Recipient',
        'MikroTik Certified Network Associate (MTCNA)',
        'Data Science Fundamental & AI Ignition Certified',
      ],
      id: [
        'Penerima Beasiswa Penuh AHEMCE Group Komatsu',
        'Sertifikasi MikroTik MTCNA (2024)',
        'Sertifikasi Data Science & AI Ignition',
      ],
    },
    colorKey: 'primary',
  },
  {
    year: '2024 – 2026',
    company: 'Astra Honda Motor & PT GS Battery',
    role: {
      en: '.NET Developer & Application Support',
      id: '.NET Developer & Application Support',
    },
    badge: 'CHAPTER 03 // ENTERPRISE MIGRATION',
    highlights: {
      en: [
        'Migrated legacy VB.NET apps to modern ASP.NET Core',
        'Built PQE document monitoring & DevExpress web systems',
        'Released MAUI Android TV app & RESTful APIs',
      ],
      id: [
        'Migrasi sistem lama VB.NET ke ASP.NET Core modern',
        'Monitoring dokumen PQE & web DevExpress + SQL Server',
        'Rilis aplikasi MAUI Android TV & RESTful API',
      ],
    },
    colorKey: 'accent',
  },
  {
    year: '2026 – PRESENT',
    company: 'Agilis Solutions',
    role: {
      en: '.NET Developer • Software Consultant',
      id: '.NET Developer • Konsultan Perangkat Lunak',
    },
    badge: 'CHAPTER 04 // MODERN ARCHITECTURE',
    highlights: {
      en: [
        'Legacy module modernization to modern .NET',
        'Cross-functional architecture with Business Analysts',
        'High-performance enterprise API engineering',
      ],
      id: [
        'Modernisasi modul lama ke framework .NET terbaru',
        'Perancangan arsitektur bersama Business Analyst',
        'Rekayasa layanan API enterprise berkinerja tinggi',
      ],
    },
    colorKey: 'primary',
  },
];

const ChapterScene: React.FC<{
  chapter: CareerChapter;
  index: number;
  palette: RemotionPalette;
  language: 'id' | 'en';
}> = ({ chapter, index, palette, language }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accentColor = palette[chapter.colorKey];

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const fadeOut = interpolate(
    frame,
    [CAREER_CHAPTER_DURATION - 12, CAREER_CHAPTER_DURATION],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(enter, [0, 1], [0, 1]) * fadeOut,
        padding: '48px 68px 110px 68px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* Badge + Year */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            padding: '6px 14px',
            borderRadius: 999,
            backgroundColor: `${accentColor}1a`,
            border: `1px solid ${accentColor}55`,
            color: accentColor,
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.14em',
          }}
        >
          {chapter.badge}
        </span>

        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 22,
            fontWeight: 900,
            color: accentColor,
          }}
        >
          {chapter.year}
        </span>
      </div>

      {/* Company & Role */}
      <div
        style={{
          transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 50,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: palette.text,
            lineHeight: 1.1,
          }}
        >
          {chapter.company}
        </h2>
        <p
          style={{
            marginTop: 10,
            fontSize: 21,
            fontWeight: 700,
            color: palette.muted,
          }}
        >
          {chapter.role[language]}
        </p>
      </div>

      {/* Staggered Highlight Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
          marginTop: 8,
        }}
      >
        {chapter.highlights[language].map((item, i) => {
          const itemSpring = spring({
            frame: Math.max(0, frame - 12 - i * 7),
            fps,
            config: { damping: 15, stiffness: 140 },
          });

          return (
            <div
              key={item}
              style={{
                padding: '20px 22px',
                borderRadius: 18,
                backgroundColor: palette.surface,
                border: `1px solid ${palette.border}`,
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                opacity: interpolate(itemSpring, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(itemSpring, [0, 1], [20, 0])}px)`,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  fontWeight: 800,
                  color: accentColor,
                }}
              >
                0{index + 1}.{i + 1}
              </span>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.45,
                  color: palette.text,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export interface CareerJourneyProps {
  theme: IntroTheme;
  language: 'id' | 'en';
}

export const CareerJourneyComposition: React.FC<CareerJourneyProps> = ({
  theme,
  language,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const palette = REMOTION_PALETTES[theme] || REMOTION_PALETTES.dark;

  const overallProgress = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const activeChapterIndex = Math.min(
    CHAPTERS.length - 1,
    Math.floor(frame / CAREER_CHAPTER_DURATION)
  );

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

      {CHAPTERS.map((chapter, idx) => (
        <Sequence
          key={chapter.company}
          from={idx * CAREER_CHAPTER_DURATION}
          durationInFrames={CAREER_CHAPTER_DURATION}
        >
          <ChapterScene
            chapter={chapter}
            index={idx}
            palette={palette}
            language={language}
          />
        </Sequence>
      ))}

      {/* Persistent Timeline Scrubber Footer */}
      <AbsoluteFill
        style={{
          top: 'auto',
          height: 88,
          padding: '0 68px 28px 68px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {CHAPTERS.map((c, i) => (
            <span
              key={c.year}
              style={{
                color: i <= activeChapterIndex ? palette.primary : palette.muted,
                opacity: i === activeChapterIndex ? 1 : 0.6,
              }}
            >
              {c.year}
            </span>
          ))}
        </div>

        <div
          style={{
            width: '100%',
            height: 6,
            borderRadius: 999,
            backgroundColor: `${palette.muted}25`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${overallProgress}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${palette.secondary}, ${palette.primary}, ${palette.accent})`,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
