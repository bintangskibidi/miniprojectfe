import React, { useState } from 'react';
import { 
  UserCheck, Filter as FilterIcon, Plus, 
  ClipboardList, LayoutList, ChevronDown 
} from 'lucide-react';

const AbsensiHarianPegawai = () => {
  const [hasData, setHasData] = useState(false); // Simulasi kondisi data kosong

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans text-gray-700">
      {/* Title Utama */}
      <div className="flex items-center gap-2 mb-4 text-blue-900">
        <UserCheck size={24} className="text-blue-600" />
        <h1 className="text-xl font-semibold">Absensi Harian Pegawai</h1>
      </div>

      {/* --- SECTION FILTER --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-blue-600 font-bold text-sm">
          <FilterIcon size={16} /> Filter
        </div>
        <div className="p-5 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium mb-1.5">Jenis Pegawai</label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400">
                <option>-- Semua Jenis --</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium mb-1.5">Unit</label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400">
                <option>-- Semua Unit --</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Tanggal Awal</label>
            <input type="date" defaultValue="2026-05-13" className="border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Tanggal Akhir</label>
            <input type="date" defaultValue="2026-05-13" className="border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-400" />
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition shadow-sm">
              <FilterIcon size={16} /> Filter
            </button>
            <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition shadow-sm">
              <Plus size={16} strokeWidth={3} /> Tambah
            </button>
          </div>
        </div>
      </div>

      {/* --- SECTION DATA ABSENSI --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-green-700 font-bold text-sm">
          <ClipboardList size={16} /> Data Absensi
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-[11px] font-bold text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 divide-x divide-gray-200 border-b">
                <th className="p-3 w-10">#</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">NIP</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Jenis Pegawai</th>
                <th className="p-3">Unit</th>
                <th className="p-3 bg-gray-100/50">Jam Masuk</th>
                <th className="p-3 bg-gray-100/50">Status Masuk</th>
                <th className="p-3 bg-gray-100/50">Jam Pulang</th>
                <th className="p-3 bg-gray-100/50">Status Pulang</th>
                <th className="p-3">Keterangan</th>
                <th className="p-3">Terlambat</th>
                <th className="p-3">Pulang Awal</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {!hasData && (
                <tr>
                  <td colSpan="14" className="py-12">
                    <div className="flex flex-col items-center text-gray-400">
                      <div className="bg-gray-100 p-3 rounded-lg mb-2">
                        <ClipboardList size={32} />
                      </div>
                      <p className="text-xs font-medium">Belum ada data absensi</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION REKAP ABSENSI --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-blue-900 font-bold text-sm">
          <LayoutList size={16} /> Rekap Absensi Pegawai
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-[11px] font-bold text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 divide-x divide-gray-200 border-b">
                <th className="p-3 w-10">#</th>
                <th className="p-3">NIP</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3">Jenis Pegawai</th>
                <th className="p-3">Unit</th>
                <th className="p-3">Total Hadir</th>
                <th className="p-3">Tepat Waktu</th>
                <th className="p-3">Terlambat</th>
                <th className="p-3">Pulang Cepat</th>
                <th className="p-3">Izin Pribadi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                 <td colSpan="10" className="p-1 border-t">
                    <div className="h-0.5 bg-blue-900 w-12 mx-auto rounded"></div>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbsensiHarianPegawai;