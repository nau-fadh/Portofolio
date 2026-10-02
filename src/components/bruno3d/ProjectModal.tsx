'use client';

import React from 'react';
import Image from 'next/image';
import { Project3DData } from './WorldData';

interface ProjectModalProps {
  project: Project3DData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0f172a] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1e293b]/70 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {project.tag}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close Modal"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Image Preview Banner */}
        <div className="relative w-full h-56 sm:h-72 bg-gray-950 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {project.desc}
          </p>

          {/* Tech Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
              Tech Stack Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1e293b]/40 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Kembali ke Mobil (Esc)
          </button>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <span>Buka GitHub Repository</span>
              <i className="fas fa-external-link-alt text-[10px]"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
