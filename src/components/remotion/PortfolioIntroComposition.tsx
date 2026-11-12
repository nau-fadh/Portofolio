'use client';

import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type IntroTheme = 'dark' | 'light' | 'ocean';

export interface PortfolioIntroProps {
  theme: IntroTheme;
  language: 'id' | 'en';
}

const PALETTES: Record<
  IntroTheme,
  {
    bg: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
    grid: string;
    watermark: string;
  }
> = {
  dark: {
    bg: '#1a1a2e',
    surface: '#16213e',
    primary: '#4cc9f0',
    secondary: '#4361ee',
    accent: '#ff006e',
    text: '#f8f9fa',
    muted: '#94a3b8',
    grid: 'rgba(76, 201, 240, 0.08)',
    watermark: 'rgba(255, 255, 255, 0.035)',
  },
  light: {
    bg: '#f3f4f6',
    surface: '#ffffff',
    primary: '#0077b6',
    secondary: '#0096c7',
    accent: '#ff006e',
    text: '#1f2937',
    muted: '#64748b',
    grid: 'rgba(0, 119, 182, 0.09)',
    watermark: 'rgba(31, 41, 55, 0.045)',
  },
  ocean: {
    bg: '#0a192f',
    surface: '#112240',
    primary: '#06d6a0',
    secondary: '#118ab2',
    accent: '#ffd166',
    text: '#ccd6f6',
    muted: '#8892b0',
    grid: 'rgba(6, 214, 160, 0.08)',
    watermark: 'rgba(204, 214, 246, 0.04)',
  },
};

const ROLES = [
  'FULLSTACK DEVELOPER',
  'API ENGINEER',
  '.NET SPECIALIST',
];

export const PortfolioIntroComposition: React.FC<PortfolioIntroProps> = ({
  theme,
  language,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const palette = PALETTES[theme] || PALETTES.dark;

  // Global intro fade-in and subtle outro scale/fade
  const introOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outroProgress = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const stageScale = interpolate(outroProgress, [0, 1], [1, 1.04]);
  const stageOpacity = interpolate(outroProgress, [0, 1], [1, 0]);

  // Ambient glow pulse
  const glowScale = interpolate(frame, [0, 50, 110], [0.65, 1.12, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Grid reveal
  const gridOpacity = interpolate(frame, [2, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Watermark typography drift
  const watermarkX = interpolate(frame, [0, durationInFrames], [40, -25]);
  const watermarkOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Emblem & brackets animation
  const emblemSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.8 },
  });

  const orbitRotation = interpolate(frame, [0, durationInFrames], [0, 160]);

  // Name reveal
  const nameSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.9 },
  });

  const lineWidth = interpolate(frame, [30, 62], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.exp),
  });

  // Progress & boot status
  const loadingPercent = Math.round(
    interpolate(frame, [0, durationInFrames - 16], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.quad),
    })
  );

  const bootSteps = [
    { threshold: 0, label: language === 'id' ? 'MEMUAT KERNEL UI...' : 'INITIALIZING UI KERNEL...' },
    { threshold: 28, label: language === 'id' ? 'MENYELARASKAN MODUL .NET & API...' : 'SYNCING .NET & API MODULES...' },
    { threshold: 60, label: language === 'id' ? 'MENYIAPKAN KANVAS INTERAKTIF...' : 'MOUNTING INTERACTIVE CANVAS...' },
    { threshold: 88, label: language === 'id' ? 'SIAP DILUNCURKAN' : 'SYSTEM READY' },
  ];

  const currentBootLabel =
    [...bootSteps].reverse().find((step) => frame >= step.threshold)?.label ||
    bootSteps[0].label;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.bg,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        color: palette.text,
        overflow: 'hidden',
        opacity: introOpacity * stageOpacity,
        transform: `scale(${stageScale})`,
      }}
    >
      {/* Subtle Blueprint Grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(to right, ${palette.grid} 1px, transparent 1px),
            linear-gradient(to bottom, ${palette.grid} 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial Ambient Glow */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 680,
            height: 680,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${palette.primary}26 0%, ${palette.secondary}18 38%, transparent 72%)`,
            transform: `scale(${glowScale})`,
            filter: 'blur(24px)',
          }}
        />
      </AbsoluteFill>

      {/* Giant Watermark Background Typography */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: watermarkOpacity,
        }}
      >
        <div
          style={{
            fontSize: 190,
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: palette.watermark,
            transform: `translateX(${watermarkX}px)`,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          PORTOFOLIO
        </div>
      </AbsoluteFill>

      {/* Main Center Stage */}
      <AbsoluteFill
        style={{
          padding: '56px 72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Metadata Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 16,
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            color: palette.muted,
            opacity: interpolate(frame, [4, 20], [0, 0.85], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: palette.primary,
                boxShadow: `0 0 14px ${palette.primary}`,
                display: 'inline-block',
              }}
            />
            <span>NAUFAL.FADHLURROHMAN</span>
          </div>
          <span>EDITION 2026</span>
        </div>

        {/* Center Hero Kinetic Sequence */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          {/* Animated Monogram Badge */}
          <div
            style={{
              position: 'relative',
              width: 112,
              height: 112,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${emblemSpring})`,
            }}
          >
            {/* Outer Orbital Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '28px',
                border: `2px dashed ${palette.primary}66`,
                transform: `rotate(${orbitRotation}deg)`,
              }}
            />
            {/* Inner Core Card */}
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: '22px',
                background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 16px 40px ${palette.primary}40`,
                fontSize: 30,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.04em',
              }}
            >
              NF
            </div>
          </div>

          {/* Main Name Typography */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textAlign: 'center',
                lineHeight: 1.05,
                transform: `translateY(${interpolate(nameSpring, [0, 1], [44, 0])}px)`,
                opacity: interpolate(nameSpring, [0, 1], [0, 1]),
              }}
            >
              NAUFAL FADHLURROHMAN
            </div>

            {/* Expanding Gradient Underline */}
            <div
              style={{
                width: 340,
                height: 4,
                borderRadius: 999,
                backgroundColor: `${palette.muted}25`,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${lineWidth}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})`,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>

          {/* Staggered Role Pills */}
          <Sequence from={32} layout="none">
            <div
              style={{
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {ROLES.map((role, index) => {
                const pillProgress = spring({
                  frame: Math.max(0, frame - 34 - index * 6),
                  fps,
                  config: { damping: 15, stiffness: 150 },
                });
                return (
                  <div
                    key={role}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 999,
                      backgroundColor: `${palette.surface}`,
                      border: `1px solid ${palette.primary}40`,
                      color: index === 0 ? palette.primary : palette.text,
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      opacity: interpolate(pillProgress, [0, 1], [0, 1]),
                      transform: `translateY(${interpolate(
                        pillProgress,
                        [0, 1],
                        [18, 0]
                      )}px) scale(${interpolate(pillProgress, [0, 1], [0.92, 1])})`,
                      boxShadow: `0 8px 24px rgba(0,0,0,0.12)`,
                    }}
                  >
                    {role}
                  </div>
                );
              })}
            </div>
          </Sequence>
        </div>

        {/* Bottom Progress & Boot Telemetry */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: 15,
              letterSpacing: '0.08em',
            }}
          >
            <span style={{ color: palette.muted }}>{currentBootLabel}</span>
            <span
              style={{
                color: palette.primary,
                fontWeight: 800,
                fontSize: 18,
              }}
            >
              {loadingPercent}%
            </span>
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
                width: `${loadingPercent}%`,
                height: '100%',
                borderRadius: 999,
                background: `linear-gradient(90deg, ${palette.primary}, ${palette.secondary})`,
                boxShadow: `0 0 18px ${palette.primary}80`,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
