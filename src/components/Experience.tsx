'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'work' | 'edu'>('work');

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-opacity-20" style={{ backgroundColor: 'rgba(22, 33, 62, 0.2)' }}>
      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-500 border-opacity-10 pb-8">
          <div className="fade-in visible">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              PROFESSIONAL <span className="gradient-text">JOURNEY</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed opacity-70 fade-in visible text-gray-400">
            {t('exp_section_description')}
          </p>
        </div>

        {/* TAB TOGGLE NAVIGATION */}
        <div className="flex justify-center mb-16 fade-in visible w-full px-4">
          <div className="tab-toggle-group p-1 bg-gray-900 bg-opacity-50 rounded-2xl border border-gray-800 flex w-full max-w-sm sm:max-w-lg">
            <button
              onClick={() => setActiveTab('work')}
              className={`tab-toggle-btn flex-1 justify-center cursor-pointer transition-all duration-300 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'work' ? 'tab-active' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label="View Work Experience"
            >
              <i className="fas fa-briefcase text-[10px] sm:text-xs"></i>
              <span>{t('tab_work')}</span>
            </button>
            <button
              onClick={() => setActiveTab('edu')}
              className={`tab-toggle-btn flex-1 justify-center cursor-pointer transition-all duration-300 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 ${
                activeTab === 'edu' ? 'tab-active' : 'opacity-60 hover:opacity-100'
              }`}
              aria-label="View Education and Organizations"
            >
              <i className="fas fa-graduation-cap text-[10px] sm:text-xs"></i>
              <span>{t('tab_edu')}</span>
            </button>
          </div>
        </div>

        {/* WORK EXPERIENCE PANEL */}
        {activeTab === 'work' && (
          <div id="panel-work" className="tab-panel max-w-4xl mx-auto">
            <div className="relative pl-6 md:pl-8 timeline">

              {/* Experience New: Software Consultant */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Software Consultant
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        .NET Developer
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('expNew_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs"></i> {t('expNew_company')} <span className="text-xs opacity-50 font-normal">| {t('expNew_type')}</span>
                  </h4>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('expNew_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('expNew_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('expNew_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('expNew_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 0: PT GS Battery (Contract) */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Enterprise App Support
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        Application Development Support
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('exp0_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs"></i> PT GS Battery Indonesia <span className="text-xs opacity-50 font-normal">| Contract Based</span>
                  </h4>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp0_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp0_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp0_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-blue-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp0_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 1: PT GS Battery (Internship) */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Fullstack Migration Specialist
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        .NET Developer
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('exp1_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs"></i> PT GS Battery Indonesia <span className="text-xs opacity-50 font-normal">| Internship Fullstack Developer</span>
                  </h4>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-purple-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp1_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-purple-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp1_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-purple-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp1_task3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-purple-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp1_task4')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 2: AHM */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Legacy Application Migration
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {t('exp2_title')}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('exp2_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs"></i> Astra Honda Motor <span className="text-xs opacity-50 font-normal">| Project Based</span>
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {t('exp2_role')}
                  </p>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-emerald-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp2_task1')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 3: Telkom Akses */}
              <div className="relative fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Infrastructure & Network Mapping
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {t('exp3_title')}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('exp3_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-building text-xs"></i> PT Telkom Akses Indonesia <span className="text-xs opacity-50 font-normal">| Infrastructure Division</span>
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {t('exp3_role')}
                  </p>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-amber-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp3_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-amber-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp3_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-code-branch text-xs text-amber-400 mt-1 flex-shrink-0"></i>
                      <span>{t('exp3_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* EDUCATION & ORGANIZATIONS PANEL */}
        {activeTab === 'edu' && (
          <div id="panel-edu" className="tab-panel max-w-4xl mx-auto">
            <div className="relative pl-6 md:pl-8 timeline">

              {/* Education 1 */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Higher Education
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {t('edu1_title')}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('edu1_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <i className="fas fa-university text-xs"></i> Astratech – Bekasi, West Java
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {t('edu1_desc')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-500 border-opacity-10">
                    <span className="proj-pill text-[11px]"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert1')}</span>
                    <span className="proj-pill text-[11px]"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert2')}</span>
                    <span className="proj-pill text-[11px]"><i className="fas fa-certificate text-cyan-400"></i> {t('edu1_cert3')}</span>
                  </div>
                </div>
              </div>

              {/* Org 1 */}
              <div className="relative mb-14 fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Media & Publication
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {t('org1_title')}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('org1_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-users text-xs"></i> {t('org1_role')}
                  </h4>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-pink-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org1_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-pink-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org1_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-pink-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org1_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Org 2 */}
              <div className="relative fade-in visible">
                <div className="timeline-item"></div>
                <div className="card rounded-2xl p-6 md:p-8 ml-6 md:ml-8 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase inline-block mb-1">
                        Community Service
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {t('org2_title')}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-md border border-gray-700 h-max w-max">
                      {t('org2_period')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fas fa-users text-xs"></i> {t('org2_role')}
                  </h4>
                  <ul className="space-y-2.5 text-gray-400 text-sm">
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-green-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org2_task1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-green-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org2_task2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <i className="fas fa-arrow-right text-[10px] text-green-400 mt-1.5 flex-shrink-0"></i>
                      <span>{t('org2_task3')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
