import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validasi input di sisi server
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Semua field (Nama, Email, Pesan) wajib diisi.' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // MODE SIMULASI (Local Dev Mode)
      console.log('=== [SIMULASI EMAIL TERKIRIM] ===');
      console.log(`Pengirim: ${name} (${email})`);
      console.log(`Pesan: ${message}`);
      console.log('==================================');
      
      return NextResponse.json({
        success: true,
        message: 'Simulasi: Pesan berhasil diterima di server lokal Anda (telah dicatat di konsol terminal). Untuk mengaktifkan pengiriman email sungguhan di produksi, tambahkan variabel lingkungan RESEND_API_KEY.'
      });
    }

    // Kirim menggunakan Resend API via fetch (tanpa dependensi paket tambahan)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'fadlurahman03@gmail.com', // Email penerima pemilik portofolio
        subject: `New Message from Portfolio: ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4361ee; margin-top: 0;">Pesan Baru dari Portofolio</h2>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Nama Pengirim:</strong> ${name}</p>
            <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Pesan:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #4cc9f0; white-space: pre-wrap; font-style: italic;">
              ${message}
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
            <p style="font-size: 11px; color: #999; text-align: center;">Pesan ini dikirim secara otomatis melalui sistem portofolio Next.js Anda.</p>
          </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error dari Resend API:', data);
      return NextResponse.json(
        { success: false, error: data.message || 'Gagal mengirim email melalui API.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pesan Anda berhasil terkirim!'
    });

  } catch (error: any) {
    console.error('Error pada API Contact:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan server internal.' },
      { status: 500 }
    );
  }
}
