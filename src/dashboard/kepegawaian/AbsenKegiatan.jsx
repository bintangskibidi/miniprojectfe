import React, { useState } from 'react';
import { 
  ClipboardCheck, Check, Mail, BriefcaseMedical, 
  CalendarX, ChevronDown 
} from 'lucide-react';
import Swal from 'sweetalert2';

const AbsenKegiatan = () => {
  // 1. Set default ke string kosong agar muncul tampilan "Silakan pilih"
  const [selectedKegiatan, setSelectedKegiatan] = useState(''); 
  
  const [pegawai, setPegawai] = useState([
    { id: 1, nip: '1234567804', nama: 'Agus Santoso', jenis: 'Guru', jabatan: 'Guru Ekonomi', status: 'Hadir', keterangan: '' },
    { id: 2, nip: '11111', nama: 'Ajis', jenis: 'Guru', jabatan: 'Guru Matematika', status: 'Hadir', keterangan: '' },
    { id: 3, nip: '1234567893', nama: 'Andi Susanto', jenis: 'Staff', jabatan: 'Guru IPS', status: 'Hadir', keterangan: '' },
    { id: 4, nip: '1234567890', nama: 'Bayu Aji lesmana eka putra', jenis: 'Guru', jabatan: 'Guru Matematika', status: 'Hadir', keterangan: '' },
  ]);

  const setAllStatus = (newStatus) => {
    setPegawai(pegawai.map(p => ({ ...p, status: newStatus })));
    Swal.fire({
      icon: 'success',
      title: `Berhasil!`,
      text: `Semua pegawai telah di-set ${newStatus}`,
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleStatusChange = (id, newStatus) => {
    setPegawai(pegawai.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        
        {/* Header - Tombol Massal hanya muncul jika kegiatan sudah dipilih */}
        <div className="bg-blue-600 p-3 flex flex-col md:flex-row justify-between items-center gap-3 text-white">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={20} />
            <h2 className="font-semibold">Absen Kegiatan</h2>
          </div>
          
          {selectedKegiatan && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setAllStatus('Hadir')} className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition shadow-sm font-medium">
                <Check size={14}/> Set Semua Hadir
              </button>
              <button onClick={() => setAllStatus('Izin')} className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition shadow-sm font-medium">
                <Mail size={14}/> Set Semua Izin
              </button>
              <button onClick={() => setAllStatus('Sakit')} className="bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 rounded text-xs flex items-center gap-1 transition shadow-sm text-gray-900 font-bold">
                <span>✚</span> Set Semua Sakit
              </button>
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Pilih Kegiatan <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  value={selectedKegiatan}
                  onChange={(e) => setSelectedKegiatan(e.target.value)}
                  className={`w-full border-2 rounded-md p-2 text-sm focus:outline-none transition-all ${
                    selectedKegiatan ? 'border-blue-400' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Pilih Kegiatan --</option>
                  <option value="1">Seminar (06 Nov 2025)</option>
                  <option value="2">Workshop (03 Sep 2025)</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Filter Jenis Pegawai</label>
              <select className="w-full border rounded-md p-2 text-sm border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                <option>Semua Jenis Pegawai</option>
                <option>Guru</option>
                <option>Staff</option>
              </select>
            </div>
          </div>

          {/* Render Konten Berdasarkan Pilihan */}
          {!selectedKegiatan ? (
            /* --- TAMPILAN KOSONG --- */
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
              <div className="bg-gray-100 p-6 rounded-2xl mb-4 text-gray-400 shadow-inner">
                <CalendarX size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Silakan pilih kegiatan terlebih dahulu</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xs">
                Pilih kegiatan dari dropdown di atas untuk mulai melakukan absensi pegawai.
              </p>
            </div>
          ) : (
            /* --- TAMPILAN TABEL (SETELAH PILIH OPSI) --- */
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm shadow-sm">
                <div>
                  <p className="font-bold text-blue-900">
                    {selectedKegiatan === '1' ? 'Seminar' : 'Workshop'}
                  </p>
                  <p className="text-xs text-blue-600 capitalize">
                    {selectedKegiatan === '1' ? 'Seminar' : 'Workshop'}
                  </p>
                </div>
                <div className="md:text-center self-center text-gray-700 font-medium">
                  {selectedKegiatan === '1' ? '06 Nov 2025 12:00 - 28 Nov 2025 12:22' : '03 Sep 2025 09:00 - 12 Dec 2025 10:00'}
                </div>
                <div className="md:text-right self-center">
                  <span className="font-bold text-gray-700">Lokasi: </span>
                  <span className="text-gray-600">Sekolah</span>
                </div>
              </div>

              {/* Table Absensi */}
              <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white divide-x divide-blue-400">
                      <th className="p-3 w-12 text-center">No</th>
                      <th className="p-3">NIP</th>
                      <th className="p-3">Nama Pegawai</th>
                      <th className="p-3">Jenis Pegawai</th>
                      <th className="p-3">Jabatan</th>
                      <th className="p-3 w-40 text-center">Status Kehadiran</th>
                      <th className="p-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pegawai.map((p, index) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-center border-r bg-gray-50/50">{index + 1}</td>
                        <td className="p-3 border-r text-gray-700 font-mono text-xs">{p.nip}</td>
                        <td className="p-3 border-r text-gray-800 font-semibold">{p.nama}</td>
                        <td className="p-3 border-r">
                          <span className={`${p.jenis === 'Guru' ? 'bg-cyan-500' : 'bg-teal-500'} text-white text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider`}>
                            {p.jenis.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 border-r text-gray-600">{p.jabatan}</td>
                        <td className="p-3 border-r">
                          <div className="space-y-2">
                            <select 
                              value={p.status}
                              onChange={(e) => handleStatusChange(p.id, e.target.value)}
                              className="w-full border border-gray-300 rounded p-1.5 text-xs outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                            >
                              <option value="Hadir">Hadir</option>
                              <option value="Izin">Izin</option>
                              <option value="Sakit">Sakit</option>
                              <option value="Alpha">Alpha</option>
                            </select>
                            <div className={`mx-auto w-fit text-[10px] px-3 py-1 rounded font-bold text-white shadow-sm ${
                              p.status === 'Hadir' ? 'bg-green-600' : 
                              p.status === 'Izin' ? 'bg-yellow-500' : 
                              p.status === 'Sakit' ? 'bg-cyan-500' : 'bg-red-500'
                            }`}>
                              {p.status.toUpperCase()}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <textarea 
                            rows="1"
                            placeholder="Keterangan..." 
                            className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-400 outline-none resize-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbsenKegiatan;