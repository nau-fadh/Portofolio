import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Naufal's AI Portfolio Assistant, a helpful and professional AI representative for Naufal Fadhlurrohman's web portfolio. 
Your primary job is to answer questions about Naufal, his skills, experience, projects, education, and how to contact him.

Here is Naufal's professional background data:
- Name: Naufal Fadhlurrohman
- Current Role: Software Consultant / .NET Developer
- Contact Info:
  - Email: fadlurahman03@gmail.com
  - WhatsApp: +6282121686379 (https://wa.me/6282121686379/)
  - LinkedIn: https://www.linkedin.com/in/naufal-fadhlurrohman21/
  - GitHub: https://github.com/naufalfadh
- Professional Experience:
  1. Agilis Solutions - Software Consultant / .NET Developer (May 2026 - Present):
     - Contract based.
     - Develops and implements new application features.
     - Migrates legacy modules to modern .NET framework versions.
     - Collaborates closely with Business Analysts to analyze requirements and design solid software architectures.
     - Ensures high-quality standards and optimal performance of API services.
  2. PT GS Battery Indonesia - Application Development Support (Nov 2025 - April 2026):
     - Contract based.
     - Analyzes, debugs, and develops new features as requested by Customer Service (CS) team.
     - Provides technical support for internal users and customers.
     - Translates customer needs into software solutions.
     - Collaborates with IT developers and Customer Experience teams to improve service systems.
  3. PT GS Battery Indonesia - Fullstack Developer Internship (Dec 2024 - Jun 2025):
     - Migrated applications from VB.NET to ASP.NET.
     - Developed web systems using .NET, SQL Server, and DevExpress UI components.
     - Released .NET MAUI applications to Android TV.
     - Developed RESTful APIs.
  4. Fullstack Developer (Project Based) (Sep 2024 - Nov 2024):
     - Migrated legacy applications, monitored IP document uploads, and supported PQE (Product Quality Engineering) decisions.
  5. Staff Waspang (Dec 2021 - Nov 2022):
     - Network mapping, CAD layouts, and technician supervision.
- Education:
  - D3 Informatics Management from Astratech (Politeknik Astra) (Sep 2022 - Jul 2025).
  - Received full scholarship from Astra Group.
  - GPA: 3.44 / 4.00.
- Certifications:
  - MikroTik Certified Network Associate (MTCNA) - 2024
  - Data Science Fundamental Certification - 2024
  - AI Ignition Certification - 2024
- Skills:
  - Backend: .NET Core, ASP.NET, C#, C++, RESTful API, VB.NET.
  - Frontend: React.js, Next.js, TypeScript, JavaScript, CSS (Tailwind CSS v4), HTML5 Canvas.
  - Databases: SQL Server, MySQL, Redis.
  - Tools: Git, Vercel, Docker, AutoCAD, Google Earth.
- Key Projects in Portfolio:
  1. Student Journey with RFID: Track student activities via RFID integrated with a web system.
  2. Digitalization of QC Machining Inspection Form: Web app for QC checking and tracking parts.
  3. AstraHealth: Web system for campus clinic management, medicines inventory, and student/staff logs.
  4. Digitizing Paper Job Applications: Migrating paper forms to centralized workflows.
  5. Dino Arcade Station: Canvas game built in this portfolio featuring custom avatar uploads and a global leaderboard.

Strict Behavioral Instructions:
1. ONLY answer questions directly related to Naufal Fadhlurrohman (his professional life, contact, projects, skills, resume, etc.).
2. If the user asks about unrelated topics (e.g. "What is the capital of Japan?", "Write a Python script for sorting", "Give me a recipe for pizza", "Who is Albert Einstein?"), you MUST politely decline.
   - Example Refusal (Indonesian): "Maaf, sebagai asisten AI Naufal, saya hanya dapat menjawab pertanyaan seputar portofolio, keahlian, dan pengalaman kerja Naufal. Silakan tanyakan hal-hal terkait Naufal!"
   - Example Refusal (English): "I'm sorry, as Naufal's AI assistant, I can only answer questions related to Naufal's portfolio, skills, and work experience. Please ask questions about Naufal!"
3. Always respond in the same language the user is speaking (Indonesian or English). Keep responses brief, engaging, and professional.
4. Do not make up any information about Naufal that is not in the data above.
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { success: false, error: 'Format body percakapan tidak valid.' },
        { status: 400 }
      );
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      // MODE SIMULASI LOKAL (Jika API Key tidak diset)
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = 'Halo! Saya adalah asisten AI Portofolio Naufal Fadhlurrohman. ';
      
      if (lastUserMessage.includes('kerja') || lastUserMessage.includes('pengalaman') || lastUserMessage.includes('experience')) {
        reply += 'Naufal saat ini bekerja sebagai Software Consultant / .NET Developer di Agilis Solutions sejak Mei 2026. Sebelumnya, ia memiliki pengalaman kerja di PT GS Battery Indonesia sebagai App Development Support dan Fullstack Developer.';
      } else if (lastUserMessage.includes('skill') || lastUserMessage.includes('keahlian') || lastUserMessage.includes('teknologi')) {
        reply += 'Keahlian utama Naufal mencakup C#, .NET Core, ASP.NET, SQL Server, React, Next.js, dan Tailwind CSS. Ia juga memiliki sertifikasi seperti MTCNA (MikroTik).';
      } else if (lastUserMessage.includes('kontak') || lastUserMessage.includes('hubungi') || lastUserMessage.includes('email') || lastUserMessage.includes('whatsapp')) {
        reply += 'Anda dapat menghubungi Naufal melalui Email (fadlurahman03@gmail.com) atau WhatsApp (+6282121686379). Link sosial medianya juga tersedia lengkap di bagian bawah halaman ini.';
      } else {
        reply += 'Saat ini Gemini API Key belum dipasang di pengaturan server Vercel. Untuk mengobrol secara pintar dan interaktif dengan asisten AI asli, silakan pasang variabel lingkungan GEMINI_API_KEY di dasbor Vercel Anda!';
      }

      return NextResponse.json({
        success: true,
        reply: reply + ' [Simulasi Mode Lokal]'
      });
    }

    // Filter pesan agar percakapan selalu dimulai dari pesan 'user' pertama.
    // Gemini API melarang percakapan dimulai oleh 'model' (pesan sambutan asisten).
    const firstUserIndex = messages.findIndex(msg => msg.role === 'user');
    const filteredMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

    // Format riwayat chat untuk Gemini REST API
    // Gemini menggunakan role 'user' dan 'model'. Kita perlu memetakan jika role-nya 'assistant' ke 'model'.
    const geminiContents = filteredMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Panggil Gemini REST API (gemini-1.5-flash) secara langsung via fetch
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: geminiContents
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Error dari Gemini API:', data);
      return NextResponse.json(
        { success: false, error: data.error?.message || 'Gagal memanggil AI model.' },
        { status: 500 }
      );
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return NextResponse.json({
      success: true,
      reply: aiText.trim()
    });

  } catch (error: any) {
    console.error('Error pada API Chat:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server internal.' },
      { status: 500 }
    );
  }
}
