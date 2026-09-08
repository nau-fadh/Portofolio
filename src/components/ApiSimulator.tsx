'use client';

import React, { useState, useEffect } from 'react';

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
      experience_sectors: ["Manufacturing Systems", "Enterprise Architecture", "IoT Logics"],
      core_runtime: ".NET Core 8.0 & ASP.NET WebAPI",
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
    }, 450);
  };

  // Run default simulation on mount
  useEffect(() => {
    runSimulation('get-profile');
  }, []);

  return (
    <section id="terminal-simulation" className="py-20 relative overflow-hidden bg-gray-950">
      <div className="container mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 fade-in visible">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            INTERACTIVE <span className="gradient-text">BACKEND SIMULATOR</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-3">
            Click the endpoints below to simulate live .NET Web API requests and inspect real-time system responses.
          </p>
        </div>

        {/* Terminal Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch">

          {/* LEFT: Endpoint Controller */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center fade-in visible">
            <span className="text-xs font-bold tracking-wider text-gray-500 uppercase px-1 mb-1">
              Select Endpoint:
            </span>

            <button
              onClick={() => runSimulation('get-profile')}
              className={`api-btn ${activeKey === 'get-profile' ? 'active-btn' : ''}`}
            >
              <span className="method get">GET</span>
              <span className="endpoint">/v1/dev/profile</span>
            </button>

            <button
              onClick={() => runSimulation('post-qc')}
              className={`api-btn ${activeKey === 'post-qc' ? 'active-btn' : ''}`}
            >
              <span className="method post">POST</span>
              <span className="endpoint">/v1/factory/qc-form</span>
            </button>

            <button
              onClick={() => runSimulation('get-iot')}
              className={`api-btn ${activeKey === 'get-iot' ? 'active-btn' : ''}`}
            >
              <span className="method get">GET</span>
              <span className="endpoint">/v1/hardware/rfid-log</span>
            </button>

            <button
              onClick={() => runSimulation('patch-infra')}
              className={`api-btn ${activeKey === 'patch-infra' ? 'active-btn' : ''}`}
            >
              <span className="method patch">PATCH</span>
              <span className="endpoint">/v1/infra/azure-devops</span>
            </button>
          </div>

          {/* RIGHT: Code IDE / Terminal Window */}
          <div className="lg:col-span-8 flex flex-col fade-in visible">
            <div className="w-full bg-[#0d1117] rounded-2xl border border-gray-800 shadow-2xl flex flex-col h-[380px] overflow-hidden">
              
              {/* Terminal Top Bar */}
              <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                  <span className="text-xs text-gray-500 font-mono ml-2">dotnet-run-portfolio.service</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono uppercase tracking-widest ${loading ? 'animate-pulse' : ''} ${statusClass}`}>
                  {status}
                </span>
              </div>

              {/* Terminal Output Console */}
              <div className="p-5 font-mono text-xs md:text-sm overflow-y-auto flex-grow bg-[#0d1117] text-gray-300 relative" id="terminal-console">
                {loading ? (
                  <div className="text-gray-500 leading-relaxed">
                    {"// Executing dotnet run pipeline..."}
                    <br />
                    {"// Fetching from secure internal server..."}
                    <br />
                    <span className="inline-block animate-spin text-cyan-400 mt-2">
                      <i className="fas fa-spinner"></i>
                    </span>
                  </div>
                ) : (
                  <pre className="text-cyan-400 leading-relaxed whitespace-pre-wrap font-mono">
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
