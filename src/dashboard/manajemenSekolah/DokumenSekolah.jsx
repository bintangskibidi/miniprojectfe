import React from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Pencil, 
  Trash2,
  ExternalLink
} from 'lucide-react';

const DokumenSekolah = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-sm overflow-hidden border border-gray-200">
        
        {/* Header Biru */}
        <div className="bg-[#007bff] p-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <ImageIcon size={22} fill="white" />
            <h1 className="text-xl font-medium">Dokumentasi Sekolah</h1>
          </div>
          <button className="bg-white text-black px-3 py-1.5 rounded flex items-center gap-1 text-sm font-normal hover:bg-gray-100 transition shadow-sm border border-gray-300">
            <Plus size={16} />
            Tambah Dokumentasi
          </button>
        </div>

        {/* Konten Utama */}
        <div className="p-4 bg-white">
          
          {/* Toolbar: Export & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex flex-wrap gap-0">
              <button className="px-4 py-1.5 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm rounded-l">Copy</button>
              <button className="px-4 py-1.5 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">CSV</button>
              <button className="px-4 py-1.5 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">Excel</button>
              <button className="px-4 py-1.5 border-y border-r border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm">PDF</button>
              <button className="px-4 py-1.5 border border-gray-300 bg-gray-50 hover:bg-gray-100 text-sm rounded-r">Print</button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm">Search:</label>
              <input 
                type="text" 
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 w-48" 
              />
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-white border-b text-sm font-bold text-gray-800">
                  <th className="p-3 border-r w-12 text-center">#</th>
                  <th className="p-3 border-r">Judul</th>
                  <th className="p-3 border-r">Tanggal</th>
                  <th className="p-3 border-r">Deskripsi</th>
                  <th className="p-3 border-r">File</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3 border-r text-center">1</td>
                  <td className="p-3 border-r">Surat</td>
                  <td className="p-3 border-r text-center">06-07-2025</td>
                  <td className="p-3 border-r">tess</td>
                  <td className="p-3 border-r text-center">
                    <button className="px-3 py-1 border border-blue-500 text-blue-600 rounded-md text-xs hover:bg-blue-50 transition flex items-center gap-1 mx-auto">
                      Lihat File
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 bg-[#ffc107] text-black rounded hover:bg-yellow-500">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 bg-[#dc3545] text-white rounded hover:bg-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
            <p>Showing 1 to 1 of 1 entries</p>
            <div className="flex items-center text-gray-500">
              <span className="px-3 py-2 cursor-not-allowed">Previous</span>
              <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-black font-semibold">1</button>
              <span className="px-3 py-2 cursor-not-allowed">Next</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DokumenSekolah;