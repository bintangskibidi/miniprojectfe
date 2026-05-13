import React from 'react';
import { 
  Plus, 
  Calendar, 
  Pencil, 
  Trash2 
} from 'lucide-react';

const KegiatanSekolah = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm overflow-hidden border border-gray-200">
        
        {/* Header Biru */}
        <div className="bg-[#007bff] p-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Calendar size={22} />
            <h1 className="text-xl font-medium">Kegiatan Sekolah</h1>
          </div>
          <button className="bg-white text-black px-3 py-1.5 rounded flex items-center gap-1 text-sm font-normal hover:bg-gray-100 transition shadow-sm border border-gray-300">
            <Plus size={16} />
            Tambah Kegiatan
          </button>
        </div>

        {/* Konten Utama */}
        <div className="p-4 bg-white">
          
          {/* Toolbar: Export & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex flex-wrap shadow-sm">
              <button className="px-4 py-2 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm rounded-l">Copy</button>
              <button className="px-4 py-2 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">CSV</button>
              <button className="px-4 py-2 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">Excel</button>
              <button className="px-4 py-2 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">PDF</button>
              <button className="px-4 py-2 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm rounded-r">Print</button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Search:</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 w-48 transition-all" 
              />
            </div>
          </div>

          {/* Tabel Container dengan Scrollbar Khas Gambar */}
          <div className="overflow-x-auto border-b border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b text-sm font-bold text-gray-900">
                  <th className="p-3 border-r w-12 text-center group cursor-pointer">
                    # <span className="text-[10px] ml-1">▲</span>
                  </th>
                  <th className="p-3 border-r group cursor-pointer">
                    Judul <span className="text-[10px] float-right text-gray-300 group-hover:text-gray-600 transition">▲▼</span>
                  </th>
                  <th className="p-3 border-r group cursor-pointer">
                    Tanggal <span className="text-[10px] float-right text-gray-300 group-hover:text-gray-600 transition">▲▼</span>
                  </th>
                  <th className="p-3 border-r group cursor-pointer">
                    Deskripsi <span className="text-[10px] float-right text-gray-300 group-hover:text-gray-600 transition">▲▼</span>
                  </th>
                  <th className="p-3 text-left group cursor-pointer">
                    Aksi <span className="text-[10px] float-right text-gray-300 group-hover:text-gray-600 transition">▲▼</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b hover:bg-gray-50 bg-[#f9f9f9]">
                  <td className="p-3 border-r text-center">1</td>
                  <td className="p-3 border-r">Gladi Bersih</td>
                  <td className="p-3 border-r text-center">06-07-2025</td>
                  <td className="p-3 border-r">gladi</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 bg-[#ffc107] text-black rounded hover:bg-yellow-500 shadow-sm transition">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 bg-[#dc3545] text-white rounded hover:bg-red-700 shadow-sm transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Info & Pagination */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
            <p>Showing 1 to 1 of 1 entries</p>
            <div className="flex items-center">
              <span className="px-3 py-2 text-gray-400 cursor-not-allowed">Previous</span>
              <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-black font-semibold rounded-sm">1</button>
              <span className="px-3 py-2 text-gray-400 cursor-not-allowed">Next</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KegiatanSekolah;