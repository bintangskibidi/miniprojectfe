import React, { useState } from 'react';
import { Plus, ChevronDown, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const Cuti = () => {
  const [dataCuti, setDataCuti] = useState([
    { id: 1, nama: 'Bayu Aji lesmana eka putra', unit: '', mulai: '2025-10-06', selesai: '2025-10-09', alasan: 'Jalan', status: 'Rejected' },
    { id: 2, nama: 'Bayu Aji lesmana eka putra', unit: '', mulai: '2025-10-06', selesai: '2025-10-06', alasan: 'Tes', status: 'Rejected' },
    { id: 3, nama: 'Agus Santoso', unit: '0', mulai: '2025-07-04', selesai: '2025-07-12', alasan: 'Cuti', status: 'Rejected' },
    { id: 4, nama: 'Andi Susanto', unit: 'SD', mulai: '2025-07-04', selesai: '2025-07-11', alasan: 'Jalan jalan ke iran', status: 'Rejected' },
    { id: 5, nama: 'Agus Santoso', unit: '0', mulai: '2025-07-04', selesai: '2025-07-11', alasan: 'Ingin berlibur ke thailand', status: 'Approved' },
  ]);

  const handleAjukanCuti = () => {
    Swal.fire({
      title: 'Ajukan Cuti',
      text: 'Formulir pengajuan cuti akan muncul di sini.',
      icon: 'info',
      confirmButtonColor: '#15803d'
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-blue-600 font-semibold text-lg">Manajemen Cuti</h1>
          <button 
            onClick={handleAjukanCuti}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold transition shadow-sm"
          >
            <Plus size={18} strokeWidth={3} /> Ajukan Cuti
          </button>
        </div>

        <div className="p-5">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative w-64">
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 pr-10">
                <option>-- Filter Pegawai --</option>
                <option>Bayu Aji lesmana eka putra</option>
                <option>Agus Santoso</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative w-48">
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 pr-10">
                <option>-- Filter Status --</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-800 divide-x divide-blue-200">
                  <th className="p-3 text-center w-12 font-bold">No</th>
                  <th className="p-3 font-bold text-center">Nama Pegawai</th>
                  <th className="p-3 font-bold text-center w-16">Unit</th>
                  <th className="p-3 font-bold text-center">Tanggal Mulai</th>
                  <th className="p-3 font-bold text-center">Tanggal Selesai</th>
                  <th className="p-3 font-bold text-center">Alasan</th>
                  <th className="p-3 font-bold text-center w-32">Status</th>
                  <th className="p-3 font-bold text-center w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataCuti.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-center border-r bg-gray-50/50">{index + 1}</td>
                    <td className="p-3 border-r text-gray-700 px-4">{row.nama}</td>
                    <td className="p-3 border-r text-center text-gray-600">{row.unit}</td>
                    <td className="p-3 border-r text-center text-gray-700 font-medium">{row.mulai}</td>
                    <td className="p-3 border-r text-center text-gray-700 font-medium">{row.selesai}</td>
                    <td className="p-3 border-r text-gray-600 px-4 italic">{row.alasan}</td>
                    <td className="p-3 border-r text-center">
                      <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold text-white min-w-[80px] shadow-sm ${
                        row.status === 'Approved' ? 'bg-green-700' : 'bg-red-600'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-400 font-bold">
                      -
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cuti;