'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

interface Project {
  id: number;
  image: string;
  tag: string;
  titleKey?: string;
  titleText?: string;
  descKey: string;
  techs: Array<{ name: string; icon: string; colorClass: string }>;
  githubUrl?: string;
  isPrivate?: boolean;
}

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToDisplay, setSlidesToDisplay] = useState(3);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      image: "/assets/img/portfolio/Picture1.png",
      tag: "IoT & RFID Telemetry",
      titleText: "Student Journey",
      descKey: "project1_description",
      techs: [
        { name: "Laravel Core", icon: "fab fa-laravel", colorClass: "text-red-400" },
        { name: "ASP.NET API", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "MySQL Storage", icon: "fas fa-database", colorClass: "text-yellow-500" },
        { name: "RFID Protocol", icon: "fas fa-id-card", colorClass: "text-purple-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/Student-Journey"
    },
    {
      id: 2,
      image: "/assets/img/portfolio/portfolio-4.jpg",
      tag: "Industrial Manufacturing",
      titleKey: "project2_title",
      descKey: "project2_description",
      techs: [
        { name: "React.js Client", icon: "fab fa-react", colorClass: "text-cyan-400" },
        { name: "Spring Boot", icon: "fas fa-leaf", colorClass: "text-green-400" },
        { name: "SSMS SQL", icon: "fas fa-server", colorClass: "text-blue-400" },
        { name: "Android TV", icon: "fab fa-android", colorClass: "text-emerald-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/PROJEK-MII"
    },
    {
      id: 3,
      image: "/assets/img/portfolio/astrahealth.png",
      tag: "Healthcare Enterprise",
      titleText: "AstraHealth",
      descKey: "project3_description",
      techs: [
        { name: "ASP.NET Core", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "SSMS SQL Server", icon: "fas fa-server", colorClass: "text-blue-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/AstraHealth"
    },
    {
      id: 4,
      image: "/assets/img/portfolio/DigitalisasiIT.png",
      tag: "Process Automation",
      titleText: "Digitalisasi IT",
      descKey: "project4_description",
      techs: [
        { name: "ASP.NET Core", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "SSMS SQL Server", icon: "fas fa-server", colorClass: "text-blue-400" }
      ],
      isPrivate: true
    }
  ];

  const totalSlides = projects.length;

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToDisplay(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToDisplay(2);
      } else {
        setSlidesToDisplay(1);
      }
    };

    window.addEventListener('resize', updateSlidesToShow);
    updateSlidesToShow();

    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const maxSlide = Math.max(0, totalSlides - slidesToDisplay);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [slidesToDisplay]);

  // Touch Support
  const touchStartX = useRef<number>(0);
  const touchDiffX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDiffX.current = touchStartX.current - e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDiffX.current) > 50) {
      if (touchDiffX.current > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchDiffX.current = 0;
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#080809]/60 border-t border-white/[0.06]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* HEADER SECTION (OpenAI Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                02 // FEATURED SYSTEMS & DEPLOYMENTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {language === 'id' ? 'Projek & Rekayasa Perangkat Lunak' : 'Production Deployments & Systems'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
            {t('projects_description')}
          </p>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative max-w-6xl mx-auto">
          <div className="carousel-container overflow-hidden">
            <div
              ref={trackRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="carousel-track flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentSlide * 100) / slidesToDisplay}%)`,
              }}
            >
              {projects.map((proj) => {
                const title = proj.titleKey ? t(proj.titleKey as any) : proj.titleText;
                return (
                  <div
                    key={proj.id}
                    className="carousel-slide flex-shrink-0 px-4"
                    style={{ width: `${100 / slidesToDisplay}%` }}
                  >
                    <div className="card rounded-2xl overflow-hidden h-full flex flex-col justify-between bg-white/[0.02] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all">
                      <div>
                        <div className="relative h-48 w-full overflow-hidden border-b border-white/[0.08]">
                          <Image
                            src={proj.image}
                            alt={title || "Project"}
                            fill
                            className="w-full h-full object-cover project-img opacity-85 hover:opacity-100 transition-opacity"
                            unoptimized
                          />
                          <span className="absolute top-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md text-cyan-300 border border-white/10">
                            {proj.tag}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg md:text-xl font-bold mb-3 text-text tracking-tight">
                            {title}
                          </h3>
                          <p className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-6 font-sans">
                            {t(proj.descKey as any)}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.techs.map((tech, i) => (
                            <span key={i} className="proj-pill font-mono text-[10px] bg-white/[0.03] border border-white/10 text-neutral-300">
                              <i className={`${tech.icon} ${tech.colorClass} text-[10px]`}></i>
                              {tech.name}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-white/[0.08] flex">
                          {proj.isPrivate ? (
                            <span className="text-xs text-neutral-500 font-mono italic flex items-center gap-1.5">
                              <i className="fas fa-lock text-[10px]"></i> Enterprise Internal Artifact
                            </span>
                          ) : (
                            <a
                              href={proj.githubUrl}
                              className="proj-link group cursor-pointer font-mono text-xs text-neutral-200 hover:text-white flex items-center space-x-1.5"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>Inspect Source Code</span>
                              <span className="text-neutral-400 font-mono text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CAROUSEL NAVIGATION CONTROLS */}
          <button
            onClick={prevSlide}
            className="carousel-btn carousel-btn-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-[#080809]/90 hover:bg-neutral-800 backdrop-blur-md rounded-full p-3 shadow-2xl transition-all z-20 border border-white/10 cursor-pointer text-white"
            id="prevBtn"
            aria-label="Previous Project"
          >
            <svg className="w-4 h-4 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="carousel-btn carousel-btn-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-[#080809]/90 hover:bg-neutral-800 backdrop-blur-md rounded-full p-3 shadow-2xl transition-all z-20 border border-white/10 cursor-pointer text-white"
            id="nextBtn"
            aria-label="Next Project"
          >
            <svg className="w-4 h-4 text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* DOTS */}
          <div className="flex justify-center mt-10 space-x-2" id="dotsContainer">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === index ? 'active bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-neutral-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* VIEW ALL FOOTER LINK */}
        <div className="text-center mt-14 fade-in visible">
          <a
            href="https://github.com/naufalfadh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-7 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-neutral-200 rounded-full font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:scale-105"
          >
            <i className="fab fa-github text-sm"></i>
            <span>Browse Full GitHub Architecture Archive →</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
