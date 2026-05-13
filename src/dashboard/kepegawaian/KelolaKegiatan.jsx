import React, { useState } from 'react';
import { 
  Plus, Search, Copy, FileText, FileSpreadsheet, 
  FileBox, Printer, Edit3, Trash2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import Swal from 'sweetalert2';

const KelolaKegiatan = () => {
  // Data Dummy
  const [data, setData] = useState([
    {
      id: 1,
      nama: 'Seminar',
      jenis: 'Seminar',
      mulai: '06 Nov 2025 12:00',
      selesai: '28 Nov 2025 12:22',
      lokasi: 'Sekolah',
      pj: 'Kepala Sekolah',
      status: 'Aktif'
    },
    {
      id: 2,
      nama: 'Workshop',
      subNama: 'workshop',
      jenis: 'Seminar',
      mulai: '03 Sep 2025 09:00',
      selesai: '12 Dec 2025 10:00',
      lokasi: 'Sekolah',
      pj: 'Kepala Sekolah',
      status: 'Aktif'
    }
  ]);

  // Fungsi SweetAlert untuk Hapus
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter(item => item.id !== id));
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
      }
    });
  };

  // Fungsi SweetAlert untuk Tambah/Edit (Placeholder)
  const handleAction = (type) => {
    Swal.fire({
      title: `${type} Kegiatan`,
      text: `Fitur ${type} akan segera hadir!`,
      icon: 'info'
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-white/20 rounded">📅</span>
            <h1 className="font-semibold text-lg">Kelola Kegiatan</h1>
          </div>
          <button 
            onClick={() => handleAction('Tambah')}
            className="bg-white text-gray-800 px-4 py-1.5 rounded text-sm font-medium flex items-center gap-1 hover:bg-gray-100 transition shadow"
          >
            <Plus size={16} /> Tambah Kegiatan
          </button>
        </div>

        <div className="p-5">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span>Tampilkan</span>
              <select className="border rounded px-2 py-1 outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span>data</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span>Cari:</span>
              <input type="text" className="border rounded px-2 py-1 outline-none w-48 focus:ring-1 ring-blue-400" />
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="flex items-center gap-1 px-3 py-1 border rounded text-xs hover:bg-gray-50"><Copy size={14}/> Salin</button>
            <button className="flex items-center gap-1 px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50"><FileText size={14}/> CSV</button>
            <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 text-gray-600 rounded text-xs hover:bg-gray-50"><FileSpreadsheet size={14}/> Excel</button>
            <button className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded text-xs hover:bg-red-50"><FileBox size={14}/> PDF</button>
            <button className="flex items-center gap-1 px-3 py-1 border border-black text-black rounded text-xs hover:bg-gray-50"><Printer size={14}/> Print</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-blue-50 text-gray-700">
                  <th className="p-3 border-b border-r w-12 text-center">No ⇅</th>
                  <th className="p-3 border-b border-r">Nama Kegiatan ⇅</th>
                  <th className="p-3 border-b border-r">Jenis ⇅</th>
                  <th className="p-3 border-b border-r">Tanggal Mulai ⇅</th>
                  <th className="p-3 border-b border-r">Tanggal Selesai ⇅</th>
                  <th className="p-3 border-b border-r">Lokasi ⇅</th>
                  <th className="p-3 border-b border-r">Penanggung Jawab ⇅</th>
                  <th className="p-3 border-b border-r">Status ⇅</th>
                  <th className="p-3 border-b text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-r text-center">{index + 1}</td>
                    <td className="p-3 border-r font-semibold">
                      {item.nama}
                      {item.subNama && <div className="text-[10px] font-normal text-gray-400">{item.subNama}</div>}
                    </td>
                    <td className="p-3 border-r">
                      <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {item.jenis.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3 border-r text-xs">{item.mulai}</td>
                    <td className="p-3 border-r text-xs">{item.selesai}</td>
                    <td className="p-3 border-r">{item.lokasi}</td>
                    <td className="p-3 border-r">{item.pj}</td>
                    <td className="p-3 border-r text-center">
                      <span className="bg-green-700 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-1">
                        <button 
                          onClick={() => handleAction('Edit')}
                          className="bg-yellow-400 p-1.5 rounded hover:bg-yellow-500 text-gray-800"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 p-1.5 rounded hover:bg-red-600 text-white"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>Menampilkan 1 sampai {data.length} dari {data.length} data</p>
            <div className="flex items-center gap-0 mt-2 md:mt-0 border rounded overflow-hidden">
              <button className="px-3 py-2 hover:bg-gray-100 border-r disabled:opacity-50">Sebelumnya</button>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 font-bold border-r">1</button>
              <button className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50">Berikutnya</button>
            </div>
          </div>
          
          {/* Scrollbar Simulator */}
          <div className="mt-4 w-full bg-gray-200 h-2 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-gray-400 rounded-full cursor-pointer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelolaKegiatan;