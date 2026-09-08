'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  size: number;
  color: string;
}

const AstraSphereCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Inisialisasi 320 titik Fibonacci Sphere
    const numPoints = 300;
    const points: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle (~2.39996 rad)

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y dari 1 ke -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Variasi ukuran bintang
      const isAnchor = i % 12 === 0;
      points.push({
        x,
        y,
        z,
        baseRadius: 1,
        size: isAnchor ? 2.5 : Math.random() * 1.2 + 0.8,
        color: isAnchor ? '#4cc9f0' : i % 5 === 0 ? '#4361ee' : '#ffffff',
      });
    }

    // Variabel rotasi & interaksi kursor
    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      mouseX = nx;
      mouseY = ny;
      targetRotY = mouseX * 0.8;
      targetRotX = 0.2 + mouseY * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotasi kontinu perlahan + interpolasi mouse
      rotY += 0.003;
      const curRotX = rotX + (targetRotX - rotX) * 0.05;
      const curRotY = rotY + (targetRotY * 0.2);
      rotX = curRotX;

      const sphereRadius = Math.min(width, height) * 0.38;
      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const fov = 450;

      // Soft Central Core Starlight Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.1,
        centerX,
        centerY,
        sphereRadius * 1.4
      );
      glowGrad.addColorStop(0, 'rgba(67, 97, 238, 0.18)');
      glowGrad.addColorStop(0.4, 'rgba(76, 201, 240, 0.08)');
      glowGrad.addColorStop(1, 'rgba(8, 8, 9, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Transformasi 3D ke 2D
      const cosY = Math.cos(curRotY);
      const sinY = Math.sin(curRotY);
      const cosX = Math.cos(curRotX);
      const sinX = Math.sin(curRotX);

      const projected: Array<{
        px: number;
        py: number;
        pz: number;
        scale: number;
        alpha: number;
        size: number;
        color: string;
      }> = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotasi Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotasi X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Skala 3D
        const x3D = x1 * sphereRadius;
        const y3D = y2 * sphereRadius;
        const z3D = z2 * sphereRadius;

        // Proyeksi Perspektif
        const scale = fov / (fov + z3D + sphereRadius * 0.5);
        const px = centerX + x3D * scale;
        const py = centerY + y3D * scale;

        // Kedalaman visual (Z-Depth alpha: 0.1 di belakang, 1.0 di depan)
        const depthNorm = (z2 + 1) / 2; // 0 to 1
        const alpha = Math.max(0.08, Math.min(1, Math.pow(depthNorm, 1.4)));

        projected.push({
          px,
          py,
          pz: z2,
          scale,
          alpha,
          size: p.size * scale,
          color: p.color,
        });
      }

      // 1. Gambar Neural Filaments (Garis penghubung antar node terdekat)
      const maxConnectDist = sphereRadius * 0.38;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.alpha < 0.2) continue; // Hemat render untuk node belakang

        // Hubungkan ke sebagian node terdekat
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * Math.min(p1.alpha, p2.alpha) * 0.35;
            if (lineAlpha > 0.02) {
              ctx.strokeStyle = `rgba(76, 201, 240, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Gambar Node Bintang (Star Particles)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        // Glow ring untuk node depan
        if (p.alpha > 0.6) {
          ctx.fillStyle = `rgba(76, 201, 240, ${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inti bintang
        ctx.fillStyle = p.color === '#ffffff' 
          ? `rgba(255, 255, 255, ${p.alpha})` 
          : p.color === '#4cc9f0'
          ? `rgba(76, 201, 240, ${p.alpha})`
          : `rgba(67, 97, 238, ${p.alpha})`;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Lingkaran Orbit Aksial Halus (Equatorial & Polar subtle rings)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, sphereRadius * 1.08, sphereRadius * 0.45, curRotY * 0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};

export default AstraSphereCanvas;
