export type UserRole = 'admin' | 'ormawa';

export interface User {
  id: string;
  nama: string;
  username: string;
  role: UserRole;
  ormawa_name?: string;
  email?: string;
  avatar?: string;
  department?: string;
  password?: string;
  created_at?: string;
}

export interface PermitApplication {
  id: string;
  namaormawa: string;
  namakegiatan: string;
  mulai: string;
  akhir: string;
  undangan: string;
  rab: string;
  deskripsi: string;
  status: 'pending' | 'disetujui' | 'ditolak';
  kategori?: 'Akademik' | 'Teknologi' | 'Seni & Budaya' | 'Olahraga' | 'Sosial & Pengabdian' | 'Organisasi';
  anggaran?: string;
  lokasi?: string;
  penanggung_jawab?: string;
  keputusan?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Balasan {
  id: string;
  namaormawa: string;
  namakegiatan: string;
  mulai: string;
  akhir: string;
  keputusan: string;
  status?: 'disetujui' | 'ditolak';
  created_at?: string;
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'submit' | 'approve' | 'reject' | 'info';
  user: string;
}
