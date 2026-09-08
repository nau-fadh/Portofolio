'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface MockResponse {
  status: string;
  statusClass: string;
  data: any;
}

const apiMockDatabase: Record<string, MockResponse> = {
  'get-profile': {
    status: "HTTP 200 OK",
    statusClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    data: {
      developer: "Naufal Fadhlurrohman",
      role: "Fullstack Developer / .NET Specialist",
      experience_sectors: ["Manufacturing Systems", "Enterprise Architecture", "IoT Telemetry"],
      core_runtime: ".NET Core 8.0/9.0 & ASP.NET WebAPI",
      architecture_pattern: "Clean Architecture / CQRS Pattern",
      status: "Ready_For_Deployment"
    }
  },
  'post-qc': {
    status: "HTTP 201 CREATED",
    statusClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    data: {
      transaction: "Digitalisasi Form Inspection Quality Control",
      target_infrastructure: "PT GS Battery Indonesia / Machining Line",
      payload_received: {
        component_checking: "Product Verified",
        migration_source: "Legacy Excel / Paper Form Data",
        target_framework: "React.js client joined with Spring Boot server"
      },
      database_sync: "SSMS SQL Server - Execution Time: 14ms"
    }
  },
  'get-iot': {
    status: "HTTP 200 OK",
    statusClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    data: {
      module: "Student Journey Management Module",
      hardware_protocol: "RFID Card Identifier Reader Integration",
      system_bridge: "ASP.NET Backend & Laravel Core Interface Mapping",
      logs: [
        { timestamp: "2026-06-06T01:51:00Z", scan_status: "Identity_Authorized" },
        { database: "MySQL Data Storage State synchronized successfully" }
      ]
    }
  },
  'patch-infra': {
    status: "HTTP 200 OK",
    statusClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    data: {
      devops_tooling: "Azure DevOps Pipelines Management",
      pipeline_state: "Continuous Integration / Continuous Deployment Enabled",
      source_control: "Git & GitHub Enterprise Organization Mapping",
      automated_tasks: ["Bug Analysis Fixes", "Feature Deployment Support", "CS Team Request Automation"]
    }
  }
};

const ApiSimulator: React.FC = () => {
  const { language } = useLanguage();
  const [activeKey, setActiveKey] = useState<string>('get-profile');
  const [loading, setLoading] = useState<boolean>(false);
  const [outputHtml, setOutputHtml] = useState<string>('');
  const [status, setStatus] = useState<string>('HTTP 200 OK');
  const [statusClass, setStatusClass] = useState<string>('bg-emerald-500/10 text-emerald-400 border-emerald-500/20');

  const runSimulation = (key: string) => {
    setActiveKey(key);
    setLoading(true);

    // Simulasi delay jaringan
    setTimeout(() => {
      const mock = apiMockDatabase[key];
      setStatus(mock.status);
      setStatusClass(mock.statusClass);
      setOutputHtml(JSON.stringify(mock.data, null, 4));
      setLoading(false);
    }, 350);
  };

  useEffect(() => {
    runSimulation('get-profile');
  }, []);

  return (
    <section id="terminal-simulation" className="py-24 relative overflow-hidden bg-[#080809]/90 border-t border-white/[0.06]">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        {/* SECTION HEADER (OpenAI Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                04 // LIVE SYSTEM SANDBOX
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {language === 'id' ? 'Simulator API Interaktif' : 'Interactive API Playground'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans">
            {language === 'id' 
              ? 'Uji coba pemanggilan endpoint .NET WebAPI secara real-time untuk menginspeksi struktur payload dan respon arsitektur sistem.' 
              : 'Simulate live .NET WebAPI requests in real-time to inspect distributed payload structures and server latency responses.'}
          </p>
        </div>

        {/* Terminal Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch">

          {/* LEFT: Endpoint Controller */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center fade-in visible font-mono">
            <span className="text-[11px] font-bold tracking-wider text-neutral-500 uppercase px-1 mb-1">
              Select REST Endpoint:
            </span>

            <button
              onClick={() => runSimulation('get-profile')}
              className={`api-btn ${activeKey === 'get-profile' ? 'active-btn' : ''}`}
            >
              <span className="method get">GET</span>
              <span className="endpoint text-xs">/v1/dev/profile</span>
            </button>

            <button
              onClick={() => runSimulation('post-qc')}
              className={`api-btn ${activeKey === 'post-qc' ? 'active-btn' : ''}`}
            >
              <span className="method post">POST</span>
              <span className="endpoint text-xs">/v1/factory/qc-form</span>
            </button>

            <button
              onClick={() => runSimulation('get-iot')}
              className={`api-btn ${activeKey === 'get-iot' ? 'active-btn' : ''}`}
            >
              <span className="method get">GET</span>
              <span className="endpoint text-xs">/v1/hardware/rfid-log</span>
            </button>

            <button
              onClick={() => runSimulation('patch-infra')}
              className={`api-btn ${activeKey === 'patch-infra' ? 'active-btn' : ''}`}
            >
              <span className="method patch">PATCH</span>
              <span className="endpoint text-xs">/v1/infra/azure-devops</span>
            </button>
          </div>

          {/* RIGHT: Code IDE / Terminal Window */}
          <div className="lg:col-span-8 flex flex-col fade-in visible">
            <div className="w-full bg-[#080809] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col h-[390px] overflow-hidden backdrop-blur-md">
              
              {/* Terminal Top Bar */}
              <div className="bg-white/[0.02] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 inline-block"></span>
                  <span className="text-[11px] text-neutral-400 font-mono ml-2">dotnet-core-runtime.service</span>
                </div>
                <span className={`text-[9px] px-2.5 py-0.5 rounded-full border font-mono uppercase tracking-widest ${loading ? 'animate-pulse' : ''} ${statusClass}`}>
                  {status}
                </span>
              </div>

              {/* Terminal Output Console */}
              <div className="p-5 font-mono text-xs md:text-sm overflow-y-auto flex-grow bg-transparent text-neutral-300 relative" id="terminal-console">
                {loading ? (
                  <div className="text-neutral-500 leading-relaxed space-y-1">
                    <p>{"// Compiling pipeline execution query..."}</p>
                    <p>{"// Resolving controller action binding..."}</p>
                    <span className="inline-block animate-spin text-cyan-400 mt-2">
                      <i className="fas fa-circle-notch text-sm"></i>
                    </span>
                  </div>
                ) : (
                  <pre className="text-cyan-300 leading-relaxed whitespace-pre-wrap font-mono selection:bg-cyan-500/20">
                    {outputHtml}
                  </pre>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ApiSimulator;
