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
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToDisplay, setSlidesToDisplay] = useState(3);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      image: "/assets/img/portfolio/Picture1.png",
      tag: "IoT Integration",
      titleText: "Student Journey",
      descKey: "project1_description",
      techs: [
        { name: "Laravel", icon: "fab fa-laravel", colorClass: "text-red-400" },
        { name: "ASP.NET", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "MySQL", icon: "fas fa-database", colorClass: "text-yellow-500" },
        { name: "RFID", icon: "fas fa-id-card", colorClass: "text-purple-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/Student-Journey"
    },
    {
      id: 2,
      image: "/assets/img/portfolio/portfolio-4.jpg",
      tag: "Manufacturing",
      titleKey: "project2_title",
      descKey: "project2_description",
      techs: [
        { name: "React.js", icon: "fab fa-react", colorClass: "text-cyan-400" },
        { name: "Spring", icon: "fas fa-leaf", colorClass: "text-green-400" },
        { name: "SSMS", icon: "fas fa-server", colorClass: "text-blue-400" },
        { name: "Android Native", icon: "fab fa-android", colorClass: "text-emerald-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/PROJEK-MII"
    },
    {
      id: 3,
      image: "/assets/img/portfolio/astrahealth.png",
      tag: "Enterprise App",
      titleText: "AstraHealth",
      descKey: "project3_description",
      techs: [
        { name: "ASP.NET", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "SSMS", icon: "fas fa-server", colorClass: "text-blue-400" }
      ],
      githubUrl: "https://github.com/naufalfadh/AstraHealth"
    },
    {
      id: 4,
      image: "/assets/img/portfolio/DigitalisasiIT.png",
      tag: "Internal Tools",
      titleText: "Digitalisasi IT",
      descKey: "project4_description",
      techs: [
        { name: "ASP.NET", icon: "fab fa-microsoft", colorClass: "text-blue-400" },
        { name: "SSMS", icon: "fas fa-server", colorClass: "text-blue-400" }
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [slidesToDisplay]); // Reset timer on slides display resize

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
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-500 border-opacity-10 pb-8">
          <div className="fade-in visible">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-text">
              FEATURED <span className="gradient-text">PROJECTS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed opacity-70 fade-in visible text-gray-400">
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
                    <div className="card rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                      <div>
                        <div className="relative h-48 w-full overflow-hidden border-b border-gray-500 border-opacity-10">
                          <Image
                            src={proj.image}
                            alt={title || "Project"}
                            fill
                            className="w-full h-full object-cover project-img"
                            unoptimized
                          />
                          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-gray-900 bg-opacity-80 rounded-md text-cyan-400 border border-cyan-500 border-opacity-30">
                            {proj.tag}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-text tracking-tight">
                            {title}
                          </h3>
                          <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                            {t(proj.descKey as any)}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.techs.map((tech, i) => (
                            <span key={i} className="proj-pill">
                              <i className={`${tech.icon} ${tech.colorClass} text-[10px]`}></i>
                              {tech.name}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-gray-500 border-opacity-10 flex">
                          {proj.isPrivate ? (
                            <span className="text-xs text-gray-500 italic flex items-center gap-1">
                              <i className="fas fa-lock text-[10px]"></i> Internal Repository
                            </span>
                          ) : (
                            <a
                              href={proj.githubUrl}
                              className="proj-link group cursor-pointer"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>{t('view_code')}</span>
                              <i className="fas fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform"></i>
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
            className="carousel-btn carousel-btn-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-full p-3 shadow-xl hover:bg-gray-700 transition-all z-20 border border-gray-700 cursor-pointer"
            id="prevBtn"
            aria-label="Previous Project"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="carousel-btn carousel-btn-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-gray-800 bg-opacity-80 backdrop-blur-md rounded-full p-3 shadow-xl hover:bg-gray-700 transition-all z-20 border border-gray-700 cursor-pointer"
            id="nextBtn"
            aria-label="Next Project"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* DOTS */}
          <div className="flex justify-center mt-10 space-x-2" id="dotsContainer">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === index ? 'active bg-cyan-400 scale-125' : 'bg-gray-700'
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
            className="inline-block px-8 py-3.5 border border-gray-700 text-gray-200 rounded-xl font-semibold hover:border-cyan-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/5 transition-all text-sm"
          >
            <i className="fab fa-github mr-2"></i> View All Repositories
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
