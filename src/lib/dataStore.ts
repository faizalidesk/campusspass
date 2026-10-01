import { PermitApplication, Balasan, User } from '@/types';
import { supabase, isSupabaseConfigured } from './supabase';

const INITIAL_PERMITS: PermitApplication[] = [
  {
    id: '1',
    namaormawa: 'Himpunan mahasiswa teknik informatika',
    namakegiatan: 'Technovest 5.0',
    mulai: '23 Mei 2026',
    akhir: '24 Mei 2026',
    undangan: 'Kepada seluruh mahasiswa teknik Informatika',
    rab: 'RAB_Technovest5.0.pdf',
    deskripsi: 'Kegiatan tahunan perlombaan teknologi informasi dan seminar nasional se-Jawa Barat.',
    status: 'pending',
  },
  {
    id: '2',
    namaormawa: 'Badan Eksekutif Mahasiswa',
    namakegiatan: 'PKKMB 2026',
    mulai: '10 Agustus 2026',
    akhir: '14 Agustus 2026',
    undangan: 'Kepada seluruh mahasiswa baru Politeknik Negeri Indramayu',
    rab: 'RAB_PKKMB2026.xlsx',
    deskripsi: 'Pengenalan Kehidupan Kampus bagi Mahasiswa Baru Politeknik Negeri Indramayu angkatan 2026.',
    status: 'disetujui',
    keputusan: 'Disetujui. Harap berkoordinasi dengan bagian keamanan dan sarana prasarana.',
  },
  {
    id: '3',
    namaormawa: 'Himpunan mahasiswa mesin',
    namakegiatan: 'Revolution Engine',
    mulai: '26 Mei 2026',
    akhir: '27 Mei 2026',
    undangan: 'Kepada seluruh mahasiswa teknik Mesin',
    rab: 'RAB_RevolutionEngine.pdf',
    deskripsi: 'Pameran otomotif dan modifikasi karya mahasiswa teknik mesin.',
    status: 'pending',
  },
  {
    id: '4',
    namaormawa: 'Himpunan Mahasiswa Refrigerasi dan Tata udara',
    namakegiatan: 'Himra Milad 78',
    mulai: '20 Mei 2026',
    akhir: '22 Mei 2026',
    undangan: 'Kepada seluruh mahasiswa Refrigerasi dan Tata Udara',
    rab: 'RAB_HimraMilad.pdf',
    deskripsi: 'Peringatan hari jadi himpunan dengan workshop pendingin ramah lingkungan.',
    status: 'disetujui',
    keputusan: 'Disetujui untuk penggunaan Aula Utama Polindra.',
  },
  {
    id: '5',
    namaormawa: 'Sebura',
    namakegiatan: 'Penari Handal Penerus Bangsa',
    mulai: '10 Juni 2026',
    akhir: '12 Juni 2026',
    undangan: 'Seluruh civitas akademika Polindra',
    rab: 'RAB_SeburaPentas.docx',
    deskripsi: 'Pentas seni dan budaya tradisional daerah Indramayu.',
    status: 'ditolak',
    keputusan: 'Ditolak sementara. Jadwal bentrok dengan Ujian Tengah Semester (UTS). Mohon ajukan tanggal alternatif.',
  }
];

const INITIAL_BALASAN: Balasan[] = [
  {
    id: '1',
    namaormawa: 'Himatif',
    namakegiatan: 'Milad Hima',
    mulai: '10 Oktober 2026',
    akhir: '20 Oktober 2026',
    keputusan: 'Disetujui. Silakan ambil surat izin cetak di ruang Kemahasiswaan.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    namaormawa: 'Badan Eksekutif Mahasiswa',
    namakegiatan: 'PKKMB 2026',
    mulai: '10 Agustus 2026',
    akhir: '14 Agustus 2026',
    keputusan: 'Disetujui. Harap berkoordinasi dengan bagian keamanan dan sarana prasarana.',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    namaormawa: 'Sebura',
    namakegiatan: 'Penari Handal Penerus Bangsa',
    mulai: '10 Juni 2026',
    akhir: '12 Juni 2026',
    keputusan: 'Ditolak sementara. Jadwal bentrok dengan Ujian Tengah Semester (UTS).',
    created_at: new Date().toISOString()
  }
];

const STORAGE_KEY_PERMITS = 'campuspass_permits';
const STORAGE_KEY_BALASAN = 'campuspass_balasan';
const STORAGE_KEY_USER = 'campuspass_current_user';

export function getCurrentUser(): User {
  if (typeof window === 'undefined') {
    return { id: '1', nama: 'Admin Humas', username: 'admin', role: 'admin' };
  }
  const saved = localStorage.getItem(STORAGE_KEY_USER);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return { id: '1', nama: 'Admin Humas Polindra', username: 'admin', role: 'admin' };
}

export function setCurrentUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }
}

export async function getPermits(): Promise<PermitApplication[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('event_permits')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        namaormawa: d.organization_name || d.namaormawa,
        namakegiatan: d.event_name || d.namakegiatan,
        mulai: d.start_date || d.mulai,
        akhir: d.end_date || d.akhir,
        undangan: d.open_invitation || d.undangan,
        rab: d.rab_url || d.rab,
        deskripsi: d.description || d.deskripsi,
        status: d.status || 'pending',
        keputusan: d.feedback_notes || d.keputusan,
        created_at: d.created_at
      }));
    }
  }

  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(STORAGE_KEY_PERMITS);
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(INITIAL_PERMITS));
  }
  return INITIAL_PERMITS;
}

export async function addPermit(permit: Omit<PermitApplication, 'id' | 'status'>): Promise<PermitApplication> {
  const newPermit: PermitApplication = {
    ...permit,
    id: Date.now().toString(),
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('event_permits').insert({
        organization_name: permit.namaormawa,
        event_name: permit.namakegiatan,
        start_date: permit.mulai,
        end_date: permit.akhir,
        open_invitation: permit.undangan,
        rab_url: permit.rab,
        description: permit.deskripsi,
        status: 'pending'
      });
    } catch (e) {
      console.error('Supabase insert failed, fallback to local', e);
    }
  }

  if (typeof window !== 'undefined') {
    const existing = await getPermits();
    const updated = [newPermit, ...existing];
    localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(updated));
  }

  return newPermit;
}

export async function getBalasan(): Promise<Balasan[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('permit_reviews')
      .select('*, event_permits(*)')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        namaormawa: d.event_permits?.organization_name || d.namaormawa || 'Ormawa',
        namakegiatan: d.event_permits?.event_name || d.namakegiatan || 'Kegiatan',
        mulai: d.event_permits?.start_date || d.mulai || '-',
        akhir: d.event_permits?.end_date || d.akhir || '-',
        keputusan: d.feedback_notes || d.keputusan,
        created_at: d.created_at
      }));
    }
  }

  if (typeof window !== 'undefined') {
    const local = localStorage.getItem(STORAGE_KEY_BALASAN);
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEY_BALASAN, JSON.stringify(INITIAL_BALASAN));
  }
  return INITIAL_BALASAN;
}

export async function addBalasan(balasan: Omit<Balasan, 'id' | 'created_at'>): Promise<Balasan> {
  const newBalasan: Balasan = {
    ...balasan,
    id: Date.now().toString(),
    created_at: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    const existing = await getBalasan();
    const updated = [newBalasan, ...existing];
    localStorage.setItem(STORAGE_KEY_BALASAN, JSON.stringify(updated));

    // Update status in permits list as well
    const permits = await getPermits();
    const target = permits.find(p => p.namaormawa.toLowerCase() === balasan.namaormawa.toLowerCase() || p.namakegiatan.toLowerCase() === balasan.namakegiatan.toLowerCase());
    if (target) {
      const isApproved = balasan.keputusan.toLowerCase().includes('setuju') || balasan.keputusan.toLowerCase().includes('terima');
      target.status = isApproved ? 'disetujui' : 'ditolak';
      target.keputusan = balasan.keputusan;
      localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(permits));
    }
  }

  return newBalasan;
}
