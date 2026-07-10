'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const IDCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const stringRef = useRef<HTMLDivElement | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const string = stringRef.current;
    if (!card) return;

    let rotation = 0;
    let targetRotation = 0;
    let rotationVelocity = 0;
    const springStiffness = 0.05;
    const damping = 0.90;

    let isDragging = false;
    let startX = 0;
    let clickStartTime = 0;
    let animationFrameId: number;

    const applyPhysicsTransforms = (angle: number) => {
      if (card) {
        card.style.transform = `rotate(${angle}deg) translateY(${Math.abs(angle) * 0.1}px)`;
      }
      if (string) {
        string.style.transform = `rotate(${angle * 0.5}deg)`;
      }
    };

    const updatePhysicsTick = () => {
      if (!isDragging) {
        const force = (targetRotation - rotation) * springStiffness;
        rotationVelocity += force;
        rotationVelocity *= damping;
        rotation += rotationVelocity;

        applyPhysicsTransforms(rotation);
      }
      animationFrameId = requestAnimationFrame(updatePhysicsTick);
    };

    const onDragStart = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      clickStartTime = Date.now();
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const onDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - startX;

      targetRotation = Math.max(-40, Math.min(40, deltaX * 0.15));
      rotation = targetRotation;

      applyPhysicsTransforms(rotation);
    };

    const onDragEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      targetRotation = 0;

      const clickDuration = Date.now() - clickStartTime;
      if (clickDuration < 200) {
        setFlipped(prev => {
          const next = !prev;
          rotationVelocity += next ? 8 : -8;
          return next;
        });
      }
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onDragMove(e);
      } else {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - (rect.left + rect.width / 2);
        if (e.clientY > rect.top && e.clientY < rect.bottom && Math.abs(mouseX) < rect.width) {
          rotationVelocity += mouseX * 0.0008;
        }
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        onDragMove(e);
      }
    };

    // Event listeners
    card.addEventListener('mousedown', onDragStart as any);
    card.addEventListener('touchstart', onDragStart as any, { passive: true });
    
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);

    updatePhysicsTick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      card.removeEventListener('mousedown', onDragStart as any);
      card.removeEventListener('touchstart', onDragStart as any);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  return (
    <div className="hero-id-card-area select-none">
      {/* Tali Lanyard Digital */}
      <div ref={stringRef} className="id-card-lanyard-string"></div>

      {/* Badan ID Card Utama */}
      <div
        ref={cardRef}
        className={`id-card-body-container ${flipped ? 'is-flipped' : ''}`}
        id="interactive-id-card"
      >
        {/* Badge Klip Pengait Lanyard */}
        <div className="id-card-clip"></div>

        {/* 3D Card Flipper Wrapper */}
        <div className="id-card-flipper">
          {/* SISI DEPAN (FRONT FACE) */}
          <div className="id-card-front">
            <div className="id-card-photo-wrapper relative w-full h-full">
              <Image
                src="/assets/img/portfolio/EST02632.png"
                alt="Naufal Front"
                fill
                priority
                className="id-card-img-render object-cover"
                unoptimized
              />
            </div>
            {/* Indikator Geser/Klik Kecil Modern di Bagian Bawah Kartu */}
            <div className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-mono tracking-widest text-gray-500 uppercase">
              <i className="fas fa-sync-alt animate-spin-slow mr-1"></i> Click to Flip Card
            </div>
          </div>

          {/* SISI BELAKANG (BACK FACE) */}
          <div className="id-card-back">
            <div className="id-card-photo-wrapper relative w-full h-full">
              <Image
                src="/assets/img/portfolio/A1.png"
                alt="Naufal Back"
                fill
                className="id-card-img-render object-cover"
                unoptimized
              />
            </div>
            {/* Indikator Aksen Barcode Karyawan Estetika Manufaktur */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-6 opacity-30 flex items-center justify-center border-t border-b border-white border-dashed text-[8px] font-mono tracking-[0.3em] text-white">
              ||||| NAUFAL-F |||||
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;
