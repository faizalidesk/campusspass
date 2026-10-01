import { PermitApplication, Balasan, User, ActivityLog } from '@/types';
import { supabase, isSupabaseConfigured } from './supabase';

export const INITIAL_PERMITS: PermitApplication[] = [
  {
    id: '1',
    namaormawa: 'Himpunan Mahasiswa Teknik Informatika (HIMATIF)',
    namakegiatan: 'Technovest 5.0 - Seminar Nasional & Hackathon',
    mulai: '23 Mei 2026',
    akhir: '24 Mei 2026',
    undangan: 'Seluruh Mahasiswa Teknik Informatika & Umum',
    rab: 'RAB_Technovest5.0_Final.pdf',
    deskripsi: 'Kompetisi hackathon pengembangan solusi AI tingkat regional dan seminar nasional industri teknologi.',
    kategori: 'Teknologi',
    anggaran: 'Rp 14.500.000',
    lokasi: 'Auditorium Gedung Utama & Lab Terpadu',
    penanggung_jawab: 'Faiz Ali (Ketua Pelaksana)',
    status: 'pending',
    created_at: '2026-05-10T08:30:00Z',
  },
  {
    id: '2',
    namaormawa: 'Badan Eksekutif Mahasiswa (BEM)',
    namakegiatan: 'PKKMB Polindra 2026',
    mulai: '10 Agustus 2026',
    akhir: '14 Agustus 2026',
    undangan: 'Seluruh Mahasiswa Baru Politeknik Negeri Indramayu',
    rab: 'RAB_PKKMB2026_Disetujui.xlsx',
    deskripsi: 'Pengenalan Kehidupan Kampus bagi Mahasiswa Baru Politeknik Negeri Indramayu tahun akademik 2026/2027.',
    kategori: 'Organisasi',
    anggaran: 'Rp 45.000.000',
    lokasi: 'Lapangan Utama & Gedung Serbaguna Polindra',
    penanggung_jawab: 'M. Rizky (Presma BEM)',
    status: 'disetujui',
    keputusan: 'Disetujui penuh. Harap melakukan koordinasi berkala dengan Bagian Keamanan Kampus dan UPT Sarpras.',
    created_at: '2026-05-02T10:15:00Z',
  },
  {
    id: '3',
    namaormawa: 'Himpunan Mahasiswa Mesin (HMM)',
    namakegiatan: 'Revolution Engine & Mechanical Expo 2026',
    mulai: '26 Mei 2026',
    akhir: '27 Mei 2026',
    undangan: 'Mahasiswa Teknik Mesin se-Jawa Barat',
    rab: 'RAB_RevolutionEngine.pdf',
    deskripsi: 'Pameran modifikasi mesin presisi, kontes efisiensi bahan bakar, serta workshop teknik manufaktur modern.',
    kategori: 'Teknologi',
    anggaran: 'Rp 18.200.000',
    lokasi: 'Bengkel Mekanik & Selasar Gedung Mesin',
    penanggung_jawab: 'Bagas Pratama',
    status: 'pending',
    created_at: '2026-05-08T14:20:00Z',
  },
  {
    id: '4',
    namaormawa: 'Himpunan Mahasiswa Refrigerasi & Tata Udara (HIMRA)',
    namakegiatan: 'Eco-Cooling Summit & Dies Natalis HIMRA',
    mulai: '20 Mei 2026',
    akhir: '22 Mei 2026',
    undangan: 'Civitas Akademika Polindra',
    rab: 'RAB_HimraMilad.pdf',
    deskripsi: 'Seminar teknologi pendingin ramah lingkungan dan pameran sistem HVAC hemat energi karya mahasiswa.',
    kategori: 'Akademik',
    anggaran: 'Rp 9.800.000',
    lokasi: 'Aula Lantai 3 Gedung Rektorat',
    penanggung_jawab: 'Dimas Aditya',
    status: 'disetujui',
    keputusan: 'Disetujui. Harap memastikan kebersihan ruangan aula setelah kegiatan berlangsung.',
    created_at: '2026-04-28T09:00:00Z',
  },
  {
    id: '5',
    namaormawa: 'Unit Kegiatan Mahasiswa Seni Budaya (SEBURA)',
    namakegiatan: 'Festival Tari Tradisional & Pentas Gelar Budaya',
    mulai: '10 Juni 2026',
    akhir: '12 Juni 2026',
    undangan: 'Masyarakat Umum & Civitas Polindra',
    rab: 'RAB_SeburaPentas.docx',
    deskripsi: 'Pementasan seni tari Topeng Indramayu dan pertunjukan musik gamelan kolosal mahasiswa lintas jurusan.',
    kategori: 'Seni & Budaya',
    anggaran: 'Rp 12.000.000',
    lokasi: 'Panggung Terbuka Polindra',
    penanggung_jawab: 'Siti Nurhaliza',
    status: 'ditolak',
    keputusan: 'Ditolak sementara karena bertepatan dengan masa Ujian Akhir Semester (UAS). Silakan ajukan ulang jadwal pasca-UAS.',
    created_at: '2026-04-25T11:45:00Z',
  }
];

export const INITIAL_BALASAN: Balasan[] = [
  {
    id: '1',
    namaormawa: 'Badan Eksekutif Mahasiswa (BEM)',
    namakegiatan: 'PKKMB Polindra 2026',
    mulai: '10 Agustus 2026',
    akhir: '14 Agustus 2026',
    status: 'disetujui',
    keputusan: 'Disetujui penuh. Harap melakukan koordinasi berkala dengan Bagian Keamanan Kampus dan UPT Sarpras.',
    created_at: '2026-05-03T11:00:00Z'
  },
  {
    id: '2',
    namaormawa: 'Himpunan Mahasiswa Refrigerasi & Tata Udara (HIMRA)',
    namakegiatan: 'Eco-Cooling Summit & Dies Natalis HIMRA',
    mulai: '20 Mei 2026',
    akhir: '22 Mei 2026',
    status: 'disetujui',
    keputusan: 'Disetujui. Harap memastikan kebersihan ruangan aula setelah kegiatan berlangsung.',
    created_at: '2026-04-29T14:30:00Z'
  },
  {
    id: '3',
    namaormawa: 'Unit Kegiatan Mahasiswa Seni Budaya (SEBURA)',
    namakegiatan: 'Festival Tari Tradisional & Pentas Gelar Budaya',
    mulai: '10 Juni 2026',
    akhir: '12 Juni 2026',
    status: 'ditolak',
    keputusan: 'Ditolak sementara karena bertepatan dengan masa Ujian Akhir Semester (UAS). Silakan ajukan ulang jadwal pasca-UAS.',
    created_at: '2026-04-26T16:00:00Z'
  }
];

export const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  nama: 'Heri Susanto, S.ST., M.T.',
  username: 'admin',
  role: 'admin',
  email: 'humas@polindra.ac.id',
  department: 'Bagian Kemahasiswaan & Hubungan Masyarakat',
};

export const DEFAULT_ORMAWA: User = {
  id: 'ormawa-1',
  nama: 'Faiz Ali',
  username: 'himatif',
  role: 'ormawa',
  ormawa_name: 'Himpunan Mahasiswa Teknik Informatika (HIMATIF)',
  email: 'himatif@polindra.ac.id',
  department: 'Jurusan Teknik Informatika',
};

const STORAGE_KEY_PERMITS = 'campuspass_permits';
const STORAGE_KEY_BALASAN = 'campuspass_balasan';
const STORAGE_KEY_USER = 'campuspass_current_user';
const STORAGE_KEY_LOGS = 'campuspass_activity_logs';

export function getCurrentUser(): User {
  if (typeof window === 'undefined') {
    return DEFAULT_ORMAWA;
  }
  const saved = localStorage.getItem(STORAGE_KEY_USER);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return DEFAULT_ORMAWA;
}

export function setCurrentUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('campuspass_auth_change'));
  }
}

export async function getPermits(): Promise<PermitApplication[]> {
  if (isSupabaseConfigured && supabase) {
    try {
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
          kategori: d.kategori || 'Organisasi',
          anggaran: d.anggaran || 'Rp 10.000.000',
          lokasi: d.lokasi || 'Kampus Polindra',
          penanggung_jawab: d.penanggung_jawab || 'Pengurus Ormawa',
          created_at: d.created_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, fallback to local', e);
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

export async function addPermit(permit: Omit<PermitApplication, 'id' | 'status' | 'created_at'>): Promise<PermitApplication> {
  const newPermit: PermitApplication = {
    ...permit,
    id: 'CP-' + Math.floor(1000 + Math.random() * 9000),
    status: 'pending',
    kategori: permit.kategori || 'Teknologi',
    anggaran: permit.anggaran || 'Rp 5.000.000',
    lokasi: permit.lokasi || 'Kampus Polindra',
    penanggung_jawab: permit.penanggung_jawab || 'Ketua Pelaksana',
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
        feedback_notes: null,
        status: 'pending'
      });
    } catch (e) {
      console.warn('Supabase insert failed, fallback to local storage', e);
    }
  }

  if (typeof window !== 'undefined') {
    const existing = await getPermits();
    const updated = [newPermit, ...existing];
    localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(updated));
    addActivityLog({
      title: 'Pengajuan Izin Baru',
      description: `${permit.namaormawa} mengajukan izin untuk ${permit.namakegiatan}`,
      type: 'submit',
      user: permit.namaormawa
    });
  }

  return newPermit;
}

export async function updatePermitStatus(
  permitId: string,
  status: 'disetujui' | 'ditolak',
  feedbackNotes: string
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('event_permits')
        .update({
          status: status,
          feedback_notes: feedbackNotes
        })
        .eq('id', permitId);

      await supabase.from('permit_reviews').insert({
        permit_id: permitId,
        feedback_notes: feedbackNotes,
      });
    } catch (e) {
      console.warn('Supabase update failed', e);
    }
  }

  if (typeof window !== 'undefined') {
    const permits = await getPermits();
    const permit = permits.find(p => p.id === permitId);
    if (permit) {
      permit.status = status;
      permit.keputusan = feedbackNotes;
      localStorage.setItem(STORAGE_KEY_PERMITS, JSON.stringify(permits));

      await addBalasan({
        namaormawa: permit.namaormawa,
        namakegiatan: permit.namakegiatan,
        mulai: permit.mulai,
        akhir: permit.akhir,
        status: status,
        keputusan: feedbackNotes
      });

      addActivityLog({
        title: status === 'disetujui' ? 'Permohonan Disetujui' : 'Permohonan Ditolak',
        description: `Humas memberikan keputusan "${status}" untuk kegiatan ${permit.namakegiatan}`,
        type: status === 'disetujui' ? 'approve' : 'reject',
        user: 'Admin Humas'
      });

      return true;
    }
  }
  return false;
}

export async function getBalasan(): Promise<Balasan[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('permit_reviews')
        .select('*, event_permits(*)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          namaormawa: d.event_permits?.organization_name || d.namaormawa || 'Ormawa Polindra',
          namakegiatan: d.event_permits?.event_name || d.namakegiatan || 'Kegiatan Mahasiswa',
          mulai: d.event_permits?.start_date || d.mulai || '-',
          akhir: d.event_permits?.end_date || d.akhir || '-',
          status: (d.feedback_notes?.toLowerCase().includes('tolak') ? 'ditolak' : 'disetujui') as 'disetujui' | 'ditolak',
          keputusan: d.feedback_notes || d.keputusan,
          created_at: d.created_at
        }));
      }
    } catch (e) {
      console.warn('Supabase balasan fetch failed', e);
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
    id: 'REV-' + Math.floor(1000 + Math.random() * 9000),
    created_at: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    const existing = await getBalasan();
    const updated = [newBalasan, ...existing];
    localStorage.setItem(STORAGE_KEY_BALASAN, JSON.stringify(updated));
  }

  return newBalasan;
}

export function getActivityLogs(): ActivityLog[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEY_LOGS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }
  const defaultLogs: ActivityLog[] = [
    {
      id: 'l1',
      title: 'Keputusan Izin Diterbitkan',
      description: 'Humas menyetujui kegiatan PKKMB Polindra 2026',
      time: '2 jam yang lalu',
      type: 'approve',
      user: 'Admin Humas'
    },
    {
      id: 'l2',
      title: 'Pengajuan Baru Masuk',
      description: 'HIMATIF mengajukan izin kegiatan Technovest 5.0',
      time: '5 jam yang lalu',
      type: 'submit',
      user: 'HIMATIF'
    },
    {
      id: 'l3',
      title: 'Catatan Revisi Terkirim',
      description: 'Pentas SEBURA dijadwalkan ulang karena bertepatan dengan UAS',
      time: '1 hari yang lalu',
      type: 'reject',
      user: 'Admin Humas'
    }
  ];
  return defaultLogs;
}

export function addActivityLog(log: Omit<ActivityLog, 'id' | 'time'>) {
  if (typeof window === 'undefined') return;
  const existing = getActivityLogs();
  const newLog: ActivityLog = {
    ...log,
    id: 'log-' + Date.now(),
    time: 'Baru saja'
  };
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([newLog, ...existing.slice(0, 19)]));
}
