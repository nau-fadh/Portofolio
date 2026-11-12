export type IntroTheme = 'dark' | 'light' | 'ocean';

export interface RemotionPalette {
  bg: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
  grid: string;
  watermark: string;
}

export const REMOTION_PALETTES: Record<IntroTheme, RemotionPalette> = {
  dark: {
    bg: '#1a1a2e',
    surface: '#16213e',
    surfaceElevated: '#1f2b4d',
    primary: '#4cc9f0',
    secondary: '#4361ee',
    accent: '#ff006e',
    text: '#f8f9fa',
    muted: '#94a3b8',
    border: 'rgba(76, 201, 240, 0.22)',
    grid: 'rgba(76, 201, 240, 0.08)',
    watermark: 'rgba(255, 255, 255, 0.035)',
  },
  light: {
    bg: '#f3f4f6',
    surface: '#ffffff',
    surfaceElevated: '#f8fafc',
    primary: '#0077b6',
    secondary: '#0096c7',
    accent: '#ff006e',
    text: '#1f2937',
    muted: '#64748b',
    border: 'rgba(0, 119, 182, 0.2)',
    grid: 'rgba(0, 119, 182, 0.09)',
    watermark: 'rgba(31, 41, 55, 0.045)',
  },
  ocean: {
    bg: '#0a192f',
    surface: '#112240',
    surfaceElevated: '#172a4d',
    primary: '#06d6a0',
    secondary: '#118ab2',
    accent: '#ffd166',
    text: '#ccd6f6',
    muted: '#8892b0',
    border: 'rgba(6, 214, 160, 0.22)',
    grid: 'rgba(6, 214, 160, 0.08)',
    watermark: 'rgba(204, 214, 246, 0.04)',
  },
};
