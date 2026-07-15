import { NextResponse } from 'next/server';

// Helper untuk membaca leaderboard
async function getLeaderboard(): Promise<any[]> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  // Jika konfigurasi Vercel KV terdeteksi di lingkungan produksi/cloud
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['GET', 'leaderboard']),
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return JSON.parse(data.result);
        }
      }
    } catch (e) {
      console.error('Gagal mengambil leaderboard dari Vercel KV, beralih ke file lokal:', e);
    }
  }

  // Fallback ke penyimpanan file JSON lokal untuk pembangunan lokal
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), 'src', 'data', 'leaderboard.json');

    // Buat direktori src/data jika belum ada
    const dirPath = path.dirname(filePath);
    await fs.mkdir(dirPath, { recursive: true });

    // Cek keberadaan file
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!exists) {
      const defaultScores = [
        { name: "NF", score: 2500, date: "2026-07-11" },
        { name: "DEV", score: 1800, date: "2026-07-11" },
        { name: "BA", score: 1500, date: "2026-07-11" },
        { name: "HRD", score: 900, date: "2026-07-11" },
        { name: "GST", score: 400, date: "2026-07-11" }
      ];
      await fs.writeFile(filePath, JSON.stringify(defaultScores, null, 2), 'utf-8');
      return defaultScores;
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (e) {
    console.error('Gagal membaca file leaderboard:', e);
    return [
      { name: "NF", score: 2500, date: "2026-07-11" },
      { name: "DEV", score: 1800, date: "2026-07-11" },
      { name: "BA", score: 1500, date: "2026-07-11" }
    ];
  }
}

// Helper untuk menyimpan leaderboard
async function saveLeaderboard(data: any[]) {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(['SET', 'leaderboard', JSON.stringify(data)]),
      });
      if (res.ok) return;
    } catch (e) {
      console.error('Gagal menulis leaderboard ke Vercel KV:', e);
    }
  }

  // Fallback ke penyimpanan file JSON lokal
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const filePath = path.join(process.cwd(), 'src', 'data', 'leaderboard.json');

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Gagal menulis file leaderboard:', e);
  }
}

export async function GET() {
  try {
    const list = await getLeaderboard();
    // Kembalikan top 5
    const topFive = list.sort((a, b) => b.score - a.score).slice(0, 5);
    return NextResponse.json({ success: true, leaderboard: topFive });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, score } = await request.json();

    // Validasi data
    if (!name || typeof score !== 'number' || isNaN(score)) {
      return NextResponse.json(
        { success: false, error: 'Data nama (inisial) dan skor tidak valid.' },
        { status: 400 }
      );
    }

    const cleanName = name.trim().toUpperCase().substring(0, 3);
    if (cleanName.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nama inisial wajib diisi.' },
        { status: 400 }
      );
    }

    const currentList = await getLeaderboard();
    const newEntry = {
      name: cleanName,
      score: score,
      date: new Date().toISOString().split('T')[0]
    };

    currentList.push(newEntry);
    
    // Urutkan skor tertinggi dan batasi ke 10 besar untuk penyimpanan (kembalikan top 5 ke client)
    const sortedList = currentList.sort((a, b) => b.score - a.score).slice(0, 10);
    await saveLeaderboard(sortedList);

    return NextResponse.json({
      success: true,
      leaderboard: sortedList.slice(0, 5),
      message: 'Skor Anda berhasil disimpan!'
    });

  } catch (error: any) {
    console.error('Error pada API Leaderboard:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
