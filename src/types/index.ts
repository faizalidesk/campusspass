export type UserRole = 'admin' | 'ormawa';

export interface User {
  id: string;
  nama: string;
  username: string;
  role: UserRole;
  ormawa_name?: string;
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
  keputusan?: string;
  created_at?: string;
}

export interface Balasan {
  id: string;
  namaormawa: string;
  namakegiatan: string;
  mulai: string;
  akhir: string;
  keputusan: string;
  created_at?: string;
}
