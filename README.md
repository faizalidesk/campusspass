# 🎓 CampusPass — Student Organization Activity & Budget Tracker

Sistem Informasi Perizinan Kegiatan dan Pelaporan Anggaran Organisasi Mahasiswa **Politeknik Negeri Indramayu (Polindra)**.

Dibangun dengan **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan siap dihubungkan ke **Supabase** serta dideploy langsung ke **Vercel**.

---

## 🎨 Preservasi Desain Asli
Tema dan tata letak visual dibuat **persis sesuai desain proyek aslinya**:
- 🟦 **Warna Utama**: Royal / Periwinkle Blue (`#6666FF`), Electric Blue (`rgb(32, 103, 255)`), Salmon Accent (`#FA8072`), Alice Blue Card (`#F0F8FF`).
- 🔐 **Halaman Login**: Layout split-screen dengan border lengkung khas, logo Polindra, card form, tombol gradien, dan akun demo 1-klik.
- 📊 **Dashboard**: 4 Card Statistik (`Izin Kegiatan`, `Izin Ditolak`, `Izin Diterima`, `List Izin`) dengan gambar latar belakang asli + action panel.
- 📝 **Form Izin & Live Preview**: Form permohonan izin dengan kartu pratinjau langsung di sebelah kanan.
- 📋 **Tabel Laporan**: Header Salmon dengan cell putih, filter pencarian, dan pemisah tab (Daftar Pengajuan vs Laporan Balasan).
- 👤 **Profil**: Kartu biodata profil ormawa/humas lengkap dengan ikon media sosial.

---

## 🚀 Menjalankan Proyek Secara Lokal

Masuk ke folder `campuspass`:
```bash
cd campuspass
npm run dev
```
Buka browser di: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Menghubungkan ke Supabase (Opsional & Otomatis)

Proyek ini telah dilengkapi **fallback lokal** sehingga bisa langsung dicoba tanpa database. Jika ingin mengaktifkan database online Supabase:

1. Buat project baru di [Supabase](https://supabase.com).
2. Di menu **SQL Editor**, jalankan skrip berikut:

```sql
CREATE TABLE event_permits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_name VARCHAR(255) NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    description TEXT,
    start_date VARCHAR(100) NOT NULL,
    end_date VARCHAR(100) NOT NULL,
    open_invitation VARCHAR(255),
    rab_url TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE permit_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permit_id UUID REFERENCES event_permits(id) ON DELETE CASCADE,
    feedback_notes TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

3. Salin file `.env.example` menjadi `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🌐 Deploy ke Vercel

1. Push repository ke GitHub:
```bash
git add .
git commit -m "Initial commit CampusPass"
git branch -M main
git remote add origin https://github.com/username/campuspass.git
git push -u origin main
```
2. Buka [Vercel](https://vercel.com) &rarr; **Add New Project** &rarr; Pilih repository Anda &rarr; Klik **Deploy**.
3. Tambahkan *Environment Variables* (`NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`) di dashboard Vercel bila menggunakan database cloud.
